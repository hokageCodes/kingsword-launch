// components/Sidebar.tsx
import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaFileAlt, FaUpload, FaSignOutAlt, FaChevronDown, FaChevronUp, FaList, FaUser, FaStar } from 'react-icons/fa';

const Sidebar = () => {
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [showUploads, setShowUploads] = useState(false);

  return (
    <div className="bg-black text-white flex flex-col h-screen shadow-lg w-64">
      <div className="flex items-center p-4 bg-black">
        <div className="text-xl text-white font-bold">Kingsword Church</div>
      </div>

      <nav className="flex-1 mt-24">
        <ul>
          <li>
            <Link legacyBehavior href="/admin">
              <a className="flex items-center p-4 hover:bg-white hover:text-black">
                <FaHome className="mr-3" />
                Dashboard
              </a>
            </Link>
          </li>

          <li>
            <button
              onClick={() => setShowSubmissions(!showSubmissions)}
              className="flex items-center p-4 w-full text-left hover:bg-white hover:text-black"
            >
              <FaFileAlt className="mr-3" />
              <a href="/admin/submissions">Submissions</a>
              {showSubmissions ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
            </button>
            {showSubmissions && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link legacyBehavior href="/admin/submissions/connect-form">
                    <a className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaList className="mr-3" />
                      Connect Form
                    </a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/admin/submissions/contact-form">
                    <a className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaUser className="mr-3" />
                      Contact Form
                    </a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/admin/submissions//volunteers">
                    <a className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaStar className="mr-3" />
                      Volunteers
                    </a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/admin/submissions/worship-form">
                    <a className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaList className="mr-3" />
                      Worship Form
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => setShowUploads(!showUploads)}
              className="flex items-center p-4 w-full text-left hover:bg-black hover:text-white"
            >
              <FaUpload className="mr-3" />
              Uploads
              {showUploads ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
            </button>
            {showUploads && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link legacyBehavior href="/events-upload">
                    <a className="flex items-center p-4 hover:bg-gray-600">
                      <FaList className="mr-3" />
                      Events Upload
                    </a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/dynamic-youtube">
                    <a className="flex items-center p-4 hover:bg-gray-600">
                      <FaList className="mr-3" />
                      Dynamic YouTube
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="p-4 mt-auto bg-black text-white">
        <Link legacyBehavior href="/logout">
          <a className="flex items-center p-4 hover:bg-gray-700 w-full">
            <FaSignOutAlt className="mr-3" />
            Logout
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
