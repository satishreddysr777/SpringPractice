import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const SliderComponent = () => {
    const swiperRef = useRef();

    return (
        <div className="">
            <div
                id="default-carousel"
                className="relative"
                data-carousel="static"
            >
                <div className="overflow-hidden relative h-[4rem] bg-[#add8e6] shadow-sm">
                    <Swiper
                        slidesPerView={1}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div
                                className={`duration-2000 ease-in-out bg-[#add8e6] shadow h-[4rem]`}
                                data-carousel-item
                            >
                                <a
                                    href="#"
                                    className="absolute top-1/2 left-1/2 text-xl font-semibold text-black -translate-x-1/2 -translate-y-1/2 sm:text-xl dark:text-gray-800"
                                >
                                    Slide 1
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`duration-2000 ease-in-out bg-[#add8e6] shadow h-[4rem]`}
                                data-carousel-item
                            >
                                <a
                                    href="#"
                                    className="absolute top-1/2 left-1/2 text-xl font-semibold text-black -translate-x-1/2 -translate-y-1/2 sm:text-xl dark:text-gray-800"
                                >
                                    Slide 1
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`duration-2000 ease-in-out bg-[#add8e6] shadow h-[4rem]`}
                                data-carousel-item
                            >
                                <a
                                    href="#"
                                    className="absolute top-1/2 left-1/2 text-xl font-semibold text-black -translate-x-1/2 -translate-y-1/2 sm:text-xl dark:text-gray-800"
                                >
                                    Slide 1
                                </a>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                <button
                    onClick={() => swiperRef.current.slidePrev()}
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                        <span className="hidden">Previous</span>
                    </span>
                </button>
                <button
                    onClick={() => swiperRef.current.slideNext()}
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                        <span className="hidden">Next</span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SliderComponent;
