import React from "react";

const Contact = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Contact Information */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Get in Touch</h3>
          <p className="text-gray-600">
            I’m always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-blue-100 rounded-full">📍</span>
              <p className="text-gray-700">Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="p-3 bg-green-100 rounded-full">📧</span>
              <p className="text-gray-700">saenterprise67811@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="p-3 bg-yellow-100 rounded-full">📞</span>
              <p className="text-gray-700">+880 1234-567890</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
