import mqtt from 'mqtt'
import { prisma } from './prisma'

// MQTT Configuration
const MQTT_BROKER = 'mqtt://139.59.248.103:1883'
const MQTT_TOPIC = '#' // Subscribe to all topics, adjust as needed

interface MQTTEnergyData {
  voltage: number
  current: number
  active_power: number
  apparent_power: number
  reactive_power: number
  power_factor: number
  total_energy: number
  ID: string
}

class MQTTService {
  private client: mqtt.MqttClient | null = null
  private isConnected = false

  connect() {
    if (this.client) {
      console.log('MQTT client already exists')
      return
    }

    console.log(`Connecting to MQTT broker: ${MQTT_BROKER}`)
    
    this.client = mqtt.connect(MQTT_BROKER, {
      reconnectPeriod: 5000,
      connectTimeout: 30000,
    })

    this.client.on('connect', () => {
      console.log('✓ Connected to MQTT broker')
      this.isConnected = true
      
      // Subscribe to topics
      this.client?.subscribe(MQTT_TOPIC, (err) => {
        if (err) {
          console.error('Failed to subscribe to topic:', err)
        } else {
          console.log(`✓ Subscribed to topic: ${MQTT_TOPIC}`)
        }
      })
    })

    this.client.on('message', async (topic, message) => {
      try {
        const data: MQTTEnergyData = JSON.parse(message.toString())
        console.log('Received MQTT data:', data)
        
        await this.saveEnergyReading(data)
      } catch (error) {
        console.error('Error processing MQTT message:', error)
      }
    })

    this.client.on('error', (error) => {
      console.error('MQTT connection error:', error)
      this.isConnected = false
    })

    this.client.on('close', () => {
      console.log('MQTT connection closed')
      this.isConnected = false
    })

    this.client.on('reconnect', () => {
      console.log('Reconnecting to MQTT broker...')
    })
  }

  async saveEnergyReading(data: MQTTEnergyData) {
    try {
      // Find device by ID or create/update device mapping
      // For now, we'll associate with a default zone or find by device ID
      
      // Try to find a device with this ID in the name or create a mapping
      let device = await prisma.device.findFirst({
        where: {
          OR: [
            { name: { contains: data.ID } },
            { id: data.ID }
          ]
        },
        include: { zone: true }
      })

      // If no device found, use the first zone as default
      if (!device) {
        const defaultZone = await prisma.zone.findFirst()
        if (!defaultZone) {
          console.error('No zones found in database')
          return
        }

        // Create a new device for this MQTT sensor
        device = await prisma.device.create({
          data: {
            id: data.ID,
            name: `Energy Meter ${data.ID.substring(0, 8)}`,
            type: 'Energy Meter',
            consumption: data.active_power,
            status: 'online',
            zoneId: defaultZone.id,
          },
          include: { zone: true }
        })
        console.log(`Created new device: ${device.name}`)
      }

      // Calculate cost based on settings
      const settings = await prisma.settings.findFirst()
      const costPerKwh = settings?.costPerKwh || 0.139
      const cost = (data.total_energy || data.active_power / 1000) * costPerKwh

      // Save energy reading
      const reading = await prisma.energyReading.create({
        data: {
          timestamp: new Date(),
          consumption: data.active_power, // Active power in watts
          voltage: data.voltage,
          current: data.current,
          powerFactor: data.power_factor,
          cost: cost,
          zoneId: device.zoneId,
        },
      })

      // Update device consumption
      await prisma.device.update({
        where: { id: device.id },
        data: {
          consumption: data.active_power,
          status: 'online',
        },
      })

      console.log(`✓ Saved energy reading: ${reading.id} for device ${device.name}`)
    } catch (error) {
      console.error('Error saving energy reading:', error)
    }
  }

  disconnect() {
    if (this.client) {
      this.client.end()
      this.client = null
      this.isConnected = false
      console.log('MQTT client disconnected')
    }
  }

  getStatus() {
    return {
      connected: this.isConnected,
      broker: MQTT_BROKER,
    }
  }
}

// Export singleton instance
export const mqttService = new MQTTService()

// Auto-connect in production, manual in development
if (process.env.NODE_ENV === 'production') {
  mqttService.connect()
}
