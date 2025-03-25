import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans relative">
      {/* Hero Section */}
      <header className="bg-gradient-to-t from-green-500 to-emerald-600 text-white py-20 relative overflow-hidden">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 2 }}
          transition={{ duration: 3 }}
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to Your Digital Library
          </h1>
          <p className="text-lg mb-6">
            Revolutionize the way you manage and access your library.
          </p>
          <Link
            to="/login"
            className="bg-white text-green-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 animate-pulse transition"
          >
            Get Started
          </Link>
        </motion.div>
        <motion.div
          // className="absolute top-3 left-0 w-full h-full bg-gradient-to-t from-green-700 to-transparent opacity-100 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </header>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Trusted by Libraries Worldwide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { count: "1,200+", text: "Libraries Using Our System" },
              { count: "500,000+", text: "Books Managed" },
              { count: "1M+", text: "Transactions Processed" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-4xl font-extrabold text-green-600">
                  {stat.count}
                </h3>
                <p className="text-gray-600">{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 mb-8">
            A seamless experience for library administrators and users alike.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Comprehensive Analytics",
                description: "Gain insights into borrowing trends and user behavior.",
              },
              {
                title: "Smart Notifications",
                description: "Receive alerts for overdue books and pending returns.",
              },
              {
                title: "User-Centric Design",
                description: "Intuitive interfaces that make navigation effortless.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-green-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "Our library operations have never been smoother. The system is a lifesaver!",
                name: "- Sarah K.",
              },
              {
                quote:
                  "I love how easy it is to track books and transactions. Highly recommend!",
                name: "- Daniel T.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <p className="text-green-600 font-bold mt-4">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-green-600 text-white py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">Subscribe to our newsletter for the latest updates.</p>
          <div className="flex justify-center gap-4">
            <input
              type="email"
              className="px-4 py-2 rounded-lg text-gray-800"
              placeholder="Enter your email"
            />
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-lg font-semibold">Stay Connected</h3>
          <div className="flex justify-center space-x-6 mt-4">
            <FaFacebook className="text-white text-2xl hover:text-gray-400 cursor-pointer" />
            <FaTwitter className="text-white text-2xl hover:text-gray-400 cursor-pointer" />
            <FaInstagram className="text-white text-2xl hover:text-gray-400 cursor-pointer" />
            <FaLinkedin className="text-white text-2xl hover:text-gray-400 cursor-pointer" />
          </div>
          <p className="text-sm mt-4">
            &copy; 2025 Library Management System. All rights reserved.
          </p>
          <p className="mt-2">Designed with ❤️ by Rogers_Lazer</p>
        </div>
      </footer>

      {/* Back-to-Top Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 focus:outline-none"
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ⬆️
      </motion.button>
    </div>
  );
};

export default Home;
