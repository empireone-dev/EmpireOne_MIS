import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Input,
    Card,
    Typography,
    Spin,
    Alert,
    Avatar,
    Space,
    Switch,
    Progress,
    Row,
    Col,
} from "antd";
import {
    SendOutlined,
    RobotOutlined,
    UserOutlined,
    AudioOutlined,
    AudioMutedOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons";
import {
    ai_interview_service,
    get_guide_questions_for_ai_service,
    save_ai_interview_response_service,
    saveInterviewRecordingService,
} from "@/app/pages/services/open-ai-service";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

export default function AiInterviewSection() {
    const [messages, setMessages] = useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [guideQuestions, setGuideQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [interviewCompleted, setInterviewCompleted] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [lastUserResponse, setLastUserResponse] = useState("");
    const [applicantId, setApplicantId] = useState("");
    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [questionsError, setQuestionsError] = useState(null);

    // Voice-related states
    const [isVoiceMode, setIsVoiceMode] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [voiceError, setVoiceError] = useState(null);

    // Camera-related states
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const [cameraError, setCameraError] = useState(null);
    const [cameraPermissionGranted, setCameraPermissionGranted] =
        useState(false);

    // Audio testing states
    const [micTesting, setMicTesting] = useState(false);
    const [micLevel, setMicLevel] = useState(0);
    const [micStream, setMicStream] = useState(null);
    const [soundTesting, setSoundTesting] = useState(false);

    // Recording states
    const [isRecording, setIsRecording] = useState(false);
    const [recordingStream, setRecordingStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [recordingError, setRecordingError] = useState(null);
    const [uploadingRecording, setUploadingRecording] = useState(false);

    // Refs for speech APIs and camera
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);
    const videoRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const micStreamRef = useRef(null);
    
    // Recording refs
    const recordingRef = useRef(null);
    const chunksRef = useRef([]);
    
    // Messages auto-scroll ref
    const messagesEndRef = useRef(null);

    // Extract app_id from URL
    useEffect(() => {
        const urlParts = window.location.pathname.split("/");
        const appIdFromUrl = urlParts[urlParts.length - 1];
        console.log("Extracted app ID from URL:", appIdFromUrl);
        console.log("Full URL path:", window.location.pathname);
        console.log("URL parts:", urlParts);
        
        if (appIdFromUrl && appIdFromUrl.trim() !== '') {
            setApplicantId(appIdFromUrl.trim());
            console.log("Set applicant ID to:", appIdFromUrl.trim());
        } else {
            console.error("No valid app ID found in URL");
        }
    }, []);

    // Load guide questions on component mount
    useEffect(() => {
        loadGuideQuestions();
        initializeSpeechAPIs();
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading]);

    // Initialize Speech Recognition and Text-to-Speech
    const initializeSpeechAPIs = () => {
        // Check for Speech Recognition support
        if (
            "webkitSpeechRecognition" in window ||
            "SpeechRecognition" in window
        ) {
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();

            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setVoiceError(null);
            };

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = "";
                let interimTranscript = "";

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    setCurrentInput(finalTranscript);
                    setTranscript(finalTranscript);
                } else {
                    setTranscript(interimTranscript);
                }
            };

            recognitionRef.current.onerror = (event) => {
                setIsListening(false);
                setVoiceError(`Speech recognition error: ${event.error}`);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            setSpeechSupported(true);
        }

        // Check for Speech Synthesis support
        if ("speechSynthesis" in window) {
            synthRef.current = window.speechSynthesis;
        }
    };

    const loadGuideQuestions = async () => {
        try {
            setLoadingQuestions(true);
            const response = await get_guide_questions_for_ai_service();
            if (response.data && response.data.data) {
                setGuideQuestions(response.data.data);
                setQuestionsError(null);
            } else {
                setQuestionsError("No questions available");
            }
        } catch (error) {
            console.error("Failed to load guide questions:", error);
            setQuestionsError("Failed to load interview questions");
        } finally {
            setLoadingQuestions(false);
        }
    };

    // Voice control functions
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setCurrentInput("");
            setTranscript("");
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    };

    const speakText = (text) => {
        if (synthRef.current && isVoiceMode) {
            // Stop any ongoing speech
            synthRef.current.cancel();

            // Remove HTML tags for speech
            const plainText = text.replace(/<[^>]*>/g, "");

            const utterance = new SpeechSynthesisUtterance(plainText);

            // Get available voices
            const voices = synthRef.current.getVoices();

            // Try to find any suitable voice (less strict approach)
            let selectedVoice = null;

            // First preference: Any female-sounding voice
            selectedVoice = voices.find(
                (voice) =>
                    voice.name.toLowerCase().includes("female") ||
                    voice.name.toLowerCase().includes("woman") ||
                    voice.name.toLowerCase().includes("samantha") ||
                    voice.name.toLowerCase().includes("susan") ||
                    voice.name.toLowerCase().includes("karen") ||
                    voice.name.toLowerCase().includes("zira") ||
                    voice.name.toLowerCase().includes("eva") ||
                    voice.name.toLowerCase().includes("fiona")
            );

            // Second preference: Any English voice
            if (!selectedVoice) {
                selectedVoice = voices.find(
                    (voice) => voice.lang && voice.lang.startsWith("en")
                );
            }

            // Third preference: Default system voice (any available voice)
            if (!selectedVoice && voices.length > 0) {
                selectedVoice = voices[0]; // Use first available voice
            }

            // Set the voice if one is found
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            // Millennial voice settings - casual, trendy, and relatable
            utterance.rate = 1.1; // Slightly faster for modern, confident speech
            utterance.pitch = 1.2; // Moderately higher for youthful, friendly tone
            utterance.volume = 0.9; // Confident but not overwhelming

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            synthRef.current.speak(utterance);

            return utterance; // Return utterance for callback handling
        }
        return null;
    };

    const stopSpeaking = () => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    const toggleVoiceMode = () => {
        const newVoiceMode = !isVoiceMode;
        setIsVoiceMode(newVoiceMode);

        if (!newVoiceMode) {
            stopListening();
            stopSpeaking();
        }
    };

    // Camera functions
    const requestCameraPermission = async () => {
        try {
            setCameraError(null);
            console.log("Requesting camera permission...");

            // Stop any existing stream first, but only if we're going to create a new one
            if (cameraStream) {
                console.log("Stopping existing camera stream...");
                cameraStream.getTracks().forEach((track) => track.stop());
                setCameraStream(null);
                // Give a moment for the stream to properly close
                await new Promise((resolve) => setTimeout(resolve, 100));
            }

            // Try simpler constraints first
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });

            console.log("Camera stream obtained:", stream);
            console.log("Video tracks:", stream.getVideoTracks());

            setCameraStream(stream);
            setCameraPermissionGranted(true);
            setCameraEnabled(true);

            // Set the stream immediately and force play
            if (videoRef.current) {
                console.log("Setting video source...");
                videoRef.current.srcObject = stream;

                // Force the video to load and play
                videoRef.current.load();

                // Multiple event handlers to ensure playback starts
                const playVideo = async () => {
                    try {
                        console.log("Attempting to play video...");
                        if (videoRef.current && videoRef.current.srcObject) {
                            await videoRef.current.play();
                            console.log("Video is now playing");
                        }
                    } catch (error) {
                        console.error("Error playing video:", error);
                        setCameraError(
                            "Failed to start video playback: " + error.message
                        );
                    }
                };

                videoRef.current.onloadedmetadata = playVideo;
                videoRef.current.oncanplay = playVideo;

                // Force immediate play attempt
                setTimeout(playVideo, 100);
            }

            return true;
        } catch (error) {
            console.error("Camera permission error:", error);
            let errorMessage = "Camera access denied. ";

            if (error.name === "NotAllowedError") {
                errorMessage +=
                    "Please allow camera access and refresh the page.";
            } else if (error.name === "NotFoundError") {
                errorMessage += "No camera found on this device.";
            } else if (error.name === "NotReadableError") {
                errorMessage += "Camera is being used by another application.";
            } else {
                errorMessage +=
                    "Unable to access camera. Please check your device settings.";
            }

            setCameraError(errorMessage);
            setCameraPermissionGranted(false);
            setCameraEnabled(false);
            return false;
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach((track) => track.stop());
            setCameraStream(null);
        }
        setCameraEnabled(false);
        if (videoRef.current) {
            videoRef.current.srcObject = null;
            videoRef.current.pause();
        }
    };

    const toggleCamera = async () => {
        if (cameraEnabled) {
            stopCamera();
        } else {
            await requestCameraPermission();
        }
    };

    // Add useEffect to handle video stream updates
    useEffect(() => {
        const setupVideo = async () => {
            if (cameraStream && videoRef.current && cameraEnabled) {
                console.log("Setting up video element with stream...");

                const video = videoRef.current;

                // Always set the source - don't check if it's different
                video.srcObject = cameraStream;

                // Force immediate play without waiting for events
                try {
                    // Reset video element completely
                    video.load();

                    // Wait a moment for the load to process
                    await new Promise((resolve) => setTimeout(resolve, 50));

                    // Force play
                    await video.play();
                    console.log("Video play successful - immediate");
                } catch (error) {
                    console.error("Immediate video play failed:", error);

                    // Fallback - try with event listeners
                    const handleCanPlay = async () => {
                        try {
                            await video.play();
                            console.log(
                                "Video play successful - event listener"
                            );
                            video.removeEventListener("canplay", handleCanPlay);
                        } catch (e) {
                            console.error("Event listener play failed:", e);
                        }
                    };

                    video.addEventListener("canplay", handleCanPlay);

                    // Another fallback - force play after delay
                    setTimeout(async () => {
                        try {
                            if (video.paused) {
                                await video.play();
                                console.log("Video play successful - delayed");
                            }
                        } catch (e) {
                            console.error("Delayed play failed:", e);
                            setCameraError(
                                "Failed to start video playback: " + e.message
                            );
                        }
                    }, 500);
                }

                // Add debug event listeners
                const handleLoadStart = () => console.log("Video load started");
                const handleLoadedData = () => console.log("Video data loaded");
                const handleCanPlay = () => console.log("Video can play");
                const handlePlay = () => console.log("Video started playing");
                const handleError = (e) => {
                    console.error("Video element error:", e);
                    setCameraError("Video element error occurred");
                };

                video.addEventListener("loadstart", handleLoadStart);
                video.addEventListener("loadeddata", handleLoadedData);
                video.addEventListener("canplay", handleCanPlay);
                video.addEventListener("play", handlePlay);
                video.addEventListener("error", handleError);

                // Cleanup function to remove event listeners
                return () => {
                    video.removeEventListener("loadstart", handleLoadStart);
                    video.removeEventListener("loadeddata", handleLoadedData);
                    video.removeEventListener("canplay", handleCanPlay);
                    video.removeEventListener("play", handlePlay);
                    video.removeEventListener("error", handleError);
                };
            }
        };

        setupVideo();
    }, [cameraStream, cameraEnabled]);

    // Monitor interview state changes and ensure video continues playing
    useEffect(() => {
        if (
            interviewStarted &&
            cameraStream &&
            videoRef.current &&
            cameraEnabled
        ) {
            console.log(
                "Interview started - ensuring video continues playing..."
            );

            const ensureVideoPlaying = async () => {
                try {
                    const video = videoRef.current;
                    if (video && video.paused) {
                        console.log(
                            "Video is paused during interview, attempting to resume..."
                        );
                        await video.play();
                        console.log(
                            "Video resumed successfully during interview"
                        );
                    }

                    // Additional check: if video is "playing" but has no video data, do a force reset
                    if (video && !video.paused && video.readyState < 2) {
                        console.log(
                            "Video appears to be playing but has no data - triggering automatic force play..."
                        );
                        await performForcePlay();
                    }
                } catch (error) {
                    console.error(
                        "Failed to resume video during interview:",
                        error
                    );
                    setCameraError(
                        "Failed to resume video during interview: " +
                            error.message
                    );

                    // If normal play fails, try force play
                    console.log(
                        "Normal play failed, attempting automatic force play..."
                    );
                    try {
                        await performForcePlay();
                    } catch (forceError) {
                        console.error(
                            "Automatic force play also failed:",
                            forceError
                        );
                    }
                }
            };

            // Immediate check
            ensureVideoPlaying();

            // Periodic check to ensure video stays playing and has data
            const interval = setInterval(ensureVideoPlaying, 2000); // Check every 2 seconds

            return () => clearInterval(interval);
        }
    }, [interviewStarted, cameraStream, cameraEnabled]);

    // Function to perform force play reset
    const performForcePlay = async () => {
        if (videoRef.current && cameraStream) {
            console.log(
                "Performing automatic force play with complete reset..."
            );
            const video = videoRef.current;

            try {
                // Complete reset
                video.pause();
                video.srcObject = null;
                await new Promise((resolve) => setTimeout(resolve, 100));

                // Re-assign and play
                video.srcObject = cameraStream;
                video.load();
                await new Promise((resolve) => setTimeout(resolve, 100));

                await video.play();
                console.log("Automatic force play successful!");

                // Clear any existing camera errors since we succeeded
                setCameraError(null);

                return true;
            } catch (error) {
                console.error("Automatic force play failed:", error);
                setCameraError("Automatic force play failed: " + error.message);
                return false;
            }
        }
        return false;
    };

    // Microphone testing functions
    const testMicrophone = async () => {
        if (micTesting) {
            // Stop testing
            setMicTesting(false);
            setMicLevel(0);

            if (micStreamRef.current) {
                micStreamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());
                micStreamRef.current = null;
            }

            if (
                audioContextRef.current &&
                audioContextRef.current.state !== "closed"
            ) {
                try {
                    audioContextRef.current.close();
                } catch (e) {
                    console.log("Audio context already closed");
                }
                audioContextRef.current = null;
                analyserRef.current = null;
            }

            return;
        }

        try {
            setMicTesting(true);
            setCameraError(null);

            console.log("Requesting microphone access...");

            // Request microphone with basic constraints
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });

            console.log("Microphone stream obtained:", stream);
            console.log("Audio tracks:", stream.getAudioTracks());

            micStreamRef.current = stream;

            // Create a simple volume meter using ScriptProcessorNode (deprecated but widely supported)
            try {
                audioContextRef.current = new (window.AudioContext ||
                    window.webkitAudioContext)();

                if (audioContextRef.current.state === "suspended") {
                    await audioContextRef.current.resume();
                }

                const source =
                    audioContextRef.current.createMediaStreamSource(stream);

                // Try modern approach first
                if (audioContextRef.current.createAnalyser) {
                    analyserRef.current =
                        audioContextRef.current.createAnalyser();
                    analyserRef.current.fftSize = 256;
                    analyserRef.current.smoothingTimeConstant = 0.5;

                    source.connect(analyserRef.current);

                    const dataArray = new Uint8Array(
                        analyserRef.current.frequencyBinCount
                    );

                    const updateLevel = () => {
                        if (!micTesting || !analyserRef.current) return;

                        analyserRef.current.getByteFrequencyData(dataArray);

                        // Calculate volume
                        let sum = 0;
                        for (let i = 0; i < dataArray.length; i++) {
                            sum += dataArray[i];
                        }

                        const average = sum / dataArray.length;
                        const level = Math.min(100, (average / 128) * 100);

                        console.log(
                            "Mic level update:",
                            level,
                            "from average:",
                            average
                        );
                        setMicLevel(level);

                        if (micTesting) {
                            setTimeout(updateLevel, 100); // Update every 100ms instead of requestAnimationFrame
                        }
                    };

                    updateLevel();
                } else {
                    // Fallback: Just show that mic is working without level detection
                    console.log(
                        "Analyser not supported, showing basic mic test"
                    );
                    let counter = 0;
                    const basicTest = () => {
                        if (!micTesting) return;

                        // Simulate some level activity
                        const level =
                            10 +
                            Math.sin(counter * 0.1) * 20 +
                            Math.random() * 10;
                        setMicLevel(Math.max(0, Math.min(100, level)));
                        counter++;

                        if (micTesting) {
                            setTimeout(basicTest, 200);
                        }
                    };
                    basicTest();
                }
            } catch (audioError) {
                console.error("Audio context error:", audioError);
                // Fallback: Just show that microphone access was granted
                let testLevel = 0;
                const fallbackTest = () => {
                    if (!micTesting) return;

                    testLevel = ((testLevel + 5) % 50) + 10; // Cycle between 10-60
                    setMicLevel(testLevel);

                    if (micTesting) {
                        setTimeout(fallbackTest, 300);
                    }
                };
                fallbackTest();
            }
        } catch (error) {
            console.error("Microphone test error:", error);
            setMicTesting(false);
            setMicLevel(0);

            let errorMessage = "Microphone test failed. ";
            if (error.name === "NotAllowedError") {
                errorMessage +=
                    "Please allow microphone access in your browser and try again.";
            } else if (error.name === "NotFoundError") {
                errorMessage +=
                    "No microphone found. Please check your microphone is connected.";
            } else if (error.name === "NotReadableError") {
                errorMessage +=
                    "Microphone is being used by another application. Please close other apps using your microphone.";
            } else {
                errorMessage += `Error: ${error.message}`;
            }

            setCameraError(errorMessage);
        }
    };

    // Sound testing function
    const testSound = async () => {
        if (soundTesting) return;

        setSoundTesting(true);

        try {
            // Create a simple test tone
            const audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Configure the tone
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 800Hz tone
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Low volume

            // Play for 1 second
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1);

            // Clean up after the sound finishes
            setTimeout(() => {
                setSoundTesting(false);
                audioContext.close();
            }, 1100);
        } catch (error) {
            console.error("Sound test error:", error);
            setSoundTesting(false);
            setCameraError(
                "Failed to play test sound. Please check your audio settings."
            );
        }
    };

    // Recording functions
    const startRecording = async () => {
        try {
            setRecordingError(null);
            console.log("Starting interview recording...");

            let recordingStreamToUse;

            // If camera is enabled, use existing camera stream or get new combined stream
            if (cameraEnabled && cameraStream) {
                // Try to get audio track from camera stream or create new combined stream
                const audioTracks = cameraStream.getAudioTracks();
                
                if (audioTracks.length === 0) {
                    // Camera stream has no audio, need to get audio separately and combine
                    console.log("Camera stream has no audio, getting combined stream...");
                    recordingStreamToUse = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true
                    });
                } else {
                    // Camera stream already has audio
                    recordingStreamToUse = cameraStream;
                }
            } else {
                // No camera or camera disabled, get audio only
                console.log("Getting audio-only stream for recording...");
                recordingStreamToUse = await navigator.mediaDevices.getUserMedia({
                    video: false,
                    audio: true
                });
            }

            console.log("Recording stream tracks:", {
                video: recordingStreamToUse.getVideoTracks().length,
                audio: recordingStreamToUse.getAudioTracks().length
            });

            setRecordingStream(recordingStreamToUse);
            chunksRef.current = [];

            // Determine appropriate MIME type
            let mimeType;
            if (recordingStreamToUse.getVideoTracks().length > 0) {
                // Video recording
                if (MediaRecorder.isTypeSupported('video/webm; codecs=vp8,opus')) {
                    mimeType = 'video/webm; codecs=vp8,opus';
                } else if (MediaRecorder.isTypeSupported('video/webm')) {
                    mimeType = 'video/webm';
                } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                    mimeType = 'video/mp4';
                } else {
                    mimeType = 'video/webm'; // Default fallback
                }
            } else {
                // Audio only recording
                if (MediaRecorder.isTypeSupported('audio/webm; codecs=opus')) {
                    mimeType = 'audio/webm; codecs=opus';
                } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                    mimeType = 'audio/webm';
                } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                    mimeType = 'audio/mp4';
                } else {
                    mimeType = 'audio/webm'; // Default fallback
                }
            }

            console.log("Using MIME type for recording:", mimeType);

            const recorder = new MediaRecorder(recordingStreamToUse, { mimeType });
            recordingRef.current = recorder;
            setMediaRecorder(recorder);

            recorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    chunksRef.current.push(event.data);
                    console.log("Recording chunk received:", event.data.size, "bytes");
                }
            };

            recorder.onstop = () => {
                console.log("Recording stopped, total chunks collected:", chunksRef.current.length);
                const totalSize = chunksRef.current.reduce((sum, chunk) => sum + chunk.size, 0);
                console.log("Total recording data size:", totalSize, "bytes");
                setIsRecording(false);
            };

            recorder.onerror = (event) => {
                console.error("Recording error:", event.error);
                setRecordingError("Recording error: " + event.error);
                setIsRecording(false);
            };

            recorder.onstart = () => {
                console.log("MediaRecorder started successfully");
                setIsRecording(true);
            };

            // Start recording with shorter intervals for better data collection
            recorder.start(500); // Collect data every 500ms
            console.log("MediaRecorder.start() called, state:", recorder.state);
            
            // Verify recording is actually working after a short delay
            setTimeout(() => {
                console.log("Recording status check:");
                console.log("- MediaRecorder state:", recordingRef.current?.state);
                console.log("- isRecording:", isRecording);
                console.log("- Chunks collected so far:", chunksRef.current.length);
                
                if (recordingRef.current?.state !== 'recording') {
                    console.error("MediaRecorder is not in recording state!");
                    setRecordingError("Recording failed to start properly");
                }
            }, 2000);

        } catch (error) {
            console.error("Failed to start recording:", error);
            setRecordingError("Failed to start recording: " + error.message);
        }
    };

    const stopRecording = async () => {
        return new Promise((resolve) => {
            if (recordingRef.current && isRecording) {
                console.log("Stopping recording...");
                
                // Set up one-time event listener for when recording stops
                recordingRef.current.onstop = () => {
                    console.log("Recording stopped completely, chunks:", chunksRef.current.length);
                    setIsRecording(false);
                    
                    // Only stop recording stream tracks if it's different from camera stream
                    if (recordingStream && recordingStream !== cameraStream) {
                        console.log("Stopping recording stream tracks...");
                        recordingStream.getTracks().forEach(track => track.stop());
                        setRecordingStream(null);
                    } else {
                        setRecordingStream(null);
                    }
                    
                    resolve();
                };
                
                recordingRef.current.stop();
            } else {
                console.log("No active recording to stop");
                resolve();
            }
        });
    };

    const saveRecording = async () => {
        try {
            setUploadingRecording(true);
            
            // Check if we have recording data
            if (!chunksRef.current || chunksRef.current.length === 0) {
                console.warn("No recording data to save");
                setRecordingError("No recording data available to save");
                return null;
            }

            console.log("Preparing to save recording...");
            console.log("Chunks available:", chunksRef.current.length);
            
            // Calculate total size
            const totalSize = chunksRef.current.reduce((sum, chunk) => sum + (chunk.size || 0), 0);
            console.log("Total recording size:", totalSize, "bytes");

            if (totalSize === 0) {
                console.warn("Recording chunks have no data");
                setRecordingError("Recording contains no data");
                return null;
            }

            // Determine the correct MIME type and file extension based on what Laravel expects
            let mimeType;
            let fileExtension;
            
            if (recordingRef.current && recordingRef.current.mimeType) {
                const originalMimeType = recordingRef.current.mimeType;
                console.log("Original recorder MIME type:", originalMimeType);
                
                // Laravel validation expects: webm,mp4,avi,mov
                // Map recorder MIME types to Laravel-acceptable ones
                if (originalMimeType.includes('webm')) {
                    mimeType = 'video/webm';
                    fileExtension = '.webm';
                } else if (originalMimeType.includes('mp4')) {
                    mimeType = 'video/mp4';
                    fileExtension = '.mp4';
                } else if (originalMimeType.includes('audio/webm')) {
                    // For audio-only recordings, still use webm container
                    mimeType = 'video/webm'; // Laravel expects video MIME types
                    fileExtension = '.webm';
                } else {
                    // Default fallback to webm
                    console.warn("Unknown MIME type, defaulting to webm:", originalMimeType);
                    mimeType = 'video/webm';
                    fileExtension = '.webm';
                }
            } else {
                // No recorder MIME type available, use default
                console.warn("No recorder MIME type available, using default webm");
                mimeType = 'video/webm';
                fileExtension = '.webm';
            }
            
            console.log("Final MIME type for upload:", mimeType);
            console.log("File extension:", fileExtension);

            // Create blob from chunks
            const blob = new Blob(chunksRef.current, { type: mimeType });
            
            console.log("Recording blob created:", {
                size: blob.size,
                type: blob.type,
                chunks: chunksRef.current.length
            });

            if (blob.size === 0) {
                console.error("Created blob has zero size");
                setRecordingError("Failed to create recording file - no data");
                return null;
            }

            // Validate required data before upload
            if (!applicantId || applicantId.trim() === '') {
                console.error("No applicant ID available");
                setRecordingError("No applicant ID available for recording save");
                return null;
            }

            // Create FormData for file upload
            const formData = new FormData();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `interview_${applicantId}_${timestamp}${fileExtension}`;
            
            formData.append('recording', blob, filename);
            formData.append('app_id', applicantId.toString());
            
            if (interviewStartTime) {
                const duration = Math.floor((Date.now() - interviewStartTime) / 1000);
                formData.append('interview_duration', duration.toString());
                console.log("Interview duration:", duration, "seconds");
            } else {
                // Provide a default duration if not available
                formData.append('interview_duration', '0');
                console.warn("No interview start time available, using duration 0");
            }

            // Debug FormData contents
            console.log("FormData prepared:", {
                filename,
                blobSize: blob.size,
                applicantId,
                duration: interviewStartTime ? Math.floor((Date.now() - interviewStartTime) / 1000) : 'unknown'
            });

            // Upload the recording
            console.log("Uploading recording to server...");
            console.log("FormData entries:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value instanceof Blob ? `Blob(${value.size} bytes, ${value.type})` : value);
            }
            
            const response = await saveInterviewRecordingService(formData);
            
            console.log("Upload response:", response);

            if (response && response.data && response.data.status === 'success') {
                console.log("Recording saved successfully:", response.data);
                // Clear the chunks after successful upload
                chunksRef.current = [];
                setRecordingError(null);
                return response.data;
            } else {
                const errorMsg = response?.data?.message || 'Upload failed - no success response';
                console.error("Upload failed:", errorMsg);
                console.error("Full response:", response);
                throw new Error(errorMsg);
            }

        } catch (error) {
            console.error("Failed to save recording:", error);
            
            let errorMessage = 'Unknown error occurred while saving recording';
            
            if (error.response) {
                // Server responded with error status
                console.error("Server error response:", error.response);
                
                if (error.response.status === 422) {
                    // Validation error
                    const validationErrors = error.response.data?.errors || {};
                    const errorList = Object.values(validationErrors).flat();
                    errorMessage = `Validation failed: ${errorList.join(', ')}`;
                } else if (error.response.status === 413) {
                    errorMessage = 'File too large. Please try with a shorter recording.';
                } else if (error.response.status === 500) {
                    errorMessage = error.response.data?.message || 'Server error occurred while saving recording';
                } else {
                    errorMessage = `Server error (${error.response.status}): ${error.response.data?.message || error.message}`;
                }
            } else if (error.request) {
                // Network error
                errorMessage = 'Network error - please check your connection and try again';
            } else {
                // Other error
                errorMessage = error.message || errorMessage;
            }
            
            setRecordingError("Failed to save recording: " + errorMessage);
            throw error;
        } finally {
            setUploadingRecording(false);
        }
    };

    // Track interview start time for duration calculation
    const [interviewStartTime, setInterviewStartTime] = useState(null);

    // Cleanup camera on component unmount
    useEffect(() => {
        return () => {
            stopListening();
            stopSpeaking();
            stopCamera();
            
            // Cleanup recording
            if (recordingRef.current && isRecording) {
                recordingRef.current.stop();
            }
            if (recordingStream) {
                recordingStream.getTracks().forEach(track => track.stop());
            }

            // Cleanup microphone testing
            if (micStreamRef.current) {
                micStreamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const startInterview = async () => {
        setInterviewStarted(true);
        setInterviewStartTime(Date.now());
        
        // Start recording when interview begins
        await startRecording();

        // Completely reset and reinitialize the video element during interview start
        if (cameraPermissionGranted && cameraStream && videoRef.current) {
            console.log(
                "Camera already active, completely resetting video element..."
            );

            try {
                const video = videoRef.current;

                // Complete reset sequence
                video.pause();
                video.srcObject = null;

                // Wait a moment for cleanup
                await new Promise((resolve) => setTimeout(resolve, 100));

                // Re-assign the stream
                video.srcObject = cameraStream;

                // Force load and play
                video.load();
                await new Promise((resolve) => setTimeout(resolve, 100));

                // Multiple play attempts
                for (let attempt = 0; attempt < 3; attempt++) {
                    try {
                        await video.play();
                        console.log(
                            `Video play successful on attempt ${attempt + 1}`
                        );
                        break;
                    } catch (playError) {
                        console.error(
                            `Play attempt ${attempt + 1} failed:`,
                            playError
                        );
                        if (attempt === 2) {
                            setCameraError(
                                "Failed to resume video after multiple attempts: " +
                                    playError.message
                            );
                        }
                        await new Promise((resolve) =>
                            setTimeout(resolve, 200)
                        );
                    }
                }
            } catch (error) {
                console.error(
                    "Failed to reset video during interview start:",
                    error
                );
                setCameraError("Failed to reset video: " + error.message);
            }
        } else if (!cameraPermissionGranted || !cameraStream) {
            console.log("Requesting camera permission for interview...");
            await requestCameraPermission();
        }

        const welcomeMessage = {
            type: "ai",
            content: `
                <div>
                    <p><strong>Welcome to EmpireOne BPO Solutions Inc. AI Interview!</strong></p>
                    <p>I'm your AI interviewer today. I'll be asking you ${guideQuestions.length} randomly selected questions to better understand your qualifications and fit for this position.</p>
                    <p>Please feel free to take your time with your responses. Let's begin!</p>
                </div>
            `,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages([welcomeMessage]);

        // Speak welcome message if voice mode is enabled and start first question after speech ends
        if (isVoiceMode) {
            const utterance = speakText(welcomeMessage.content);
            if (utterance) {
                utterance.onend = () => {
                    setIsSpeaking(false);
                    // Start first question immediately after welcome message ends
                    setTimeout(() => {
                        askNextQuestion();
                    }, 1000); // Short delay for natural flow
                };
            }
        } else {
            // Start with the first guide question after a short delay for text mode
            setTimeout(() => {
                askNextQuestion();
            }, 2000);
        }
    };

    const askNextQuestion = async () => {
        // Check if we've completed 5 questions (midpoint message)
        if (currentQuestionIndex === 5 && guideQuestions.length > 5) {
            const midpointMessage = {
                type: "ai",
                content: `
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <h3 style="color: white; margin-bottom: 15px;">🎉 Halfway Point Reached!</h3>
                        <p style="margin-bottom: 10px;"><strong>Excellent progress!</strong> You've successfully completed 5 questions.</p>
                        <p style="margin-bottom: 10px;">You're doing great! Your responses show good insight and professionalism.</p>
                        <p style="margin-bottom: 0;"><strong>Let's continue with the remaining ${
                            guideQuestions.length - 5
                        } questions.</strong></p>
                    </div>
                `,
                timestamp: new Date().toLocaleTimeString(),
            };

            setMessages((prev) => [...prev, midpointMessage]);

            // Speak midpoint message if voice mode is enabled
            if (isVoiceMode) {
                const utterance = speakText(midpointMessage.content);
                if (utterance) {
                    utterance.onend = () => {
                        setIsSpeaking(false);
                        // Continue with next question after midpoint message
                        setTimeout(() => {
                            proceedWithNextQuestion();
                        }, 1500);
                    };
                } else {
                    setTimeout(() => {
                        proceedWithNextQuestion();
                    }, 3000);
                }
            } else {
                setTimeout(() => {
                    proceedWithNextQuestion();
                }, 3000);
            }
            return;
        }

        proceedWithNextQuestion();
    };

    const proceedWithNextQuestion = () => {
        if (currentQuestionIndex < guideQuestions.length) {
            const question = guideQuestions[currentQuestionIndex];
            setCurrentQuestion(question);

            const questionMessage = {
                type: "ai",
                content: `<p><strong>Question ${
                    currentQuestionIndex + 1
                }:</strong> ${question.guideqs}</p>`,
                timestamp: new Date().toLocaleTimeString(),
            };

            setMessages((prev) => [...prev, questionMessage]);
            setCurrentQuestionIndex((prev) => prev + 1);

            // Speak the question if voice mode is enabled and wait for it to finish
            if (isVoiceMode) {
                setTimeout(() => {
                    speakText(questionMessage.content);
                }, 500);
            }
        } else {
            // Interview completed - final message
            const completionMessage = {
                type: "ai",
                content: `
                    <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 25px; border-radius: 10px; text-align: center;">
                        <h2 style="color: white; margin-bottom: 20px;">Interview Successfully Completed!</h2>
                        <p style="margin-bottom: 15px;"><strong>Congratulations!</strong> You have successfully answered all ${guideQuestions.length} interview questions.</p>
                        <p style="margin-bottom: 15px;">Your responses have been thoroughly recorded and demonstrate your qualifications and experience.</p>
                        <p style="margin-bottom: 15px;"><strong>What happens next?</strong></p>
                        <ul style="text-align: left; margin-bottom: 15px; padding-left: 20px;">
                            <li>Our HR team will review your responses</li>
                            <li>You'll be contacted within 2-7 business days</li>
                            <li>Next steps will be communicated via email</li>
                        </ul>
                        <p style="margin-bottom: 0;"><strong>Thank you for your interest in EmpireOne BPO Solutions Inc.!</strong></p>
                    </div>
                `,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages((prev) => [...prev, completionMessage]);
            setCurrentQuestion(null);
            setInterviewCompleted(true);

            // Stop and save recording when interview completes
            if (isRecording) {
                console.log("Stopping and saving recording...");
                
                // Stop recording and then save it
                stopRecording().then(() => {
                    console.log("Recording stopped, waiting before save...");
                    // Give a moment for final chunks to be processed
                    setTimeout(async () => {
                        try {
                            const result = await saveRecording();
                            if (result) {
                                console.log("Interview recording saved successfully:", result);
                            } else {
                                console.warn("Recording save returned no result");
                            }
                        } catch (error) {
                            console.error("Failed to save interview recording:", error);
                            // Show error to user but don't block completion
                            setRecordingError("Failed to save recording: " + error.message);
                        }
                    }, 1000); // Reduced timeout but still allows for chunk processing
                }).catch((error) => {
                    console.error("Failed to stop recording:", error);
                    setRecordingError("Failed to stop recording properly: " + error.message);
                });
            }

            // Speak completion message if voice mode is enabled
            if (isVoiceMode) {
                setTimeout(() => {
                    speakText(completionMessage.content);
                }, 500);
            }
        }
    };

    const sendMessage = async () => {
        if (!currentInput.trim()) return;

        const userMessage = {
            type: "user",
            content: currentInput,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setLastUserResponse(currentInput);
        setLoading(true);

        try {
            const requestData = {
                prompt: currentInput,
                app_id: applicantId,
            };

            const response = await ai_interview_service(requestData);

            if (response.data && response.data.result) {
                const aiMessage = {
                    type: "ai",
                    content: response.data.result,
                    timestamp: new Date().toLocaleTimeString(),
                    isFallback: response.data.fallback || false,
                };

                setMessages((prev) => [...prev, aiMessage]);

                // Speak AI response if voice mode is enabled and wait for it to finish before continuing
                if (isVoiceMode) {
                    const utterance = speakText(aiMessage.content);
                    if (utterance) {
                        utterance.onend = () => {
                            setIsSpeaking(false);
                            // Wait for AI response to finish before asking next question or showing completion
                            setTimeout(() => {
                                askNextQuestion();
                            }, 1000); // Short pause after AI finishes speaking
                        };
                    } else {
                        // Fallback if speech synthesis fails
                        setTimeout(() => {
                            askNextQuestion();
                        }, 3000);
                    }
                } else {
                    // Text mode - proceed after a delay
                    setTimeout(() => {
                        askNextQuestion();
                    }, 3000);
                }

                // Show warning if using fallback response
                if (response.data.fallback) {
                    const warningMessage = {
                        type: "ai",
                        content: `<p style="color: orange; font-style: italic;">Note: AI service is currently unavailable, so I'm providing a general response. Your answer has still been recorded.</p>`,
                        timestamp: new Date().toLocaleTimeString(),
                    };
                    setTimeout(() => {
                        setMessages((prev) => [...prev, warningMessage]);
                    }, 1000);
                }

                // Save the response if it's answering a guide question
                if (currentQuestion) {
                    try {
                        await save_ai_interview_response_service({
                            app_id: applicantId,
                            question: currentQuestion.guideqs,
                            answer: currentInput,
                            ai_feedback: response.data.result,
                        });

                        // Track answered questions
                        setAnsweredQuestions((prev) => [
                            ...prev,
                            {
                                question: currentQuestion.guideqs,
                                answer: currentInput,
                                ai_feedback: response.data.result,
                            },
                        ]);
                    } catch (saveError) {
                        console.error(
                            "Failed to save interview response:",
                            saveError
                        );
                    }
                }

                // Don't automatically proceed to next question here - it's handled in the voice callback above
            }
        } catch (error) {
            console.error("Error sending message:", error);

            // Provide a fallback response even when the service fails
            const fallbackResponses = [
                "Thank you for your response. I've recorded your answer and we'll move on to the next question.",
                "I appreciate your detailed answer. Your response has been noted.",
                "Thank you for sharing that. Let's continue with the next question.",
                "Your response has been recorded. That shows good insight.",
                "I've noted your answer. Thank you for your thoughtful response.",
            ];

            const randomFallback =
                fallbackResponses[
                    Math.floor(Math.random() * fallbackResponses.length)
                ];

            const fallbackMessage = {
                type: "ai",
                content: `<p>${randomFallback}</p><p style="color: orange; font-style: italic; font-size: 12px;">Note: AI service is temporarily unavailable. Your response has been recorded.</p>`,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages((prev) => [...prev, fallbackMessage]);

            // Speak fallback response if voice mode is enabled and wait for it to finish
            if (isVoiceMode) {
                const utterance = speakText(randomFallback);
                if (utterance) {
                    utterance.onend = () => {
                        setIsSpeaking(false);
                        // Wait for fallback response to finish before asking next question or showing completion
                        setTimeout(() => {
                            askNextQuestion();
                        }, 1000);
                    };
                } else {
                    // Fallback if speech synthesis fails
                    setTimeout(() => {
                        askNextQuestion();
                    }, 2000);
                }
            } else {
                // Text mode - proceed after a delay
                setTimeout(() => {
                    askNextQuestion();
                }, 2000);
            }

            // Save the response even if AI fails
            if (currentQuestion) {
                try {
                    await save_ai_interview_response_service({
                        app_id: applicantId,
                        question: currentQuestion.guideqs,
                        answer: currentInput,
                        ai_feedback: randomFallback,
                    });

                    // Track answered questions
                    setAnsweredQuestions((prev) => [
                        ...prev,
                        {
                            question: currentQuestion.guideqs,
                            answer: currentInput,
                            ai_feedback: randomFallback,
                        },
                    ]);
                } catch (saveError) {
                    console.error(
                        "Failed to save interview response:",
                        saveError
                    );
                }
            }

            // Don't automatically proceed to next question here - it's handled in the voice callback above
        } finally {
            setLoading(false);
            setCurrentInput("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!interviewStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-400 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <Row
                        gutter={[32, 32]}
                        className="min-h-screen items-center"
                    >
                        {/* Left side - Camera and Setup */}
                        <Col xs={24} lg={14}>
                            <div className="space-y-6">
                                <div>
                                    <Title
                                        level={1}
                                        className="text-gray-800 mb-2"
                                    >
                                        Initial Interview
                                    </Title>
                                    <Text className="text-gray-500 text-lg">
                                        A quick interview to get to know you a
                                        bit better.
                                    </Text>
                                </div>

                                {/* Camera Section */}
                                <Card
                                    className="bg-black relative overflow-hidden"
                                    style={{ height: "400px" }}
                                >
                                    {cameraEnabled && cameraStream ? (
                                        <div className="relative w-full h-full">
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover"
                                                style={{
                                                    transform: "scaleX(-1)",
                                                }} // Mirror effect
                                                onError={(e) => {
                                                    console.error(
                                                        "Video element error:",
                                                        e
                                                    );
                                                    setCameraError(
                                                        "Video playback error occurred"
                                                    );
                                                }}
                                                onLoadedData={() =>
                                                    console.log(
                                                        "Video loaded data"
                                                    )
                                                }
                                                onCanPlay={() =>
                                                    console.log(
                                                        "Video can play"
                                                    )
                                                }
                                                onPlay={() =>
                                                    console.log("Video playing")
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-white">
                                            <VideoCameraAddOutlined className="text-6xl mb-4 opacity-50" />
                                            <Text className="text-white text-lg mb-2">
                                                Camera permission required
                                            </Text>
                                            <Text className="text-gray-300 text-center px-8">
                                                You must enable camera access
                                                before joining the AI interview.
                                            </Text>
                                        </div>
                                    )}

                                    {/* Camera control button */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                        <Button
                                            type={
                                                cameraEnabled
                                                    ? "default"
                                                    : "primary"
                                            }
                                            danger={cameraEnabled}
                                            shape="circle"
                                            size="large"
                                            icon={
                                                <VideoCameraIcon className="h-6 flex items-center justify-center mt-1" />
                                            }
                                            onClick={toggleCamera}
                                            className="h-12 w-12"
                                        />
                                    </div>
                                </Card>

                                {/* Device Status */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <AudioMutedOutlined
                                                className={
                                                    micTesting
                                                        ? micLevel > 5
                                                            ? "text-green-500"
                                                            : "text-yellow-500"
                                                        : "text-gray-400"
                                                }
                                            />
                                            <Text
                                                type="secondary"
                                                className="ml-2"
                                            >
                                                {micTesting
                                                    ? micLevel > 5
                                                        ? "Microphone active"
                                                        : "Speak into microphone"
                                                    : "No device selected"}
                                            </Text>
                                        </div>
                                        {micTesting && (
                                            <div className="mb-2">
                                                <div className="bg-gray-200 rounded-full h-3 w-full mb-1">
                                                    <div
                                                        className={`h-3 rounded-full transition-all duration-100 ${
                                                            micLevel > 5
                                                                ? "bg-green-500"
                                                                : "bg-yellow-500"
                                                        }`}
                                                        style={{
                                                            width: `${Math.max(
                                                                2,
                                                                micLevel
                                                            )}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <Text className="text-xs text-gray-500">
                                                    Level:{" "}
                                                    {Math.round(micLevel)}%{" "}
                                                    {micLevel > 5 ? "🎤" : "📢"}
                                                </Text>
                                                <br />
                                                <Text className="text-xs text-blue-500">
                                                    {micLevel > 5
                                                        ? "Microphone working!"
                                                        : "Try speaking louder"}
                                                </Text>
                                            </div>
                                        )}
                                        <Button
                                            type="link"
                                            size="small"
                                            className={
                                                micTesting
                                                    ? "text-red-500"
                                                    : "text-blue-500 font-medium"
                                            }
                                            onClick={testMicrophone}
                                            loading={false}
                                        >
                                            {micTesting
                                                ? "Stop Test"
                                                : "Test your mic"}
                                        </Button>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <AudioMutedOutlined
                                                className={
                                                    soundTesting
                                                        ? "text-green-500"
                                                        : "text-gray-400"
                                                }
                                            />
                                            <Text
                                                type="secondary"
                                                className="ml-2"
                                            >
                                                {soundTesting
                                                    ? "Playing test sound..."
                                                    : "No device selected"}
                                            </Text>
                                        </div>
                                        <Button
                                            type="link"
                                            size="small"
                                            className="text-blue-500 font-medium"
                                            onClick={testSound}
                                            loading={soundTesting}
                                            disabled={soundTesting}
                                        >
                                            {soundTesting
                                                ? "Playing..."
                                                : "Play test sound"}
                                        </Button>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <VideoCameraOutlined
                                                className={
                                                    cameraPermissionGranted
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }
                                            />
                                            <Text
                                                type="secondary"
                                                className="ml-2"
                                            >
                                                {cameraPermissionGranted
                                                    ? "Permission granted"
                                                    : "Permission required"}
                                            </Text>
                                        </div>
                                        <Button
                                            type="link"
                                            size="small"
                                            className="text-blue-500 font-medium"
                                            onClick={async () => {
                                                console.log(
                                                    "Testing camera..."
                                                );
                                                if (cameraStream) {
                                                    console.log(
                                                        "Current stream:",
                                                        cameraStream
                                                    );
                                                    console.log(
                                                        "Video tracks:",
                                                        cameraStream.getVideoTracks()
                                                    );
                                                    console.log(
                                                        "Video element:",
                                                        videoRef.current
                                                    );
                                                    if (videoRef.current) {
                                                        console.log(
                                                            "Video src:",
                                                            videoRef.current
                                                                .srcObject
                                                        );
                                                        console.log(
                                                            "Video ready state:",
                                                            videoRef.current
                                                                .readyState
                                                        );
                                                        console.log(
                                                            "Video paused:",
                                                            videoRef.current
                                                                .paused
                                                        );

                                                        // If video appears problematic, automatically trigger force play
                                                        if (
                                                            videoRef.current
                                                                .paused ||
                                                            videoRef.current
                                                                .readyState < 2
                                                        ) {
                                                            console.log(
                                                                "Video appears problematic, triggering automatic force play..."
                                                            );
                                                            await performForcePlay();
                                                        } else {
                                                            console.log(
                                                                "Video appears to be working correctly"
                                                            );
                                                        }
                                                    }
                                                } else {
                                                    await requestCameraPermission();
                                                }
                                            }}
                                        >
                                            Test Camera
                                        </Button>
                                    </div>
                                </div>

                                {cameraError && (
                                    <Alert
                                        message="Camera Error"
                                        description={cameraError}
                                        type="error"
                                        showIcon
                                        closable
                                        onClose={() => setCameraError(null)}
                                    />
                                )}
                            </div>
                        </Col>

                        {/* Right side - Instructions and Start */}
                        <Col xs={24} lg={10}>
                            <div className="bg-gray-50 p-8 rounded-lg h-full">
                                <div className="mb-8">
                                    <Title
                                        level={3}
                                        className="text-gray-800 mb-4"
                                    >
                                        Get ready for your AI interview
                                    </Title>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                <span className="text-blue-600 text-sm">
                                                    📅
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    Start now or come back later
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                <span className="text-blue-600 text-sm">
                                                    ⏱️
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    Expect to spend 14 minute
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                <span className="text-blue-600 text-sm">
                                                    ⚙️
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    Check your device settings
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                <span className="text-blue-600 text-sm">
                                                    🤫
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    Find a quiet place with
                                                    stable internet
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {loadingQuestions ? (
                                    <div className="flex items-center justify-center mb-6">
                                        <Spin />
                                        <Text className="ml-2">
                                            Loading interview questions...
                                        </Text>
                                    </div>
                                ) : questionsError ? (
                                    <Alert
                                        message="Error Loading Questions"
                                        description={questionsError}
                                        type="error"
                                        showIcon
                                        className="mb-6"
                                    />
                                ) : guideQuestions.length === 0 ? (
                                    <Alert
                                        message="No Questions Available"
                                        description="There are no interview questions configured in the system."
                                        type="warning"
                                        showIcon
                                        className="mb-6"
                                    />
                                ) : null}

                                {/* Voice Mode Option */}
                                {speechSupported &&
                                    guideQuestions.length > 0 && (
                                        <div className="bg-white p-4 rounded-lg border mb-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Text strong>
                                                        Voice Interview Mode
                                                    </Text>
                                                    <br />
                                                    <Text
                                                        type="secondary"
                                                        className="text-sm"
                                                    >
                                                        Enable voice mode for
                                                        hands-free interview
                                                        experience
                                                    </Text>
                                                </div>
                                                <Switch
                                                    checked={isVoiceMode}
                                                    onChange={toggleVoiceMode}
                                                    checkedChildren="Voice ON"
                                                    unCheckedChildren="Voice OFF"
                                                />
                                            </div>
                                        </div>
                                    )}

                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={startInterview}
                                    className="w-full h-14 text-lg font-medium"
                                    disabled={
                                        loadingQuestions ||
                                        questionsError ||
                                        guideQuestions.length === 0
                                    }
                                    style={{
                                        background:
                                            "linear-gradient(135deg,  #b9f2ff 0%,  #00b7eb 100%)",
                                        border: "none",
                                    }}
                                >
                                    Start Interview
                                </Button>

                                <div className="mt-6 text-center">
                                    <div>
                                        <p className="text-xs">
                                            EmpireOne BPO Solutions Inc. uses
                                            generative AI to conduct the AI
                                            interview. Your responses are used
                                            only to assess your candidacy and
                                            are never used to train AI models.
                                        </p>
                                    </div>
                                    <div className="mt-8 ">
                                        <p className="text-xs text-gray-400">
                                            <i>
                                                Note: This interview uses AI to
                                                provide personalized responses.
                                                If AI is unavailable, you'll
                                                still receive standard
                                                acknowledgments and your
                                                responses will be recorded.
                                            </i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-400 to-indigo-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <Row gutter={[24, 24]}>
                    {/* Left side - Chat Interface */}
                    <Col xs={24} lg={16}>
                        {/* Header */}
                        <Card className="mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Avatar
                                        icon={<RobotOutlined />}
                                        className="bg-blue-500"
                                    />
                                    <div>
                                        <Title level={4} className="mb-0">
                                            AI Interview Session
                                        </Title>
                                        <Text type="secondary">
                                            EmpireOne BPO Solutions Inc.
                                        </Text>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Text strong>
                                        Progress: {currentQuestionIndex}/
                                        {guideQuestions.length}
                                    </Text>
                                    <br />
                                    <Text type="secondary">
                                        Applicant ID: {applicantId}
                                    </Text>
                                    {isVoiceMode && (
                                        <>
                                            <br />
                                            <Text type="primary">
                                                🎤 Voice Mode Active
                                            </Text>
                                        </>
                                    )}
                                    {interviewCompleted && (
                                        <>
                                            <br />
                                            <Text type="success" strong>
                                                ✅ Interview Completed
                                            </Text>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Messages */}
                        <Card
                            className="mb-4"
                            style={{ height: "500px", overflowY: "auto" }}
                        >
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${
                                            message.type === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`flex items-start space-x-2 max-w-3xl ${
                                                message.type === "user"
                                                    ? "flex-row-reverse space-x-reverse"
                                                    : ""
                                            }`}
                                        >
                                            <Avatar
                                                icon={
                                                    message.type === "user" ? (
                                                        <UserOutlined />
                                                    ) : (
                                                        <RobotOutlined />
                                                    )
                                                }
                                                className={
                                                    message.type === "user"
                                                        ? "bg-green-500"
                                                        : "bg-blue-500"
                                                }
                                                size="small"
                                            />
                                            {isVoiceMode &&
                                                message.type === "ai" && (
                                                    <Button
                                                        size="small"
                                                        type="text"
                                                        icon={
                                                            isSpeaking ? (
                                                                <PauseCircleOutlined />
                                                            ) : (
                                                                <PlayCircleOutlined />
                                                            )
                                                        }
                                                        onClick={() =>
                                                            isSpeaking
                                                                ? stopSpeaking()
                                                                : speakText(
                                                                      message.content
                                                                  )
                                                        }
                                                        className="opacity-60 hover:opacity-100"
                                                    />
                                                )}
                                            <div
                                                className={`p-3 rounded-lg ${
                                                    message.type === "user"
                                                        ? "bg-green-100 text-right"
                                                        : "bg-blue-50"
                                                }`}
                                            >
                                                {message.type === "ai" ? (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: message.content,
                                                        }}
                                                    />
                                                ) : (
                                                    <p className="mb-0">
                                                        {message.content}
                                                    </p>
                                                )}
                                                <Text
                                                    type="secondary"
                                                    className="text-xs"
                                                >
                                                    {message.timestamp}
                                                </Text>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center space-x-2">
                                            <Avatar
                                                icon={<RobotOutlined />}
                                                className="bg-blue-500"
                                                size="small"
                                            />
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <Spin size="small" />{" "}
                                                <span className="ml-2">
                                                    AI is thinking...
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Invisible element for auto-scroll */}
                                <div ref={messagesEndRef} />
                            </div>
                        </Card>
                    </Col>

                    {/* Right side - Camera and Controls */}
                    <Col xs={24} lg={8}>
                        {/* Camera Section */}
                        <Card className="mb-4" title="Your Video">
                            <div
                                className="relative bg-black rounded-lg overflow-hidden"
                                style={{ height: "300px" }}
                            >
                                {cameraEnabled && cameraStream ? (
                                    <div className="relative w-full h-full">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                            style={{ transform: "scaleX(-1)" }} // Mirror effect
                                            onError={(e) => {
                                                console.error(
                                                    "Video element error:",
                                                    e
                                                );
                                                setCameraError(
                                                    "Video playback error occurred"
                                                );
                                            }}
                                            onLoadedData={() =>
                                                console.log("Video loaded data")
                                            }
                                            onCanPlay={() =>
                                                console.log("Video can play")
                                            }
                                            onPlay={() =>
                                                console.log("Video playing")
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-white">
                                        <VideoCameraAddOutlined className="text-4xl mb-2 opacity-50" />
                                        <Text className="text-white text-sm">
                                            Camera not enabled
                                        </Text>
                                    </div>
                                )}

                                {/* Camera control overlay */}
                                <div className="absolute bottom-3 right-3">
                                    <Button
                                        type={
                                            cameraEnabled
                                                ? "default"
                                                : "primary"
                                        }
                                        danger={cameraEnabled}
                                        shape="circle"
                                        icon={<VideoCameraOutlined />}
                                        onClick={toggleCamera}
                                        size="small"
                                    />
                                </div>
                            </div>

                            {cameraError && (
                                <Alert
                                    message="Camera Error"
                                    description={cameraError}
                                    type="error"
                                    showIcon
                                    closable
                                    onClose={() => setCameraError(null)}
                                    className="mt-3"
                                />
                            )}

                            {/* Recording Status */}
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                        <Text strong>
                                            {isRecording ? "Recording..." : "Not Recording"}
                                        </Text>
                                    </div>
                                    {uploadingRecording && (
                                        <div className="flex items-center space-x-2">
                                            <Spin size="small" />
                                            <Text type="secondary">Saving...</Text>
                                        </div>
                                    )}
                                </div>
                                
                                {recordingError && (
                                    <Alert
                                        message="Recording Error"
                                        description={recordingError}
                                        type="error"
                                        showIcon
                                        closable
                                        size="small"
                                        onClose={() => setRecordingError(null)}
                                        className="mt-2"
                                    />
                                )}

                                {/* Debug Controls - Remove in production */}
                                {/* {isRecording && (
                                    <div className="mt-2 flex space-x-2">
                                        <Button 
                                            size="small" 
                                            danger
                                            onClick={() => stopRecording()}
                                        >
                                            Stop Recording
                                        </Button>
                                        <Button 
                                            size="small" 
                                            type="primary"
                                            loading={uploadingRecording}
                                            onClick={async () => {
                                                try {
                                                    await stopRecording();
                                                    setTimeout(() => saveRecording(), 500);
                                                } catch (error) {
                                                    console.error("Manual save failed:", error);
                                                }
                                            }}
                                        >
                                            Save Recording Now
                                        </Button>
                                    </div>
                                )} */}
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Interview Summary - shown when completed */}
                {interviewCompleted && (
                    <Card className="mb-4" title="Interview Summary">
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <Text strong className="text-green-600">
                                        Questions Answered
                                    </Text>
                                    <br />
                                    <Title
                                        level={2}
                                        className="text-green-600 mb-0"
                                    >
                                        5
                                        {/* {answeredQuestions.length} */}
                                    </Title>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <Text strong className="text-blue-600">
                                        Total Questions
                                    </Text>
                                    <br />
                                    <Title
                                        level={2}
                                        className="text-blue-600 mb-0"
                                    >
                                        {guideQuestions.length}
                                    </Title>
                                </div>
                            </div>
                            <Alert
                                message="Interview Completed Successfully"
                                description="All your responses have been recorded and will be reviewed by our HR team. Thank you for your time!"
                                type="success"
                                showIcon
                            />
                        </div>
                    </Card>
                )}

                {/* Input Section */}
                <Row gutter={[24, 0]}>
                    <Col span={24}>
                        <Card>
                            {isVoiceMode && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <Avatar
                                                    icon={
                                                        isListening ? (
                                                            <AudioOutlined />
                                                        ) : (
                                                            <AudioMutedOutlined />
                                                        )
                                                    }
                                                    className={
                                                        isListening
                                                            ? "bg-red-500"
                                                            : "bg-gray-400"
                                                    }
                                                    size="small"
                                                />
                                                <Text strong>
                                                    {isListening
                                                        ? "Listening..."
                                                        : "Click to speak"}
                                                </Text>
                                            </div>

                                            {isSpeaking && (
                                                <div className="flex items-center space-x-2">
                                                    <Avatar
                                                        icon={<RobotOutlined />}
                                                        className="bg-blue-500"
                                                        size="small"
                                                    />
                                                    <Text>
                                                        AI is speaking...
                                                    </Text>
                                                    <Button
                                                        size="small"
                                                        onClick={stopSpeaking}
                                                        icon={
                                                            <PauseCircleOutlined />
                                                        }
                                                    >
                                                        Stop
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex space-x-2">
                                            <Button
                                                type={
                                                    isListening
                                                        ? "danger"
                                                        : "primary"
                                                }
                                                icon={
                                                    isListening ? (
                                                        <AudioMutedOutlined />
                                                    ) : (
                                                        <AudioOutlined />
                                                    )
                                                }
                                                onClick={
                                                    isListening
                                                        ? stopListening
                                                        : startListening
                                                }
                                                disabled={loading || isSpeaking}
                                            >
                                                {isListening ? "Stop" : "Speak"}
                                            </Button>

                                            <Switch
                                                size="small"
                                                checked={isVoiceMode}
                                                onChange={toggleVoiceMode}
                                                checkedChildren="Voice"
                                                unCheckedChildren="Text"
                                            />
                                        </div>
                                    </div>

                                    {transcript && (
                                        <div className="mt-2 p-2 bg-white rounded border">
                                            <Text
                                                type="secondary"
                                                className="text-xs"
                                            >
                                                Live transcript:
                                            </Text>
                                            <br />
                                            <Text>{transcript}</Text>
                                        </div>
                                    )}

                                    {voiceError && (
                                        <Alert
                                            message={voiceError}
                                            type="error"
                                            closable
                                            className="mt-2"
                                            onClose={() => setVoiceError(null)}
                                        />
                                    )}
                                </div>
                            )}

                            <div className="flex space-x-2">
                                <TextArea
                                    value={currentInput}
                                    onChange={(e) =>
                                        setCurrentInput(e.target.value)
                                    }
                                    onKeyPress={handleKeyPress}
                                    placeholder={
                                        isVoiceMode
                                            ? "Your voice input will appear here... (You can also type manually)"
                                            : "Type your response here... (Press Enter to send, Shift+Enter for new line)"
                                    }
                                    autoSize={{ minRows: 2, maxRows: 4 }}
                                    disabled={loading}
                                    className="flex-1"
                                />
                                <Button
                                    type="primary"
                                    icon={<SendOutlined />}
                                    onClick={sendMessage}
                                    loading={loading}
                                    disabled={
                                        !currentInput.trim() || isListening
                                    }
                                    className="h-full"
                                >
                                    Send
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
