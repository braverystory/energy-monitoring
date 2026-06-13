# Hospital Energy Monitoring System

A comprehensive real-time energy monitoring and analytics platform designed for hospital facilities. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### ⚡ Real-time Monitoring
- Live energy consumption tracking with auto-updating charts
- 5-second refresh interval for real-time data visualization
- Historical data comparison and trend analysis

### 🏥 Multi-Zone Monitoring
- Track energy consumption across different hospital departments
- Visual status indicators (Normal, Warning, Critical)
- Capacity utilization metrics for each zone
- Department-specific analytics

### 🔔 Alerts & Notifications
- Automated alerts for high energy consumption
- Peak load warnings
- Unusual pattern detection
- Acknowledgment system for alert management

### 📊 Analytics Dashboard
- Energy overview with key metrics
- Total consumption, current load, and peak demand tracking
- Cost analysis and trend indicators
- Comparative performance metrics

### 📄 Data Export & Reporting
- Generate daily, weekly, and monthly reports
- Zone-specific breakdown and analysis
- Export capabilities for data portability
- Historical data retention

### 👥 User Management & Accessibility
- Role-based access control (Admin, Operator, Viewer)
- Secure authentication system
- User activity tracking
- Accessible design following WCAG guidelines

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 📁 Project Structure

```
hospital-energy-monitoring/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── alerts/       # Alert management endpoints
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── energy/       # Energy data endpoints
│   │   │   └── zones/        # Zone management endpoints
│   │   ├── login/            # Login page
│   │   ├── layout.tsx        # Root layout with navigation
│   │   ├── page.tsx          # Dashboard home page
│   │   └── globals.css       # Global styles
│   ├── components/            # React components
│   │   ├── AlertsPanel.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── EnergyOverview.tsx
│   │   ├── RealtimeMonitor.tsx
│   │   ├── Sidebar.tsx
│   │   └── ZoneMonitoring.tsx
│   └── lib/                   # Utilities and types
│       ├── auth-context.tsx   # Authentication context
│       └── types.ts           # TypeScript type definitions
├── public/                     # Static assets
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd d:\Development\OnConnext\ON0052_Energy_Monitoring
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### First Run

- The login page accepts any email/password combination for demo purposes
- Default view shows the energy monitoring dashboard
- Sample data is generated automatically for demonstration

## 📖 Usage

### Dashboard Overview

The main dashboard displays:
- **Energy Overview Cards**: Total consumption, current load, peak demand, and daily cost
- **Real-time Monitor**: Live chart showing energy consumption over time
- **Zone Monitoring**: Department-specific energy usage with status indicators
- **Alerts Panel**: Recent notifications and system warnings

### Navigation

Use the sidebar to navigate between different sections:
- 📊 **Dashboard**: Main overview and real-time monitoring
- ⚡ **Real-time Monitor**: Detailed live monitoring view
- 📈 **Analytics**: Historical data and trend analysis
- 🏥 **Zones**: Department management and configuration
- 🔔 **Alerts**: Alert management and history
- 📄 **Reports**: Generate and download reports
- ⚙️ **Settings**: System configuration and preferences

### API Endpoints

#### Energy Data
- `GET /api/energy/stats` - Get energy statistics
- `GET /api/energy/realtime?count=12` - Get real-time readings

#### Zones
- `GET /api/zones` - Get all zones
- `GET /api/zones/[id]` - Get specific zone details

#### Alerts
- `GET /api/alerts` - Get all alerts
- `GET /api/alerts?type=critical` - Filter alerts by type
- `POST /api/alerts` - Acknowledge an alert

#### Authentication
- `POST /api/auth/login` - User login

## 🏗️ Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Code Quality

The project includes:
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for consistent styling

## 🔐 Authentication

The current implementation includes a mock authentication system. For production:

1. Replace the mock login in `src/lib/auth-context.tsx` with your authentication service
2. Implement proper session management
3. Add JWT or session tokens
4. Configure environment variables for API keys

### Example Integration

```typescript
// Replace mock login with real authentication
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
```

## 🗄️ Database Integration

Currently, the application uses mock data. To integrate a real database:

1. **Choose a database** (PostgreSQL, MongoDB, MySQL, etc.)
2. **Install ORM/Client** (Prisma, Drizzle, Mongoose, etc.)
3. **Update API routes** in `src/app/api/`
4. **Create database schema** for energy readings, zones, alerts, and users
5. **Add environment variables** for database connection

### Example with Prisma

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    // Your custom color palette
  }
}
```

### Components

All components are located in `src/components/` and can be customized:
- Modify chart types in `RealtimeMonitor.tsx`
- Adjust zone thresholds in `ZoneMonitoring.tsx`
- Customize alert types in `AlertsPanel.tsx`

## 📊 Data Flow

1. **Real-time Updates**: Components fetch data from API routes every 5 seconds
2. **Mock Data**: API routes generate sample data (replace with database queries)
3. **State Management**: React hooks manage component state
4. **Context**: Authentication state managed via React Context

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL="your-database-url"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# API Keys (if needed)
ENERGY_API_KEY="your-api-key"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review the [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Open an issue in the project repository

## 🔮 Future Enhancements

- [ ] WebSocket integration for true real-time updates
- [ ] Machine learning for consumption prediction
- [ ] Mobile app (React Native)
- [ ] Advanced reporting with PDF export
- [ ] Integration with IoT energy sensors
- [ ] Multi-hospital support
- [ ] Carbon footprint calculator
- [ ] Automated optimization suggestions
- [ ] Email/SMS notifications
- [ ] Grafana integration for advanced analytics

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
- [React Documentation](https://react.dev/)

---

Built with ⚡ for efficient hospital energy management


## Server Preparatiom
```
sudo apt update
sudo apt install git make gcc g++
sudo apt install mosquitto mosquitto-dev mosquitto-clients
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 24

sudo nano /etc/mosquitto/mosquitto.conf
ADD >>
   # Network
   listener 1883
   allow_anonymous true

   # Logging
   log_dest file /var/log/mosquitto/mosquitto.log
   log_type all

sudo systemctl stop mosquitto
sudo systemctl enable mosquitto
sudo systemctl start mosquitto
sudo systemctl status mosquitto
```