import Table from "../../../components/Table/Table";
import moment from "moment";
import { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler"
import { toast } from 'react-toastify';

const DeleteProject = () => {

    const dispatch = useDispatch();

    const columns = [
        {
            name: "Project",
            selector: "project",
            cell: (row) => <span>{row.projectName}</span>,
        },
        {
            name: "Start Date",
            selector: "projectStartDate",
            cell: (row) => (
                <span>
                    <strong>
                        {moment.utc(row.startDate).format("DD-MMM-YYYY")}
                    </strong>
                </span>
            ),
        },
        {
            name: "End Date",
            selector: "projectEndDate",
            cell: (row) => (
                <span>
                    <strong>{moment.utc(row.endDate).format("DD-MMM-YYYY")}</strong>
                </span>
            ),
        },
        {
            name: "Status",
            selector: "status",
            cell: (row) => <span className={`${row.isActive ? 'bg-green-200' : 'bg-red-200'} px-2 py-1 rounded-xl ${row.isActive ? 'text-green-800' : 'text-red-800'}`}>{row.isActive ? "Active" : "In-active"}</span>,
        },
        {
            name: "Actions",
            selector: "action",
            cell: (row) => (
                <div className="flex items-center space-x-2">
                    <button
                        title="Delete project"
                        className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                        onClick={() => onDelete(row.projectId)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const [projectsResults, setProjectsResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: [],
    });
    const [projectDeleteResults, setProjectDeleteResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: [],
    });

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        try {
            setProjectsResults({
                loading: true,
                error: false,
                message: "",
                data: [],
            });
            let res = await ApiService.getProjects();
            setProjectsResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data.projects,
            }));
        } catch (err) {
            const message = err.response.data.message;
            setProjectsResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const onDelete = async (projectId) => {
        try {
            setProjectDeleteResults({
                loading: true,
                error: false,
                message: "",
                data: [],
            });
            await ApiService.deleteProject(projectId);
            setProjectDeleteResults((prev) => ({
                ...prev,
                loading: false,
            }));
            getProjects();
            toast.success("Project deleted!", {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            const message = error.response.data.message;
            dispatch(addError(message))
            setProjectDeleteResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    return (
        <section>
            <Loader open={projectDeleteResults.loading} />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Delete Project
                    </h1>
                </div>
            </header>

            <div className="lg:mx-[10rem] px-5">
                <Table
                    columns={columns}
                    data={projectsResults?.data}
                    loading={projectsResults.loading}
                    error={projectsResults.error}
                    errorMessage={projectsResults.message}
                />
            </div>
        </section>
    );
};

export default DeleteProject;
