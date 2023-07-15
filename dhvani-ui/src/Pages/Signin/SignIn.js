import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import "flatpickr/dist/themes/airbnb.css";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import TextField from "../../components/TextField";

import ApiService from "../../services/ApiService";
import { setUser } from "../../redux/auth";
import * as Yup from "yup";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginResults, setLoginResults] = useState({
        loading: false,
        error: false,
        errorCode: null,
        message: null,
        data: null,
    });

    useEffect(() => {
        if (loginResults.data) {
            dispatch(setUser(loginResults.data));
            navigate("/");
        }
    }, [loginResults.data]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            userName: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            login(values);
        },
    });

    const login = async (values) => {
        const { userName, password } = values;
        const loginData = {
            userName: userName,
            password: password,
        };

        setLoginResults({
            loading: true,
            error: false,
            message: "",
            data: null,
        });
        try {
            let res = await ApiService.login(loginData);
            setLoginResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data,
            }));
            localStorage.setItem("access-token", res.data.token);
        } catch (err) {
            const error = err.response.data;
            const { errorCode, message } = error;
            setLoginResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
                errorCode: errorCode,
            }));
        }
    };

    const navigateTo = (to) => {
        navigate(to);
    };

    return (
        <section>
            <Loader open={loginResults.loading} />

            <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0 h-[70vh] my-[6rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div className="col-span-6 sm:col-span-3">
                                <TextField
                                    label="Username/Email"
                                    name="userName"
                                    type="text"
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                    error={formik.errors.userName}
                                    touched={formik.touched.userName}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.errors.password}
                                    touched={formik.touched.password}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {loginResults.error && !loginResults.errorCode && (
                                <div
                                    className="bg-red-100 rounded-md py-2 px-6 text-base text-center text-red-700"
                                    role="alert"
                                >
                                    {loginResults.message}
                                </div>
                            )}

                            {loginResults.error && loginResults.errorCode && (
                                <div
                                    className="bg-red-100 rounded-md py-2 px-2 text-base text-red-700"
                                    role="alert"
                                >
                                    {loginResults.message}{" "}
                                    {loginResults.errorCode ===
                                        "VERIFY_EMAIL" && (
                                        <span
                                            className="text-red-500 cursor-pointer underline"
                                            onClick={() =>
                                                navigateTo("/send-verify-email")
                                            }
                                        >
                                            Send Verification Mail
                                        </span>
                                    )}
                                    {loginResults.errorCode ===
                                        "MEMBERSHIP_EXPIRED" && (
                                        <span
                                            className="text-red-500 cursor-pointer underline"
                                            onClick={() =>
                                                navigateTo(
                                                    "/membership-renewal"
                                                )
                                            }
                                        >
                                            Click here to renewal
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* <button
                                type="button"
                                className="w-full text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
                                onClick={formik.handleSubmit}
                            >
                                Sign In
                            </button> */}

                            <button
                                type="button"
                                onClick={formik.handleSubmit}
                                className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none w-full sm:text-sm"
                                // className={`bg-[#10a37f] w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2`}
                            >
                                <span>Sign In</span>
                            </button>

                            <span className="text-sm font-light text-gray-500">
                                <div className="my-2">
                                    <a
                                        href="/forgot-password"
                                        className="text-sm font-medium text-primary-600 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                Don’t have an account yet?{" "}
                                <a
                                    href="/signup"
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Sign up
                                </a>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
