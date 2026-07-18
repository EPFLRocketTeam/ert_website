import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "about",
        label: "About pages",
        path: "content/about",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "css",
            label: "Page CSS",
            description: "Optional path or filename for page-specific CSS (e.g. page.css)",
          },
          {
            type: "string",
            name: "js",
            label: "Page JS",
            description: "Optional path or filename for page-specific JS (e.g. page.js)",
          },
        ],
      },
      {
        name: "contact",
        label: "Contact pages",
        path: "content/contact",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "css",
            label: "Page CSS",
          },
          {
            type: "string",
            name: "js",
            label: "Page JS",
          },
        ],
      },
      {
        name: "join_us",
        label: "Join Us",
        path: "content/join-us",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "css",
            label: "Page CSS",
          },
          {
            type: "string",
            name: "js",
            label: "Page JS",
          },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        path: "content/projects",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            description: "Short summary used in project lists",
          },
          {
            type: "string",
            name: "css",
            label: "Page CSS",
          },
          {
            type: "string",
            name: "js",
            label: "Page JS",
          },
        ],
      },
      {
        name: "shop",
        label: "Shop pages",
        path: "content/shop",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "css",
            label: "Page CSS",
          },
          {
            type: "string",
            name: "js",
            label: "Page JS",
          },
        ],
      },
      {
        name: "sponsors",
        label: "Sponsors",
        path: "content/sponsors",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "css",
            label: "Page CSS",
          },
          {
            type: "string",
            name: "js",
            label: "Page JS",
          },
        ],
      },
      {
        name: "privacy_policy",
        label: "Privacy Policy",
        path: "content/privacy-policy",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "space_race",
        label: "Space Race",
        path: "content/space-race",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "css",
            label: "Page CSS",
          },
          {
            type: "string",
            name: "js",
            label: "Page JS",
          },
        ],
      },
      {
        name: "board",
        label: "Board pages",
        path: "content/about/board",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "css",
            label: "Page CSS",
          },
          {
            type: "string",
            name: "js",
            label: "Page JS",
          },
        ],
      },
    ],
  },
});
