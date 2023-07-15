import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default class DemoApp extends React.Component {
    render() {
        return (
            <div className="max-w-[60rem]">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    // weekends={false}
                    events={[
                        {
                            title: "event 1",
                            start: "2019-04-01",
                            end: "2023-03-17",
                        },
                        { title: "event 2", date: "2019-04-02" },
                    ]}
                />
            </div>
        );
    }
}
