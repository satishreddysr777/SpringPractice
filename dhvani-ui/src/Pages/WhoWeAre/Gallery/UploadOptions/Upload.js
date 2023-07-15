import { Fragment, useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import TextField from "../../../../components/TextField";
import * as Yup from "yup";
import ApiService from "../../../../services/ApiService";
import { useDispatch } from "react-redux";
import { addError } from "../../../../redux/pageErrorHandler";
import { toast } from 'react-toastify';


const AddFolder = ({ open, setOpen, type, folderInfo = null, getFolders = () => {} }) => {

    const dispatch = useDispatch()

    const [addFolderResults, setAddFolderResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });
    const [addFilesResults, setAddFilesResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });

    const [documents, setDocuments] = useState([]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            folderName: "",
        },
        validationSchema: Yup.object().shape({
            folderName: Yup.string().required("Required"),
        }),
        onSubmit: () => {
            addFolder()
        },
    });

    const addFolder = async () => {
        setAddFolderResults({ 
            loading: true,
            error: false,
            message: "",
            data: null 
        })
        try {
            let data = {
                folderName: formik.values.folderName,
                path: folderInfo.path,
                folderId: folderInfo._id
            }
            await ApiService.addFolder(data)
            formik.resetForm()
            setAddFolderResults(prev => ({
                ...prev,
                "loading": false
            }))
            setOpen(false)
            getFolders(folderInfo.path)
            toast.success("Folder Added", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            console.log(error)
            let message = error.response?.data?.message
            setAddFolderResults(prev => ({
                ...prev,
                "loading": false,
                "error": true,
                "message": message
            }))
        }
    }


    const onSelectDocuments = (e) => {
        setDocuments([...e.target.files]);
    };

    const uploadFiles = async () => {
        try {
            setAddFilesResults({ 
                loading: true,
                error: false,
                message: "",
                data: null 
            })

            const formData = new FormData();
            formData.append("folderId", folderInfo?._id);

            for (let i = 0; i < documents.length; i++) {
                formData.append("files", documents[i]);
            }

            await ApiService.uploadGalleryFiles(formData);
            setAddFilesResults(prev => ({
                ...prev,
                "loading": false
            }))
            setDocuments([])
            setOpen(false)
            getFolders(folderInfo.path)
            toast.success("Images Uploaded", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            let message = error.response?.data?.message
            dispatch(addError(message));
            setAddFilesResults(prev => ({
                ...prev,
                "loading": false,
                "error": true,
                "message": message
            }))
        }
    }


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
                    <div className="flex min-h-full items-start justify-center p-4 sm:mt-[1%] sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-md transition-all sm:my-8 w-full sm:max-w-[40em] h-full">
                                <div className="bg-white">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                            {type === 'folder' ? 'Create Folder' : 'Upload Images'}
                                        </h1>
                                        <form className="space-y-4 md:space-y-6">
                                            {type === 'folder' && (
                                                <div>
                                                    <TextField
                                                        label="Folder Name"
                                                        name="folderName"
                                                        type="text"
                                                        value={formik.values.folderName}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.folderName}
                                                        touched={formik.touched.folderName}
                                                        onBlur={formik.handleBlur}
                                                        required
                                                    />
                                                </div>
                                            )}
                                            

                                            {type === 'file' && (
                                                <div className="relative border-2 border-dashed border-gray-400 rounded-md p-6 !mt-0 flex flex-col justify-center items-center">
                                                <div className="text-gray-600">
                                                    <div className="mt-1 text-sm leading-normal">
                                                        {documents.length === 0 && (
                                                            <>
                                                                <label
                                                                    htmlFor="file-upload"
                                                                    className="text-blue-500 cursor-pointer hover:underline"
                                                                >
                                                                    Choose files
                                                                </label>{" "}
                                                                to upload
                                                            </>
                                                        )}
            
                                                        {documents.length > 0 && (
                                                            <>
                                                                Selected Files: <br />
                                                                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                                                    {documents.map((doc, docindex) => (
                                                                        <li key={docindex} >
                                                                            {doc.name}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                                <label
                                                                    htmlFor="file-upload"
                                                                    className="text-blue-500 cursor-pointer hover:underline mt-5"
                                                                >
                                                                    change
                                                                </label>
                                                                <label
                                                                    onClick={() =>
                                                                        setDocuments([])
                                                                    }
                                                                    className="text-red-500 cursor-pointer hover:underline ml-5"
                                                                >
                                                                    Clear
                                                                </label>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <input
                                                    multiple
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={onSelectDocuments}
                                                />
                                            </div>
                                            )}
                                        </form>
                                    </div>
                                </div>

                                {addFolderResults.error && (
                                    <div
                                        className="bg-red-100 rounded-md py-2 px-6 mb-4 mx-[2rem] text-base text-center text-red-700"
                                        role="alert"
                                    >
                                        {addFolderResults.message}
                                    </div>
                                )}

                                {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (type === 'folder') formik.handleSubmit()
                                            if (type === 'file') uploadFiles()
                                        }}
                                        className={`bg-[#10a37f] w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 ml-2 sm:w-auto`}
                                    >
                                        {addFolderResults.loading && (
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
                                                <span>Processing...</span>
                                            </span>
                                        )}
                                        {!addFolderResults.loading && (
                                            <span>Continue</span>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            formik.resetForm()
                                            setOpen(false)
                                            setAddFolderResults(prev => ({
                                                ...prev,
                                                "error": false,
                                            }))
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div> */}

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full disabled:opacity-[.6] disabled:cursor-not-allowed justify-center rounded-md border border-transparent bg-[#10a37f] px-4 py-2 text-base font-medium text-white shadow-sm hover:opacity-80 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            if (type === 'folder') formik.handleSubmit()
                                            if (type === 'file') uploadFiles()
                                        }}
                                    >
                                        {(addFilesResults.loading || addFolderResults.loading) && (
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
                                                <span>Processing...</span>
                                            </span>
                                        )}
                                        {(!addFilesResults.loading && !addFolderResults.loading) && (
                                            <span>Continue</span>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            formik.resetForm()
                                            setOpen(false)
                                            setAddFolderResults(prev => ({
                                                ...prev,
                                                "error": false,
                                            }))
                                        }}
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
};

export default AddFolder;
