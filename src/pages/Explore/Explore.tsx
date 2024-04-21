import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import StartLocationDialog from './components/StartLocationDialog/StartLocationDialog';
import window from '../../window';
import TripBuilderDialog from './components/TripBuilderDialog/TripBuilderDialog';
import Drawer from '../../components/Drawer/Drawer';
import { useRecoilState } from 'recoil';
import { cityDrawerOpenAtom } from './state';

const Explore = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useRecoilState(cityDrawerOpenAtom);

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
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div>test</div>
      </Drawer>
    </div>
  );
};

export default Explore;
