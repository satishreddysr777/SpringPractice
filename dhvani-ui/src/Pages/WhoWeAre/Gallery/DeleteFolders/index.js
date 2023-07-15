import { Fragment, useState, useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import TextField from "../../../../components/TextField";
import * as Yup from "yup";
import ApiService from "../../../../services/ApiService";
import { useDispatch } from "react-redux";
import { addError } from "../../../../redux/pageErrorHandler";
import { toast } from 'react-toastify';


const DeleteFolders = ({ open, setOpen, folders = [], reload = () => {}, currentPath, getFolders = () => {} }) => {

    const dispatch = useDispatch()
    
    const [available_folders, set_available_folders] = useState([])
    const [selected_folders, set_selected_folders] = useState([])

    const [delete_folders_res, set_delete_folders_res] = useState({ 'loading': false, 'error': false, 'message': '', 'data': null })

    const delete_folders = async () => {
        try {
            set_delete_folders_res({ 
                loading: true,
                error: false,
                message: "",
                data: null 
            })

            let res = await ApiService.delete_folders(selected_folders)
            set_delete_folders_res(prev => ({
                ...prev,
                "loading": false,
                "message": res.data.message
            }))
            reload(currentPath)
            set_selected_folders([])
            setOpen(false)
            toast.success("Selected folders deleted!", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            let message = error.response?.data?.message
            dispatch(addError(message))
            set_delete_folders_res(prev => ({
                ...prev,
                "loading": false,
                "error": true,
                "message": message
            }))
        }
    }


    const on_selected_folder = (index) => {
        const updatedFolders = [...available_folders];
        updatedFolders[index] = {
            ...updatedFolders[index],
            active: true
        };
        set_available_folders(updatedFolders);

        const selectedFolderId = available_folders[index]._id;
        set_selected_folders(prevSelectedFolders => [...prevSelectedFolders, selectedFolderId]);
    }

    useEffect(() => {

        if (open) {
            set_available_folders(getFolders())
        }

    }, [open])


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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-md transition-all sm:my-8 w-full sm:max-w-[100em] sm:mx-5 h-full">
                                <div className="bg-white">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                            Delete Folders
                                        </h1>

                                        <span>Please select folders to delete</span>

                                        <div
                                            className="bg-orange-100 rounded-md py-2 px-6 my-4 text-base text-center text-orange-700"
                                            role="alert"
                                        >
                                            Note: If a folder is deleted. All the files associated with the folder also deleted.
                                        </div>

                                        <div className="grid md:grid-cols-4 md:gap-4">
                                            {available_folders.length > 0 && available_folders.map((folder, index) => (
                                                <div key={index} className={`bg-white rounded-md border overflow-hidden hover:ring-2 ${folder.active && 'ring-2'} ring-[#10a37f] cursor-pointer mt-2`} onClick={() => on_selected_folder(index)}>
                                                    <div className="p-4">
                                                        <h3 className="font-medium text-gray-700"> {folder.folderName} </h3>
                                                    </div>
                                                </div>
                                            ))}
                                            {available_folders.length === 0 && <div>No folders found.</div>}
                                        </div>

                                    </div>
                                </div>

                                

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        disabled={selected_folders.length === 0}
                                        className="inline-flex w-full disabled:opacity-[.6] disabled:cursor-not-allowed justify-center rounded-md border border-transparent bg-[#10a37f] px-4 py-2 text-base font-medium text-white shadow-sm hover:opacity-80 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={delete_folders}
                                    >
                                        {delete_folders_res.loading && (
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
                                                <span>Deleting...</span>
                                            </span>
                                        )}
                                        {!delete_folders_res.loading && (
                                            <span>Delete</span>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            set_selected_folders([])
                                            setOpen(false)
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

export default DeleteFolders;
