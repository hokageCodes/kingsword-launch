"use client";
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

interface VolunteerFormValues {
  name: string;
  email: string;
  phone: string;
  team: string;
}

const initialValues: VolunteerFormValues = {
  name: '',
  email: '',
  phone: '',
  team: ''
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string().required('Required'),
  team: Yup.string().required('Required')
});

const VolunteerForm: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: VolunteerFormValues, { setSubmitting, resetForm }: any) => {
    if (!db) {
      toast.error("Firestore is not initialized");
      setSubmitting(false);
      return;
    }

    try {
      // Check if the email already exists
      const q = query(collection(db, 'volunteers'), where('email', '==', values.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Email already exists
        setErrorMessage("Email already in use. Please use a different email.");
        setSuccessMessage(null); // Clear any previous success message
        setSubmitting(false);
        return;
      }

      // Add document to Firestore
      await addDoc(collection(db, 'volunteers'), values);

      toast.success("Thank you for volunteering!");
      setSuccessMessage("Thank you for volunteering! We will reach out to you shortly.");
      setErrorMessage(null); // Clear any previous error message
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to submit the form. Please try again.");
      setErrorMessage("Failed to submit the form. Please try again.");
      setSuccessMessage(null); // Clear any previous success message
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="flex flex-wrap min-h-screen">
      <ToastContainer />
      <div className="w-full md:w-1/2 bg-black text-white p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Volunteer With Us</h1>
        <p className="mb-3">
          1 Peter 4:10 - As each one has received a gift, minister it to one another, as good stewards of the manifold grace of God.
        </p>
        <p>
          Join our church community and share your talents to help us grow together. Whether you&#39;re drawn to teaching children, organizing events, or leading worship, there&#39;s a place for you here.
        </p>
      </div>
      <div className="w-full md:w-1/2 p-12 flex justify-center items-center bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-lg">
              {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
              {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-6">
                <label htmlFor="team" className="block text-gray-700 text-sm font-bold mb-2">Desired Team:</label>
                <Field
                  as="select"
                  id="team"
                  name="team"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">--Please choose an option--</option>
                  <option value="Choir">Choir</option>
                  <option value="Ushering">Ushering</option>
                  <option value="Protocol">Protocol</option>
                  <option value="Communications">Communications</option>
                  <option value="Media">Media</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Admin">Admin</option>
                  <option value="Facility">Facility</option>
                  <option value="Children’s Ministry">Children&#39;s Ministry</option>
                </Field>
                <ErrorMessage name="team" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VolunteerForm;
