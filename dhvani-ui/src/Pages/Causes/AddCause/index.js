import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import { useFormik } from "formik";
import Loader from "../../../components/Loader";
import TextField from "../../../components/TextField";
import TextArea from "../../../components/Textarea";
import * as Yup from "yup";
import Constants from "../../../utils/Constants";
import { setUser } from "../../../redux/auth";
import { addError } from "../../../redux/pageErrorHandler";
import SelectDate from "../../../components/SelectDate";
import { toast } from 'react-toastify';

const AddCause = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);


    const [addCauseResults, setAddCauseResults] = useState({ 'loading': false, 'error': false, 'message': '', 'data': null })
    const [documents, setDocuments] = useState([])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            causeTitle: "",
            email: authState?.user?.email,
            aboutTheCause: "",
            causeDescription: "",
            causeBudget: "",
            phoneNumber: "",
            websiteUrl: "",
        },
        validationSchema: Yup.object().shape({
            causeTitle: Yup.string().required("Project Name is required"),
            causeTitle: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            aboutTheCause: Yup.string().required("Required"),
            causeDescription: Yup.string().required("Required"),
            causeBudget: Yup.string().required("Required"),
            phoneNumber: Yup.string().required("Required"),
            websiteUrl: "",
        }),
        onSubmit: (values) => {
            addCause(values)
        },
    });

    // console.log(formik.errors)
    // console.log(formik.touched)

    const addCause = async (values) => {
        try {
            setAddCauseResults({
                loading: true,
                error: false,
                message: "",
                data: null,
            });
            let {
                causeTitle,
                email,
                aboutTheCause,
                causeDescription,
                causeBudget,
                phoneNumber,
                websiteUrl
            } = values;

            const formData = new FormData();
            formData.append("causeTitle", causeTitle);
            formData.append("email", email);
            formData.append("aboutTheCause", aboutTheCause);
            formData.append("causeDescription", causeDescription);
            formData.append("causeBudget", causeBudget);
            formData.append("phoneNumber", phoneNumber);
            formData.append("websiteUrl", websiteUrl);
            formData.append("status", false);

            for (let i = 0; i < documents.length; i++) {
                formData.append("files", documents[i]);
            }

            let res = await ApiService.addCause(formData);
            setAddCauseResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data,
            }));

            formik.resetForm();
            setDocuments([])
            toast.success("Cause submitted", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            const message = error.response.data.message;
            dispatch(addError(message));
            setAddCauseResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const onSelectDocuments = (e) => {
        setDocuments([...e.target.files]);
        console.log([...e.target.files])
    };

    return (
        <section>
            <Loader open={addCauseResults.loading} />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Submit Cause
                    </h1>
                </div>
            </header>

            <div className="flex justify-center w-full my-[2rem]">
                <div className="w-full max-w-[80rem] mx-2 h-full">
                    <div className=" w-[100%] mx-auto bg-white rounded-lg shadow border p-5">
                        <form className="space-y-4 m-4 md:space-y-6">
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <TextField
                                        label="Cause Title"
                                        name="causeTitle"
                                        type="text"
                                        value={formik.values.causeTitle}
                                        onChange={formik.handleChange}
                                        error={formik.errors.causeTitle}
                                        touched={formik.touched.causeTitle}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Your Email"
                                        disabled={true}
                                        name="email"
                                        type="text"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.errors.email}
                                        touched={formik.touched.email}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>

                                <div>
                                    <TextArea
                                        label="About The Cause"
                                        name="aboutTheCause"
                                        type="text"
                                        value={formik.values.aboutTheCause}
                                        onChange={formik.handleChange}
                                        error={formik.errors.aboutTheCause}
                                        touched={
                                            formik.touched.aboutTheCause
                                        }
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>

                                <div>
                                    <TextArea
                                        label="Cause Description"
                                        name="causeDescription"
                                        type="text"
                                        value={formik.values.causeDescription}
                                        onChange={formik.handleChange}
                                        error={formik.errors.causeDescription}
                                        touched={
                                            formik.touched.causeDescription
                                        }
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Cause Budget"
                                        name="causeBudget"
                                        type="text"
                                        value={formik.values.causeBudget}
                                        onChange={formik.handleChange}
                                        error={formik.errors.causeBudget}
                                        touched={formik.touched.causeBudget}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="text"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.errors.phoneNumber}
                                        touched={formik.touched.phoneNumber}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Website Url"
                                        name="websiteUrl"
                                        type="text"
                                        value={formik.values.websiteUrl}
                                        onChange={formik.handleChange}
                                        error={formik.errors.websiteUrl}
                                        touched={formik.touched.websiteUrl}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>

                            <label className="block text-sm font-medium text-gray-700 !mb-1">
                                Documents <span className="text-xs">(You can upload multiple)</span>
                            </label>
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
                                                        <li key={docindex}>{doc.name}</li>
                                                    ))}
                                                </ul>
                                                <label
                                                    htmlFor="file-upload"
                                                    className="text-blue-500 cursor-pointer hover:underline mt-5"
                                                >
                                                    change
                                                </label>
                                                <label
                                                    onClick={() => setDocuments([])}
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

                            <div className="text-end">
                                <button
                                    type="button"
                                    onClick={formik.handleSubmit}
                                    className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    // className={`bg-[#10a37f] w-full sm:w-auto hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const DateInputElement = ({ value, defaultValue, inputRef, ...props }) => {
    return (
        <input
            {...props}
            defaultValue={defaultValue}
            ref={inputRef}
            type="date"
            id="date"
            autoComplete="given-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
    );
};

export default AddCause;
