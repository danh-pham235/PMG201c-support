import React from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, FileText } from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: Target,
      title: "Grade Management",
      description: "Efficiently manage student grades with intuitive interface and bulk updates."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor student performance with visual charts and real-time alerts."
    },
    {
      icon: FileText,
      title: "Report Generation",
      description: "Create customizable reports for individual students or entire classes."
    }
  ];

  return (
    <section id="features" className="py-20 w-full bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage your project grading efficiently
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-purple-200 mb-4 shadow">
                {React.createElement(feature.icon, { className: "w-7 h-7 text-cyan-700" })}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;