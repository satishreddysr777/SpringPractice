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
import Dialog from "./Dialog";
import SelectDate from "../../../components/SelectDate";
import { toast } from 'react-toastify';

const AddProject = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const [projectStartDate, setProjectStartDate] = useState(null);
    const [projectEndDate, setProjectEndDate] = useState(null);
    const [projectStartDateError, setProjectStartDateError] = useState(null);
    const [projectEndDateError, setProjectEndDateError] = useState(null);
    const [dialog, setDialog] = useState(false);
    const [dialogText, setDialogText] = useState("");
    const [projectBackground, setProjectBackground] = useState(null);
    const [projectAddResults, setProjectAddResults] = useState({
        loading: false,
        error: false,
        message: null,
        data: null,
    });

    const [minDates, setMinDates] = useState({
        projectStartDate: "today",
        projectEndDate: "today",
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            projectName: "",
            projectDescription: "",
            goalAmount: "",
            fundsRaised: "0",
            aboutTheCause: "",
            whatWeDo: "",
        },
        validationSchema: Yup.object().shape({
            projectName: Yup.string().required("Project Name is required"),
            projectDescription: Yup.string().required(
                "Project Description is required"
            ),
            goalAmount: Yup.string().required("Goal Amount is required"),
            fundsRaised: Yup.string().required("Funds Raised is required"),
            aboutTheCause: Yup.string().required("About the cause is required"),
        }),
        onSubmit: (values) => {
            if (projectStartDate !== null && projectEndDate !== null) {
                addProject(values);
            } else {
                if (projectStartDate === null)
                    setProjectStartDateError("Project Start Date is required");
                if (projectEndDate === null)
                    setProjectEndDateError("Project End Date is required");
            }
        },
    });

    // console.log(formik.errors)
    // console.log(formik.touched)

    const addProject = async (values) => {
        try {
            setProjectAddResults({
                loading: true,
                error: false,
                message: "",
                data: null,
            });
            let {
                projectName,
                projectDescription,
                goalAmount,
                fundsRaised,
                aboutTheCause,
                whatWeDo,
            } = values;

            const formData = new FormData();
            formData.append("projectName", projectName);
            formData.append("projectDescription", projectDescription);
            formData.append("projectStartDate", projectStartDate);
            formData.append("projectEndDate", projectEndDate);
            formData.append("fund", goalAmount);
            formData.append("fundsRaised", fundsRaised);
            formData.append("aboutTheCause", aboutTheCause);
            formData.append("whatWeDo", whatWeDo);
            formData.append("projectBackground", projectBackground);

            let res = await ApiService.addProject(formData);
            setProjectAddResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data,
            }));

            formik.resetForm();
            setProjectBackground(null);
            setProjectStartDate(null);
            setProjectEndDate(null);
            toast.success("Project Created!", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            const message = error.response.data.message;
            dispatch(addError(message));
            setProjectAddResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const onSelectProjectBackground = (e) => {
        setProjectBackground(e.target.files[0]);
    };

    return (
        <section>
            <Loader open={projectAddResults.loading} />
            <Dialog open={dialog} setOpen={setDialog} text={dialogText} />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Add Project
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
                                        label="Project Name"
                                        name="projectName"
                                        type="text"
                                        value={formik.values.projectName}
                                        onChange={formik.handleChange}
                                        error={formik.errors.projectName}
                                        touched={formik.touched.projectName}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Project Description"
                                        name="projectDescription"
                                        type="text"
                                        value={formik.values.projectDescription}
                                        onChange={formik.handleChange}
                                        error={formik.errors.projectDescription}
                                        touched={
                                            formik.touched.projectDescription
                                        }
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>

                                <div>
                                    <SelectDate
                                        label="Project Start Date"
                                        name="projectStartDate"
                                        value={projectStartDate}
                                        onChange={({ date }) => {
                                            setProjectStartDate((new Date(date)).toISOString());
                                            setProjectStartDateError(null);
                                            var duration = moment.duration({
                                                days: 1,
                                            });
                                            setMinDates({
                                                ...minDates,
                                                projectEndDate: moment(date)
                                                    .add(duration)
                                                    .toDate(),
                                            });
                                        }}
                                        options={{
                                            minDate:
                                                minDates["projectStartDate"],
                                        }}
                                        hasError={projectStartDateError}
                                        error={projectStartDateError}
                                        required
                                    />
                                </div>

                                <div>
                                    <SelectDate
                                        label="Project End Date"
                                        name="projectEndDate"
                                        value={projectEndDate}
                                        onChange={({ date }) => {
                                            setProjectEndDate((new Date(date)).toISOString());
                                            // setProjectEndDate(date);
                                            setProjectEndDateError(null);
                                        }}
                                        options={{
                                            minDate: minDates["projectEndDate"],
                                            onOpen: [
                                                function (
                                                    selectedDates,
                                                    dateStr,
                                                    instance
                                                ) {
                                                    console.log(
                                                        projectStartDate
                                                    );
                                                    if (
                                                        projectStartDate ===
                                                        null
                                                    ) {
                                                        setDialog(true);
                                                        setDialogText(
                                                            "Please select Project start date"
                                                        );
                                                        instance.close();
                                                    }
                                                },
                                            ],
                                        }}
                                        hasError={projectEndDateError}
                                        error={projectEndDateError}
                                        required
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Goal Amount"
                                        name="goalAmount"
                                        type="text"
                                        value={formik.values.goalAmount}
                                        onChange={formik.handleChange}
                                        error={formik.errors.goalAmount}
                                        touched={formik.touched.goalAmount}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Funds Raised"
                                        name="fundsRaised"
                                        type="text"
                                        value={formik.values.fundsRaised}
                                        onChange={formik.handleChange}
                                        error={formik.errors.fundsRaised}
                                        touched={formik.touched.fundsRaised}
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
                                        label="Plan of action"
                                        name="whatWeDo"
                                        type="text"
                                        value={formik.values.whatWeDo}
                                        onChange={formik.handleChange}
                                        error={formik.errors.whatWeDo}
                                        touched={formik.touched.whatWeDo}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>

                            <label className="block text-sm font-medium text-gray-700 !mb-1">
                                Project background image
                            </label>
                            <div className="relative border-2 border-dashed border-gray-400 rounded-md p-6 !mt-0 flex flex-col justify-center items-center">
                                <div className="text-gray-600">
                                    <p className="mt-1 text-sm leading-normal">
                                        {!projectBackground && (
                                            <>
                                                <label
                                                    htmlFor="file-upload"
                                                    className="text-blue-500 cursor-pointer hover:underline"
                                                >
                                                    Choose a file
                                                </label>{" "}
                                                to upload
                                            </>
                                        )}
                                        {projectBackground && (
                                            <>
                                                Selected file {"->"}{" "}
                                                {projectBackground.name}{" "}
                                                <br />
                                                <label
                                                    htmlFor="file-upload"
                                                    className="text-blue-500 cursor-pointer hover:underline mt-5"
                                                >
                                                    change
                                                </label>
                                                <label
                                                    onClick={() =>
                                                        setProjectBackground(null)
                                                    }
                                                    className="text-red-500 cursor-pointer hover:underline ml-5"
                                                >
                                                    Clear
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
                                    onChange={onSelectProjectBackground}
                                />
                            </div>

                            <div className="text-end">
                                <button
                                    type="button"
                                    onClick={formik.handleSubmit}
                                    className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    // className={`bg-[#10a37f] w-full sm:w-auto hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                                >
                                    Add Project
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

export default AddProject;
