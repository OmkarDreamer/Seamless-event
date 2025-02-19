import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(input),
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    if (input.includes('event')) {
      return "I can help you find or create events! Would you like to browse available events or create a new one?";
    } else if (input.includes('register')) {
      return "To register for an event, simply click the 'Register Now' button on any event card. You'll need to be signed in to complete registration.";
    } else if (input.includes('price') || input.includes('cost')) {
      return "We have both free and premium events. Premium events offer additional benefits like networking opportunities and exclusive content.";
    } else {
      return "I'm here to help! You can ask me about events, registration, pricing, or any other questions you have.";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="p-4 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default ChatBot;
