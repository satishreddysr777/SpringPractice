import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";

const VerificationMail = () => {
    const { token } = useParams();

    const [verificationResults, setVerificationResults] = useState({
        loading: false,
        error: false,
        message: null,
        data: null,
    });

    useEffect(() => {
        console.log(token);
        verificationMail(token);
    }, []);

    const verificationMail = async (token) => {
        setVerificationResults({
            loading: true,
            error: false,
            message: "",
            data: null,
        });
        try {
            let res = await ApiService.verifyMail({ token });
            setVerificationResults((prev) => ({
                ...prev,
                loading: false,
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

    const backToSignIn = () => {
        window.location.href = "/signin";
    };

    return (
        <div className="flex flex-row  justify-center px-6 py-8 mx-auto lg:py-0 my-[6rem]">
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-[50rem] xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="mt-3 text-center flex flex-col items-center">
                        {verificationResults.loading && (
                            <>
                                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-700"></div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Verifying your email, please wait.
                                </h3>{" "}
                            </>
                        )}

                        {!verificationResults.loading &&
                            !verificationResults.error && (
                                <>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <svg
                                            className="h-6 w-6 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            ></path>
                                        </svg>
                                    </div>

                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Email Verification successfull
                                    </h3>
                                    <div className="mt-2 px-7 py-3">
                                        <div className="mt-5">
                                            <button
                                                type="button"
                                                className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                                // className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-md text-sm px-5 py-2.5 ml-2 mb-2  focus:outline-none"
                                                onClick={backToSignIn}
                                            >
                                                Go to Singin
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                        {!verificationResults.loading &&
                            verificationResults.error && (
                                <>
                                    <h3 className="text-lg leading-6 font-medium text-red-600">
                                        {" "}
                                        {verificationResults.message}{" "}
                                    </h3>
                                    <div className="mt-2 px-7 py-3">
                                        <button
                                            type="button"
                                            className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                            // className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-md text-sm px-5 py-2.5 ml-2 mb-2  focus:outline-none"
                                            onClick={backToSignIn}
                                        >
                                            Back to SignIn
                                        </button>
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationMail;
