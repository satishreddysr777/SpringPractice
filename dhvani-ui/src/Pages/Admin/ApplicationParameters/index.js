import "flatpickr/dist/themes/airbnb.css";
import { useState } from "react";
import Dialog from "./Dialog.js";
import moment from "moment";
import ApiService from "../../../services/ApiService.js";
import Loader from "../../../components/Loader/index.js";
import { addError } from "../../../redux/pageErrorHandler.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SelectDate from "../../../components/SelectDate";
import { toast } from 'react-toastify';

const ApplicationParamaters = () => {
    const dispatch = useDispatch();

    const [causeStartDate, setCauseStartDate] = useState(null);
    const [causeEndDate, setCauseEndDate] = useState(null);
    const [voteStartDate, setVoteStartDate] = useState(null);
    const [voteEndDate, setVoteEndDate] = useState(null);

    const [causeStartDateError, setCauseStartDateError] = useState(null);
    const [causeEndDateError, setCauseEndDateError] = useState(null);
    const [voteStartDateError, setVoteStartDateError] = useState(null);
    const [voteEndDateError, setVoteEndDateError] = useState(null);

    const [submissionResults, setSubmissionResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });
    const [getSubmissionResults, setGetSubmissionResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });

    const [minDates, setMinDates] = useState({
        causeStartDate: "today",
        causeEndDate: "today",
        voteStartDate: "today",
        voteEndDate: "today",
    });

    const [open, setOpen] = useState(false);
    const [dialogText, setDialogText] = useState("");

    useEffect(() => {
        getLastestSubmission();
    }, []);

    const addSubmission = async () => {
        if (
            causeEndDate === null ||
            causeStartDate === null ||
            voteStartDate === null ||
            voteEndDate === null
        ) {
            if (causeStartDate === null)
                setCauseStartDateError("Cause Start Date is required.");
            if (causeEndDate === null)
                setCauseEndDateError("Cause End Date is required.");
            if (voteStartDate === null)
                setVoteStartDateError("Vote Start Date is required.");
            if (voteEndDate === null)
                setVoteEndDateError("Vote End Date is required.");

            return;
        }

        setSubmissionResults({
            loading: true,
            error: false,
            message: "",
            data: null,
        });
        try {
            let res = await ApiService.addSubmission({
                causeStartDate,
                causeEndDate,
                voteStartDate,
                voteEndDate,
            });
            setSubmissionResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data,
            }));
            getLastestSubmission()
            toast.success("Submitted.", {
                position: toast.POSITION.TOP_CENTER
            })
            // window.location.reload();
        } catch (err) {
            const error = err.response.data.message;
            dispatch(addError(error));
            setSubmissionResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: error,
            }));
        }
    };

    const getLastestSubmission = async () => {
        setGetSubmissionResults({
            loading: true,
            error: false,
            message: "",
            data: null,
        });
        try {
            let res = await ApiService.getLatestSubmission();
            setGetSubmissionResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data,
            }));
        } catch (err) {
            const error = err.response.data.message;
            dispatch(addError(error));
            setGetSubmissionResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: error,
            }));
        }
    };

    return (
        <section>
            <Loader
                open={submissionResults.loading || getSubmissionResults.loading}
            />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Application Parameters
                    </h1>
                </div>
            </header>
            <Dialog open={open} setOpen={setOpen} text={dialogText} />

            <div className="flex flex-row  justify-center px-6 py-8 mx-auto lg:py-0 my-[3rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-[50rem] xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6">
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <SelectDate
                                        label="Cause Start Date"
                                        name="causeStartDate"
                                        value={causeStartDate}
                                        onChange={({ date }) => {
                                            setCauseStartDate(date);
                                            setCauseStartDateError(null);
                                            var duration = moment.duration({
                                                days: 1,
                                            });
                                            setMinDates({
                                                ...minDates,
                                                causeEndDate: moment(date)
                                                    .add(duration)
                                                    .toDate(),
                                            });
                                        }}
                                        options={{
                                            minDate: minDates["causeStartDate"]
                                        }}
                                        hasError={causeStartDateError}
                                        error={causeStartDateError}
                                        placeholder={moment.utc(getSubmissionResults.data?.submission?.causeStartDate).format("L")}
                                        required
                                    />
                                </div>

                                <div>
                                    <SelectDate
                                        label="Cause End Date"
                                        name="causeStartDate"
                                        value={causeEndDate}
                                        onChange={({ date }) => {
                                            setCauseEndDate(date);
                                            setCauseEndDateError(null);
                                            var duration = moment.duration({
                                                days: 1,
                                            });
                                            setMinDates({
                                                ...minDates,
                                                voteStartDate: moment(date)
                                                    .add(duration)
                                                    .toDate(),
                                            });
                                        }}
                                        options={{
                                            minDate: minDates["causeEndDate"],
                                            onOpen: [
                                                function (
                                                    selectedDates,
                                                    dateStr,
                                                    instance
                                                ) {
                                                    if (
                                                        causeStartDate === null
                                                    ) {
                                                        setOpen(true);
                                                        setDialogText(
                                                            "Please select Cause start date"
                                                        );
                                                        instance.close();
                                                    }
                                                },
                                            ],
                                        }}
                                        hasError={causeEndDateError}
                                        error={causeEndDateError}
                                        placeholder={moment.utc(getSubmissionResults.data?.submission?.causeEndDate).format("L")}
                                        required
                                    />
                                </div>

                                <div>
                                    <SelectDate
                                        label="Vote Start Date"
                                        name="voteStartDate"
                                        value={voteStartDate}
                                        onChange={({ date }) => {
                                            setVoteStartDate(date);
                                            setVoteStartDateError(null);
                                            var duration = moment.duration({
                                                days: 1,
                                            });
                                            setMinDates({
                                                ...minDates,
                                                voteEndDate: moment(date)
                                                    .add(duration)
                                                    .toDate(),
                                            });
                                        }}
                                        options={{
                                            minDate: minDates["voteStartDate"],
                                            onOpen: [
                                                function (
                                                    selectedDates,
                                                    dateStr,
                                                    instance
                                                ) {
                                                    if (causeEndDate === null) {
                                                        setOpen(true);
                                                        setDialogText(
                                                            "Please select Cause end date"
                                                        );
                                                        instance.close();
                                                    }
                                                },
                                            ],
                                        }}
                                        hasError={voteStartDateError}
                                        error={voteStartDateError}
                                        placeholder={moment.utc(getSubmissionResults.data?.submission?.voteStartDate).format("L")}
                                        required
                                    />
                                </div>

                                <div>
                                    <SelectDate
                                        label="Vote End Date"
                                        name="voteEndDate"
                                        value={voteEndDate}
                                        onChange={({ date }) => {
                                            setVoteEndDate(date);
                                            setVoteEndDateError(null);
                                        }}
                                        options={{
                                            minDate: minDates["voteEndDate"],
                                            onOpen: [
                                                function (
                                                    selectedDates,
                                                    dateStr,
                                                    instance
                                                ) {
                                                    if (
                                                        voteStartDate === null
                                                    ) {
                                                        setOpen(true);
                                                        setDialogText(
                                                            "Please select Cause end date"
                                                        );
                                                        instance.close();
                                                    }
                                                },
                                            ],
                                        }}
                                        hasError={voteEndDateError}
                                        error={voteEndDateError}
                                        placeholder={moment.utc(
                                            getSubmissionResults.data
                                                ?.submission?.voteEndDate
                                        ).format("L")}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="text-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        addSubmission();
                                    }}
                                    disabled={!causeStartDate || !causeEndDate || !voteStartDate || !voteEndDate}
                                    className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    // className={`bg-[#10a37f] disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2 w-full sm:w-auto`}
                                >
                                    Submit
                                </button>
                            </div>

                            {submissionResults.error && (
                                <div
                                    className="bg-red-100 rounded-md py-2 px-6 mb-4 text-base text-center text-red-700"
                                    role="alert"
                                >
                                    {submissionResults.message}
                                </div>
                            )}
                            {getSubmissionResults.error && (
                                <div
                                    className="bg-red-100 rounded-md py-2 px-6 mb-4 text-base text-center text-red-700"
                                    role="alert"
                                >
                                    {getSubmissionResults.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-5 pb-[5rem]">
                Previous Submissions
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white rounded-md text-sm">
                        <thead className="text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Cause Start Date
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Cause End Date
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Vote Start Date
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Vote End Date
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            
                            {getSubmissionResults.data?.previousSubmissions.length > 0 && getSubmissionResults.data?.previousSubmissions.map((sub, index) => (
                                <tr key={index} className={`${index === 0 ? 'bg-green-200' : ''}`}>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {moment.utc(sub.causeStartDate).format("DD-MMM-YYYY")}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {moment.utc(sub.causeEndDate).format("DD-MMM-YYYY")}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {moment.utc(sub.voteStartDate).format("DD-MMM-YYYY")}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {moment.utc(sub.voteEndDate).format("DD-MMM-YYYY")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </section>
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

export default ApplicationParamaters;
