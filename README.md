# Uganda Election 2026 Visualization

A modern, interactive election results visualization platform designed for the **Uganda 2026 General Elections**. This application provides real-time data exploration, allowing users to view results from a national overview down to individual polling stations.

![Project Status](https://img.shields.io/badge/Status-Active_Development-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Key Features

- **🗺️ Interactive Map Interface**
  - Hover-enabled interactive map of Uganda.
  - Visual breakdown by Regions and Districts.
  - Instant access to MP and Presidential candidate info via tooltips.

- **📊 Comprehensive Results**
  - **Presidential Race**: Detailed vote counts, percentages, and candidate performance.
  - **Parliamentary Race**: Track Member of Parliament (MP) election results across all constituencies.

- **🔍 Granular Data Drill-Down**
  - Navigate levels: **National → Region → District → Constituency → Polling Station**.
  - View specific data for every single polling station in the country.

- **⚡ Modern & Responsive Design**
  - Built with a mobile-first approach.
  - Dark/Light mode support (themed UI).
  - Fast transitions and animations for a premium user experience.

- **🔍 SEO Optimized**
  - Fully dynamic meta tags (Open Graph, Twitter Cards) for every view.
  - Automated Sitemap generation.
  - Semantic HTML structure for accessibility.

## 🛠️ Tech Stack

This project is built using the latest modern web technologies:

- **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build System**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI System**: Custom components built on [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO Management**: [react-helmet-async](https://github.com/staylor/react-helmet-async)
- **State/Logic**: Custom hooks and context for data management.

## 🚀 Getting Started

Follow these instructions to get a local copy running.

### Prerequisites

- Node.js (v18 or higher)
- pnpm (preferred) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/election2026.git
   cd election2026
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   To create a production-ready build:
   ```bash
   pnpm build
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Base UI primitives (buttons, cards, etc.)
│   ├── UgandaMap.tsx    # Main interactive map component
│   ├── RegionDetail.tsx # Logic for displaying region/district data
│   └── ...
├── data/                # Static data files (GeoJSON, election results)
├── App.tsx              # Main application entry point
└── main.tsx             # React DOM rendering
public/
├── sitemap.xml          # Generated sitemap
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
