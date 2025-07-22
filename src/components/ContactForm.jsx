import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Thank you for reaching out!");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px' }}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px' }}
      />

      <label>Message</label>
      <textarea
        name="message"
        rows="5"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
      ></textarea>

      <button
        type="submit"
        style={{
          marginTop: '15px',
          marginBottom: '10px',
          backgroundColor: '#4f4e53',
          color: 'white',
          padding: '10px 20px ',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background 0.3s',
          alignItems:'center'
        }}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
