import React from 'react';
import RoutineCard from './RoutineCard';

const RoutineList = ({ routines, onDeleteRoutine, onToggleRoutine, isRoutineCompletedToday }) => {
  return (
    <div className="space-y-2">
      {routines.map(routine => (
        <RoutineCard
          key={routine.id}
          routine={routine}
          onDeleteRoutine={onDeleteRoutine}
          onToggleRoutine={onToggleRoutine}
          isCompleted={isRoutineCompletedToday(routine.id)}
        />
      ))}
    </div>
  );
};

export default RoutineList;
