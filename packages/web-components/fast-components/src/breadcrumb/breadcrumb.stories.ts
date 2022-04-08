import { html } from "@microsoft/fast-element";
import type { Breadcrumb } from "@microsoft/fast-foundation";
import type { Args, Meta } from "@storybook/html";
import type { Button } from "../button/index.js";
import { renderComponent } from "../storybook-helpers.js";

const componentTemplate = html<Breadcrumb & Args>`
    <fast-breadcrumb>
        ${x => x.content}
    </fast-breadcrumb>
`;

export default {
    title: "Breadcrumb",
    args: {
        content: html`
            <fast-breadcrumb-item href="#">Breadcrumb item 1</fast-breadcrumb-item>
            <fast-breadcrumb-item href="#">Breadcrumb item 1</fast-breadcrumb-item>
            <fast-breadcrumb-item>Breadcrumb item 3</fast-breadcrumb-item>
        `,
    },
} as Meta<Breadcrumb>;

export const Primary = renderComponent(componentTemplate).bind({});

export const WithCustomChildElement = renderComponent(componentTemplate).bind({});
WithCustomChildElement.args = {
    content: html`
        <fast-breadcrumb-item>
            <fast-button>Breadcrumb item 1</fast-button>
        </fast-breadcrumb-item>
        <fast-breadcrumb-item>
            <fast-button>Breadcrumb item 2</fast-button>
        </fast-breadcrumb-item>
        <fast-breadcrumb-item>
            <fast-button>Breadcrumb item 3</fast-button>
        </fast-breadcrumb-item>
    `,
};

export const WithDefaultAndCustomChildElement = renderComponent(componentTemplate).bind(
    {}
);
WithDefaultAndCustomChildElement.args = {
    content: html`
        <fast-breadcrumb-item href="#">Breadcrumb item 1</fast-breadcrumb-item>
        <fast-breadcrumb-item href="#">Breadcrumb item 2</fast-breadcrumb-item>
        <fast-breadcrumb-item>
            <fast-button>Breadcrumb item 3</fast-button>
        </fast-breadcrumb-item>
        <fast-breadcrumb-item href="#">Breadcrumb item 4</fast-breadcrumb-item>
        <fast-breadcrumb-item>Breadcrumb item 5</fast-breadcrumb-item>
    `,
};

export const WithSvgSeparator = renderComponent(componentTemplate).bind({});
WithSvgSeparator.args = {
    content: html`
        <fast-breadcrumb-item href="#">
            Breadcrumb item 1
            <svg
                slot="separator"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.10056 2L10.6592 6.55866H0V9.62011H10.6592L6.10056 14.1899H9.91061L16 8.08939L9.91061 2H6.10056Z"
                />
            </svg>
        </fast-breadcrumb-item>
        <fast-breadcrumb-item href="#">
            Breadcrumb item 2
            <svg
                slot="separator"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.10056 2L10.6592 6.55866H0V9.62011H10.6592L6.10056 14.1899H9.91061L16 8.08939L9.91061 2H6.10056Z"
                />
            </svg>
        </fast-breadcrumb-item>
        <fast-breadcrumb-item>
            Breadcrumb item 3
            <svg
                slot="separator"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.10056 2L10.6592 6.55866H0V9.62011H10.6592L6.10056 14.1899H9.91061L16 8.08939L9.91061 2H6.10056Z"
                />
            </svg>
        </fast-breadcrumb-item>
    `,
};

export const WithStartSlotedContent = renderComponent(componentTemplate).bind({});
WithStartSlotedContent.args = {
    content: html`
        <fast-breadcrumb-item href="#">
            Breadcrumb item 1
            <svg
                slot="start"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 1.28906L15.3516 8.64844L14.6484 9.35156L14 8.71094V15H9V10H7V15H2V8.71094L1.35156 9.35156L0.648438 8.64844L8 1.28906ZM13 14V7.71094L8 2.71094L3 7.71094V14H6V9H10V14H13Z"
                />
            </svg>
        </fast-breadcrumb-item>
        <fast-breadcrumb-item href="#">
            Breadcrumb item 2
            <svg
                slot="start"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2 14H8V15H1V2H5C5 1.72396 5.05208 1.46615 5.15625 1.22656C5.26042 0.981771 5.40365 0.768229 5.58594 0.585938C5.76823 0.403646 5.97917 0.260417 6.21875 0.15625C6.46354 0.0520833 6.72396 0 7 0C7.27604 0 7.53385 0.0520833 7.77344 0.15625C8.01823 0.260417 8.23177 0.403646 8.41406 0.585938C8.59635 0.768229 8.73958 0.981771 8.84375 1.22656C8.94792 1.46615 9 1.72396 9 2H13V7H12V3H11V5H3V3H2V14ZM4 3V4H10V3H8V2C8 1.85938 7.97396 1.72917 7.92188 1.60938C7.86979 1.48958 7.79688 1.38542 7.70312 1.29688C7.61458 1.20312 7.51042 1.13021 7.39062 1.07812C7.27083 1.02604 7.14062 1 7 1C6.85938 1 6.72917 1.02604 6.60938 1.07812C6.48958 1.13021 6.38281 1.20312 6.28906 1.29688C6.20052 1.38542 6.13021 1.48958 6.07812 1.60938C6.02604 1.72917 6 1.85938 6 2V3H4ZM15.6953 16H14.6406L13.9766 14H11.0234L10.3594 16H9.30469L11.9766 8H13.0234L15.6953 16ZM13.6406 13L12.5 9.58594L11.3594 13H13.6406Z"
                />
            </svg>
        </fast-breadcrumb-item>
        <fast-breadcrumb-item>
            Breadcrumb item 3
            <svg
                slot="start"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16 3V13H1V11H0V2H14V3H16ZM12 3C12 3.14062 12.026 3.27083 12.0781 3.39062C12.1302 3.51042 12.2005 3.61719 12.2891 3.71094C12.3828 3.79948 12.4896 3.86979 12.6094 3.92188C12.7292 3.97396 12.8594 4 13 4V3H12ZM1 4C1.14062 4 1.27083 3.97396 1.39062 3.92188C1.51042 3.86979 1.61458 3.79948 1.70312 3.71094C1.79688 3.61719 1.86979 3.51042 1.92188 3.39062C1.97396 3.27083 2 3.14062 2 3H1V4ZM1 8C1.27604 8 1.53385 8.05208 1.77344 8.15625C2.01823 8.26042 2.23177 8.40365 2.41406 8.58594C2.59635 8.76823 2.73958 8.98177 2.84375 9.22656C2.94792 9.46615 3 9.72396 3 10H11C11 9.72396 11.0521 9.46615 11.1562 9.22656C11.2604 8.98177 11.4036 8.76823 11.5859 8.58594C11.7682 8.40365 11.9792 8.26042 12.2188 8.15625C12.4635 8.05208 12.724 8 13 8V5C12.724 5 12.4635 4.94792 12.2188 4.84375C11.9792 4.73958 11.7682 4.59635 11.5859 4.41406C11.4036 4.23177 11.2604 4.02083 11.1562 3.78125C11.0521 3.53646 11 3.27604 11 3H3C3 3.27604 2.94792 3.53646 2.84375 3.78125C2.73958 4.02083 2.59635 4.23177 2.41406 4.41406C2.23177 4.59635 2.01823 4.73958 1.77344 4.84375C1.53385 4.94792 1.27604 5 1 5V8ZM13 9C12.8594 9 12.7292 9.02604 12.6094 9.07812C12.4896 9.13021 12.3828 9.20312 12.2891 9.29688C12.2005 9.38542 12.1302 9.48958 12.0781 9.60938C12.026 9.72917 12 9.85938 12 10H13V9ZM1 10H2C2 9.85938 1.97396 9.72917 1.92188 9.60938C1.86979 9.48958 1.79688 9.38542 1.70312 9.29688C1.61458 9.20312 1.51042 9.13021 1.39062 9.07812C1.27083 9.02604 1.14062 9 1 9V10ZM15 4H14V11H2V12H15V4ZM3.5 7C3.36458 7 3.2474 6.95052 3.14844 6.85156C3.04948 6.7526 3 6.63542 3 6.5C3 6.36458 3.04948 6.2474 3.14844 6.14844C3.2474 6.04948 3.36458 6 3.5 6C3.63542 6 3.7526 6.04948 3.85156 6.14844C3.95052 6.2474 4 6.36458 4 6.5C4 6.63542 3.95052 6.7526 3.85156 6.85156C3.7526 6.95052 3.63542 7 3.5 7ZM10.5 7C10.3646 7 10.2474 6.95052 10.1484 6.85156C10.0495 6.7526 10 6.63542 10 6.5C10 6.36458 10.0495 6.2474 10.1484 6.14844C10.2474 6.04948 10.3646 6 10.5 6C10.6354 6 10.7526 6.04948 10.8516 6.14844C10.9505 6.2474 11 6.36458 11 6.5C11 6.63542 10.9505 6.7526 10.8516 6.85156C10.7526 6.95052 10.6354 7 10.5 7ZM7 9C6.72396 9 6.46354 8.94792 6.21875 8.84375C5.97917 8.73958 5.76823 8.59635 5.58594 8.41406C5.40365 8.23177 5.26042 8.02083 5.15625 7.78125C5.05208 7.53646 5 7.27604 5 7V6C5 5.72396 5.05208 5.46615 5.15625 5.22656C5.26042 4.98177 5.40365 4.76823 5.58594 4.58594C5.76823 4.40365 5.97917 4.26042 6.21875 4.15625C6.46354 4.05208 6.72396 4 7 4C7.27604 4 7.53385 4.05208 7.77344 4.15625C8.01823 4.26042 8.23177 4.40365 8.41406 4.58594C8.59635 4.76823 8.73958 4.98177 8.84375 5.22656C8.94792 5.46615 9 5.72396 9 6V7C9 7.27604 8.94792 7.53646 8.84375 7.78125C8.73958 8.02083 8.59635 8.23177 8.41406 8.41406C8.23177 8.59635 8.01823 8.73958 7.77344 8.84375C7.53385 8.94792 7.27604 9 7 9ZM6 7C6 7.14062 6.02604 7.27083 6.07812 7.39062C6.13021 7.51042 6.20052 7.61719 6.28906 7.71094C6.38281 7.79948 6.48958 7.86979 6.60938 7.92188C6.72917 7.97396 6.85938 8 7 8C7.14062 8 7.27083 7.97396 7.39062 7.92188C7.51042 7.86979 7.61458 7.79948 7.70312 7.71094C7.79688 7.61719 7.86979 7.51042 7.92188 7.39062C7.97396 7.27083 8 7.14062 8 7V6C8 5.85938 7.97396 5.72917 7.92188 5.60938C7.86979 5.48958 7.79688 5.38542 7.70312 5.29688C7.61458 5.20312 7.51042 5.13021 7.39062 5.07812C7.27083 5.02604 7.14062 5 7 5C6.85938 5 6.72917 5.02604 6.60938 5.07812C6.48958 5.13021 6.38281 5.20312 6.28906 5.29688C6.20052 5.38542 6.13021 5.48958 6.07812 5.60938C6.02604 5.72917 6 5.85938 6 6V7Z"
                />
            </svg>
        </fast-breadcrumb-item>
    `,
};

export const WithEndSlottedContent = renderComponent(componentTemplate).bind({});
WithEndSlottedContent.args = {
    content: html`
        <fast-breadcrumb-item href="#">
            Breadcrumb item 1
            <svg
                slot="end"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 1.28906L15.3516 8.64844L14.6484 9.35156L14 8.71094V15H9V10H7V15H2V8.71094L1.35156 9.35156L0.648438 8.64844L8 1.28906ZM13 14V7.71094L8 2.71094L3 7.71094V14H6V9H10V14H13Z"
                />
            </svg>
        </fast-breadcrumb-item>
        <fast-breadcrumb-item href="#">
            Breadcrumb item 2
            <svg
                slot="end"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2 14H8V15H1V2H5C5 1.72396 5.05208 1.46615 5.15625 1.22656C5.26042 0.981771 5.40365 0.768229 5.58594 0.585938C5.76823 0.403646 5.97917 0.260417 6.21875 0.15625C6.46354 0.0520833 6.72396 0 7 0C7.27604 0 7.53385 0.0520833 7.77344 0.15625C8.01823 0.260417 8.23177 0.403646 8.41406 0.585938C8.59635 0.768229 8.73958 0.981771 8.84375 1.22656C8.94792 1.46615 9 1.72396 9 2H13V7H12V3H11V5H3V3H2V14ZM4 3V4H10V3H8V2C8 1.85938 7.97396 1.72917 7.92188 1.60938C7.86979 1.48958 7.79688 1.38542 7.70312 1.29688C7.61458 1.20312 7.51042 1.13021 7.39062 1.07812C7.27083 1.02604 7.14062 1 7 1C6.85938 1 6.72917 1.02604 6.60938 1.07812C6.48958 1.13021 6.38281 1.20312 6.28906 1.29688C6.20052 1.38542 6.13021 1.48958 6.07812 1.60938C6.02604 1.72917 6 1.85938 6 2V3H4ZM15.6953 16H14.6406L13.9766 14H11.0234L10.3594 16H9.30469L11.9766 8H13.0234L15.6953 16ZM13.6406 13L12.5 9.58594L11.3594 13H13.6406Z"
                />
            </svg>
        </fast-breadcrumb-item>
        <fast-breadcrumb-item>
            Breadcrumb item 3
            <svg
                slot="end"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16 3V13H1V11H0V2H14V3H16ZM12 3C12 3.14062 12.026 3.27083 12.0781 3.39062C12.1302 3.51042 12.2005 3.61719 12.2891 3.71094C12.3828 3.79948 12.4896 3.86979 12.6094 3.92188C12.7292 3.97396 12.8594 4 13 4V3H12ZM1 4C1.14062 4 1.27083 3.97396 1.39062 3.92188C1.51042 3.86979 1.61458 3.79948 1.70312 3.71094C1.79688 3.61719 1.86979 3.51042 1.92188 3.39062C1.97396 3.27083 2 3.14062 2 3H1V4ZM1 8C1.27604 8 1.53385 8.05208 1.77344 8.15625C2.01823 8.26042 2.23177 8.40365 2.41406 8.58594C2.59635 8.76823 2.73958 8.98177 2.84375 9.22656C2.94792 9.46615 3 9.72396 3 10H11C11 9.72396 11.0521 9.46615 11.1562 9.22656C11.2604 8.98177 11.4036 8.76823 11.5859 8.58594C11.7682 8.40365 11.9792 8.26042 12.2188 8.15625C12.4635 8.05208 12.724 8 13 8V5C12.724 5 12.4635 4.94792 12.2188 4.84375C11.9792 4.73958 11.7682 4.59635 11.5859 4.41406C11.4036 4.23177 11.2604 4.02083 11.1562 3.78125C11.0521 3.53646 11 3.27604 11 3H3C3 3.27604 2.94792 3.53646 2.84375 3.78125C2.73958 4.02083 2.59635 4.23177 2.41406 4.41406C2.23177 4.59635 2.01823 4.73958 1.77344 4.84375C1.53385 4.94792 1.27604 5 1 5V8ZM13 9C12.8594 9 12.7292 9.02604 12.6094 9.07812C12.4896 9.13021 12.3828 9.20312 12.2891 9.29688C12.2005 9.38542 12.1302 9.48958 12.0781 9.60938C12.026 9.72917 12 9.85938 12 10H13V9ZM1 10H2C2 9.85938 1.97396 9.72917 1.92188 9.60938C1.86979 9.48958 1.79688 9.38542 1.70312 9.29688C1.61458 9.20312 1.51042 9.13021 1.39062 9.07812C1.27083 9.02604 1.14062 9 1 9V10ZM15 4H14V11H2V12H15V4ZM3.5 7C3.36458 7 3.2474 6.95052 3.14844 6.85156C3.04948 6.7526 3 6.63542 3 6.5C3 6.36458 3.04948 6.2474 3.14844 6.14844C3.2474 6.04948 3.36458 6 3.5 6C3.63542 6 3.7526 6.04948 3.85156 6.14844C3.95052 6.2474 4 6.36458 4 6.5C4 6.63542 3.95052 6.7526 3.85156 6.85156C3.7526 6.95052 3.63542 7 3.5 7ZM10.5 7C10.3646 7 10.2474 6.95052 10.1484 6.85156C10.0495 6.7526 10 6.63542 10 6.5C10 6.36458 10.0495 6.2474 10.1484 6.14844C10.2474 6.04948 10.3646 6 10.5 6C10.6354 6 10.7526 6.04948 10.8516 6.14844C10.9505 6.2474 11 6.36458 11 6.5C11 6.63542 10.9505 6.7526 10.8516 6.85156C10.7526 6.95052 10.6354 7 10.5 7ZM7 9C6.72396 9 6.46354 8.94792 6.21875 8.84375C5.97917 8.73958 5.76823 8.59635 5.58594 8.41406C5.40365 8.23177 5.26042 8.02083 5.15625 7.78125C5.05208 7.53646 5 7.27604 5 7V6C5 5.72396 5.05208 5.46615 5.15625 5.22656C5.26042 4.98177 5.40365 4.76823 5.58594 4.58594C5.76823 4.40365 5.97917 4.26042 6.21875 4.15625C6.46354 4.05208 6.72396 4 7 4C7.27604 4 7.53385 4.05208 7.77344 4.15625C8.01823 4.26042 8.23177 4.40365 8.41406 4.58594C8.59635 4.76823 8.73958 4.98177 8.84375 5.22656C8.94792 5.46615 9 5.72396 9 6V7C9 7.27604 8.94792 7.53646 8.84375 7.78125C8.73958 8.02083 8.59635 8.23177 8.41406 8.41406C8.23177 8.59635 8.01823 8.73958 7.77344 8.84375C7.53385 8.94792 7.27604 9 7 9ZM6 7C6 7.14062 6.02604 7.27083 6.07812 7.39062C6.13021 7.51042 6.20052 7.61719 6.28906 7.71094C6.38281 7.79948 6.48958 7.86979 6.60938 7.92188C6.72917 7.97396 6.85938 8 7 8C7.14062 8 7.27083 7.97396 7.39062 7.92188C7.51042 7.86979 7.61458 7.79948 7.70312 7.71094C7.79688 7.61719 7.86979 7.51042 7.92188 7.39062C7.97396 7.27083 8 7.14062 8 7V6C8 5.85938 7.97396 5.72917 7.92188 5.60938C7.86979 5.48958 7.79688 5.38542 7.70312 5.29688C7.61458 5.20312 7.51042 5.13021 7.39062 5.07812C7.27083 5.02604 7.14062 5 7 5C6.85938 5 6.72917 5.02604 6.60938 5.07812C6.48958 5.13021 6.38281 5.20312 6.28906 5.29688C6.20052 5.38542 6.13021 5.48958 6.07812 5.60938C6.02604 5.72917 6 5.85938 6 6V7Z"
                />
            </svg>
        </fast-breadcrumb-item>
    `,
};

export const DynamicBreadcrumbs = renderComponent(componentTemplate).bind({});
DynamicBreadcrumbs.args = {
    content: html`
        <fast-breadcrumb-item href="#">Breadcrumb item 1</fast-breadcrumb-item>
        <fast-breadcrumb-item href="#">Breadcrumb item 1</fast-breadcrumb-item>
        <fast-breadcrumb-item href="#">Breadcrumb item 3</fast-breadcrumb-item>
    `,
};
DynamicBreadcrumbs.decorators = [
    Story => {
        const renderedStory = Story() as DocumentFragment;

        const addButton = document.createElement("fast-button") as Button;
        addButton.appearance = "accent";
        addButton.textContent = "Add Breadcrumb";
        renderedStory.appendChild(addButton);

        addButton.addEventListener("click", function () {
            const root = addButton.parentElement;
            const breadcrumbs = root?.querySelector("fast-breadcrumb");
            const items = breadcrumbs?.querySelectorAll("fast-breadcrumb-item");
            if (!items) {
                return;
            }

            const item = document.createElement("fast-breadcrumb-item");
            item.setAttribute("href", "#");
            item.textContent = `Breadcrumb item ${items.length + 1}`;

            breadcrumbs?.appendChild(item);
        });

        return renderedStory;
    },
] as Meta["decorators"];
