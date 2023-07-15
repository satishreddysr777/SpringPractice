import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler";
import CauseCard from "../../Causes/ListCard";
import Tabs from "../../../components/Tabs";

const Causes = () => {
    const dispatch = useDispatch();

    const tabHeaders = [
        {
            'title': 'Approved for voting',
        },
        {
            'title': 'Funding',
        },
        {
            'title': 'Completed',
        },
    ]

    const [currentTabItems, setCurrTabItems] = useState([]);
    const [currentTab, setCurrTab] = useState(0);

    const [getCausesRes, setCausesRes] = useState({
        loading: false,
        error: false,
        message: null,
        data: null,
    });

    useEffect(() => {
        getCauses();
    }, []);

    const getCauses = async () => {
        try {
            setCausesRes({
                loading: true,
                error: false,
                message: null,
                data: null,
            });
            let res = await ApiService.getCauses();
            setCausesRes((prev) => ({
                ...prev,
                loading: false,
                data: res.data,
            }));
            setCurrTabItems(res.data.approved_for_voting);
        } catch (error) {
            console.log(error);
            let message = error?.response?.data?.message;
            dispatch(addError(message));
            setCausesRes((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };


    const onClickTab = (tabIndex) => {
        setCurrTab(tabIndex)
        if (tabIndex === 0) setCurrTabItems(getCausesRes.data.approved_for_voting)
        if (tabIndex === 2) setCurrTabItems(getCausesRes.data.funding)
        if (tabIndex === 3) setCurrTabItems(getCausesRes.data.completed)
    }

    return (
        <section className="p-5">
            <Loader open={getCausesRes.loading} />

            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:max-w-[100rem] lg:px-8">

            <span className="text-xs sm:hidden">
                (Scroll right to find more tabs)
            </span>
            <div className="xl:w-full xl:mx-0 h-12  sm:block bg-white shadow rounded">
                        <div className="flex border-b px-5 flex-nowrap overflow-x-auto">
                            <button
                                onClick={() => onClickTab(0)}
                                className={`focus:outline-none focus:text-[#10a37f] text-sm flex-nowrap border-[#10a37f] pt-3 rounded-t mr-12 cursor-pointer hover:text-[#10a37f] ${
                                    currentTab === 0
                                        ? `text-[#10a37f]`
                                        : `text-gray-600`
                                }`}
                            >
                                <div className="flex items-center mb-3">
                                    <span className="ml-1 font-normal whitespace-nowrap">
                                        Vote for a cause (
                                        {getCausesRes.data?.approved_for_voting.length}){" "}
                                    </span>
                                </div>
                                <div
                                    className={`w-full h-1 bg-[#10a37f] rounded-t-md ${
                                        currentTab !== 0 && "hidden"
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
                                        Donate (
                                        {getCausesRes.data?.funding.length}){" "}
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
                                        Completed (
                                        {getCausesRes.data?.completed.length}){" "}
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

                {currentTabItems.length === 0 && (
                    <div className="p-4 my-4 text-sm text-yellow-800 rounded-lg shadow-md bg-yellow-50 w-full" role="alert">
                        <span className="font-medium">No causes were found.</span>
                    </div>
                )}

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {currentTabItems.map((cause, index) => (
                        <CauseCard cause={cause} key={index} getCauses={getCauses} />
                    ))}
                </div>
                

            </div>
        </section>
    );
};

export default Causes;
