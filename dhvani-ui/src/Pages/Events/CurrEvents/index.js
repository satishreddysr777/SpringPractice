import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addError } from '../../../redux/pageErrorHandler'
import ApiService from "../../../services/ApiService"
import Loader from "../../../components/Loader"
import EventCard from "../ListCard"
import { useNavigate } from "react-router-dom"


const CurrentEvents = () => {

    const dispacth = useDispatch();
    const navigate = useNavigate();

    const [events, setEvents] = useState({ 'loading': false, 'error': false, 'message': '', 'data': [] })

    useEffect(() => {
        getCurrentEvents()
    }, [])

    const getCurrentEvents = async () => {
        try {
            setEvents({ 'loading': true, 'error': false, 'message': '', 'data': [] })

            let res = await ApiService.getCurrentEvents()
            setEvents(prev => ({
                ...prev.data.push,
                'loading': false,
                'data': res.data.events
            }))
        } catch (error) {
            const message = error.response?.data?.message
            dispacth(addError(message))
            setEvents(prev => ({
                ...prev,
                'loading': false,
                'message': message,
                'error': true
            }))
        }
    }

    const navigateTo = (to) => {
        navigate(to)
    }

    return (
        <section>
            <Loader open={events.loading} />

            {/* <div className="mx-auto mt-10 flex justify-between"> */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:max-w-[100rem] lg:px-8 mt-10 xs:flex-col justify-between md:flex">
                <div className="font-bold text-2xl">
                    Current Events
                </div>
                <div className="flex justify-between md:block mt-5 md:mt-0">
                    <button
                        onClick={() => navigateTo('/upcoming-events')}
                        className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                        // className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        Upcoming Events
                    </button>
                    <button
                        onClick={() => navigateTo('/previous-events')}
                        className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                        // className={`bg-[#10a37f] ml-3 hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        Previous Events
                    </button>
                </div>
            </div>
            
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:max-w-[100rem] lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {events.data.map((event, index) => (
                        <EventCard event={event} key={index} refresh={getCurrentEvents} />
                    ))}
                </div>

                {!events.loading &&
                    events.data.length === 0 && (
                        <div className="bg-white p-8 rounded-md shadow text-center">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                No events found
                            </h3>
                        </div>
                    )}
            </div>
        </section>
    )
}

export default CurrentEvents