import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../assets/profile/Avatar.png';
import { MdCameraAlt } from 'react-icons/md';
import { IoStar } from 'react-icons/io5';
import { MdStarHalf } from 'react-icons/md';
import UserInfo from './menuList/UserInfo';
import MyCars from './menuList/MyCars';
import MyReservations from './menuList/MyReservations';
import { updateProfileImage } from '../../features/user/userSlice';
import toast from 'react-hot-toast';

function ProfileInfo() {
  const { user } = useSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = useState(0);
  const [displayedCar, setDisplayedCar] = useState({});
  const maxFileSize = 2 * 1024 * 1024;

  const dispatch = useDispatch();

  const menuList = [
    { name: 'Στοιχεία λογαριασμού', component: <UserInfo /> },
    {
      name: 'Τα αμάξια μου',
      component: (
        <MyCars displayedCar={displayedCar} setDisplayedCar={setDisplayedCar} />
      ),
    },
    { name: 'Οι κρατήσεις μου', component: <MyReservations /> },
  ];

  const postProfileImage = (e) => {
    e.preventDefault();

    const img = e.target.files[0];

    if (!img) {
      toast.error('Παρακαλώ επιλέξτε φωτογραφία');
      return;
    }

    if (img.size > maxFileSize) {
      toast.error('Επιτρέπεται αρχείο μέχρι 2 MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', img);

    dispatch(updateProfileImage({ userId: user.user._id, formData }))
      .unwrap()
      .then((res) => {
        toast.success('Επιτυχής ενημέρωση φωτογραφίας προφίλ');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className='container profile-page'>
      <div className='top-section'>
        <div className='profile-image'>
          <img
            src={
              user.user?.profileImage?.url ? user.user.profileImage.url : Avatar
            }
            alt='Profile image'
          />
          <div className='upload-icon'>
            <input
              className='custom-file-input'
              type='file'
              accept='image/x-png, image/jpeg'
              name='img'
              onChange={postProfileImage}
              id='profile-img-upload'
            />
            <label htmlFor='profile-img-upload' className='file-custom'>
              <MdCameraAlt color='#fff' size='20px' />
            </label>
          </div>
        </div>
        <div className='user-info'>
          <h2>
            {user?.user?.name} {user?.user?.surname}
          </h2>
          <div className='rating'>
            <div className='stars'>
              <IoStar fill='#912740' size='18px' />
              <IoStar fill='#912740' size='18px' />
              <IoStar fill='#912740' size='18px' />
              <IoStar fill='#912740' size='18px' />
              <MdStarHalf fill='#912740' size='18px' />
            </div>
            <div className='text'>(7) Αξιολογήσεις</div>
          </div>
        </div>
      </div>
      <div className='tab-section'>
        <div className='tabs'>
          {menuList.map((menu, index) => (
            <div
              key={index}
              className={`tab ${selectedTab === index ? 'selected' : ''}`}
              onClick={() =>
                setSelectedTab(index) &
                (selectedTab === 1 && setDisplayedCar({}))
              }
            >
              {menu.name}
            </div>
          ))}
        </div>
        <div className='selected-tab'>{menuList[selectedTab].component}</div>
      </div>
    </div>
  );
}

export default ProfileInfo;
