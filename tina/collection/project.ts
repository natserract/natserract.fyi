import type { Collection } from "tinacms";

import { stringToSlug } from "../utils/string";

const Project: Collection = {
  label: "Projects",
  name: "project",
  path: "content/projects",
  format: "mdx",
  ui: {
    filename: {
      readonly: true,
      slugify: (values) => {
        return stringToSlug(values?.title || "no-topic");
      },
    },
    router: ({ document }) => {
      return `/projects/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      required: true,
    },
    {
      type: "string",
      label: "Cover",
      name: "cover",
    },
    {
      type: "string",
      label: "External",
      name: "external",
    },
    {
      type: "datetime",
      label: "Posted Date",
      name: "date",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A",
      },
    },
    {
      type: "string",
      label: "Category",
      name: "category",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"],
            },
          ],
        },
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
            },
            {
              name: "authorName",
              label: "Author",
              type: "string",
            },
          ],
        },
        {
          name: "video",
          label: "Video",
          fields: [
            {
              type: "string",
              label: "Src",
              name: "src",
            },
            {
              type: "string",
              label: "Poster",
              name: "poster",
            },
          ]
        }
      ],
      isBody: true,
    },
  ]
}

export default Project;