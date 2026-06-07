/**
 * Utility functions for energy monitoring calculations
 */

/**
 * Calculate energy consumption cost
 */
export function calculateCost(consumption: number, costPerKwh: number = 0.139): number {
  return consumption * costPerKwh
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

/**
 * Determine zone status based on utilization
 */
export function getZoneStatus(
  consumption: number,
  capacity: number
): 'normal' | 'warning' | 'critical' {
  const utilization = (consumption / capacity) * 100

  if (utilization >= 90) return 'critical'
  if (utilization >= 80) return 'warning'
  return 'normal'
}

/**
 * Format energy value with appropriate unit
 */
export function formatEnergy(value: number): { value: string; unit: string } {
  if (value >= 1000) {
    return {
      value: (value / 1000).toFixed(2),
      unit: 'MW',
    }
  }
  return {
    value: value.toFixed(2),
    unit: 'kW',
  }
}

/**
 * Calculate energy efficiency score (0-100)
 */
export function calculateEfficiencyScore(
  actualConsumption: number,
  targetConsumption: number
): number {
  if (targetConsumption === 0) return 0
  const efficiency = (targetConsumption / actualConsumption) * 100
  return Math.min(Math.max(efficiency, 0), 100)
}

/**
 * Generate time labels for charts
 */
export function generateTimeLabels(
  intervals: number,
  intervalMinutes: number = 5
): string[] {
  const labels: string[] = []
  const now = new Date()

  for (let i = intervals - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * intervalMinutes * 60000)
    labels.push(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
  }

  return labels
}

/**
 * Validate energy reading data
 */
export function isValidEnergyReading(consumption: number): boolean {
  return consumption >= 0 && consumption < 100000 && !isNaN(consumption)
}

/**
 * Calculate average consumption
 */
export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0
  const sum = values.reduce((acc, val) => acc + val, 0)
  return sum / values.length
}

/**
 * Find peak consumption
 */
export function findPeak(values: number[]): number {
  if (values.length === 0) return 0
  return Math.max(...values)
}

/**
 * Calculate total consumption from readings
 */
export function calculateTotal(values: number[]): number {
  return values.reduce((acc, val) => acc + val, 0)
}

/**
 * Format currency value
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value)
}

/**
 * Format number with thousands separator
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}
