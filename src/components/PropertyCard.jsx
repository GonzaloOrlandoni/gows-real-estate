import { Heart, MapPin, Bed, Bath, Square, Car } from 'lucide-react';

const fmt = (p, cur) => cur === 'USD'
  ? `USD ${p.toLocaleString('es-AR')}`
  : `$ ${p.toLocaleString('es-AR')}`;

export default function PropertyCard({ prop, isFav, onFav, onClick, listView }) {
  const cls = listView ? 'prop-card-list' : 'prop-card';
  return (
    <div className={cls} onClick={onClick}>
      <div className="prop-img-wrap">
        <img src={prop.imgs[0]} alt={prop.title} loading="lazy" />
        <span className={`prop-badge badge-${prop.op}`}>{prop.op}</span>
        <button className={`prop-fav ${isFav ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); onFav(prop.id); }}>
          <Heart size={16} fill={isFav ? '#ef4444' : 'none'} stroke={isFav ? '#ef4444' : 'currentColor'} />
        </button>
        <span className="prop-tag">{prop.type}</span>
      </div>
      <div className="prop-body">
        <div className="prop-price">
          {fmt(prop.price, prop.currency)}
          {prop.op === 'alquiler' && <span className="prop-price-period"> /mes</span>}
        </div>
        <div className="prop-title">{prop.title}</div>
        <div className="prop-location"><MapPin size={13} />{prop.zone}</div>
        <div className="prop-features">
          {prop.rooms > 0 && <span className="prop-feat"><Bed size={13} />{prop.rooms} amb.</span>}
          <span className="prop-feat"><Bath size={13} />{prop.baths} baño{prop.baths > 1 ? 's' : ''}</span>
          <span className="prop-feat"><Square size={13} />{prop.area} m²</span>
          {prop.parking > 0 && <span className="prop-feat"><Car size={13} />{prop.parking} coch.</span>}
        </div>
      </div>
    </div>
  );
}
