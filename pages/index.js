import hydrate from "next-mdx-remote/hydrate";
import Body from "../components/Body";
import { components } from "../libs/mdx-components";
import { renderMdxToString } from "../libs/mdx";
import { getPostData } from "../libs/post";

const IndexPage = ({ postData }) => {
  const content = hydrate(postData.content, { components });
  return <Body title={postData.id}>{content}</Body>;
};

export const getStaticProps = async () => {
  const postData = getPostData("index");
  postData.content = await renderMdxToString(postData.content);
  return {
    props: {
      postData,
    },
  };
};

export default IndexPage;
