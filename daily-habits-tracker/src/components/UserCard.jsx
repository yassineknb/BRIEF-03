import React from "react";
import RoutineList from "./RoutineList";

const colorMap = {
  blue: { border: "border-blue-500", bg: "bg-blue-500" },
  green: { border: "border-green-500", bg: "bg-green-500" },
  orange: { border: "border-orange-500", bg: "bg-orange-500" },
};

const UserCard = ({ user, routines, onDeleteRoutine, onToggleRoutine, isRoutineCompletedToday }) => {
  // Calcul de la progression
  const completedCount = routines.filter(r => isRoutineCompletedToday(r.id)).length;
  const progress = routines.length > 0 ? (completedCount / routines.length) * 100 : 0;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center w-72 hover:shadow-xl transition-shadow duration-300">
      {/* Avatar */}
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.name}
          className={`w-20 h-20 rounded-full border-4 ${colorMap[user.color].border} object-cover`}
        />
      </div>

      {/* Nom */}
      <h3 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h3>

      {/* Progress bar */}
      <div className="w-full mt-4">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-3 ${colorMap[user.color].bg} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1 text-right">
          {completedCount} / {routines.length} routines complétées
        </p>
      </div>

      {/* Liste des routines */}
      <div className="w-full mt-6 overflow-y-auto max-h-64">
        {routines.length > 0 ? (
          <RoutineList
            routines={routines}
            onDeleteRoutine={onDeleteRoutine}
            onToggleRoutine={onToggleRoutine}
            isRoutineCompletedToday={isRoutineCompletedToday}
          />
        ) : (
          <p className="text-gray-500 text-sm text-center">Aucune routine pour le moment</p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
