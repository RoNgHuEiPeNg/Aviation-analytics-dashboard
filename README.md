# Aviation Analytics Dashboard (v2.3)
> **High-Contrast "Ops Center" Edition**

A terminal-inspired, industrial-grade aviation analytics dashboard designed for high-priority operational monitoring. This tool visualizes real-time immigration forecast data from Taiwan's airports and ports using a refined, high-contrast aesthetic.

## ✨ Key Features

- **Smart API Orchestration**: Pre-fetches 44 govt API streams on startup to identify active data channels.
- **Intelligent Filtering**: The dropdown only displays locations with active data, including real-time record counts.
- **High-Contrast Industrial UI**: Tailwind V4 powered design optimized for readability in operations centers.
- **Instant Diagnostics**: Multi-colored KPI charts for passenger distribution and age statistics.
- **Live Cache Engine**: Zero-latency data switching after initial synchronization.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Tailwind CSS V4, Vanilla JavaScript
- **Backend**: Node.js Proxy Server (CORS bypass)
- **Data Source**: Taiwan Immigration Bureau Open Data API
- **Typography**: Outfit (Display), Geist (Body/Mono)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/aviation-analytics-dashboard.git
   cd aviation-analytics-dashboard
   ```

2. Start the local server:
   ```bash
   node server.js
   ```

3. Access the dashboard:
   Open your browser and navigate to `http://localhost:3000`

## 📊 Documentation

- [Code Review Report](./Code_Review_Report.md): Detailed analysis of security and performance.
- [Requirements Specification](./Immigration_SRS.md): Project scope and functional requirements.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
