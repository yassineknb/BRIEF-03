import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users, routines, onDeleteRoutine, onToggleRoutine, isRoutineCompletedToday }) => {
  return (
    <div className="bg-white flex justify-between rounded-lg shadow-sm p-6">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          routines={routines.filter(r => r.userId === user.id)}
          onDeleteRoutine={onDeleteRoutine}
          onToggleRoutine={onToggleRoutine}
          isRoutineCompletedToday={isRoutineCompletedToday}
        />
      ))}
    </div>
  );
};

export default UserList;
