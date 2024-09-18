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

  private static markerZoomLimit = 11;

  static init(map: L.Map) {
    MapControls.map = map;
    map.on('zoomend', () => {
      const zoom = map.getZoom();
      if (zoom >= this.markerZoomLimit) {
        MapControls.hideMarkers();
        MapControls.showPoiMarkers();
      } else {
        MapControls.showMarkers();
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

  private static showMarkers() {
    const map = MapControls.map;
    if (!map) return;
    MapControls.temporaryMarker?.addTo(map);
    MapControls.markers?.slice(1).forEach((marker) => marker.addTo(map));
  }

  private static hideMarkers() {
    const map = MapControls.map;
    if (!map) return;
    if (MapControls.temporaryMarker)
      map.removeLayer(MapControls.temporaryMarker);
    MapControls.markers?.slice(1).forEach((marker) => map.removeLayer(marker));
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
    if (this.map.getZoom() >= this.markerZoomLimit)
      MapControls.showPoiMarkers();
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
    marker.on('mouseover', () => {
      const popup = document.querySelector<HTMLDivElement>('#map-popup');
      if (!popup) return;
      const pos = map.latLngToContainerPoint([poi.lat, poi.lng]);
      popup.style.left = pos.x + 'px';
      popup.style.top = pos.y + 'px';
      popup.style.display = '';
      popup.innerText = poi.name;
    });
    marker.on('mouseout', () => {
      const popup = document.querySelector<HTMLDivElement>('#map-popup');
      if (!popup) return;
      popup.style.left = '-9000px';
      popup.style.top = '-9000px';
      popup.style.display = 'none';
      popup.innerText = '';
    });
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
