import Nav from '../components/Nav';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import AuthModal from '../components/AuthModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const authToken = cookies.AuthToken;

  const handleClick = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId);
      removeCookie('AuthToken', cookies.AuthToken);
      window.location.reload();
      return;
    }
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className={showModal ? 'dark-overlay' : 'overlay'}>
      <Nav
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className='home'>
        <h1 className='primary-title'>Meet Someone Today </h1>
        <button className='primary-button' onClick={handleClick}>
          {authToken ? 'Sign Out' : 'Create Account'}
        </button>

        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
