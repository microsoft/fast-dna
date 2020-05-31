const path = require("path"),
    fs = require("fs"),
    fse = require("fs-extra");
const { createInterface } = require("readline");
const { join, parse } = require("path");
const { exec } = require("child_process");

function findFiles(startPath, filter, paths = []) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);

    for (let i = 0, ii = files.length; i < ii; ++i) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            findFiles(filename, filter, paths);
        } else if (filename.indexOf(filter) !== -1) {
            paths.push(filename);
        }
    }

    return paths;
}

const packages = [
    "fast-element",
    "fast-foundation",
    "fast-components",
    "fast-components-msft",
];

function identifyPackage(path) {
    for (const package of packages) {
        if (path.indexOf(package) !== -1) {
            return package;
        }
    }

    return "";
}

async function copyMarkdown() {
    const markdownGuides = findFiles("../../packages/web-components", ".doc.md");
    for (const source of markdownGuides) {
        const filename = path.basename(source).replace(".doc.md", ".md");
        const root = "./docs";
        const folder = identifyPackage(source);
        const dest = path.join(root, folder, filename);

        if (fs.existsSync(dest)) {
            await fse.copyFile(source, dest);
        } else {
            await fse.mkdir(path.dirname(dest), { recursive: true });
            await fse.copyFile(source, dest);
        }
    }
    
    function isComponentExcluded(source) {
        for (const exclude of ["anchored-region"]) {
            if (source.indexOf(exclude) !== -1) {
                return true;
            }
        }

        return false;
    }

    const componentDocs = findFiles("../../packages/web-components/fast-foundation/src", "README.md");
    for (const source of componentDocs) {
        if (isComponentExcluded(source)) {
            continue;
        }

        const root = "./docs/fast-foundation";
        const folder = path.dirname(source);
        const dest = path.join(
            root,
            `fast-${folder.substr(folder.lastIndexOf(path.sep) + 1)}.md`
        );

        await fse.copyFile(source, dest);
    }

    const mergeDocs = [
        {
            src: "../../CODE_OF_CONDUCT.md",
            dest: "./src/docs/community/code-of-conduct.md",
            metadata: {
                id: "code-of-conduct",
                title: "Code of Conduct",
                sidebar_label: "Code of Conduct",
                custom_edit_url: "https://github.com/microsoft/fast-dna/edit/master/CODE_OF_CONDUCT.md"
            }
        },
        {
            src: "../../CONTRIBUTING.md",
            dest: "./src/docs/community/contributor-guide.md",
            metadata: {
                id: "contributor-guide",
                title: "Contributor Guide",
                sidebar_label: "Contributor Guide",
                custom_edit_url: "https://github.com/microsoft/fast-dna/edit/master/CONTRIBUTING.md"
            }
        },
        {
            src: "../../LICENSE",
            dest: "./src/docs/resources/license.md",
            metadata: {
                id: "license",
                title: "License",
                sidebar_label: "License",
                custom_edit_url: "https://github.com/microsoft/fast-dna/edit/master/LICENSE"
            }
        },
        {
            src: "../../SECURITY.md",
            dest: "./src/docs/resources/security.md",
            metadata: {
                id: "security",
                title: "Security",
                sidebar_label: "Security",
                custom_edit_url: "https://github.com/microsoft/fast-dna/edit/master/security.md"
            }
        }
    ];

    for (const file of mergeDocs) {
        try {
            const docPath = file.src;
            const input = fse.createReadStream(docPath);
            const output = [];
            const lines = createInterface({
                input,
                crlfDelay: Infinity,
            });

            let title = "";
            lines.on("line", line => {
                let skip = false;

                if (!title) {
                    const titleLine = line.match(/# (.*)/);

                    if (titleLine) {
                        title = titleLine[1];
                        skip = true;
                    }
                }

                if (!skip) {
                    output.push(line);
                }
            });

            await new Promise(resolve => lines.once("close", resolve));
            input.close();

            const header = [
                "---",
                `id: ${file.metadata.id}`,
                `title: ${file.metadata.title}`,
                `sidebar_label: ${file.metadata.sidebar_label}`,
                `custom_edit_url: ${file.metadata.custom_edit_url}`,
                "---",
            ];

            await fse.writeFile(file.dest, header.concat(output).join("\n"));
        } catch (err) {
            console.error(`Could not process ${file.src}: ${err}`);
        }
    }

    const siteDocs = findFiles("./src/docs", ".md");
    for (const source of siteDocs) {
        const filename = path.basename(source);
        const root = "./docs";
        const folder = path.dirname(source);
        const dest = path
            .join(root, folder.substr(folder.lastIndexOf(path.sep) + 1), filename)
            .replace(`docs${path.sep}docs`, "docs");

        await fse.copyFile(source, dest);
    }
}

// Copy the api.json files from the web-components packages.
async function copyAPI() {
    for (const package of packages) {
        await fse.copyFile(
            `../../packages/web-components/${package}/dist/${package}.api.json`,
            `./src/docs/api/${package}.api.json`
        );
    }
}

async function main() {
    await copyMarkdown();
    await copyAPI();
    await new Promise((resolve, reject) =>
        exec(
            "api-documenter markdown -i src/docs/api -o docs/api",
            (err, stdout, stderr) => {
                console.log(stdout);
                console.error(stderr);
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        )
    );

    const dir = "./docs/api";
    const docFiles = await fse.readdir(dir);
    for (const docFile of docFiles) {
        try {
            const { name: id, ext } = parse(docFile);
            if (ext !== ".md") {
                continue;
            }

            const package = identifyPackage(docFile);
            const isAPIHome = id === package;
            const docPath = join(dir, docFile);
            const input = fse.createReadStream(docPath);
            const output = [];
            const lines = createInterface({
                input,
                crlfDelay: Infinity,
            });

            let title = "";
            lines.on("line", line => {
                let skip = false;

                if (!title) {
                    const titleLine = line.match(/## (.*)/);

                    if (titleLine) {
                        title = titleLine[1];

                        if (title.indexOf("package") !== -1) {
                            title = title.replace("package", "");
                            skip = true;
                        }
                    }
                }

                const homeLink = line.match(/\[Home\]\(.\/index\.md\) &gt; (.*)/);

                if (homeLink) {
                    if (!isAPIHome) {
                        output.push(homeLink[1]);
                    }

                    skip = true;
                }

                if (!skip) {
                    output.push(line);
                }
            });

            await new Promise(resolve => lines.once("close", resolve));
            input.close();

            const header = [
                "---",
                `id: ${id}`,
                `title: ${title}`,
                `hide_title: ${!isAPIHome}`,
                "---",
            ];

            await fse.writeFile(docPath, header.concat(output).join("\n"));
        } catch (err) {
            console.error(`Could not process ${docFile}: ${err}`);
        }
    }
}

main();
