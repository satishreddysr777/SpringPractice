import { useState, useEffect } from "react";

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            heading: "Slide 1",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies consequat orci, et lobortis nunc.",
        },
        {
            heading: "Slide 2",
            description:
                "Sed malesuada velit vel orci maximus, a lacinia libero venenatis. Vivamus elementum magna non faucibus pretium.",
        },
        {
            heading: "Slide 3",
            description:
                "Aenean a mauris ex. Sed sagittis lacus vel imperdiet volutpat. Aliquam erat volutpat.",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="">
            <div className=" mx-auto">
                <div
                    id="default-carousel"
                    className="relative"
                    data-carousel="static"
                >
                    <div className="overflow-hidden relative h-[4rem] bg-[#add8e6] shadow-sm">
                        {slides.map((item, index) => (
                            <div
                                className={`duration-2000 ease-in-out bg-white shadow ${
                                    currentSlide === index
                                        ? "visible"
                                        : "hidden"
                                }`}
                                data-carousel-item
                            >
                                {/* <span className="absolute top-1/2 left-1/2 text-xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-xl dark:text-gray-800"> {item.description} </span> */}
                                <a
                                    href="#"
                                    className="absolute top-1/2 left-1/2 text-xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-xl dark:text-gray-800"
                                >
                                    {" "}
                                    {item.description}{" "}
                                </a>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                        data-carousel-prev
                    >
                        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 group-focus:ring-2 group-focus:ring-white group-focus:outline-none">
                            <svg
                                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 19l-7-7 7-7"
                                ></path>
                            </svg>
                            <span className="hidden">Previous</span>
                        </span>
                    </button>
                    <button
                        type="button"
                        className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                        data-carousel-next
                    >
                        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 group-focus:ring-2 group-focus:ring-white group-focus:outline-none">
                            <svg
                                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5l7 7-7 7"
                                ></path>
                            </svg>
                            <span className="hidden">Next</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
