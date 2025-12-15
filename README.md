# ✨ StarWriter AI

<div align="center">

**Transform AI-generated content into naturally human-written text**

[🌐 Live Demo](https://starwriter.ai/) • [📚 Documentation](#documentation) • [🚀 Features](#features)

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📖 About

**StarWriter AI** is a cutting-edge AI-powered platform designed to humanize AI-generated content, making it indistinguishable from human writing. Whether you're a content creator, marketer, student, or professional writer, StarWriter AI helps you bypass AI detection tools while maintaining the quality and authenticity of your content.

### 🎯 Key Highlights

- **AI Humanization** - Convert AI-generated text into natural, human-like content
- **AI Chat Assistant** - Interactive AI chatbot for content creation and assistance
- **Multi-Platform Support** - Works seamlessly across various content platforms
- **Real-time Processing** - Instant text transformation with advanced algorithms
- **User Dashboard** - Comprehensive analytics and content management
- **Enterprise Ready** - Admin panel for user and content management

---

## ✨ Features

### 🤖 Core Features
- **AI Text Humanizer** - Transform robotic AI text into natural, engaging content
- **AI Chat Interface** - Conversational AI for writing assistance and brainstorming
- **Content Comparison** - Side-by-side view of original vs. humanized text
- **Real-time Preview** - See changes as you type

### 👥 User Management
- **Authentication System** - Secure login/signup with email verification
- **User Dashboard** - Track usage, history, and account settings
- **Subscription Plans** - Flexible pricing with multiple tiers
- **Payment Integration** - Secure payment processing for premium features

### 📊 Admin Dashboard
- **User Management** - Comprehensive user control and monitoring
- **Content Moderation** - Review and manage user-generated content
- **Analytics & Insights** - Track platform usage and performance metrics
- **Blog Management** - Create, edit, and publish blog content
- **Payment Tracking** - Monitor transactions and subscriptions

### 🎨 Design & UX
- **Dark/Light Mode** - Seamless theme switching for user preference
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI Components** - Built with Radix UI and Shadcn/ui
- **Smooth Animations** - Enhanced UX with Framer Motion
- **Accessibility First** - WCAG compliant components

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** React Context API
- **Forms:** React Hook Form
- **HTTP Client:** Custom API client with error handling

### Development Tools
- **Package Manager:** npm/yarn/pnpm
- **Linting:** ESLint
- **Type Checking:** TypeScript
- **Containerization:** Docker

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm** / **yarn** / **pnpm** / **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/starwriter-ai.git
   cd starwriter-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure the following variables:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   # Add other required environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
starwriter-ai/
├── public/                    # Static assets
│   └── resources/
│       └── images/           # Image assets
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (commonLayout)/  # Public pages layout
│   │   │   ├── ai-chat/     # AI chat interface
│   │   │   ├── ai-humanizer/# Text humanization
│   │   │   ├── blogs/       # Blog section
│   │   │   ├── pricing/     # Pricing plans
│   │   │   └── terms/       # Terms & conditions
│   │   ├── (dashboardLayout)/# Dashboard layout
│   │   │   ├── dashboard/   # User dashboard
│   │   │   └── admin-login/ # Admin authentication
│   │   ├── login/           # User authentication
│   │   ├── signup/          # User registration
│   │   └── providers/       # Context providers
│   ├── components/          # React components
│   │   ├── auth/            # Authentication components
│   │   ├── chatbot/         # Chatbot components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── home/            # Landing page components
│   │   ├── shared/          # Shared components (Navbar, Footer)
│   │   └── ui/              # Shadcn UI components
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── services/            # API service layer
├── components.json          # Shadcn UI configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
└── Dockerfile               # Docker configuration
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Type Checking
npm run typecheck    # Run TypeScript compiler check

# Linting
npm run lint         # Run ESLint
```

---

## 🐳 Docker Deployment

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t starwriter-ai .

# Run the container
docker run -p 3000:3000 starwriter-ai
```

---

## 🌟 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with features overview |
| **AI Humanizer** | `/ai-humanizer` | Text humanization tool |
| **AI Chat** | `/ai-chat` | Interactive AI assistant |
| **Pricing** | `/pricing` | Subscription plans |
| **Blog** | `/blogs` | Articles and resources |
| **Dashboard** | `/dashboard` | User control panel |
| **Admin Panel** | `/dashboard` | Administrative interface |

---

## 🔐 Authentication Flow

1. **User Registration** - Sign up with email verification
2. **Email Verification** - Verify account via OTP
3. **Login** - Secure authentication with JWT tokens
4. **Password Recovery** - Reset password via email
5. **Protected Routes** - Automatic redirection for unauthorized access

---

## 🎨 Theme Customization

The application supports both light and dark themes. Theme preference is persisted across sessions using local storage.

```typescript
// Toggle theme
import { useTheme } from '@/hooks/useTheme';

const { theme, toggleTheme } = useTheme();
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is proprietary software. All rights reserved.

---

## 📧 Contact & Support

- **Website:** [starwriter.ai](https://starwriter.ai/)
- **Support:** Contact us through the live chat on our website
- **Issues:** Report bugs or request features through GitHub Issues

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Radix Icons](https://www.radix-ui.com/icons)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

<div align="center">

**Made with ❤️ by the StarWriter AI Team**

[Visit Live Site](https://starwriter.ai/) • [Report Bug](https://github.com/yourusername/starwriter-ai/issues) • [Request Feature](https://github.com/yourusername/starwriter-ai/issues)

</div>
