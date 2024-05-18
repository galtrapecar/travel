import L from 'leaflet';
import { City } from '../../types';
import useCityImage from '../CityCard/hooks/useCityImage';
import { DuckDuckGoImage } from 'duckduckgo-images-api';

const CustomMarker = (city: City, image?: DuckDuckGoImage) => {
  return L.divIcon({
    className: 'CustomMarker',
    html: `
      <div class='CustomMarker__pin'>
        ${
          image
            ? `<div class='CustomMarker__image' style='background-image: url(${image})'></div>`
            : `<div class='CustomMarker__title'>${city.city}</div>`
        }
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
};

export default CustomMarker;
