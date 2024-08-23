import React, { useState } from 'react';

const EventScheduleSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const schedule = [
    {
      day: 'Day 1',
      date: 'September 6, 2024',
      sessions: [
        {
          session: 'Morning',
          theme: 'Opening Ceremony & Worship',
          time: '9:00 AM - 12:00 PM',
          ministers: ['Pastor John Doe', 'Minister Jane Smith'],
        },
        {
          session: 'Afternoon',
          theme: 'Workshops & Seminars',
          time: '1:00 PM - 4:00 PM',
          ministers: ['Dr. Alex Brown', 'Rev. Lisa Green'],
        },
        {
          session: 'Evening',
          theme: 'Networking & Dinner',
          time: '6:00 PM - 9:00 PM',
          ministers: ['Bishop David White'],
        },
      ],
    },
    {
      day: 'Day 2',
      date: 'September 7, 2024',
      sessions: [
        {
          session: 'Morning',
          theme: 'Spiritual Growth & Development',
          time: '9:00 AM - 12:00 PM',
          ministers: ['Rev. Samuel Adams', 'Sister Anna Lee'],
        },
        {
          session: 'Afternoon',
          theme: 'Panel Discussions',
          time: '1:00 PM - 4:00 PM',
          ministers: ['Pastor Michael Johnson', 'Elder Grace Owens'],
        },
        {
          session: 'Evening',
          theme: 'Praise & Worship Night',
          time: '6:00 PM - 9:00 PM',
          ministers: ['Minister Paul Roberts', 'Choir Group'],
        },
      ],
    },
    {
      day: 'Day 3',
      date: 'September 8, 2024',
      sessions: [
        {
          session: 'Morning',
          theme: 'Sunday Service',
          time: '9:00 AM - 12:00 PM',
          ministers: ['Pastor Chris Martin', 'Rev. Sarah Parker'],
        },
        {
          session: 'Afternoon',
          theme: 'Youth Forum',
          time: '1:00 PM - 4:00 PM',
          ministers: ['Youth Minister Kevin Lee', 'Sister Laura James'],
        },
        {
          session: 'Evening',
          theme: 'Closing Ceremony',
          time: '6:00 PM - 9:00 PM',
          ministers: ['Bishop William Scott'],
        },
      ],
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-center mb-8">Event Schedule</h2>

        <div className="flex justify-center mb-8">
          {schedule.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-2 mx-2 font-semibold text-lg border-b-4 ${
                activeTab === index
                  ? 'border-[#000] text-[#000]'
                  : 'border-transparent text-gray-500'
              } transition-colors duration-300`}
            >
              {day.day}
            </button>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-4xl font-bold text-[#000] mb-4">
            {schedule[activeTab].day} - {schedule[activeTab].date}
          </h3>
          <ul>
            {schedule[activeTab].sessions.map((session, index) => (
              <li key={index} className="mb-6">
                <h4 className="text-xl font-bold text-[#3D3C42] mb-2">
                  {session.session}
                </h4>
                <p className="text-lg mb-1">
                  <strong>Theme:</strong> {session.theme}
                </p>
                <p className="text-lg mb-1">
                  <strong>Time:</strong> {session.time}
                </p>
                <p className="text-lg">
                  <strong>Ministers:</strong> {session.ministers.join(', ')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
