# Quick Start Guide - Hospital Energy Monitoring System

## ⚡ Get Up and Running in 3 Steps

### Step 1: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages (React, Next.js, Tailwind CSS, etc.).

### Step 2: Start the Development Server

```bash
npm run dev
```

Wait for the compilation to complete. You'll see a message like:
```
ready - started server on 0.0.0.0:3000
```

### Step 3: Open Your Browser

Navigate to: **http://localhost:3000**

You should see the login page. Use any email/password combination to log in!

---

## 🎯 What You Get

### ✅ Complete Dashboard
- Real-time energy consumption monitoring
- Zone-based department tracking
- Alert system for unusual patterns
- Interactive charts and visualizations

### ✅ Ready-to-Use Features
- **6 Hospital Zones**: Emergency, Operating Rooms, ICU, General Wards, Radiology, Laboratory
- **Live Data Updates**: Auto-refresh every 5 seconds
- **Alert System**: Critical, warning, and info notifications
- **Responsive Design**: Works on desktop, tablet, and mobile

### ✅ Professional UI
- Modern, clean interface
- Intuitive navigation
- Color-coded status indicators
- Real-time clock and date display

---

## 📱 Navigation Guide

### Sidebar Menu
- **📊 Dashboard** - Main overview with all metrics
- **⚡ Real-time Monitor** - Detailed live monitoring
- **📈 Analytics** - Historical data and trends
- **🏥 Zones** - Department management
- **🔔 Alerts** - Notification center
- **📄 Reports** - Generate reports
- **⚙️ Settings** - System configuration

---

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check for code issues
npm run lint
```

---

## 📊 Understanding the Dashboard

### Energy Overview Cards
1. **Total Consumption** - Daily kWh usage with trend
2. **Current Load** - Real-time power draw
3. **Peak Demand** - Highest load recorded
4. **Cost Today** - Energy cost in USD

### Real-time Chart
- Blue line: Current consumption
- Red dashed line: Target threshold
- Updates every 5 seconds automatically

### Zone Monitoring
Each zone shows:
- Current consumption vs capacity
- Utilization percentage
- Status indicator (green/yellow/red)
- Available capacity

### Alerts Panel
- 🚨 Critical: Immediate attention required
- ⚠️ Warning: Monitoring recommended
- ℹ️ Info: General notifications

---

## 🎨 Customization Ideas

### Change Colors
Edit `tailwind.config.ts` to modify the color scheme.

### Add New Zones
Update the zones array in:
- `src/components/ZoneMonitoring.tsx`
- `src/app/api/zones/route.ts`

### Adjust Refresh Rate
Modify the interval in `src/components/RealtimeMonitor.tsx`:
```typescript
// Change 5000 to your desired milliseconds
setInterval(() => { ... }, 5000)
```

---

## 🐛 Troubleshooting

### Port 3000 is already in use
Change the port:
```bash
npm run dev -- -p 3001
```

### Cannot find module errors
Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Page not loading
1. Check the terminal for errors
2. Press Ctrl+C to stop the server
3. Run `npm run dev` again

---

## 📖 Next Steps

1. **Explore the Dashboard**: Click through all the menu items
2. **Watch Real-time Updates**: Observe the chart updating every 5 seconds
3. **Check Different Zones**: See how each department is performing
4. **Review Alerts**: Look at the notification system
5. **Read Documentation**: Check `README.md` for detailed information

---

## 🚀 Production Deployment

When you're ready to deploy:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Test the production build**:
   ```bash
   npm start
   ```

3. **Deploy to Vercel** (easiest):
   ```bash
   npm install -g vercel
   vercel
   ```

---

## 💡 Tips for Success

✅ Keep the dev server running while making changes
✅ Check the browser console (F12) for any errors
✅ Use the ESLint suggestions to improve code quality
✅ Test on different screen sizes using browser dev tools
✅ Read the inline comments in the code for guidance

---

## 📞 Need Help?

- Review the `DEVELOPMENT.md` guide for detailed instructions
- Check the `README.md` for comprehensive documentation
- Look at the code comments for explanation of features
- Search for Next.js/React documentation online

---

## 🎉 You're All Set!

Your hospital energy monitoring system is ready to use. The current implementation uses mock data, but it's structured to easily integrate with real databases and IoT sensors.

**Happy monitoring!** ⚡🏥

---

**Project Location**: `d:\Development\OnConnext\ON0052_Energy_Monitoring`
**Local URL**: http://localhost:3000
**Framework**: Next.js 15 with TypeScript and Tailwind CSS
