import L from 'leaflet';
import { City } from '../../types';
import { DuckDuckGoImage } from 'duckduckgo-images-api';

const CityMarker = (city: City, image?: DuckDuckGoImage) => {
  return L.divIcon({
    className: 'CityMarker',
    html: `
      <div class='CityMarker__pin'>
        ${
          image
            ? `<div class='CityMarker__image' style='background-image: url(${image})'></div>`
            : `<div class='CityMarker__title'>${city.city}</div>`
        }
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
};

export default CityMarker;
