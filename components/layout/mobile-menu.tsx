import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useOverlayTriggerState } from "@react-stately/overlays";
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
} from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { useButton } from "@react-aria/button";

import { GlobalHeader } from "../../tina/__generated__/types";

function ModalDialog(
  props: Parameters<typeof useOverlay>[0] &
    Parameters<typeof useDialog>[0] & { data: GlobalHeader },
) {
  const router = useRouter();

  const ref = useRef<HTMLElement | null>(null);
  const { modalProps } = useModal();
  const { overlayProps } = useOverlay(props, ref);
  const { dialogProps } = useDialog(props, ref);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  usePreventScroll();

  return (
    <div className="fixed bg-wild-sand-50 z-[100] top-[83px] left-0 right-0 bottom-0 flex items-center justify-center">
      <FocusScope contain restoreFocus autoFocus>
        <nav
          className="m-auto flex flex-col items-center"
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
        >
          {props.data.nav &&
            props.data.nav.map((item) => {
              const activeItem =
                (item.href === ""
                  ? router.asPath === "/"
                  : router.asPath.includes(item.href)) && isClient;

              return (
                <Link
                  key={item.href}
                  href={`/${item.href}`}
                  className={`relative select-none text-xs inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 hover:underline py-8 px-4 ${
                    activeItem ? `` : `opacity-70`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>
      </FocusScope>
    </div>
  );
}

export default function MobileMenu({ data }: { data: GlobalHeader }) {
  const state = useOverlayTriggerState({});
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(
    {
      onPress: () => (state.isOpen ? state.close() : state.open()),
    },
    ref,
  );

  return (
    <div className="block sm:hidden mr-6">
      <button
        aria-label="Mobile Menu"
        type="button"
        className="border-0 cursor-pointer bg-transparent m-0"
        {...buttonProps}
        ref={ref}
      >
        {state.isOpen ? (
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
      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog
            isOpen
            data={data}
            onClose={(...props) => state.close(...props)}
          />
        </OverlayContainer>
      )}
    </div>
  );
}
