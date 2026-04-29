import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isServices = location.pathname === '/services';
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0.8rem 0',
        pointerEvents: 'auto',
        background: 'rgba(10, 10, 11, 0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 101 }}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <BrandLogo height="45px" />
          </Link>
        </div>

        {/* Desktop Links (Hidden on small screens via CSS class) */}
        <div className="nav-links-desktop" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              color: isHome ? '#00f2ff' : 'inherit',
              textDecoration: 'none',
              fontWeight: isHome ? 600 : 400
            }}
          >
            Home
          </Link>
          <Link
            to={isHome ? "#services" : "/#services"}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              color: isServices ? '#00f2ff' : 'inherit',
              textDecoration: 'none',
              fontWeight: isServices ? 600 : 400
            }}
          >
            Services
          </Link>
          <Link
            to="/about"
            style={{
              color: isAbout ? '#00f2ff' : 'inherit',
              textDecoration: 'none',
              fontWeight: isAbout ? 600 : 400
            }}
          >
            About
          </Link>
          <Link
            to={isHome ? "#contact" : "/#contact"}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn btn-primary"
            style={{
              padding: '0.5rem 1.5rem',
              background: isContact ? 'linear-gradient(135deg, #00f2ff 0%, #7000ff 100%)' : ''
            }}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'white', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            zIndex: 101
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              background: 'rgba(19, 19, 20, 0.98)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              zIndex: 100
            }}
          >
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '2rem', color: isHome ? '#00f2ff' : 'white', textDecoration: 'none' }}>Home</Link>
            <Link to={isHome ? "#services" : "/#services"} onClick={(e) => {
              setIsMobileMenuOpen(false);
              if (isHome) {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }
            }} style={{ fontSize: '2rem', color: isServices ? '#00f2ff' : 'white', textDecoration: 'none' }}>Services</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '2rem', color: isAbout ? '#00f2ff' : 'white', textDecoration: 'none' }}>About</Link>
            <Link to={isHome ? "#contact" : "/#contact"} onClick={(e) => {
              setIsMobileMenuOpen(false);
              if (isHome) {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }} className="btn btn-primary" style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}>Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
