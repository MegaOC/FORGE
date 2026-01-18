import { useState } from 'react'
import { useAppState } from '../lib/app-context'
import type { Workout, Exercise, Set } from '../lib/types'

export default function Workouts() {
  const { state, addWorkout } = useAppState()
  const [showLogger, setShowLogger] = useState(false)
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState([{ reps: 10, weight: 20 }])

  const handleAddSet = () => {
    setSets([...sets, { reps: 10, weight: 20 }])
  }

  const handleRemoveSet = (idx: number) => {
    setSets(sets.filter((_, i) => i !== idx))
  }

  const handleSaveWorkout = () => {
    if (!exerciseName.trim()) return

    const exerciseId = `exercise_${Date.now()}`
    const workoutSets: Set[] = sets.map((s, idx) => ({
      id: `set_${Date.now()}_${idx}`,
      exerciseId,
      setNumber: idx + 1,
      reps: s.reps,
      weight: s.weight,
      isPR: false,
      timestamp: Date.now(),
    }))

    const exercise: Exercise = {
      id: exerciseId,
      workoutId: `workout_${Date.now()}`,
      name: exerciseName,
      sets: workoutSets,
    }

    const totalVolume = workoutSets.reduce((sum, s) => sum + (s.reps * s.weight), 0)

    const workout: Workout = {
      id: `workout_${Date.now()}`,
      userId: state.user?.id || '',
      date: Date.now(),
      title: exerciseName,
      exercises: [exercise],
      totalVolume,
      duration: 30,
      notes: '',
    }

    addWorkout(workout)
    setExerciseName('')
    setSets([{ reps: 10, weight: 20 }])
    setShowLogger(false)
  }

  const sortedWorkouts = [...state.workouts].reverse()

  return (
    <div className="p-6 max-w-2xl mx-auto pb-24">
      <h1 className="text-3xl font-bold text-primary mb-6">WORKOUTS</h1>

      {/* Workout List */}
      <div className="space-y-4 mb-6">
        {sortedWorkouts.length === 0 ? (
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-muted">NO WORKOUTS YET. LOG YOUR FIRST ONE!</p>
          </div>
        ) : (
          sortedWorkouts.map(workout => (
            <div key={workout.id} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-foreground font-bold">{workout.title}</h3>
              </div>
              <div className="space-y-1">
                {workout.exercises.map((exercise, exIdx) => (
                  <div key={exIdx}>
                    {exercise.sets.map((set, setIdx) => (
                      <p key={setIdx} className="text-sm text-muted">
                        Set {set.setNumber}: {set.reps} reps × {set.weight}kg
                      </p>
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-2">
                {new Date(workout.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Workout Logger Modal */}
      {showLogger && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-border rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-primary mb-4">LOG WORKOUT</h2>

            <div className="mb-4">
              <label className="block text-sm text-muted mb-2">Exercise</label>
              <input
                type="text"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                placeholder="e.g., Bench Press"
                className="w-full bg-background border border-border rounded px-3 py-2 text-foreground"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-muted mb-2">Sets</label>
              <div className="space-y-2">
                {sets.map((set, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) => {
                        const newSets = [...sets]
                        newSets[idx].reps = parseInt(e.target.value) || 0
                        setSets(newSets)
                      }}
                      placeholder="Reps"
                      className="flex-1 bg-background border border-border rounded px-2 py-1 text-foreground"
                    />
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) => {
                        const newSets = [...sets]
                        newSets[idx].weight = parseInt(e.target.value) || 0
                        setSets(newSets)
                      }}
                      placeholder="Weight (kg)"
                      className="flex-1 bg-background border border-border rounded px-2 py-1 text-foreground"
                    />
                    <button
                      onClick={() => handleRemoveSet(idx)}
                      className="bg-error text-background px-2 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddSet}
                className="mt-2 text-primary text-sm hover:text-foreground"
              >
                + Add Set
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveWorkout}
                className="flex-1 bg-primary text-background font-bold py-2 rounded hover:opacity-80"
              >
                Save
              </button>
              <button
                onClick={() => setShowLogger(false)}
                className="flex-1 bg-border text-foreground font-bold py-2 rounded hover:opacity-80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setShowLogger(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-background rounded-full flex items-center justify-center text-2xl hover:opacity-80 shadow-lg"
      >
        +
      </button>
    </div>
  )
}
