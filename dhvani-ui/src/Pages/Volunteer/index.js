import Img from "../../assets/volunteer/group-hands.jpg";
import Blog1 from "../../assets/volunteer/blog-1.jpg";
import Blog2 from "../../assets/volunteer/blog-2.jpg";
import Blog3 from "../../assets/volunteer/blog-3.jpg";

import SelectMenu from "../../components/SelectMenu";
import TextField from "../../components/TextField";
import Loader from "../../components/Loader";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { ProcessNotification } from "../../utils/Helpers";
import { addError } from "../../redux/pageErrorHandler";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const Volunteer = () => {
    const dispatch = useDispatch();

    const [events, setEvents] = useState({ "loading": false, "errror": false, "message": '', "data": [] })
    const [selectEvtErr, setSelectEvtErr] = useState(null)
    const [eventId, setEventId] = useState(null)

    const emailRefExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
                .email()
                .required("Email is required")
                .matches(emailRefExp, "email must be a valid email"),
            phone: Yup.string()
                .required("Phone is required")
                .matches(phoneRegExp, "Phone number is not valid")
                .min(10, "too short")
                .max(10, "too long"),
        }),
        onSubmit: (values, { resetForm }) => {
            // values["eventId"] = event;
            addVolunteer(values, resetForm);
        },
    });

    // const [event, setEvent] = useState(events[0].name);
    const [addVolunteerRes, setAddVolunteerRes] = useState({
        loading: false,
        error: false,
        message: null,
        data: null,
    });

    const addVolunteer = async (values, resetForm) => {

        if (eventId === null) {
            setSelectEvtErr('Please select an event.')
            return
        }

        setAddVolunteerRes({
            loading: true,
            error: false,
            message: "",
            data: null,
        });

        const body = {
            eventId: eventId,
            name: values.name,
            email: values.email,
            phone: values.phone,
        };
        try {
            let res = await ApiService.addVolunteer(body);
            setAddVolunteerRes((prev) => ({
                ...prev,
                loading: false,
            }));
            resetForm();
            setEventId(null)
            toast.success("Registered as volunteer.", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            let message = error.response.data.message;
            dispatch(addError(message));
            setAddVolunteerRes((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const getAllEvents = async () => {
        try {
            setEvents({ "loading": true, "errror": false, "message": '', "data": [] })
            let res = await ApiService.getAllEvents()
            let eventsItems = res.data?.events.map(evts => {
                return {
                    "name": evts["eventName"],
                    "value": evts["_id"]
                }
            })
            let _events = [{ "name": 'General', "value": 'General' }].concat(eventsItems)
            setEvents(prev => ({
                ...prev,
                "loading": false,
                "data": _events
            }))
        } catch (error) {
            let message = error.response.data.message
            dispatch(addError(message))
            setEvents(prev => ({
                ...prev,
                "loading": false,
                "message": message,
                "errror": true
            }))
        }
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    return (
        <div>
            <Loader open={addVolunteerRes.loading || events.loading} />

            <div
                className="py-20 justify-center bg-no-repeat bg-cover bg-center h-[25rem]"
                style={{ backgroundImage: `url(${Img})` }}
            >
                <div className="container my-auto px-6 pt-10">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                        Become A Volunteer
                    </h2>
                </div>
            </div>

            <div className="flex flex-wrap justify-center my-10">
                <div className="md:w-[20%] p-2 relative">
                    <img
                        className="h-full w-full justify-center bg-no-repeat bg-cover bg-center"
                        src={Blog1}
                        alt="Image 1"
                    />
                    <div className="overlay absolute inset-2 bg-black opacity-20"></div>
                    <div className="text absolute inset-0 flex items-center justify-center text-white font-bold flex-col">
                        <div>STEP 1</div>
                        <div className="text-xl">Submit Details</div>
                    </div>
                </div>
                <div className="md:w-[20%]  p-2 relative">
                    <img
                        className="h-full w-full justify-center bg-no-repeat bg-cover bg-center"
                        src={Blog2}
                        alt="Image 2"
                    />
                    <div className="overlay absolute inset-2 bg-black opacity-20"></div>
                    <div className="text absolute inset-0 flex items-center justify-center text-white font-bold flex-col">
                        <div>STEP 2</div>
                        <div className="text-xl">Team Review</div>
                    </div>
                </div>
                <div className="md:w-[20%]  p-2 relative">
                    <img
                        className="h-full w-full justify-center bg-no-repeat bg-cover bg-center"
                        src={Blog3}
                        alt="Image 3"
                    />
                    <div className="overlay absolute inset-2 bg-black opacity-20"></div>
                    <div className="text absolute inset-0 flex items-center justify-center text-white font-bold flex-col">
                        <div>STEP 3</div>
                        <div className="text-xl">Explore Opportunities</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center my-10 px-2">
                <div className="text-center">
                    <div>
                        Thank you for your interest. Together we can make a real
                        difference in people’s lives.
                    </div>
                    <div className="text-4xl">
                        Sign-up to be a volunteer and help us to make a
                        difference.
                    </div>
                </div>
            </div>

            <div className="flex justify-center my-10 px-5">
                <form className="space-y-4 md:space-y-4 w-full max-w-lg">
                    <div className="">
                        <TextField
                            label="Name"
                            name="name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.errors.name}
                            touched={formik.touched.name}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.errors.email}
                            touched={formik.touched.email}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <TextField
                            label="Phone"
                            name="phone"
                            type="text"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.errors.phone}
                            touched={formik.touched.phone}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="chooseEvent"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Choose an event
                        </label>
                        <SelectMenu
                            items={events.data}
                            onChange={(data) => {
                                setEventId(data.value)
                                setSelectEvtErr(null)
                            }}
                            hasError={selectEvtErr}
                            error={selectEvtErr}
                            value={eventId}
                        />
                    </div>

                    <div>
                        Please reach out to contact@dhvanifoundation.com for any
                        additional information about volunteering.
                    </div>

                    <button
                        type="button"
                        onClick={formik.handleSubmit}
                        className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                        // className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2`}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Volunteer;
