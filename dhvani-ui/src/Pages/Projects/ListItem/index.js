import moment from "moment";
import Img from "../../../assets/about_image_comp.jpg";
import ApiService from "../../../services/ApiService";
import Constants from "../../../utils/Constants"
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white overflow-hidden border border-gray-200 rounded-lg shadow">
            {project.backgroundImg && (
                <img
                    src={ApiService.getMedia(project.backgroundImg)}
                    alt="Card Image"
                    className="w-full object-cover object-center h-48 sm:h-64"
                />
            )}
            {!project.backgroundImg && (
                <img
                    src={Img}
                    alt="Card Image"
                    className="w-full object-cover object-center h-48 sm:h-64"
                />
            )}
            <div className="px-4 py-2 sm:p-4">
                <span>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
                        {" "}
                        {project.projectName}{" "}
                    </h5>
                </span>
                <p className="text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                </p>
                <p className="mb-3 font-normal text-gray-700 ">
                    Goal: ${project.fund} Raised: ${project.fundRaised}
                </p>
                <div className="pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Project Deadline:{" "}
                        {moment.utc(project?.endDate).format("DD-MMM-YYYY")}
                    </span>
                </div>

                <div className="flex justify-between">
                    {!project.completed && <button
                        onClick={() => navigate(`/donate?dt=3&df=${project._id}`)}
                        className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        Donate
                    </button>}
                    <span></span>

                    <button
                        onClick={() => navigate(`/view-project/${project._id}`)}
                        className={`ml-4 border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        Read more
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
