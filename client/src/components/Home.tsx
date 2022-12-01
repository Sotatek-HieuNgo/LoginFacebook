import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface UserInformation {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
}

const Home = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<UserInformation>();

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      setIsLogged(true);
      const fetchData = async () => {
        const { data } = await axios.get(`/auth/user/${id}`);
        setUser(data);
      }
      fetchData();
    } else {
      setIsLogged(false);
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem('id');
    setIsLogged(false);
  }

  return (
    <div>
      {isLogged ? (<>
        <h1>Welcome {user?.firstName} {user?.lastName}</h1>
        <h1>Email {user?.email}</h1>
        {/* <img src={user?.photo} alt="user" /> */}
        <button onClick={Logout}>Logout</button>
      </>) : (<><div>
        <Link to='/signup'>Signup</Link>
        <Link to='/signin'>Signin</Link>
      </div></>)}
    </div>
  );
};

export default Home;