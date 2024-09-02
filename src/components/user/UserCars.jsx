import React, { useEffect, useState } from 'react';
import { getCarsByUserId } from '../../features/user/userSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner';
import NoCarsImage from '../../assets/car/no_cars.png';
import { IoStar } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft } from 'react-icons/go';
import { GoChevronRight } from 'react-icons/go';

function UserCars() {
  const { userCars, userCarsLoading } = useSelector((state) => state.user);

  const [pageNum, setPageNum] = useState(1);
  const [limit, setLimit] = useState(3);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarsByUserId({ userId: id, pageNum, limit }))
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [id, pageNum, limit, dispatch]);

  if (userCarsLoading)
    return (
      <div className='spinner-full-width'>
        <Spinner />
      </div>
    );

  return (
    <div className='car-list'>
      {userCars[0]?.totalCount[0]?.count > 0 ? (
        <div className='mycars-list'>
          {userCars[0]?.paginatedResults.map((car) => (
            <div key={car?._id} className='car'>
              <div className='car-img'>
                <img src={car?.thumbnail?.url} alt='Car image' />
              </div>
              <div className='car-info'>
                <h2>
                  {car?.make.name} {car?.model.name}
                </h2>
                <div className='rating'>
                  <div className='stars'>
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className='star'>
                        <IoStar fill='#912740' size='18px' />
                      </div>
                    ))}
                  </div>
                  <div className='text'>(7) Αξιολογήσεις</div>
                </div>
              </div>
            </div>
          ))}
          {Math.ceil(userCars[0].totalCount[0].count / limit) > 1 && (
            <ReactPaginate
              key={pageNum}
              breakLabel='...'
              nextLabel={<GoChevronRight size='16px' />}
              onPageChange={(event) => setPageNum(event.selected + 1)}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(userCars[0].totalCount[0].count / limit)}
              previousLabel={<GoChevronLeft size='16px' />}
              renderOnZeroPageCount={null}
              forcePage={pageNum - 1} // Sync with pageNum state
            />
          )}
        </div>
      ) : (
        <div className='no-cars-registered'>
          <h2>Δεν έχει καταχωρίσει κάποιο όχημα ακόμα</h2>
          <div className='img'>
            <img src={NoCarsImage} alt='Car Image' />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCars;
