import L from 'leaflet';
import { City, PointOfInterest } from './types';
import PoiMarker from './components/PoiMarker/PoiMarker';

export class MapControls {
  static map: L.Map;
  static temporaryMarker: L.Marker | null;
  static temporaryPolyline: L.Polyline;
  static markers: L.Marker[] = [];
  static polylines: L.Polyline[] = [];
  static poiMarkers: L.Marker[] = [];

  static init(map: L.Map) {
    MapControls.map = map;
    map.on('zoomend', () => {
      // const zoom = map.getZoom();
      // if (zoom >= 15) {
      //   MapControls.showPoiMarkers();
      // } else {
      //   MapControls.hidePoiMarkers();
      // }
    });
  }

  static flyToCity(city: City | null) {
    const map = MapControls.map;
    if (!map || !city) return;
    map.flyTo([city.lat, city.lng], 7, {
      duration: 2,
    });
  }

  static addTemporaryPolyline(points: L.LatLngExpression[]) {
    const map = MapControls.map;
    if (!map) return;

    const temporaryPolyline = MapControls.temporaryPolyline;
    if (temporaryPolyline) map.removeLayer(temporaryPolyline);

    const polyline = new L.Polyline(points, {
      color: 'black',
      weight: 3,
      opacity: 0.3,
      smoothFactor: 1,
    });
    polyline.addTo(map);
    MapControls.temporaryPolyline = polyline;
  }

  static addPermanentPolyline(
    points: L.LatLngExpression[],
    onClick?: () => Promise<void>,
  ) {
    const map = MapControls.map;
    if (!map) return;

    const temporaryPolyline = MapControls.temporaryPolyline;
    if (temporaryPolyline) map.removeLayer(temporaryPolyline);

    const polyline = new L.Polyline(points, {
      color: 'black',
      weight: 3,
      opacity: 0.3,
      smoothFactor: 1,
    });
    if (onClick) polyline.on('click', onClick);
    polyline.addTo(map);
    MapControls.polylines.push(polyline);
  }

  // Markers

  static addTemporaryMarker(marker: L.Marker) {
    const map = MapControls.map;
    if (!map) return;

    const temporaryMarker = MapControls.temporaryMarker;
    if (temporaryMarker) map.removeLayer(temporaryMarker);

    marker.addTo(map);
    MapControls.temporaryMarker = marker;
  }

  static addPermanentMarker(marker: L.Marker) {
    const map = MapControls.map;
    if (!map) return;

    const temporaryMarker = MapControls.temporaryMarker;
    if (temporaryMarker) map.removeLayer(temporaryMarker);
    MapControls.temporaryMarker = null;

    marker.addTo(map);
    MapControls.markers.push(marker);
  }

  // Points of interest
  static addPointsOfInterest(
    pois: PointOfInterest[],
    onClick?: (poi: PointOfInterest) => void,
  ) {
    MapControls.removePointsOfInterest();
    pois.forEach((poi) => {
      MapControls.addPoiMarker(poi, onClick);
    });
    // if (this.map.getZoom() >= 15) MapControls.showPoiMarkers();
    MapControls.showPoiMarkers();
  }

  private static addPoiMarker(
    poi: PointOfInterest,
    onClick?: (poi: PointOfInterest) => void,
  ) {
    const map = MapControls.map;
    if (!map) return;
    const marker = L.marker([poi.lat, poi.lng], { icon: PoiMarker(poi) });
    if (onClick) marker.on('click', () => onClick(poi));
    MapControls.poiMarkers.push(marker);
  }

  static removePointsOfInterest() {
    const map = MapControls.map;
    if (!map) return;
    MapControls.poiMarkers.forEach((poiMarker) => map.removeLayer(poiMarker));
    MapControls.poiMarkers = [];
  }

  private static showPoiMarkers() {
    const map = MapControls.map;
    if (!map) return;
    MapControls.poiMarkers.forEach((marker) => {
      marker.addTo(map);
    });
  }

  private static hidePoiMarkers() {
    const map = MapControls.map;
    if (!map) return;
    MapControls.poiMarkers.forEach((poiMarker) => map.removeLayer(poiMarker));
  }
}
