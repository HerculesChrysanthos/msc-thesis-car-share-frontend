import React, { useState } from 'react';
import { SlCloudUpload } from 'react-icons/sl';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  carUpdateImage,
  carUploadImage,
  carDeleteImage,
} from '../../../features/car/carSlice';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function RegisterCarCom4({ setStep }) {
  const navigate = useNavigate();
  const handleGoBackButton = (e) => {
    setStep(3);
  };

  const maxFileSize = 2 * 1024 * 1024;
  const { carIsLoading, carImgUploadLoading, car } = useSelector(
    (state) => state.car
  );

  const [images, setImages] = useState(
    car?.images?.length > 0 ? car?.images : []
  );
  const [imageName, setImageName] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();

  const displayImageName = (string) => {
    const parts = string.split('/');
    const name = parts[parts.length - 1];
    return name;
  };

  const uploadImages = (e) => {
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
    formData.append('setThumbnail', 'false');
    formData.append('image', img);

    setImageName(img.name);

    //return

    dispatch(carUploadImage({ carId: car._id, body: formData }))
      .unwrap()
      .then((res) => {
        setIsButtonDisabled(false);
        const newImages = res.images;
        setImages(newImages);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const deleteImage = (image) => {
    const id = image._id;

    if (!id) toast.error('Παρακαλώ επιλέξτε φωτογραφία');

    setImageName(displayImageName(image.url));

    dispatch(carDeleteImage({ carId: car._id, imageId: id }))
      .unwrap()
      .then((res) => {
        setIsButtonDisabled(false);
        const newImages = res.images;
        setImages(newImages);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const updateThumbnail = (image) => {
    const thumbnail = image._id;

    if (!thumbnail) toast.error('Παρακαλώ επιλέξτε φωτογραφία');

    setImageName(displayImageName(image.url));

    dispatch(carUpdateImage({ carId: car._id, body: { thumbnail } }))
      .unwrap()
      .then((res) => {
        setIsButtonDisabled(false);
        const newImages = res.images;
        setImages(newImages);
      })
      .catch((error) => {
        console.log(error);
        // setErrorMessage(error.message);
        toast.error(error.message);
        // setHasError(true);
        // setIsButtonDisabled(false);
      });
  };

  const saveCar = () => {
    localStorage.removeItem('car');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='step-four'>
      <form>
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
          <label htmlFor='img-upload' className='file-custom'>
            <SlCloudUpload size='90px' fill='#912740' />
            <h4>Σύρετε τις φωτογραφίες ή κάντε click εδώ</h4>
            <p>Μπορείς να ανεβάσεις μέχρι 10 εικόνες σε μορφή jpg ή png</p>
          </label>
          {carImgUploadLoading && (
            <div className='image-upload-loading'>
              <p>{imageName}</p>
              <div>Spi</div>
            </div>
          )}
          <div className='car-images-container'>
            <h3>
              Ανεβασμένες {car?.images?.length > 0 ? car?.images?.length : 0}/10
            </h3>
            <div className='car-images'>
              {images?.map((image) => (
                <div key={image._id} className='single-image'>
                  <label>
                    <input
                      type='checkbox'
                      onChange={() => updateThumbnail(image)}
                      checked={
                        car?.thumbnail?.imageId === image?._id ? true : false
                      }
                    />
                    Επιλογή Thumbnail
                  </label>
                  <div className='image-container'>
                    <img src={image.url} alt='car image' />
                  </div>
                  <div className='image-name-del'>
                    <p>{displayImageName(image.url)}</p>
                    <div
                      className='trash-icon'
                      onClick={() => deleteImage(image)}
                    >
                      <FaRegTrashAlt size={16} color='#A6A6A7' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='buttons'>
          <button type='button' className='register-car-btn' onClick={saveCar}>
            {/* {carIsLoading ? 'Φόρτωση..' : ' Επόμενο'} */}Αποθήκευση
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
