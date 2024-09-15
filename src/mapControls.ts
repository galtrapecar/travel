import L from 'leaflet';
import { City, PointOfInterest } from './types';
import PoiMarker from './components/PoiMarker/PoiMarker';
import { API_URL } from './config';

export class MapControls {
  static map: L.Map;
  static temporaryMarker: L.Marker | null;
  static temporaryPolyline: L.Polyline;
  static markers: L.Marker[] = [];
  static polylines: L.Polyline[] = [];
  static poiMarkers: L.Marker[] = [];

  static init(map: L.Map) {
    MapControls.map = map;
    map.on('zoomend', (e) => {
      const zoom = map.getZoom();
      if (zoom >= 15) {
        MapControls.showPoiMarkers();
      } else {
        MapControls.hidePoiMarkers();
      }
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
    encodedPolyline?: string,
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
    polyline.on('click', async () => {
      const response = await fetch(
        `${API_URL}/pois/nearPolyline?${encodedPolyline}`,
      );
      console.log(await response.json());
    });
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
  static addPointsOfInterest(pois: PointOfInterest[]) {
    MapControls.removePointsOfInterest();
    pois.forEach((poi) => {
      MapControls.addPoiMarker(poi);
    });
    if (this.map.getZoom() >= 15) MapControls.showPoiMarkers();
  }

  private static addPoiMarker(poi: PointOfInterest) {
    const map = MapControls.map;
    if (!map) return;
    const marker = L.marker([poi.lat, poi.lng], { icon: PoiMarker(poi) });
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
