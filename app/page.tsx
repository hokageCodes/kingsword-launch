import VideoSection from '@/components/video-section/VideoSection';
import { Suspense, lazy } from 'react';
import Skeleton from 'react-loading-skeleton';

const HeroSection = lazy(() => import('../components/hero-section/HerSection'));
const WorshipPage = lazy(() => import('../components/worship-section/WorshipPage'));
const EventsSection = lazy(() => import('../components/event-section/EventSection'));
const GestureSection = lazy(() => import('../components/gesture/GestureSection'));

export default function Home() {
  return (
    <>
      <Suspense fallback={<Skeleton height={500} />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<Skeleton height={500} />}>
        <VideoSection />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <WorshipPage />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <EventsSection />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <GestureSection />
      </Suspense>
    </>
  );
}