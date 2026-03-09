import React, { useRef, useEffect, useState } from 'react';
import { Camera, RefreshCw, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const LiveExercise = ({ onFeedbackUpdate, isActive = true }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const awaitingRef = useRef(false);
  const feedbackUpdateRef = useRef(onFeedbackUpdate);
  const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';
  // Internal state for immediate feedback overlay
  const [localFeedback, setLocalFeedback] = useState(demoMode ? 'Demo mode: AI feedback simulated.' : "Waiting..."); 
  const [count, setCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  // 1. Webcam Management
  const streamRef = useRef(null);
  const initializingRef = useRef(false);
  const [videoKey, setVideoKey] = useState(0); // Used to force-remount video element

  const stopCurrentStream = () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
            track.stop();
            // Also explicitly remove the track from the stream if possible
            if (streamRef.current) streamRef.current.removeTrack(track);
        });
        streamRef.current = null;
      }
      if (videoRef.current) {
        if (videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        videoRef.current.load(); // Forces release of the video element
      }
    } catch (e) {
      console.error("Error stopping stream:", e);
    }
  };

  const chooseConstraints = (deviceId, relax = false, ignoreDeviceId = false) => {
    // Ultimate fallback: if ignoreDeviceId is true, we just want ANY video
    if (ignoreDeviceId) {
        return { video: true };
    }

    // Use selected device if available, otherwise fallback to provided deviceId or user facing
    const targetId = selectedDeviceId || deviceId;
    const useDevice = !!targetId && !ignoreDeviceId;
    
    const base = useDevice ? { deviceId: { exact: targetId } } : { facingMode: 'user' };
    
    if (relax) {
        // Relaxed: just the device or facing mode, no resolution constraints
        return { video: base };
    }

    // Strict: specific resolution
    return {
      video: { ...base, width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 15 } }
    };
  };

  const startWebcam = async (retries = 3, relaxConstraints = false, ignoreDeviceId = false) => {
    if (initializingRef.current) return;
    initializingRef.current = true;

    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
       const cams = allDevices.filter(d => d.kind === 'videoinput');
       setVideoDevices(cams);
       
       // If we don't have a selected device yet, and we found cameras, pick the first one
       let preferredId = cams[0]?.deviceId;
       if (selectedDeviceId) {
           preferredId = selectedDeviceId;
       } else if (cams.length > 0) {
           // If we have a list but no selection, we don't force update state here to avoid re-renders,
           // but we use the first one as preferredId.
           // Note: if user manually selects, selectedDeviceId will be set.
       } else {
           // No cameras found at all?
           console.warn("No video input devices found via enumerateDevices");
       }

       stopCurrentStream();
       // Increase delay to ensure hardware release
       await new Promise(r => setTimeout(r, 500));

      console.log(`Requesting camera: relax=${relaxConstraints}, ignoreDevice=${ignoreDeviceId}, preferredId=${preferredId}`);
      
      const constraints = chooseConstraints(preferredId, relaxConstraints, ignoreDeviceId);
      
      // If ignoreDeviceId is true, we should NOT pass a deviceId in constraints even if we found one
      if (ignoreDeviceId) {
         // chooseConstraints handles this, but let's double check logic there.
         // Yes: chooseConstraints returns { video: true } if ignoreDeviceId is true.
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Update selected device ID if we successfully got a stream and haven't selected one yet
      // This helps UI show the correct active camera
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
          const settings = videoTrack.getSettings();
          if (settings.deviceId && !selectedDeviceId) {
              // We won't set state here to avoid re-triggering, just helpful for debugging
              console.log("Active camera deviceId:", settings.deviceId);
          }
      }
      
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Wait for video to actually be ready
        await videoRef.current.play().catch(e => console.error("Error playing video:", e));
      }
      setLocalFeedback("Camera ready. Ensure you are visible.");
    } catch (err) {
      console.error("Error accessing webcam:", err);
      
      // Retry logic
      if (retries > 0) {
         let nextRelax = relaxConstraints;
         let nextIgnoreDevice = ignoreDeviceId;
         let delay = 1000;
         let shouldRetry = false;
         let forceRemount = false;

         if (err.name === 'NotReadableError' || err.name === 'AbortError' || err.name === 'NotAllowedError') {
            // Aggressive fallback strategy
            if (!relaxConstraints) {
                nextRelax = true; // First retry: relax constraints
            } else {
                nextIgnoreDevice = true; // Second retry: ignore device ID (any camera)
            }
            
            // If we are already ignoring device ID and still failing, force remount video element
            if (ignoreDeviceId) {
                forceRemount = true;
            }

            setLocalFeedback(`Camera issue (${err.name}). Retrying...`);
            shouldRetry = true;
         } else if (err.name === 'OverconstrainedError') {
            nextRelax = true;
            nextIgnoreDevice = true; // Immediately go to any camera if constraints fail
            delay = 500;
            setLocalFeedback("Adjusting camera settings...");
            shouldRetry = true;
         }

         if (shouldRetry) {
           initializingRef.current = false; // Release lock for retry
           if (forceRemount) {
               console.log("Forcing video element remount...");
               setVideoKey(prev => prev + 1);
               delay += 500; // Add extra delay for remount
           }
           setTimeout(() => startWebcam(retries - 1, nextRelax, nextIgnoreDevice), delay);
           return;
         }
      }

      // Terminal errors
      if (err.name === 'NotAllowedError') {
        setLocalFeedback("Camera permission blocked. Please allow access.");
      } else if (err.name === 'NotFoundError') {
        setLocalFeedback("No camera found.");
      } else {
        setLocalFeedback(`Camera error: ${err.name}. Try restarting browser.`);
        
        // Even on terminal error, if we have devices, ensure they are in state so user can pick
        if (videoDevices.length === 0) {
            navigator.mediaDevices.enumerateDevices().then(devs => {
                setVideoDevices(devs.filter(d => d.kind === 'videoinput'));
            });
        }
      }
    } finally {
        initializingRef.current = false;
    }
  };

  // Initial mount
  useEffect(() => {
    startWebcam();
    return () => {
      stopCurrentStream();
    };
  }, []);

  useEffect(() => {
    feedbackUpdateRef.current = onFeedbackUpdate;
  }, [onFeedbackUpdate]);

  function captureAndSendFrame() {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    if (!video || !video.videoWidth) return;
    if (awaitingRef.current) return;
    
    canvas.width = 640; // Use full resolution
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const base64data = canvas.toDataURL('image/jpeg', 0.5);
    wsRef.current.send(base64data);
    awaitingRef.current = true;
  }

  function drawLandmarks(landmarks) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections (Full Body Skeleton)
      const connections = [
          // Face
          [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8],
          [9, 10],
          
          // Torso
          [11, 12], [11, 23], [12, 24], [23, 24],
          
          // Left Arm
          [11, 13], [13, 15], [15, 17], [15, 19], [15, 21],
          // Right Arm
          [12, 14], [14, 16], [16, 18], [16, 20], [16, 22],
          
          // Left Leg
          [23, 25], [25, 27], [27, 29], [27, 31], [29, 31],
          // Right Leg
          [24, 26], [26, 28], [28, 30], [28, 32], [30, 32]
      ];
      
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      
      // Map normalized coords to canvas
      const points = (landmarks || []).map(lm => ({
          x: lm.x * canvas.width,
          y: lm.y * canvas.height,
          v: lm.visibility
      }));
      
      connections.forEach(([i, j]) => {
          if (points[i] && points[j] && points[i].v > 0.5 && points[j].v > 0.5) {
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
          }
      });
      
      // Draw points with specific styling for joints
      points.forEach((p, index) => {
          if (p.v > 0.5) {
              ctx.beginPath();
              
              // Color coding
              if (index >= 11 && index <= 16) { // Arms
                 ctx.fillStyle = '#00ffff'; // Cyan for arms
                 ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
              } else if (index >= 23 && index <= 32) { // Legs
                 ctx.fillStyle = '#ff00ff'; // Magenta for legs
                 ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
              } else {
                 ctx.fillStyle = '#ff0000'; // Red for others
                 ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
              }
              
              ctx.fill();
              
              // Draw text coordinates for key joints
              if ([11, 12, 13, 14, 23, 24, 25, 26].includes(index)) {
                  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                  ctx.font = '10px monospace';
                  ctx.fillText(`(${Math.round(p.x)},${Math.round(p.y)})`, p.x + 8, p.y);
              }
          }
      });
  }

  function drawTarget(target) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const x = target.x * canvas.width;
      const y = target.y * canvas.height;
      
      // Glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = "yellow";
      
      // Draw Circle
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 0, 0.6)'; // Semi-transparent yellow
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
  }

  // 2. Connect WebSocket & Start Analysis ONLY when active
  useEffect(() => {
    if (!isActive || demoMode) return;

    // Connect to WebSocket
    const connectWebSocket = () => {
      if (wsRef.current) wsRef.current.close(); // Close existing if any

      const wsUrl = import.meta.env.VITE_AI_WS_URL || 'ws://localhost:8000';
      wsRef.current = new WebSocket(`${wsUrl}/ws/exercise`);

      wsRef.current.onopen = () => {
        console.log("Connected to AI Server");
        setIsConnected(true);
        setLocalFeedback("Get ready! Stand in front of the camera.");
        awaitingRef.current = false;
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setLocalFeedback(data.feedback_text);
        setCount(data.count);
        setIsCorrect(data.is_correct);
        awaitingRef.current = false;
        
        // Notify Parent
        if (feedbackUpdateRef.current) {
            feedbackUpdateRef.current(data);
        }
        
        // Draw landmarks & Target
        if (canvasRef.current && videoRef.current) {
           drawLandmarks(data.landmarks);
           if (data.target) {
               drawTarget(data.target);
           }
        }
      };

      wsRef.current.onclose = () => {
        console.log("Disconnected from AI Server");
        setIsConnected(false);
        awaitingRef.current = false;
        if (isActive) { // Only reconnect if still active
            setLocalFeedback("Disconnected. Reconnecting...");
            setTimeout(connectWebSocket, 3000);
        }
      };
      
      wsRef.current.onerror = (err) => {
          console.error("WebSocket error:", err);
          setLocalFeedback("Connection error. Is the AI server running?");
      };
    };

    connectWebSocket();

    // Frame processing loop
    const intervalId = setInterval(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && videoRef.current) {
            captureAndSendFrame();
        }
    }, 100); // Send 10 fps

    return () => {
      clearInterval(intervalId);
      if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
      }
    };
  }, [isActive, demoMode]);

 

   return (
    <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl border-4 border-gray-800">
      {/* Video Feed */}
      <video 
        key={videoKey} // Forces re-mount on hard retry
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="w-full h-full object-cover transform -scale-x-100" // Mirror effect
      />
      
      {/* Overlay Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full transform -scale-x-100" // Match mirror
      />

      {/* Status Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm">
        {!isActive ? (
             <span className="flex items-center gap-2 text-yellow-400">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                Standby
            </span>
        ) : isConnected ? (
            <span className="flex items-center gap-2 text-green-400">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                AI Active
            </span>
        ) : (
            <span className="flex items-center gap-2 text-red-400">
                <AlertCircle size={14} /> Disconnected
            </span>
        )}
      </div>

      {/* Feedback Overlay */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 max-w-md">
        <div className={`backdrop-blur-md rounded-xl p-4 text-center transition-colors duration-300 border-2 ${
            isCorrect ? 'bg-green-900/40 border-green-500/50' : 'bg-gray-900/60 border-white/10'
        }`}>
           <div className="flex justify-center mb-1">
               {isCorrect ? <CheckCircle className="text-green-400" size={32} /> : <RefreshCw className="text-blue-400 animate-spin-slow" size={32} />}
           </div>
           <p className="text-white text-lg font-bold drop-shadow-md">{localFeedback}</p>
           
           {/* Camera Selector (Only if devices found) */}
           {videoDevices.length > 0 && (
              <div className="mt-2 mb-2">
                  <select 
                    className="bg-black/50 text-white text-xs p-1 rounded border border-gray-600 max-w-full"
                    value={selectedDeviceId}
                    onChange={(e) => {
                        const newId = e.target.value;
                        setSelectedDeviceId(newId);
                        // Trigger restart with new device
                        setTimeout(() => startWebcam(3, false, false), 100);
                    }}
                  >
                      {videoDevices.map((device, idx) => (
                          <option key={device.deviceId} value={device.deviceId}>
                              {device.label || `Camera ${idx + 1}`}
                          </option>
                      ))}
                  </select>
              </div>
           )}

           <div className="mt-3 flex justify-center gap-2">
             <button
               onClick={() => {
                 setLocalFeedback("Retrying camera...");
                 // Retry with relaxed constraints and ignoring device ID to ensure connection
                 startWebcam(3, true, true);
               }}
               className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full"
             >
               Retry Camera
             </button>
           </div>
        </div>
      </div>
      
      {/* Counter */}
      <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-4 py-2 rounded-xl font-mono text-xl font-bold border-2 border-blue-400 shadow-lg">
          Count: {count}
      </div>
    </div>
  );
};

export default LiveExercise;
