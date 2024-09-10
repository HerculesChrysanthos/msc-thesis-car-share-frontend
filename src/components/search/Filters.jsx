import React, { useEffect, useRef, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { TbChevronDown } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';

function Filters({
  maxPrice,
  minPrice,
  make,
  model,
  gearboxType,
  setMaxPrice,
  setMinPrice,
  setMake,
  setModel,
  setGearboxType,
  displayFilters,
  setDisplayFilters,
  searchParams,
  setSearchParams,
  submitSearch,
}) {
  const { searchCars } = useSelector((state) => state.car);
  const [minMax, setMinMax] = useState([minPrice, maxPrice]);
  useEffect(() => {
    setMinPrice(minMax[0]);
    setMaxPrice(minMax[1]);
  }, [minMax]);

  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setDisplayFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const submitFilters = () => {
    const params = new URLSearchParams(searchParams);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (minPrice) params.set('minPrice', minPrice);
    if (make) params.set('make', make);
    if (model) params.set('model', model);
    if (gearboxType) params.set('gearboxType', gearboxType);

    setSearchParams(params);

    setDisplayFilters(false);

    submitSearch();
  };

  return (
    <div className='filters'>
      <div className='content' ref={contentRef}>
        <div className='close' onClick={() => setDisplayFilters(false)}>
          <IoClose />
        </div>
        <h2>Φίλτρα</h2>
        <div className='values'>
          <div className='price'>
            <h3>
              Εύρος τιμών <span>(ανα ώρα)</span>
            </h3>
            <div className='price-slide'>
              <RangeSlider
                min={searchCars?.general[0]?.minPrice}
                max={searchCars?.general[0]?.maxPrice}
                step={1}
                onInput={setMinMax}
                className='min-max-price'
                defaultValue={[
                  searchCars?.general[0]?.minPrice,
                  searchCars?.general[0]?.maxPrice,
                ]}
              />
            </div>
          </div>
          <div className='make'>
            <select onChange={(e) => setMake(e.target.value)} value={make}>
              <option hidden>Μάρκα</option>
              {searchCars?.general[0]?.makes.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className='icon'>
              <TbChevronDown />
            </div>
          </div>
          <div className='model'>
            <select
              disabled={!make}
              onChange={(e) => setModel(e.target.value)}
              value={model}
            >
              <option hidden>Μοντέλο</option>
              {searchCars?.general[0]?.models?.map((option) =>
                option.make === make ? (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ) : null
              )}
            </select>
            <div className='icon'>
              <TbChevronDown />
            </div>
          </div>
          <div className='gearboxType'>
            <select
              onChange={(e) => setGearboxType(e.target.value)}
              value={gearboxType}
            >
              <option hidden>Κιβώτιο ταχυτήτων</option>
              <option value='Αυτόματο'>Αυτόματο</option>
              <option value='Μηχανικό'>Μηχανικό</option>
              <option value='Ημιαυτόματο'>Ημιαυτόματο</option>
            </select>
            <div className='icon'>
              <TbChevronDown />
            </div>
          </div>
        </div>
        <button
          type='button'
          className='filter-results'
          onClick={submitFilters}
        >
          Αποτελέσματα
        </button>
      </div>
    </div>
  );
}

export default Filters;
