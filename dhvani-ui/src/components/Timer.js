import React from "react";

const Timer = () => {
    const [timer, setTimer] = React.useState(3);
    const id = React.useRef(null);
    const clear = () => {
        window.clearInterval(id.current);
        // window.location.href = "/"
    };

    React.useEffect(() => {
        id.current = window.setInterval(() => {
            setTimer((time) => time - 1);
        }, 1000);

        return () => clear();
    }, []);

    React.useEffect(() => {
        if (timer === 0) clear();
    }, [timer]);

    return <div>Redirecting in {timer} seconds.</div>;
};

export default Timer;
