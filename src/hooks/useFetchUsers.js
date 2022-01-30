import { useEffect, useState } from 'react';
import firebaseApp from '../firebase';

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

export default useFetchUsers;