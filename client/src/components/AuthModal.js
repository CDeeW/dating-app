import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  let navigate = useNavigate();

  //console.log(email, password, confirmPassword);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp && password !== confirmPassword) {
        setError('Passwords need to match');
        return;
      }
      console.log('login stage');
      const response = await axios.post(
        `http://localhost:8000/${isSignUp ? 'signup' : 'login'}`,
        {
          email,
          password,
        }
      );
      console.log('front end : ' + JSON.stringify(response));

      console.log('token: ' + response.data.token);
      console.log('userId: ' + response.data.userId);

      // Setting the cookie for the email to the response.

      setCookie('AuthToken', response.data.token);
      setCookie('UserId', response.data.userId);

      const success = response.status === 201;

      if (success && isSignUp) navigate('./onboarding');
      if (success && !isSignUp) navigate('./dashboard');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='auth-modal-wrapper'>
      <div className='auth-modal'>
        <div className='close-icon' onClick={handleClick}>
          ⨉
        </div>
        {/*AuthModal Form:*/}
        <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
        <p>By clicking Log In, you agree to our terms.</p>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='email'
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='password'
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignUp && (
            <input
              type='password'
              id='password-check'
              name='password-check'
              placeholder='confirm password'
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input className='secondary-button' type='submit' />
          <p>{error}</p>
        </form>
        <hr />
        <h2>GET THE APP</h2>
      </div>
    </div>
  );
};

export default AuthModal;
