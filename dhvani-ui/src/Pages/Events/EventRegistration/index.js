
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../../services/ApiService"
import { addError } from "../../../redux/pageErrorHandler"
import Loader from "../../../components/Loader"
import moment from "moment";
import Constants from "../../../utils/Constants";
import CricketRegistration from "./Templates/Cricket";
import TennisRegistration from "./Templates/Tennis";
import PokerRegistration from "./Templates/Poker";
import RunRegistration from "./Templates/Run";
import VolleybalRegistration from "./Templates/Volleyball";
import BadmintonRegistration from "./Templates/Badminton";
import EditEvent from "./EditEvent";

const EventRegistration = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const { eventId } = useParams();

    const [event, setEvent] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    })

    const [openEditEvent, setOpenEditEvent] = useState(false)

    const [registerEventResult, setRegisterEvent] = useState({ 'loading': false, 'error': false, 'message': '', 'data': null })

    useEffect(() => {
        getEvent()
    }, [])

    const getEvent = async () => {
        try {
            setEvent({ 
                loading: true,
                error: false,
                message: "",
                data: null 
            })

            let res = await ApiService.getEventById(eventId)
            setEvent(prev => ({
                ...prev,
                "loading": false,
                "data": res.data.event
            }))
            console.log(res.data.event)
        } catch (error) {
            let message = error.response?.data?.message
            dispatch(addError(message))
            setEvent(prev => ({
                ...prev,
                "loading": false,
                "error": true,
                "message": message
            }))
        }
    }

    const registerEvent = async (values) => {
        try {
            setRegisterEvent({ 'loading': true, 'error': false, 'message': '', 'data': null })

            const body = {
                payment: {
                    transactionType: values['registerThrough'] === 'PAYPAL' ? Constants.EVENT_REGISTRATION_TRANSACTION_TYPE_PAYPAL : Constants.EVENT_REGISTRATION_TRANSACTION_TYPE_OFFLINE,
                    amount: event.data?.eventCost,
                    intent: Constants.INTENT,
                    currency: Constants.CURRENCY,
                    paymentType: Constants.EVENT_REGISTRATION_PAYMENT_TYPE,
                },
            }

            let team = values['players']
            delete values['players']
            let registrationDetails = {
                ...values,
                "team": team,
                "event": event.data?._id,
                "eventCost": event.data?.eventCost
            }
            

            let res = null
            if (values['registerThrough'] === 'PAYPAL') {
                localStorage.setItem('registrationDetails', JSON.stringify(registrationDetails));
                
                res = await ApiService.registerEventPaypal(body)
                let links = res.data.payment.links;
                let link = "";
                for (let i = 0; i < links.length; i++) {
                    if (links[i].rel === "approval_url") {
                        link = links[i].href;
                    }
                }
                window.open(link, "_self");
            } else {
                body['registrationDetails'] = registrationDetails;
                res = await ApiService.registerEventOffline(body)
                window.location.href = "/event-registration-offline"
            }
            
           
        } catch (error) {
            console.log(error)
            let message = error.response.data.message
            dispatch(addError(message))
            setRegisterEvent(prev => ({
                ...prev,
                'loading': false,
                'error': true,
                'message': message
            }))
        }
    }

    return (
        <div className="mx-auto container md:py-20">
            <Loader open={event.loading || registerEventResult.loading} />
            <EditEvent open={openEditEvent} setOpen={setOpenEditEvent} refreshEvent={getEvent} event={event?.data} />

            {event?.data?.isHold && <div
                className="bg-orange-100 rounded-md py-2 px-6 my-4 text-base text-center text-orange-700"
                role="alert"
            >
                Due to unforeseen circumstances, the event has been rescheduled for a later date.
            </div>}

            <div className="flex flex-wrap">
                {event.data?.flyer && (
                    <div className="w-full lg:w-1/3">
                        <img
                            src={ApiService.getMedia(event.data?.flyer)}
                            alt="Event Image"
                            className="w-full md:rounded-lg"
                        />
                    </div>
                )}
                <div className={`w-full lg:w-2/3 ${event.data?.flyer ? 'pl-5' : 'md:pl-5'}`}>
                    <h2 className="text-2xl font-bold mb-2"> {event.data?.eventName} </h2>
                    <p className="text-gray-700 text-base mb-4">
                        {event.data?.eventDescription}
                    </p>
                    {!event?.data?.isHold && (<div className="flex flex-wrap my-4">
                        <div className="w-full">
                            <span className="font-bold">Start Date:</span>{" "}
                            <span> {moment.utc(event.data?.eventStartDate).format('DD-MMM-YYYY')} </span>
                        </div>
                        <div className="w-full mt-2">
                            <span className="font-bold">End Date:</span>{" "}
                            <span> {moment.utc(event.data?.eventEndDate).format('DD-MMM-YYYY')} </span>
                        </div>
                    </div>)}

                    <div className="w-full mt-2">
                        <span className="font-bold">Registration Fee:</span>{" "}
                        <span> {event.data?.eventCost} </span> {" "} USD
                    </div>

                    {!event?.data?.isHold && auth.isLoggedIn && auth.isAdmin && <div className="mt-4">
                        <button
                            type="button"
                            onClick={() => setOpenEditEvent(true)}
                            className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 w-auto`}
                        >
                            Update Event
                        </button>
                    </div>}
                </div>
            </div>

            {!event?.data?.isHold && (<div className="my-10 px-5 lg:px-0">
                <h2 className="mb-2"> {event.data?.eventName} </h2>
                <div className="text-2xl mb-2">REGISTER HERE:</div>

                {event.data?.eventType?.value === 'cricket' && <CricketRegistration registerEvent={registerEvent} />}
                {event.data?.eventType?.value === 'tennis' && <TennisRegistration registerEvent={registerEvent} />}
                {event.data?.eventType?.value === 'poker' && <PokerRegistration registerEvent={registerEvent} />}
                {event.data?.eventType?.value === 'run' && <RunRegistration registerEvent={registerEvent} />}
                {event.data?.eventType?.value === 'volleyball' && <VolleybalRegistration registerEvent={registerEvent} />}
                {event.data?.eventType?.value === 'badminton' && <BadmintonRegistration registerEvent={registerEvent} />}
            </div>)}
        </div>
    );
};

export default EventRegistration;
