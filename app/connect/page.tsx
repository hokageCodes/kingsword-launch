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
import { collection, addDoc } from 'firebase/firestore';

interface Group {
    title: string;
    imageUrl: string;
    buttonText: string;
    link: string;
}

const groups: Group[] = [
    { title: 'Small Groups', imageUrl: '/assets/conn1.webp', buttonText: 'Join now', link: '/small-groups' },
    { title: 'Service Teams', imageUrl: '/assets/conn2.webp', buttonText: 'Join now', link: '/service-teams' },
    { title: "Children's Ministry", imageUrl: '/assets/conn3.webp', buttonText: 'Get Involved', link: '/childrens-ministry' },
    { title: 'KMI Partners', imageUrl: '/assets/conn4.webp', buttonText: 'Get Involved', link: '/kmi-partners' },
    { title: "Men's Group", imageUrl: '/assets/conn5.webp', buttonText: 'Join now', link: '/mens-group' },
    { title: "Women's Group", imageUrl: '/assets/women.png', buttonText: 'Join now', link: '/womens-group' },
    { title: 'His & Hers', imageUrl: '/assets/conn7.webp', buttonText: 'More Details', link: '/his-hers' },
    { title: 'Mr. & Mrs.', imageUrl: '/assets/conn8.webp', buttonText: 'More Details', link: '/mr-mrs' },
    { title: 'Career Advocacy Network - CAN', imageUrl: '/assets/career.png', buttonText: 'More Details', link: '/career-advocacy-network' },
    { title: 'Business Advocacy Network', imageUrl: '/assets/business.png', buttonText: 'More Details', link: '/business-advocacy-network' },
    { title: 'Marriage Advocacy Network', imageUrl: '/assets/marriage.png', buttonText: 'More Details', link: '/marriage-advocacy-network' },
    { title: 'Mental and Total Wholeness', imageUrl: '/assets/wholeness.png', buttonText: 'More Details', link: '/mental-total-wholeness' }
];


const ConnectPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formSuccess, setFormSuccess] = useState<string | null>(null); // For success message
    const [isSubmittingGroupForm, setIsSubmittingGroupForm] = useState(false); // For loading state in group form

    const openModal = (groupTitle: string) => {
        setSelectedGroup(groupTitle);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsLoading(false), 2000); // Simulate a delay
        return () => clearTimeout(timeoutId);
    }, []);

    const handleGroupFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmittingGroupForm(true);
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData.entries());

        try {
            if (!db) {
                throw new Error('Firestore is not initialized.');
            }
            // Include selectedGroup in the submission data
            await addDoc(collection(db, 'group-form'), {
                ...values,
                group: selectedGroup // Add the group information here
            });
            toast.success("Thank you for joining the group! We will be in touch shortly.");
            closeModal();
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmittingGroupForm(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            details: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            details: Yup.string().max(500, 'Must be 500 characters or less').required('Required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                if (!db) {
                    throw new Error('Firestore is not initialized.');
                }
                await addDoc(collection(db, 'connect-form'), values); // Save to a different collection
                toast.success("Thank you for your submission, we will reach out to you shortly.");
                setFormSuccess("Thank you for your submission, we will reach out to you shortly.");
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

            {/* Modal for Group Join Form */}
            {showModal && selectedGroup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Join {selectedGroup}</h2>
                        <form onSubmit={handleGroupFormSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="block w-full mb-3 px-3 py-2 border rounded"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="block w-full mb-3 px-3 py-2 border rounded"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                className="block w-full mb-3 px-3 py-2 border rounded"
                                required
                            />
                            <button type="button" onClick={closeModal} className="mr-4 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmittingGroupForm}
                                className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 ${isSubmittingGroupForm ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmittingGroupForm ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Connect Form */}
            <div className="bg-white p-6 rounded-lg shadow-xl mt-8 max-w-4xl mx-auto">
                <h2 className="text-xl font-bold mb-4">Need someone to pray with you, have a Bible question, or need to meet and talk? Please reach out using the form below:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="details" className="block text-gray-700 text-sm font-bold mb-2">Additional Details:</label>
                        <textarea
                            id="details"
                            name="details"
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            rows={4}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.details && formik.errors.details ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.details && formik.errors.details ? (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.details}</div>
                        ) : null}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
                {formSuccess && <div className="mt-4 text-green-500 font-bold">{formSuccess}</div>}
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default ConnectPage;


