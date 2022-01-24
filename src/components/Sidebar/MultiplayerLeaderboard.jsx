import React, { useEffect, useState } from 'react';
import firebaseApp from '../../firebase';

const useFetchUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebaseApp
      .collection('users')
      .orderBy('time_seconds')
      .onSnapshot((snapshot => {
        const usersFromDb = snapshot.docs.map((user) => ({
          id: user.id,
          ...user.data()
        }));
        setUsers(usersFromDb.reverse());
        setIsLoading(false);
      }));
    return () => setUsers([]);
  }, []);

  return { users, isLoading };
};

const MultiplayerLeaderboard = () => {
  const { users, isLoading } = useFetchUsers();

  return (
    <div className='my-1'>
      <h1 className="text-4xl mb-5">Leaderboard</h1>
      { isLoading && 'Loading...' }
      <div>
        { users.map((user) => (
          <div key={user.id} className="flex justify-between text-lg">
            <div>
              <span>{user.name}</span>
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
