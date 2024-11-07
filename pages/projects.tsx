import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import { Projects } from "../components/projects/projects";

export default function ProjectsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const projects = props.data.projectConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Projects data={projects} />
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type ProjectsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["projectConnection"]["edges"][number];
