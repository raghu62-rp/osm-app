import React from 'react';

const About = () => {
  return (
    <section id="about" className="centered-container" style={{ padding: '3rem 0' }}>
      <h2>About ShopEasy</h2>
      <p style={{ maxWidth: 900, margin: '1rem auto', color: 'var(--text-color, #213547)' }}>
        ShopEasy is a modern, user-friendly online shopping experience built for
        discovery and convenience. We curate high-quality products across
        Electronics, Clothing, Home, and Sports — and make it simple to find
        exactly what you need.
      </p>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 360 }}>
          <h3>Our Mission</h3>
          <p>
            To make online shopping delightful and reliable by combining great
            design, sensible features, and friendly support.
          </p>
        </div>

        <div style={{ maxWidth: 360 }}>
          <h3>Our Values</h3>
          <ul>
            <li>Quality first</li>
            <li>Customer happiness</li>
            <li>Transparent pricing</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
