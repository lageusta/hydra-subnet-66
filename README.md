# 🌊 Hydra - Bittensor Subnet 66 Liquidity Platform

**Incentivizing liquidity provision through alpha bandwidth allocation rights**

[![Deployed on Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat-square&logo=netlify)](https://dliquid-alpha.netlify.app/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🎯 Overview

Hydra is a revolutionary liquidity platform built on Bittensor Subnet 66, designed to incentivize and optimize liquidity provision through innovative alpha bandwidth allocation rights. The platform features a sophisticated governance system that allows token holders to influence liquidity routing decisions while earning rewards.

## ✨ Features

### 🖥️ Interactive Dashboard
- **Real-time Liquidity Metrics**: Live visualization of liquidity pools and allocation
- **Interactive Charts**: Built with Recharts for comprehensive data visualization
- **Subnet Performance Tracking**: Monitor subnet health and performance metrics
- **User Portfolio Management**: Track personal stakes and voting power

### 🗳️ Governance System
- **SN66 Token Staking**: Stake tokens to gain α-Stake voting power
- **Liquidity Range Voting**: Participate in liquidity routing decisions
- **Proposal System**: Submit and vote on platform improvements
- **Real-time Voting Interface**: Interactive modal-based voting system

### 📚 Comprehensive Whitepaper
- **Technical Documentation**: Detailed system architecture and components
- **Interactive Navigation**: Sectioned whitepaper with smooth scrolling
- **Key Components Overview**: SN66 Token, α-Stake, and Liquidity Routing
- **Roadmap and Vision**: Future development plans

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all device sizes
- **Modern UI/UX**: Clean, dark-themed interface with blue accents
- **Animated Backgrounds**: Sophisticated gradient animations
- **Accessibility**: WCAG compliant design principles

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React-based web framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Package Manager**: [Bun](https://bun.sh/) - Fast JavaScript runtime & package manager
- **Code Quality**: [Biome](https://biomejs.dev/) - Web toolchain for formatting and linting
- **Deployment**: [Netlify](https://www.netlify.com/) - JAMstack deployment platform

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **Bun** (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lageusta/hydra-subnet-66.git
   cd hydra-subnet-66
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
bun run build

# Start production server
bun start
```

### Code Quality

```bash
# Run linting and type checking
bun run lint

# Format code
bun run format
```

## 🌐 Deployment

The application is deployed on Netlify with automatic deployments from the main branch.

**Live Demo**: [https://dliquid-alpha.netlify.app/](https://dliquid-alpha.netlify.app/)

### Netlify Configuration

The project includes a `netlify.toml` configuration file for optimized deployment:

- **Static Export**: Next.js static site generation
- **Build Command**: `bun run build`
- **Publish Directory**: `out/`

## 📁 Project Structure

```
hydra-subnet-66/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── test-whitepaper/    # Whitepaper test page
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   ├── Dashboard.tsx       # Main dashboard component
│   │   ├── Whitepaper.tsx      # Whitepaper viewer
│   │   ├── VoteModal.tsx       # Voting interface
│   │   └── SubnetDetails.tsx   # Subnet information
│   ├── lib/                    # Utility functions
│   │   └── utils.ts
│   └── styles/                 # Additional stylesheets
│       └── whitepaper.css
├── public/                     # Static assets
│   └── whitepaper.md          # Whitepaper content
├── components.json            # Shadcn/ui configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.js             # Next.js configuration
├── netlify.toml              # Netlify deployment config
└── package.json              # Dependencies and scripts
```

## 🤝 Contributing

We welcome contributions to the Hydra project! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure components are accessible
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: [https://github.com/lageusta/hydra-subnet-66](https://github.com/lageusta/hydra-subnet-66)
- **Live Demo**: [https://dliquid-alpha.netlify.app/](https://dliquid-alpha.netlify.app/)
- **Bittensor**: [https://bittensor.com/](https://bittensor.com/)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/lageusta/hydra-subnet-66/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Built with ❤️ for the Bittensor ecosystem**
