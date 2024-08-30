import { useState } from 'react';
import CarResults from '../components/search/CarResults';
import MapResults from '../components/search/MapResults';
import SearchBar from '../components/search/SearchBar';
import { useSearchParams } from 'react-router-dom';

const initialCenter = {
  lat: 37.98381,
  lng: 23.727539,
};

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPin, setSelectedPin] = useState('');
  const [carsPageNum, setCarsPageNum] = useState(
    searchParams?.get('page') ? searchParams?.get('page') : 1
  );
  const [carsLimit, setCarsLimit] = useState(8);

  // Map Center
  const { lat, long } = searchParams;
  const [center, setCenter] = useState(() => {
    return lat && long
      ? {
          lat: lat,
          lng: long,
        }
      : initialCenter;
  });

  return (
    <div className='searchPage'>
      <SearchBar
        carsPageNum={carsPageNum}
        carsLimit={carsLimit}
        setCenter={setCenter}
      />
      <div className='search-results'>
        <CarResults
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
          carsPageNum={carsPageNum}
          setCarsPageNum={setCarsPageNum}
          carsLimit={carsLimit}
        />
        <MapResults
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
          center={center}
          setCenter={setCenter}
        />
      </div>
    </div>
  );
}

export default Search;
