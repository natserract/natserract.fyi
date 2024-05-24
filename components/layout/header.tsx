import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import { Icon } from "../util/icon";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";
import MobileMenu from "./mobile-menu";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();
  const theme = useTheme();

  const headerColor = {
    default:
      "text-black dark:text-white from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
  };

  const headerColorCss =
    data.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const activeItemClasses = {
    blue: "border-b-3 border-blue-200 text-blue-700 dark:text-blue-300 font-medium dark:border-blue-700",
    teal: "border-b-3 border-teal-200 text-teal-700 dark:text-teal-300 font-medium dark:border-teal-700",
    green:
      "border-b-3 border-green-200 text-green-700 dark:text-green-300 font-medium dark:border-green-700",
    red: "border-b-3 border-red-300 text-red-700 dark:text-green-300 font-medium dark:border-red-700",
    pink: "border-b-3 border-pink-200 text-pink-700 dark:text-pink-300 font-medium dark:border-pink-700",
    purple:
      "border-b-3 border-purple-200 text-purple-700 dark:text-purple-300 font-medium dark:border-purple-700",
    orange:
      "border-b-3 border-orange-200 text-orange-700 dark:text-orange-300 font-medium dark:border-orange-700",
    yellow:
      "border-b-3 border-yellow-300 text-yellow-700 dark:text-yellow-300 font-medium dark:border-yellow-600",
  };

  const activeBackgroundClasses = {
    blue: "text-blue-500",
    teal: "text-teal-500",
    green: "text-green-500",
    red: "text-red-500",
    pink: "text-pink-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden h-full bg-white md:bg-transparent border-b md:border-b-0 border-sail-200`}
    >
      <div className="relative z-10 w-full px-0 py-3 md:py-0 md:h-[100vh]">
        <div className="flex md:flex-col items-center justify-between md:items-start md:justify-normal gap-6">
          <h4 className="select-none text-3xl text-gray-800 font-bold tracking-tight mb-3 md:my-4 md:pt-3 px-6 transition duration-150 ease-out transform">
            <Link
              href="/posts"
              className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
            >
              <span
                className="block font-eb-garamond font-bold"
                data-tina-field={tinaField(data, "name")}
              >
                {data.name}
                <i className="block font-normal font-public-sans text-[12px] -mt-1 not-italic">
                  Personal and Research Notes
                </i>
              </span>
            </Link>
          </h4>

          <div className="navigation-menu sm:flex sm:flex-row sm:items-center">
            <MobileMenu data={data} key={router.asPath} />

            <div className="hidden sm:block">
              <ul className="sm:flex md:block sm:flex-row">
                {data.nav &&
                  data.nav.map((item, i) => {
                    const activeItem =
                      (item.href === ""
                        ? router.asPath === "/"
                        : router.asPath.includes(item.href)) && isClient;
                    return (
                      <li key={`${item.label}-${i}`}>
                        <Link
                          data-tina-field={tinaField(item, "label")}
                          href={`/${item.href}`}
                          className={`relative text-gray-800 select-none w-full text-xs inline-block hover:underline transition duration-150 ease-out hover:opacity-100 py-2 px-6 ${
                            activeItem ? `text-sail-500 underline` : ``
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>

        <div className="px-6 text-[11px] absolute bottom-10 hidden md:block">
          <span className="block">© {currentYear} Alfin Surya</span>
        </div>
      </div>
    </div>
  );
};
