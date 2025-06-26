import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  feedback: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (): void => {
    if (formData.name && formData.email && formData.feedback) {
      setFormData({ name: "", email: "", feedback: "" });
      alert("Thank you for your feedback!");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <section id="contact" className="py-20 w-full bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600">
            Have questions or feedback? Fill out the form below and we’ll get back to you soon!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
              alt="Contact illustration"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Feedback</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={4}
                  placeholder="Your feedback..."
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-400 text-white font-semibold rounded-lg shadow hover:scale-105 transition-all"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;