
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import AddEvent from "./AddEvent";
import ApiService from "../../../services/ApiService"
import { useDispatch, useSelector } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler"
import moment from "moment";
import Loader from "../../../components/Loader";
import DeleteEvent from "./DeleteEvent";

const EventCalender = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const [openAddEvent, setOpenAddEvent] = useState(false)
    const [openDeleteEvent, setOpenDeleteEvent] = useState(false)

    const [events, setEvents] = useState({ 'loading': false, 'error': false, 'message': '', data: [] })

    const [customButtons, setCustomButtons] = useState({})
    const [headerToolbar, setHeaderToolBar] = useState({})
    
    useEffect(() => {
        if (auth.isLoggedIn && auth.isAdmin) {
            setCustomButtons({
                addEventButton: {
                    text: "Add Event",
                    click: () => setOpenAddEvent(true),
                },
                deleteEventButton: {
                    text: "Delete Event",
                    click: () => setOpenDeleteEvent(true),
                },
            })
            setHeaderToolBar({
                left: "addEventButton deleteEventButton",
                center: "title",
                right: "today prev,next",
            })
        }
        getAllEvents()
    }, [])

    const getAllEvents = async () => {
        try {
            setEvents({ 'loading': true, 'error': false, 'message': '', 'data': [] })
            let res = await ApiService.getAllEvents()
            var duration = moment.duration({ days: 1 })
            let allEvents = res.data.events.map(evnt => {
                let calenderConfig = {}
                calenderConfig['title'] = evnt.eventName
                calenderConfig['start'] = moment.utc(evnt.eventStartDate).format('YYYY-MM-DD')
                calenderConfig['end'] = moment.utc(evnt.eventEndDate).add(duration).format('YYYY-MM-DD')
                calenderConfig['backgroundColor'] = evnt.completed ? "gray" : "#10a37f"
                calenderConfig['borderColor'] = evnt.completed ? "gray" : "#10a37f"
                if (!evnt.completed) {
                    calenderConfig['url'] = `/event-registration/${evnt._id}`
                }
                return {
                    ...evnt,
                    ...calenderConfig
                }
            })
            console.log(allEvents)
            setEvents(prev => ({
                ...prev,
                'loading': false,
                'data': allEvents
            }))
        } catch (error) {
            let message = error.response.data.message
            dispatch(addError(message));
            setEvents(prev => ({
                ...prev,
                'loading': false,
                'error': true,
                'message': message
            }));
        }
    }

    return (
        <section>
            <Loader open={events.loading} />

            <div className="2xl:mx-[20rem] sm:mx-[5rem] my-10">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    defaultAllDay="true"
                    events={events.data}
                    customButtons={customButtons}
                    headerToolbar={headerToolbar}
                    editable
                />
            </div>

            <AddEvent open={openAddEvent} setOpen={setOpenAddEvent} getAllEvents={getAllEvents} />
            <DeleteEvent open={openDeleteEvent} setOpen={setOpenDeleteEvent} getAllEvents={getAllEvents} events={events.data} />
        </section>
    );
};

export default EventCalender;
