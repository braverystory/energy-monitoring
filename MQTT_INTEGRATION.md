# MQTT Integration Guide

## Overview

The system is now integrated with real-time MQTT data from the energy monitoring server at `139.59.248.103:1883`.

## Features

✅ **Real-time Data Collection**: Automatically receives and stores energy readings from MQTT broker  
✅ **Automatic Device Discovery**: Creates devices automatically based on incoming IDs  
✅ **Data Persistence**: All MQTT messages are stored in the database  
✅ **Zone Association**: Devices are associated with hospital zones  
✅ **Live Dashboard Updates**: Dashboard displays real-time MQTT data  

## MQTT Data Format

The system expects MQTT messages in the following JSON format:

```json
{
  "voltage": 227.0808,
  "current": 0.143,
  "active_power": 28.5415,
  "apparent_power": 32.47249,
  "reactive_power": -2.801904,
  "power_factor": 0.887688,
  "total_energy": 0.029,
  "ID": "1e2daecd"
}
```

## Field Mapping

| MQTT Field | Database Field | Description |
|------------|----------------|-------------|
| `voltage` | `voltage` | Voltage reading (V) |
| `current` | `current` | Current reading (A) |
| `active_power` | `consumption` | Active power (W) |
| `power_factor` | `powerFactor` | Power factor (0-1) |
| `total_energy` | Used for cost calculation | Total energy (kWh) |
| `ID` | Device ID | Unique device identifier |

## How to Use

### 1. Navigate to MQTT Connection Page

In the application, click on **"🔌 MQTT Connection"** in the sidebar.

### 2. Connect to MQTT Broker

Click the **"Connect"** button to establish connection with the MQTT broker at `mqtt://139.59.248.103:1883`.

### 3. Monitor Status

The page shows:
- Connection status (Connected/Disconnected)
- Broker address
- Real-time updates every 5 seconds

### 4. View Real-time Data

Once connected:
- MQTT messages are automatically received and stored
- Dashboard updates with real-time data
- New devices are created automatically
- Energy readings are saved to the database

## Architecture

### MQTT Service (`src/lib/mqtt-client.ts`)

- Singleton service that manages MQTT connection
- Subscribes to all topics by default
- Parses incoming JSON messages
- Stores data in database via Prisma

### API Endpoints

- **GET `/api/mqtt/status`**: Check MQTT connection status
- **POST `/api/mqtt/connect`**: Connect to MQTT broker
- **DELETE `/api/mqtt/connect`**: Disconnect from MQTT broker

### Automatic Device Creation

When a new device ID is detected:
1. System checks if device exists in database
2. If not found, creates new device with ID from MQTT message
3. Associates device with first available zone
4. Device name: `Energy Meter {first 8 chars of ID}`

## Configuration

Edit environment variables in `.env.local`:

```env
MQTT_BROKER_URL="mqtt://139.59.248.103:1883"
MQTT_TOPIC="#"  # Subscribe to all topics
```

## Data Flow

1. **MQTT Broker** → Publishes energy data
2. **MQTT Service** → Receives and parses messages
3. **Database** → Stores energy readings
4. **API Routes** → Serve data to frontend
5. **Dashboard** → Displays real-time updates

## Troubleshooting

### Connection Issues

- Verify broker is accessible: `mqtt://139.59.248.103:1883`
- Check firewall rules
- Ensure port 1883 is open

### No Data Appearing

- Check MQTT connection status in the app
- Verify MQTT messages match expected format
- Check server console logs for errors
- Ensure database is initialized

### Device Not Created

- Verify incoming message has `ID` field
- Check database for existing devices
- Review server logs for creation errors

## Development vs Production

- **Development**: MQTT connection is manual (use Connect button)
- **Production**: Auto-connects on server start

To enable auto-connect in development, modify `src/lib/mqtt-client.ts`:

```typescript
// Always auto-connect
mqttService.connect()
```

## Sample Data

Once connected, you should see energy readings like:

```
✓ Connected to MQTT broker
✓ Subscribed to topic: #
Received MQTT data: { voltage: 227.0808, current: 0.143, active_power: 28.5415, ... }
Created new device: Energy Meter 1e2daecd
✓ Saved energy reading: clx... for device Energy Meter 1e2daecd
```

## Next Steps

1. Install dependencies: `npm install`
2. Initialize database: `npm run db:push && npm run db:seed`
3. Start server: `npm run dev`
4. Navigate to `/mqtt` page
5. Click "Connect"
6. Monitor real-time data on dashboard

Enjoy your real-time energy monitoring! ⚡
