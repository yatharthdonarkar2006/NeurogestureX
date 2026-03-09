const RemindersSection = () => {
    return (
        <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-6 border border-transparent dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Smart Reminders</h3>
            <ul className="space-y-3">
                <li className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">Upcoming Session: 2:00 PM</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Video call with John Doe</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-yellow-500"></div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">Pending Report Upload</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Upload progress report for Charlie Brown</p>
                    </div>
                </li>
                 <li className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-red-500"></div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">License Expiring Soon</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Renew within 30 days to avoid account suspension.</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default RemindersSection;