import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import axios, { AxiosError } from 'axios';

const initialState = {
  email: '',
  password: '',
  err: '',
  success: '',
};

const Signin = () => {
  const [user, setUser] = useState(initialState);

  const { email, password, err, success } = user;


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
  };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`/auth/signin`, {
          email: email.toLowerCase(),
          password,
        });
        setUser({ ...user, err: '', success: data.msg });
        localStorage.setItem('id', data.user._id);
        console.log(data);
      } catch (error) {
        const err = error as AxiosError;
        const data: any = err.response?.data;
        data?.message && setUser({ ...user, err: data?.message, success: '' });
      }
    };

    const signInWithFacebook = async () => {
      window.open('/auth/facebook', '_blank', 'width=500,height=500');
    };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card_title">
            <h1>Login Account</h1>
            <span>
              Not a member? <Link to="/signup">Sign up</Link>
            </span>
          </div>
          <div className="form">
            <form>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeInput}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={handleChangeInput}
              />
              {err && <p style={{ color: 'red' }}>{user.err}</p>}
              {success && <p style={{ color: 'green' }}>{user.success}</p>}
              <button className="button" onClick={handleSubmit}>
                Sign In
              </button>
            </form>
            <button
              className="button button--social-login button--facebook"
              onClick={signInWithFacebook}
            >
              <FaFacebook className="icon" />
              <span className="loginFacebook">Login With Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;