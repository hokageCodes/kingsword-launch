import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const ReflectionSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="relative group w-72 h-72 rounded-full overflow-hidden shadow-lg">
            <img
              src="/assets/pst.webp"
              alt="Pastor"
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
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
            <p className="text-lg text-gray-600">Senior Pastor</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#000] mb-6">Reflections on Supernatural Canada</h2>
          <div className="text-left space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
            <p>
              Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
            </p>
            <p>
              Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
            <p>
              Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReflectionSection;
