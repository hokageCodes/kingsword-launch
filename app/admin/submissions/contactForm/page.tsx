"use client";
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../Layout';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db, collection, getDocs, deleteDoc, doc } from '../../../../firebaseConfig';
import { saveAs } from 'file-saver';

interface ContactForm {
  id: string; // Add an id field for deletion
  email: string;
  message: string;
  name: string;
  phone: string;
}

const Page = () => {
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchContactForms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contactForm'));
        const forms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ContactForm);
        setContactForms(forms);
      } catch (error) {
        console.error("Error fetching contact forms: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactForms();
  }, []);

  const handleDownload = () => {
    const csvRows = [];
    csvRows.push(['S/N', 'Name', 'Email', 'Phone', 'Message'].join(','));
    contactForms.forEach((form, index) => {
      csvRows.push([
        index + 1,
        form.name,
        form.email,
        form.phone,
        `"${form.message?.replace(/"/g, '""') || 'No message available'}"`
      ].join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    saveAs(blob, 'contact-form-submissions.csv');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'contactForm', id));
      setContactForms(contactForms.filter(form => form.id !== id));
    } catch (error) {
      console.error("Error deleting contact form: ", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const openModal = (form: ContactForm) => {
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedForm(null);
    setIsModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contactForms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contactForms.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      <div className='flex items-center justify-between mb-4'>
        <h1>Contact Form Submissions</h1>
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.message}</td>
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
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <nav>
              <ul className="flex list-none">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded hover:bg-blue-600 transition`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}

      {/* Modal for delete confirmation */}
      {isModalOpen && selectedForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete the contact form submission from {selectedForm.name}?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedForm && handleDelete(selectedForm.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Page;
