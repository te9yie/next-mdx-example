import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { wikiLinkPlugin } from "remark-wiki-link";
import { getAllPostIds, getPostData } from "../libs/post";

const components = {};
const remarkPlugins = [wikiLinkPlugin];

const PostPage = ({ postData }) => {
  const content = hydrate(postData.content, { components });
  return (
    <>
      <h1>{postData.id}</h1>
      <div>{content}</div>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = getPostData(params.id);
  postData.content = await renderToString(postData.content, {
    components,
    mdxOptions: {
      remarkPlugins,
    },
  });
  return {
    props: {
      postData,
    },
  };
};

export default PostPage;
