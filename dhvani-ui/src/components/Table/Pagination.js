const Pagination = (props) => {
    const { onPageChange, totalCount, currentPage, pageSize } = props;

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let totalPages = Math.ceil(totalCount / pageSize);
    var start = 0;
    if (totalCount > 0) {
        start = currentPage * pageSize - (pageSize - 1);
    }
    var end = Math.min(start + pageSize - 1, totalCount);

    return (
        <div className="flex items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg mt-2">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{start}</span> to{" "}
                        <span className="font-medium">{end}</span> of{" "}
                        <span className="font-medium">{totalCount}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <div className="px-2 flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <button
                                className="bg-gray-200 disabled:text-gray-400 hover:bg-gray-300 text-gray-700 p-1.5 rounded-lg transition duration-150 disabled:cursor-not-allowed"
                                onClick={onPrevious}
                                disabled={
                                    currentPage === 1 || currentPage === 0
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <button
                                className="bg-gray-200 disabled:text-gray-400 hover:bg-gray-300 text-gray-700 p-1.5 rounded-lg transition duration-150 disabled:cursor-not-allowed"
                                onClick={onNext}
                                disabled={currentPage === totalPages}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
