const SecureNotes = () => {
    return (
        <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-6 border border-transparent dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Secure Therapy Notes</h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-4 transition-colors">
                <div className="flex">
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700 dark:text-yellow-400 transition-colors">
                            Notes are encrypted and compliant with health data standards.
                        </p>
                    </div>
                </div>
            </div>
            <button className="w-full border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                + Create New Session Note
            </button>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-800 rounded-md transition-colors">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Session #45 - Alice Smith</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Oct 24, 2023</span>
                </div>
            </div>
        </div>
    );
};

export default SecureNotes;