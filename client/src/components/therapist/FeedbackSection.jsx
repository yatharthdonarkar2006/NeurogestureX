const FeedbackSection = () => {
    return (
        <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-6 border border-transparent dark:border-slate-800 transition-colors duration-300">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">Patient Feedback</h3>
                <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full transition-colors">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-bold text-yellow-800 dark:text-yellow-400 transition-colors">4.8</span>
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="border-b border-gray-100 dark:border-slate-800 pb-3 transition-colors">
                    <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100 transition-colors">Sarah J.</span>
                        <span className="text-yellow-400 text-xs">★★★★★</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">"Great session, really helped with my mobility."</p>
                </div>
                <div className="border-b border-gray-100 dark:border-slate-800 pb-3 transition-colors">
                    <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100 transition-colors">Mike T.</span>
                        <span className="text-yellow-400 text-xs">★★★★☆</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">"Good exercises, but internet connection was a bit unstable."</p>
                </div>
            </div>

            <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-md transition-colors">
                <p className="text-xs text-indigo-800 dark:text-indigo-400 font-semibold transition-colors">AI Improvement Suggestion:</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-300 transition-colors">Consider allowing 5 mins break between intense sets for elderly patients.</p>
            </div>
        </div>
    );
};

export default FeedbackSection;