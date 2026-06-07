'use client'

import { useState, useEffect } from 'react'

export default function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Energy Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Real-time monitoring and analytics
        </p>
      </div>
      
      <div className="text-right">
        <div className="text-2xl font-semibold text-gray-900">
          {currentTime.toLocaleTimeString()}
        </div>
        <div className="text-sm text-gray-500">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  )
}
