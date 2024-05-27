import { InferGetStaticPropsType } from "next";
import { client } from "../../tina/__generated__/client";

// Use the props returned by get static props
export default function NotePage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return <div>{JSON.stringify(props)}</div>;
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.noteQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection();
  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export type PostType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["note"];
