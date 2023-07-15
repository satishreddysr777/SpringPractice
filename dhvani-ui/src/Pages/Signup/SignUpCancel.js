const SignUpCancel = () => {
    const backTo = () => {
        window.location.href = "/signup";
    };

    return (
        <>
            <div className="flex flex-row  justify-center px-6 py-8 mx-auto lg:py-0 my-[6rem]">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-[50rem] xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="mt-3 text-center flex flex-col items-center">
                            <h3 className="text-lg leading-6 font-medium text-red-600">
                                {" "}
                                Something wrong with the payment.{" "}
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <button
                                    type="button"
                                    className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none w-full sm:text-sm"
                                    // className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-md text-sm px-5 py-2.5 ml-2 mb-2  focus:outline-none"
                                    onClick={backTo}
                                >
                                    Back to Signup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpCancel;
