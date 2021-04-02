import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import remarkWikiLink from "remark-wiki-link";
import { components } from "./mdx-components";

export const hydrateMdx = (source) => {
  return hydrate(source, { components });
};

export const renderMdxToString = (content) => {
  return renderToString(content, {
    mdxOptions: {
      components,
      remarkPlugins: [
        [
          remarkWikiLink,
          {
            pageResolver: (name) => [name],
            hrefTemplate: (link) => link,
          },
        ],
      ],
    },
  });
};
