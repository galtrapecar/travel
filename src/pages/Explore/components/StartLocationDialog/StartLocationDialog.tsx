import { useState } from 'react';
import { Icons } from '../../../../assets/icons';
import IconButton from '../../../../components/IconButton/IconButton';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import useSearchCity from '../../hooks/useSearchCity';
import _ from 'lodash';

const StartLocationDialog = () => {
  const [query, setQuery] = useState('');
  const { cities } = useSearchCity(query);

  const getMyLocation = () => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  };

  return (
    <div className="StartLocationDialog">
      <div>Where do you want to start from?</div>
      <SearchBar
        placeholder="Search"
        onInput={(e) => setQuery(e.target.value)}
        results={cities
          .filter((city) => _.isString(city.city))
          .map((city) => ({ label: city.city! }))}
      />
      <div>Or</div>
      <IconButton
        label={'Start from my location'}
        icon={<Icons.LocationIcon width={24} height={24} />}
        onClick={() => getMyLocation()}
      />
    </div>
  );
};

export default StartLocationDialog;
