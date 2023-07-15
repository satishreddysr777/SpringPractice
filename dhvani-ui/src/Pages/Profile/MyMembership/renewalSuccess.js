import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import Constants from "../../../utils/Constants";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MembershipRenewalSuccess = () => {
    const { user_id } = useParams()
    const [loading, setLoading] = useState(false);
    const [transactionComplete, setTransactionComplete] = useState(false);
    const [error, setError] = useState(null);

    // const authState = useSelector((state) => state.auth);

    useEffect(() => {
        executePayment();
    }, []);

    const executePayment = () => {
        setLoading(true);
        var queryString = window.location.search;
        var params = new URLSearchParams(queryString);
        var paymentId = params.get("paymentId");
        var payerId = params.get("PayerID");

        const body = {
            payerId: payerId,
            paymentId: paymentId,
            userId: user_id,
            payment: {
                transactionType: Constants.MEMBERSHIP_TRANSACTION_TYPE_PAYPAL,
                amount: Constants.MEMBERSHIP_AMOUNT,
                intent: Constants.MEMBERSHIP_INTENT,
                currency: Constants.MEMBERSHIP_CURRENCY,
                paymentType: Constants.MEMBERSHIP_PAYMENT_TYPE_RENEWAL,
            },
        };

        ApiService.membershipRenewalSuccess(body)
            .then((res) => {
                setLoading(false);
                setTransactionComplete(true);
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                setError(err.response.data.message);
            });
    };

    const backTo = () => {
        window.location.href = "/my-membership";
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
                                        Your membership is updated
                                    </h3>
                                    <div className="mt-2 px-7 py-3">
                                        <div className="mt-5">
                                            <button
                                                type="button"
                                                className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                                onClick={backTo}
                                            >
                                                Go back
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
                                            onClick={backTo}
                                        >
                                            Go back
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

export default MembershipRenewalSuccess;
