import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Img from "../../assets/carousel/Carousel 1_comp.jpg";
import Img2 from "../../assets/carousel/Carousel 2_comp.jpg";
import Img3 from "../../assets/carousel/patrick-hendry.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function SliderComponent() {
    return (
        <>
            <Swiper
                // spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        className="object-cover w-full h-[50rem]"
                        src={Img}
                        alt="image slide 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-cover w-full h-[50rem]"
                        src={Img2}
                        alt="image slide 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-cover w-full h-[50rem]"
                        src={Img3}
                        alt="image slide 3"
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
