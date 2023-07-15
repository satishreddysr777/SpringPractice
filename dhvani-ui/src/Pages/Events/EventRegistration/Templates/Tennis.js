import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "../../../../components/TextField";
import AddTeammate from "../AddTeammate";
import { useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";

const Badminton = ({ registerEvent }) => {

    const [openAddPlayer, setOpenAddPlayer] = useState(false);
    const [category, setCategory] = useState(null)
    const [categoryError, setCategoryError] = useState(false)
    const [registerThrough, setRegisterThrough] = useState(null)
    const [players, setPLayers] = useState([]);


    const columns = [
        {
            name: "Firstname",
            selector: "firstName",
            cell: (row) => <span>{row.firstName}</span>,
        },
        {
            name: "LastName",
            selector: "lastName",
        },
        {
            name: "Contact number",
            selector: "contactNumber",
        },
        {
            name: "Actions",
            selector: "action",
            style: { width: "40px" },
            cell: (row, index) => (
                <div className="flex items-center space-x-2">
                    <button
                        title="Mark As Unread"
                        onClick={(e) => {
                            e.preventDefault();
                            handleRemovePLayer(index);
                        }}
                        className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                    >
                        Remove
                    </button>
                </div>
            ),
        },
    ];

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            primaryContactName: "",
            email: "",
            confirmEmail: "",
            phone: "",
            alternatePhone: "",
        },
        validationSchema: Yup.object().shape({
            primaryContactName: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            confirmEmail: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("email"), null], "Email must match"),
            phone: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            if (category === null) {
                setCategoryError(true)
            } else {
                values['players'] = players
                values['registerThrough'] = registerThrough
                values['teamType'] = category
                registerEvent(values)
            }
        },
    });


    const handleAddPlayer = (player) => {
        setPLayers([...players, player]);
    };

    const handleRemovePLayer = (index) => {
        let newPlayers = [...players];
        newPlayers.splice(index, 1);
        setPLayers(newPlayers);
    };

    return (
        <section>
            <AddTeammate
                open={openAddPlayer}
                setOpen={setOpenAddPlayer}
                handleAddPlayer={handleAddPlayer}
            />

            <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <TextField
                            label="Name of primary contact"
                            name="primaryContactName"
                            type="text"
                            value={formik.values.primaryContactName}
                            onChange={formik.handleChange}
                            error={formik.errors.primaryContactName}
                            touched={formik.touched.primaryContactName}
                            onBlur={formik.handleBlur}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <TextField
                            label="Email"
                            name="email"
                            type="text"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.errors.email}
                            touched={formik.touched.email}
                            onBlur={formik.handleBlur}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Confirm Email"
                            name="confirmEmail"
                            type="text"
                            value={formik.values.confirmEmail}
                            onChange={formik.handleChange}
                            error={formik.errors.confirmEmail}
                            touched={formik.touched.confirmEmail}
                            onBlur={formik.handleBlur}
                            required
                        />
                    </div>

                    <div>
                        <TextField
                            label="Phone number"
                            name="phone"
                            type="text"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.errors.phone}
                            touched={formik.touched.phone}
                            onBlur={formik.handleBlur}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Alternate phone number"
                            name="alternatePhone"
                            type="text"
                            value={formik.values.alternatePhone}
                            onChange={formik.handleChange}
                            error={formik.errors.alternatePhone}
                            touched={formik.touched.alternatePhone}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor={"category"}
                        className="block text-sm font-medium text-gray-700 mb-3"
                    >
                        Participant Category
                        <span className="text-md text-red-500">*</span>
                    </label>
                    <div className="flex items-center mb-2">
                        <input
                            id="adult-singles"
                            type="radio"
                            value="adult-singles"
                            name="default-radio"
                            onChange={e => {
                                setCategory(e.target.value)
                                setCategoryError(false)
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                            htmlFor="adult-singles"
                            className={`ml-2 text-sm font-medium  ${categoryError ? 'text-red-600' : 'text-gray-900'}`}
                        >
                            Adult Singles
                        </label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            id="adult-doubles"
                            type="radio"
                            value="adult-doubles"
                            name="default-radio"
                            onChange={e => {
                                setCategory(e.target.value)
                                setCategoryError(false)
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                            htmlFor="adult-doubles"
                            className={`ml-2 text-sm font-medium  ${categoryError ? 'text-red-600' : 'text-gray-900'}`}
                        >
                            Adult Doubles
                        </label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            id="youth-singles"
                            type="radio"
                            value="youth-singles"
                            name="default-radio"
                            onChange={e => {
                                setCategory(e.target.value)
                                setCategoryError(false)
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                            htmlFor="youth-singles"
                            className={`ml-2 text-sm font-medium  ${categoryError ? 'text-red-600' : 'text-gray-900'}`}
                        >
                            Youth Singles
                        </label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            id="youth-doubles"
                            type="radio"
                            value="youth-doubles"
                            name="default-radio"
                            onChange={e => {
                                setCategory(e.target.value)
                                setCategoryError(false)
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                            htmlFor="youth-doubles"
                            className={`ml-2 text-sm font-medium  ${categoryError ? 'text-red-600' : 'text-gray-900'}`}
                        >
                            Youth Doubles
                        </label>
                    </div>
                    {categoryError && <span className="text-red-600 text-xs">Required</span>}
                </div>

                <div>
                    <label
                        htmlFor={"category"}
                        className="block text-sm font-medium text-gray-700 mb-3"
                    >
                        Team Info
                    </label>
                    <button
                        type="button"
                        onClick={() => setOpenAddPlayer(true)}
                        className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 w-auto`}
                    >
                        Add Player
                    </button>

                    <Table
                        columns={columns}
                        data={players}
                        loading={false}
                        disableFooter={true}
                    />
                </div>
            </form>

            <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    onClick={() => {
                        setRegisterThrough('OFFLINE')
                        formik.handleSubmit()
                    }}
                    className={`bg-[#10a37f] w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 mt-2 sm:ml-2 sm:w-auto ml-0`}
                >
                    Register Offline
                </button>
                <button
                    type="button"onClick={() => {
                        setRegisterThrough('PAYPAL')
                        formik.handleSubmit()
                    }}
                    className={`bg-[#10a37f] w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 mt-2 sm:w-auto`}
                >
                    Register With Paypal
                </button>
            </div>
        </section>
    );
};

export default Badminton;
