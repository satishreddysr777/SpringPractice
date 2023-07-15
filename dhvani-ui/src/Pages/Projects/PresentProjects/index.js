import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import { addError } from "../../../redux/pageErrorHandler";
import ApiService from "../../../services/ApiService";
import Img from "../../../assets/about_image_comp.jpg";
import ProjectCard from "../ListItem";
import moment from "moment";

const PresentProjects = () => {
    const dispatch = useDispatch();
    const [projectResults, setProjectsResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: [],
    });

    useEffect(() => {
        getPreviousProjects();
    }, []);

    const getPreviousProjects = async () => {
        try {
            setProjectsResults({
                loading: true,
                error: false,
                message: "",
                data: [],
            });
            let res = await ApiService.getPresentProjects();
            setProjectsResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data.projects,
            }));
        } catch (err) {
            const message = err.response.data.message;
            dispatch(addError(message));
            setProjectsResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    return (
        <section>
            <Loader open={projectResults.loading} />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Present Projects
                    </h1>
                </div>
            </header>

            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:max-w-[100rem] lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {projectResults.data.map((project, index) => (
                        <ProjectCard project={project} key={index} />
                        // <div
                        //     key={index}
                        //     className="bg-white overflow-hidden border border-gray-200 rounded-lg shadow"
                        // >

                        //     {project.backgroundImg && (
                        //         <img
                        //             src={project.backgroundImg}
                        //             alt="Card Image"
                        //             className="w-full object-cover object-center h-48 sm:h-64"
                        //         />
                        //     )}
                        //     {!project.backgroundImg && (
                        //         <img
                        //             src={Img}
                        //             alt="Card Image"
                        //             className="w-full object-cover object-center h-48 sm:h-64"
                        //         />
                        //     )}
                        //     <div className="px-4 py-2 sm:p-4">
                        //         <span>
                        //             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
                        //                 {" "}
                        //                 {project.projectName}{" "}
                        //             </h5>
                        //         </span>
                        //         <p className="text-gray-600 leading-relaxed mb-3 line-clamp-2">
                        //             {project.description}
                        //         </p>
                        //         <p className="mb-3 font-normal text-gray-700 ">
                        //             Goal: ${project.fund} Raised: $
                        //             {project.fundRaised}
                        //         </p>
                        //         <div className="pb-2">
                        //             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        //                 Project Deadline:{" "}
                        //                 {moment(project?.endDate).format(
                        //                     "DD-MMM-YYYY"
                        //                 )}
                        //             </span>
                        //         </div>

                        //         <div className="flex justify-between">
                        //         <button
                        //             className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                        //         >
                        //             Donate
                        //         </button>

                        //         <button
                        //             className={`ml-4 border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                        //         >
                        //             Read more
                        //             <svg
                        //                 aria-hidden="true"
                        //                 className="w-4 h-4 ml-2 -mr-1"
                        //                 fill="currentColor"
                        //                 viewBox="0 0 20 20"
                        //                 xmlns="http://www.w3.org/2000/svg"
                        //             >
                        //                 <path
                        //                     fillRule="evenodd"
                        //                     d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        //                     clipRule="evenodd"
                        //                 ></path>
                        //             </svg>
                        //         </button>
                        //         </div>
                        //     </div>
                        // </div>
                    ))}
                </div>

                {!projectResults.loading &&
                    projectResults.data.length === 0 && (
                        <div className="bg-white p-8 rounded-md shadow text-center">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                No projects found
                            </h3>
                        </div>
                    )}
                    
            </div>
        </section>
    );
};

export default PresentProjects;
