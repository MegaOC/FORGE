import { useState } from 'react'
import { useAppState } from '../lib/app-context'

export default function Food() {
  const { state, addFoodEntry } = useAppState()
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'greeting',
      type: 'ai',
      text: 'WHAT DID YOU EAT? TELL ME IN NATURAL LANGUAGE. (e.g., "3 eggs, 100g bacon, black coffee")',
    },
  ])

  const handleSendMessage = async () => {
    if (!inputText.trim() || loading) return

    setLoading(true)
    const userMessage = {
      id: `msg_${Date.now()}`,
      type: 'user',
      text: inputText,
    }
    setMessages((prev) => [...prev, userMessage])

    try {
      // Mock food analysis for now
      const macros = {
        protein: Math.floor(Math.random() * 50) + 20,
        carbs: Math.floor(Math.random() * 80) + 30,
        fat: Math.floor(Math.random() * 30) + 10,
        calories: Math.floor(Math.random() * 500) + 200,
      }

      const aiMessage = {
        id: `msg_${Date.now() + 1}`,
        type: 'ai',
        text: `LOGGED: ${macros.protein}g protein, ${macros.carbs}g carbs, ${macros.fat}g fat, ${macros.calories} calories`,
        macros,
      }

      setMessages((prev) => [...prev, aiMessage])

      const foodEntry = {
        id: `food_${Date.now()}`,
        userId: state.user?.id || '',
        timestamp: Date.now(),
        rawText: inputText,
        foods: [],
        estimatedCalories: macros.calories,
        estimatedProtein: macros.protein,
        estimatedCarbs: macros.carbs,
        estimatedFat: macros.fat,
      }

      await addFoodEntry(foodEntry)
    } catch (error) {
      console.error('Failed to analyze food:', error)
    } finally {
      setLoading(false)
      setInputText('')
    }
  }

  const totalCalories = state.foodEntries.reduce((sum, f) => sum + f.estimatedCalories, 0)
  const totalProtein = state.foodEntries.reduce((sum, f) => sum + f.estimatedProtein, 0)
  const totalCarbs = state.foodEntries.reduce((sum, f) => sum + f.estimatedCarbs, 0)
  const totalFat = state.foodEntries.reduce((sum, f) => sum + f.estimatedFat, 0)

  const goals = {
    dailyCalorieGoal: 2500,
    dailyProteinGoal: 150,
    dailyCarbsGoal: 300,
    dailyFatGoal: 80,
  }

  return (
    <div className="flex flex-col h-screen bg-background pb-24">
      {/* Daily Overview */}
      <div className="bg-surface border-b-2 border-primary p-4">
        <p className="text-primary text-xs font-bold mb-3">TODAY'S MACROS</p>

        <div className="space-y-3">
          {/* Calories */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-semibold text-muted">CALORIES</span>
              <span className="text-xs font-bold text-foreground">
                {Math.round(totalCalories)} / {goals.dailyCalorieGoal}
              </span>
            </div>
            <div className="h-2 bg-border rounded overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${Math.min((totalCalories / goals.dailyCalorieGoal) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Protein */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-semibold text-muted">PROTEIN</span>
              <span className="text-xs font-bold text-foreground">
                {Math.round(totalProtein)}g / {goals.dailyProteinGoal}g
              </span>
            </div>
            <div className="h-2 bg-border rounded overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all"
                style={{
                  width: `${Math.min((totalProtein / goals.dailyProteinGoal) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-semibold text-muted">CARBS</span>
              <span className="text-xs font-bold text-foreground">
                {Math.round(totalCarbs)}g / {goals.dailyCarbsGoal}g
              </span>
            </div>
            <div className="h-2 bg-border rounded overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all"
                style={{
                  width: `${Math.min((totalCarbs / goals.dailyCarbsGoal) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-semibold text-muted">FAT</span>
              <span className="text-xs font-bold text-foreground">
                {Math.round(totalFat)}g / {goals.dailyFatGoal}g
              </span>
            </div>
            <div className="h-2 bg-border rounded overflow-hidden">
              <div
                className="h-full bg-yellow-500 transition-all"
                style={{
                  width: `${Math.min((totalFat / goals.dailyFatGoal) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-primary text-background'
                  : 'bg-surface border border-border text-foreground'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              {msg.macros && (
                <p className="text-xs mt-2 opacity-80">
                  P: {msg.macros.protein}g | C: {msg.macros.carbs}g | F: {msg.macros.fat}g | {msg.macros.calories} kcal
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="What did you eat?"
          className="flex-1 bg-surface border border-border rounded px-3 py-2 text-foreground placeholder-muted"
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !inputText.trim()}
          className="bg-primary text-background px-4 py-2 rounded font-bold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
