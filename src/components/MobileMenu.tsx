import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import { NAVS } from "@/consts.ts";
import { isActivePage } from "@util/route";

export default function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="block sm:hidden mr-6">
      <button
        aria-label="Mobile Menu"
        type="button"
        className="border-0 cursor-pointer bg-transparent m-0"
        onClick={handleOpen}
        ref={ref}
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
            className="text-black block"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
            className="text-black block"
          >
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
        )}
      </button>

      {open && (
        <MobileMenuContent pathname={pathname} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

function MobileMenuContent({
  onClose,
  pathname,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);

  return createPortal(
    <div className="absolute bg-wild-sand-50 z-[100] max-h-[250px] top-[77px] left-0 right-0 bottom-0 ">
      <nav className="m-auto flex flex-col items-center pt-5" ref={ref}>
        {NAVS.map((item, i) => {
          const isActive = isActivePage(pathname, item.href);

          return (
            <a
              key={i}
              href={`${item.href}`}
              className={`relative select-none text-xs inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 hover:underline py-3 px-4 ${
                isActive ? `` : `opacity-70`
              }`}
              onClick={onClose}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>,
    document.body
  );
}
