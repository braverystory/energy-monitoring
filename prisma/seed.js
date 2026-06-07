const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default settings
  await prisma.settings.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      costPerKwh: 0.139,
      currency: 'USD',
      refreshInterval: 5,
      dataRetention: 90,
      warningThreshold: 80,
      criticalThreshold: 90,
      emailNotifications: true,
      smsNotifications: false,
      emailRecipients: 'admin@hospital.com',
    },
  })
  console.log('✓ Created default settings')

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@hospital.com' },
      update: {},
      create: {
        email: 'admin@hospital.com',
        name: 'Admin User',
        password: 'password123', // In production, this should be hashed
        role: 'admin',
      },
    }),
    prisma.user.upsert({
      where: { email: 'operator@hospital.com' },
      update: {},
      create: {
        email: 'operator@hospital.com',
        name: 'John Operator',
        password: 'password123',
        role: 'operator',
      },
    }),
    prisma.user.upsert({
      where: { email: 'viewer@hospital.com' },
      update: {},
      create: {
        email: 'viewer@hospital.com',
        name: 'Jane Viewer',
        password: 'password123',
        role: 'viewer',
      },
    }),
  ])
  console.log('✓ Created users')

  // Create zones
  const zones = [
    {
      name: 'Emergency Department',
      description: 'Emergency and urgent care facilities',
      floor: '1st Floor',
      area: '2,500 sq ft',
      capacity: 200,
    },
    {
      name: 'Operating Rooms',
      description: 'Surgical suites and recovery',
      floor: '2nd Floor',
      area: '3,200 sq ft',
      capacity: 220,
    },
    {
      name: 'ICU',
      description: 'Intensive Care Unit',
      floor: '3rd Floor',
      area: '2,800 sq ft',
      capacity: 180,
    },
    {
      name: 'General Wards',
      description: 'Patient rooms and general care',
      floor: '4th-5th Floor',
      area: '8,500 sq ft',
      capacity: 150,
    },
    {
      name: 'Radiology',
      description: 'Imaging and diagnostics',
      floor: 'Basement',
      area: '1,800 sq ft',
      capacity: 180,
    },
    {
      name: 'Laboratory',
      description: 'Medical testing and analysis',
      floor: 'Basement',
      area: '1,500 sq ft',
      capacity: 120,
    },
  ]

  for (const zoneData of zones) {
    await prisma.zone.upsert({
      where: { name: zoneData.name },
      update: {},
      create: zoneData,
    })
  }
  console.log('✓ Created zones')

  // Get created zones
  const createdZones = await prisma.zone.findMany()

  // Create devices for each zone
  const deviceTemplates = [
    { name: 'HVAC System', type: 'Climate Control', consumption: 45, status: 'online' },
    { name: 'Medical Equipment', type: 'Medical', consumption: 35, status: 'online' },
    { name: 'Lighting', type: 'Lighting', consumption: 25, status: 'online' },
    { name: 'Monitoring Systems', type: 'Medical', consumption: 28, status: 'online' },
  ]

  for (const zone of createdZones) {
    const zoneDevices = deviceTemplates.map((device) => ({
      ...device,
      name: `${device.name} - ${zone.name}`,
      zoneId: zone.id,
    }))

    await prisma.device.createMany({
      data: zoneDevices,
      skipDuplicates: true,
    })
  }
  console.log('✓ Created devices')

  // Create historical energy readings for the past 7 days
  const now = new Date()
  const readings = []

  for (let day = 6; day >= 0; day--) {
    for (let hour = 0; hour < 24; hour++) {
      const timestamp = new Date(now)
      timestamp.setDate(now.getDate() - day)
      timestamp.setHours(hour, 0, 0, 0)

      for (const zone of createdZones) {
        // Base consumption varies by zone
        const baseConsumption = zone.capacity * (0.5 + Math.random() * 0.3)
        
        // Peak hours (8am-8pm) have higher consumption
        const isPeakHour = hour >= 8 && hour <= 20
        const peakMultiplier = isPeakHour ? 1.2 : 0.8

        const consumption = baseConsumption * peakMultiplier * (0.9 + Math.random() * 0.2)

        readings.push({
          timestamp,
          consumption,
          voltage: 220 + Math.random() * 10,
          current: (consumption / 220) * 1000, // Approximate current from consumption
          powerFactor: 0.85 + Math.random() * 0.1,
          cost: consumption * 0.139,
          zoneId: zone.id,
        })
      }
    }
  }

  await prisma.energyReading.createMany({
    data: readings,
  })
  console.log(`✓ Created ${readings.length} energy readings`)

  // Create alerts
  const alerts = [
    {
      type: 'critical',
      title: 'High Energy Consumption',
      message: 'Radiology department exceeding normal consumption by 15%',
      timestamp: new Date(Date.now() - 2 * 60000),
      zoneId: createdZones.find((z) => z.name === 'Radiology')?.id,
      acknowledged: false,
    },
    {
      type: 'warning',
      title: 'Peak Load Approaching',
      message: 'Operating Rooms approaching peak capacity threshold',
      timestamp: new Date(Date.now() - 15 * 60000),
      zoneId: createdZones.find((z) => z.name === 'Operating Rooms')?.id,
      acknowledged: false,
    },
    {
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'Scheduled maintenance for backup generators at 2:00 AM',
      timestamp: new Date(Date.now() - 60 * 60000),
      acknowledged: true,
      acknowledgedBy: users[0].id,
      acknowledgedAt: new Date(Date.now() - 50 * 60000),
    },
    {
      type: 'warning',
      title: 'Unusual Pattern Detected',
      message: 'Emergency Department showing irregular consumption pattern',
      timestamp: new Date(Date.now() - 120 * 60000),
      zoneId: createdZones.find((z) => z.name === 'Emergency Department')?.id,
      acknowledged: false,
    },
  ]

  await prisma.alert.createMany({
    data: alerts,
  })
  console.log('✓ Created alerts')

  // Create sample reports
  const reports = [
    {
      title: 'Weekly Energy Consumption Report',
      type: 'weekly',
      startDate: new Date('2026-05-31'),
      endDate: new Date('2026-06-06'),
      generatedBy: users[0].email,
      status: 'completed',
      data: JSON.stringify({ totalConsumption: 16542, totalCost: 2301 }),
    },
    {
      title: 'Monthly Performance Analysis',
      type: 'monthly',
      startDate: new Date('2026-05-01'),
      endDate: new Date('2026-05-31'),
      generatedBy: users[0].email,
      status: 'completed',
      data: JSON.stringify({ totalConsumption: 68450, totalCost: 9530 }),
    },
  ]

  await prisma.report.createMany({
    data: reports,
  })
  console.log('✓ Created reports')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
