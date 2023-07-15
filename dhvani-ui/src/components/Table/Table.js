import { useState, useMemo } from "react";
import Pagination from "./Pagination";

const Table = ({
    loading,
    columns = [],
    data = [],
    error = false,
    errorMessage,
    disableFooter = false
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 100;

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, data]);

    return (
        <section className="antialiased text-gray-600 my-[2rem]">
            <div className="flex flex-col h-full">
                <div className="w-[100%] mx-auto bg-white rounded-lg shadow border md:mt-0 xl:p-0 h-full">
                    {/* <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800"> {name} </h2>
                    </header> */}
                    <div className="p-0">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {columns.map((head, index) => (
                                            <th
                                                scope="col"
                                                key={index}
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                                                style={head.style || {}}
                                            >
                                                {head.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="text-sm divide-y divide-gray-100 ">
                                    {!loading &&
                                        currentTableData.map(
                                            (celldata, index) => (
                                                <tr key={index}>
                                                    {columns.map(
                                                        (headcell, hIndex) => (
                                                            <td
                                                                className="whitespace-nowrap px-3 py-4 text-sm"
                                                                key={hIndex}
                                                            >
                                                                {headcell.cell
                                                                    ? headcell.cell(celldata, index)
                                                                    : celldata[headcell.selector]}
                                                            </td>
                                                        )
                                                    )}
                                                </tr>
                                            )
                                        )}

                                    {!loading &&
                                        !error &&
                                        currentTableData.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={columns.length}
                                                    className="w-full"
                                                >
                                                    <div className="flex items-center justify-center w-full my-5">
                                                        <div className="font-medium text-gray-800">
                                                            No items
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    {loading && !error && (
                                        <tr>
                                            <td
                                                colSpan={columns.length}
                                                className="w-full"
                                            >
                                                <div className="flex items-center justify-center w-full my-5">
                                                    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-700"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    {!loading && error && (
                                        <tr>
                                            <td
                                                colSpan={columns.length}
                                                className="w-full"
                                            >
                                                <div className="flex items-center justify-center w-full my-5">
                                                    <div
                                                        className="bg-red-100 rounded-md py-2 px-6 mb-4 text-base text-center text-red-700"
                                                        role="alert"
                                                    >
                                                        {errorMessage}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* <Pagination
                                currentPage={currentPage}
                                totalCount={data.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>

            {!disableFooter && (
                <Pagination
                    currentPage={data.length == 0 ? 0 : currentPage}
                    totalCount={data.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </section>
    );
};

export default Table;
