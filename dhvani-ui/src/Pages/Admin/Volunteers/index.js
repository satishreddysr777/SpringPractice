import SelectMenu from "../../../components/SelectMenu";
import Calendar from "../../../components/Calender";
import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { useDispatch } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler"
import Loader from "../../../components/Loader";
import Table from "../../../components/Table/Table";

const Volunteers = () => {

    const dispatch = useDispatch()
    const [events, setEvents] = useState({ "loading": false, "errror": false, "message": '', "data": [] })
    const [volunteers, setVolunteers] = useState({ "loading": false, "errror": false, "message": '', "data": [], "completed": false })
    const [selectEvtErr, setSelectEvtErr] = useState(null)
    const [eventId, setEventId] = useState(null)

    const columns = [
        {
            name: "Name",
            selector: "name",
            cell: (row) => <span>{row.name}</span>,
        },
        {
            name: "Email",
            selector: "email",
        },
        {
            name: "Phone",
            selector: "phone",
        },
        {
            name: "Event Name",
            selector: "eventName",
        },
    ];

    useEffect(() => {
        getAllEvents()
    }, [])

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
            setEvents(prev => ({
                ...prev,
                "loading": false,
                "data": eventsItems
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

    const getVolunteers = async () => {
        if (eventId === null) {
            setSelectEvtErr('Please select an event.')
            return
        }

        try {
            setVolunteers({ "loading": true, "errror": false, "message": '', "data": [], "completed": false })
            let res = await ApiService.getVolunteersByEventId(eventId)
            let volnters = []
            res.data?.volunteers.forEach(it => {
                volnters.push({
                    'name': it['name'],
                    "email": it['email'],
                    "phone": it['phone'],
                    'eventName': it['event']['eventName']
                })
            })
            setVolunteers(prev => ({
                ...prev,
                "loading": false,
                "data": volnters,
                "completed": true
            }))
        } catch (error) {
            let message = error.response.data.message
            dispatch(addError(message))
            setVolunteers(prev => ({
                ...prev,
                "loading": false,
                "message": message,
                "errror": true,
                "completed": true
            }))
        }
    }

    return (
        <section>
            <Loader open={events.loading || volunteers.loading} />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Volunteers
                    </h1>
                </div>
            </header>

            <div className="mx-8 my-4">
                <div className="max-w-[20rem]">
                    <label
                        htmlFor="chooseEvent"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Choose an event
                    </label>
                    <SelectMenu
                        items={events.data}
                        value={eventId}
                        onChange={(data) => {
                            setEventId(data.value)
                            setSelectEvtErr(null)
                        }}
                        hasError={selectEvtErr}
                        error={selectEvtErr}
                    />

                    <button
                        type="button"
                        onClick={getVolunteers}
                        className={`bg-[#10a37f] mt-3 hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        Show List
                    </button>
                </div>

                <Table 
                    columns={columns}
                    data={volunteers.data}
                />
            </div>

        </section>
    );
};

export default Volunteers;
