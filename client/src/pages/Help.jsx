import { motion } from 'framer-motion';
import { HelpCircle, FileText, MessageCircle, Video } from 'lucide-react';
import { useState } from 'react';

const Help = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const faqs = [
    {
      question: "How does the AI motion tracking work?",
      answer: "Our AI uses your device's camera to map your body joints in real-time. It compares your movements against clinical standards to provide instant feedback on your form and progress."
    },
    {
      question: "Do I need special equipment?",
      answer: "No! You only need a device with a camera (smartphone, tablet, or laptop) and an internet connection. Some exercises may require basic household items like a chair or towel."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take privacy seriously. All video processing happens locally on your device when possible, and any data transmitted is encrypted with bank-level security. We are HIPAA compliant."
    },
    {
      question: "Can I connect with my own therapist?",
      answer: "Absolutely. If your therapist is on our platform, you can link your account to share progress. If not, you can invite them or use our network of certified professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl transition-colors">
            Help Center
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400 transition-colors">
            Find answers, tutorials, and support for your recovery journey.
          </p>
        </motion.div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Guides & Tutorials</h3>
            <p className="text-gray-500 dark:text-gray-400 transition-colors">Step-by-step instructions for using the platform.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
              <Video className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Video Library</h3>
            <p className="text-gray-500 dark:text-gray-400 transition-colors">Watch demos and exercise walkthroughs.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
              <MessageCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Community Forum</h3>
            <p className="text-gray-500 dark:text-gray-400 transition-colors">Connect with others and share experiences.</p>
          </motion.div>
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center transition-colors">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white transition-colors">{faq.question}</span>
                  <HelpCircle className={`h-5 w-5 text-blue-500 transform transition-transform ${activeAccordion === index ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === index && (
                  <div className="px-6 pb-4 text-gray-500 dark:text-gray-400 transition-colors">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;