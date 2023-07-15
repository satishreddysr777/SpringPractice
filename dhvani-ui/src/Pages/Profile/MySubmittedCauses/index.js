import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler";
import CauseCard from "../../Causes/ListCard";

const MySubmittedCauses = () => {
    const dispatch = useDispatch();

    const [getMyCausesRes, setMyCausesRes] = useState({
        loading: false,
        error: false,
        message: null,
        data: null,
    });
    const [currentTabItems, setCurrTabItems] = useState([]);
    const [currentTab, setCurrTab] = useState(0);

    useEffect(() => {
        getMyCauses();
    }, []);

    const getMyCauses = async () => {
        try {
            setMyCausesRes({
                loading: true,
                error: false,
                message: null,
                data: null,
            });
            let res = await ApiService.getMyCauses();
            setMyCausesRes((prev) => ({
                ...prev,
                loading: false,
                data: res.data.causes,
            }));
            setCurrTabItems(res.data.causes.currentCauses);
        } catch (error) {
            console.log(error);
            let message = error?.response?.data?.message;
            dispatch(addError(message));
            setMyCausesRes((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const onClickTab = (tab) => {
        if (tab === 0) {
            setCurrTabItems(getMyCausesRes.data?.currentCauses);
            setCurrTab(0);
        }
        if (tab === 1) {
            setCurrTabItems(getMyCausesRes.data?.previousCauses);
            setCurrTab(1);
        }
    };

    return (
        <section className="p-5">
            <Loader open={getMyCausesRes.loading} />

            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:max-w-[100rem] lg:px-8">
                <span className="text-xs sm:hidden">
                    (Scroll right to find more tabs)
                </span>
                <div className="xl:w-full xl:mx-0 h-12 sm:block bg-white shadow rounded">
                    <div className="flex px-5 flex-nowrap overflow-x-scroll">
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
                                    Current Causes (
                                    {getMyCausesRes.data?.currentCauses.length}){" "}
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
                                    Previous Causes (
                                    {getMyCausesRes.data?.previousCauses.length}
                                    ){" "}
                                </span>
                            </div>
                            <div
                                className={`w-full h-1 bg-[#10a37f] rounded-t-md ${
                                    currentTab !== 1 && "hidden"
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
                        <CauseCard cause={cause} key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MySubmittedCauses;
