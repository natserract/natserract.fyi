import { tinaField } from "tinacms/dist/react";

import { useTheme } from "../layout";
import { NoteType } from "../../pages/notes/[filename]";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Prism } from "tinacms/dist/rich-text/prism";
import type { TinaMarkdownContent, Components } from "tinacms/dist/rich-text";

const components: Components<any> = {
  code_block: (props) => <Prism {...props} />,
};

export const Note = (props: NoteType) => {
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
    <Section className="flex-1 min-h-screen">
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

        <button
          className="mt-20 hover:underline text-xs"
          onClick={handleBackToTop}
        >
          Back to Top
        </button>
      </div>
    </Section>
  );
};
