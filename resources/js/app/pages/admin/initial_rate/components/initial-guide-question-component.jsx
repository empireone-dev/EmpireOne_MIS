import { useState, useEffect } from "react";

export default function InitialGuideQuestionComponent({ question, onChange, onAnswerChange, answer }) {
    const [checked, setChecked] = useState(!!answer);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [speechStartPosition, setSpeechStartPosition] = useState(0);

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'en-US';
            recognitionInstance.maxAlternatives = 1;

            let finalTranscript = '';

            recognitionInstance.onresult = (event) => {
                let interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }
                
                // Update the answer with both final and interim results
                const currentAnswer = answer || '';
                const newAnswer = currentAnswer + finalTranscript + interimTranscript;
                onAnswerChange(question, newAnswer);
            };

            recognitionInstance.onstart = () => {
                console.log('Speech recognition started');
                finalTranscript = '';
            };

            recognitionInstance.onend = () => {
                console.log('Speech recognition ended');
                setIsListening(false);
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                
                // Handle specific errors
                if (event.error === 'not-allowed') {
                    alert('Microphone access denied. Please allow microphone access and try again.');
                } else if (event.error === 'no-speech') {
                    console.log('No speech detected');
                } else if (event.error === 'network') {
                    alert('Network error occurred. Please check your internet connection.');
                }
            };

            setRecognition(recognitionInstance);
        } else {
            console.warn('Speech recognition not supported in this browser');
        }
    }, [answer, question, onAnswerChange]);

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
        onChange(e);
    };

    const handleAnswerChange = (e) => {
        onAnswerChange(question, e.target.value);
    };

    const startListening = () => {
        if (recognition && !isListening) {
            try {
                setIsListening(true);
                recognition.start();
            } catch (error) {
                console.error('Error starting speech recognition:', error);
                setIsListening(false);
                alert('Error starting speech recognition. Please try again.');
            }
        }
    };

    const stopListening = () => {
        if (recognition && isListening) {
            try {
                recognition.stop();
            } catch (error) {
                console.error('Error stopping speech recognition:', error);
            }
            setIsListening(false);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div className='mb-4 '>
            <div className='flex items-center mb-3 gap-1'>
                <input
                    onChange={handleCheckboxChange}
                    id="default-checkbox"
                    type="checkbox"
                    checked={checked}
                    value={question}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-black rounded focus:ring-blue-500 focus:ring-2"
                />
                <h1><b>{question}</b></h1>
            </div>

            {checked && (
                <div className="relative">
                    <textarea
                        className="w-full p-2 pr-12 border rounded border-gray-400"
                        placeholder="Your answer..."
                        value={answer || ''}
                        onChange={handleAnswerChange}
                        rows={4}
                    />
                    {recognition && (
                        <button
                            type="button"
                            onClick={toggleListening}
                            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                                isListening 
                                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                            title={isListening ? 'Stop recording' : 'Start voice input'}
                        >
                            <svg 
                                className="w-4 h-4" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                {isListening ? (
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a2 2 0 114 0v4a2 2 0 11-4 0V7z" clipRule="evenodd" />
                                ) : (
                                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                                )}
                            </svg>
                        </button>
                    )}
                    {isListening && (
                        <div className="absolute -top-8 right-0 bg-red-500 text-white px-2 py-1 rounded text-xs">
                            Listening...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
