import React, { useEffect, useState } from 'react';
import firebaseApp from '../../firebase';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebaseApp
      .collection('users')
      .onSnapshot((snapshot => {
        const usersFromDb = snapshot.docs.map((user) => ({
          id: user.id,
          ...user.data()
        }));
        setUsers(usersFromDb);
      }));
  }, []);

  return users;
};

const MultiplayerLeaderboard = () => {
  const users = useFetchUsers();

  return (
    <div className='my-1 w-1/5'>
      <h1 className="text-4xl mb-5">Leaderboard</h1>
      <div>
        { users.map((user) => (
          <div key={user.id} className="flex justify-between text-lg">
            <div>{user.name}</div>
            <span>{`${user.time_seconds}s`}</span>
          </div>
        )) }
      </div>
    </div>
  );
};

export default MultiplayerLeaderboard;
