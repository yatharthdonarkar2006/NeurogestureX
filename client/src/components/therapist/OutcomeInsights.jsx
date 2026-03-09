const OutcomeInsights = () => {
    return (
        <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-6 border border-transparent dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">AI Therapy Outcome Insights</h3>
            
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1 transition-colors">
                        <span className="text-gray-700 dark:text-gray-300 transition-colors">Overall Therapy Success Rate</span>
                        <span className="font-medium text-green-600 dark:text-green-400 transition-colors">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2 transition-colors">
                        <div className="bg-green-500 h-2 rounded-full transition-colors" style={{ width: '88%' }}></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-100 dark:border-red-900/50 transition-colors">
                        <p className="text-xs font-bold text-red-800 dark:text-red-400 uppercase transition-colors">Dropout Risk</p>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1 transition-colors">No data available yet.</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-100 dark:border-green-900/50 transition-colors">
                        <p className="text-xs font-bold text-green-800 dark:text-green-400 uppercase transition-colors">High Improver</p>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1 transition-colors">No data available yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutcomeInsights;