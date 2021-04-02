import hydrate from "next-mdx-remote/hydrate";
import Body from "../components/Body";
import { components } from "../libs/mdx-components";
import { renderMdxToString } from "../libs/mdx";
import { getAllPostIds, getPostData } from "../libs/post";

const PostPage = ({ postData }) => {
  const content = hydrate(postData.content, { components });
  return <Body title={`${postData.id}`}>{content}</Body>;
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
  postData.content = await renderMdxToString(postData.content);
  return {
    props: {
      postData,
    },
  };
};

export default PostPage;
