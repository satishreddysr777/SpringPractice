import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../redux/auth";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        localStorage.removeItem("access-token");
        setTimeout(() => {
            window.location.href = "/signin";
        }, 1000);
    }, []);

    return (
        <div className="flex items-center my-[4rem] mx-auto w-fit text-xl">
            Logging off...
        </div>
    );
};

export default Logout;
