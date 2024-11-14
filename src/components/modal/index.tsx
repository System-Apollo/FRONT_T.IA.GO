import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface ModalProps {
    title: string;
    text: ReactNode;
    buttonText: string;
    onClick: () => void;
    showCancelButton?: boolean;
    open: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, text, buttonText, onClick, showCancelButton = true, open }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClick}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 z-50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl mx-auto px-4 z-50"
        >
          <div className="bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                {title}
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Dialog.Close>
            </div>
            {/* Render the text prop directly to display JSX */}
            <Dialog.Description className="p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              {text}
            </Dialog.Description>
            <div className="flex items-center gap-3 p-4 border-t">
              <Dialog.Close asChild>
                <button onClick={onClick} className="px-6 py-2 text-white bg-blue-700 hover:bg-blue-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 duration-150">
                  {buttonText}
                </button>
              </Dialog.Close>
              {showCancelButton && (
                <Dialog.Close asChild>
                  <button
                    className="px-6 py-2 text-gray-800 border bg-gray-200 hover:bg-gray-300 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 duration-150"
                    aria-label="Close"
                  >
                    Cancelar
                  </button>
                </Dialog.Close>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
