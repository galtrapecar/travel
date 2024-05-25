import L from 'leaflet';
import { PointOfInterest } from '../../types';
import { DuckDuckGoImage } from 'duckduckgo-images-api';

const PoiMarker = (poi: PointOfInterest, image?: DuckDuckGoImage) => {
  return L.divIcon({
    className: 'PoiMarker',
    html: `
      <div class='PoiMarker__pin'>
        ${
          image
            ? `<div class='PoiMarker__image' style='background-image: url(${image})'></div>`
            : `<div class='PoiMarker__title'>${poi.name}</div>`
        }
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
};

export default PoiMarker;
