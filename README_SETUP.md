# Setup Instructions for Chatbot Feature

## Gemini API Configuration

To enable the chatbot functionality, you need to configure the Gemini API key:

### 1. Get your Gemini API Key
Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to create a free API key.

### 2. Create `.env` file
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

### 3. Add your API key
Open `.env` and replace `your_gemini_api_key_here` with your actual API key:
```
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Restart the development server
If the server is running, restart it to load the new environment variables:
```bash
npm start
```

## Features Added

### 1. Featured Products Section
- Displays 4 featured products on the home page
- Responsive grid layout (1-4 columns based on screen size)
- Hover effects with smooth animations
- Quick "Add to cart" functionality

### 2. AI-Powered Chatbot
- Floating chat button in the bottom-right corner
- Powered by Google's Gemini AI
- Provides intelligent responses about:
  - Product information and recommendations
  - Pricing and payment options
  - Shipping and delivery details
  - Returns and refunds policy
  - General shopping assistance
- Maintains conversation context
- Responsive design for all devices

## Testing the Chatbot

Try asking questions like:
- "What products do you have?"
- "What's your shipping policy?"
- "How can I return an item?"
- "What payment methods do you accept?"
- "Tell me about your prices"

The chatbot will provide helpful, context-aware responses based on your store's information.
