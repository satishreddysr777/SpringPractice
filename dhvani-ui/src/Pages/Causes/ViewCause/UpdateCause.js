import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import TextField from "../../../components/TextField";
import TextArea from "../../../components/Textarea";
import * as Yup from "yup";
import ApiService from "../../../services/ApiService";
import { toast } from 'react-toastify';


export default function UpdateCause({
    open,
    setOpen,
    cause,
    causeUpdateCallback,
}) {
    const [data, setData] = useState(null);
    const [updateCauseResults, setUpdateCauseResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });

    useEffect(() => {
        if (cause) setData(cause);
    }, [cause]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            causeName: data?.causeName,
            causeFund: data?.causeFund,
            aboutTheCause: data?.aboutTheCause,
            causeDescription: data?.causeDescription
        },
        validationSchema: Yup.object().shape({
            causeName: Yup.string().required("Required"),
            causeFund: Yup.string().required("Required"),
            aboutTheCause: Yup.string().required("Required"),
            causeDescription: Yup.string().required("Required")
        }),
        onSubmit: () => {
            updateCause();
        },
    });

    const updateCause = async () => {
        setUpdateCauseResults({
            loading: true,
            error: false,
            message: "",
            data: null,
        });

        const {
            causeName,
            causeFund,
            aboutTheCause,
            causeDescription
        } = formik.values;

        const body = {
            id: data["_id"],
            causeName: causeName,
            causeFund: causeFund,
            aboutTheCause: aboutTheCause,
            causeDescription: causeDescription
        };

        try {
            let res = await ApiService.updateCause(body);
            setUpdateCauseResults((prev) => ({
                ...prev,
                loading: false,
                message: res.data,
            }));
            causeUpdateCallback();
            setOpen(false);
            toast.success("Cause updated", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            let message = error.response.data.message;
            setUpdateCauseResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                    <div className="flex min-h-full items-start justify-center p-4 sm:mt-[6%] sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-md transition-all sm:my-8 w-full sm:max-w-[60%] 2xl:max-w-[30%] h-full">
                                <div className="bg-white">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                            Update cause
                                        </h1>
                                        <form className="space-y-4 md:space-y-6">
                                            {/* <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2"> */}
                                            <div className="grid grid-cols-1 gap-6 mt-4">
                                                <div>
                                                    <TextField
                                                        label="Cause Name"
                                                        name="causeName"
                                                        type="text"
                                                        value={formik.values.causeName}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.causeName}
                                                        touched={formik.touched.causeName}
                                                        onBlur={formik.handleBlur}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <TextField
                                                        label="Cause Fund"
                                                        name="causeFund"
                                                        type="text"
                                                        value={formik.values.causeFund}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.causeFund}
                                                        touched={formik.touched.causeFund}
                                                        onBlur={formik.handleBlur}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <TextArea
                                                        label="About the cause"
                                                        name="aboutTheCause"
                                                        type="text"
                                                        value={formik.values.aboutTheCause}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.aboutTheCause}
                                                        touched={formik.touched.aboutTheCause}
                                                        onBlur={formik.handleBlur}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <TextArea
                                                        label="Cause description"
                                                        name="causeDescription"
                                                        type="text"
                                                        value={formik.values.causeDescription}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.causeDescription}
                                                        touched={formik.touched.causeDescription}
                                                        onBlur={formik.handleBlur}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {updateCauseResults.error && (
                                    <div
                                        className="bg-red-100 rounded-md py-2 px-6 mb-4 mx-[2rem] text-base text-center text-red-700"
                                        role="alert"
                                    >
                                        {updateCauseResults.message}
                                    </div>
                                )}

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={formik.handleSubmit}
                                    >
                                        {updateCauseResults.loading && (
                                            <span>
                                                <svg
                                                    aria-hidden="true"
                                                    role="status"
                                                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="#E5E7EB"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                <span>Updating...</span>
                                            </span>
                                        )}
                                        {!updateCauseResults.loading && (
                                            <span>Update</span>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
