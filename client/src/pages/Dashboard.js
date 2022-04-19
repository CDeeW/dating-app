import TinderCard from 'react-tinder-card';
import { useState } from 'react';
import ChatContainer from '../components/ChatContainer';

const Dashboard = () => {
  const characters = [
    {
      name: 'Random Lady',
      url: 'https://cdn.pixabay.com/photo/2021/02/27/15/44/portrait-6054910_1280.jpg',
    },
    {
      name: 'Baby Monkey',
      url: 'https://i.etsystatic.com/17408318/r/il/0eacfe/2181524469/il_fullxfull.2181524469_m5ug.jpg',
    },
    {
      name: 'Monica Hall',
      url: 'https://m.media-amazon.com/images/M/MV5BOTAwNTMwMzE5OF5BMl5BanBnXkFtZTgwMjYwNzI2MjE@._V1_UY1200_CR68,0,630,1200_AL_.jpg',
    },
    {
      name: 'Jared Dunn',
      url: 'https://m.media-amazon.com/images/M/MV5BMTQ5MzkzNTIyN15BMl5BanBnXkFtZTYwNzUzOTA2._V1_UY1200_CR85,0,630,1200_AL_.jpg',
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://imgur.com/oPj4A8u.jpg',
    },
  ];

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <div className='dashboard'>
      <ChatContainer />
      <div className='swiper-container'>
        <div className='card-container'>
          {characters.map((character) => (
            <TinderCard
              className='swipe'
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: 'url(' + character.url + ')' }}
                className='card'
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
          <div className='swipe-info'>
            {lastDirection ? <p>you swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
