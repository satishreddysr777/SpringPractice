import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as XLSX from "xlsx";
import moment from "moment";
import axios from "axios";
import ApiService from "../../../services/ApiService";
import { toast } from 'react-toastify';

export default function Modal({ open, setOpen, onUploadComplete }) {
    const cancelButtonRef = useRef(null);

    const [file, setFile] = useState(null);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
    };

    const onSelectFile = () => {
        setUploadPercent(0);
        if (!file) return;

        const ExcelDateToJSDate = (date) => {
            return new Date((date - (25567 + 1)) * 86400 * 1000);
        };

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws);

            for (let i = 0; i < data.length; i++) {
                let projectStartDate = ExcelDateToJSDate(
                    data[i]["projectStartDate"]
                );
                let projectEndDate = ExcelDateToJSDate(
                    data[i]["projectEndDate"]
                );
                data[i]["projectStartDate"] =
                    moment(projectStartDate).format("YYYY-MM-DD");
                data[i]["projectEndDate"] =
                    moment(projectEndDate).format("YYYY-MM-DD");
            }
            uploadFile(data);
        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    };

    const uploadFile = async (projects) => {
        try {
            setLoading(true);
            await ApiService.uploadPreviousProjects(projects);
            setLoading(false);
            onUploadComplete();
            setOpen(false);
            toast.success("Previous projects uploaded.", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            setLoading(false);
            setUploadError(error.response.data.message);
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Upload previous projects
                                            </Dialog.Title>
                                            {!loading && (
                                                <div className="mt-6">
                                                    <div className="relative border-2 border-dashed border-gray-400 rounded-md p-6 !mt-0 flex flex-col justify-center items-center">
                                                        <div className="text-gray-600">
                                                            <p className="mt-1 text-sm leading-normal">
                                                                {!file && (
                                                                    <>
                                                                        <label
                                                                            htmlFor="file-upload"
                                                                            className="text-blue-500 cursor-pointer hover:underline"
                                                                        >
                                                                            Choose a file
                                                                        </label>{" "}
                                                                        to
                                                                        upload
                                                                    </>
                                                                )}
                                                                {file && (
                                                                    <>
                                                                        Selected
                                                                        file{" "}
                                                                        {"->"}{" "}
                                                                        {
                                                                            file.name
                                                                        }{" "}
                                                                        <label
                                                                            htmlFor="file-upload"
                                                                            className="text-blue-500 cursor-pointer hover:underline"
                                                                        >
                                                                            change
                                                                        </label>
                                                                    </>
                                                                )}
                                                            </p>
                                                        </div>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            className="hidden"
                                                            onChange={
                                                                onChangeFile
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {uploadError && (
                                    <div
                                        className="bg-red-100 rounded-md py-2 px-6 mx-6 text-base text-center text-red-700"
                                        role="alert"
                                    >
                                        {uploadError}
                                    </div>
                                )}

                                {loading && (
                                    <div className="">
                                        <div className="bg-white px-2 py-5 flex justify-center items-center">
                                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-700 mr-3"></div>
                                            <span>Please wait</span>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={onSelectFile}
                                    >
                                        Upload
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
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
