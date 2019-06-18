export default {
    $schema: "http://json-schema.org/schema#",
    title: "Carousel Dark Image Content Test Element",
    description: "A carousel dark image content component's schema definition.",
    id: "carousel-dark-image-content",
    type: "object",
    properties: {
        image: {
            title: "Image",
            type: "object",
            properties: {
                src: {
                    title: "HTML src attribute",
                    type: "string",
                    default: "http://placehold.it/1399x600/2F2F2F/171717",
                },
                alt: {
                    title: "HTML alt attribute",
                    type: "string",
                },
            },
            required: ["src"],
        },
    },
};
