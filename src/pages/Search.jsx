import CarResults from '../components/search/CarResults';
import MapResults from '../components/search/MapResults';
import SearchBar from '../components/search/SearchBar';

function Search() {
  return (
    <div className='searchPage'>
      <SearchBar />
      <div className='search-results'>
        <CarResults />
        <MapResults />
      </div>
    </div>
  );
}

export default Search;
