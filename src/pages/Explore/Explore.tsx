import L from "leaflet";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";

const Explore = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    var map = L.map("map", {
      center: [51.505, -0.09],
      zoom: 12,
      zoomControl: false,
    });
    L.tileLayer(
      "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}@2x.png?key=QLSEpx2wahheTvKGENf4",
      {
        tileSize: 256,
        maxZoom: 19,
      }
    ).addTo(map);
    L.control
      .zoom({
        position: "bottomright",
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
        <div>Where do you want to start from?</div>
      </Modal>
    </div>
  );
};

export default Explore;
