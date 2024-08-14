import L from 'leaflet';

const mapPinSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C7.58 2 4 5.58 4 10c0 4.42 8 12 8 12s8-7.58 8-12c0-4.42-3.58-8-8-8zm0 15.2c-1.22 0-2.2-.98-2.2-2.2s.98-2.2 2.2-2.2 2.2.98 2.2 2.2-.98 2.2-2.2 2.2z"/></svg>`;
const homeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 3v2.5L8.25 8 6 10.25V15h3v-3h6v3h3v-4.75L12 5.5V3z"/></svg>`;

const uwecLocation: L.LatLngTuple = [0.0545493, 32.4794036];

class CurrentLocationControl extends L.Control {
  onAdd(map: L.Map) {
    const controlDiv = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    controlDiv.title = 'Current Location';
    controlDiv.innerHTML = `<button>${mapPinSVG}</button>`; 
    L.DomEvent.on(controlDiv, 'click', () => {
      map.locate({ setView: true, maxZoom: 14 }); 
    });
    return controlDiv;
  }
}
class HomeControl extends L.Control {
  onAdd(map: L.Map) {
    const controlDiv = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    controlDiv.title = 'Home';
    controlDiv.innerHTML = `<button>${homeSVG}</button>`;
    L.DomEvent.on(controlDiv, 'click', () => {
      map.fire('homecontrol:reset');

      map.setView(uwecLocation, 16);
    });
    return controlDiv;
  }
}

export { CurrentLocationControl, HomeControl };
