import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import StartLocationDialog from './components/StartLocationDialog/StartLocationDialog';
import TripBuilderDialog from './components/TripBuilderDialog/TripBuilderDialog';
import Drawer from '../../components/Drawer/Drawer';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cityDrawerOpenAtom,
  currentCityAtom,
  selectedCityInfoAtom,
  startLocationAtom,
} from './state';
import useGetCitiesInRadius from './hooks/useGetCitiesInRadius';
import CityCard from '../../components/CityCard/CityCard';
import { City } from '../../types';
import CityInfo from '../../components/CityInfo/CityInfo';
import _ from 'lodash';
import { MapControlls } from '../../mapControlls';
import CityMarker from '../../components/CityMarker/CityMarker';
import useBuildTrip from './hooks/useBuildTrip';
import usePois from './hooks/usePois';
import SearchBar from '../../components/SearchBar/SearchBar';
import useSearchCity from './hooks/useSearchCity';
import FlagIcon from '../../components/FlagIcon/FlagIcon';

const Explore = () => {
  const { addCity, trip } = useBuildTrip();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useRecoilState(cityDrawerOpenAtom);
  const [cityQuery, setCityQuery] = useState('');
  const { cities } = useSearchCity(cityQuery);
  const [currentCity, setCurrentCity] = useRecoilState(currentCityAtom);
  const [selectedCityInfo, setSelectedCityInfo] =
    useRecoilState(selectedCityInfoAtom);
  const { citiesInRadius } = useGetCitiesInRadius(currentCity);
  const { fetchPois } = usePois();
  const startLocation = useRecoilValue(startLocationAtom);

  useEffect(() => {
    if (!mapRef.current) return;
    var map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 12,
      zoomControl: false,
    });
    MapControlls.init(map);
    L.tileLayer(
      'https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}@2x.png?key=QLSEpx2wahheTvKGENf4',
      {
        tileSize: 256,
        maxZoom: 19,
      },
    ).addTo(map);
    L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(map);
    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    MapControlls.flyToCity(currentCity);
  }, [citiesInRadius]);

  useEffect(() => {
    const map = MapControlls.map;
    if (!map) return;
    if (drawerOpen) {
      setModalOpen(false);
      map.panBy([450 / 2, 0]);
    }
    if (!drawerOpen) {
      map.panBy([-450 / 2, 0]);
    }
  }, [drawerOpen]);

  const onCityCardHover = (city: City) => {
    if (!city || !city.lat || !city.lng) return;
    if (_.isString(trip.at(-1)?.city?.city)) return;
    MapControlls.addTemporaryMarker(
      L.marker([city.lat, city.lng], { icon: CityMarker(city) }),
    );
    if (!currentCity) return;
    MapControlls.addTemporaryPolyline([
      [currentCity.lat, currentCity.lng],
      [city.lat, city.lng],
    ]);
    fetchPois(city.lat, city.lng).then((pois) => {
      MapControlls.addPointsOfInterest(pois);
    });
  };

  const onCitySelect = (city: City) => {
    if (!city || !city.lat || !city.lng) return;
    setCurrentCity(city);
    MapControlls.addPermanentMarker(
      L.marker([city.lat, city.lng], { icon: CityMarker(city) }),
    );
    if (!currentCity) return;
    MapControlls.addPermanentPolyline([
      [currentCity.lat, currentCity.lng],
      [city.lat, city.lng],
    ]);
    addCity(city);
    setDrawerOpen(false);
    setModalOpen(true);
  };

  const onCitySearchResultHover = (index: number) => {
    const city = cities.at(index);
    if (!city) return;
    MapControlls.addTemporaryMarker(
      L.marker([city.lat, city.lng], { icon: CityMarker(city) }),
    );
    if (!currentCity) return;
    MapControlls.addTemporaryPolyline([
      [currentCity.lat, currentCity.lng],
      [city.lat, city.lng],
    ]);
  };

  const onCitySearchResultSelect = (index: number) => {
    const city = cities.at(index);
    if (!city) return;
    onCitySelect(city);
    setCityQuery('');
  };

  return (
    <div className="Explore">
      <div id="map" ref={mapRef} />
      <Modal open={modalOpen} setModalOpen={setModalOpen}>
        <StartLocationDialog />
        <TripBuilderDialog />
      </Modal>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <SearchBar
          placeholder="Search"
          onInput={(e) => setCityQuery(e.target.value)}
          results={cities.map((city) => ({
            label: city.city!,
            icon: <FlagIcon iso2={city.iso2} />,
          }))}
          onResultHover={onCitySearchResultHover}
          onResultClick={onCitySearchResultSelect}
        />
        <div className="Explore__cityCards">
          {citiesInRadius &&
            citiesInRadius
              .slice(0, 10)
              .map((city, index) => (
                <CityCard
                  key={(city.city || '') + (city.country || index)}
                  {...city}
                  onMouseEnter={onCityCardHover}
                  onClick={onCitySelect}
                  onInfoClick={setSelectedCityInfo}
                  startLocation={startLocation}
                />
              ))}
        </div>
      </Drawer>
      {selectedCityInfo && <CityInfo {...selectedCityInfo} />}
    </div>
  );
};

export default Explore;
