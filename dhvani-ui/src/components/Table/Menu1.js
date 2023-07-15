import { Fragment, useState, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function CustomMenu() {
    const [customOpen, setCustomOpen] = useState(false);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-offset-gray-100">
                    Options
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>
            <Menu.Items
                static
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div className="py-1">
                    <Menu.Item>
                        {({ active, close }) => (
                            <a
                                className={classNames(
                                    active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                )}
                            >
                                Completed
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                    active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                )}
                            >
                                Pending
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                    active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                )}
                            >
                                Denied
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div className="flex items-start px-4 cursor-pointer">
                                <div className="flex items-center h-5">
                                    <input
                                        id="membership"
                                        name="membership"
                                        aria-describedby="membership"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="membership"
                                        className="text-gray-500"
                                    >
                                        Pending
                                    </label>
                                </div>
                            </div>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    );
}

function MyDropdown() {
    const [display, setDisplay] = useState("display here");
    const [customOpen, setCustomOpen] = useState(false);

    function buttonClicked() {
        setCustomOpen((prev) => !prev);
    }

    return (
        <>
            <Menu>
                {({ open }) => (
                    <>
                        <Menu.Button onClick={buttonClicked}>More</Menu.Button>
                        {customOpen && (
                            <Menu.Items static>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            className={`${
                                                active && "bg-blue-500"
                                            }`}
                                            onClick={() =>
                                                setDisplay("Account Settings")
                                            }
                                        >
                                            Account settings
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            className={`${
                                                active && "bg-blue-500"
                                            }`}
                                            onClick={() =>
                                                setDisplay("Documentation")
                                            }
                                        >
                                            Documentation
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item disabled>
                                    <span className="opacity-75">
                                        Invite a friend (coming soon!)
                                    </span>
                                </Menu.Item>
                            </Menu.Items>
                        )}
                    </>
                )}
            </Menu>
            <br />
            <br />
            <div>{display} was clicked</div>
        </>
    );
}
