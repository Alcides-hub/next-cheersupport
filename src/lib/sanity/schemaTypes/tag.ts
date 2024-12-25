import {defineField, defineType} from 'sanity'

export const tag = defineType({
    name: "tag",
    type: "document",
    title: "Tag",
    fields: [
      defineField({
        name: "title",
        type: "string",
        title: "Tag Name",
      }),
      defineField({
        name: "slug",
        type: "slug",
        title: "Slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      }),
      defineField({
        name: "description",
        type: "text",
        title: "Description",
        description: "A short description of the tag (optional).",
      }),
      defineField({
        name: "icon",
        type: "image",
        title: "Icon",
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: "color",
        type: "string",
        title: "Color",
        description: "A color associated with the tag (e.g., #FF5733).",
      }),
    ],
  });
  