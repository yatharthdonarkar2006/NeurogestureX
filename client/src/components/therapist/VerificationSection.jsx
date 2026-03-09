import React, { useRef, useState } from 'react';

const VerificationSection = ({ user }) => {
    const fileInputRef = useRef(null);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadStatus('uploading');
            // Simulate upload delay
            setTimeout(() => {
                setUploadStatus('success');
                alert(`File ${file.name} uploaded successfully!`);
            }, 1500);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-6 border border-transparent dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">License & Verification</h3>
            
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className={`p-2 rounded-full transition-colors ${user?.therapistProfile?.verificationStatus === 'verified' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">Verification Status</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">{user?.therapistProfile?.verificationStatus === 'verified' ? 'Verified Professional' : 'Pending Review'}</p>
                    </div>
                </div>
                {user?.therapistProfile?.verificationStatus !== 'verified' && (
                    <>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleFileChange} 
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                        <button 
                            onClick={handleUploadClick}
                            disabled={uploadStatus === 'uploading' || uploadStatus === 'success'}
                            className={`text-xs px-3 py-1 rounded text-white transition-colors ${uploadStatus === 'success' ? 'bg-green-600 dark:bg-green-700' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
                        >
                            {uploadStatus === 'uploading' ? 'Uploading...' : uploadStatus === 'success' ? 'Uploaded' : 'Upload Documents'}
                        </button>
                    </>
                )}
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-md transition-colors">
                <div className="flex justify-between text-sm mb-1 transition-colors">
                    <span className="text-gray-600 dark:text-gray-400 transition-colors">License Expiry</span>
                    <span className="text-orange-600 dark:text-orange-400 font-medium transition-colors">28 Days Left</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 transition-colors">
                    <div className="bg-orange-500 h-1.5 rounded-full transition-colors" style={{ width: '85%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default VerificationSection;