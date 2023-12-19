// src/components/AdmissionForm.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './AdmissionForm.css'; // Import your CSS file
import image1 from '../Images/illustration1.jpg';
import image2 from '../Images/illustration2.jpg';
import image3 from '../Images/illustration.png';
import image4 from '../Images/illustration4.png';
import image5 from '../Images/illustration5.jpg';
import image6 from '../Images/illustration6.jpg';
import image7 from '../Images/illustration7.jpg';
import image8 from '../Images/illustration8.jpg';
import image from '../Images/image1.jpg';
import image9 from '../Images/illustration3.png';
import image10 from '../Images/illustration10.jpg';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    selectedBatch: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const isDuplicate = await isDuplicateEntry();
    // if (isDuplicate) {
    //   return;
    // }

    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (formData.age < 18) {
      errors.age = 'Age must be 18 or older';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.selectedBatch) {
      errors.selectedBatch = 'Please select a batch';
    }

    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    
    setIsLoading(true);
    try {
      
      console.log(formData);
      const response = await fetch('http://localhost:5000/api/admission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowPaymentModal(true);
        setSubmissionStatus({ type: 'success', message: 'Admission successful!' });
      } else {
        setSubmissionStatus({ type: 'error', message: 'Admission failed' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus({ type: 'error', message: 'Internal Server Error' });
    } finally {
      setIsLoading(false);
    }


    try {
      // Simulate asynchronous form submission
      setShowPaymentModal(true);
      setSubmissionStatus({ type: 'success', message: 'Admission successful!' });
    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus({ type: 'error', message: 'Internal Server Error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentConfirmation = () => {
    setShowPaymentModal(false);
    alert('Proceeded to Payment!');
  };

  const handlePayLater = () => {
    setShowPaymentModal(false);
    alert('Registration Email Sent.');
    const emailLink = `mailto:${formData.email}?subject=Payment%20Reminder&body=Dear%20${formData.firstName},%0A%0AThank%20you%20for%20your%20interest%20in%20our%20monthly%20class.%20You%20can%20pay%20later.%0A%0ABest%20regards,%0AYour%20Institution`;
    window.open(emailLink, '_blank');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

/*   const isDuplicateEntry = async () => {
    try {
      
      const response = await fetch('/api/checkDuplicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (data.duplicate) {
        setSubmissionStatus({
          type: 'error',
          message: 'Duplicate entry: User with the same name and email already exists.',
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking duplicate entry:', error);
      return true;
    }
  }; */

  return (
    <div className="form-container">
      <div className="image-column">
        <img src={image5} alt="Image 1" />
        <img src={image2} alt="Image 2" />
        <img src={image9} alt="Image 2" />
      </div>
      <div className="form-column">
        <form onSubmit={handleSubmit}>
          <div className="image-gallery">
            <img src={image} alt="Image" />
          </div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            {formErrors.age && <span className="error-message">{formErrors.age}</span>}
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </label>
          <br />
          <label>
            Select Batch:
            <select
              name="selectedBatch"
              value={formData.selectedBatch}
              onChange={handleChange}
              required
            >
              <option value="">Select Batch</option>
              <option value="6-7AM">6-7AM</option>
              <option value="7-8AM">7-8AM</option>
              <option value="8-9AM">8-9AM</option>
              <option value="5-6PM">5-6PM</option>
            </select>
          </label>
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <div className="image-gallery">
          <img src={image1} alt="Image 5" />
          <span className="image-gap" />
          <img src={image8} alt="Image 6" />
          <span className="image-gap" />
          <img src={image4} alt="Image 7" />
          <span className="image-gap" />
          <img src={image3} alt="Image 8" />
        </div>
      </div>
      <Modal
        isOpen={showPaymentModal}
        contentLabel="Payment Modal"
        onRequestClose={() => setShowPaymentModal(false)}
        className="payment-modal"
        overlayClassName="modal-overlay"
      >
        <p>You need to pay {formData.age >= 18 ? '500 INR' : '0 INR'} for the monthly class.</p>
        <button onClick={handlePaymentConfirmation}>Proceed</button>
        <button onClick={handlePayLater}>Pay Later</button>
      </Modal>
      {submissionStatus && (
        <p className={submissionStatus.type === 'success' ? 'success-message' : 'error-message'}>
          {submissionStatus.message}
        </p>
      )}
      <div className="image-column">
        <img src={image6} alt="Image 3" />
        <img src={image7} alt="Image 4" />
        <img src={image10} alt="Image 4" />
      </div>
    </div>
  );
};

export default AdmissionForm;
