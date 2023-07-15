import { useEffect, useState } from "react";
import UploadDocuments from "./UploadDocuments";
import Loader from "../../../components/Loader";
import ApiService from "../../../services/ApiService";

const FinancialDocuments = () => {
    const [openUploadDocs, setOpenUploadDocs] = useState(false);

    const [documents, setDocuments] = useState({
        loading: false,
        error: false,
        message: "",
        data: [],
    });

    useEffect(() => {
        getDocuments();
    }, []);

    const getDocuments = async () => {
        try {
            setDocuments({
                loading: true,
                error: false,
                message: "",
                data: [],
            });
            let res = await ApiService.getFinancialDocuments();
            setDocuments((prev) => ({
                ...prev,
                loading: false,
                data: res.data.documents,
            }));
        } catch (error) {
            let message = error?.response?.data?.message;
            setDocuments((prev) => ({
                ...prev,
                loading: false,
                error: true,
                message: message,
            }));
        }
    };

    const downloadMedia = async (filename) => {
        ApiService.downloadMedia(filename)
    };

    return (
        <section>
            <Loader open={documents.loading} />
            <UploadDocuments
                open={openUploadDocs}
                setOpen={setOpenUploadDocs}
                getDocuments={getDocuments}
            />

            <header className="bg-white shadow">
                <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Financial Documents
                    </h1>
                </div>
            </header>

            <div className="container mx-auto mt-10 px-5">
                <button
                    type="button"
                    onClick={() => setOpenUploadDocs(true)}
                    className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                    // className={`bg-[#10a37f] hover:opacity-90 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                >
                    Upload documents
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {documents.data.map((doc, index) => (
                        <div className="bg-white rounded-md border" key={index}>
                            <li className="w-full px-4 py-2 border-gray-200 rounded-t-lg flex justify-between">
                                <div>
                                    <span> {doc.originalFilename} </span>
                                </div>
                                <div
                                    className="cursor-pointer text-blue-500"
                                    onClick={() => downloadMedia(doc.fileName)}
                                >
                                    Download
                                </div>
                            </li>
                        </div>
                    ))}
                </div>

                {!documents.loading &&
                    documents.data.length === 0 && (
                        <div className="bg-white p-8 rounded-md shadow text-center">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                No documents found
                            </h3>
                        </div>
                    )}
            </div>
        </section>
    );
};

export default FinancialDocuments;
