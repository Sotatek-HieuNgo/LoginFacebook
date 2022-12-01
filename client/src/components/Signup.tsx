import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import axios, { AxiosError } from 'axios';
import { isEmail, isEmpty, isMatch } from '../utils/Validation';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  err: '',
  success: '',
};

const Signup = () => {
  const [user, setUser] = useState(initialState);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    err,
    success,
  } = user;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(email)) {
      return setUser({
        ...user,
        err: 'Please fill in all fields.',
        success: '',
      });
    }

    if (!isEmail(email)) {
      return setUser({ ...user, err: 'Invalid Email.', success: '' });
    }

    if (!isMatch(password, confirmPassword)) {
      return setUser({
        ...user,
        err: 'Password did not match.',
        success: '',
      });
    }

    try {
      const { data } = await axios.post(`/auth/signup`, {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
      });
      setUser({ ...user, err: '', success: data.msg });
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
            <h1>Create Account</h1>
            <span>
              Already have an account? <Link to="/signin">Sign In</Link>
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
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={handleChangeInput}
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
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
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChangeInput}
              />
              {err && <p style={{ color: 'red' }}>{user.err}</p>}
              {success && <p style={{ color: 'green' }}>{user.success}</p>}
              <button className="button" onClick={handleSubmit}>
                Sign Up
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

export default Signup;
