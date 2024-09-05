import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import el from 'date-fns/locale/el';
import { updateProfileInfo } from '../../../features/user/userSlice';

registerLocale('el', el);

function UserInfo() {
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { user, userLoading } = useSelector((state) => state.auth);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.user?.name || '',
    surname: user?.user?.surname || '',
    email: user?.user?.email || '',
    phone: user?.user?.phone || '',
    dateOfBirth: {
      day: user?.user?.dateOfBirth?.day || '',
      month: user?.user?.dateOfBirth?.month || '',
      year: user?.user?.dateOfBirth?.year || '',
    },
    vat: user?.user?.vat || '',
    drivingSince: {
      month: user?.user?.drivingSince?.month || 1,
      year: user?.user?.drivingSince?.year || 2024,
    },
    licenceNumber: user?.user?.licenceNumber || '',
  });

  // Convert formData.dateOfBirth to a Date object
  const { day, month, year } = formData?.dateOfBirth;
  const selectedDate =
    day && month && year ? new Date(year, month - 1, day) : null;

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      dateOfBirth: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      },
    }));
  };

  const handleForm = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateYearsPassed = (drivingSince) => {
    const { month, year } = drivingSince;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adjust for zero-indexed month

    let yearsPassed = currentYear - year;
    let monthsPassed = currentMonth - month;

    if (monthsPassed < 0) {
      yearsPassed--;
    }

    return yearsPassed;
  };

  // Convert drivingSince to a Date object
  const drivingMonth = formData.drivingSince.month;
  const drivingYear = formData.drivingSince.year;
  const drivingdDate =
    drivingMonth && drivingYear
      ? new Date(drivingYear, drivingMonth - 1)
      : null;

  const handleDrivingSinceChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      drivingSince: {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      },
    }));
    setShowDatePicker(false); // Close date picker after selection
  };

  const updateUserInfo = (e) => {
    e.preventDefault();

    const {
      name,
      surname,
      email,
      phone,
      dateOfBirth,
      vat,
      drivingSince,
      licenceNumber,
    } = formData;

    if (!name) return toast.error('Παρακαλώ συμπληρώστε όνομα');
    if (!surname) return toast.error('Παρακαλώ συμπληρώστε επίθετο');
    if (!email) return toast.error('Παρακαλώ συμπληρώστε email');
    if (!phone) return toast.error('Παρακαλώ συμπληρώστε τηλέφωνο');
    if (!vat) return toast.error('Παρακαλώ συμπληρώστε Α.Φ.Μ');
    if (!licenceNumber)
      return toast.error('Παρακαλώ συμπληρώστε Αριθμός διπλώματος οδήγησης');
    if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year)
      return toast.error('Παρακαλώ συμπληρώστε ημ/νια γέννησης');
    if (!drivingSince.month || !drivingSince.year)
      return toast.error('Παρακαλώ συμπληρώστε οδηγικά έτη');

    dispatch(updateProfileInfo({ userId: user.user._id, formData }))
      .unwrap()
      .then((res) => {
        toast.success('Επιτυχής ενημέρωση προφίλ');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className='user-info'>
      <form onSubmit={updateUserInfo}>
        <h2>Βασικά στοιχεία</h2>
        <div className='select-container'>
          <div className='create-input '>
            <div className='input-label'>Όνομα</div>
            <input
              type='text'
              placeholder='πχ Ηρακλής'
              className='single-input'
              onChange={handleForm}
              name='name'
              value={formData.name}
              required={true}
            />
          </div>
          <div className='create-input '>
            <div className='input-label'>Επίθετο</div>
            <input
              type='text'
              placeholder='πχ Χρύσανθος'
              className='single-input'
              onChange={handleForm}
              name='surname'
              value={formData.surname}
              required={true}
            />
          </div>
          <div className='create-input '>
            <div className='input-label'>Email</div>
            <input
              type='text'
              placeholder='πχ test@test.gr'
              className='single-input'
              onChange={handleForm}
              name='email'
              value={formData.email}
              required={true}
            />
          </div>
          <div className='create-input '>
            <div className='input-label'>Phone</div>
            <input
              type='text'
              placeholder='πχ 210 1234567'
              className='single-input'
              onChange={handleForm}
              name='phone'
              value={formData.phone}
              required={true}
            />
          </div>
          <div className='create-input '>
            <div className='input-label'>Γενέθλια</div>
            <DatePicker
              wrapperClassName='datePicker'
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat='MMMM d, yyyy'
              locale={el}
              maxDate={new Date()}
            />
          </div>
          <div className='create-input '>
            <div className='input-label'>ΑΦΜ</div>
            <input
              type='text'
              placeholder='πχ 123456789'
              className='single-input'
              onChange={handleForm}
              name='vat'
              value={formData.vat}
              required={true}
            />
          </div>
        </div>
        <h2 className='full-row'>Στοιχεία οδήγησης</h2>
        <div className='select-container'>
          <div className='create-input '>
            <div className='input-label'>Αριθμός διπλώματος οδήγησης</div>
            <input
              type='number'
              placeholder='πχ 123456789'
              className='single-input'
              onChange={handleForm}
              name='licenceNumber'
              value={formData.licenceNumber}
              required={true}
            />
          </div>
          <div className='create-input'>
            <div className='input-label'>Οδικά έτη</div>
            <div className='displayed-val'>
              {calculateYearsPassed(formData.drivingSince)}
            </div>

            <DatePicker
              wrapperClassName='datePicker-driving'
              selected={drivingdDate}
              onChange={handleDrivingSinceChange}
              showMonthYearPicker
              dateFormat='MM/yyyy'
              locale={el}
              maxDate={new Date()}
              onClickOutside={() => setShowDatePicker(false)} // Close date picker if clicked outside
            />
          </div>
        </div>
        <div className='buttons'>
          {' '}
          <button
            type='submit'
            disabled={userLoading}
            className='register-car-btn'
          >
            {userLoading ? 'Φόρτωση..' : ' Αποθήκευση'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
