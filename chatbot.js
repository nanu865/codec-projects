document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');
    
    // Sample responses for different queries
    const responses = {
        greeting: ["Hello! How can I help you today?", "Hi there! What can I do for you?", "Welcome! How may I assist you?"],
        help: ["I can help with product information, order status, returns, and general questions.", "I specialize in answering questions about our products and services."],
        products: ["We offer a wide range of products. Could you be more specific about what you're looking for?", "Our product catalog includes electronics, home goods, and clothing. What interests you?"],
        order: ["To check your order status, I'll need your order number.", "For order inquiries, please provide your order ID."],
        return: ["Our return policy allows returns within 30 days with receipt.", "You can initiate a return through your account page or by contacting support."],
        contact: ["You can reach our support team at support@example.com or call 1-800-HELP-NOW.", "Customer service is available 24/7 at our toll-free number."],
        default: ["I'm not sure I understand. Could you rephrase that?", "I'm still learning. Can you ask that in a different way?", "I don't have an answer for that yet. Try asking about our products or services."]
    };
    
    // Keywords and corresponding responses
    const keywords = [
        { words: ['hello', 'hi', 'hey'], response: 'greeting' },
        { words: ['help', 'assist', 'support'], response: 'help' },
        { words: ['product', 'item', 'catalog'], response: 'products' },
        { words: ['order', 'purchase', 'delivery'], response: 'order' },
        { words: ['return', 'refund', 'exchange'], response: 'return' },
        { words: ['contact', 'phone', 'email', 'call'], response: 'contact' }
    ];
    
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addMessage(message, 'user');
            userInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate bot thinking
            setTimeout(() => {
                // Remove typing indicator
                removeTypingIndicator();
                
                // Get bot response
                const response = getBotResponse(message);
                addMessage(response, 'bot');
                
                // Scroll to bottom of chat
                chatContainer.scrollTop = chatContainer.scrollTop + 1000;
            }, 1000 + Math.random() * 2000);
        }
    });
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('flex', 'chat-message');
        
        if (sender === 'user') {
            messageDiv.classList.add('justify-end');
            messageDiv.innerHTML = `
                <div class="bg-indigo-600 text-white rounded-lg p-4 max-w-xs md:max-w-md">
                    <p>${text}</p>
                </div>
            `;
        } else {
            messageDiv.classList.add('justify-start');
            messageDiv.innerHTML = `
                <div class="bg-indigo-100 rounded-lg p-4 max-w-xs md:max-w-md">
                    <p>${text}</p>
                </div>
            `;
        }
        
        chatContainer.appendChild(messageDiv);
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('flex', 'justify-start', 'chat-message');
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="bg-gray-200 rounded-lg p-4 max-w-xs">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatContainer.appendChild(typingDiv);
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for keywords
        for (const keyword of keywords) {
            for (const word of keyword.words) {
                if (lowerMessage.includes(word)) {
                    const possibleResponses = responses[keyword.response];
                    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
                }
            }
        }
        
        // Default response if no keywords matched
        const defaultResponses = responses.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
});