import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

// Assets
import IconCloseDark from "../../../../public/icon-close-dark.svg";
import IconCloseLight from "../../../../public/icon-close-light.svg";

type size = "auto" | "full";
type colorScheme = "dark" | "light";

interface ColorScheme {
  body: string;
  footer: string;
  icon: string;
}

type ColorSchemeType = "dark" | "light";

type ColorSchemeMap = Record<ColorSchemeType, ColorScheme>;

const sizes = {
  auto: "sm:w-full sm:h-full sm:max-w-lg h-screen w-full",
  full: "h-screen w-full",
};

const colorSchemes: ColorSchemeMap = {
  light: {
    body: "bg-white text-gray-800",
    footer: "bg-gray-50",
    icon: IconCloseDark,
  },
  dark: {
    body: "bg-gray-800 text-white",
    footer: "bg-gray-700",
    icon: IconCloseLight,
  },
};

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  colorScheme?: colorScheme;
  size?: size;
}

export default function Modal({
  isOpen,
  setIsOpen,
  title,
  body,
  footer,
  colorScheme = "light",
  size = "auto",
}: ModalProps) {
  const closeButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={closeButtonRef}
        onClose={setIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`${colorSchemes[colorScheme].body} ${sizes[size]} relative transform overflow-hidden sm:rounded-lg text-left shadow-xl transition-all sm:my-8 flex flex-col`}
              >
                <div className={`px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col`}>
                  <button
                    type="button"
                    className="mr-0 ml-auto px-3 py-2 h-9 w-9"
                    onClick={setIsOpen}
                    ref={closeButtonRef}
                  >
                    <Image
                      src={colorSchemes[colorScheme].icon}
                      alt="close icon"
                    />
                  </button>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">{body}</div>
                    </div>
                  </div>
                </div>
                {footer && (
                  <div
                    className={`${colorSchemes[colorScheme].footer} px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mb-0 mt-auto`}
                  >
                    {footer}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
