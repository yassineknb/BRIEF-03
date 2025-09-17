import React from "react";
import { Trash } from "lucide-react"; // icône corbeille

const RoutineCard = ({ routine, onDeleteRoutine, onToggleRoutine, isCompleted }) => {
  return (
    <div className="flex items-center justify-between mt-3">
      <span className={`font-medium ${isCompleted ? "line-through text-gray-400" : "text-black"}`}>
        {routine.name}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onToggleRoutine(routine.id)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            isCompleted
              ? "bg-gray-500 text-white"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          {isCompleted ? "cancel" : "Mark as done"}
        </button>
        <button
          onClick={() => onDeleteRoutine(routine.id)}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default RoutineCard;
