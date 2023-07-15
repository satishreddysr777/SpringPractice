import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { addError } from "../../../redux/pageErrorHandler";
import ApiService from "../../../services/ApiService";
import UploadModal from "./Upload";
import ProjectCard from "../ListItem";
import { useNavigate } from "react-router-dom";

const PreviousProjects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAdmin, isLoggedIn } = useSelector((state) => state.auth);
    const [projectResults, setProjectsResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: [],
    });
    const [openUploadModal, setOpenUploadModel] = useState(false);

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
            let res = await ApiService.getPreviousProjects();
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
            <UploadModal
                open={openUploadModal}
                setOpen={setOpenUploadModel}
                onUploadComplete={getPreviousProjects}
            />
            <Loader open={projectResults.loading} />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Previous Projects
                    </h1>

                    {isLoggedIn && isAdmin && (
                        <div className="flex items-center">
                            <div className="ml-3">
                                <button
                                    onClick={() => setOpenUploadModel(true)}
                                    className="inline w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-none"
                                >
                                    Upload Projects (Excel)
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:max-w-[100rem] lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {projectResults.data.map((project, index) => (
                        <ProjectCard key={index} project={project} />
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

export default PreviousProjects;
