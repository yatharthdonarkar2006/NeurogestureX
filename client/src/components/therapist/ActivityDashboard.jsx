const ActivityDashboard = () => {
  // Mock data
  const stats = [
    { label: 'Total Therapies', value: 0, color: 'bg-blue-500 dark:bg-blue-400' },
    { label: 'Completed', value: 0, color: 'bg-green-500 dark:bg-green-400' },
    { label: 'Ongoing', value: 0, color: 'bg-yellow-500 dark:bg-yellow-400' },
    { label: 'Missed/Cancelled', value: 0, color: 'bg-red-500 dark:bg-red-400' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-6 border border-transparent dark:border-slate-800 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Activity Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-100 dark:border-slate-700 transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{stat.value}</p>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mt-2 transition-colors">
              <div className={`${stat.color} h-1.5 rounded-full transition-colors`} style={{ width: '0%' }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Upcoming Sessions</h4>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-400 transition-colors">
          No upcoming sessions scheduled.
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard;