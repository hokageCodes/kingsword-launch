import React, { useState } from 'react';

const EventScheduleSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const schedule = [
    {
      day: 'Day 1',
      date: 'September 6, 2024',
      sessions: [
        {
          session: 'Evening',
          theme: 'Worship Night',
          time: '6:30 PM',
          ministers: ['Dr Kay Ijisesan', 'Pst Dotun Oragbade', 'Pastor Muyiwa Oseni', 'Eben'],
        },
      ],
    },
    {
      day: 'Day 2',
      date: 'September 7, 2024',
      sessions: [
        {
          session: 'Morning',
          theme: 'Word Feast',
          time: '11:00 AM',
          ministers: ['Dr Kay Ijisesan', 'Pst Dotun Oragbade', 'Pastor Muyiwa Oseni', 'Eben'],
        },
      ],
    },
    {
      day: 'Day 3',
      date: 'September 8, 2024',
      sessions: [
        {
          session: 'Morning',
          theme: 'Celebration Service',
          time: '9:30 AM',
          ministers: ['Dr Kay Ijisesan', 'Pst Dotun Oragbade', 'Pastor Muyiwa Oseni', 'Eben'],
        },
      ],
    },
  ];

  return (
    <section className="px-4">
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
