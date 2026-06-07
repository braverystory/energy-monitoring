import DashboardHeader from '@/components/DashboardHeader'
import EnergyOverview from '@/components/EnergyOverview'
import RealtimeMonitor from '@/components/RealtimeMonitor'
import ZoneMonitoring from '@/components/ZoneMonitoring'
import AlertsPanel from '@/components/AlertsPanel'

export default function Home() {
  return (
    <div className="p-8">
      <DashboardHeader />
      
      <div className="mt-8 grid gap-6">
        {/* Energy Overview Cards */}
        <EnergyOverview />
        
        {/* Real-time Monitoring Chart */}
        <RealtimeMonitor />
        
        {/* Zone Monitoring */}
        <ZoneMonitoring />
        
        {/* Alerts Panel */}
        <AlertsPanel />
      </div>
    </div>
  )
}
