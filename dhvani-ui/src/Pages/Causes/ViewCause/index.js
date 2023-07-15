import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import Table from "../../../components/Table/Table";
import UpdateCause from "./UpdateCause";
import Constants from "../../../utils/Constants";

const ViewCause = () => {
    const dispatch = useDispatch();
    const { causeId } = useParams();

    const columns = [
        {
            name: "Name",
            selector: "name",
            cell: (row) => <span>{row.name}</span>,
        },
        {
            name: "Amount",
            selector: "amount",
        },
    ];

    const [causeRes, setCauseRes] = useState({
        loading: false,
        error: false,
        data: null,
        message: "",
    });
    const [percentage, setPercentage] = useState(0);
    const [percentText, setPercentText] = useState("0%");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [openUpdateCause, setOpenUpdateCause] = useState(false);
    const [documents, setDocuments] = useState([]);

    const [currentTab, setCurrTab] = useState(0);

    useEffect(() => {
        getCause();
    }, []);

    useEffect(() => {
        if (causeRes.data) {
            let goalAmount = causeRes.data.fund ? causeRes.data.fund : 0;
            let fundRaised = causeRes.data.fundRaised
                ? causeRes.data.fundRaised
                : 0;
            let percent = ((fundRaised / goalAmount) * 100).toFixed(2);
            setPercentText(percent + "%");
            setPercentage(percent);
        }
    }, [causeRes.data]);

    const getCause = async () => {
        try {
            setCauseRes({
                loading: true,
                error: false,
                message: "",
                data: null,
            });
            const res = await ApiService.getCauseById(causeId);
            setCauseRes((prev) => ({
                ...prev,
                loading: false,
                data: res.data.cause,
            }));
        } catch (error) {
            const message = error.response.data.message;
            dispatch(addError(message));
            setCauseRes((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const onClickTab = (tab) => {
        setCurrTab(tab);
    };

    const onSelectDocuments = (e) => {
        setDocuments([...e.target.files]);
    };

    const uploadDocuments = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("causeId", causeRes.data?._id);

            for (let i = 0; i < documents.length; i++) {
                formData.append("files", documents[i]);
            }

            let res = await ApiService.addCauseDocuments(formData);
            setLoading(false)
            setDocuments([])
            getCause()
        } catch (error) {
            const message = error.response.data.message;
            dispatch(addError(message));
            setLoading(false)
        }
    }

    const downloadMedia = async (filename) => {
        window.open(ApiService.downloadMedia(filename))
    }

    return (
        <section>
            <Loader open={causeRes.loading || loading} />

            <UpdateCause
                open={openUpdateCause}
                setOpen={setOpenUpdateCause}
                cause={causeRes.data}
                causeUpdateCallback={getCause}
            />

            {!causeRes.loading && (
                <>
                    {!causeRes.data?.backgroundImg && (
                        <div
                            className="py-20 justify-center bg-no-repeat bg-cover bg-center h-[28rem]"
                            style={{ backgroundImage: `url(${Img})` }}
                        >
                            <div className="container my-auto px-6 pt-10">
                                <h2 className="text-4xl font-bold mb-2 text-white">
                                    {causeRes.data?.causeName}
                                </h2>
                            </div>
                        </div>
                    )}

                    {causeRes.data?.backgroundImg && (
                        <div
                            className="py-20 justify-center bg-no-repeat bg-cover bg-center h-[28rem]"
                            style={{
                                backgroundImage: `url(${
                                    Constants.HOST_API +
                                    "media/getImage/" +
                                    causeRes.data?.backgroundImg
                                })`,
                            }}
                        >
                            <div className="container my-auto px-6 pt-10">
                                <h2 className="text-4xl font-bold mb-2 text-white">
                                    {causeRes.data?.causeName}
                                </h2>
                            </div>
                        </div>
                    )}

                    <div className="bg-gray-700 box-border w-full">
                        <div className="max-w-7xl mx-auto md:flex items-center">
                            <div className="p-4 md:w-1/2 md:inline-block">
                                <div className="md:py-4 md:w-1/2 md:inline-block">
                                    <span className="block text-center bg-red-600 text-white py-3 px-4 no-underline">
                                        GOAL CAUSE{" "}
                                        <strong className="border-b-2 font-bold text-center text-white">
                                            ${causeRes.data?.causeFund}
                                        </strong>
                                    </span>
                                </div>
                                <div className="md:py-4 md:w-1/2 md:inline-block">
                                    <span className="block text-center bg-gray-500 text-white py-3 px-4 no-underline">
                                        ACHIEVED{" "}
                                        <strong className="border-b-2 font-bold text-center text-white">
                                            ${causeRes.data?.fundRaised}
                                        </strong>
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/2 md:flex items-center">
                                <div className="text-center w-1/2 md:w-1/3 inline-block">
                                    <h1 className="text-white font-semibold text-3xl leading-tight mb-0">
                                        <strong>0.00% </strong>
                                    </h1>
                                    <h5 className="text-gray-400 tracking-widest text-sm leading-tight uppercase mb-0">
                                        OF OUR GOAL
                                    </h5>
                                </div>
                                <div className="text-center w-1/3 inline-block">
                                    <h1 className="text-white font-semibold text-3xl leading-tight mb-0">
                                        <strong>0</strong>
                                    </h1>
                                    <h5 className="text-gray-400 tracking-widest text-sm leading-tight uppercase mb-0">
                                        DONATIONS
                                    </h5>
                                </div>
                                <div className="text-center md:w-1/3 md:inline-block mt-5 md:mt-0">
                                    <button className="bg-teal-500 box-border inline-block rounded-full px-6 py-2 no-underline text-white font-semibold cursor-pointer">
                                        DONATE NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center w-full inline-block my-5">
                        <button onClick={() => setOpenUpdateCause(true)} className="bg-teal-500 box-border inline-block rounded-full px-6 py-2 no-underline text-white font-semibold cursor-pointer">
                            EDIT DETAILS
                        </button>
                    </div>

                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:max-w-[100rem] lg:px-8">
                        <span className="text-xs sm:hidden">
                            (Scroll right to find more tabs)
                        </span>
                        <div className="xl:w-full xl:mx-0 h-12 sm:block bg-white shadow rounded">
                            <div className="flex border-b px-5 flex-nowrap overflow-x-auto">
                                <button
                                    onClick={() => onClickTab(0)}
                                    className={`focus:outline-none focus:text-[#10a37f] text-sm border-[#10a37f] pt-3 rounded-t mr-12 cursor-pointer hover:text-[#10a37f] ${
                                        currentTab === 0
                                            ? `text-[#10a37f]`
                                            : `text-gray-600`
                                    }`}
                                >
                                    <div className="flex items-center mb-3">
                                        <span className="ml-1 font-normal whitespace-nowrap">
                                            About The Cause
                                        </span>
                                    </div>
                                    <div
                                        className={`w-full h-1 bg-[#10a37f] rounded-t-md ${
                                            currentTab !== 0 && "hidden"
                                        }`}
                                    ></div>
                                </button>
                                <button
                                    onClick={() => onClickTab(1)}
                                    className={`focus:outline-none focus:text-[#10a37f] text-sm border-[#10a37f] pt-3 rounded-t mr-12 cursor-pointer hover:text-[#10a37f] ${
                                        currentTab === 1
                                            ? `text-[#10a37f]`
                                            : `text-gray-600`
                                    }`}
                                >
                                    <div className="flex items-center mb-3">
                                        <span className="ml-1 font-normal whitespace-nowrap">
                                            Description
                                        </span>
                                    </div>
                                    <div
                                        className={`w-full h-1 bg-[#10a37f] rounded-t-md ${
                                            currentTab !== 1 && "hidden"
                                        }`}
                                    ></div>
                                </button>

                                <button
                                    onClick={() => onClickTab(2)}
                                    className={`focus:outline-none focus:text-[#10a37f] text-sm border-[#10a37f] pt-3 rounded-t mr-12 cursor-pointer hover:text-[#10a37f] ${
                                        currentTab === 2
                                            ? `text-[#10a37f]`
                                            : `text-gray-600`
                                    }`}
                                >
                                    <div className="flex items-center mb-3">
                                        <span className="ml-1 font-normal whitespace-nowrap">
                                            Documents
                                        </span>
                                    </div>
                                    <div
                                        className={`w-full h-1 bg-[#10a37f] rounded-t-md ${
                                            currentTab !== 2 && "hidden"
                                        }`}
                                    ></div>
                                </button>

                                <button
                                    onClick={() => onClickTab(3)}
                                    className={`focus:outline-none focus:text-[#10a37f] text-sm border-[#10a37f] pt-3 rounded-t mr-12 cursor-pointer hover:text-[#10a37f] ${
                                        currentTab === 3
                                            ? `text-[#10a37f]`
                                            : `text-gray-600`
                                    }`}
                                >
                                    <div className="flex items-center mb-3">
                                        <span className="ml-1 font-normal whitespace-nowrap">
                                            Donations
                                        </span>
                                    </div>
                                    <div
                                        className={`w-full h-1 bg-[#10a37f] rounded-t-md ${
                                            currentTab !== 3 && "hidden"
                                        }`}
                                    ></div>
                                </button>
                            </div>
                        </div>

                        {currentTab === 0 && (
                            <div className="my-5 ml-2">
                                {causeRes.data?.aboutTheCause}
                            </div>
                        )}

                        {currentTab === 1 && (
                            <div className="my-5 ml-2">
                                {causeRes.data?.causeDescription}
                            </div>
                        )}

                        {currentTab === 2 && (
                            <div className="my-5 ml-2">
                                <label className="block text-sm font-medium text-gray-700 !mb-1">
                                    Documents{" "}
                                    <span className="text-xs">
                                        (You can upload multiple)
                                    </span>
                                </label>
                                <div className="relative border-2 border-dashed border-gray-400 rounded-md p-6 !mt-0 flex flex-col justify-center items-center">
                                    <div className="text-gray-600">
                                        <div className="mt-1 text-sm leading-normal">
                                            {documents.length === 0 && (
                                                <>
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="text-blue-500 cursor-pointer hover:underline"
                                                    >
                                                        Choose files
                                                    </label>{" "}
                                                    to upload
                                                </>
                                            )}

                                            {documents.length > 0 && (
                                                <>
                                                    Selected Files: <br />
                                                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                                        {documents.map((doc, docindex) => (
                                                            <li key={docindex} >
                                                                {doc.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="text-blue-500 cursor-pointer hover:underline mt-5"
                                                    >
                                                        change
                                                    </label>
                                                    <label
                                                        onClick={() =>
                                                            setDocuments([])
                                                        }
                                                        className="text-red-500 cursor-pointer hover:underline ml-5"
                                                    >
                                                        Clear
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <input
                                        multiple
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={onSelectDocuments}
                                    />
                                </div>
                                <div className="text-end mt-2">
                                    <button
                                        type="button"
                                        onClick={uploadDocuments}
                                        disabled={documents.length === 0}
                                        className={`bg-[#10a37f] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                                    >
                                        Upload documents
                                    </button>
                                </div>

                                <div className="mt-5">
                                    List of documents

                                    {causeRes.data?.documents.length >  0 && (
                                        <ul className="md:w-[50%] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg mt-2">
                                            {causeRes.data?.documents.map((item, index) => (
                                                <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg flex justify-between" key={index}>
                                                    <div>
                                                        <span>{item.originalname}</span>
                                                    </div>
                                                    <div className="cursor-pointer text-blue-500" onClick={() => downloadMedia(item.filename)}>Download</div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    
                                    {causeRes.data?.documents.length === 0 && (
                                        <ul className="md:w-[50%] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg mt-2">
                                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg flex justify-between">
                                                <div>No Documents</div>
                                            </li>
                                        </ul>
                                    )}

                                </div>
                            </div>
                        )}

                        {currentTab === 3 && (
                            <div>
                                <div className="my-5 ml-2">Donations</div>
                                <div class="overflow-x-auto w-[50%]">
  <table class="min-w-full divide-y-2 divide-gray-200 bg-white rounded-md text-sm">
    <thead class="text-left">
      <tr>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Name
        </th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Amount
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200">
      <tr>
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          John Doe
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
      </tr>

      <tr>
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Jane Doe
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
      </tr>

      <tr>
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Gary Barlow
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
      </tr>
    </tbody>
  </table>
</div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </section>
    );
};

export default ViewCause;
