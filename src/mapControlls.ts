import L from 'leaflet';
import { City, PointOfInterest } from './types';
import CityMarker from './components/CityMarker/CityMarker';
import PoiMarker from './components/PoiMarker/PoiMarker';

export class MapControlls {
  static map: L.Map;
  static temporaryMarker: L.Marker | null;
  static temporaryPolyline: L.Polyline;
  static markers: L.Marker[] = [];
  static polylines: L.Polyline[] = [];
  static poiMarkers: L.Marker[] = [];

  static init(map: L.Map) {
    MapControlls.map = map;
    map.on('zoomend', (e) => {
      const zoom = map.getZoom();
      if (zoom >= 15) {
        MapControlls.showPoiMarkers();
      } else {
        MapControlls.hidePoiMarkers();
      }
    });
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

  static addPermanentPolyline(points: L.LatLngExpression[]) {
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
    MapControlls.polylines.push(polyline);
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

  // Points of interest
  static addPointsOfInterest(pois: PointOfInterest[]) {
    console.log("adding poi markers");
    
    MapControlls.removePointsOfInterest();
    pois.forEach((poi) => {
      MapControlls.addPoiMarker(poi);
    });
    if (this.map.getZoom() >= 15) MapControlls.showPoiMarkers();
  }

  private static addPoiMarker(poi: PointOfInterest) {
    const map = MapControlls.map;
    if (!map) return;
    const marker = L.marker([poi.lat, poi.lng], { icon: PoiMarker(poi) });
    MapControlls.poiMarkers.push(marker);
  }

  static removePointsOfInterest() {
    const map = MapControlls.map;
    if (!map) return;
    MapControlls.poiMarkers.forEach((poiMarker) => map.removeLayer(poiMarker));
    MapControlls.poiMarkers = [];
  }

  private static showPoiMarkers() {
    const map = MapControlls.map;
    if (!map) return;
    MapControlls.poiMarkers.forEach((marker) => {
      marker.addTo(map);
    });
  }

  private static hidePoiMarkers() {
    const map = MapControlls.map;
    if (!map) return;
    MapControlls.poiMarkers.forEach((poiMarker) => map.removeLayer(poiMarker));
  }
}
