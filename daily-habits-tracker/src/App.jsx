import React, { useState, useEffect } from 'react';

// Helper functions
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// AddRoutineForm Component
const AddRoutineForm = ({ users, onAddRoutine }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(users[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && userId) {
      onAddRoutine(name, userId);
      setName('');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Add a new routine...</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        <div className="flex-1">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter routine name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="w-full sm:w-auto">
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
};

// RoutineCard Component
const RoutineCard = ({ routine, onDeleteRoutine, onToggleRoutine, isCompleted }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 mb-2">
      <div className="flex items-center justify-between">
        <span className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
          {routine.name}
        </span>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onDeleteRoutine(routine.id)}
            className="text-red-500 hover:text-red-700 px-2 py-1 rounded text-sm"
          >
            cancel
          </button>
          <button 
            onClick={() => onToggleRoutine(routine.id)}
            className={`px-2 py-1 rounded text-sm ${
              isCompleted 
                ? 'bg-gray-100 text-gray-700' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isCompleted ? 'Undo' : 'Mark as done'}
          </button>
        </div>
      </div>
    </div>
  );
};

// UserSection Component
const UserSection = ({ user, routines, onDeleteRoutine, onToggleRoutine, isRoutineCompletedToday }) => {
  const userRoutines = routines.filter(r => r.userId === user.id);

  if (userRoutines.length === 0) {
    return null; // Ne rien afficher si pas de routines
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{user.name}</h3>
      <div className="space-y-2">
        {userRoutines.map(routine => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onDeleteRoutine={onDeleteRoutine}
            onToggleRoutine={onToggleRoutine}
            isCompleted={isRoutineCompletedToday(routine.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'amina' },
    { id: 2, name: 'adil' }
  ]);
  
  const [routines, setRoutines] = useState([
    { id: 1, name: 'Drink-Water', userId: 1 },
    { id: 2, name: 'Meditate 10 min', userId: 1 },
    { id: 3, name: 'Read 20 pages', userId: 1 },
    { id: 4, name: 'Workout 30 min', userId: 2 },
    { id: 5, name: 'Plan Day', userId: 2 },
    { id: 6, name: 'Learn New Skill', userId: 2 },
    { id: 7, name: 'Sleep 8 hours', userId: 1 },
    { id: 8, name: 'Call Family', userId: 2 }
  ]);
  
  const [completions, setCompletions] = useState([]);

  const addRoutine = (name, userId) => {
    const newRoutine = {
      id: Date.now(),
      name,
      userId: parseInt(userId)
    };
    setRoutines([...routines, newRoutine]);
  };

  const deleteRoutine = (id) => {
    setRoutines(routines.filter(routine => routine.id !== id));
    setCompletions(completions.filter(completion => completion.routineId !== id));
  };

  const toggleRoutineCompletion = (routineId) => {
    const today = getTodayDate();
    const existingCompletionIndex = completions.findIndex(
      c => c.routineId === routineId && c.date === today
    );

    if (existingCompletionIndex !== -1) {
      setCompletions(completions.filter((_, index) => index !== existingCompletionIndex));
    } else {
      setCompletions([...completions, { routineId, date: today }]);
    }
  };

  const isRoutineCompletedToday = (routineId) => {
    const today = getTodayDate();
    return completions.some(c => c.routineId === routineId && c.date === today);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Habits tracker</h1>
        </header>

        <AddRoutineForm users={users} onAddRoutine={addRoutine} />
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {users.map(user => (
            <UserSection
              key={user.id}
              user={user}
              routines={routines}
              onDeleteRoutine={deleteRoutine}
              onToggleRoutine={toggleRoutineCompletion}
              isRoutineCompletedToday={isRoutineCompletedToday}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;