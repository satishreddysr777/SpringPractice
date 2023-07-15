import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addError } from "../../../redux/pageErrorHandler";
import Img from "../../../assets/volunteer/group-hands.jpg";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import ApiService from "../../../services/ApiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextArea from "../../../components/Textarea";
import TextField from "../../../components/TextField";
import UpdateProject from "./UpdateProject";
import Constants from "../../../utils/Constants"

const ViewProject = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const { projectId } = useParams();

    const [project, setProject] = useState({
        loading: false,
        error: false,
        data: null,
        message: "",
    });
    const [percentage, setPercentage] = useState(0);
    const [percentText, setPercentText] = useState("0%");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [updateProject, setUpdateProject] = useState(false)

    useEffect(() => {
        getProject();
    }, []);

    useEffect(() => {
        if (project.data) {
            let goalAmount = project.data.fund ? project.data.fund : 0;
            let fundRaised = project.data.fundRaised
                ? project.data.fundRaised
                : 0;
            let percent = ((fundRaised / goalAmount) * 100).toFixed(2)
            setPercentText(percent + "%");
            setPercentage(percent);
        }
    }, [project.data]);

    const getProject = async () => {
        try {
            setProject({
                loading: true,
                error: false,
                message: "",
                data: null,
            });
            const res = await ApiService.getProjectById(projectId);
            setProject((prev) => ({
                ...prev,
                loading: false,
                data: res.data.project,
            }));
        } catch (error) {
            const message = error.response.data.message;
            dispatch(addError(message));
            setProject((prev) => ({
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
            name: "",
            email: "",
            phone: "",
            message: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Username is required"),
            email: Yup.string().required("Email is required"),
            phone: Yup.string().required("Phone is required"),
            message: Yup.string().required("Message is required"),
        }),
        onSubmit: (values) => {
            addContact(values);
        },
    });

    const addContact = async (values) => {
        try {
            setLoading(true);
            const { name, email, phone, message } = values;
            const body = {
                name: name,
                email: email,
                phone: phone,
                message: message,
            };

            await ApiService.addContact(body);
            setLoading(false);
            setSuccessMessage("Message sent");
            formik.resetForm();
        } catch (error) {
            let message = error.response.data.message;
            dispatch(addError(message));
            setLoading(false);
        }
    };

    return (
        <section>
            <Loader open={project.loading || loading} />

            <UpdateProject
                open={updateProject}
                setOpen={setUpdateProject}
                project={project.data}
                projectUpdateCallback={getProject}
            />

            {!project.loading && (
                <>
                    {!project.data?.backgroundImg && (
                        <div
                            className="py-20 justify-center bg-no-repeat bg-cover bg-center h-[28rem]"
                            style={{ backgroundImage: `url(${Img})` }}
                        >
                            <div className="container my-auto px-6 pt-10">
                                <h2 className="text-4xl font-bold mb-2 text-white">
                                    {project.data?.projectName}
                                </h2>
                            </div>
                        </div>
                    )}

                    {project.data?.backgroundImg && (
                        <div
                            className="py-20 justify-center bg-no-repeat bg-cover bg-center h-[28rem]"
                            style={{ backgroundImage: `url(${ApiService.getMedia(project.data?.backgroundImg?.filename)})` }}
                        >
                            <div className="container my-auto px-6 pt-10">
                                <h2 className="text-4xl font-bold mb-2 text-white">
                                    {project.data?.projectName}
                                </h2>
                            </div>
                        </div>
                    )}

                    {/* <div className="flex flex-col md:flex-row mt-[3rem]">
                        <div className=" w-full md:w-1/2 lg:w-1/2 p-4 text-center px-[8rem]">
                            <h2 className="text-lg font-bold mb-2">
                                Project Description
                            </h2>
                            <p className="text-gray-700">
                                {project.data?.description}
                            </p>
                        </div>
                        

                        <div className=" w-full md:w-1/2 lg:w-1/2 p-4">
                            <div className="w-full md:w-[70%]">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold">
                                        Goal Amount: $ {project.data?.fund}
                                    </h3>
                                    <h3 className="text-xl font-bold">
                                        Fund Raised: ${" "}
                                        {project.data?.fundRaised}
                                    </h3>
                                </div>

                                <div className="relative w-full h-4 bg-gray-300 rounded-sm overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 h-full bg-green-500 rounded-sm"
                                        style={{ width: percentage + "%" }}
                                    ></div>
                                    <div
                                        className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white font-bold"
                                        style={{ width: percentage + "%" }}
                                    >
                                        {percentText}
                                    </div>
                                </div>
                            </div>

                            {project.data?.completed && <p className="px-4 py-1 mt-3 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Status: Completed
                            </p>}

                            {!project.data?.completed && (
                                <Button
                                    bg="#10a37f"
                                    textColor="#fff"
                                    className="mt-4"
                                >
                                    Donate
                                </Button>
                            )}

                            {!project.data?.completed && (
                                <Button
                                    bg="#10a37f"
                                    textColor="#fff"
                                    className="mt-4 ml-2"
                                    onClick={() => setUpdateProject(true)}
                                >
                                    Edit project
                                </Button>
                            )}
                        </div>
                    </div> */}

                    <div className="container sm:mx-auto px-[1rem] mt-10">
                <div className="lg:flex">
                    <div className="w-full">
                        <div className="text-2xl uppercase text-center">
                            Project Description
                        </div>
                        <div className="mt-3">
                            {project.data?.description}
                        </div>
                    </div>
                    <div className="w-full mt-10 lg:pl-10 lg:mt-0">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold">
                                        Goal Amount: $ {project.data?.fund}
                                    </h3>
                                    <h3 className="text-xl font-bold">
                                        Fund Raised: ${" "}
                                        {project.data?.fundRaised}
                                    </h3>
                                </div>

                                <div className="relative w-full h-4 bg-gray-300 rounded-sm overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 h-full bg-green-500 rounded-sm"
                                        style={{ width: percentage + "%" }}
                                    ></div>
                                    <div
                                        className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white font-bold"
                                        style={{ width: percentage + "%" }}
                                    >
                                        {percentText}
                                    </div>
                                </div>

                                {project.data?.completed && <p className="px-4 py-1 mt-3 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Status: Completed
                            </p>}

                            {!project.data?.completed && (
                                <Button
                                    onClick={() => window.location.href = `/donate?dt=${3}&df=${project.data?._id}`}
                                    bg="#10a37f"
                                    textColor="#fff"
                                    className="mt-4"
                                >
                                    Donate
                                </Button>
                            )}

                            {!project.data?.completed && auth.isLoggedIn && auth.isAdmin && (
                                <Button
                                    bg="#10a37f"
                                    textColor="#fff"
                                    className="mt-4 ml-2"
                                    onClick={() => setUpdateProject(true)}
                                >
                                    Edit project
                                </Button>
                            )}
                    </div>
                </div>
            </div>

                    {/* <div className="flex flex-col justify-center items-center my-20">
                        <h3 className="text-2xl">About</h3>
                        <h1 className="text-4xl mb-4">THE CAUSE</h1>
                        <p className="text-lg max-w-[1200px] text-center">
                            {project.data?.aboutTheCause}
                        </p>
                    </div> */}

                    <div className="container sm:mx-auto px-[1rem] mt-10">
                        <div className="lg:flex-col">
                            <h3 className="text-2xl text-center">About</h3>
                            <h1 className="text-4xl mb-4 text-center">THE CAUSE</h1>
                            <div className="w-full mt-5 lg:mt-0">{project.data?.aboutTheCause}</div>
                        </div>
                    </div>

                    <div className="container sm:mx-auto px-[1rem] mt-10">
                        <div className="lg:flex-col">
                            <h3 className="text-2xl text-center">PLAN OF</h3>
                            <h1 className="text-4xl mb-4 text-center">ACTION</h1>
                            <div className="w-full mt-5 lg:mt-0">{project.data?.whatWeDo}</div>
                        </div>
                    </div>

                    {/* ============================================= */}

                    <section>
                        <div className="mx-auto grid max-w-screen-xl grid-cols-1">
                            <div className="py-12 md:py-24">
                                <div className="mx-auto bg-white lg:rounded-lg shadow border max-w-xl p-12">
                                    <div className="text-center">
                                        <h3 className="text-2xl">CONTACT US</h3>
                                        <h1 className="text-4xl mb-4">Drop Us A Line</h1>
                                    </div>
                                    <form>
                                        <div className="mb-6">
                                            <TextField
                                                label="Name"
                                                name="name"
                                                type="text"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                error={formik.errors.name}
                                                touched={formik.touched.name}
                                                onBlur={formik.handleBlur}
                                                required
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <TextField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                error={formik.errors.email}
                                                touched={formik.touched.email}
                                                onBlur={formik.handleBlur}
                                                required
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <TextField
                                                label="Phone"
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
                                        <div className="mb-6">
                                            <TextArea
                                                label="Your message"
                                                name="message"
                                                type="text"
                                                value={formik.values.message}
                                                onChange={formik.handleChange}
                                                error={formik.errors.message}
                                                touched={formik.touched.message}
                                                onBlur={formik.handleBlur}
                                                required
                                            />
                                        </div>

                                        {successMessage != "" &&
                                            successMessage != undefined && (
                                                <div
                                                    className="bg-green-100 rounded-md mb-4 py-2 px-4 text-base text-green-700"
                                                    role="alert"
                                                >
                                                    <span className="text-green-500 cursor-pointer">
                                                        {successMessage}
                                                    </span>
                                                </div>
                                            )}

                                        <div>
                                            <Button
                                                onClick={() =>
                                                    formik.handleSubmit()
                                                }
                                                bg="#10a37f"
                                                textColor="#fff"
                                                className="mt-1"
                                            >
                                                GET IN TOUCH
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="container sm:mx-auto px-[1rem] mt-10">
                        <div className="lg:flex-col">
                            <div className="font-bold">
                                Thank you to all our donors, we have met our fundraising goal.
                            </div>
                            <div className="font-light">
                                On behalf of Dhvani, we want to thank you for helping us make a positive difference. Your support encourages our continued commitment to reaching our goal.
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center items-center mt-[5rem]">
                        <div className="w-full lg:w-1/3 px-[50px] py-[140px] flex flex-col justify-center items-center bg-[#5ab9a5] text-white">
                            <div className="text-sm">MAKE A</div>
                            <div className="text-lg mb-6">DONATION</div>
                            <p className="text-center mb-6">
                                When you donate, you’re giving children renewed
                                strength to fight poverty and can change lives.
                                Your donation is tax deductible and we send you
                                a tax receipt.
                            </p>

                            <button
                                type="button"
                                className={`bg-[#EF884C] hover:opacity-80 text-[#fff] border-none rounded-2xl box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                            >
                                DONATE NOW
                            </button>
                        </div>
                        <div className="w-full lg:w-1/3 px-[50px] py-[140px] flex flex-col justify-center items-center bg-[#000] text-white">
                            <div className="text-sm">BECOME A</div>
                            <div className="text-lg mb-6">MEMBER</div>
                            <p className="text-center mb-6">
                                There is nothing more fulfilling than realizing
                                how much of a sustainable impact you as a member
                                can make. Just a few dollars & hours of help can
                                turn into a lifetime of opportunity!
                            </p>
                            <button
                                type="button"
                                className={`bg-[#EFC94C] hover:opacity-80 text-[#fff] border-none rounded-2xl box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                            >
                                JOIN US
                            </button>
                        </div>
                        <div className="w-full lg:w-1/3 px-[50px] py-[140px] flex flex-col justify-center items-center bg-[#d55e48] text-white">
                            <div className="text-sm">SPREAD THE</div>
                            <div className="text-lg mb-6">WORD</div>
                            <p className="text-center mb-6">
                                We’d appreciate your help spreading the word
                                about events at Dhvani Foundation and create an
                                impact by creating a conversation around all the
                                causes and campaigns we support.
                            </p>

                            <button
                                type="button"
                                className={`bg-[#EF884C] hover:opacity-80 text-[#fff] border-none rounded-2xl box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                            >
                                DONATE NOW
                            </button>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default ViewProject;
