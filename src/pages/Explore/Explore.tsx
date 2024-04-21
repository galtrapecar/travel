import L from 'leaflet';
import { useEffect, useRef } from 'react';
import Modal from '../../components/Modal/Modal';
import StartLocationDialog from './components/StartLocationDialog/StartLocationDialog';
import window from '../../window';
import TripBuilderDialog from './components/TripBuilderDialog/TripBuilderDialog';

const Explore = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="Explore">
      <div id="map" ref={mapRef} />
      <Modal>
        <StartLocationDialog />
        <TripBuilderDialog />
      </Modal>
    </div>
  );
};

export default Explore;
