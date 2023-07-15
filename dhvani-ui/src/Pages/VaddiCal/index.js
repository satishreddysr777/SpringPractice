import { useFormik } from "formik";
import { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import TextArea from "../../components/Textarea";
import * as Yup from "yup";
import Constants from "../../utils/Constants";
import SelectDate from "../../components/SelectDate";
import moment from "moment";

const VaddiCal = () => {
    const [loanTaken, setLoanTaken] = useState(null);
    const [months, set_months] = useState(0);
    const [days, set_days] = useState(0);

    const [borrow_date, set_borrow_date] = useState(null);
    // const [borrow_amount, set_borrow_amount] = useState(0);
    // const [vaddi_percent, set_vaddi_percent] = useState(0);
    const [time_peroid, set_time_peroid] = useState("");
    const [vaddi_per_month, set_vaddi_per_month] = useState(0);
    const [vaddi_per_day, set_vaddi_per_day] = useState(0);
    const [total_vaddi, set_total_vaddi] = useState(0);
    const [total_amount_with_vaddi, set_total_amount_with_vaddi] = useState(0);

    const [showTable, setShowTable] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            borrow_amount: "",
            vaddi_percent: "",
        },
        validationSchema: Yup.object().shape({
            borrow_amount: Yup.string().required("Required"),
            vaddi_percent: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            calcDays();
        },
    });

    useEffect(() => {
        if (borrow_date == null) return;
        let f_borrow_date = moment(moment(borrow_date).format("MM/DD/YYYY"));
        let today_date = moment();

        let years = today_date.diff(f_borrow_date, "year");
        f_borrow_date.add(years, "year");

        let f_months = today_date.diff(f_borrow_date, "months");
        f_borrow_date.add(f_months, "months");

        let f_days = today_date.diff(f_borrow_date, "days");

        let total_months = years * 12 + f_months;
        set_months(total_months);
        set_days(f_days);

        let time_peroid_str = "";
        if (years > 0) {
            if (years === 1) {
                time_peroid_str += `${years} year `;
            } else {
                time_peroid_str += `${years} years `;
            }
        }
        if (f_months > 0) {
            if (f_months === 1) {
                time_peroid_str += `${f_months} month `;
            } else {
                time_peroid_str += `${f_months} months `;
            }
        }
        if (f_days > 0) {
            time_peroid_str += `${f_days} days`;
        }

        set_time_peroid(time_peroid_str);
    }, [borrow_date]);

    const calcDays = () => {
        if (borrow_date === null) return alert("Please select borrow date");

        let vandha = 100;
        let no_of_100 = Number(formik.values.borrow_amount) / vandha;

        let vaddi_per_month_val = no_of_100 * Number(formik.values.vaddi_percent);
        set_vaddi_per_month(vaddi_per_month_val);

        let total_vaddi_val = vaddi_per_month_val * months;
        set_total_vaddi(total_vaddi_val);

        let vaddi_per_day_val = vaddi_per_month_val / 30;
        set_vaddi_per_day(vaddi_per_day_val);

        let vaddi_per_remaining_days = days * vaddi_per_day_val;

        let final_amount =
        Number(formik.values.borrow_amount) + total_vaddi_val + vaddi_per_remaining_days;
        set_total_amount_with_vaddi(final_amount);
        setShowTable(true);
        console.log(final_amount)
    };

    useEffect(() => {
        setShowTable(false)
    }, [formik.values.borrow_amount, formik.values.vaddi_percent])

    const reset = () => {
        formik.resetForm()
        setShowTable(false)
        set_borrow_date(null)
        set_months(0)
        set_days(0)
    }

    return (
        <div>
            <div>
                <div
                    className="w-full h-32"
                    style={{ backgroundColor: "#449388" }}
                />
                <div
                    className="container mx-auto"
                    style={{ marginTop: "-128px" }}
                >
                    <div className="py-6 h-screen">
                        <div className="flex border border-grey rounded shadow-lg h-[90%] bg-white">
                            <div className="w-full p-6">
                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                                    <div>
                                        <SelectDate
                                            label="Loan Taken Date"
                                            name="borrow_date"
                                            value={borrow_date}
                                            onChange={({ date }) => {
                                                set_borrow_date(
                                                    new Date(date).toISOString()
                                                );
                                            }}
                                            options={{}}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            label="Total Loan Taken (Rupees)"
                                            name="borrow_amount"
                                            type="number"
                                            value={formik.values.borrow_amount}
                                            onChange={formik.handleChange}
                                            error={formik.errors.borrow_amount}
                                            touched={
                                                formik.touched.borrow_amount
                                            }
                                            onBlur={formik.handleBlur}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            label="Vaddi Percent (%)"
                                            name="vaddi_percent"
                                            type="number"
                                            value={
                                                formik.values.vaddi_percent
                                            }
                                            onChange={formik.handleChange}
                                            error={
                                                formik.errors.vaddi_percent
                                            }
                                            touched={
                                                formik.touched.vaddi_percent
                                            }
                                            onBlur={formik.handleBlur}
                                            required
                                        />
                                    </div>

                                    <div>
                                        Total days: <br />
                                        {months > 0 && (
                                            <span>{months} months</span>
                                        )}{" "}
                                        {days > 0 && <span>{days} days</span>}{" "}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={formik.handleSubmit}
                                    className="mt-10 disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                    // className={`bg-[#10a37f] w-full sm:w-auto hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                                >
                                    Calculate
                                </button>

                                <button
                                    type="button"
                                    onClick={reset}
                                    className="mt-2 sm:mt-0 sm:ml-4 disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                                    // className={`bg-[#10a37f] w-full sm:w-auto hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                                >
                                    Reset
                                </button>


                                {showTable && <table className="w-full mt-5">
                                    <thead>
                                        <tr>
                                            <th className="">
                                                Total amount borrowed
                                            </th>
                                            <th className="">
                                                Vaddi Percentage
                                            </th>
                                            <th className="">Time Peroid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">
                                                {" "}
                                                {formik.values.borrow_amount}{" "}
                                            </td>
                                            <td className="text-center">
                                                {" "}
                                                {formik.values.vaddi_percent} (%){" "}
                                            </td>
                                            <td
                                                id="subtotal1"
                                                className="text-center"
                                            >
                                                {" "}
                                                {time_peroid}{" "}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>}

                                {showTable && <table className="min-w-full divide-y-2 divide-gray-200 bg-white rounded-md text-sm shadow-sm border mt-5">
                                    <tbody className="divide-y divide-gray-200">
                                        {/* <tr>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                Vaddi per month
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {Math.round(vaddi_per_month)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                Vaddi per day
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {Math.round(vaddi_per_day)}
                                            </td>
                                        </tr> */}

                                        <tr>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                Total Vaddi
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {Math.round(total_vaddi)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                Total Amount with vaddi
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 bg-red-300">
                                                {/* {new Intl.NumberFormat(
                                                    "en-IN",
                                                    {
                                                        maximumSignificantDigits: 3,
                                                    }
                                                ).format(
                                                    total_amount_with_vaddi
                                                )} */}
                                                {Math.round(total_amount_with_vaddi).toLocaleString("en-IN")}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VaddiCal;
