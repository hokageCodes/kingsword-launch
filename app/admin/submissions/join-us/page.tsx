"use client";
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../Layout';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db, collection, getDocs, deleteDoc, doc } from '../../../../firebaseConfig';
import { saveAs } from 'file-saver';

interface JoinUsForm {
  id: string;
  name: string;
  email: string;
  phoneNumber: string; // Correct field name
  details: string;
  group: string;
}

const groups = [
  { title: 'Small Groups', value: 'Small Groups' },
  { title: 'Service Teams', value: 'Service Teams' },
  { title: "Children's Ministry", value: "Children's Ministry" },
  { title: 'KMI Partners', value: 'KMI Partners' },
  { title: "Men's Group", value: "Men's Group" },
  { title: "Women's Group", value: "Women's Group" },
  { title: 'His & Hers', value: 'His & Hers' },
  { title: 'Mr. & Mrs.', value: 'Mr. & Mrs.' },
  { title: 'Career Advocacy Network - CAN', value: 'Career Advocacy Network - CAN' },
  { title: 'Business Advocacy Network', value: 'Business Advocacy Network' },
  { title: 'Marriage Advocacy Network', value: 'Marriage Advocacy Network' },
  { title: 'Mental and Total Wholeness', value: 'Mental and Total Wholeness' }
];

const JoinUsPage = () => {
  const [joinUsForms, setJoinUsForms] = useState<JoinUsForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedGroup, setSelectedGroup] = useState<string>(groups[0].value);
  const [selectedForm, setSelectedForm] = useState<JoinUsForm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJoinUsForms = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const querySnapshot = await getDocs(collection(db, 'join-us'));
        const forms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as JoinUsForm);
        setJoinUsForms(forms);
      } catch (error) {
        console.error("Error fetching join us forms: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchJoinUsForms();
  }, []); // Empty dependency array to run only once

  const handleDownload = () => {
    const csvRows = [];
    csvRows.push(['S/N', 'Name', 'Email', 'Phone', 'Details', 'Group'].join(','));
    joinUsForms.filter(form => form.group === selectedGroup).forEach((form, index) => {
      csvRows.push([
        index + 1,
        form.name,
        form.email,
        form.phoneNumber, // Updated field name
        `"${form.details?.replace(/"/g, '""') || 'No details available'}"`,
        form.group
      ].join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    saveAs(blob, `join-us-${selectedGroup}.csv`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'join-us', id));
      setJoinUsForms(prevForms => prevForms.filter(form => form.id !== id));
    } catch (error) {
      console.error("Error deleting join us form: ", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const openModal = (form: JoinUsForm) => {
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedForm(null);
    setIsModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredForms = joinUsForms.filter(form => form.group === selectedGroup);
  const currentItems = filteredForms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredForms.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      <div className='mb-4'>
        <h1 className="text-2xl font-semibold">Join Us Form Submissions</h1>
        <div className="my-4">
          {groups.map(group => (
            <button
              key={group.value}
              onClick={() => setSelectedGroup(group.value)}
              className={`px-4 py-2 mr-2 m-2 ${selectedGroup === group.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded hover:bg-blue-600 transition`}
            >
              {group.title}
            </button>
          ))}
        </div>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Download All as CSV
        </button>
      </div>
      {loading ? (
        <div className="space-y-4">
          <Skeleton count={5} height={50} className="mb-4" />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Current Group: {groups.find(group => group.value === selectedGroup)?.title || 'All Groups'}</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((form, index) => (
                  <tr key={form.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="relative">
                        <div
                          className={`truncate ${selectedForm?.id === form.id ? 'whitespace-normal' : 'whitespace-nowrap'}`}
                          style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {form.details || 'No details available'}
                        </div>
                        {form.details && form.details.length > 100 && (
                          <button
                            onClick={() => setSelectedForm(selectedForm?.id === form.id ? null : form)}
                            className="absolute right-0 top-0 text-blue-600 hover:text-blue-800"
                          >
                            {selectedForm?.id === form.id ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => openModal(form)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No forms available.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition disabled:opacity-50"
            >
              Previous
            </button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
      {isModalOpen && selectedForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this form submission from <strong>{selectedForm.name}</strong>?</p>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(selectedForm.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 ml-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default JoinUsPage;
