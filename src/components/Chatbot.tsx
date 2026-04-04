import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import { sendMessageToGemini, ChatHistory } from '../api/chat'
import { AppState } from '../redux/store'

type Message = {
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hello! How can I help you today? Feel free to ask about our products, shipping, or anything else!',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatHistoryRef = useRef<ChatHistory>([])

  const allProducts = useSelector((state: AppState) => state.products.allProducts)
  const categories = useSelector((state: AppState) => state.categories.categories)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return

    const userMessage: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    const userInput = inputValue
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    chatHistoryRef.current.push({
      role: 'user',
      parts: [{ text: userInput }]
    })

    try {
      const storeContext = {
        products: allProducts.slice(0, 20).map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          category: p.category.name
        })),
        categories: categories.map(c => c.name),
        totalProducts: allProducts.length
      }

      const botResponse = await sendMessageToGemini(userInput, chatHistoryRef.current, storeContext)

      chatHistoryRef.current.push({
        role: 'model',
        parts: [{ text: botResponse }]
      })

      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        text: 'I\'m having trouble connecting right now. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // eslint-disable-next-line no-undef
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={handleToggle}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      {isOpen && (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: { xs: '90%', sm: '380px' },
            height: '500px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Shopping Assistant
            </Typography>
            <IconButton size="small" onClick={handleToggle} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <Paper
                  sx={{
                    padding: '10px 14px',
                    maxWidth: '75%',
                    backgroundColor: message.sender === 'user' ? 'primary.main' : 'background.paper',
                    color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                    borderRadius: message.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0'
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.text}
                  </Typography>
                </Paper>
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Paper
                  sx={{
                    padding: '10px 14px',
                    backgroundColor: 'background.paper',
                    borderRadius: '12px 12px 12px 0'
                  }}
                >
                  <CircularProgress size={20} />
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              padding: '12px',
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              gap: 1,
              backgroundColor: 'background.paper'
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type your message..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
            />
            <IconButton color="primary" onClick={handleSendMessage} disabled={inputValue.trim() === '' || isLoading}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  )
}

export default Chatbot
