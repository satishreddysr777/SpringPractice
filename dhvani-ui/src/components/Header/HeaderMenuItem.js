import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const HeaderMenuItem = (props) => {
    const { menuItems, name } = props;

    const [_menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        let mTs = menuItems.filter((item) => item.view);
        setMenuItems(mTs);
    }, [menuItems]);

    return (
        <Popover className="relative">
            {({ open, close }) => (
                <>
                    <Popover.Button
                        as="a"
                        className="inline-flex items-center lg:border-0 lg:p-0 text-gray-200 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700 cursor-pointer py-2 pr-4 pl-3 w-full"
                    >
                        <span>{name}</span>
                        <ChevronDownIcon
                            className={classNames(
                                "ml-2 h-5 w-5 group-hover:text-gray-500"
                            )}
                            aria-hidden="true"
                        />
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute -ml-4 mt-3 w-screen min-w-[10rem] max-w-max transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2" style={{ zIndex: 100000 }}>
                            <div className="overflow-hidden rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                                <div className="relative bg-white py-3">
                                    {_menuItems.map((item) => (
                                        <span
                                            key={item.name}
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                if (item?.canSubmitCause !== undefined && item?.canSubmitCause === false) {
                                                    return
                                                } else {
                                                    props.navigateTo(item.href)
                                                    close()
                                                }
                                            }}
                                            // className="cursor-pointer flex items-start py-[.4rem] hover:bg-[#e6f3f3]"
                                            className={`${(item?.canSubmitCause !== undefined && item?.canSubmitCause === false) ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#e6f3f3]'}  flex items-start py-[.4rem]`}
                                        >
                                            <div className="mx-6">
                                                <p className={`${(item?.canSubmitCause !== undefined && item?.canSubmitCause === false) ? 'text-gray-500' : 'text-gray-900'} text-base font-medium `}>
                                                    {item.name}
                                                </p>
                                            </div>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default HeaderMenuItem;
