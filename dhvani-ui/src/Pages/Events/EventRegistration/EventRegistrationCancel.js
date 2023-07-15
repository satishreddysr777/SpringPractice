const EventRegistrationOffline = () => {
    return (
        <>
            <div className="flex flex-row  justify-center px-6 py-8 mx-auto lg:py-0 my-[6rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-[50rem] xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="mt-3 text-center flex flex-col items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Your transaction is cancelled.
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                        <div className="mt-5">
                                            <button
                                                type="button"
                                                className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                                // onClick={backTo}
                                            >
                                                Go back
                                            </button>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventRegistrationOffline;
