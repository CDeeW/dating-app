import Chat from './Chat';
import ChatInput from './ChatInput';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Error - when you go from Chat back to Matches and then back to the same Chat, the last message dissapears??

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  const getUsersMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      setUsersMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // changed it back to having 2 individual functions becasue it was too hard she said.
  const getClickedUsersMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });
      setClickedUsersMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, [usersMessages, clickedUsersMessages]);

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    // adds a property to the formattedMessage object called name and gives it the value of user.firstName
    formattedMessage['name'] = user?.first_name;
    formattedMessage['img'] = user?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {};
    // adds a property to the formattedMessage object called name and gives it the value of user.firstName
    formattedMessage['name'] = clickedUser?.first_name;
    formattedMessage['img'] = clickedUser?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp;
    messages.push(formattedMessage);
  });

  // this creates the messages from both the user and the clickedUser into an array and orders it by the descending timestamp IDK HOW WORKS THOUGH
  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUsersMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
      />
    </>
  );
};

export default ChatDisplay;
