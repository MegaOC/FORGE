import { useState } from 'react'
import { AppProvider } from './lib/app-context'
import Dashboard from './pages/Dashboard'
import Workouts from './pages/Workouts'
import Food from './pages/Food'
import Metrics from './pages/Metrics'
import Settings from './pages/Settings'
import './index.css'

type TabName = 'dashboard' | 'workouts' | 'food' | 'metrics' | 'settings'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('dashboard')

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'workouts':
        return <Workouts />
      case 'food':
        return <Food />
      case 'metrics':
        return <Metrics />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <AppProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        {/* Main Content */}
        <div className="flex-1 overflow-auto pb-24">
          {renderPage()}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border flex justify-around items-center h-20">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              activeTab === 'dashboard' ? 'text-primary' : 'text-muted hover:text-foreground'
            }`}
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('workouts')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              activeTab === 'workouts' ? 'text-primary' : 'text-muted hover:text-foreground'
            }`}
          >
            <span className="text-2xl">💪</span>
            <span className="text-xs">Workouts</span>
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              activeTab === 'food' ? 'text-primary' : 'text-muted hover:text-foreground'
            }`}
          >
            <span className="text-2xl">🍴</span>
            <span className="text-xs">Food</span>
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              activeTab === 'metrics' ? 'text-primary' : 'text-muted hover:text-foreground'
            }`}
          >
            <span className="text-2xl">📊</span>
            <span className="text-xs">Metrics</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              activeTab === 'settings' ? 'text-primary' : 'text-muted hover:text-foreground'
            }`}
          >
            <span className="text-2xl">⚙️</span>
            <span className="text-xs">Settings</span>
          </button>
        </nav>
      </div>
    </AppProvider>
  )
}
