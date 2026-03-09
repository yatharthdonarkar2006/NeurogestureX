import { useState } from 'react';

const BasicInfo = ({ user }) => {
  const [status, setStatus] = useState(user?.therapistProfile?.availabilityStatus || 'online');

  return (
    <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between border border-transparent dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center space-x-4">
        <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden transition-colors">
            {user?.therapistProfile?.profilePhoto ? (
                <img src={user.therapistProfile.profilePhoto} alt="Profile" className="h-full w-full object-cover" />
            ) : (
                <span className="text-2xl text-gray-500 dark:text-gray-400 transition-colors">{user?.fullName?.charAt(0) || 'T'}</span>
            )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{user?.fullName || 'Therapist Name'}</h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">{user?.therapistProfile?.specialization || 'General Therapist'}</p>
          <div className="flex items-center mt-2 space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full transition-colors ${user?.therapistProfile?.verificationStatus === 'verified' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'}`}>
              {user?.therapistProfile?.verificationStatus === 'verified' ? 'Verified Professional' : 'Verification Pending'}
            </span>
            <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-full px-2 py-1 transition-colors">
                <div className={`h-2 w-2 rounded-full mr-2 transition-colors ${status === 'online' ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-500'}`}></div>
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-transparent text-xs border-none focus:ring-0 p-0 text-gray-700 dark:text-gray-300 transition-colors"
                >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;