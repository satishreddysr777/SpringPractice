
import Img from "../../../assets/volunteer/group-hands.jpg";
import Medicine from "../../../assets/medicine.png";
import Dish from "../../../assets/dish.png";
import Couple from "../../../assets/couple.png";
import Maternity from "../../../assets/maternity.png";

const AboutUs = () => {


    return (
        <section>

            <div
                className="py-20 justify-center bg-no-repeat bg-cover bg-center h-[28rem]"
                style={{ backgroundImage: `url(${Img})` }}
            >
                <div className="container my-auto px-6 pt-10">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                        About Us
                    </h2>
                </div>
            </div>

            <div className="container sm:mx-auto px-[1rem] mt-10">
                <div className="lg:flex">
                    <div className="w-full text-2xl uppercase">Our love for family and community is what makes us strong</div>
                    <div className="w-full mt-5 lg:mt-0">Dhvani foundation began in 2015. We are a group of IT professionals, doctors, businessmen who came together to support our mission. Our love for family and community is what made us strong. Before Dhvani started, we have worked together in an informal manner helping those in need through a variety of fundraising events and charitable activities. Now there’s a team of passionate members helping to a world free from poverty.</div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-20 mb-5">
                <h3 className="text-2xl">DRIVEN BY</h3>
                <h1 className="text-4xl mb-4">VALUES</h1>
            </div>

            <div className="container sm:mx-auto px-[1rem]">
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

            <div className="flex flex-col justify-center items-center mt-20 mb-5">
                <h3 className="text-2xl">ALL YOUR CONTRIBUTIONS</h3>
                <h1 className="text-4xl mb-4">GO TOWARDS</h1>
            </div>

            <div className="container flex flex-col justify-center px-[1rem] mx-auto lg:w-[50%] xl:w-[50%] 2xl:w-[30%]">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="h-12 w-12" src={Dish} alt="Icon" />
                    </div>
                    <div className="ml-4 w-full">
                        <p className="text-lg font-medium text-gray-700">FEEDING THE POOR</p>
                        <p className="text-lg font-medium text-gray-500">To end hunger, we provide food & work to break the cycle of poverty, by providing long-term solutions like education.</p>
                    </div>
                </div>
                <div className="flex items-center mt-5">
                    <div className="flex-shrink-0">
                        <img className="h-12 w-12" src={Maternity} alt="Icon" />
                    </div>
                    <div className="ml-4 w-full">
                        <p className="text-lg font-medium text-gray-700">BUILDING ORPHANAGES</p>
                        <p className="text-lg font-medium text-gray-500">Our goal is to give children a hopeful future. Caring for orphans starts with a safe, loving home.</p>
                    </div>
                </div>
                <div className="flex items-center mt-5">
                    <div className="flex-shrink-0">
                        <img className="h-12 w-12" src={Medicine} alt="Icon" />
                    </div>
                    <div className="ml-4 w-full">
                        <p className="text-lg font-medium text-gray-700">TREATING THE SICK</p>
                        <p className="text-lg font-medium text-gray-500">15% per cent of the proceeds go to fund important & emergency treatments causes raised through our members.</p>
                    </div>
                </div>
                <div className="flex items-center mt-5">
                    <div className="flex-shrink-0">
                        <img className="h-12 w-12" src={Couple} alt="Icon" />
                    </div>
                    <div className="ml-4 w-full">
                        <p className="text-lg font-medium text-gray-700">ELDER ORPHANS</p>
                        <p className="text-lg font-medium text-gray-500">Contributions to make a difference in the quality of life for elderly patients and their families.</p>
                    </div>
                </div>
            </div>


            <div className="flex flex-col justify-center items-center mt-20 mb-5">
                <h3 className="text-2xl">SIGN UP AS A PAID MEMBER</h3>
                <h1 className="text-4xl mb-4 text-center">BECOME AN INSTRUMENT TO CHANGE</h1>
            </div>

            <div className="container mx-auto text-center mb-[5rem]">
                <button
                    type="button"
                    onClick={() => window.location.href = '/signin'}
                    className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center rounded-[50px] border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:w-auto sm:text-sm"
                    // className={`bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-[50px] box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2 ml-2 sm:w-auto`}
                >
                    LOGIN / REGISTER
                </button>
            </div>

            
        </section>
    )
}

export default AboutUs