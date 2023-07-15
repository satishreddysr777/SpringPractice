import Carousel from "../../components/Carousel/Carousel";
import TextCarousel from "../../components/Carousel/TextCarousel"
import { useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import Loader from "../../components/Loader"

const Home = () => {

    const [carouselItems, setCarouselItems] = useState([])
    const [getCarouselsRes, setGetCarouselsRes] = useState({ 'loading': false, 'error': false, 'message': false, 'data': null })

    useEffect(() => {
        getCarouselItems()
    }, [])

    const getCarouselItems = async () => {
        try {
            setGetCarouselsRes({ 'loading': true, 'error': false, 'message': false, 'data': null })
            let res = await ApiService.getDonationForItems()
            let items = []
            let projects = res?.data?.data?.projects
            if (projects && projects.length > 0) {
                for (let i = 0; i < projects.length; i++) {
                    items.push({
                        'text': "Project - " + projects[i].name,
                        'url': `view-project/${projects[i].value}`
                    })
                }
            }
            setCarouselItems(items)
            setGetCarouselsRes(prev => ({
                ...prev,
                loading: false
            }))
        } catch (error) {
            console.log(error)
            const message = error?.response?.data?.message
            setGetCarouselsRes(prev => ({
                ...prev,
                loading: false,
                error: true,
                message: message
            }))
        }
    }

    return (
        <section>
            <Loader open={getCarouselsRes.loading} />
            {carouselItems.length > 0 && <TextCarousel items={carouselItems} />}
            <Carousel />

            <div className="container sm:mx-auto px-[1rem] mt-10">
                <div className="lg:flex">
                    <div className="w-full text-2xl uppercase">Our love for family and community is what makes us strong</div>
                    <div className="w-full mt-5 lg:mt-0">Dhvani foundation began in 2015. We are a group of IT professionals, doctors, businessmen who came together to support our mission. Our love for family and community is what made us strong. Before Dhvani started, we have worked together in an informal manner helping those in need through a variety of fundraising events and charitable activities. Now there’s a team of passionate members helping to a world free from poverty.</div>
                </div>
            </div>

            <div className="container sm:mx-auto px-[1rem] mt-[5rem]">
                <div className="lg:flex lg:flex-wrap">
                    <div className="w-full lg:w-1/2 lg:pb-4 lg:pr-4">
                        <div className="">
                            <div className="font-semibold">INTEGRITY</div>
                            <div className="">We aspire to live to the highest standards of personal honesty and behavior; we never compromise our reputation and always act in the best interests of our mission.</div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 lg:pb-4">
                        <div className="mt-5 lg:mt-0">
                            <div className="font-semibold">TEAM WORK</div>
                            <div className="">We respect and value each other, thrive on our diversity, and work with partners and sponsor in making a difference for children.</div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 lg:pb-4 lg:pr-4">
                        <div className="mt-5 lg:mt-0">
                            <div className="font-semibold">TRUST</div>
                            <div className="">We take personal responsibility for using our resources efficiently, achieving measurable results, and being accountable to sponsors, partners and, most of all, children.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto text-center mt-[5rem]">
                <button
                    onClick={() => window.location.href = '/volunteer'}
                    type="button"
                    className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-[50px] box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 ml-2 sm:w-auto`}
                >
                    BECOME OUR VOLUNTEER
                </button>
            </div>

            <div className="flex flex-wrap justify-center items-center mt-[5rem]">
                <div className="w-full lg:w-1/3 px-[50px] py-[140px] flex flex-col justify-center items-center bg-[#5ab9a5] text-white">
                    <div className="text-sm">MAKE A</div>
                    <div className="text-lg mb-6">DONATION</div>
                    <p className="text-center mb-6">
                        When you donate, you’re giving children renewed
                        strength to fight poverty and can change lives.
                        Your donation is tax deductible and we send you
                        a tax receipt.
                    </p>

                    <button
                        type="button"
                        className={`bg-[#EF884C] hover:opacity-80 text-[#fff] border-none rounded-2xl box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        DONATE NOW
                    </button>
                </div>
                <div className="w-full lg:w-1/3 px-[50px] py-[140px] flex flex-col justify-center items-center bg-[#000] text-white">
                    <div className="text-sm">BECOME A</div>
                    <div className="text-lg mb-6">MEMBER</div>
                    <p className="text-center mb-6">
                        There is nothing more fulfilling than realizing
                        how much of a sustainable impact you as a member
                        can make. Just a few dollars & hours of help can
                        turn into a lifetime of opportunity!
                    </p>
                    <button
                        type="button"
                        className={`bg-[#EFC94C] hover:opacity-80 text-[#fff] border-none rounded-2xl box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        JOIN US
                    </button>
                </div>
                <div className="w-full lg:w-1/3 px-[50px] py-[140px] flex flex-col justify-center items-center bg-[#d55e48] text-white">
                    <div className="text-sm">SPREAD THE</div>
                    <div className="text-lg mb-6">WORD</div>
                    <p className="text-center mb-6">
                        We’d appreciate your help spreading the word
                        about events at Dhvani Foundation and create an
                        impact by creating a conversation around all the
                        causes and campaigns we support.
                    </p>

                    <button
                        type="button"
                        className={`bg-[#EF884C] hover:opacity-80 text-[#fff] border-none rounded-2xl box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-3 py-2`}
                    >
                        DONATE NOW
                    </button>
                </div>
            </div>

        </section>
    )
}

export default Home