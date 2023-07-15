import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Menu_({ onClickPaypal, onClickOffline }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
            
                {/* <Menu.Button className="inline-flex w-full justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm text-white bg-green-500 hover:bg-green-600  focus:outline-none disabled:opacity-60"> */}
                <Menu.Button className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full justify-center rounded-md border border-transparent bg-[#10a37f] hover:opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                {/* <Menu.Button className="bg-[#10a37f] hover:opacity-80 text-[#fff] border-none rounded-md box-border cursor-pointer inline-flex font-normal justify-center leading-5 items-center position-relative transition duration-300 ease-in-out select-none focus:outline-none focus:shadow-outline-blue text-sm px-5 py-2"> */}
                    Membership Renewal
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <span
                                    className={classNames(
                                        active
                                            ? "text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm cursor-pointer hover:bg-[#e6f3f3]"
                                    )}
                                    onClick={onClickPaypal}
                                >
                                    Paypal
                                </span>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <span
                                    className={classNames(
                                        active
                                            ? "text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm cursor-pointer hover:bg-[#e6f3f3]"
                                    )}
                                    onClick={onClickOffline}
                                >
                                    Offline
                                </span>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
