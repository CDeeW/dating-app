import Nav from '../components/Nav';
import { useState } from 'react';
import AuthModal from '../components/AuthModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const authToken = false;

  const handleClick = () => {
    console.log('click');
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className={showModal ? 'dark-overlay' : 'overlay'}>
      <Nav
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
