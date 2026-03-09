import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your TeleRehabX assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simple auto-reply logic
    setTimeout(() => {
      let botReplyText = "I'm not sure about that. Try asking 'What is TeleRehabX?' or 'How do I start?'.";
      const lowerInput = userMessage.text.toLowerCase();
      
      if (lowerInput.includes('what is') || lowerInput.includes('about')) {
        botReplyText = "TeleRehabX is a gamified tele-rehab platform connecting patients with therapists for recovery from home.";
      } else if (lowerInput.includes('start') || lowerInput.includes('sign up')) {
        botReplyText = "You can start by clicking the 'Start Free Trial' button on the homepage to register.";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        botReplyText = "We offer flexible pricing plans. Please check our Pricing section for more details.";
      }

      const botReply = { id: Date.now() + 1, text: botReplyText, sender: 'bot' };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-gray-200 mb-4"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                <h3 className="font-semibold">TeleRehabX Support</h3>
              </div>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 text-gray-900 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="ml-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageSquare className="h-8 w-8" />
        </motion.button>
      )}
    </div>
  );
};

export default Chatbot;
