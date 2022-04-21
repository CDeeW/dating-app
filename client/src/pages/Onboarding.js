import Nav from '../components/Nav';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Onboarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    url: '',
    about: '',
    matches: [],
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    console.log('e:', e);
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    console.log('value:', value);
    console.log('name:', name);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    console.log('submitted');

    // need to do this to stop the form from reloading... i don't understand this
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:8000/user', {
        formData,
      });
      const success = response.status == 200;
      console.log('success' + success);
      if (success) navigate('../dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className='onboarding'>
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor='first_name' className='title-label'>
              First Name
            </label>
            <input
              id='first_name'
              type='text'
              name='first_name'
              placeholder='First Name'
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label className='title-label'>Birthday</label>

            <div className='multiple-input-container'>
              <input
                id='dob_day'
                type='number'
                name='dob_day'
                placeholder='DD'
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id='dob_month'
                type='number'
                name='dob_month'
                placeholder='MM'
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id='dob_year'
                type='number'
                name='dob_year'
                placeholder='YYYY'
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label className='title-label'>Gender</label>
            <div className='multiple-input-container'>
              <input
                id='man_gender_identity'
                type='radio'
                name='gender_identity'
                value='man'
                onChange={handleChange}
                checked={formData.gender_identity === 'man'}
              />
              <label htmlFor='man_gender_identity'>Man</label>

              <input
                id='woman_gender_identity'
                type='radio'
                name='gender_identity'
                value='woman'
                onChange={handleChange}
                checked={formData.gender_identity === 'woman'}
              />
              <label htmlFor='woman_gender_identity'>Woman</label>

              <input
                id='more_gender_identity'
                type='radio'
                name='gender_identity'
                value='more'
                onChange={handleChange}
                checked={formData.gender_identity === 'more'}
              />
              <label htmlFor='more_gender_identity'>More</label>
            </div>

            <label htmlFor='show_gender' className='title-label'>
              Show gender on my profile
            </label>
            <input
              id='show_gender'
              type='checkbox'
              name='show_gender'
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label className='title-label'>Show Me</label>
            <div className='multiple-input-container'>
              <input
                id='man_gender_interest'
                type='radio'
                name='gender_interest'
                value='man'
                onChange={handleChange}
                checked={formData.gender_interest === 'man'}
              />
              <label htmlFor='man_gender_interest'>Man</label>

              <input
                id='woman_gender_interest'
                type='radio'
                name='gender_interest'
                value='woman'
                onChange={handleChange}
                checked={formData.gender_interest === 'woman'}
              />
              <label htmlFor='woman_gender_interest'>Woman</label>

              <input
                id='everyone_gender_interest'
                type='radio'
                name='gender_interest'
                value='everyone'
                onChange={handleChange}
                checked={formData.gender_interest === 'everyone'}
              />
              <label htmlFor='everyone_gender_interest'>Everyone</label>
            </div>

            <label htmlFor='about' className='title-label'>
              About Me
            </label>
            <input
              id='about'
              type='text'
              name='about'
              required={true}
              placeholder='I like long walks...'
              value={formData.about}
              onChange={handleChange}
            />

            <input type='submit' />
          </section>

          {/* Second Section */}

          <section>
            <label htmlFor='photo'>Profile Photo</label>
            <input
              type='url'
              name='url'
              id='url'
              onChange={handleChange}
              required={true}
            />
            <div className='photo-container'>
              {formData.url && (
                <img src={formData.url} alt='profile pic preview' />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
