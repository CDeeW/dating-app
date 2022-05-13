import React from 'react';

const Chat = ({ descendingOrderMessages }) => {
  return (
    <>
      <div className='chat-display'>
        {/* Originally i got this wrong because i just did    .map(message, _index) => but it needs 2 brackets as it's a callback*/}
        {descendingOrderMessages.map((message, _index) => (
          <div key={_index}>
            <div className='chat-message-header'>
              <div className='img-container'>
                <img src={message.img} alt={message.first_name + ' profile'} />
              </div>
              <p>{message.name}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
