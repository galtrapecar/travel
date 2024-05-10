import L from 'leaflet';
import { City } from './types';

export class MapControlls {
  static map: L.Map;
  static temporaryMarker: L.Marker | null;
  static temporaryPolyline: L.Polyline;
  static markers: L.Marker[] = [];

  static init(map: L.Map) {
    MapControlls.map = map;
  }

  static flyToCity(city: City | null) {
    const map = MapControlls.map;
    if (!map || !city) return;
    map.flyTo([city.lat, city.lng], 7, {
      duration: 2,
    });
  }

  static addTemporaryPolyline(points: L.LatLngExpression[]) {
    const map = MapControlls.map;
    if (!map) return;

    const temporaryPolyline = MapControlls.temporaryPolyline;
    if (temporaryPolyline) map.removeLayer(temporaryPolyline);

    const polyline = new L.Polyline(points, {
      color: 'black',
      weight: 3,
      opacity: 0.3,
      smoothFactor: 1,
    });
    polyline.addTo(map);
    MapControlls.temporaryPolyline = polyline;
  }

  // Markers

  static addTemporaryMarker(marker: L.Marker) {
    const map = MapControlls.map;
    if (!map) return;

    const temporaryMarker = MapControlls.temporaryMarker;
    if (temporaryMarker) map.removeLayer(temporaryMarker);

    marker.addTo(map);
    MapControlls.temporaryMarker = marker;
  }

  static addPermanentMarker(marker: L.Marker) {
    const map = MapControlls.map;
    if (!map) return;

    const temporaryMarker = MapControlls.temporaryMarker;
    if (temporaryMarker) map.removeLayer(temporaryMarker);
    MapControlls.temporaryMarker = null;

    marker.addTo(map);
    MapControlls.markers.push(marker);
  }
}
