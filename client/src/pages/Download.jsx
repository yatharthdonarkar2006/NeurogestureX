import { motion } from 'framer-motion';
import { Download, Smartphone, Monitor, Tablet } from 'lucide-react';

const DownloadPage = () => {
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
            Download TeleRehabX
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400 transition-colors">
            Access your therapy plans anywhere, anytime. Available on all major platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* iOS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-colors duration-300"
          >
            <div className="h-20 w-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 transition-colors">
              <Smartphone className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">iOS App</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 transition-colors">For iPhone and iPad. Requires iOS 14.0 or later.</p>
            <button className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors shadow-lg w-full">
              <Download className="mr-2 h-5 w-5" />
              Download on App Store
            </button>
          </motion.div>

          {/* Android */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-colors duration-300"
          >
            <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 transition-colors">
              <Smartphone className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Android App</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 transition-colors">For Android devices. Requires Android 8.0 or later.</p>
            <button className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 transition-colors shadow-lg w-full">
              <Download className="mr-2 h-5 w-5" />
              Get it on Google Play
            </button>
          </motion.div>

          {/* Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-colors duration-300"
          >
            <div className="h-20 w-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 transition-colors">
              <Monitor className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Desktop App</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 transition-colors">For Windows and macOS. Best for motion tracking.</p>
            <button className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors shadow-lg w-full">
              <Download className="mr-2 h-5 w-5" />
              Download for Desktop
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;