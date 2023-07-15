const EventRegistrationOffline = () => {
    return (
        <>
            <div className="flex flex-row  justify-center px-6 py-8 mx-auto lg:py-0 my-[6rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-[50rem] xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="mt-3 text-center flex flex-col items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Thank you for your contribution!
                            </h3>
                            <div className="mt-2 py-3">
                                <p className="text-md text-gray-500">
                                    You can complete the donation by visiting us
                                    at PO Box 223 Saint Charles, MO – 63302,
                                    United States or visiting the venue if you
                                    are donating for an event.
                                </p>
                                <p className="text-md text-gray-500 mt-5">
                                    You can pay by cash or write a cheque to
                                    Dhvani Foundation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventRegistrationOffline;
