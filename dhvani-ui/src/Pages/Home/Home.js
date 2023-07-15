import Carousel from "../../components/Carousel/Carousel";

// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';

const Home = () => {
    return (
        <>
            <Carousel />

            <div
                id="default-carousel"
                className="relative w-full"
                data-carousel="slide"
            >
                {/* Carousel wrapper */}
                <div className="relative h-[41rem] overflow-hidden">
                    {/* Item 1 */}
                    <div
                        className="duration-700 ease-in-out"
                        data-carousel-item
                    >
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                    {/* Item 2 */}
                    <div
                        className="hidden duration-700 ease-in-out"
                        data-carousel-item
                    >
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                    {/* Item 3 */}
                    <div
                        className="hidden duration-700 ease-in-out"
                        data-carousel-item
                    >
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                    {/* Item 4 */}
                    <div
                        className="hidden duration-700 ease-in-out"
                        data-carousel-item
                    >
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                    {/* Item 5 */}
                    <div
                        className="hidden duration-700 ease-in-out"
                        data-carousel-item
                    >
                        <img
                            src="/docs/images/carousel/carousel-5.svg"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                        />
                    </div>
                </div>
                {/* Slider indicators */}
                <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="true"
                        aria-label="Slide 1"
                        data-carousel-slide-to={0}
                    />
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 2"
                        data-carousel-slide-to={1}
                    />
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 3"
                        data-carousel-slide-to={2}
                    />
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 4"
                        data-carousel-slide-to={3}
                    />
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 5"
                        data-carousel-slide-to={4}
                    />
                </div>
                {/* Slider controls */}
                <button
                    type="button"
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            <div className="px-[3rem] py-[2rem]">
                {/* <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-3">
    <li className="inline-flex items-center">
      <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700">
        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
        Home
      </a>
    </li>
    <li>
      <div className="flex items-center">
        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        <a href="#" className="ml-1 text-sm font-medium text-gray-700 ">Templates</a>
      </div>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Flowbite</span>
      </div>
    </li>
  </ol>
</nav> */}

                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-700"></div>

                <div className="p-[10rem]">
                    <div className="flex justify-between mb-1 ">
                        <span className="text-base font-medium text-blue-700">
                            Uploading.....
                        </span>
                        <span className="text-base font-medium text-blue-700">
                            45%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: "45%" }}
                        ></div>
                    </div>
                </div>
            </div>

            <ul className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-sm w-[50%]">
                {" "}
                <li>
                    {" "}
                    <a href="#page1" className="flex justify-center py-2">
                        Pilot Training
                    </a>{" "}
                </li>{" "}
                <li>
                    {" "}
                    <a
                        href="#page2"
                        className="flex justify-center bg-white rounded-lg shadow text-indigo-900 py-2"
                    >
                        Titan maintenance
                    </a>{" "}
                </li>{" "}
                <li>
                    {" "}
                    <a href="#page3" className="flex justify-center py-2">
                        Loadout
                    </a>{" "}
                </li>{" "}
                <li>
                    {" "}
                    <a href="#page4" className="flex justify-center py-2">
                        Server Browser
                    </a>{" "}
                </li>{" "}
                <li>
                    {" "}
                    <a href="#page5" className="flex justify-center py-2">
                        Settings
                    </a>{" "}
                </li>{" "}
            </ul>


            

        </>
    );
};

export default Home;
