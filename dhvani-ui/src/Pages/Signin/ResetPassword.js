import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import Loader from "../../components/Loader";
import TextField from "../../components/TextField";
import * as Yup from "yup";

const ResetPassword = () => {

    const { token } = useParams();
    const [passResetResults, setPassResetResults] = useState({
        loading: false,
        error: false,
        message: null,
        data: null,
    });
    const [verifyLinkResults, setVerifyLinkResults] = useState({
        loading: false,
        error: false,
        message: null,
        data: null,
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            new_password: "",
            con_new_password: "",
        },
        validationSchema: Yup.object().shape({
            new_password: Yup.string().required("Required"),
            con_new_password: Yup.string().required("Required").min(3, "too short").max(10, "too long").oneOf([Yup.ref("new_password"), null], "Passwords must match"),
        }),
        onSubmit: (values) => {
            passwordReset(values);
        },
    });

    useEffect(() => {
        verify_link()
    }, [])

    const verify_link = async () => {
        setVerifyLinkResults({
            loading: true,
            error: false,
            message: null,
            data: null,
        });
        try {
            let res = await ApiService.verify_reset_password_link({ token });
            setVerifyLinkResults((prev) => ({
                ...prev,
                loading: false,
                message: res.data.message,
                data: res.data,
            }));
        } catch (error) {
            const message = error?.response?.data?.message;
            setVerifyLinkResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    }

    const passwordReset = async () => {
        const user_id = verifyLinkResults?.data?.user_id
        console.log(verifyLinkResults.data)

        setPassResetResults({
            loading: true,
            error: false,
            message: null,
            data: null,
        });
        try {
            let res = await ApiService.reset_password({ user_id, new_password: formik.values.new_password });
            setPassResetResults((prev) => ({
                ...prev,
                loading: false,
                message: res.data.message,
            }));
            window.location.href = '/signin'
        } catch (error) {
            const message = error.response.data.message;
            setPassResetResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    return (
        <section>
            <Loader open={passResetResults.loading} />
            <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0 h-[70vh] my-[6rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {verifyLinkResults?.loading && (
                            <div className="flex justify-center">
                                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-700"></div>
                            </div>
                        )}
                        {!verifyLinkResults?.loading && verifyLinkResults?.error && (
                            <div className="text-center text-red-500"> {verifyLinkResults.message} </div>
                        )}
                        
                        {!verifyLinkResults?.loading && !verifyLinkResults?.error && <>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Forgot Password
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <TextField
                                        label="New password"
                                        name="new_password"
                                        type="password"
                                        value={formik.values.new_password}
                                        onChange={formik.handleChange}
                                        error={formik.errors.new_password}
                                        touched={formik.touched.new_password}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <TextField
                                        label="Confirm new password"
                                        name="con_new_password"
                                        type="password"
                                        value={formik.values.con_new_password}
                                        onChange={formik.handleChange}
                                        error={formik.errors.con_new_password}
                                        touched={formik.touched.con_new_password}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                {!passResetResults.loading && !passResetResults.error && passResetResults.message !== null && (
                                    <div
                                        className="bg-green-100 rounded-md py-2 px-6 mb-4 text-base text-center text-green-700"
                                        role="alert"
                                    >
                                        {passResetResults.message}
                                    </div>
                                )}

                                {!passResetResults.loading && passResetResults.error && passResetResults.message !== null && (
                                    <div
                                        className="bg-red-100 rounded-md py-2 px-6 mb-4 text-base text-center text-red-700"
                                        role="alert"
                                    >
                                        {passResetResults.message}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                    onClick={formik.handleSubmit}
                                >
                                    Reset Password
                                </button>
                            </form>
                        </>}
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
