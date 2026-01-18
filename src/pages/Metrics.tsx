import { useState } from 'react'
import { useAppState } from '../lib/app-context'
import type { BodyMeasurement } from '../lib/types'

export default function Metrics() {
  const { state, addBodyMeasurement } = useAppState()
  const [metrics, setMetrics] = useState({
    weight: '',
    bodyFat: '',
    chest: '',
    waist: '',
    shoulders: '',
    leftArm: '',
    rightArm: '',
    leftThigh: '',
    rightThigh: '',
    leftCalf: '',
    rightCalf: '',
  })

  const handleInputChange = (key: string, value: string) => {
    setMetrics(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveMetric = (measurementType: string, value: string) => {
    if (!value) return

    const typeMap: Record<string, BodyMeasurement['measurementType']> = {
      chest: 'CHEST',
      waist: 'WAIST',
      shoulders: 'SHOULDERS',
      leftArm: 'LEFT_ARM',
      rightArm: 'RIGHT_ARM',
      leftThigh: 'LEFT_THIGH',
      rightThigh: 'RIGHT_THIGH',
      leftCalf: 'LEFT_CALF',
      rightCalf: 'RIGHT_CALF',
    }

    const measurement: BodyMeasurement = {
      id: `measurement_${Date.now()}`,
      userId: state.user?.id || '',
      date: Date.now(),
      measurementType: typeMap[measurementType] || 'CHEST',
      value: parseFloat(value),
      unit: 'CM',
    }

    addBodyMeasurement(measurement)
    setMetrics(prev => ({ ...prev, [measurementType]: '' }))
  }

  const getLatestMeasurement = (type: BodyMeasurement['measurementType']) => {
    const filtered = state.bodyMeasurements.filter(m => m.measurementType === type)
    return filtered[filtered.length - 1]
  }

  const metricFields = [
    { key: 'chest', label: 'Chest', type: 'CHEST' as const },
    { key: 'waist', label: 'Waist', type: 'WAIST' as const },
    { key: 'shoulders', label: 'Shoulders', type: 'SHOULDERS' as const },
    { key: 'leftArm', label: 'Left Arm', type: 'LEFT_ARM' as const },
    { key: 'rightArm', label: 'Right Arm', type: 'RIGHT_ARM' as const },
    { key: 'leftThigh', label: 'Left Thigh', type: 'LEFT_THIGH' as const },
    { key: 'rightThigh', label: 'Right Thigh', type: 'RIGHT_THIGH' as const },
    { key: 'leftCalf', label: 'Left Calf', type: 'LEFT_CALF' as const },
    { key: 'rightCalf', label: 'Right Calf', type: 'RIGHT_CALF' as const },
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto pb-24">
      <h1 className="text-3xl font-bold text-primary mb-6">METRICS</h1>

      <div className="space-y-4">
        {metricFields.map(field => {
          const latest = getLatestMeasurement(field.type)
          return (
            <div key={field.key} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-foreground font-bold">{field.label}</h3>
                  {latest && (
                    <p className="text-sm text-muted">
                      Latest: {latest.value} {latest.unit}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={metrics[field.key as keyof typeof metrics]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="flex-1 bg-background border border-border rounded px-3 py-2 text-foreground"
                />
                <span className="bg-background border border-border rounded px-3 py-2 text-muted text-sm">
                  cm
                </span>
                <button
                  onClick={() => handleSaveMetric(field.key, metrics[field.key as keyof typeof metrics])}
                  className="bg-primary text-background px-4 py-2 rounded font-bold hover:opacity-80 text-sm"
                >
                  Save
                </button>
              </div>

              {/* History */}
              {state.bodyMeasurements.filter(m => m.measurementType === field.type).length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted mb-2">History:</p>
                  <div className="space-y-1">
                    {state.bodyMeasurements
                      .filter(m => m.measurementType === field.type)
                      .reverse()
                      .slice(0, 3)
                      .map(m => (
                        <p key={m.id} className="text-xs text-muted">
                          {m.value} {m.unit} - {new Date(m.date).toLocaleDateString()}
                        </p>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
