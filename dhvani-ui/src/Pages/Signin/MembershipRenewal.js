import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import Loader from "../../components/Loader";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import Constants from "../../utils/Constants";

const VerificationMail = () => {
    
    const [renewResults, setRenewResults] = useState({
        loading: false,
        error: false,
        message: null,
        data: null,
    });
    const [tranType, setTranType] = useState('Offline')

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Required"),
        }),
        onSubmit: () => {
            if (tranType === 'Paypal') {
                onClickPaypal()
            }
        },
    });

    const onClickPaypal = () => {
        setRenewResults({
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
            email: formik.values.email
        };

        ApiService.membershipRenewal(body)
            .then((res) => {
                setRenewResults((prev) => ({
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
                setRenewResults((prev) => ({
                    ...prev,
                    loading: false,
                    error: true,
                    message: message,
                }));
            });
    };

    return (
        <section>
            <Loader open={renewResults.loading} />
            <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0 h-[70vh] my-[6rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Membership Renewal
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

                            {!renewResults.loading && !renewResults.error && renewResults.message !== null && (
                                <div
                                    className="bg-green-100 rounded-md py-2 px-6 mb-4 text-base text-center text-green-700"
                                    role="alert"
                                >
                                    {renewResults.message}
                                </div>
                            )}

                            {!renewResults.loading && renewResults.error && renewResults.message !== null && (
                                <div
                                    className="bg-red-100 rounded-md py-2 px-6 mb-4 text-base text-center text-red-700"
                                    role="alert"
                                >
                                    {renewResults.message}
                                </div>
                            )}

                            <button
                                type="button"
                                className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                onClick={() => {
                                    setTranType('Offline')
                                    formik.handleSubmit()
                                }}
                            >
                                Renew Offline
                            </button>
                            <br />
                            <button
                                type="button"
                                className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                onClick={() => {
                                    setTranType('Paypal')
                                    formik.handleSubmit()
                                }}
                            >
                                Renew with PAYPAL
                            </button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerificationMail;
