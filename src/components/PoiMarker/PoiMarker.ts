import L from 'leaflet';
import { PointOfInterest } from '../../types';
import PointOfInterestIconHTML from '../PointOfInterestIconHTML/PointOfInterestIconHTML';

const PoiMarker = (poi: PointOfInterest) => {
  return L.divIcon({
    className: 'PoiMarker',
    html: `
      <div class='PoiMarker__pin'>
        <div class='PoiMarker__circle PoiMarker__circle--${poi.type}'>
          <img src=${PointOfInterestIconHTML(poi.type)} />
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export default PoiMarker;

// `
//   <div class='PoiMarker__pin'>
//     <div class='PoiMarker__circle'></div>
//     ${
//       image
//         ? `<div class='PoiMarker__image' style='background-image: url(${image})'></div>`
//         : `<div class='PoiMarker__title'>${poi.name}</div>`
//     }
//   </div>
// `
