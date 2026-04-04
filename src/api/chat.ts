import axios from 'axios'

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || ''
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

export type ChatMessage = {
  role: 'user' | 'model'
  parts: { text: string }[]
}

export type ChatHistory = ChatMessage[]

const SYSTEM_CONTEXT = `You are a helpful shopping assistant for Trending Shop, an e-commerce store.
You help customers with:
- Product information and recommendations
- Pricing and payment options
- Shipping and delivery details
- Returns and refunds policy
- General shopping assistance

Store Information:
- Products range from €10 to €1000
- Free shipping on orders over €50
- Standard delivery: 3-5 business days
- 30-day return policy (items must be unused and in original packaging)
- Payment methods: All major credit cards, PayPal, and bank transfers
- Product categories: Electronics, Clothes, Furniture, Shoes, and more

Keep responses concise, friendly, and helpful. If you don't know something specific about a product, suggest the user browse the Products page.`

export const sendMessageToGemini = async (
  message: string,
  history: ChatHistory = [],
  storeContext?: {
    products: Array<{ id: number; title: string; price: number; category: string }>
    categories: string[]
    totalProducts: number
  }
): Promise<string> => {
  if (!GEMINI_API_KEY) {
    return 'I\'m currently unavailable. Please make sure the API key is configured.'
  }

  try {
    let contextMessage = SYSTEM_CONTEXT

    if (storeContext) {
      contextMessage += '\n\nCURRENT STORE INVENTORY:\n'
      contextMessage += `Total Products Available: ${storeContext.totalProducts}\n\n`
      contextMessage += `Categories: ${storeContext.categories.join(', ')}\n\n`
      contextMessage += 'Sample Products (showing first 20):\n'
      storeContext.products.forEach(p => {
        contextMessage += `- ${p.title} (€${p.price}) - Category: ${p.category}\n`
      })
      contextMessage += '\nUse this inventory information to provide accurate product recommendations and answer questions about what\'s available in the store.'
    }

    const contents = [
      {
        role: 'user',
        parts: [{ text: contextMessage }]
      },
      ...history,
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ]

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 350
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return response.data.candidates[0].content.parts[0].text
    }

    return 'I\'m sorry, I couldn\'t process that. Could you try rephrasing your question?'
  } catch (error) {
    console.error('Gemini API Error:', error)
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        return 'I\'m receiving too many requests right now. Please try again in a moment.'
      }
      if (error.response?.status === 401) {
        return 'There\'s an authentication issue. Please contact support.'
      }
    }
    return 'I\'m having trouble connecting right now. Please try again later.'
  }
}
