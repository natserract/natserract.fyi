import React from "react";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import format from "date-fns/format";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Prism } from "tinacms/dist/rich-text/prism";
import type { TinaMarkdownContent, Components } from "tinacms/dist/rich-text";
import { ProjectType } from "../../pages/projects/[filename]";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";

const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  DateTime: {
    format?: string;
  };
  Delete: {
    text: string;
  };
  video: {
    src: string
    poster: string
  }
}> = {
  code_block: (props) => <Prism {...props} />,
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    authorName: string;
  }) => {
    return (
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.authorName}
        </blockquote>
      </div>
    );
  },
  Delete: (props) => {
    return <del>{props.text}</del>;
  },
  DateTime: (props) => {
    const dt = React.useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case "iso":
        return <span>{format(dt, "yyyy-MM-dd")}</span>;
      case "utc":
        return <span>{format(dt, "eee, dd MMM yyyy HH:mm:ss OOOO")}</span>;
      case "local":
        return <span>{format(dt, "P")}</span>;
      default:
        return <span>{format(dt, "P")}</span>;
    }
  },
  img: (props) => (
    <span className="flex items-center justify-center">
      <img src={props.url} alt={props.alt} className='!my-3 w-full' />
    </span>
  ),
  a: (props) => (
    <a
      href={props.url}
      className="font-semibold underline text-sail-600 hover:text-blue-600 cursor-pointer"
    >
      {props.children}
    </a>
  ),
  video: (props) => (
    <video src={props.src} controls poster={props.poster} style={{ width: '100%', height: '500px' }}/>
  )
};

export const Project = (props: ProjectType) => {
  const theme = useTheme();
  const titleColorClasses = {
    blue: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500",
    teal: "from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-300 to-pink-500",
    purple:
      "from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500",
    orange:
      "from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500",
    yellow:
      "from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500",
  };

  const date = new Date(props.date);
  let formattedDate = "";
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "MMM dd, yyyy");
  }

  const handleBackToTop = () => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  };

  return (
    <Section className="flex-1">
      <div
        className={`flex-1 pb-2 mb-5 md:mb-8 border-b-0 md:border-b border-gray-250`}
      >
        <h2
          data-tina-field={tinaField(props, "title")}
          className={`w-full font-eb-garamond relative text-4xl title-font font-extrabold tracking-normal leading-snug`}
        >
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${
              titleColorClasses[theme.color]
            }`}
          >
            {props.title}
          </span>
        </h2>
      </div>

      <div className={`flex-1 !pt-0 !pb-10 sm:!pb-24`}>
        <article
          data-tina-field={tinaField(props, "_body")}
          className="prose dark:prose-dark prose-md text-sm prose-h2:font-eb-garamond prose-h3:font-eb-garamond prose-h4:font-eb-garamond w-full max-w-none"
        >
          <TinaMarkdown components={components} content={props._body} />
        </article>

        <div className="flex flex-row items-center gap-2 mt-20">
          <button className="hover:underline text-xs" onClick={handleBackToTop}>
            Back to Top
          </button>
          <span className="block text-gray-400 text-xs">/</span>
          <Link href="/projects" className="hover:underline text-xs">
            Projects
          </Link>
        </div>
      </div>
    </Section>
  );
};
