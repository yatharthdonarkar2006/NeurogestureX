import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Activity, GitCompare, Share2, AlertCircle, Database } from 'lucide-react';

// Fallback data REMOVED to comply with request for no "pre-built" data
// The UI will now show empty states if the backend is unreachable.

const TeleRehabAI = () => {
    const [neuroData, setNeuroData] = useState(null);
    const [clinicalData, setClinicalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try to fetch from Python AI Server via Environment Variable or Fallback
                const aiServerUrl = import.meta.env.VITE_AI_SERVER_URL || 'http://localhost:8000';
                const neuroRes = await fetch(`${aiServerUrl}/api/neuro-metrics`);
                const clinicalRes = await fetch(`${aiServerUrl}/api/clinical-benchmarks`);
                
                if (neuroRes.ok && clinicalRes.ok) {
                    setNeuroData(await neuroRes.json());
                    setClinicalData(await clinicalRes.json());
                } else {
                    throw new Error("API not reachable");
                }
            } catch (err) {
                console.log("AI Server Unreachable");
                setError("AI System Offline. Please start the AI Server.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-8 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-indigo-600 font-medium">Running Python AI Models...</span>
            </div>
        );
    }

    if (error || !neuroData || !clinicalData) {
        return (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 flex flex-col items-center justify-center h-64 text-center">
                    <div className="p-3 bg-red-50 text-red-500 rounded-full mb-3">
                        <AlertCircle size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">AI System Offline</h3>
                    <p className="text-sm text-gray-500 max-w-xs">{error || "No data received from AI engine."}</p>
                </div>
                
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-64 text-center opacity-50">
                    <p className="text-gray-400">Waiting for clinical data...</p>
                </div>
             </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 1. AI Neuroplasticity Mapper */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900/50 overflow-hidden relative transition-colors duration-300"
            >
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors">
                            <Brain size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">AI Neuroplasticity Mapper</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Inferred Neural Adaptation</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-end gap-4">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors">Neuroplasticity Score</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors">
                                    {neuroData.curve_data && neuroData.curve_data.length > 0 ? neuroData.neuroplasticity_score : '--'}
                                </span>
                                <span className="text-sm font-medium text-gray-400 transition-colors">/ 100</span>
                            </div>
                        </div>
                        <div className={`mb-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full flex items-center gap-1 transition-colors ${
                            neuroData.trend === 'Regression Detected' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' : 
                            neuroData.trend === 'Insufficient Data' ? 'hidden' : 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                        }`}>
                            <TrendingUp size={12} />
                            {neuroData.trend}
                        </div>
                    </div>

                    {/* Simple Visualization of the Curve */}
                    {neuroData.curve_data && neuroData.curve_data.length > 0 ? (
                        <div className="relative h-32 w-full bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl p-4 flex items-end justify-between items-center transition-colors">
                            {neuroData.curve_data.map((point, i) => (
                                    <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${point[1]}%` }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-1/12 bg-indigo-400 dark:bg-indigo-500 rounded-t-sm opacity-60 hover:opacity-100 transition-opacity self-end"
                                    title={`Session ${point[0]}: ${point[1].toFixed(1)}`}
                                    ></motion.div>
                                ))}
                                <div className="absolute top-2 right-2 text-[10px] text-indigo-400 dark:text-indigo-300 font-mono transition-colors">
                                Learning Velocity: {neuroData.learning_velocity}
                                </div>
                        </div>
                    ) : (
                        <div className="py-8 w-full flex items-center justify-center">
                             <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors">No session history available for trend analysis</p>
                        </div>
                    )}
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic border-t border-gray-100 dark:border-slate-800 pt-3 transition-colors">
                        *AI infers learning speed from reaction time & error consistency trends.
                    </p>
                </div>
            </motion.div>

            {/* 2. AI Normal Child Comparison Engine */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/50 relative transition-colors duration-300"
            >
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl transition-colors">
                            <GitCompare size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">Clinical Benchmarks</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Age-Matched Comparison</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {clinicalData.overall_catch_up > 0 ? (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center transition-colors">
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1 transition-colors">Developmental Catch-up</p>
                            <h4 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 transition-colors">
                                {clinicalData.overall_catch_up}%
                            </h4>
                            <p className="text-xs text-blue-500 dark:text-blue-400/80 mt-1 transition-colors">
                                Gap: {clinicalData.developmental_gap_score}% from norm
                            </p>
                        </div>
                    ) : (
                        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 text-center opacity-75 transition-colors">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors">Developmental Catch-up</p>
                            <h4 className="text-3xl font-extrabold text-gray-400 dark:text-gray-500 transition-colors">--%</h4>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 transition-colors">No assessment data</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {clinicalData.details && Object.keys(clinicalData.details).length > 0 ? (
                            Object.entries(clinicalData.details).map(([key, data]) => (
                                <div key={key}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="font-medium text-gray-700 dark:text-gray-300 capitalize transition-colors">{key.replace('_', ' ')}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] transition-colors ${
                                            data.status === 'Within Norm' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                                        }`}>
                                            {data.status}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden relative transition-colors">
                                        <div className="absolute top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-500 left-[80%] z-10 transition-colors" title="Norm"></div>
                                        <motion.div 
                                            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-colors"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${data.catch_up_percentage}%` }} // Simplified for visualization
                                            transition={{ duration: 1 }}
                                        ></motion.div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-xl transition-colors">
                                <p>Waiting for initial assessment...</p>
                                <p className="text-xs mt-1">Complete a therapy session to generate benchmarks.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex items-start gap-2 p-2 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg border border-yellow-100 dark:border-yellow-900/30 transition-colors">
                        <AlertCircle size={12} className="text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0 transition-colors" />
                        <p className="text-[10px] text-yellow-800 dark:text-yellow-200/80 leading-tight transition-colors">
                            Comparison based on observable behavior only. Does not replace clinical diagnosis.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TeleRehabAI;
