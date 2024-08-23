// EventInfoSection.tsx
import React from 'react';

const EventInfoSection = () => {
  return (
    <section className="bg-[#FEFBF6] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Event Details</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Date & Time */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-black">Date & Time</h3>
            <p className="text-lg mb-2">September 6-8, 2024</p>
            <p className="text-lg">9:00 AM - 6:00 PM Daily</p>
          </div>

          {/* Location */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-black">Location</h3>
            <p className="text-lg mb-2">KingsWord Calgary</p>
            <p className="text-lg">5811 46th Street SE</p>
            <p className="text-lg">Calgary, AB</p>
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-black">Contact Information</h3>
            <p className="text-lg mb-2">Phone: +1 (587) 210-5340</p>
            <p className="text-lg mb-2">Email: <a href="mailto:admin@kingsword.ca" className="underline">admin@kingsword.ca</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventInfoSection;
