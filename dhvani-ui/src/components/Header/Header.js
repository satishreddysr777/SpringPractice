import { Popover } from "@headlessui/react";
import { useState } from "react";

import { useSelector } from "react-redux";
import HeaderMenuItem from "./HeaderMenuItem";
import HeaderItem from "./HeaderItem";

import dhvaniLogo from "../../assets/dhvani_logo.png";
import { useNavigate } from 'react-router-dom'

const Header = ({ canSubmitCause }) => {

    const navigate = useNavigate();
    const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
    };

    const whoWeAre = [
        {
            name: "About Us",
            href: "/about-us",
            view: true,
        },
        {
            name: "Mission",
            href: "mission",
            view: true,
        },
        {
            name: "Gallery",
            href: "/gallery",
            view: true,
        },
    ];

    const projects = [
        {
            name: "Previous Projects",
            href: "/previous-projects",
            view: true,
        },
        {
            name: "Present Projects",
            href: "/present-projects",
            view: true,
        },
        {
            name: "Add Project",
            href: "/add-project",
            view: isLoggedIn && isAdmin,
        },
        {
            name: "Delete Project",
            href: "/delete-project",
            view: isLoggedIn && isAdmin,
        },
    ];

    const causes = [
        {
            name: "View all causes",
            href: "/view-causes",
            view: true,
        },
        {
            name: "Submit a cause",
            href: "/submit-cause",
            view: true,
            canSubmitCause: canSubmitCause
        },
    ];

    const events = [
        {
            name: "Current Events",
            href: "/current-events",
            view: true,
        },
        {
            name: "Upcoming Events",
            href: "/upcoming-events",
            view: true,
        },
        {
            name: "Previous Events",
            href: "/previous-events",
            view: true,
        },
        {
            name: "Event Calender",
            href: "/event-calender",
            view: true,
        },
    ];

    const admin = [
        {
            name: "Volunteers",
            href: "/volunteers",
            view: isAdmin,
        },
        {
            name: "Members",
            href: "/members",
            view: isAdmin,
        },
        {
            name: "Application Parameters",
            href: "/cause-submissions",
            view: isAdmin,
        },
        {
            name: "Submitted Causes",
            href: "/admin/submitted-causes",
            view: isAdmin,
        },
        {
            name: "Event Registrations",
            href: "/event-registrations",
            view: isAdmin,
        },
        {
            name: "Payments",
            href: "/payments",
            view: isAdmin,
        },
        {
            name: "Manage Alerts",
            href: "#",
            view: isAdmin,
        },
        {
            name: "Social Media",
            href: "#",
            view: isAdmin,
        },
        {
            name: "Financial Documents",
            href: "/financial-documents",
            view: isAdmin,
        },
    ];

    const profile = [
        {
            name: "My Profile",
            href: "/my-profile",
            view: true,
        },
        {
            name: "My Membership",
            href: "/my-membership",
            view: true,
        },
        {
            name: "My Submitted Causes",
            href: "/my-submitted-causes",
            view: true,
        },
        {
            name: "Logout",
            href: "/logout",
            view: true,
        },
    ];

    const navigateTo = (path) => {
        navigate(path)
        setMenuOpen(false)
    }

    return (
        <div className="dhvani-header">
            <header>
                <Popover
                    as="nav"
                    className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800"
                >
                    <div className="flex flex-wrap justify-between items-center mx-auto">
                        <a
                            href="/"
                            className="flex items-center"
                        >
                            <img
                                src={dhvaniLogo}
                                className="mr-3 h-6 sm:h-12"
                                alt="Dhvani Foundation"
                            />
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                                Dhvani Foundation
                            </span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            {!isLoggedIn && (
                                <a
                                    href="/signin"
                                    className="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800 hidden lg:block"
                                >
                                    Log In / Sign Up
                                </a>
                            )}
                            <button
                                type="button"
                                onClick={() => navigateTo('/donate')}
                                className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center items-center focus:ring-[#F7BE38]/50 mr-2 mb-2 hidden lg:block"
                            >
                                Donate
                            </button>
                        </div>

                        <button
                            onClick={handleMenuToggle}
                            data-collapse-toggle="navbar-default"
                            type="button"
                            className="inline-flex items-center p-2 ml-3 text-sm text-gray-400 rounded-lg lg:hidden bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            aria-controls="navbar-default"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        <div
                            className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <HeaderMenuItem
                                        menuItems={whoWeAre}
                                        name="Who we are"
                                        navigateTo={navigateTo}
                                    />
                                </li>
                                <li>
                                    <HeaderMenuItem
                                        menuItems={projects}
                                        name="Projects"
                                        navigateTo={navigateTo}
                                    />
                                </li>
                                <li>
                                    <HeaderMenuItem
                                        menuItems={events}
                                        name="Events"
                                        navigateTo={navigateTo}
                                    />
                                </li>
                                {isLoggedIn && (
                                    <li>
                                        <HeaderMenuItem
                                            menuItems={causes}
                                            name="Causes"
                                            navigateTo={navigateTo}
                                        />
                                    </li>
                                )}
                                {isLoggedIn && isAdmin && (
                                    <li>
                                        <HeaderMenuItem
                                            menuItems={admin}
                                            name="Admin"
                                            navigateTo={navigateTo}
                                        />
                                    </li>
                                )}
                                <li>
                                    <HeaderItem
                                        name="Contact Us"
                                        href="/contact-us"
                                        navigateTo={navigateTo}
                                    />
                                </li>
                                <li>
                                    <HeaderItem
                                        name="Volunteer"
                                        href="/volunteer"
                                        navigateTo={navigateTo}
                                    />
                                </li>
                                {isLoggedIn && (
                                    <li>
                                        <HeaderMenuItem
                                            menuItems={profile}
                                            name="Profile"
                                            navigateTo={navigateTo}
                                        />
                                    </li>
                                )}
                            </ul>

                            {isMenuOpen && <div className={`flex items-center`}>
                                {!isLoggedIn && (
                                    <a
                                        href="/signin"
                                        className="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
                                    >
                                        Log In / Sign Up
                                    </a>
                                )}
                                <button
                                    type="button"
                                    onClick={() => navigateTo('/donate')}
                                    className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center items-center focus:ring-[#F7BE38]/50 mr-2 mb-2"
                                >
                                    Donate
                                </button>
                        </div>}
                        </div>
                    </div>
                </Popover>
            </header>

        </div>
    );
};

export default Header;
