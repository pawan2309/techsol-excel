import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';

// --- CONFIGURATION ---
// PASTE YOUR GOOGLE APPS SCRIPT URL HERE
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynSxQ3_YW1Tnlk12ySwYyHv62mmxf9wMVT2kmWMfkSZfdzhDB-53Gk5zScpcQuqvLJ/exec';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'Web & App Development',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (GOOGLE_SCRIPT_URL === 'PASTE_YOUR_URL_HERE') {
      alert('Model Setup: Message simulated. (Please paste your Google Script URL in the code to enable real submissions)');
      setStatus('success');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // Since mode is 'no-cors', we won't get a readable response body, 
      // but if the fetch doesn't throw, it's generally successful.
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', serviceType: 'Web & App Development', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div style={{ background: '#131313', minHeight: '100vh', color: '#e5e2e1', paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="badge"
              style={{ marginBottom: '1.5rem' }}
            >
              Contact Us
            </motion.span>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Start Your <span style={{ color: '#00f2ff' }}>Project</span></h1>
            <p style={{ color: '#b9cacb', fontSize: '1.2rem' }}>Our architects typically respond within 12 hours.</p>
          </div>

          <div className="glass" style={{ padding: '4rem', borderRadius: '1.5rem', display: 'flex', gap: '4rem', flexWrap: 'wrap', border: '1px solid rgba(0, 242, 255, 0.1)' }}>

            {/* Contact Info Sidebar */}
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Direct <span style={{ color: '#7000ff' }}>Channels</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(112, 0, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={24} color="#7000ff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Email</div>
                    <div style={{ fontSize: '1.1rem' }}>techsol2026@gmail.com</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 242, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={24} color="#00f2ff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Location</div>
                    <div style={{ fontSize: '1.1rem' }}>Gurugram, Haryana, IN</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div style={{ flex: '2 1 400px' }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '4rem 0' }}
                  >
                    <CheckCircle size={64} color="#00f2ff" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Inquiry Received!</h2>
                    <p style={{ color: '#b9cacb', marginBottom: '2rem' }}>Your data has been secured in our system. An architect will reach out shortly.</p>
                    <button onClick={() => setStatus('idle')} className="btn" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>Send Another Message</button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="glass"
                        style={{ padding: '1rem', color: 'white', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="glass"
                        style={{ padding: '1rem', color: 'white', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        className="glass"
                        style={{ padding: '1rem', color: 'white', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}
                      />
                      <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        className="glass"
                        style={{ padding: '1rem', color: 'white', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}
                      />
                    </div>

                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="glass"
                      style={{ padding: '1rem', color: 'white', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)', background: '#1a1a1a' }}
                    >
                      <option>Web & App Development</option>
                      <option>Sports Data API</option>
                      <option>Pharma Publishing</option>
                      <option>Fintech & Payments</option>
                      <option>Cloud Infrastructure</option>
                      <option>Other / Consultation</option>
                    </select>

                    <textarea
                      name="message"
                      placeholder="Tell us about your project requirements..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="glass"
                      style={{ padding: '1rem', color: 'white', borderRadius: '0.5rem', height: '150px', border: '1px solid rgba(255,255,255,0.05)', resize: 'none' }}
                    ></textarea>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn btn-primary"
                      style={{ justifyContent: 'center', padding: '1.2rem', gap: '0.8rem' }}
                    >
                      {status === 'loading' ? (
                        <>Processing... <Loader2 className="animate-spin" size={20} /></>
                      ) : (
                        <>Send Message <Send size={20} /></>
                      )}
                    </button>
                    {status === 'error' && <p style={{ color: '#ff4b4b', textAlign: 'center', fontSize: '0.9rem' }}>Something went wrong. Please try again.</p>}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
