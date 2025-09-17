import React, { useState } from "react";

const AddRoutineForm = ({ users, onAddRoutine }) => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(users[0]?.id || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && userId) {
      onAddRoutine(name, userId);
      setName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white shadow-md rounded-lg p-2 mb-8 border border-blue-400"
    >
      {/* Input texte */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a new routine..."
        className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200"
        required
      />

      {/* Select utilisateur */}
      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {/* Bouton Add */}
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-5 py-2 rounded-md transition-colors"
      >
        Add
      </button>
    </form>
  );
};

export default AddRoutineForm;
