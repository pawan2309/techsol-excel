import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynSxQ3_YW1Tnlk12ySwYyHv62mmxf9wMVT2kmWMfkSZfdzhDB-53Gk5zScpcQuqvLJ/exec';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'Web & App Development',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error

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
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', serviceType: 'Web & App Development', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '80px 0', background: '#0e0e0f' }}>
      <div className="container">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="badge"
              style={{ marginBottom: '1.5rem' }}
            >
              Contact Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}
            >
              Start Your <span style={{ color: '#00f2ff' }}>Project</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ color: '#b9cacb', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
            >
              Our architects typically respond within 12 hours. Let's build something exceptional together.
            </motion.p>
          </div>

          <div
            className="glass"
            style={{
              padding: '3rem',
              borderRadius: '2rem',
              display: 'flex',
              gap: '4rem',
              flexWrap: 'wrap',
              border: '1px solid rgba(0, 242, 255, 0.1)',
            }}
          >
            {/* Contact Info Sidebar */}
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Direct <span style={{ color: '#7000ff' }}>Channels</span></h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(112, 0, 255, 0.05)', border: '1px solid rgba(112, 0, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={28} color="#7000ff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>techsol2026@gmail.com</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(0, 242, 255, 0.05)', border: '1px solid rgba(0, 242, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={28} color="#00f2ff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>Gurugram, Haryana, IN</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div style={{ flex: '2 1 500px' }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '3rem 0' }}
                  >
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 242, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                      <CheckCircle size={48} color="#00f2ff" />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Inquiry Received!</h2>
                    <p style={{ color: '#b9cacb', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Your data has been secured in our system. An architect will reach out shortly.</p>
                    <button onClick={() => setStatus('idle')} className="btn" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>Send Another Message</button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                      <div className="input-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', color: 'white', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)', outline: 'none', transition: 'border-color 0.3s' }}
                          onFocus={(e) => e.target.style.borderColor = '#00f2ff'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                      </div>
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', color: 'white', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)', outline: 'none', transition: 'border-color 0.3s' }}
                          onFocus={(e) => e.target.style.borderColor = '#00f2ff'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                      <div className="input-group">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number (Optional)"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', color: 'white', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)', outline: 'none' }}
                        />
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          name="company"
                          placeholder="Company Name"
                          value={formData.company}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', color: 'white', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '1.2rem', background: '#1a1a1c', color: 'white', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)', outline: 'none', cursor: 'pointer' }}
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
                      style={{ width: '100%', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', color: 'white', borderRadius: '1rem', height: '150px', border: '1px solid rgba(255,255,255,0.08)', outline: 'none', resize: 'none' }}
                    ></textarea>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn btn-primary"
                      style={{ justifyContent: 'center', padding: '1.2rem', gap: '1rem', fontSize: '1.1rem' }}
                    >
                      {status === 'loading' ? (
                        <>Processing... <Loader2 className="animate-spin" size={24} /></>
                      ) : (
                        <>Send Message <Send size={24} /></>
                      )}
                    </button>
                    {status === 'error' && <p style={{ color: '#ff4b4b', textAlign: 'center', fontSize: '1rem', marginTop: '0.5rem' }}>Something went wrong. Please try again.</p>}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
