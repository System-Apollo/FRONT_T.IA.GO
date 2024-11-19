import * as Dialog from "@radix-ui/react-dialog";

interface AlertDialogProps {
    title: string;
    text: string;
    buttonText: string;
    onClick: () => void;
    showCancelButton?: boolean;
    open: boolean;
    iconError?: boolean;
}

const AlertDialog403: React.FC<AlertDialogProps> = ({
    title,
    text,
    buttonText,
    onClick,
    showCancelButton = true,
    open,
    iconError = false,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClick}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 z-50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4 z-50">
          <div className="bg-white rounded-md shadow-lg px-4 py-6">
            <div className={`flex items-center justify-center w-12 h-12 mx-auto rounded-full ${iconError ? 'bg-red-100' : 'bg-green-100'}`}>
              {iconError ? (
                // Error
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.707-9.707a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293a1 1 0 10-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293z" clipRule="evenodd" />
                </svg>
              ) : (
                // Success
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <Dialog.Title className="text-lg font-medium text-gray-800 text-center mt-3">
              {title}
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-sm leading-relaxed text-center text-gray-500">
              {text}
            </Dialog.Description>
            <div className="items-center gap-2 mt-3 text-sm sm:flex">
              <Dialog.Close asChild>
                <button
                  onClick={onClick}
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-700 hover:bg-blue-600 duration-150 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  {buttonText}
                </button>
              </Dialog.Close>
              {showCancelButton && (
                <Dialog.Close asChild>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 bg-gray-200 hover:bg-gray-300 duration-150 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
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

export default AlertDialog403;
