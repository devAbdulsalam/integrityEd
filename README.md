# Gracie 🎓

**AI-Powered Anti-Corruption Education Platform for Youth Empowerment**

Gracie is an innovative educational platform that uses artificial intelligence to create engaging, youth-focused anti-corruption content featuring **Amina the Youth Advocate** - a relatable peer guide who helps young learners understand integrity, ethics, and good governance through interactive video content.

## 🎯 Project Overview

Gracie transforms traditional anti-corruption education into dynamic, accessible content for youth. Built in collaboration with UNODC's educational modules, the platform generates personalized video scripts that make complex ethical concepts relatable and actionable for young audiences.

![Platform Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Gracie+Platform)

## ✨ Key Features

### 🎭 **Character-Driven Learning**

- **Amina the Youth Advocate**: A friendly, relatable peer guide character
- **African/Nigerian English accent** for cultural relevance
- **Energetic, hopeful tone** designed for youth engagement

### 🎥 **AI-Generated Video Content**

- **Motivation Clips** (45-60 seconds): Inspirational messages about integrity
- **Scenario Clips** (60-90 seconds): Real-life ethical dilemmas and solutions
- **Customizable scripts** based on educational objectives

### 🛠️ **Technical Features**

- **React/Node.js full-stack application**
- **Google Gemini AI integration** (Notebook LM technology)
- **Real-time script generation**
- **RESTful API architecture**
- **Responsive design** for multiple devices

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Google AI API key (Gemini)
- Basic understanding of React and Node.js

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/Gracie.git
cd Gracie
```

2. **Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Add your Google AI API key to .env
npm start
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install
npm start
```

4. **Access the application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📁 Project Structure

```
Gracie/
├── backend/
│   ├── server.js          # Express server with AI integration
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── VideoGenerator.jsx  # Main React component
│   │   ├── App.js         # React application
│   │   └── index.js       # Entry point
│   └── package.json      # Frontend dependencies
├── public/               # Static assets
├── .gitignore
└── README.md
```

## 🔧 Configuration

### Backend Environment (.env)

```env
GOOGLE_AI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### API Endpoints

| Method | Endpoint                      | Description                                 |
| ------ | ----------------------------- | ------------------------------------------- |
| POST   | `/api/generate-video-scripts` | Generate both motivation and scenario clips |
| POST   | `/api/generate-single-clip`   | Generate specific clip type                 |
| GET    | `/api/health`                 | Health check endpoint                       |

## 🎬 Video Content Types

### 1. **Motivation Clips** (45-60 seconds)

```
"Every action we take matters! Refusing to give or accept bribes
makes us role models for others. Let's stand for integrity together."
```

### 2. **Scenario Clips** (60-90 seconds)

```
"Imagine you're at a school office, and someone asks for 'something small'
before helping you. What would you do? Let's talk about honest actions."
```

## 🧠 AI Integration

Gracie uses Google's Gemini AI (similar to Notebook LM) to generate contextually appropriate content:

```javascript
// Example of AI prompt for character consistency
const persona = {
	role: 'Peer Guide',
	tone: 'Energetic, hopeful, conversational',
	accent: 'African English or Nigerian English',
	purpose:
		'Encourage learners and connect lessons to real-life youth experiences',
};
```

## 🎨 Customization Options

### Character Customization

- Modify `aminaPersona` object in `server.js`
- Adjust tone, accent, and messaging style
- Add new character traits as needed

### Content Customization

- Extend clip types in the `VideoScriptGenerator` class
- Modify script prompts for different educational objectives
- Add new scenario templates

### Styling

- Customize CSS in `VideoGenerator.css`
- Modify color scheme in CSS variables
- Adjust responsive breakpoints

## 📚 Educational Alignment

Gracie aligns with **UNODC's Anti-Corruption Module Series**, specifically:

- **Module 1**: What Is Corruption and Why Should We Care?
- **Module 11**: Corruption, Peace and Security
- **Youth empowerment** and **ethical awareness** objectives

## 🚀 Deployment

### Heroku Deployment

```bash
# Backend
heroku create Gracie-backend
heroku config:set GOOGLE_AI_API_KEY=your_key
git push heroku main

# Frontend (Create React App)
npm run build
heroku create Gracie-frontend --buildpack https://github.com/mars/create-react-app-buildpack.git
git push heroku main
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📊 API Response Format

### Successful Generation

```json
{
	"success": true,
	"clips": {
		"motivation": {
			"type": "motivation",
			"duration": "45-60 seconds",
			"script": "Full script text here...",
			"emotional_cues": ["smile", "energetic gesture"],
			"target_audience": "youth"
		},
		"scenario": {
			"type": "scenario",
			"duration": "60-90 seconds",
			"script": "Full scenario script...",
			"scenario_setting": "school office",
			"characters": ["Amina", "Student", "Office Staff"],
			"learning_objectives": ["recognizing bribery", "making ethical choices"]
		}
	}
}
```

## 🛡️ Security Considerations

1. **API Key Security**: Never commit API keys to version control
2. **Input Validation**: Sanitize all user inputs
3. **Rate Limiting**: Implement API rate limiting in production
4. **CORS Configuration**: Configure appropriate CORS settings
5. **HTTPS Enforcement**: Use HTTPS in production environments

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Areas

- New video clip types
- Additional character personas
- Language translations
- UI/UX improvements
- Educational content expansion

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- **UNODC**: For the comprehensive Anti-Corruption Module Series
- **Google AI**: For Gemini API and Notebook LM technology
- **UNESCO**: For educational framework guidance
- **All contributors**: For helping make integrity education accessible

## 📞 Support

For support, feature requests, or questions:

- Open an [Issue](https://github.com/your-username/Gracie/issues)
- Email: support@Gracie.org
- Twitter: [@Gracie](https://twitter.com/Gracie)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/Gracie&type=Date)](https://star-history.com/#your-username/Gracie&Date)

---

**Built with ❤️ for a more transparent and ethical world**# Gracie 🎓

**AI-Powered Anti-Corruption Education Platform for Youth Empowerment**

Gracie is an innovative educational platform that uses artificial intelligence to create engaging, youth-focused anti-corruption content featuring **Amina the Youth Advocate** - a relatable peer guide who helps young learners understand integrity, ethics, and good governance through interactive video content.

## 🎯 Project Overview

Gracie transforms traditional anti-corruption education into dynamic, accessible content for youth. Built in collaboration with UNODC's educational modules, the platform generates personalized video scripts that make complex ethical concepts relatable and actionable for young audiences.

![Platform Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Gracie+Platform)

## ✨ Key Features

### 🎭 **Character-Driven Learning**

- **Amina the Youth Advocate**: A friendly, relatable peer guide character
- **African/Nigerian English accent** for cultural relevance
- **Energetic, hopeful tone** designed for youth engagement

### 🎥 **AI-Generated Video Content**

- **Motivation Clips** (45-60 seconds): Inspirational messages about integrity
- **Scenario Clips** (60-90 seconds): Real-life ethical dilemmas and solutions
- **Customizable scripts** based on educational objectives

### 🛠️ **Technical Features**

- **React/Node.js full-stack application**
- **Google Gemini AI integration** (Notebook LM technology)
- **Real-time script generation**
- **RESTful API architecture**
- **Responsive design** for multiple devices

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Google AI API key (Gemini)
- Basic understanding of React and Node.js

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/Gracie.git
cd Gracie
```

2. **Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Add your Google AI API key to .env
npm start
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install
npm start
```

4. **Access the application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📁 Project Structure

```
Gracie/
├── backend/
│   ├── server.js          # Express server with AI integration
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── VideoGenerator.jsx  # Main React component
│   │   ├── App.js         # React application
│   │   └── index.js       # Entry point
│   └── package.json      # Frontend dependencies
├── public/               # Static assets
├── .gitignore
└── README.md
```

## 🔧 Configuration

### Backend Environment (.env)

```env
GOOGLE_AI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### API Endpoints

| Method | Endpoint                      | Description                                 |
| ------ | ----------------------------- | ------------------------------------------- |
| POST   | `/api/generate-video-scripts` | Generate both motivation and scenario clips |
| POST   | `/api/generate-single-clip`   | Generate specific clip type                 |
| GET    | `/api/health`                 | Health check endpoint                       |

## 🎬 Video Content Types

### 1. **Motivation Clips** (45-60 seconds)

```
"Every action we take matters! Refusing to give or accept bribes
makes us role models for others. Let's stand for integrity together."
```

### 2. **Scenario Clips** (60-90 seconds)

```
"Imagine you're at a school office, and someone asks for 'something small'
before helping you. What would you do? Let's talk about honest actions."
```

## 🧠 AI Integration

Gracie uses Google's Gemini AI (similar to Notebook LM) to generate contextually appropriate content:

```javascript
// Example of AI prompt for character consistency
const persona = {
	role: 'Peer Guide',
	tone: 'Energetic, hopeful, conversational',
	accent: 'African English or Nigerian English',
	purpose:
		'Encourage learners and connect lessons to real-life youth experiences',
};
```

## 🎨 Customization Options

### Character Customization

- Modify `aminaPersona` object in `server.js`
- Adjust tone, accent, and messaging style
- Add new character traits as needed

### Content Customization

- Extend clip types in the `VideoScriptGenerator` class
- Modify script prompts for different educational objectives
- Add new scenario templates

### Styling

- Customize CSS in `VideoGenerator.css`
- Modify color scheme in CSS variables
- Adjust responsive breakpoints

## 📚 Educational Alignment

Gracie aligns with **UNODC's Anti-Corruption Module Series**, specifically:

- **Module 1**: What Is Corruption and Why Should We Care?
- **Module 11**: Corruption, Peace and Security
- **Youth empowerment** and **ethical awareness** objectives

## 🚀 Deployment

### Heroku Deployment

```bash
# Backend
heroku create Gracie-backend
heroku config:set GOOGLE_AI_API_KEY=your_key
git push heroku main

# Frontend (Create React App)
npm run build
heroku create Gracie-frontend --buildpack https://github.com/mars/create-react-app-buildpack.git
git push heroku main
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📊 API Response Format

### Successful Generation

```json
{
	"success": true,
	"clips": {
		"motivation": {
			"type": "motivation",
			"duration": "45-60 seconds",
			"script": "Full script text here...",
			"emotional_cues": ["smile", "energetic gesture"],
			"target_audience": "youth"
		},
		"scenario": {
			"type": "scenario",
			"duration": "60-90 seconds",
			"script": "Full scenario script...",
			"scenario_setting": "school office",
			"characters": ["Amina", "Student", "Office Staff"],
			"learning_objectives": ["recognizing bribery", "making ethical choices"]
		}
	}
}
```

## 🛡️ Security Considerations

1. **API Key Security**: Never commit API keys to version control
2. **Input Validation**: Sanitize all user inputs
3. **Rate Limiting**: Implement API rate limiting in production
4. **CORS Configuration**: Configure appropriate CORS settings
5. **HTTPS Enforcement**: Use HTTPS in production environments

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Areas

- New video clip types
- Additional character personas
- Language translations
- UI/UX improvements
- Educational content expansion

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- **UNODC**: For the comprehensive Anti-Corruption Module Series
- **Google AI**: For Gemini API and Notebook LM technology
- **UNESCO**: For educational framework guidance
- **All contributors**: For helping make integrity education accessible

## 📞 Support

For support, feature requests, or questions:

- Open an [Issue](https://github.com/your-username/Gracie/issues)
- Email: support@Gracie.org
- Twitter: [@Gracie](https://twitter.com/Gracie)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/Gracie&type=Date)](https://star-history.com/#your-username/Gracie&Date)

---

**Built with ❤️ for a more transparent and ethical world**
