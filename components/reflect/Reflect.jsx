import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const ReflectionSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="relative group w-72 h-72 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/assets/pst.webp"
              alt="Pastor Muyiwa Oseni"
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 group-hover:opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-2xl"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-2xl"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-2xl"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <h3 className="text-3xl font-bold text-[#000]">Pastor Muyiwa Oseni</h3>
            <p className="text-lg text-gray-600">Canada Zonal Pastor</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#000] mb-6">Reflections on Supernatural Canada</h2>
          <div className="text-left space-y-4">
            <p>
              As we prepare for Supernatural Canada 2024, I reflect on the
              impact of meetings like this over the years. Every time we come into God&#39;s
              presence for weekly meetings, we are empowered and instructed; however,
              conventions like Supernatural Canada set us up for major boosts.
            </p>
            <p>
              As I reflect further, I think of how a woman regularly cleans
              her home and buys new furniture and paintings to keep the house how she wants
              it, but then she may embark on remodelling her entire home or kitchen giving it
              a whole new look. I think of Supernatural Canada as a spiritual remodeling &#8208; realignment
              to God&#39;s plan, getting a major supernatural boost for results and
              effectiveness. During and after every convention, there are always unusual testimonies
              and major shifts in people&#39;s lives &#8208; this year promises to be greater.
            </p>
            <p>
              This year, the theme of the Convention is “Goshen”. Goshen
              represents a place of refuge and blessing as experienced by the Israelites. It
              symbolizes a season of divine protection and abundance amidst challenges. The conference
              will explore how this theme resonates with our lives today, offering guidance
              and encouragement for our spiritual paths.
            </p>
            <p>
              To maximize a convention like Supernatural, it&#39;s important
              to be prepared &#8208; Heart, Mind and Body. Spending time in prayer and the Word of God
              to prepare our hearts, engaging our minds to envision possibilities in God&#39;s
              presence and clearing out schedules to avoid any distractions and support our
              focus to receive from God.
            </p>
            <p>
              I&#39;ll like to invite you to join us as
              we get set for a Spiritual remodelling and encounters in God&#39;s presence. Let&#39;s come together, with prepared hearts, to
              receive all that God has for us.
            </p>
            <p>
              It&#39;s more than an event, it&#39;s a time
              to be transformed and shifted to our next level in God. <br /> <em className='text-xl font-bold'>Come experience Goshen!</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReflectionSection;
