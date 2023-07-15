import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import Loader from "../../../components/Loader";

import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler";
import ApiService from "../../../services/ApiService";

const MyProfile = () => {
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
    const [openChangePass, setOpenChangePass] = useState(false);
    const [profileResults, setProfileResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: {},
    });

    useEffect(() => {
        if (authState.user) {
            getMyProfile();
        }
    }, []);

    const getMyProfile = async () => {
        let userId = authState.user["_id"];

        setProfileResults({
            loading: true,
            error: false,
            message: "",
            data: [],
        });
        try {
            let res = await ApiService.getMyProfile(userId);
            setProfileResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data.user,
            }));
        } catch (error) {
            let message = error.response.data.message;
            dispatch(addError(message));
            setProfileResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    return (
        <div>
            <UpdateProfile
                open={openUpdateProfile}
                setOpen={setOpenUpdateProfile}
                profile={profileResults.data}
                profileUpdateCallback={getMyProfile}
            />
            <ChangePassword
                open={openChangePass}
                setOpen={setOpenChangePass}
                user_id={profileResults.data["_id"]}
            />

            {/* {profileResults.loading && <div className="flex items-center justify-center w-full mt-[4%]">
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-700"></div>
            </div>} */}

            <Loader open={profileResults.loading} />

            {!profileResults.loading && !profileResults.error && (
                <div className="">
                    <div className="container mx-auto my-5">
                        <div className="lg:flex no-wrap lg:-mx-2 ">
                            {/* <!-- Left Side --> */}
                            <div className="w-full lg:w-3/12 lg:mr-2">
                                <div className=" mx-auto bg-white rounded-lg lg:shadow lg:border md:mt-0 p-3">
                                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                                        {profileResults.data["firstName"] +
                                            " " +
                                            profileResults.data["lastName"]}
                                    </h1>
                                    <h3 className="text-gray-600 font-lg text-semibold leading-6">
                                        {profileResults.data["isAdmin"]
                                            ? "Admin"
                                            : "Member"}
                                    </h3>
                                    <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                        <li className="flex items-center py-3">
                                            <span>Status</span>
                                            <span className="ml-auto">
                                                {profileResults.data[
                                                    "isActive"
                                                ] && (
                                                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                                                        Active
                                                    </span>
                                                )}
                                                {!profileResults.data[
                                                    "isActive"
                                                ] && (
                                                    <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                                                        In-Active
                                                    </span>
                                                )}
                                            </span>
                                        </li>
                                        <li className="flex items-center py-3">
                                            <span>Member since</span>
                                            <span className="ml-auto">
                                                {moment(
                                                    profileResults.data[
                                                        "createdAt"
                                                    ]
                                                ).format("DD-MMM-YYYY")}
                                            </span>
                                        </li>
                                    </ul>

                                    <button
                                        type="button"
                                        className="mt-4 disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                        onClick={() => setOpenChangePass(true)}
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>

                            {/* <!-- Right Side --> */}
                            <div className="w-full h-full lg:ml-2">
                                <div className=" w-[100%] mx-auto bg-white rounded-lg lg:shadow lg:border p-5">
                                    <div className="flex items-center justify-between space-x-2 font-semibold text-gray-900 leading-8">
                                        <div>
                                            <span className="tracking-wide text-xl">
                                                About
                                            </span>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => 
                                                    setOpenUpdateProfile(true)
                                                }
                                                title="Edit Profile"
                                                className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-100"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-gray-700">
                                        <div className="grid md:grid-cols-2 text-md">
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    First Name
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {" "}
                                                    {
                                                        profileResults.data[
                                                            "firstName"
                                                        ]
                                                    }{" "}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Last Name
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data[
                                                            "lastName"
                                                        ]
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Username
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data[
                                                            "userName"
                                                        ]
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Phone
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data[
                                                            "phone"
                                                        ]
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Role
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {profileResults.data[
                                                        "isAdmin"
                                                    ]
                                                        ? "ADMIN"
                                                        : "MEMBER"}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Email
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data[
                                                            "email"
                                                        ]
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-gray-100 my-4"></div>

                                    <div className="flex items-center space-x-4 font-semibold text-gray-900 leading-8">
                                        <span className="tracking-wide text-xl">
                                            Address
                                        </span>
                                    </div>
                                    <div className="text-gray-700">
                                        <div className="grid md:grid-cols-2 text-md">
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Address
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data
                                                            ?.address
                                                            ?.addressLine1
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2"></div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    City
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data
                                                            ?.address?.city
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    State
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data
                                                            .address?.state
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Country
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data
                                                            .address?.country
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    ZIP
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data
                                                            .address?.zipcode
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-gray-100 my-4"></div>

                                    <div className="flex items-center space-x-4 font-semibold text-gray-900 leading-8">
                                        <span className="tracking-wide text-xl">
                                            Membership Details
                                        </span>
                                    </div>
                                    <div className="text-gray-700">
                                        <div className="grid md:grid-cols-2 text-md">
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Membership Expiry
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {moment(
                                                        profileResults.data[
                                                            "memberShipExpireDate"
                                                        ]
                                                    ).format("DD-MMM-YYYY")}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Last Renewal
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {moment(
                                                        profileResults.data
                                                            ?.payment?.createdAt
                                                    ).format("DD-MMM-YYYY")}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Membership Fee
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data
                                                            ?.payment?.amount
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">
                                                    Last Payment Mode
                                                </div>
                                                <div className="px-4 py-2 break-all">
                                                    {
                                                        profileResults.data
                                                            ?.payment
                                                            ?.transactionType
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!profileResults.loading && profileResults.error && (
                <div className="">
                    <div className="flex flex-row  justify-center px-6 py-8 mx-auto lg:py-0 my-[6rem]">
                        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-[50rem] xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className=" text-center flex flex-col items-center text-red-600">
                                    {profileResults.message}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
