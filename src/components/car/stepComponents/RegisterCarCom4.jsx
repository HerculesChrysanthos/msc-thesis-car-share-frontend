import React, { useState } from 'react';
import { SlCloudUpload } from 'react-icons/sl';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { carUpdate } from '../../../features/car/carSlice';

function RegisterCarCom4({ setStep }) {
  const handleGoBackButton = (e) => {
    setStep(3);
  };

  const { carIsLoading, car } = useSelector((state) => state.car);

  const [imagesForUpload, setImagesForUpload] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();

  const uploadImages = (e) => {
    e.preventDefault();

    const img = e.target.files;

    if (!img) {
      toast.error('Παρακαλώ επιλέξτε φωτογραφία');
    }

    const formData = new FormData();
    formData.append('body[setThumbnail]', false);
    formData.append('image', img);

    dispatch(carUpdate({ carId: car._id, body: formData }))
      .unwrap()
      .then((res) => {
        console.log(res);
        setIsButtonDisabled(false);
        //setStep(4)
      })
      .catch((error) => {
        console.log(error);
        // setErrorMessage(error.message)
        toast.error(error.message);
        // setHasError(true)
        // setIsButtonDisabled(false)
      });
  };

  return (
    <div className='step-four'>
      <form action=''>
        <h2>Ανέβασμα φωτογραφιών</h2>
        <div className='img-upload'>
          <input
            className='custom-file-input'
            type='file'
            accept='image/x-png, image/jpeg'
            name='img'
            onChange={uploadImages}
            id='img-upload'
          />
          <label for='img-upload' className='file-custom'>
            <SlCloudUpload size='90px' fill='#912740' />
            <h4>Σύρετε τις φωτογραφίες ή κάντε click εδώ</h4>
            <p>Μπορείς να ανεβάσεις μέχρι 10 εικόνες σε μορφή jpg ή png</p>
          </label>
          {/* <div className='uploaded-img-container'>
                  {hotelImages && <img className='uploaded-img' src={hotelImages} />}
               </div> */}
        </div>
        <div className='buttons'>
          <button type='submit' className='register-car-btn'>
            {/* {carIsLoading ? 'Φόρτωση..' : ' Επόμενο'} */}Epomeno
          </button>
          <button
            type='button'
            className='go-back-car-btn'
            onClick={handleGoBackButton}
          >
            Προηγούμενο
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCarCom4;
