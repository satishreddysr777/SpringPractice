import { useEffect, useState } from "react";
import SelectMenu from "../../components/SelectMenu";
import TextArea from "../../components/Textarea";
import TextField from "../../components/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiService from "../../services/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { addError } from "../../redux/pageErrorHandler";
import Loader from "../../components/Loader"
import Constants from "../../utils/Constants"

const Donate = () => {
    const dispatch = useDispatch();

    const authState = useSelector(state => state.auth)

    const [donationType, setDonationType] = useState(null);
    const [donationTypeError, setDonationTypeError] = useState(null);
    const [donationForId, setDonationForId] = useState(null);
    const [donationForIdError, setDonationForIdError] = useState(null);
    const [donationForIdReset, setDonationForIdReset] = useState(false)

    const [donateWith, setDonateWith] = useState('Offline');

    const donationTypes = [
        {
            name: "General",
            value: 0,
        },
        {
            name: "Cause",
            value: 1,
        },
        {
            name: "Event",
            value: 2,
        },
        {
            name: "Project",
            value: 3,
        },
    ];
    const [donationForItems, setDonationForItems] = useState([]);

    const [donationForItemsResults, setDonationForItemsResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });
    const [donationResults, setDonationResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: null,
    });

    useEffect(() => {
        getDonationForItems();
    }, []);

    useEffect(() => {
        if (donationForItemsResults.data !== null) {
            var queryString = window.location.search;
            var params = new URLSearchParams(queryString);
            var dt = params.get("dt");
    
            onSelectedDonationType({ value: dt })
        }
    }, [donationForItemsResults.data])

    useEffect(() => {
        if (donationType !== null) {
            var queryString = window.location.search;
            var params = new URLSearchParams(queryString);
            var df = params.get("df");
            setDonationForId(df)
            onSelectedDonationId({ value: df })
        }
    }, [donationType])

    const getDonationForItems = async () => {
        try {
            setDonationForItemsResults({
                loading: true,
                error: false,
                message: "",
                data: null,
            });
            let res = await ApiService.getDonationForItems();
            setDonationForItemsResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data.data,
            }));
        } catch (error) {
            let message = error.response.data.message;
            dispatch(addError(message));
            setDonationForItemsResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: authState?.user?.firstName,
            lastName: authState?.user?.lastName,
            email: authState?.user?.email,
            phoneNumber: authState?.user?.phone,
            donationAmount: "",
            donationType: "",
            donationFor: "",
            description: "",
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            phoneNumber: Yup.string().required("Required"),
            donationAmount: Yup.string().required("Required"),
        }),
        onSubmit: () => {
            if (donationType !== null && donationForId !== null) {
                donate();
            }

            if (donationType === null) {
                setDonationTypeError("Required");
            }
            if (donationForId === null) {
                setDonationForIdError("Required");
            }
        },
    });

    const onSelectedDonationType = (dt) => {
        setDonationForItems([]);
        if (dt.value != null) {
            setDonationType(dt.value);
            setDonationForId(null);
            setDonationForIdReset(true);


            if (dt.value == 0) {
                setDonationForItems([
                    {
                        name: "Others",
                        value: "others",
                    },
                ]);
            } else if (dt.value == 1) {
                setDonationForItems(
                    donationForItemsResults.data["causes"] || []
                );
            } else if (dt.value == 2) {
                setDonationForItems(
                    donationForItemsResults.data["events"] || []
                );
            } else if (dt.value == 3) {
                setDonationForItems(
                    donationForItemsResults.data["projects"] || []
                );
            }
        }
    };

    const onSelectedDonationId = (data) => {
        setDonationForId(data.value);
    };

    const donate = async () => {
        try {
            setDonationResults({
                loading: true,
                error: false,
                message: "",
                data: null,
            });
            
            const body = {}
            body['firstName'] = formik.values.firstName
            body['lastName'] = formik.values.lastName
            body['email'] = formik.values.email
            body['phone'] = formik.values.phoneNumber
            body['donationType'] = null
            body['donationForId'] = donationForId
            body['donationForName'] = 'Others'
            body['amount'] = Number(formik.values.donationAmount)
            body['userId'] = authState?.user?._id
            body['description'] = formik.values.description

            donationTypes.forEach(types => {
                if (types.value == donationType) body['donationType'] = types.name
            });

            if (body['donationType'] === 'Cause') {
                if (donationForItemsResults.data && donationForItemsResults.data.causes) {
                    donationForItemsResults.data.causes.forEach(cause => {
                        if (cause.value == donationForId) body['donationForName'] = cause.name
                    });
                }
            } else if (body['donationType'] === 'Event') {
                if (donationForItemsResults.data && donationForItemsResults.data.events) {
                    donationForItemsResults.data.events.forEach(event => {
                        if (event.value == donationForId) body['donationForName'] = event.name
                    });
                }
            } else if (body['donationType'] === 'Project') {
                if (donationForItemsResults.data && donationForItemsResults.data.projects) {
                    donationForItemsResults.data.projects.forEach(project => {
                        if (project.value == donationForId) body['donationForName'] = project.name
                    });
                }
            }

            let payment = {
                transactionType: donateWith === 'Offline' ? Constants.DONATION_TRANSACTION_TYPE_OFFLINE : Constants.DONATION_TRANSACTION_TYPE_PAYPAL,
                amount: Number(formik.values.donationAmount),
                intent: Constants.DONATION_INTENT,
                currency: Constants.DONATION_CURRENCY,
                paymentType: Constants.DONATION_PAYMENT_TYPE,
            }

            if (donateWith === 'Offline') {
                body['payment'] = payment
                let res = await ApiService.donateOffline(body);
                setDonationResults((prev) => ({
                    ...prev,
                    loading: false,
                    data: res.data,
                }));
                window.location.href = "/donate/offline";
            } else {
                let res = await ApiService.donate(payment);
                let links = res.data.payment.links;
                let link = "";
                for (let i = 0; i < links.length; i++) {
                    if (links[i].rel === "approval_url") {
                        link = links[i].href;
                    }
                }
                localStorage.setItem('donation', JSON.stringify(body))
                window.open(link, "_self");
            }

        } catch (error) {
            let message = error.response.data.message;
            dispatch(addError(message));
            setDonationResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    return (
        <section>
            <Loader open={donationForItemsResults.loading || donationResults.loading} />
            <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-md transition-all sm:my-8 w-full sm:max-w-[40em] h-full mx-auto">
                <div className="bg-white">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Donate
                        </h1>
                        <form className="space-y-4 md:space-y-6">
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
                                    disabled={authState?.user?.firstName}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Last Name "
                                    name="lastName"
                                    type="text"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.errors.lastName}
                                    touched={formik.touched.lastName}
                                    onBlur={formik.handleBlur}
                                    disabled={authState?.user?.lastName}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Email "
                                    name="email"
                                    type="text"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.errors.email}
                                    touched={formik.touched.email}
                                    onBlur={formik.handleBlur}
                                    disabled={authState?.user?.email}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <TextField
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="text"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.errors.phoneNumber}
                                        touched={formik.touched.phoneNumber}
                                        onBlur={formik.handleBlur}
                                        disabled={authState?.user?.phone}
                                        required
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Donation Amount"
                                        name="donationAmount"
                                        type="text"
                                        value={formik.values.donationAmount}
                                        onChange={formik.handleChange}
                                        error={formik.errors.donationAmount}
                                        touched={formik.touched.donationAmount}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                {/* <SelectMenu
                                    label="Donation Type"
                                    items={donationTypes}
                                    value={donationType}
                                    onSelected={(data) => {
                                        onSelectedDonationType(data);
                                        setDonationTypeError(null);
                                    }}
                                    hasError={donationTypeError}
                                    error={donationTypeError}
                                    required
                                /> */}
                                <SelectMenu
                                    label="Donation Type"
                                    items={donationTypes}
                                    value={donationType}
                                    onChange={(data) => {
                                        console.log(data)
                                        onSelectedDonationType(data);
                                        // setDonationTypeError(null);
                                    }}
                                    hasError={donationTypeError}
                                    error={donationTypeError}
                                    required
                                />
                            </div>
                            <div>
                                {/* {donationType != null && (
                                    <SelectMenu
                                        label="Donation For"
                                        items={donationForItems}
                                        value={donationForId}
                                        onSelected={(data) => {
                                            // console.log(data)
                                            onSelectedDonationId(data);
                                            setDonationForIdError(null);
                                        }}
                                        hasError={donationForIdError}
                                        error={donationForIdError}
                                        reset={donationForIdReset}
                                        required
                                    />
                                )} */}
                                {donationType != null && (
                                    <SelectMenu
                                        label="Donation For"
                                        items={donationForItems}
                                        value={donationForId}
                                        onChange={(data) => {
                                            console.log(data)
                                            // console.log(data)
                                            onSelectedDonationId(data);
                                            setDonationForIdError(null);
                                        }}
                                        hasError={donationForIdError}
                                        error={donationForIdError}
                                        reset={donationForIdReset}
                                        required
                                    />
                                )}
                            </div>

                            <div>
                                <TextArea
                                    label="Description"
                                    name="description"
                                    type="text"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.errors.description}
                                    touched={formik.touched.description}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {/* {addEventResults.error && (
                                    <div
                                        className="bg-red-100 rounded-md py-2 px-6 mb-4 mx-[2rem] text-base text-center text-red-700"
                                        role="alert"
                                    >
                                        {addEventResults.message}
                                    </div>
                                )} */}

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={() => {
                            setDonateWith('Offline')
                            formik.handleSubmit()
                        }}
                        className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                        // className={`bg-[#10a37f] w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 ml-2 sm:w-auto`}
                    >
                        <span>Donate Offline</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setDonateWith('Paypal')
                            formik.handleSubmit()
                        }}
                        className="mt-3 sm:mt-0 disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                        // className={`bg-[#10a37f] w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 ml-2 sm:w-auto`}
                    >
                        <span>Donate With Paypal</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Donate;
