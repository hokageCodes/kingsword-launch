import React from 'react';
import OurCreed from '../../components/our-creed/OurCreed';

const CoreValues: React.FC = () => {
  return (
    <>

        <div className="mt-24 flex flex-col md:flex-row items-start justify-center p-8">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-[#c27803] font-bold uppercase text-sm">Our Core Values.</h2>
                <h1 className="text-4xl font-bold mt-4">
                How we see ourselves fulfilling the <span className="text-[#c27803]">mission of raising a supernatural army</span>
                </h1>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-24">
                <div className="flex items-center">
                    <div className="pr-4 text-[#c27803]">01</div>
                    <div className="border-l pl-4">
                        <p className="font-bold">Spirit-filled lifestyle.</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="pr-4 text-[#c27803]">02</div>
                    <div className="border-l pl-4">
                        <p className="font-bold">Uncompromised Word of God as our priority and final authority.</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="pr-4 text-[#c27803]">03</div>
                    <div className="border-l pl-4">
                        <p className="font-bold">Powered by Grace.</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="pr-4 text-[#c27803]">04</div>
                    <div className="border-l pl-4">
                        <p className="font-bold">Excellent in all our ways.</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="pr-4 text-[#c27803]">05</div>
                    <div className="border-l pl-4">
                        <p className="font-bold">Relevant and purposeful lifestyle.</p>
                    </div>
                </div>
            </div>
        </div>
        <OurCreed />
    </>
  );
};

export default CoreValues;