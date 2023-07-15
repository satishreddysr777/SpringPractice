import { useState } from "react";
import { useFormik } from "formik";
import ApiService from "../../services/ApiService";
import Loader from "../../components/Loader";
import TextField from "../../components/TextField";
import * as Yup from "yup";

const VerificationMail = () => {
    const [verificationResults, setVerificationResults] = useState({
        loading: false,
        error: false,
        message: null,
        data: null,
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            sendVerificationMail(values);
        },
    });

    const sendVerificationMail = async (values) => {
        const { email } = values;

        setVerificationResults({
            loading: true,
            error: false,
            message: null,
            data: null,
        });
        try {
            let res = await ApiService.sendVerificationMail({ email });
            setVerificationResults((prev) => ({
                ...prev,
                loading: false,
                message: res.data.message,
            }));
        } catch (error) {
            const message = error.response.data.message;
            setVerificationResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    return (
        <section>
            <Loader open={verificationResults.loading} />
            <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0 h-[70vh] my-[6rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Verify your account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div className="col-span-6 sm:col-span-3">
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

                            {!verificationResults.loading && !verificationResults.error && verificationResults.message !== null && (
                                <div
                                    className="bg-green-100 rounded-md py-2 px-6 mb-4 text-base text-center text-green-700"
                                    role="alert"
                                >
                                    {verificationResults.message}
                                </div>
                            )}

                            {!verificationResults.loading && verificationResults.error && verificationResults.message !== null && (
                                <div
                                    className="bg-red-100 rounded-md py-2 px-6 mb-4 text-base text-center text-red-700"
                                    role="alert"
                                >
                                    {verificationResults.message}
                                </div>
                            )}

                            <button
                                type="button"
                                className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                // className="w-full text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
                                onClick={formik.handleSubmit}
                            >
                                Send Verification Link
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerificationMail;
