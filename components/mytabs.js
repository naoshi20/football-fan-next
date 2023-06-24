import { Tab } from "@headlessui/react";
import { Fragment, useState } from "react";

const buttonStyle =
    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-black-400 focus:outline-none focus:ring-2";

const selectedButtonStyle = "bg-white shadow";

const unselectedButtonStyle =
    "text-blue-100 hover:bg-white/[0.12] hover:text-white";

export default function MyTabs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={
                                selected
                                    ? buttonStyle + " " + selectedButtonStyle
                                    : buttonStyle + " " + unselectedButtonStyle
                            }
                        >
                            お気に入り
                        </button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={
                                selected
                                    ? buttonStyle + " " + selectedButtonStyle
                                    : buttonStyle + " " + unselectedButtonStyle
                            }
                        >
                            全選手
                        </button>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>Content 1</Tab.Panel>
                <Tab.Panel>Content 2</Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}
