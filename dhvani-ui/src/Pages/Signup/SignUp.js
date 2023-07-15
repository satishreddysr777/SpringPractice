import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Loader from "../../components/Loader";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import ApiService from "../../services/ApiService";

const SignUp = () => {
    const emailRefExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            //   firstName: 'Satish Kumar Reddy',
            //   lastName: 'Tarapareddy',
            //   email: 'satishreddysr777@gmail.com',
            //   userName: 'satishreddy',
            //   password: '123',
            //   confirmPassword: '123',
            //   phone: '6592028077',
            //   addressLine: '14th Ave S',
            //   city: 'Birmingham',
            //   state: 'Alabama',
            //   country: 'USA',
            //   zip: '35205',
            //   amount: '100'
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
            phone: "",
            addressLine: "",
            city: "",
            state: "",
            country: "",
            zip: "",
            amount: 100,
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required("Firstname is required"),
            lastName: Yup.string().required("Lastname is required"),
            email: Yup.string()
                .email()
                .required("Email is required")
                .matches(emailRefExp, "email must be a valid email"),
            userName: Yup.string().required("Username is required"),
            password: Yup.string()
                .required("Password is required")
                .min(3, "too short")
                .max(10, "too long"),
            confirmPassword: Yup.string()
                .required("Confirm Password is required")
                .min(3, "too short")
                .max(10, "too long")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
            phone: Yup.string()
                .required("Phone is required")
                .matches(phoneRegExp, "Phone number is not valid")
                .min(10, "too short")
                .max(10, "too long"),
            addressLine: Yup.string().required("addressline is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            country: Yup.string().required("Country is required"),
            zip: Yup.string()
                .required("zip is required")
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(5, "Must be exactly 5 digits")
                .max(5, "Must be exactly 5 digits"),
            amount: Yup.string().required("amount is required"),
        }),
        onSubmit: (values) => {
            signUp();
        },
    });

    const [loading, setLoading] = useState(false);
    const [signupType, setSignUpType] = useState(null);
    const [membership, setMembership] = useState(false);
    const [signUpError, setSignUpError] = useState(null);

    const signUp = async () => {
        const {
            firstName,
            lastName,
            userName,
            email,
            phone,
            password,
            addressLine,
            state,
            country,
            zip,
            city,
            amount,
        } = formik.values;

        const signupData = {
            firstName,
            lastName,
            userName,
            email,
            password,
            phone,
            address: {
                addressLine1: addressLine,
                city: city,
                state: state,
                country: country,
                zipcode: zip,
            },
            payment: {
                transactionType: signupType === "paypal" ? "Paypal" : "Offline",
                amount,
                intent: "Sale",
                currency: "USD",
                paymentType: "Membership",
            },
        };

        setLoading(true);

        if (signupType === "paypal") {
            try {
                let res = await ApiService.signup(signupData);
                let links = res.data.payment.links;
                let link = "";
                for (let i = 0; i < links.length; i++) {
                    if (links[i].rel === "approval_url") {
                        link = links[i].href;
                    }
                }
                localStorage.setItem("userInfo", JSON.stringify(signupData));
                window.open(link, "_self");
            } catch (error) {
                setLoading(false);
                setSignUpError(error.response.data.message);
            }
        } else {
            try {
                let res = await ApiService.signupOffline(signupData);
                window.location.href = "/signup/offline";
            } catch (error) {
                setLoading(false);
                setSignUpError(error.response.data.message);
            }
        }
    };

    return (
        <section>
            <Loader open={loading} setOpen={setLoading} />

            <div className="flex flex-row  justify-center px-6 py-8 mx-auto lg:py-0 my-[2rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-[50rem] xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create your account
                        </h1>

                        <form className="space-y-4 md:space-y-6">
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <TextField
                                        label="First Name "
                                        name="firstName"
                                        type="text"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.errors.firstName}
                                        touched={formik.touched.firstName}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Last Name"
                                        name="lastName"
                                        type="text"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.errors.lastName}
                                        touched={formik.touched.lastName}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="User Name"
                                        name="userName"
                                        type="text"
                                        value={formik.values.userName}
                                        onChange={formik.handleChange}
                                        error={formik.errors.userName}
                                        touched={formik.touched.userName}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="text"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.errors.email}
                                        touched={formik.touched.email}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
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

                                <div>
                                    <TextField
                                        label="Re-enter Password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        error={formik.errors.confirmPassword}
                                        touched={formik.touched.confirmPassword}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Phone"
                                        name="phone"
                                        type="text"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={formik.errors.phone}
                                        touched={formik.touched.phone}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Address Line"
                                        name="addressLine"
                                        type="text"
                                        value={formik.values.addressLine}
                                        onChange={formik.handleChange}
                                        error={formik.errors.addressLine}
                                        touched={formik.touched.addressLine}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="City"
                                        name="city"
                                        type="text"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        error={formik.errors.city}
                                        touched={formik.touched.city}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="State"
                                        name="state"
                                        type="text"
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                        error={formik.errors.state}
                                        touched={formik.touched.state}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Country"
                                        name="country"
                                        type="text"
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        error={formik.errors.country}
                                        touched={formik.touched.country}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        label="Zip"
                                        name="zip"
                                        type="text"
                                        value={formik.values.zip}
                                        onChange={formik.handleChange}
                                        error={formik.errors.zip}
                                        touched={formik.touched.zip}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium text-gray-700">
                                    Membership Duration
                                </label>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="membership"
                                            name="membership"
                                            aria-describedby="membership"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                            required=""
                                            onChange={() =>
                                                setMembership(!membership)
                                            }
                                            checked={membership}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="membership"
                                            className="text-gray-500"
                                        >
                                            1 Year - 100$
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {signUpError && !loading && (
                                <div
                                    className="bg-red-100 rounded-md py-2 px-6 mb-4 text-base text-center text-red-700"
                                    role="alert"
                                >
                                    {signUpError}
                                </div>
                            )}

                            {/* <div className="flex justify-end">
                                <button
                                    type="button"
                                    disabled={!membership}
                                    onClick={() => {
                                        setSignUpType("paypal");
                                        formik.handleSubmit();
                                    }}
                                    className={`bg-[#10a37f] disabled:opacity-60 disabled:cursor-auto w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 ml-2 sm:w-auto`}
                                >
                                    SIGNUP with PAYPAL
                                </button>

                                <button
                                    type="button"
                                    disabled={!membership}
                                    onClick={() => {
                                        setSignUpType("offline");
                                        formik.handleSubmit();
                                    }}
                                    className={`bg-[#10a37f] disabled:opacity-60 disabled:cursor-auto w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 ml-2 sm:w-auto`}
                                >
                                    SIGNUP OFFLINE
                                </button>
                            </div> */}

                            <div className="sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="bg-[#10a37f] disabled:opacity-60 disabled:cursor-auto w-full hover:opacity-80 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        disabled={!membership}
                                        onClick={() => {
                                            setSignUpType("offline");
                                            formik.handleSubmit();
                                        }}
                                    >
                                        SIGNUP OFFLINE
                                    </button>
                                    <button
                                        type="button"
                                        disabled={!membership}
                                        onClick={() => {
                                            setSignUpType("paypal");
                                            formik.handleSubmit();
                                        }}
                                        className="bg-[#10a37f] disabled:opacity-60 disabled:cursor-auto w-full hover:opacity-80 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm mt-4 sm:mt-0"
                                    >
                                        SIGNUP with PAYPAL
                                    </button>
                                </div>

                            <p className="text-sm font-light text-gray-500">
                                Already have account?{" "}
                                <a
                                    href="/signin"
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Sign In
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
