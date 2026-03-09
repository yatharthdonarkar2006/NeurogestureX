const PayoutSection = () => {
    return (
        <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-6 border border-transparent dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Payout & Earnings</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 dark:bg-green-900/20 py-4 px-2 rounded-lg text-center transition-colors">
                    <p className="text-sm text-green-700 dark:text-green-400 transition-colors">Total Earnings</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-300 mt-1 transition-colors">₹0</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 py-4 px-2 rounded-lg text-center transition-colors">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 transition-colors">Pending Payout</p>
                    <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300 mt-1 transition-colors">₹0</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 py-4 px-2 rounded-lg text-center transition-colors">
                    <p className="text-sm text-blue-700 dark:text-blue-400 transition-colors">Therapies Done</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-300 mt-1 transition-colors">0</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 py-4 px-2 rounded-lg text-center transition-colors">
                    <p className="text-sm text-purple-700 dark:text-purple-400 transition-colors">Avg. per Therapy</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-300 mt-1 transition-colors">₹0</p>
                </div>
            </div>
            
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Recent Payouts</h4>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors">
                No payout history available.
            </div>
        </div>
    );
};

export default PayoutSection;