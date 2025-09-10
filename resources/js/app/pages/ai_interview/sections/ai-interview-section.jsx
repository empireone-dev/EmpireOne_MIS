import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Card, Typography, Spin, Alert, Avatar, Space, Switch, Progress } from "antd";
import { SendOutlined, RobotOutlined, UserOutlined, AudioOutlined, AudioMutedOutlined, PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { ai_interview_service, get_guide_questions_for_ai_service, save_ai_interview_response_service } from "@/app/pages/services/open-ai-service";

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
    
    // Refs for speech APIs
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);

    // Extract app_id from URL
    useEffect(() => {
        const urlParts = window.location.pathname.split('/');
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

    // Cleanup speech on component unmount
    useEffect(() => {
        return () => {
            stopListening();
            stopSpeaking();
        };
    }, []);

    // Initialize Speech Recognition and Text-to-Speech
    const initializeSpeechAPIs = () => {
        // Check for Speech Recognition support
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';
            
            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setVoiceError(null);
            };
            
            recognitionRef.current.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                
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
        if ('speechSynthesis' in window) {
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
            const plainText = text.replace(/<[^>]*>/g, '');
            
            const utterance = new SpeechSynthesisUtterance(plainText);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
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

    const startInterview = async () => {
        setInterviewStarted(true);
        
        const welcomeMessage = {
            type: 'ai',
            content: `
                <div>
                    <p><strong>Welcome to EmpireOne BPO Solutions Inc. AI Interview!</strong></p>
                    <p>I'm your AI interviewer today. I'll be asking you ${guideQuestions.length} randomly selected questions to better understand your qualifications and fit for this position.</p>
                    <p>Please feel free to take your time with your responses. Let's begin!</p>
                </div>
            `,
            timestamp: new Date().toLocaleTimeString()
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
                type: 'ai',
                content: `
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <h3 style="color: white; margin-bottom: 15px;">🎉 Halfway Point Reached!</h3>
                        <p style="margin-bottom: 10px;"><strong>Excellent progress!</strong> You've successfully completed 5 questions.</p>
                        <p style="margin-bottom: 10px;">You're doing great! Your responses show good insight and professionalism.</p>
                        <p style="margin-bottom: 0;"><strong>Let's continue with the remaining ${guideQuestions.length - 5} questions.</strong></p>
                    </div>
                `,
                timestamp: new Date().toLocaleTimeString()
            };
            
            setMessages(prev => [...prev, midpointMessage]);
            
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
                type: 'ai',
                content: `<p><strong>Question ${currentQuestionIndex + 1}:</strong> ${question.guideqs}</p>`,
                timestamp: new Date().toLocaleTimeString()
            };

            setMessages(prev => [...prev, questionMessage]);
            setCurrentQuestionIndex(prev => prev + 1);
            
            // Speak the question if voice mode is enabled and wait for it to finish
            if (isVoiceMode) {
                setTimeout(() => {
                    speakText(questionMessage.content);
                }, 500);
            }
        } else {
            // Interview completed - final message
            const completionMessage = {
                type: 'ai',
                content: `
                    <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 25px; border-radius: 10px; text-align: center;">
                        <h2 style="color: white; margin-bottom: 20px;">Interview Successfully Completed!</h2>
                        <p style="margin-bottom: 15px;"><strong>Congratulations!</strong> You have successfully answered all ${guideQuestions.length} interview questions.</p>
                        <p style="margin-bottom: 15px;">Your responses have been thoroughly recorded and demonstrate your qualifications and experience.</p>
                        <p style="margin-bottom: 15px;"><strong>What happens next?</strong></p>
                        <ul style="text-align: left; margin-bottom: 15px; padding-left: 20px;">
                            <li>Our HR team will review your responses</li>
                            <li>You'll be contacted within 2-3 business days</li>
                            <li>Next steps will be communicated via email</li>
                        </ul>
                        <p style="margin-bottom: 0;"><strong>Thank you for your interest in EmpireOne BPO Solutions Inc.!</strong></p>
                    </div>
                `,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, completionMessage]);
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
            type: 'user',
            content: currentInput,
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);
        setLastUserResponse(currentInput);
        setLoading(true);
        
        try {
            const requestData = {
                prompt: currentInput,
                app_id: applicantId
            };

            const response = await ai_interview_service(requestData);
            
            if (response.data && response.data.result) {
                const aiMessage = {
                    type: 'ai',
                    content: response.data.result,
                    timestamp: new Date().toLocaleTimeString(),
                    isFallback: response.data.fallback || false
                };

                setMessages(prev => [...prev, aiMessage]);
                
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
                        type: 'ai',
                        content: `<p style="color: orange; font-style: italic;">Note: AI service is currently unavailable, so I'm providing a general response. Your answer has still been recorded.</p>`,
                        timestamp: new Date().toLocaleTimeString()
                    };
                    setTimeout(() => {
                        setMessages(prev => [...prev, warningMessage]);
                    }, 1000);
                }
                
                // Save the response if it's answering a guide question
                if (currentQuestion) {
                    try {
                        await save_ai_interview_response_service({
                            app_id: applicantId,
                            question: currentQuestion.guideqs,
                            answer: currentInput,
                            ai_feedback: response.data.result
                        });
                        
                        // Track answered questions
                        setAnsweredQuestions(prev => [...prev, {
                            question: currentQuestion.guideqs,
                            answer: currentInput,
                            ai_feedback: response.data.result
                        }]);
                    } catch (saveError) {
                        console.error("Failed to save interview response:", saveError);
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
                "I've noted your answer. Thank you for your thoughtful response."
            ];
            
            const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            
            const fallbackMessage = {
                type: 'ai',
                content: `<p>${randomFallback}</p><p style="color: orange; font-style: italic; font-size: 12px;">Note: AI service is temporarily unavailable. Your response has been recorded.</p>`,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, fallbackMessage]);
            
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
                        ai_feedback: randomFallback
                    });
                    
                    // Track answered questions
                    setAnsweredQuestions(prev => [...prev, {
                        question: currentQuestion.guideqs,
                        answer: currentInput,
                        ai_feedback: randomFallback
                    }]);
                } catch (saveError) {
                    console.error("Failed to save interview response:", saveError);
                }
            }
            
            // Don't automatically proceed to next question here - it's handled in the voice callback above
        } finally {
            setLoading(false);
            setCurrentInput("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!interviewStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-400 to-indigo-100 flex justify-center items-center py-8">
                <Card className="w-full max-w-2xl mx-4">
                    <div className="text-center space-y-6">
                        <Avatar 
                            size={80} 
                            icon={<RobotOutlined />} 
                            className="bg-blue-500 mx-auto"
                        />
                        <Title level={2}>AI Interview System</Title>
                        <Paragraph className="text-gray-600">
                            Welcome to the EmpireOne BPO Solutions Inc. AI-powered interview system. 
                            This interview will use our predefined guide questions to evaluate your 
                            qualifications and fit for the position.
                        </Paragraph>
                        
                        {loadingQuestions ? (
                            <div className="flex items-center justify-center space-x-2">
                                <Spin />
                                <Text>Loading interview questions...</Text>
                            </div>
                        ) : questionsError ? (
                            <Alert 
                                message="Error Loading Questions" 
                                description={questionsError}
                                type="error" 
                                showIcon 
                            />
                        ) : guideQuestions.length > 0 ? (
                            <>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <Text strong>Interview Overview:</Text>
                                    <ul className="mt-2 text-left">
                                        <li>• {guideQuestions.length} randomly selected questions</li>
                                        <li>• AI-powered evaluation and follow-up questions</li>
                                        <li>• Professional interview environment</li>
                                        <li>• Take your time with responses</li>
                                    </ul>
                                </div>
                                
                                {speechSupported && (
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Text strong>Voice Interview Mode</Text>
                                                <br />
                                                <Text type="secondary" className="text-sm">
                                                    Enable voice mode for hands-free interview experience
                                                </Text>
                                            </div>
                                            <Switch 
                                                checked={isVoiceMode}
                                                onChange={toggleVoiceMode}
                                                checkedChildren="Voice ON"
                                                unCheckedChildren="Voice OFF"
                                            />
                                        </div>
                                        {isVoiceMode && (
                                            <Alert 
                                                message="Voice Mode Enabled" 
                                                description="The AI will speak questions and you can respond using voice. Make sure your microphone is working."
                                                type="info" 
                                                showIcon 
                                                className="mt-3"
                                            />
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Alert 
                                message="No Questions Available" 
                                description="There are no interview questions configured in the system."
                                type="warning" 
                                showIcon 
                            />
                        )}

                        <Button 
                            type="primary" 
                            size="large" 
                            onClick={startInterview}
                            icon={<RobotOutlined />}
                            className="h-12 px-8"
                            disabled={loadingQuestions || questionsError || guideQuestions.length === 0}
                        >
                            Start Interview
                        </Button>
                        
                        <div className="mt-4">
                            <Text type="secondary" className="text-sm">
                                Note: This interview uses AI to provide personalized responses. 
                                If AI is unavailable, you'll still receive standard acknowledgments and your responses will be recorded.
                            </Text>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col py-8">
            <div className="flex-1 max-w-4xl mx-auto w-full px-4">
                {/* Header */}
                <Card className="mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Avatar icon={<RobotOutlined />} className="bg-blue-500" />
                            <div>
                                <Title level={4} className="mb-0">AI Interview Session</Title>
                                <Text type="secondary">EmpireOne BPO Solutions Inc.</Text>
                            </div>
                        </div>
                        <div className="text-right">
                            <Text strong>Progress: {currentQuestionIndex}/{guideQuestions.length}</Text>
                            <br />
                            <Text type="secondary">Applicant ID: {applicantId}</Text>
                            {isVoiceMode && (
                                <>
                                    <br />
                                    <Text type="primary">🎤 Voice Mode Active</Text>
                                </>
                            )}
                            {interviewCompleted && (
                                <>
                                    <br />
                                    <Text type="success" strong>✅ Interview Completed</Text>
                                </>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Messages */}
                <Card className="flex-1 mb-4" style={{ height: '500px', overflowY: 'auto' }}>
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-start space-x-2 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <Avatar 
                                        icon={message.type === 'user' ? <UserOutlined /> : <RobotOutlined />} 
                                        className={message.type === 'user' ? 'bg-green-500' : 'bg-blue-500'}
                                        size="small"
                                    />
                                    {isVoiceMode && message.type === 'ai' && (
                                        <Button 
                                            size="small" 
                                            type="text" 
                                            icon={isSpeaking ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                                            onClick={() => isSpeaking ? stopSpeaking() : speakText(message.content)}
                                            className="opacity-60 hover:opacity-100"
                                        />
                                    )}
                                    <div 
                                        className={`p-3 rounded-lg ${
                                            message.type === 'user' 
                                                ? 'bg-green-100 text-right' 
                                                : 'bg-blue-50'
                                        }`}
                                    >
                                        {message.type === 'ai' ? (
                                            <div dangerouslySetInnerHTML={{ __html: message.content }} />
                                        ) : (
                                            <p className="mb-0">{message.content}</p>
                                        )}
                                        <Text type="secondary" className="text-xs">
                                            {message.timestamp}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="flex items-center space-x-2">
                                    <Avatar icon={<RobotOutlined />} className="bg-blue-500" size="small" />
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <Spin size="small" /> <span className="ml-2">AI is thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Interview Summary - shown when completed */}
                {interviewCompleted && (
                    <Card className="mb-4" title="Interview Summary">
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <Text strong className="text-green-600">Questions Answered</Text>
                                    <br />
                                    <Title level={2} className="text-green-600 mb-0">{answeredQuestions.length}</Title>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <Text strong className="text-blue-600">Total Questions</Text>
                                    <br />
                                    <Title level={2} className="text-blue-600 mb-0">{guideQuestions.length}</Title>
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

                {/* Input */}
                <Card>
                    {isVoiceMode && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <Avatar 
                                            icon={isListening ? <AudioOutlined /> : <AudioMutedOutlined />} 
                                            className={isListening ? 'bg-red-500' : 'bg-gray-400'} 
                                            size="small"
                                        />
                                        <Text strong>
                                            {isListening ? 'Listening...' : 'Click to speak'}
                                        </Text>
                                    </div>
                                    
                                    {isSpeaking && (
                                        <div className="flex items-center space-x-2">
                                            <Avatar 
                                                icon={<RobotOutlined />} 
                                                className="bg-blue-500" 
                                                size="small"
                                            />
                                            <Text>AI is speaking...</Text>
                                            <Button 
                                                size="small" 
                                                onClick={stopSpeaking}
                                                icon={<PauseCircleOutlined />}
                                            >
                                                Stop
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex space-x-2">
                                    <Button 
                                        type={isListening ? "danger" : "primary"}
                                        icon={isListening ? <AudioMutedOutlined /> : <AudioOutlined />}
                                        onClick={isListening ? stopListening : startListening}
                                        disabled={loading || isSpeaking}
                                    >
                                        {isListening ? 'Stop' : 'Speak'}
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
                                    <Text type="secondary" className="text-xs">Live transcript:</Text>
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
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={isVoiceMode ? 
                                "Your voice input will appear here... (You can also type manually)" : 
                                "Type your response here... (Press Enter to send, Shift+Enter for new line)"
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
                            disabled={!currentInput.trim() || isListening}
                            className="h-full"
                        >
                            Send
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
