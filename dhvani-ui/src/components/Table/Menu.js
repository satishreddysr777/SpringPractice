import { useState, useRef, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const CustomMenu = ({ items = [], onFilter }) => {
    let [open, setOpen] = useState(false);
    const wrapperRef = useRef("menu");
    OutsideClickAlert(wrapperRef, () => {
        setOpen(false);
    });

    const [menuItems, setMenuItems] = useState([
        { text: "Completed", selected: false },
        { text: "Pending", selected: false },
        { text: "Denied", selected: false },
    ]);

    const onSelectItem = (index) => {
        let _item = menuItems[index];
        _item["selected"] = !_item["selected"];
        menuItems[index] = _item;
        setMenuItems([...menuItems]);
    };

    useEffect(() => {
        let filters = [];
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].selected) filters.push(menuItems[i].text);
        }
        if (filters.length > 0) onFilter(filters);
    }, [menuItems]);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div ref={wrapperRef}>
                <Menu.Button
                    onClick={() => setOpen(!open)}
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-offset-gray-100"
                >
                    Filter
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                    />
                </Menu.Button>

                {open && (
                    <Menu.Items
                        static
                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div className="py-1">
                            {menuItems.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        {() => (
                                            <div className="flex items-start px-4 py-2 text-sm">
                                                <div className="flex items-center h-5 cursor-pointer">
                                                    <input
                                                        id={item.text}
                                                        name={item.text}
                                                        aria-describedby={
                                                            item.text
                                                        }
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 cursor-pointer"
                                                        onChange={() =>
                                                            onSelectItem(index)
                                                        }
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm cursor-pointer">
                                                    <label
                                                        htmlFor={item.text}
                                                        className="text-gray-500 cursor-pointer"
                                                    >
                                                        {item.text}
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </Menu.Item>
                                );
                            })}
                        </div>
                    </Menu.Items>
                )}
            </div>
        </Menu>
    );
};

const OutsideClickAlert = (ref, onClickOutside) => {
    useEffect(() => {
        /**
         * Invoke Function onClick outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        }
        // Bind
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // dispose
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClickOutside]);
};

export default CustomMenu;
