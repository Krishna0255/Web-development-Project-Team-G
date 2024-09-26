const { useState, useEffect, useRef } = React;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatWindowRef = useRef(null);

  
    // Bot replies logic on the frontend
    const getBotReply = (userMessage) => {
      userMessage = userMessage.toLowerCase();
  
      let botResponse = "Sorry, I don't understand that.";
      let link = '';
  
      if (userMessage.includes('book')) {
        botResponse = 'Here is a link to one of our eBooks:';
        link = 'https://www.example.com/sample-book';
      } else if (userMessage.includes('hello')) {
        botResponse = 'Hello! How can I assist you today?';
      }
  
      return { botResponse, link };
    };
  
  

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

   
    
    const { botResponse, link } = getBotReply(input);
    const botMessage = { sender: 'bot', text: botResponse };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

     
    if (link) {
      const linkMessage = { sender: 'bot', text: `Check this out: ${link}` };
      setMessages((prevMessages) => [...prevMessages, linkMessage]);
    }

    setInput('');
  };
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="input-container" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

ReactDOM.render(<Chatbot />, document.getElementById('chatbot-root'));

document.addEventListener('DOMContentLoaded', function () {
  const chatbotButton = document.getElementById('chatbot-btn');
  const chatbotModal = document.getElementById('chatbot-modal');
  const closeChatbot = document.getElementById('close-chatbot');

  // Open chatbot modal when button is clicked
  chatbotButton.addEventListener('click', function () {
      chatbotModal.style.display = 'block';
  });

  // Close chatbot modal when close button is clicked
  closeChatbot.addEventListener('click', function () {
      chatbotModal.style.display = 'none';
  });

  // Close modal when clicking outside the chatbot area
  window.addEventListener('click', function (event) {
      if (event.target === chatbotModal) {
          chatbotModal.style.display = 'none';
      }
  });
});


