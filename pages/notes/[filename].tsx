import { InferGetStaticPropsType } from "next";
import { useTina } from "tinacms/dist/react";

import { client } from "../../tina/__generated__/client";
import { Layout } from "../../components/layout";
import { Note } from "../../components/notes/note";

// Use the props returned by get static props
export default function NotePage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  if (data && data.note) {
    return (
      <Layout rawData={data} data={data.global}>
        <Note {...data.note} />
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
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
  const notesListData = await client.queries.noteConnection();
  return {
    paths: notesListData.data.noteConnection.edges.map((note) => ({
      params: { filename: note.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export type NoteType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["note"];
