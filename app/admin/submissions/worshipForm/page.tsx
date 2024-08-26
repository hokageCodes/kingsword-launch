"use client";
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../Layout';
import { db, collection, getDocs, deleteDoc, doc } from '../../../../firebaseConfig';
import { saveAs } from 'file-saver';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Modal from '../../../../components/delete-modal/Modal';

const WorshipPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'worshipForm'));
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(documents);
        setTotalPages(Math.ceil(documents.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemsPerPage]);

  const handleDownload = () => {
    const csvRows = [];
    csvRows.push(['S/N', 'Full Name', 'Email', 'City'].join(','));
    data.forEach((item, index) => {
      csvRows.push([
        index + 1,
        item.fullName,
        item.email,
        item.city,
      ].join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    saveAs(blob, 'worship.csv');
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteDoc(doc(db, 'worshipForm', itemToDelete));
        
        // Update the data state after deletion
        setData(prevData => {
          // Filter out the deleted item
          const updatedData = prevData.filter(item => item.id !== itemToDelete);
          
          // Update the total pages
          setTotalPages(Math.ceil(updatedData.length / itemsPerPage));
          
          return updatedData;
        });
  
      } catch (error) {
        console.error("Error deleting document: ", error);
      } finally {
        setShowModal(false);
        setItemToDelete(null);
      }
    }
  };
  

  const handleCancel = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      <div className='flex items-center justify-between mb-4'>
        <h1>Worship Events</h1>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download All as CSV
        </button>
      </div>
      {loading ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array(10).fill(null).map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Skeleton width={50} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Skeleton width={150} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Skeleton width={100} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Skeleton width={150} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Skeleton width={200} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Skeleton width={150} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No data available</td>
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
                      className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
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

      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this worship event? This action cannot be undone."
      />
    </AdminLayout>
  );
};

export default WorshipPage;
