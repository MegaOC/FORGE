import { useState } from 'react'
import { useAppState } from '../lib/app-context'

export default function Settings() {
  const { state } = useAppState()
  const [formData, setFormData] = useState({
    dailyCalorieGoal: 2500,
    dailyProteinGoal: 150,
    dailyCarbsGoal: 300,
    dailyFatGoal: 80,
    weeklyVolumeGoal: 10000,
  })

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: parseInt(value) || 0 }))
  }

  const handleSaveGoals = () => {
    localStorage.setItem('forge_goals', JSON.stringify(formData))
    alert('Goals saved!')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto pb-24">
      <h1 className="text-3xl font-bold text-primary mb-6">SETTINGS</h1>

      {/* User Profile */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <h2 className="text-foreground font-bold mb-2">USER PROFILE</h2>
        <p className="text-sm text-muted">
          {state.user?.email || 'Not signed in'}
        </p>
      </div>

      {/* Daily Goals */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <h2 className="text-foreground font-bold mb-4">DAILY GOALS</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-2">Calorie Goal</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.dailyCalorieGoal}
                onChange={(e) => handleInputChange('dailyCalorieGoal', e.target.value)}
                className="flex-1 bg-background border border-border rounded px-3 py-2 text-foreground"
              />
              <span className="bg-background border border-border rounded px-3 py-2 text-muted">kcal</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Protein Goal</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.dailyProteinGoal}
                onChange={(e) => handleInputChange('dailyProteinGoal', e.target.value)}
                className="flex-1 bg-background border border-border rounded px-3 py-2 text-foreground"
              />
              <span className="bg-background border border-border rounded px-3 py-2 text-muted">g</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Carbs Goal</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.dailyCarbsGoal}
                onChange={(e) => handleInputChange('dailyCarbsGoal', e.target.value)}
                className="flex-1 bg-background border border-border rounded px-3 py-2 text-foreground"
              />
              <span className="bg-background border border-border rounded px-3 py-2 text-muted">g</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Fat Goal</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.dailyFatGoal}
                onChange={(e) => handleInputChange('dailyFatGoal', e.target.value)}
                className="flex-1 bg-background border border-border rounded px-3 py-2 text-foreground"
              />
              <span className="bg-background border border-border rounded px-3 py-2 text-muted">g</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Weekly Volume Goal</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.weeklyVolumeGoal}
                onChange={(e) => handleInputChange('weeklyVolumeGoal', e.target.value)}
                className="flex-1 bg-background border border-border rounded px-3 py-2 text-foreground"
              />
              <span className="bg-background border border-border rounded px-3 py-2 text-muted">kg</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveGoals}
          className="w-full mt-4 bg-primary text-background font-bold py-2 rounded hover:opacity-80"
        >
          Save Goals
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <h2 className="text-foreground font-bold mb-2">NOTIFICATIONS</h2>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          Enable push notifications
        </label>
      </div>

      {/* Data */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h2 className="text-foreground font-bold mb-4">DATA</h2>
        <button className="w-full bg-border text-foreground font-bold py-2 rounded hover:opacity-80 mb-2">
          Export Data to CSV
        </button>
        <button className="w-full bg-error text-background font-bold py-2 rounded hover:opacity-80">
          Clear All Data
        </button>
      </div>
    </div>
  )
}
