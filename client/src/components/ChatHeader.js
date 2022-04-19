const ChatHeader = () => {
  return (
    <div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          <img src='https://imgur.com/oPj4A8u.jpg' />
        </div>
        <h3>UserName</h3>
      </div>
      <i className='log-out-icon'>←</i>
    </div>
  );
};

export default ChatHeader;
