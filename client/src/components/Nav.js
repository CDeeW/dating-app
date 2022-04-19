const blankLogo = require('../images/blankLogo.png');
const colorLogo = require('../images/colorLogo.png');

const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setIsSignUp(false);
    setShowModal(true);
  };

  const authToken = false;
  return (
    <nav>
      <div className='logo-container'>
        <img className='logo' src={minimal ? colorLogo : blankLogo} />
      </div>
      {!authToken && !minimal && (
        <button
          className='nav-button'
          onClick={handleClick}
          disabled={showModal}
        >
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;
