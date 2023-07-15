import { useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import ApiService from "../../../services/ApiService";
import { useDispatch } from "react-redux";
import { addError } from "../../../redux/pageErrorHandler";
import moment from "moment";

const Members = () => {
    const dispatch = useDispatch();

    const columns = [
        {
            name: "Name",
            selector: "name",
            cell: (row) => <span>{row.name}</span>,
        },
        {
            name: "Username",
            selector: "userName",
        },
        {
            name: "Email",
            selector: "email",
        },
        {
            name: "Phone",
            selector: "phone",
        },
        {
            name: "Membership Expire Date",
            selector: "memberShipExpireDate",
            cell: (row) => (
                <span>
                    <strong>
                        {moment(row.memberShipExpireDate).format("DD-MMM-YYYY")}
                    </strong>{" "}
                    <br />
                    {row.daysToExpireMembership > 0 && (
                        <span className={"text-green-600"}>
                            Expires in {row.daysToExpireMembership} days
                        </span>
                    )}
                    {row.daysToExpireMembership <= 0 && (
                        <span className={"text-red-600"}>Expired</span>
                    )}
                </span>
            ),
        },
        {
            name: "Status",
            selector: "status",
            cell: (row) => <span>{row.isActive ? "Active" : "In-active"}</span>,
        },
        {
            name: "Actions",
            selector: "action",
            cell: () => (
                <div className="flex items-center space-x-2">
                    <button
                        title="Mark As Unread"
                        className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                    >
                        Send Mail
                    </button>
                </div>
            ),
        },
    ];

    const [membersResults, setMemberResults] = useState({
        loading: false,
        error: false,
        message: "",
        data: [],
    });

    useEffect(() => {
        getAllMembers();
    }, []);

    const getAllMembers = async () => {
        setMemberResults({
            loading: true,
            error: false,
            message: "",
            data: [],
        });
        try {
            let res = await ApiService.getAllMembers();
            setMemberResults((prev) => ({
                ...prev,
                loading: false,
                data: res.data.members,
            }));
        } catch (err) {
            const message = err.response.data.message;
            setMemberResults((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Members
                    </h1>
                </div>
            </header>

            <div className="mx-5">
                <Table
                    columns={columns}
                    data={membersResults?.data}
                    loading={membersResults.loading}
                    error={membersResults.error}
                    errorMessage={membersResults.message}
                />
            </div>
        </div>
    );
};

export default Members;
