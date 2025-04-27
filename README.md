## 🐶 dogbot-ui
DogBot gives your dog a voice.

It’s an empathetic AI agent that helps you understand your dog’s behavior — powered by GPT-4 and a semantic database (Weaviate).
Together, they translate symptoms into insights and support you with clear, kind guidance.

This repo contains the frontend: a React app that connects to the DogBot agent and provides a clean, mobile-first chat interface.

## 🔧 Local Setup
Clone the repo and install dependencies:

```bash
git clone https://github.com/kemperfekt/dogbot-ui.git
cd dogbot-ui
npm install
```

## 🧪 Start the Frontend
```bash
npm start
```
- Available at http://localhost:3000
- Make sure the DogBot agent backend is running locally or update the API URL in `src/components/Chat.jsx`.

## 🔑 Required Environment
No environment variables are needed for the frontend itself.  
However, ensure the backend (`dogbot-agent`) has its environment configured properly.

## 📦 Tech Stack
- React 18 – lightweight, component-based frontend library
- Tailwind CSS 3.4 – utility-first CSS framework for rapid UI development
- Fetch API – native JavaScript API for server communication
- Create React App (CRA) – project scaffolding
- Mobile-first, responsive design

## 🔄 How It Works
- The user enters a question or describes a symptom in the chat interface
- The frontend sends the input via POST request to the DogBot agent API (`/api/chat`)
- GPT processes the message, optionally retrieves relevant data from Weaviate, and generates a response
- The frontend displays DogBot’s reply in a clean, mobile-optimized chat view

## 📚 Related Repositories
🔵 Backend (FastAPI + GPT + Weaviate): [dogbot-agent](https://github.com/kemperfekt/dogbot-agent)  
🟡 Data & Weaviate content: [dogbot-ops](https://github.com/kemperfekt/dogbot-ops)  
🐶 Project meta-repo with vision and coordination: [dogbot](https://github.com/kemperfekt/dogbot)
