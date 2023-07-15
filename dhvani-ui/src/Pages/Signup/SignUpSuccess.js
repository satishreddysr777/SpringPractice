import { useEffect, useState } from "react";
import axios from "axios";
import ApiService from "../../services/ApiService";

const SignUpSuccess = () => {
    const [loading, setLoading] = useState(false);
    const [transactionComplete, setTransactionComplete] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        executePayment();
    }, []);

    const executePayment = async () => {
        setLoading(true);
        var queryString = window.location.search;
        var params = new URLSearchParams(queryString);
        var paymentId = params.get("paymentId");
        var payerId = params.get("PayerID");

        var retrievedObject = localStorage.getItem("userInfo");
        var userInfo = JSON.parse(retrievedObject);

        try {
            let res = await ApiService.signUpSuccess({
                payerId: payerId,
                paymentId: paymentId,
                userInfo: userInfo,
            });
            setLoading(false);
            setTransactionComplete(true);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    const backTo = () => {
        window.location.href = "/signup";
    };
    const backToSignIn = () => {
        window.location.href = "/signin";
    };

    return (
        <>
            <div className="flex flex-row  justify-center px-6 py-8 mx-auto lg:py-0 my-[6rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-[50rem] xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="mt-3 text-center flex flex-col items-center">
                            {loading && (
                                <>
                                    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-700"></div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Completing your payment please wait.
                                    </h3>{" "}
                                </>
                            )}

                            {!loading && transactionComplete && (
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
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 13l4 4L19 7"
                                            ></path>
                                        </svg>
                                    </div>

                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Thanks for registering
                                    </h3>
                                    <div className="mt-2 px-7 py-3">
                                        <p className="text-sm text-gray-500">
                                            Account has been successfully
                                            registered. Transaction ID will be
                                            sent to you in the mail
                                        </p>
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

                            {!loading && !transactionComplete && (
                                <>
                                    <h3 className="text-lg leading-6 font-medium text-red-600">
                                        {" "}
                                        {error}{" "}
                                    </h3>
                                    <div className="mt-2 px-7 py-3">
                                        <button
                                            type="button"
                                            className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                            // className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-md text-sm px-5 py-2.5 ml-2 mb-2  focus:outline-none"
                                            onClick={backTo}
                                        >
                                            Back to Signup
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpSuccess;
