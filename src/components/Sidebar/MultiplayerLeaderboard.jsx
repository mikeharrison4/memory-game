import React from 'react';
import useFetchUsers from '../../hooks/useFetchUsers';

const MultiplayerLeaderboard = ({ currentUser = null }) => {
  const { users, isLoading } = useFetchUsers();

  return (
    <div className='my-1'>
      <h1 className="text-4xl mb-5">Leaderboard</h1>
      { users.length === 0 && 'No players have played yet' }
      { isLoading && 'Loading...' }
      <div>
        { users.map((user) => (
          <div key={user.id} className="flex justify-between text-lg">
            <div>
              <span className={`${currentUser && currentUser.id === user.id ? 'font-bold text-green-500' : ''}`}>{user.name}</span>
              {' '}
              <span className='text-xs'>{user.id.slice(0, 4)}</span>
            </div>
            <span>{`${user.time_seconds}s`}</span>
          </div>
        )) }
      </div>
    </div>
  );
};

export default MultiplayerLeaderboard;
