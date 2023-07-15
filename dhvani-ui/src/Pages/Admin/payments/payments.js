import { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";

import { BiCheck, BiX } from "react-icons/bi";
import Table from "../../../components/Table/Table";
import FilterMenu from "../../../components/Menu/FilterMenu";

import { useDispatch } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler";
import { ProcessNotification } from "../../../utils/Helpers";
import ApiService from "../../../services/ApiService";
import moment from "moment";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

const Payments = () => {
    const dispatch = useDispatch();

    const [paymentResults, setPaymentResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: [],
    });
    const [filterPaymentResults, setFilterPaymentResults] = useState([]);
    const [updatePaymentStatusResults, setUpdatePaymentStatusResults] = useState({ loading: false, error: false, message: "", data: [] });
    const filterItems = ["Completed", "Pending", "Denied"];

    const csvHeaders = [
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" },
        { label: "Amount", key: "amount" },
        { label: "Mode", key: "mode" },
        { label: "Payment", key: "payment" },
        { label: "Description", key: "desc" },
        { label: "Transaction ID", key: "transactionId" },
        { label: "Status", key: "status" },
    ];
    const csvLinkRef = useRef();
    const columns = [
        {
            name: "Name",
            selector: "name",
            cell: (row) => <span>{row.name}</span>,
        },
        {
            name: "Email",
            selector: "email",
        },
        {
            name: "Phone",
            selector: "phone",
        },
        {
            name: "Amount",
            selector: "amount",
        },
        {
            name: "Mode",
            selector: "mode",
        },
        {
            name: "Payment",
            selector: "payment",
        },
        {
            name: "Desc",
            selector: "desc",
        },
        {
            name: "Transaction ID",
            selector: "transactionId",
        },
        {
            name: "Created Date",
            selector: "createdDate",
            cell: row => (
                <div>
                    {moment(row[
                            "createdDate"
                        ]
                    ).format("DD-MMM-YYYY")}
                </div>
            )
        },
        {
            name: "Status",
            selector: "status",
            cell: (row) => (
                <div className="flex-shrink-0 flex">
                    {row.status === "PENDING" && (
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {row.status}
                        </p>
                    )}
                    {row.status === "COMPLETED" && (
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {row.status}
                        </p>
                    )}
                    {row.status === "DENIED" && (
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {row.status}
                        </p>
                    )}
                </div>
            ),
        },
        {
            name: "Actions",
            selector: "actions",
            cell: (row) => (
                <div className="flex text-center w-full">
                    {row.status === "PENDING" && (
                        <>
                            <div
                                className="bg-red-600 rounded-full mx-1 cursor-pointer"
                                onClick={() =>
                                    updatePaymentStatus(
                                        row["paymentId"],
                                        "DENIED"
                                    )
                                }
                            >
                                <BiX color="white" size={28} />
                            </div>
                            <div
                                className="bg-green-600 rounded-full mx-1 cursor-pointer"
                                onClick={() =>
                                    updatePaymentStatus(
                                        row["paymentId"],
                                        "COMPLETED"
                                    )
                                }
                            >
                                <BiCheck color="white" size={28} />
                            </div>
                        </>
                    )}
                    {row.status === "DENIED" && (
                        <div
                            className="bg-green-600 rounded-full mx-1 cursor-pointer"
                            onClick={() =>
                                updatePaymentStatus(
                                    row["paymentId"],
                                    "COMPLETED"
                                )
                            }
                        >
                            <BiCheck color="white" size={28} />
                        </div>
                    )}
                    {row.status === "COMPLETED" && <>No actions</>}
                </div>
            ),
        },
    ];

    useEffect(() => {
        getAllPayments();
    }, []);

    const getAllPayments = async () => {
        setPaymentResults({
            loading: true,
            error: false,
            message: "",
            data: [],
        });

        try {
            let res = await ApiService.getAllPayments();
            setPaymentResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data.payments,
            }));
            setFilterPaymentResults(res.data.payments);
        } catch (error) {
            const message = error.response.data.message;
            setPaymentResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const updatePaymentStatus = async (paymentId, status) => {
        setUpdatePaymentStatusResults({
            loading: true,
            error: false,
            message: "",
            data: [],
        });

        try {
            let res = await ApiService.updatePaymentStatus({
                paymentId: paymentId,
                paymentStatus: status,
            });
            setUpdatePaymentStatusResults((prev) => ({
                ...prev,
                loading: false,
            }));
            getAllPayments();
            toast.success("Payment updated.", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            const message = error.response.data.message;
            dispatch(addError(message));
            setUpdatePaymentStatusResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const filterWithStatus = (filters) => {
        if (filters.length > 0) {
            let payments = [...paymentResults.data];
            let filteredPayments = [];
            for (let i = 0; i < payments.length; i++) {
                if (filters.includes(payments[i].status.toLowerCase())) {
                    filteredPayments.push(payments[i]);
                }
            }
            console.log(filteredPayments);
            setFilterPaymentResults(filteredPayments);
        } else {
            setFilterPaymentResults(paymentResults.data);
        }
    };

    const onFilter = (filters) => {
        let filterItems = [];
        for (let i = 0; i < filters.length; i++) {
            filterItems.push(filters[i].toLowerCase());
        }
        filterWithStatus(filterItems);
    };

    return (
        <div>
            <Loader open={updatePaymentStatusResults.loading} />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Payments
                    </h1>

                    <div className="flex items-center">
                        <FilterMenu items={filterItems} onFilter={onFilter} />
                        <div className="ml-3">
                            <button
                                onClick={() => csvLinkRef.current.link.click()}
                                className="inline w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-none"
                            >
                                Export
                            </button>
                            <CSVLink
                                headers={csvHeaders}
                                filename="Payments.csv"
                                data={filterPaymentResults}
                                ref={csvLinkRef}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="mx-5">
                <Table
                    name="Payments"
                    columns={columns}
                    data={filterPaymentResults}
                    loading={paymentResults.loading}
                    error={paymentResults.error}
                    errorMessage={paymentResults.message}
                />
            </div>
        </div>
    );
};

export default Payments;
