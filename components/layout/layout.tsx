import React from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import layoutData from "../../content/global/index.json";
import { Global } from "../../tina/__generated__/types";

export const Layout = ({
  rawData = {},
  data = layoutData,
  children,
}: {
  rawData?: object;
  data?: Omit<Global, "id" | "_sys" | "_values">;
  children: React.ReactNode;
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <>
      <Head>
        <title>Natserract. Personal and Research Notes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Theme data={data?.theme}>
        <div className={`min-h-screen font-public-sans bg-wild-sand-50`}>
          <aside className="block relative md:absolute z-20 inset-0 top-0 left-0 right-auto md:w-[19rem] md:pr-6">
            <Header data={data?.header} />
          </aside>
          <aside className="md:pl-20 bg-white md:ml-[14em] px-6 md:px-0 md:border-l border-sail-200">
            <div className="text-gray-800 pt-8 md:pt-10 max-w-5xl md:pr-16 pb-10">
              {children}
            </div>
          </aside>
        </div>

        <div className="px-6 pt-2 pb-10 text-[11px] block md:hidden">
          <span className="block">© {currentYear} Alfin Surya</span>
        </div>
      </Theme>
    </>
  );
};
