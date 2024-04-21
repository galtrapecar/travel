import { useRef, useState } from 'react';
import { Icons } from '../../../../assets/icons';
import IconButton from '../../../../components/IconButton/IconButton';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import useSearchCity from '../../hooks/useSearchCity';
import _ from 'lodash';
import FlagIcon from '../../../../components/FlagIcon/FlagIcon';
import L from 'leaflet';
import window from '../../../../window';
import { useRecoilState } from 'recoil';
import { startLocationAtom } from '../../state';
import useBuildTrip from '../../hooks/useBuildTrip';

const StartLocationDialog = () => {
  const markerRef = useRef<L.Marker | undefined>();
  const [startLocation, setStartLocation] = useRecoilState(startLocationAtom);
  const [query, setQuery] = useState('');
  const { cities } = useSearchCity(query);

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
    const map = window.map as L.Map;
    if (!map) return;
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }
    markerRef.current = L.marker([city.lat, city.lng], {}).addTo(map);
    map.flyTo([city.lat, city.lng], 13, { animate: true, duration: 3 });
  };

  const onSelect = (index: number) => {
    const filtered = cities.filter((city) => _.isString(city.city));
    const city = filtered.at(index);
    setStartLocation(city || null);
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
