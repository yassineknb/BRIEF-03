import React, { useState } from "react";
import { getTodayDate } from "./utils/date";
import AddRoutineForm from "./components/AddRoutineForm";
import UserList from "./components/UserList";

function App() {
  const [users] = useState([
    { id: 1, name: "rihame", color: "blue", avatar: "src/assets/avatar/riham.JPG.jpg"  },
    { id: 2, name: "amina", color: "green", avatar: "src/assets/avatar/amina.jpg" },
    { id: 3, name: "adil", color: "orange", avatar: "src/assets/avatar/adil.jpg" },
  ]);

  const [routines, setRoutines] = useState([
    { id: 1, name: "Drink Water", userId: 1 },
    { id: 2, name: "Meditate 10 min", userId: 1 },
    { id: 3, name: "Read 20 pages", userId: 1 },
    { id: 4, name: "Workout 30 min", userId: 2 },
    { id: 5, name: "Plan Day", userId: 2 },
    { id: 6, name: "Learn New Skill", userId: 2 },
    { id: 7, name: "Sleep 8 hours", userId: 3 },
    { id: 8, name: "Call Family", userId: 3 },
  ]);

  const [completions, setCompletions] = useState([]);

  const addRoutine = (name, userId) => {
    const newRoutine = {
      id: Date.now(),
      name,
      userId: parseInt(userId),
    };
    setRoutines([...routines, newRoutine]);
  };

  const deleteRoutine = (id) => {
    setRoutines(routines.filter((r) => r.id !== id));
    setCompletions(completions.filter((c) => c.routineId !== id));
  };

  const toggleRoutineCompletion = (routineId) => {
    const today = getTodayDate();
    const existingCompletionIndex = completions.findIndex(
      (c) => c.routineId === routineId && c.date === today
    );

    if (existingCompletionIndex !== -1) {
      setCompletions(completions.filter((_, i) => i !== existingCompletionIndex));
    } else {
      setCompletions([...completions, { routineId, date: today }]);
    }
  };

  const isRoutineCompletedToday = (routineId) => {
    const today = getTodayDate();
    return completions.some(
      (c) => c.routineId === routineId && c.date === today
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">
            Daily Habits tracker
          </h1>
        </header>

        <AddRoutineForm users={users} onAddRoutine={addRoutine} />

        <UserList
          users={users}
          routines={routines}
          onDeleteRoutine={deleteRoutine}
          onToggleRoutine={toggleRoutineCompletion}
          isRoutineCompletedToday={isRoutineCompletedToday}
        />
      </div>
    </div>
  );
}

export default App;
