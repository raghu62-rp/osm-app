import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="centered-container" style={{ padding: '3rem 0' }}>
      <h2>Contact Us</h2>

      <p style={{ maxWidth: 800, margin: '1rem auto', color: 'var(--text-color, #213547)' }}>
        Have questions or need help with an order? Reach out — we'd love to help.
      </p>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 420 }}>
          <h3>Customer Support</h3>
          <p>
            Email: support@shopeasy.example
            <br />Phone: +1 (555) 123-4567
          </p>
        </div>

        <div style={{ maxWidth: 420 }}>
          <h3>Send us a message</h3>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input type="text" placeholder="Your name" style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid #ddd' }} />
            <input type="email" placeholder="Your email" style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid #ddd' }} />
            <textarea placeholder="Message" rows="4" style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid #ddd' }} />
            <button type="submit">Send message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
