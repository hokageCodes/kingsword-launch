"use client"
import React, { useState, ReactNode } from 'react';
import OurBeliefContent from '../../components/our-belief/OurBeliefContent';
import OurLeadershipContent from '../../components/our-leadership/OurLeadershipContent';
import OurLocationsContent from '../../components/our-locations/OurLocationsContent';

interface TabData {
    label: string;
    content: ReactNode;
}

const tabData: TabData[] = [
    {
        label: 'Our Belief',
        content: <OurBeliefContent />,
    },
    {
        label: 'Our Leadership',
        content: <OurLeadershipContent />,
    },
    {
        label: 'Locations',
        content: <OurLocationsContent />,
    },
];

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState<string>(tabData[0].label);

    const handleTabClick = (label: string) => {
        setActiveTab(label);
    };

    return (
        <div className="w-full">
            <div className="flex text-2xl justify-around items-center bg-yellow-300 py-3 shadow-md">
                {tabData.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(tab.label)}
                        className={`w-full py-2 transition-colors duration-300 ease-in-out cursor-pointer
                            ${activeTab === tab.label ? 'text-black font-bold' : 'text-gray-600 hover:text-black'}
                            text-base sm:text-lg md:text-xl lg:text-xl flex justify-center items-center whitespace-nowrap`}
                        >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4">
                {tabData.find(tab => tab.label === activeTab)?.content}
            </div>
        </div>
    );
}