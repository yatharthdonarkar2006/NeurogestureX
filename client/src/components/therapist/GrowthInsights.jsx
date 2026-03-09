const GrowthInsights = () => {
    return (
        <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-6 border border-transparent dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Therapist Growth Insights</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md transition-colors">
                    <p className="text-xs text-purple-700 dark:text-purple-400 transition-colors">Best Performing Therapy</p>
                    <p className="text-sm font-bold text-purple-900 dark:text-purple-300 transition-colors">Physical Rehab</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md transition-colors">
                    <p className="text-xs text-blue-700 dark:text-blue-400 transition-colors">Patient Retention</p>
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-300 transition-colors">92%</p>
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2 transition-colors">Peak Working Hours</p>
                <div className="flex items-end space-x-1 h-20">
                    <div className="w-1/6 bg-gray-200 dark:bg-slate-700 h-1/2 rounded-t transition-colors"></div>
                    <div className="w-1/6 bg-blue-300 dark:bg-blue-500/50 h-3/4 rounded-t transition-colors"></div>
                    <div className="w-1/6 bg-blue-500 dark:bg-blue-500 h-full rounded-t relative group transition-colors">
                        <div className="absolute -top-6 left-0 bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">2pm</div>
                    </div>
                    <div className="w-1/6 bg-blue-400 dark:bg-blue-400/80 h-4/5 rounded-t transition-colors"></div>
                    <div className="w-1/6 bg-gray-200 dark:bg-slate-700 h-1/3 rounded-t transition-colors"></div>
                    <div className="w-1/6 bg-gray-200 dark:bg-slate-700 h-1/4 rounded-t transition-colors"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors">
                    <span>10am</span>
                    <span>12pm</span>
                    <span>2pm</span>
                    <span>4pm</span>
                    <span>6pm</span>
                    <span>8pm</span>
                </div>
            </div>
        </div>
    );
};

export default GrowthInsights;