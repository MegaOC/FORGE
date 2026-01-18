import React, { createContext, useContext, useState, useEffect } from 'react'
import type { AppState, Workout, FoodEntry, BodyMeasurement } from './types'

interface AppContextType {
  state: AppState
  addWorkout: (workout: Workout) => void
  deleteWorkout: (id: string) => void
  addFoodEntry: (entry: FoodEntry) => Promise<void>
  addBodyMeasurement: (measurement: BodyMeasurement) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    workouts: [],
    bodyMetrics: [],
    bodyMeasurements: [],
    foodEntries: [],
    aiInsights: [],
    exerciseRecords: {},
    userGoals: null,
  })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('forge_app_state')
    if (saved) {
      try {
        setState(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load state:', e)
      }
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('forge_app_state', JSON.stringify(state))
  }, [state])

  const addWorkout = (workout: Workout) => {
    setState(prev => ({
      ...prev,
      workouts: [...prev.workouts, workout],
    }))
  }

  const deleteWorkout = (id: string) => {
    setState(prev => ({
      ...prev,
      workouts: prev.workouts.filter(w => w.id !== id),
    }))
  }

  const addFoodEntry = async (entry: FoodEntry) => {
    setState(prev => ({
      ...prev,
      foodEntries: [...prev.foodEntries, entry],
    }))
  }

  const addBodyMeasurement = (measurement: BodyMeasurement) => {
    setState(prev => ({
      ...prev,
      bodyMeasurements: [...prev.bodyMeasurements, measurement],
    }))
  }

  return (
    <AppContext.Provider value={{ state, addWorkout, deleteWorkout, addFoodEntry, addBodyMeasurement }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return context
}
