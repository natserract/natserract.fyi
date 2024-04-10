import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Container } from "../../util/container";
import { RawRenderer } from "./rawRenderer";
import { useTheme } from "..";
import { Icon } from "../../util/icon";

export const Footer = ({ data, icon, rawData }) => {
  const theme = useTheme();
  const socialIconClasses = "h-5 w-auto";
  const socialIconColorClasses = {
    blue: "text-blue-500 dark:text-blue-400 hover:text-blue-300",
    teal: "text-teal-500 dark:text-teal-400 hover:text-teal-300",
    green: "text-green-500 dark:text-green-400 hover:text-green-300",
    red: "text-red-500 dark:text-red-400 hover:text-red-300",
    pink: "text-pink-500 dark:text-pink-400 hover:text-pink-300",
    purple: "text-purple-500 dark:text-purple-400 hover:text-purple-300",
    orange: "text-orange-500 dark:text-orange-400 hover:text-orange-300",
    yellow: "text-yellow-500 dark:text-yellow-400 hover:text-yellow-300",
    primary: "text-white opacity-80 hover:opacity-100",
  };

  const footerColor = {
    default:
      "text-gray-800 from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000",
    primary: {
      blue: "text-white from-blue-500 to-blue-700",
      teal: "text-white from-teal-500 to-teal-600",
      green: "text-white from-green-500 to-green-600",
      red: "text-white from-red-500 to-red-600",
      pink: "text-white from-pink-500 to-pink-600",
      purple: "text-white from-purple-500 to-purple-600",
      orange: "text-white from-orange-500 to-orange-600",
      yellow: "text-white from-yellow-500 to-yellow-600",
    },
  };

  const footerColorCss =
    data.color === "primary"
      ? footerColor.primary[theme.color]
      : footerColor.default;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer
      className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 ${footerColorCss}`}
    >
      <Container
        size="custom"
        className="py-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 relative z-10 max-w-8xl"
      >
        <div className="flex justify-center gap-4 sm:justify-between items-center flex-wrap">
          <span className="text-xs">
            © {currentYear} Alfin Surya. Opinions Are My Own
          </span>

          <div className="flex gap-4">
            <a
              className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
              href={data.social.github}
              target="_blank"
            >
              <FaGithub
                className={`${socialIconClasses} ${
                  socialIconColorClasses[
                    data.color === "primary" ? "primary" : theme.color
                  ]
                }`}
              />
            </a>

            <a
              className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
              href="https://www.linkedin.com/in/alfinsurya/"
              target="_blank"
            >
              <FaLinkedin
                className={`${socialIconClasses} ${
                  socialIconColorClasses[
                    data.color === "primary" ? "primary" : theme.color
                  ]
                }`}
              />
            </a>

            <a
              className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
              href="mailto:alfins132@gmail.com"
              target="_blank"
            >
              <FaEnvelope
                className={`${socialIconClasses} ${
                  socialIconColorClasses[
                    data.color === "primary" ? "primary" : theme.color
                  ]
                }`}
              />
            </a>
          </div>
        </div>
        <div
          className={`absolute h-1 bg-gradient-to-r from-transparent ${
            data.color === "primary" ? `via-white` : `via-black dark:via-white`
          } to-transparent top-0 left-4 right-4 opacity-5`}
        ></div>
      </Container>
    </footer>
  );
};
