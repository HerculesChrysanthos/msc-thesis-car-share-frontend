import { useState } from 'react';
import CarResults from '../components/search/CarResults';
import MapResults from '../components/search/MapResults';
import SearchBar from '../components/search/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const initialCenter = {
  lat: 37.98381,
  lng: 23.727539,
};

function Search() {
  const { searchCars } = useSelector((state) => state.car);

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPin, setSelectedPin] = useState('');
  const [carsPageNum, setCarsPageNum] = useState(
    searchParams?.get('page') ? searchParams?.get('page') : 1
  );
  const [carsLimit, setCarsLimit] = useState(8);

  // filters
  const [maxPrice, setMaxPrice] = useState(
    searchParams?.get('maxPrice') ? searchParams?.get('maxPrice') : null
  );
  const [minPrice, setMinPrice] = useState(
    searchParams?.get('minPrice') ? searchParams?.get('minPrice') : null
  );
  const [make, setMake] = useState(
    searchParams?.get('make') ? searchParams?.get('make') : ''
  );
  const [model, setModel] = useState(
    searchParams?.get('model') ? searchParams?.get('model') : ''
  );
  const [gearboxType, setGearboxType] = useState(
    searchParams?.get('gearboxType') ? searchParams?.get('gearboxType') : ''
  );

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
        minPrice={minPrice}
        maxPrice={maxPrice}
        make={make}
        model={model}
        gearboxType={gearboxType}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setMake={setMake}
        setModel={setModel}
        setGearboxType={setGearboxType}
      />
      <div className='search-results'>
        <CarResults
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
          carsPageNum={carsPageNum}
          setCarsPageNum={setCarsPageNum}
          carsLimit={carsLimit}
          minPrice={minPrice}
          maxPrice={maxPrice}
          gearboxType={gearboxType}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setMake={setMake}
          setModel={setModel}
          setGearboxType={setGearboxType}
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
