import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaDiscord, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {

  return (
    <div className="contact-page">
      {/* Header Section */}
      <section className="contact-header">
        <div className="header-content">
          <h1>Get In <span className="highlight">Touch</span></h1>
          <p>Have questions? We'd love to hear from you. Send us a message!</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Reach out to us through any of these channels. We're here to help!</p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-text">
                  <span className="info-label">Email</span>
                  <span className="info-value">johnalex786johnny@gmail.com</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-text">
                  <span className="info-label">Phone</span>
                  <span className="info-value">+92 3272931704</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-text">
                  <span className="info-label">Location</span>
                  <span className="info-value">KHI,PK</span>
                </div>
              </div>
            </div>

            <div className="social-contact">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="https://www.instagram.com/bkdigitalgames/" target='_blank' className="social-btn" aria-label="Instagram">
                  <FaDiscord />
                </a>
                <a href="#" className="social-btn" aria-label="Twitter">
                  <FaTwitter />
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="whatsapp-cta">
              <h3>Quick Contact</h3>
              <p>Message us directly on WhatsApp for instant support!</p>
              <a 
                href="https://wa.me/923272931704?text=Hi%20BK%20Digital%20Games!%20I%20have%20a%20question." 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                <FaWhatsapp />
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I receive my game code?</h3>
              <p>After completing your purchase, you'll receive your game code instantly via email and in your account dashboard.</p>
            </div>
            <div className="faq-item">
              <h3>Are the game codes region-locked?</h3>
              <p>Most of our codes are region-free, but please check the product description for specific regional information.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, PayPal, and various other secure payment methods.</p>
            </div>
            <div className="faq-item">
              <h3>Can I get a refund?</h3>
              <p>Due to the nature of digital products, refunds are only available if the code is invalid or already used.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
