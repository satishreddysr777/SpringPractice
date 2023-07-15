import { removeError } from "../../redux/pageErrorHandler";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Dialog from "../Dialog";

const PageErrorHandler = () => {
    const pageErrorState = useSelector((state) => state.pageErrors);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setErrors(pageErrorState.errors);
        if (pageErrorState.errors.length > 0 && !open) {
            setOpen(true);
        }
        window.addEventListener("beforeunload", removeErrorFn);

        return () => {
            window.removeEventListener("beforeunload", removeErrorFn);
        };
    }, [dispatch, pageErrorState.errors]);

    const onCloseDialog = (v) => {
        removeErrorFn();
        setOpen(v);
    };

    const removeErrorFn = () => {
        pageErrorState.errors.forEach((error) => {
            dispatch(removeError(error.id));
        });
    };

    return (
        <>
            <Dialog
                open={open}
                setOpen={onCloseDialog}
                // size='lg'
            >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <div className="mt-2">
                                <ul className="list-disc text-red-500">
                                    {errors.map((item, index) => (
                                        <span key={index}>{item.message}</span>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => onCloseDialog(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Dialog>
        </>
    );
};

export default PageErrorHandler;
