import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Shield } from 'lucide-react';

interface Message {
  content: string | React.ReactNode;
  timestamp: number;
  isUser: boolean;
}

const bgChatFlow = {
  services: [
    "Data-Driven Analysis: Transform data into actionable insights.",
    "AI-Powered Intelligence: Predictive analytics for informed decision-making.",
    "Comprehensive Protection: End-to-end solutions for lasting change.",
    "Incident Reporting & Analysis: Streamlined incident reporting and analysis tools.",
    "Evidence Management: Enhanced evidence collection, organization, and analysis.",
    "AI-Powered Legal Support: AI-driven tools for legal strategy and case preparation.",
    "Advocacy Empowerment: Tools to amplify advocacy efforts and drive systemic reform.",
    "Behavioral Analysis: Understand the impact of abuse on child development.",
    "Legislative & Policy Support: Advanced tools for legislative and policy change.",
    "Ecosystem Mapping: Dismantle abusive networks by understanding their ecosystems.",
    "Public Awareness: Tools for public engagement and media relations."
  ],
  cdi: [
    "The Child Defense Institute empowers child protection efforts through advanced technology and data science.",
    "We provide tools and resources to help prevent and respond to child abuse, including:",
    "Data-driven analysis to uncover patterns and inform strategies.\nAI-powered tools for case investigation and legal support.\nAdvocacy resources to drive systemic change.",
    "We believe in using data and technology to create a safer and more just world for children.",
    "For further inquiry contact us",
    "Get Support"
  ]
};

const TypingAnimation: React.FC = () => (
  <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg">
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    if (isOpen) {
      const timer = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);

      if (!savedMessages || JSON.parse(savedMessages).length === 0) {
        initiateChat();
      }

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const initiateChat = () => {
    setMessages([]); // Clear existing messages
    setIsTyping(true);
    setTimeout(() => {
      addMessage(
        <span>
          Hi welcome to Child Defense Institute <Shield className="inline-block w-4 h-4 text-yellow-500" />
        </span>,
        false
      );
      setIsTyping(false);
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          addMessage("How may I help you? 😊", false);
          setIsTyping(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  const addMessage = (content: string | React.ReactNode, isUser: boolean) => {
    setMessages(prev => [...prev, { content, timestamp: Date.now(), isUser }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage(message, true);
      processUserMessage(message);
      setMessage('');
    }
  };

  const processUserMessage = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('services')) {
      respondWithServices();
    } else if (lowerCaseMessage.includes('child defense institute') || lowerCaseMessage.includes('cdi') || lowerCaseMessage.includes('what is child defense institute')) {
      respondWithCDIInfo();
    } else {
      respondWithDefaultMessage();
    }
  };

  const respondWithServices = () => {
    setIsTyping(true);
    setTimeout(() => {
      bgChatFlow.services.forEach((service, index) => {
        setTimeout(() => {
          addMessage(service, false);
          if (index === bgChatFlow.services.length - 1) {
            setIsTyping(false);
            setTimeout(() => {
              addMessage(<a href="/support" className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block mt-2">Get Support</a>, false);
            }, 1000);
          }
        }, index * 2000);
      });
    }, 1000);
  };

  const respondWithCDIInfo = () => {
    setIsTyping(true);
    bgChatFlow.cdi.forEach((info, index) => {
      setTimeout(() => {
        if (index === bgChatFlow.cdi.length - 1) {
          addMessage(<a href="/support" className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block mt-2">Get Support</a>, false);
          setIsTyping(false);
        } else {
          addMessage(info, false);
        }
      }, (index + 1) * 2000);
    });
  };

  const respondWithDefaultMessage = () => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage("I understand. For specific questions, please contact us.", false);
      setIsTyping(false);
      setTimeout(() => {
        addMessage(<a href="/support" className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block mt-2">Contact Us</a>, false);
      }, 2000);
    }, 1000);
  };

  const formatTimestamp = (timestamp: number) => {
    const diffInSeconds = Math.floor((currentTime - timestamp) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            clearChatHistory();
          }}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg w-80">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Support Chat</h3>
            <button
              onClick={() => {
                setIsOpen(false);
                clearChatHistory();
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-96 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {typeof msg.content === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                  ) : (
                    msg.content
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(msg.timestamp)}
                </div>
              </div>
            ))}
            {isTyping && <TypingAnimation />}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

