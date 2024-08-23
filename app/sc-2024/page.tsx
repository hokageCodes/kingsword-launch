"use client"
import { Parallax } from 'react-parallax';
import CountdownTimer from '../../components/countdown/Count';
import SCInfo from '../../components/sc-info/SCInfo';
import EventSchedule from '../../components/sc-schedule/SCSchedule';

const HeroSection = () => {
  return (
    <>
      <Parallax
        bgImage="/assets/sc-banner.png"
        strength={500}
        className="relative h-screen overflow-hidden"
      >
        <div className="mt-12 absolute inset-0 bg-black opacity-80 z-10 h-[400px]"></div> {/* Adjust opacity */}
        <div className="relative flex flex-col items-center justify-center h-full min-h-[60%] z-20 text-center text-white px-4"> {/* Increased min-height */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-32">Supernatural Canada 2024</h1>
          <p className="text-lg md:text-2xl mb-6">Click the link below to register</p>
          <a
            href="http://bit.ly/supernaturalcanada2024"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white font-bold py-4 px-8 rounded"
          >
            Register
          </a>
        </div>
      </Parallax>
      <div className='mt-24'>
        <CountdownTimer />
      </div>
      <div className='mt-24'>
        <SCInfo />
      </div>
      <div className='mt-24'>
        <EventSchedule />
      </div>
    </>
  );
};

export default HeroSection;
