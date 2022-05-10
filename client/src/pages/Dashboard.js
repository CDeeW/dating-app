import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  // don't really understand why you pass in '[user]'
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // anytime the user changes, then we call the getUser function
  useEffect(() => {
    console.log('useEffect called');
    getUser();
  }, []);

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
      url: 'https://media.vanityfair.com/photos/620aa878b1aef5780ef1d04e/master/pass/1340176590',
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

  console.log('user' + JSON.stringify(user));

  return (
    <>
      {user && (
        <div className='dashboard'>
          <ChatContainer user={user} />
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
      )}
    </>
  );
};

export default Dashboard;
