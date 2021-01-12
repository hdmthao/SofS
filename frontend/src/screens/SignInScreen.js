import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SignInScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="auth-form px-3">
      <h1>Sign In</h1>
      <form className="form auth-form-body mt-3 rounded-3" onSubmit={submitHandler}>
        <div className="px-4">
          {loading && <div className="px-4"><LoadingBox /></div>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            className="form-fill" 
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="form-fill" 
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary rounded-2" type="submit">
            Sign In
          </button>
        </div>
      </form>
      <div>
          <label />
          <div className="mt-3 login-callout">
            New to SofS?&nbsp;
            <Link className="active" to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
    </div>
  );
}
