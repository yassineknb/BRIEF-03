import React from "react";
import RoutineList from "./RoutineList";

const UserCard = ({ user, routines, onDeleteRoutine, onToggleRoutine, isRoutineCompletedToday }) => {
  if (routines.length === 0) return null;

  const completedCount = routines.filter(r => isRoutineCompletedToday(r.id)).length;
  const progress = (completedCount / routines.length) * 100;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
      <img
        src={user.avatar}
        alt={user.name}
        className={`w-16 h-16 rounded-full border-4 border-${user.color}-500 object-cover`}
      />
      <h3 className="mt-3 text-lg font-semibold">{user.name}</h3>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
        <div
          className={`h-2 rounded-full bg-${user.color}-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Routines */}
      <RoutineList
        routines={routines}
        onDeleteRoutine={onDeleteRoutine}
        onToggleRoutine={onToggleRoutine}
        isRoutineCompletedToday={isRoutineCompletedToday}
      />
    </div>
  );
};

export default UserCard;
