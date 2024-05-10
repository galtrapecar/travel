import { useRef, useState } from 'react';
import { Icons } from '../../../../assets/icons';
import IconButton from '../../../../components/IconButton/IconButton';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import useSearchCity from '../../hooks/useSearchCity';
import _ from 'lodash';
import FlagIcon from '../../../../components/FlagIcon/FlagIcon';
import L from 'leaflet';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentCityAtom, startLocationAtom } from '../../state';
import useBuildTrip from '../../hooks/useBuildTrip';
import { MapControlls } from '../../../../mapControlls';
import CustomMarker from '../../../../components/CustomMarker/CustomMarker';

const StartLocationDialog = () => {
  const [startLocation, setStartLocation] = useRecoilState(startLocationAtom);
  const setCurrentCity = useSetRecoilState(currentCityAtom);
  const [query, setQuery] = useState('');
  const { cities } = useSearchCity(query);
  const { addLocation } = useBuildTrip();

  const getMyLocation = () => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  };

  const onHover = (index: number) => {
    const filtered = cities.filter((city) => _.isString(city.city));
    const city = filtered.at(index);
    if (!city || !city.lat || !city.lng) return;
    MapControlls.addTemporaryMarker(L.marker([city.lat, city.lng], {}));
    MapControlls.map.flyTo([city.lat, city.lng], 10, {
      animate: true,
      duration: 3,
    });
  };

  const onSelect = (index: number) => {
    const filtered = cities.filter((city) => _.isString(city.city));
    const city = filtered.at(index);
    setStartLocation(city || null);
    setCurrentCity(city || null);
    if (!city) return;
    MapControlls.addPermanentMarker(
      L.marker([city.lat, city.lng], {
        icon: CustomMarker(city),
      }),
    );
    addLocation({});
  };

  if (_.isObject(startLocation)) {
    return null;
  }

  return (
    <div className="StartLocationDialog">
      <div>Where do you want to start from?</div>
      <SearchBar
        placeholder="Search"
        onInput={(e) => setQuery(e.target.value)}
        results={cities
          .filter((city) => _.isString(city.city))
          .map((city) => ({
            label: city.city!,
            icon: <FlagIcon iso2={city.iso2} />,
          }))}
        onResultHover={onHover}
        onResultClick={onSelect}
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
