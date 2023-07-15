import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";
import moment from "moment";
import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import Loader from "../../../components/Loader";
import Constants from "../../../utils/Constants";
import { setUser } from "../../../redux/auth";

const MyMembership = () => {
    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);
    const { user } = authState;
    const { payment } = user;

    const [renewalPaypalResults, setRenewalPaypalResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });
    const [renewalOfflineResults, setRenewalOfflineResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });
    const [getProfileResults, setGetProfileResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });

    useEffect(() => {
        getMyProfile();
    }, []);

    const getMyProfile = async () => {
        setGetProfileResults({
            loading: true,
            error: false,
            message: "",
            data: null,
        });

        ApiService.getMyProfile(authState["user"]["_id"])
            .then((res) => {
                setGetProfileResults((prev) => ({
                    ...prev,
                    loading: false,
                    data: res.data,
                }));
                dispatch(setUser(res.data));
            })
            .catch((err) => {
                const error = err.response.data;
                const { message } = error;
                setGetProfileResults((prev) => ({
                    ...prev,
                    loading: false,
                    error: true,
                    message: message,
                }));
            });
    };

    const onClickPaypal = () => {
        setRenewalPaypalResults({
            loading: true,
            error: false,
            message: "",
            data: null,
        });

        const body = {
            payment: {
                transactionType: Constants.MEMBERSHIP_TRANSACTION_TYPE_PAYPAL,
                amount: Constants.MEMBERSHIP_AMOUNT,
                intent: Constants.MEMBERSHIP_INTENT,
                currency: Constants.MEMBERSHIP_CURRENCY,
                paymentType: Constants.MEMBERSHIP_PAYMENT_TYPE_RENEWAL,
            },
            email: user['email']
        };

        ApiService.membershipRenewal(body)
            .then((res) => {
                setRenewalPaypalResults((prev) => ({
                    ...prev,
                    data: res.data,
                }));

                let links = res.data.payment.links;
                let link = "";
                for (let i = 0; i < links.length; i++) {
                    if (links[i].rel === "approval_url") {
                        link = links[i].href;
                    }
                }
                window.open(link, "_self");
            })
            .catch((err) => {
                const error = err.response.data;
                const { message } = error;
                setRenewalPaypalResults((prev) => ({
                    ...prev,
                    loading: false,
                    error: true,
                    message: message,
                }));
            });
    };

    const onClickOffline = () => {
        setRenewalOfflineResults({
            loading: true,
            error: false,
            message: "",
            data: null,
        });

        const body = {
            userId: authState["user"]["_id"],
            payment: {
                transactionType: Constants.MEMBERSHIP_TRANSACTION_TYPE_OFFLINE,
                amount: Constants.MEMBERSHIP_AMOUNT,
                intent: Constants.MEMBERSHIP_INTENT,
                currency: Constants.MEMBERSHIP_CURRENCY,
                paymentType: Constants.MEMBERSHIP_PAYMENT_TYPE_RENEWAL,
            },
        };

        ApiService.membershipRenewalOffline(body)
            .then((res) => {
                setRenewalOfflineResults((prev) => ({
                    ...prev,
                    loading: false,
                    data: res.data,
                }));
                window.location.href = "/membership-renewal/offline";
            })
            .catch((err) => {
                const error = err.response.data;
                const { message } = error;
                setRenewalOfflineResults((prev) => ({
                    ...prev,
                    loading: false,
                    error: true,
                    message: message,
                }));
            });
    };

    return (
        <section>
            <Loader
                open={
                    renewalPaypalResults.loading ||
                    getProfileResults.loading ||
                    renewalOfflineResults.loading
                }
            />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        My Membership
                    </h1>
                </div>
            </header>

            <div className="flex justify-center w-full my-[2rem]">
                <div className="w-[80%] mx-2 h-full">
                    <div className=" w-[100%] mx-auto bg-white rounded-lg shadow border p-5">
                        {!getProfileResults.error && (
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-md">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Membership Expiry:
                                        </div>
                                        <div className="px-4 py-2">
                                            {" "}
                                            {moment(
                                                user.memberShipExpireDate
                                            ).format("DD-MMM-YYYY")}{" "}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Last Renewal:
                                        </div>
                                        <div className="px-4 py-2">
                                            {moment(
                                                payment["paymentCreatedDate"]
                                            ).format("DD-MMM-YYYY")}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 mt-4">
                                        <div className="px-4 py-2 font-semibold">
                                            Membership Fee:
                                        </div>
                                        <div className="px-4 py-2">
                                            {payment["amount"]}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 mt-4">
                                        <div className="px-4 py-2 font-semibold">
                                            Last Payment Mode:
                                        </div>
                                        <div className="px-4 py-2">
                                            {payment["transactionType"]}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Menu
                                        onClickPaypal={onClickPaypal}
                                        onClickOffline={onClickOffline}
                                    />
                                </div>
                            </div>
                        )}

                        {getProfileResults.error && (
                            <div
                                className="bg-red-100 rounded-md py-2 px-6 my-4 text-base text-center text-red-700"
                                role="alert"
                            >
                                {getProfileResults.message}
                            </div>
                        )}
                        {renewalPaypalResults.error && (
                            <div
                                className="bg-red-100 rounded-md py-2 px-6 my-4 text-base text-center text-red-700"
                                role="alert"
                            >
                                {renewalPaypalResults.message}
                            </div>
                        )}
                        {renewalOfflineResults.error && (
                            <div
                                className="bg-red-100 rounded-md py-2 px-6 my-4 text-base text-center text-red-700"
                                role="alert"
                            >
                                {renewalOfflineResults.message}
                            </div>
                        )}
                    </div>

                    
                </div>
            </div>
        </section>
    );
};

export default MyMembership;
