declare const style =
    '\n    ::-webkit-scrollbar \n    {\n        background: var(--fast-tooling-l1-color);\n        width: 8px;\n        height: 8px;\n    }\n\n    ::-webkit-scrollbar-thumb \n    {\n        background: var(--fast-tooling-l3-color);\n        border-radius: 8px;\n    }\n\n    body, html \n    {\n        font-size: 12px;\n        margin: 0;\n    }\n\n    .preview\n    {\n        box-sizing: "border-box";\n        display: "flex";\n    }\n\n    .preview__transparent\n    {\n        background:\n            linear-gradient(45deg, rgba(0, 0, 0, 0.0980392) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.0980392) 75%, rgba(0, 0, 0, 0.0980392) 0), linear-gradient(45deg, rgba(0, 0, 0, 0.0980392) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.0980392) 75%, rgba(0, 0, 0, 0.0980392) 0), white;\n        background-repeat: repeat, repeat;\n        background-position: 0 0, 5px 5px;\n        transform-origin: 0 0 0;\n        background-origin: padding-box, padding-box;\n        background-clip: border-box, border-box;\n        background-size: 10px 10px, 10px 10px;\n        box-shadow: none;\n        text-shadow: none;\n        min-height: 100vh;\n        transition: none;\n        transform: scaleX(1) scaleY(1) scaleZ(1);\n    }\n\n    .preview_componentRegion\n    {\n        padding: 12px;\n        height: calc(100vh - 24px);\n    }\n';
export default style;
