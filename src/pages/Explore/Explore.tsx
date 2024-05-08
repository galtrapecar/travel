import L from 'leaflet';
import { useEffect, useRef } from 'react';
import Modal from '../../components/Modal/Modal';
import StartLocationDialog from './components/StartLocationDialog/StartLocationDialog';
import window from '../../window';
import TripBuilderDialog from './components/TripBuilderDialog/TripBuilderDialog';
import Drawer from '../../components/Drawer/Drawer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cityDrawerOpenAtom, currentCityAtom, selectedCityInfoAtom } from './state';
import useGetCitiesInRadius from './hooks/useGetCitiesInRadius';
import CityCard from '../../components/CityCard/CityCard';
import { City } from '../../types';
import CityInfo from '../../components/CityInfo/CityInfo';

const Explore = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [drawerOpen, setDrawerOpen] = useRecoilState(cityDrawerOpenAtom);
  const currentCity = useRecoilValue(currentCityAtom);
  const selectedCityInfo = useRecoilValue(selectedCityInfoAtom);
  const { citiesInRadius } = useGetCitiesInRadius(currentCity);

  useEffect(() => {
    if (!mapRef.current) return;
    var map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 12,
      zoomControl: false,
    });
    window.map = map;
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

  const onCityCardHover = (city: City) => {
    if (!city || !city.lat || !city.lng) return;
    const map = window.map as L.Map;
    if (!map) return;
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }
    markerRef.current = L.marker([city.lat, city.lng], {}).addTo(map);
    map.flyTo([city.lat, city.lng], 13, { animate: true, duration: 3 });
  };

  return (
    <div className="Explore">
      <div id="map" ref={mapRef} />
      <Modal>
        <StartLocationDialog />
        <TripBuilderDialog />
      </Modal>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="Explore__cityCards">
          {citiesInRadius &&
            citiesInRadius.slice(0, 10).map((city, index) => (
              <CityCard
                key={(city.city || '') + (city.country || index)}
                {...city}
                onMouseEnter={onCityCardHover}
              />
            ))}
        </div>
      </Drawer>
      {selectedCityInfo && <CityInfo {...selectedCityInfo} />}
    </div>
  );
};

export default Explore;
