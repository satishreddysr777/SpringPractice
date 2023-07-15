import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

const FilterMenu = ({ items = [], onFilter }) => {
    const [open, setOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [checked, setChecked] = useState([]);

    const wrapperRef = useRef("menu");
    OutsideClickListener(wrapperRef, () => {
        setOpen(false);
    });

    useEffect(() => {
        localStorage.setItem("filterItems", JSON.stringify([]));

        return () => {
            localStorage.removeItem("filterItems");
        };
    }, []);

    useEffect(() => {
        setMenuItems(items);
    }, [items]);

    const onSelectItem = (e, item) => {
        let filterItems = JSON.parse(localStorage.getItem("filterItems"));
        if (e.currentTarget.checked) {
            if (!filterItems.includes(item)) {
                filterItems.push(item);
            }
        } else {
            if (filterItems.includes(item)) {
                filterItems = filterItems.filter((it) => it !== item);
            }
        }
        setChecked(filterItems);
        localStorage.setItem("filterItems", JSON.stringify(filterItems));
        onFilter(filterItems);
    };

    return (
        <Menu as="div" className="relative inline-block text-left z-10">
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
                                                        id={item}
                                                        name={item}
                                                        aria-describedby={item}
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 cursor-pointer"
                                                        checked={checked.includes(
                                                            item
                                                        )}
                                                        onChange={(e) =>
                                                            onSelectItem(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm cursor-pointer">
                                                    <label
                                                        htmlFor={item}
                                                        className="text-gray-500 cursor-pointer"
                                                    >
                                                        {item}
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

const OutsideClickListener = (ref, onClickOutside) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
};

export default FilterMenu;
