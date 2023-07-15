import moment from "moment";
import Img from "../../../assets/about_image_comp.jpg";
import Constants from "../../../utils/Constants"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import ApiService from "../../../services/ApiService"
import { useDispatch } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler"
import Loader from "../../../components/Loader"
import { toast } from 'react-toastify';

const CauseCard = ({ cause, getCauses, admin }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [statusChangeRes, setStatusChangeRes] = useState({ 'loading': false, "error": false, 'message': '', data: null })
    const [voteRes, setVoteRes] = useState({ 'loading': false, "error": false, 'message': '', data: null })

    const changeStatus = async (status) => {
        try {
            setStatusChangeRes({ 'loading': true, "error": false, 'message': '', data: null })
            let res = await ApiService.changeCauseStatus({
                'causeId': cause._id,
                'status': status
            })
            setStatusChangeRes(prev => ({
                ...prev,
                "loading": false,
                "message": res.data.message
            }))
            getCauses()
        } catch (error) {
            let message = error.response.data.message
            dispatch(addError(message))
            setStatusChangeRes(prev => ({
                ...prev,
                "loading": false,
                "message": message,
                "error": true
            }))
        }
    }

    const handleVote = async () => {
        try {
            setVoteRes({ 'loading': true, "error": false, 'message': '', data: null })
            let res = await ApiService.voteForCause({
                'causeId': cause._id,
            })
            setVoteRes(prev => ({
                ...prev,
                "loading": false,
                "message": res.data.message
            }))
            getCauses()
            toast.success("Voted successfully", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            let message = error.response.data.message
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            })
            // dispatch(addError(message))
            setStatusChangeRes(prev => ({
                ...prev,
                "loading": false,
                "message": message,
                "error": true
            }))
        }
    }

    return (
        <div className="bg-white overflow-hidden border border-gray-200 rounded-lg shadow">
            <Loader open={statusChangeRes.loading} />
            
            <img
                    src={Img}
                    alt="Card Image"
                    className="w-full object-cover object-center h-48 sm:h-64"
                />
            <div className="px-4 py-2 sm:p-4">
                <span>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
                        {cause.causeName}
                    </h5>
                </span>
                <p className="mb-3 font-normal text-gray-700 ">
                    Goal: ${cause.causeFund} Raised: ${cause.fundRaised}
                </p>
                <p className="text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {cause.aboutTheCause}
                </p>

                <div className="flex">
                    <button
                        onClick={() => navigate(`/view-cause/${cause._id}`)}
                        className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        Read more
                    </button>
                </div>

                {cause.causeLevel === 'FUNDING' && (
                    <div className="flex mt-2">
                        <button
                            onClick={() => navigate(`/donate?dt=1&df=${cause._id}`)}
                            className={`bg-[#F7BE38] hover:opacity-80 text-[#000] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                        >
                            Donate
                        </button>
                        {admin && (
                            <button
                                onClick={() => changeStatus('COMPLETED')}
                                className={`bg-[#40bb40] ml-2 hover:opacity-80 text-[#FFF] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                            >
                                Set Completed
                            </button>
                        )}
                    </div>
                )}

                {cause.causeLevel === 'APPROVED_FOR_VOTING' && (
                    <>
                        <div className="mt-3">Voting start date: {moment.utc(cause.voteStartDate).format('DD-MMM-YYYY')} </div>
                        <div>Voting end date: {moment.utc(cause.voteEndDate).format('DD-MMM-YYYY')} </div>
                        {admin && (
                            <>
                                {/* {moment() > moment(cause.voteEndDate) && ( */}
                                {cause.isVotingCompleted && (
                                    <>
                                        <div className="flex mt-2">
                                            <button
                                                onClick={() => changeStatus('LOST')}
                                                className={`bg-red-500 w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                                            >
                                                REJECT
                                            </button>
                                            <button
                                                onClick={() => changeStatus('FUNDING')}
                                                className={`bg-green-500 w-full ml-2 hover:opacity-80 text-[#FFF] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                                            >
                                                APPROVE
                                            </button>
                                        </div>
                                        <div style={{ marginTop: "1rem" }}><b> Votes: {cause.voteCount != null ?  cause.voteCount : 0} </b></div>
                                    </>
                                )}
                            </>
                        )}

                        {!admin && (
                            <>
                                {/* {moment() > moment(cause.voteEndDate) && ( */}
                                {cause.isVotingCompleted && (
                                    <div className="mt-3">
                                        <div style={{ fontSize: "12px", color: "blue" }}>Voting is completed. Admin is reviewing the cause.</div>
                                        <div className="mt-2"><b> Votes: {cause.voteCount != null ?  cause.voteCount : 0} </b></div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* {moment() >= moment(cause.voteStartDate) && moment() <= moment(cause.voteEndDate) && ( */}
                        {cause.isVotingStarted && (
                            <div className="mt-3">
                                <button
                                    onClick={handleVote}
                                    className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                                >
                                    Vote
                                </button>
                                <div className="mt-2"><b> Votes: {cause.voteCount != null ?  cause.voteCount : 0} </b></div>
                            </div>
                        )}
                        
                    </>
                )}

                {admin && cause.causeLevel === 'SUBMITTED' && (
                    <div className="flex mt-2">
                        <button
                            onClick={() => changeStatus('DECLINED_FOR_VOTING')}
                            className={`bg-red-500 w-full hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                        >
                            REJECT
                        </button>
                        <button
                            onClick={() => changeStatus('APPROVED_FOR_VOTING')}
                            className={`bg-green-500 w-full ml-2 hover:opacity-80 text-[#FFF] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                        >
                            APPROVE
                        </button>
                    </div>
                )}

                
            </div>
        </div>
    );
};

export default CauseCard;
