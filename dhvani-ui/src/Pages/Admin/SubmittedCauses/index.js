import { useEffect, useState } from "react"
import Tabs from "../../../components/Tabs"
import CauseCard from "../../Causes/ListCard"
import Loader from "../../../components/Loader"
import ApiService from "../../../services/ApiService"
import { useDispatch } from "react-redux"
import { addError } from "../../../redux/pageErrorHandler"
import moment from "moment"


const SubmittedCauses = () => {

    const dispatch = useDispatch()

    const tabHeaders = [
        {
            'title': 'Submitted',
        },
        {
            'title': 'Approved for voting',
        },
        {
            'title': 'Declined for voting',
        },
        {
            'title': 'Funding',
        },
        {
            'title': 'Lost',
        },
        {
            'title': 'Completed',
        },
    ]

    const [getCausesRes, setGetCausesRes] = useState({ "loading": false, "error": false, "message": "", "data": null })

    const [currentTabItems, setCurrTabItems] = useState([]);
    const [currentTab, setCurrTab] = useState(0);

    useEffect(() => {
        getAdminCauses()
    }, [])

    const getAdminCauses = async () => {
        try {
            setGetCausesRes({ "loading": true, "error": false, "message": "", "data": null })
            let res = await ApiService.getAdminCauses()
            // console.log(res)
            setGetCausesRes(prev => ({
                ...prev,
                "loading": false,
                "data": res.data
            }))
            // setCurrTabItems(res.data.submitted);
            // onClickTab(currentTab)
        } catch (error) {
            console.log(error)
            let message = error.response.data.message
            dispatch(addError(message))
            setGetCausesRes(prev => ({
                ...prev,
                "loading": false,
                "error": true,
                "message": message
            }))
        }
    }

    useEffect(() => {
        if (currentTab >= 0 && getAdminCauses.data !== null) {
            onClickTab(currentTab)
        }
    }, [getCausesRes.data])

    const onClickTab = (tabIndex) => {
        setCurrTab(tabIndex)
        if (getCausesRes.data) {
            if (tabIndex === 0) setCurrTabItems(getCausesRes.data.submitted)
            if (tabIndex === 1) setCurrTabItems(getCausesRes.data.approved_for_voting)
            if (tabIndex === 2) setCurrTabItems(getCausesRes.data.declined_for_voting)
            if (tabIndex === 3) setCurrTabItems(getCausesRes.data.funding)
            if (tabIndex === 4) setCurrTabItems(getCausesRes.data.lost)
            if (tabIndex === 5) setCurrTabItems(getCausesRes.data.completed)
        }
        
    }

    return (
        <section className="p-5">
            <Loader open={getCausesRes.loading} />
            
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
                                        Submitted (
                                        {getCausesRes.data?.submitted.length}){" "}
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
                                        Approved for voting (
                                        {getCausesRes.data?.approved_for_voting.length}){" "}
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
                                        Declined for voting (
                                        {getCausesRes.data?.declined_for_voting.length}){" "}
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
                                        Funding (
                                        {getCausesRes.data?.funding.length}){" "}
                                    </span>
                                </div>
                                <div
                                    className={`w-full h-1 bg-[#10a37f] rounded-t-md ${
                                        currentTab !== 3 && "hidden"
                                    }`}
                                ></div>
                            </button>
                            <button
                                onClick={() => onClickTab(4)}
                                className={`focus:outline-none focus:text-[#10a37f] text-sm border-[#10a37f] pt-3 rounded-t mr-12 cursor-pointer hover:text-[#10a37f] ${
                                    currentTab === 4
                                        ? `text-[#10a37f]`
                                        : `text-gray-600`
                                }`}
                            >
                                <div className="flex items-center mb-3">
                                    <span className="ml-1 font-normal whitespace-nowrap">
                                        Lost (
                                        {getCausesRes.data?.lost.length}){" "}
                                    </span>
                                </div>
                                <div
                                    className={`w-full h-1 bg-[#10a37f] rounded-t-md ${
                                        currentTab !== 4 && "hidden"
                                    }`}
                                ></div>
                            </button>
                            <button
                                onClick={() => onClickTab(5)}
                                className={`focus:outline-none focus:text-[#10a37f] text-sm border-[#10a37f] pt-3 rounded-t mr-12 cursor-pointer hover:text-[#10a37f] ${
                                    currentTab === 5
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
                                        currentTab !== 5 && "hidden"
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
                        <CauseCard cause={cause} key={index} admin={true} getCauses={getAdminCauses} />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default SubmittedCauses
