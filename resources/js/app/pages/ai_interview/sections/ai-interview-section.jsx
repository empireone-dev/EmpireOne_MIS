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
} from "@/app/pages/services/open-ai-service";

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
    const [isVoiceMode, setIsVoiceMode] = useState(false);
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

    // Refs for speech APIs and camera
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);
    const videoRef = useRef(null);

    // Extract app_id from URL
    useEffect(() => {
        const urlParts = window.location.pathname.split("/");
        const appIdFromUrl = urlParts[urlParts.length - 1];
        if (appIdFromUrl) {
            setApplicantId(appIdFromUrl);
        }
    }, []);

    // Load guide questions on component mount
    useEffect(() => {
        loadGuideQuestions();
        initializeSpeechAPIs();
    }, []);

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
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });

            setCameraStream(stream);
            setCameraPermissionGranted(true);
            setCameraEnabled(true);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
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
        }
    };

    const toggleCamera = async () => {
        if (cameraEnabled) {
            stopCamera();
        } else {
            await requestCameraPermission();
        }
    };

    // Cleanup camera on component unmount
    useEffect(() => {
        return () => {
            stopListening();
            stopSpeaking();
            stopCamera();
        };
    }, []);

    const startInterview = async () => {
        setInterviewStarted(true);

        // Request camera permission when starting interview
        if (!cameraPermissionGranted) {
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
                                        General Interview
                                    </Title>
                                    <Text className="text-gray-500 text-lg">
                                        A quick 10 minute interview to get to
                                        know you a bit better.
                                    </Text>
                                </div>

                                {/* Camera Section */}
                                <Card
                                    className="bg-black relative overflow-hidden"
                                    style={{ height: "400px" }}
                                >
                                    {cameraEnabled && cameraStream ? (
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            muted
                                            className="w-full h-full object-cover"
                                            style={{ transform: "scaleX(-1)" }} // Mirror effect
                                        />
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
                                            icon={<VideoCameraOutlined />}
                                            onClick={toggleCamera}
                                            className="h-12 w-12"
                                        />
                                    </div>
                                </Card>

                                {/* Device Status */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <AudioMutedOutlined className="text-gray-400 mr-2" />
                                            <Text type="secondary">
                                                No device selected
                                            </Text>
                                        </div>
                                        <Button
                                            type="link"
                                            size="small"
                                            className="text-blue-500"
                                        >
                                            Test your mic
                                        </Button>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <AudioMutedOutlined className="text-gray-400 mr-2" />
                                            <Text type="secondary">
                                                No device selected
                                            </Text>
                                        </div>
                                        <Button
                                            type="link"
                                            size="small"
                                            className="text-blue-500"
                                        >
                                            Play test sound
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
                                            className="text-blue-500"
                                            onClick={requestCameraPermission}
                                        >
                                            Restart devices
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
                                        <div className="flex items-start space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                <span className="text-blue-600 text-sm">
                                                    📅
                                                </span>
                                            </div>
                                            <div>
                                                <Text strong>
                                                    Start now or come back later
                                                </Text>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                <span className="text-blue-600 text-sm">
                                                    ⏱️
                                                </span>
                                            </div>
                                            <div>
                                                <Text strong>
                                                    Expect to spend 14 minutes
                                                </Text>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                <span className="text-blue-600 text-sm">
                                                    ⚙️
                                                </span>
                                            </div>
                                            <div>
                                                <Text strong>
                                                    Check your device settings
                                                </Text>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                <span className="text-blue-600 text-sm">
                                                    🤫
                                                </span>
                                            </div>
                                            <div>
                                                <Text strong>
                                                    Find a quiet place with
                                                    stable internet
                                                </Text>
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
                                    <Text type="secondary" className="text-xs">
                                        EmpireOne BPO Solutions Inc. uses
                                        generative AI to conduct the AI
                                        interview. Your responses are used only
                                        to assess your candidacy and are never
                                        used to train AI models.
                                    </Text>
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
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        className="w-full h-full object-cover"
                                        style={{ transform: "scaleX(-1)" }} // Mirror effect
                                    />
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
                                        {answeredQuestions.length}
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
