import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-3">MyForum</h3>
          <p className="text-sm text-gray-400">Empowering discussions and ideas in a vibrant community.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/membership" className="hover:text-white">Membership</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/announcements" className="hover:text-white">Announcements</Link></li>
            <li><Link to="/support" className="hover:text-white">Support</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-gray-400 text-xl">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MyForum. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
