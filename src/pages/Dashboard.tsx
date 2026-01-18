import { useAppState } from '../lib/app-context'

export default function Dashboard() {
  const { state } = useAppState()

  const totalCalories = state.foodEntries.reduce((sum, f) => sum + f.estimatedCalories, 0)
  const totalProtein = state.foodEntries.reduce((sum, f) => sum + f.estimatedProtein, 0)
  const totalCarbs = state.foodEntries.reduce((sum, f) => sum + f.estimatedCarbs, 0)
  const totalFat = state.foodEntries.reduce((sum, f) => sum + f.estimatedFat, 0)

  const weeklyVolume = state.workouts.reduce((sum, w) => sum + w.totalVolume, 0)

  const lastWorkout = state.workouts[state.workouts.length - 1]
  const topPRs = state.workouts
    .flatMap(w => w.exercises.flatMap(e => e.sets.map(s => ({ exercise: e.name, weight: s.weight, reps: s.reps }))))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-8">FORGE</h1>

      {/* AI Insight */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <h2 className="text-primary font-bold mb-2">🔥 LOG YOUR FIRST WORKOUT TO GET STARTED.</h2>
        <p className="text-muted text-sm">Start tracking your fitness journey with FORGE.</p>
      </div>

      {/* Last Workout */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <h3 className="text-foreground font-bold mb-2">LAST WORKOUT</h3>
        {lastWorkout ? (
          <p className="text-sm text-muted">{lastWorkout.title} - {lastWorkout.exercises.length} exercises</p>
        ) : (
          <p className="text-sm text-muted">NO WORKOUTS YET. LOG YOUR FIRST WORKOUT.</p>
        )}
      </div>

      {/* Body Weight */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <h3 className="text-foreground font-bold mb-2">BODY WEIGHT</h3>
        <p className="text-sm text-muted">LOG YOUR WEIGHT IN METRICS TAB.</p>
      </div>

      {/* Top 3 PRs */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <h3 className="text-foreground font-bold mb-2">TOP 3 PRS</h3>
        {topPRs.length > 0 ? (
          <div className="space-y-2">
            {topPRs.map((pr, idx) => (
              <p key={idx} className="text-sm text-muted">
                {pr.exercise}: {pr.weight}kg x {pr.reps}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">LOG WORKOUTS TO TRACK PRS.</p>
        )}
      </div>

      {/* Weekly Frequency */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <h3 className="text-foreground font-bold mb-2">TRAINED THIS WEEK</h3>
        <div className="flex gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
            <div key={idx} className="w-8 h-8 bg-border rounded flex items-center justify-center text-xs text-muted">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Macros Today */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <h3 className="text-foreground font-bold mb-4">MACROS TODAY</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{Math.round(totalProtein)}</p>
            <p className="text-xs text-muted">PROTEIN</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{Math.round(totalCarbs)}</p>
            <p className="text-xs text-muted">CARBS</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{Math.round(totalFat)}</p>
            <p className="text-xs text-muted">FAT</p>
          </div>
        </div>
        <p className="text-center text-sm text-muted mt-4">{Math.round(totalCalories)} KCAL</p>
      </div>

      {/* Weekly Volume */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-20">
        <h3 className="text-foreground font-bold mb-2">WEEKLY VOLUME</h3>
        <p className="text-2xl font-bold text-primary">{Math.round(weeklyVolume)} KG</p>
        <p className="text-xs text-muted">{state.workouts.length} WORKOUTS</p>
      </div>
    </div>
  )
}
