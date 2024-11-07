import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";

export default function ProjectPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      {JSON.stringify(data, null, 2)}
    </Layout>
  );
}

export const getStaticProps = async({params}) => {
  const tinaProps = await client.queries.projectQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
}

export const getStaticPaths = async () => {
  const postsListData = await client.queries.projectConnection();
  return {
    paths: postsListData.data.projectConnection.edges.map((project) => ({
      params: { filename: project.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export type ProjectType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["project"];
