import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Flight Status App. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
          <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
