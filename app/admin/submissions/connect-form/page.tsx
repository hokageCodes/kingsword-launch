// ConnectFormPage.tsx
"use client";
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../Layout';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db, collection, getDocs, deleteDoc, doc } from '../../../../firebaseConfig';
import { saveAs } from 'file-saver';

interface ConnectForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  details: string;
}

const ConnectFormPage: React.FC = () => {
  const [connectForms, setConnectForms] = useState<ConnectForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedForm, setSelectedForm] = useState<ConnectForm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchConnectForms = async () => {
      try {
        if (!db) {
          throw new Error('Firestore instance is not initialized');
        }
        const querySnapshot = await getDocs(collection(db, 'connect-form'));
        const forms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ConnectForm);
        setConnectForms(forms);
      } catch (error) {
        console.error("Error fetching connect forms: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnectForms();
  }, []);

  const handleDownload = () => {
    const csvRows = [];
    csvRows.push(['S/N', 'Name', 'Email', 'Phone', 'Details'].join(','));
    connectForms.forEach((form, index) => {
      csvRows.push([
        index + 1,
        form.name,
        form.email,
        form.phone,
        `"${form.details?.replace(/"/g, '""') || 'No details available'}"`
      ].join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    saveAs(blob, 'connect-form-submissions.csv');
  };

  const handleDelete = async (id: string) => {
    try {
      if (!db) {
        throw new Error('Firestore instance is not initialized');
      }
      await deleteDoc(doc(db, 'connect-form', id));
      setConnectForms(connectForms.filter(form => form.id !== id));
    } catch (error) {
      console.error("Error deleting connect form: ", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const openModal = (form: ConnectForm) => {
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedForm(null);
    setIsModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = connectForms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(connectForms.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      <div className='flex items-center justify-between mb-4'>
        <h1 className="text-2xl font-semibold">Connect Form Submissions</h1>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.phone}</td>
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
                            className="absolute right-0 top-0 mt-2 mr-2 text-blue-500 underline"
                            style={{ marginLeft: 'auto' }}
                          >
                            {selectedForm?.id === form.id ? 'Show Less' : 'Read More'}
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
            <p className="mb-4">Are you sure you want to delete the connect form submission from {selectedForm.name}?</p>
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

export default ConnectFormPage;
