import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import TextField from "../../../components/TextField";
import * as Yup from "yup";

const AddTeammate = ({ open, setOpen, handleAddPlayer }) => {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: '',
            lastName: '',
            contactNumber: ''
        },
        validationSchema: Yup.object().shape({

        }),
        onSubmit: (values, {resetForm}) => {
            handleAddPlayer({ firstName: values.firstName, lastName: values.lastName, contactNumber: values.contactNumber })
            resetForm()
            setOpen(false)
        },
    });

    
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-md transition-all sm:my-8 w-full sm:max-w-[40em] h-full">
                                <div className="bg-white">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                            Add Player
                                        </h1>
                                        <form className="space-y-4 md:space-y-6">
                                            <div>
                                                <TextField
                                                    label="Firstname "
                                                    name="firstName"
                                                    type="text"
                                                    value={formik.values.firstName}
                                                    onChange={formik.handleChange}
                                                    error={formik.errors.firstName}
                                                    touched={formik.touched.firstName}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </div>
                                            <div>
                                                <TextField
                                                    label="Lastname "
                                                    name="lastName"
                                                    type="text"
                                                    value={formik.values.lastName}
                                                    onChange={formik.handleChange}
                                                    error={formik.errors.lastName}
                                                    touched={formik.touched.lastName}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </div>
                                            <div>
                                                <TextField
                                                    label="Contact number "
                                                    name="contactNumber"
                                                    type="text"
                                                    value={formik.values.contactNumber}
                                                    onChange={formik.handleChange}
                                                    error={formik.errors.contactNumber}
                                                    touched={formik.touched.contactNumber}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>

                                {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={formik.handleSubmit}
                                        disabled={(formik.values.firstName == '' || formik.values.lastName == '' || formik.values.contactNumber == '') ? true : false}
                                        className={`bg-[#10a37f] disabled:opacity-[.6] disabled:cursor-not-allowed w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 ml-2 sm:w-auto`}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            formik.resetForm()
                                            setOpen(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div> */}

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full disabled:opacity-[.6] disabled:cursor-not-allowed justify-center rounded-md border border-transparent bg-[#10a37f] px-4 py-2 text-base font-medium text-white shadow-sm hover:opacity-80 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={formik.handleSubmit}
                                        disabled={(formik.values.firstName == '' || formik.values.lastName == '' || formik.values.contactNumber == '') ? true : false}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            formik.resetForm()
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
    )
}

export default AddTeammate