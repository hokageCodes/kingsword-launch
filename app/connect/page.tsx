"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebaseConfig'; // Adjust the path as necessary
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Define the type for your group
interface Group {
    title: string;
    imageUrl: string;
    buttonText: string;
    link: string; 
}

// Define the groups array with the specified type
const groups: Group[] = [
    { title: 'Small Groups', imageUrl: '/assets/conn1.webp', buttonText: 'Join now', link: '/small-groups' },
    { title: 'Service Teams', imageUrl: '/assets/conn2.webp', buttonText: 'Join now', link: '/service-teams' },
    { title: "Children's Ministry", imageUrl: '/assets/conn3.webp', buttonText: 'Get Involved', link: '/childrens-ministry' },
    { title: 'KMI Partners', imageUrl: '/assets/conn4.webp', buttonText: 'Get Involved', link: '/kmi-partners' },
    { title: "Men's Group", imageUrl: '/assets/conn5.webp', buttonText: 'Join now', link: '/mens-group' },
    { title: "Women's Group", imageUrl: '/assets/conn6.webp', buttonText: 'Join now', link: '/womens-group' },
    { title: 'His & Hers', imageUrl: '/assets/conn7.webp', buttonText: 'More Details', link: '/his-hers' },
    { title: 'Mr. & Mrs.', imageUrl: '/assets/conn8.webp', buttonText: 'More Details', link: '/mr-mrs' },
    { title: 'Career Advocacy Network - CAN', imageUrl: '/assets/conn4.webp', buttonText: 'More Details', link: '/career-advocacy-network' },
    { title: 'Business Advocacy Network', imageUrl: '/assets/conn6.webp', buttonText: 'More Details', link: '/business-advocacy-network' },
    { title: 'Marriage Advocacy Network', imageUrl: '/assets/conn7.webp', buttonText: 'More Details', link: '/marriage-advocacy-network' },
    { title: 'Mental and Total Wholeness', imageUrl: '/assets/conn8.webp', buttonText: 'More Details', link: '/mental-total-wholeness' }
];

const ConnectPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [connectForms, setConnectForms] = useState<any[]>([]);

    const openModal = (groupTitle: string) => {
        setSelectedGroup(groupTitle);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchConnectForms = async () => {
            try {
                if (!db) {
                    throw new Error('Firestore is not initialized.');
                }
                const querySnapshot = await getDocs(collection(db, 'connect-form'));
                const forms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setConnectForms(forms);
            } catch (error) {
                console.error('Error fetching connect forms:', error.message);
                toast.error('Failed to fetch connect forms.');
            }
        };

        fetchConnectForms();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsLoading(false), 2000); // Simulate a delay
        return () => clearTimeout(timeoutId);
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phoneNumber: '',
            details: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number must be numeric').required('Required'),
            details: Yup.string().max(500, 'Must be 500 characters or less').required('Required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                if (!db) {
                    throw new Error('Firestore is not initialized.');
                }
                // Add form data to Firestore
                await addDoc(collection(db, 'join-us'), {
                    ...values,
                    group: selectedGroup
                });
                toast.success("Thank you for reaching out!");
                closeModal(); // Close modal after successful submission
            } catch (error) {
                toast.error("Something went wrong. Please try again.");
            } finally {
                setSubmitting(false);
                resetForm();
            }
        },
    });

    return (
        <div className="container mx-auto sm:px-6 lg:px-8">
            {/* Banner with Overlaid Text */}
            <div className="relative text-center py-24">
                {isLoading ? (
                    <Skeleton height="100vh" width="100%" />
                ) : (
                    <Image
                        src="/assets/hero1.webp"
                        alt="Connect"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className="absolute inset-0 w-full h-full"
                    />
                )}
                <div className="relative flex justify-center items-center h-full">
                    {isLoading ? (
                        <Skeleton width={200} height={50} />
                    ) : (
                        <h1 className="text-4xl font-bold text-black">Connect</h1>
                    )}
                </div>
            </div>

            {/* Groups */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 py-8 mx-auto max-w-7xl">
                {groups.map(group => (
                    <div key={group.title} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {isLoading ? (
                            <Skeleton height="200px" width="100%" />
                        ) : (
                            <Image
                                src={group.imageUrl}
                                alt={group.title}
                                width={300}
                                height={200}
                                layout="responsive"
                                objectFit="cover"
                                quality={100}
                            />
                        )}
                        <div className="p-4 text-center">
                            {isLoading ? (
                                <>
                                    <Skeleton width="60%" height={24} />
                                    <Skeleton width="40%" height={20} className="mt-4" />
                                </>
                            ) : (
                                <>
                                    <h3 className="font-bold text-lg">{group.title}</h3>
                                    <button onClick={() => openModal(group.title)} className="mt-4 py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                                        {group.buttonText}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Join Form */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Join {selectedGroup}</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`block w-full mb-3 px-3 py-2 border rounded ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-xs mb-2">{formik.errors.name}</div>
                            ) : null}
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`block w-full mb-3 px-3 py-2 border rounded ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-xs mb-2">{formik.errors.email}</div>
                            ) : null}
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`block w-full mb-3 px-3 py-2 border rounded ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : ''}`}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div className="text-red-500 text-xs mb-2">{formik.errors.phoneNumber}</div>
                            ) : null}
                            <textarea
                                id="details"
                                name="details"
                                placeholder="Details"
                                rows={4}
                                value={formik.values.details}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`block w-full mb-3 px-3 py-2 border rounded ${formik.touched.details && formik.errors.details ? 'border-red-500' : ''}`}
                            />
                            {formik.touched.details && formik.errors.details ? (
                                <div className="text-red-500 text-xs mb-2">{formik.errors.details}</div>
                            ) : null}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default ConnectPage;
