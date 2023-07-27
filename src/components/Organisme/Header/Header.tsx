import L from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useAppSelector } from '../../../hooks/redux';
import Icon from '../../../ui/icon/icon';
import './Header.scss';
import { Organism } from '../../../@types/organism';

function Header() {
  const [position, setPosition] = useState({ lat: 43.6, lng: 1.433333 });
  const organism = useAppSelector(
    (state) => state.organism.organism as Organism
  );

  const tags = [
    ...new Set(organism.services.map((service) => service.categorie_id.tag)),
  ].sort();

  const categories = tags.map((tag, index) => ({
    id: index + 1,
    value: tag,
  }));

  return (
    <div className="organisme-header">
      <div className="organisme-details">
        <h2>{organism.name}</h2>
        <p>{organism.translations[0].description}</p>
        <div className="organisme-details-categories">
          {categories.map((categorie) => (
            <Icon
              key={categorie.id}
              className="organisme-details-categories-item"
              icon={categorie.value}
              size="30px"
            />
          ))}
        </div>
      </div>
      <MapContainer center={[organism.latitude, organism.longitude]} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Recenter lat={position.lat} lng={position.lng} /> */}

        <Marker
          key={organism.id}
          position={[organism.latitude, organism.longitude]}
          icon={
            new L.DivIcon({
              className: 'custom-icon',
              html: `<div></div>`,
              iconSize: [30, 30],
              iconAnchor: [15, 33.5],
              popupAnchor: [0, -30],
            })
          }
        />
      </MapContainer>
    </div>
  );
}

export default Header;
