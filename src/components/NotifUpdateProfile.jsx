import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../redux/reducers/profileReducer";
import { getProfile } from "../redux/action/dataAction";

export default function MyModal() {
  const dispatch = useDispatch();

  function close() {
    dispatch(setModal(false));
    dispatch(getProfile());
  }

  const status = useSelector((state) => state?.profile?.updateProfile);
  const modal = useSelector((state) => state?.profile?.Modal);
  const pesan = useSelector((state) => state?.profile?.updateProfile);

  return (
    <>
      <Dialog
        open={modal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-md bg-black/30">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="flex flex-col justify-center w-full max-w-md rounded-xl bg-white p-3 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <Button
                className="inline-flex justify-end gap-2 rounded-md "
                onClick={close}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </Button>

              <DialogTitle
                as="h3"
                className="text-base/7 font-medium"
              ></DialogTitle>
              <p className="mt-2 text-center text-base">
                {pesan === "Tolong masukkan data yang diperlukan" ? (
                  <p>{pesan}</p>
                ) : (
                  <p>{status?.message}</p>
                )}
              </p>

              <div className="mt-4"></div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
