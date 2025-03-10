document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    const nationalSymbols = {
        "national flag": "Tiranga",
        "national anthem": "Jana Gana Mana",
        "national calendar": "Saka calendar",
        "national song": "Vande Mataram",
        "national emblem": "National Emblem of India",
        "national fruit": "Mango",
        "national river": "Ganga",
        "national animal": "Royal Bengal Tiger",
        "national tree": "Indian Banyan",
        "national aquatic animal": "Ganges River Dolphin",
        "national bird": "Indian Peacock",
        "national currency": "Indian Rupee",
        "national reptile": "King Cobra",
        "national heritage animal": "Indian Elephant",
        "national flower": "Lotus",
        "national vegetable": "Pumpkin",
        "oath of allegiance": "National Pledge"
    };

    function createMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = sender === 'user' ? 'U' : 'A';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        return messageDiv;
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addMessage(text, sender) {
        const message = createMessage(text, sender);
        messagesContainer.appendChild(message);
        scrollToBottom();
    }

    function getNationalSymbolResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        for (let key in nationalSymbols) {
            if (message.includes(key)) {
                return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${nationalSymbols[key]}`;
            }
        }
        
        return "I can provide information about India's National Symbols. Ask me about the National Flag, Anthem, Emblem, Flower, Animal, and more!";
    }

    function simulateResponse(userMessage) {
        setTimeout(() => {
            const response = getNationalSymbolResponse(userMessage);
            addMessage(response, 'assistant');
        }, 1000);
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            simulateResponse(message);
        }
    });

    // Add initial message
    addMessage("Hello! I can provide information about India's National Symbols. Ask me about the National Flag, Anthem, Emblem, Flower, Animal, and more!", 'assistant');
});

// Prevent form submission on Enter if Shift is held (for multiline input)
document.getElementById('user-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('chat-form').dispatchEvent(new Event('submit'));
    }
});