import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import TextField from "../../../components/TextField";
import TextArea from "../../../components/Textarea";
import SelectMenu from "../../../components/SelectMenu";
import SelectDate from "../../../components/SelectDate";
import * as Yup from "yup";
import ApiService from "../../../services/ApiService";
import moment from "moment";
import { addError } from "../../../redux/pageErrorHandler"
import { toast } from 'react-toastify';


const AddEvent = ({ open, setOpen, getAllEvents = () => {} }) => {

    const [addEventResults, setAddEventResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });
    const [eventTypes, setEventTypes] = useState([
        { name: "Cricket", value: "cricket" },
        { name: "Tennis", value: "tennis" },
        { name: "Poker", value: "poker" },
        { name: "Badminton", value: "badminton" },
        { name: "Run", value: "run" },
        { name: "Volleyball", value: "volleyball" },
    ]);
    const [eventType, setEventType] = useState(null);
    const [eventTypeError, setEventTypeError] = useState(null);

    const [eventStartDate, setEventStartDate] = useState(null)
    const [eventStartDateError, setEventStartDateError] = useState(false)
    const [eventEndDate, setEventEndDate] = useState(null)
    const [eventEndDateError, setEventEndDateError] = useState(false)
    const [minDates, setMinDates] = useState({
        eventStartDate: "today",
        eventEndDate: "today"
    });
    const [dateError, setDateError] = useState(false)
    const [flyer, setFlyer] = useState(null);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            eventName: "",
            eventDescription: "",
            eventOrganizers: "",
            eventCost: "",
            eventVenue: "",
            maxPlayers: "",
            websiteUrl: "",
        },
        validationSchema: Yup.object().shape({
            eventName: Yup.string().required("Required"),
            eventDescription: Yup.string().required("Required"),
            eventOrganizers: Yup.string().required("Required"),
            eventCost: Yup.string().required("Required"),
            eventVenue: Yup.string().required("Required"),
            maxPlayers: Yup.string().required("Required"),
        }),
        onSubmit: () => {
            if (eventStartDate !== null && eventEndDate !== null && (eventType != null && eventType?.value !== null)) {
                addEvent();
            } else {
                if (eventStartDate === null)
                    setEventStartDateError("Required");
                if (eventEndDate === null)
                    setEventEndDateError("Required");
                if (eventType == null || eventType?.value === null)
                    setEventTypeError("Required");
            }
        },
    });

    const addEvent = async () => {
        setAddEventResults({ 
            loading: true,
            error: false,
            message: "",
            data: null 
        })
        try {

            const formData = new FormData();
            formData.append("eventName", formik.values.eventName);
            formData.append("eventDescription", formik.values.eventDescription);
            formData.append("eventType", JSON.stringify(eventType));
            formData.append("eventStartDate", eventStartDate);
            formData.append("eventEndDate", eventEndDate);
            formData.append("eventOrganizers", formik.values.eventOrganizers);
            formData.append("eventCost", formik.values.eventCost);
            formData.append("eventVenue", formik.values.eventVenue);
            formData.append("maxPlayers", formik.values.maxPlayers);
            formData.append("websiteUrl", formik.values.websiteUrl);
            formData.append("flyer", flyer);

            await ApiService.addEvent(formData)
            formik.resetForm()
            getAllEvents()
            setOpen(false)
            setFlyer(null);
            setEventStartDate(null);
            setEventEndDate(null);
            setEventType(null)
            setAddEventResults(prev => ({
                ...prev,
                "loading": false
            }))
            toast.success("Event Created!", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            console.log(error)
            let message = error.response?.data?.message
            setAddEventResults(prev => ({
                ...prev,
                "loading": false,
                "error": true,
                "message": message
            }))
        }
    }

    const onSelectFlyer = (e) => {
        setFlyer(e.target.files[0]);
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
                                            Add Event
                                        </h1>
                                        <form className="space-y-4 md:space-y-6">
                                            <div>
                                                <TextField
                                                    label="Event Name"
                                                    name="eventName"
                                                    type="text"
                                                    value={formik.values.eventName}
                                                    onChange={formik.handleChange}
                                                    error={formik.errors.eventName}
                                                    touched={formik.touched.eventName}
                                                    onBlur={formik.handleBlur}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <TextArea
                                                    label="Event description"
                                                    name="eventDescription"
                                                    type="text"
                                                    value={formik.values.eventDescription}
                                                    onChange={formik.handleChange}
                                                    error={formik.errors.eventDescription}
                                                    touched={formik.touched.eventDescription}
                                                    onBlur={formik.handleBlur}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <SelectMenu
                                                    label="Event Type"
                                                    items={eventTypes}
                                                    value={eventType?.value}
                                                    onChange={(data) => {
                                                        setEventType(data);
                                                        setEventTypeError(null)
                                                    }}
                                                    hasError={eventTypeError}
                                                    error={eventTypeError}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                                <div>
                                                    <SelectDate
                                                        label="Event Start Date"
                                                        name="causeStartDate"
                                                        value={eventStartDate}
                                                        onChange={({ date }) => {
                                                            setEventStartDate(date);
                                                            setEventStartDateError(null);
                                                            setDateError(null);
                                                            var duration = moment.duration({ days: 1 });
                                                            setMinDates({
                                                                ...minDates,
                                                                eventEndDate: moment(date).add(duration).toDate(),
                                                            });
                                                        }}
                                                        options={
                                                            {
                                                                minDate: minDates["eventStartDate"],
                                                            }
                                                        }
                                                        hasError={eventStartDateError}
                                                        error={eventStartDateError}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <SelectDate
                                                        label="Event End Date"
                                                        name="eventEndDate"
                                                        value={eventEndDate}
                                                        onChange={({ date }) => {
                                                            setEventEndDate(date);
                                                            setEventEndDateError(null);
                                                        }}
                                                        options={{
                                                            minDate: minDates["eventEndDate"],
                                                            onOpen: [
                                                                function (selectedDates, dateStr, instance) {
                                                                    if (eventStartDate === null) {
                                                                        setDateError(true);
                                                                        instance.close();
                                                                    }
                                                                },
                                                            ],
                                                        }}
                                                        hasError={eventEndDateError}
                                                        error={eventEndDateError}
                                                        required
                                                    />
                                                   {dateError &&  <div className="mt-1 text-xs text-red-400">Please select <b>Event Start Date</b></div>}
                                                </div>
                                            </div>

                                            <div>
                                                <TextField
                                                    label="Event organizers"
                                                    name="eventOrganizers"
                                                    type="text"
                                                    value={formik.values.eventOrganizers}
                                                    onChange={formik.handleChange}
                                                    error={formik.errors.eventOrganizers}
                                                    touched={formik.touched.eventOrganizers}
                                                    onBlur={formik.handleBlur}
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                                <div>
                                                    <TextField
                                                        label="Event Cost"
                                                        name="eventCost"
                                                        type="text"
                                                        value={formik.values.eventCost}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.eventCost}
                                                        touched={formik.touched.eventCost}
                                                        onBlur={formik.handleBlur}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        label="Event Venue"
                                                        name="eventVenue"
                                                        type="text"
                                                        value={formik.values.eventVenue}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.eventVenue}
                                                        touched={formik.touched.eventVenue}
                                                        onBlur={formik.handleBlur}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <TextField
                                                    label="Max players"
                                                    name="maxPlayers"
                                                    type="text"
                                                    value={formik.values.maxPlayers}
                                                    onChange={formik.handleChange}
                                                    error={formik.errors.maxPlayers}
                                                    touched={formik.touched.maxPlayers}
                                                    onBlur={formik.handleBlur}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <TextField
                                                    label="Website url"
                                                    name="websiteUrl"
                                                    type="text"
                                                    value={formik.values.websiteUrl}
                                                    onChange={formik.handleChange}
                                                    error={formik.errors.websiteUrl}
                                                    touched={formik.touched.websiteUrl}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </div>

                                            <label className="block text-sm font-medium text-gray-700 !mb-1">
                                                Flyer
                                            </label>
                                            <div className="relative border-2 border-dashed border-gray-400 rounded-md p-6 !mt-0 flex flex-col justify-center items-center">
                                                <div className="text-gray-600">
                                                    <p className="mt-1 text-sm leading-normal">
                                                        {!flyer && (
                                                            <>
                                                                <label  htmlFor="file-upload" className="text-blue-500 cursor-pointer hover:underline">
                                                                    Choose a file
                                                                </label>{" "}
                                                                to upload
                                                            </>
                                                        )}
                                                        {flyer && (
                                                            <>
                                                                Selected file {"->"}{" "} {flyer.name}{" "}
                                                                <br />
                                                                <label
                                                                    htmlFor="file-upload"
                                                                    className="text-blue-500 cursor-pointer hover:underline mt-5"
                                                                >
                                                                    change
                                                                </label>
                                                                <label
                                                                    onClick={() =>
                                                                        setFlyer(null)
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
                                                    onChange={onSelectFlyer}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {addEventResults.error && (
                                    <div
                                        className="bg-red-100 rounded-md py-2 px-6 mb-4 mx-[2rem] text-base text-center text-red-700"
                                        role="alert"
                                    >
                                        {addEventResults.message}
                                    </div>
                                )}

                               

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full disabled:opacity-[.6] disabled:cursor-not-allowed justify-center rounded-md border border-transparent bg-[#10a37f] px-4 py-2 text-base font-medium text-white shadow-sm hover:opacity-80 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={formik.handleSubmit}
                                    >
                                        {addEventResults.loading && (
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
                                        {!addEventResults.loading && (
                                            <span>Continue</span>
                                        )}
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
    );
};

export default AddEvent;
