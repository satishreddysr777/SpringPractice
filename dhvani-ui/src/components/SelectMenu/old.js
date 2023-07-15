import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function SelectMenu({ items = [], onSelected = () => {}, label, required, hasError, error, value, reset }) {
    const [selected, setSelected] = useState({
        'name': 'Choose an option',
        'value': null
    });

    useEffect(() => {
        onSelected(selected);
    }, [selected]);

    useEffect(() => {
        if (items.length === 0) {
            setSelected({
                'name': 'Choose an option',
                'value': null
            })
        }
    }, [items])

    useEffect(() => {
        console.log(value)
        if (value != null) {
            let currIt = items.filter(it => it['value'] == value)
            // console.log(currIt[0])
            if (currIt.length > 0) {
                setSelected(currIt[0])
                return
            } else {
                setSelected({
                    'name': 'Choose an option',
                    'value': null
                })
            }
        }
        // } else {
        //     setSelected({
        //         'name': 'Choose an option',
        //         'value': null
        //     })
        // }
    }, [value])

    useEffect(() => {
        if (reset) setSelected({
            'name': 'Choose an option',
            'value': null
        })
    }, [reset])


    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900"> {label} {required && <span className="text-md text-red-500">*</span>} </Listbox.Label>
                    <div className="relative mt-[.2rem]">
                         <Listbox.Button className={`relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm  ${
                            hasError && error
                                ? `border-red-500 border-2 focus:border-red-500 focus:ring-0`
                                : `ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6`
                        }`}>
                            <span className="flex items-center">
                                <span className=" block truncate">
                                    {selected?.name}
                                </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {items.map((item, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? "bg-[#10a37f] text-white"
                                                    : "text-gray-900",
                                                "relative cursor-pointer select-none py-2 pl-3 pr-9"
                                            )
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={classNames(
                                                            selected
                                                                ? "font-semibold"
                                                                : "font-normal",
                                                            "ml-3 block truncate"
                                                        )}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                                {items.length === 0 && (
                                    <Listbox.Option
                                        className="relative cursor-disable select-none py-2 pl-3 pr-9 text-gray-900"
                                        disabled="true"
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className="ml-3 block truncate font-light"
                                                    >
                                                        No Items
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </Listbox.Option>
                                )}
                            </Listbox.Options>
                        </Transition>
                        {hasError && error && (
                            <span className="text-red-600 text-xs">{error}</span>
                        )}
                    </div>
                </>
            )}
        </Listbox>
    );
}
