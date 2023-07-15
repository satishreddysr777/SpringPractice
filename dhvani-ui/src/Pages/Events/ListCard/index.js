import moment from "moment";
import Img from "../../../assets/about_image_comp.jpg";
import Constants from "../../../utils/Constants"
import ApiService from "../../../services/ApiService"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { addError } from "../../../redux/pageErrorHandler"
import EditEvent from "../EventRegistration/EditEvent";
import Loader from "../../../components/Loader";

const EventCard = ({ event, refresh = () => {} }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const [setOnHolder, setSetOnHold] = useState({ 'loading': false, 'error': false, 'message': null, data: null })
    const [openEditEvent, setOpenEditEvent] = useState(false)

    const handleOnHold = async () => {
        setSetOnHold({ 
            loading: true,
            error: false,
            message: "",
            data: null 
        })
        try {

            let formData = {
                eventId: event._id
            }

            await ApiService.setOnHold(formData)
            setSetOnHold(prev => ({
                ...prev,
                "loading": false
            }))
            refresh()
        } catch (error) {
            console.log(error)
            let message = error.response?.data?.message
            dispatch(addError(message))
            setSetOnHold(prev => ({
                ...prev,
                "loading": false,
                "error": true,
                "message": message
            }))
        }
    }

    return (
        <div className="bg-white overflow-hidden border border-gray-200 rounded-lg shadow">
            
            <Loader open={setOnHolder.loading} />
            <EditEvent open={openEditEvent} setOpen={setOpenEditEvent} event={event} restart={true} refreshEvent={refresh} />
            
            {event.flyer && (
                <img
                    src={ApiService.getMedia(event.flyer)}
                    alt="Card Image"
                    className="w-full object-cover object-center h-48 sm:h-64"
                />
            )}
            {!event.flyer && (
                <img
                    src={Img}
                    alt="Card Image"
                    className="w-full object-cover object-center h-48 sm:h-64"
                />
            )}
            <div className="px-4 py-2 sm:p-4">
                <span>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
                        {event.eventName}
                    </h5>
                </span>
                <p className="text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {event.eventDescription}
                </p>

                {!event.completed && <>
                    {!event.isHold && auth.isLoggedIn && auth.isAdmin && (
                        <button
                            onClick={handleOnHold}
                            className={`bg-[#F7BE38] mb-3 hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                        >
                            Hold
                        </button>
                    )}
                    {event.isHold && auth.isLoggedIn && auth.isAdmin && (
                        <button
                            onClick={() => setOpenEditEvent(true)}
                            className={`bg-[#F7BE38] mb-3 hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                        >
                            Restart Event
                        </button>
                    )}
                    {!event.isHold && <div className="flex justify-between">
                        {!event.isUpcoming && (
                            <button
                                onClick={() => window.location.href = `/donate?dt=2&df=${event._id}`}
                                className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                            >
                                Donate
                            </button>
                        )}
                        <span></span>
                        

                        <button
                            onClick={() => navigate(`/event-registration/${event._id}`)}
                            className={`ml-4 border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                        >
                            Register
                            <svg
                                aria-hidden="true"
                                className="w-4 h-4 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>}
                </>}
            </div>
        </div>
    );
};

export default EventCard;
