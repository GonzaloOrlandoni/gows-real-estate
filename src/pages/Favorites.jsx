import { Heart, ArrowRight } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

export default function FavoritesPage({ favs, onFav, isFav, setPage, setSelected }) {
  const favProps = properties.filter(p => favs.includes(p.id));
  return (
    <div className="favs-page">
      <div style={{marginBottom:'32px'}}>
        <h1 style={{fontSize:'clamp(1.6rem,3vw,2.2rem)',fontWeight:800,color:'var(--text)'}}>
          Mis Favoritos <span style={{color:'var(--accent)'}}>({favProps.length})</span>
        </h1>
        <p style={{color:'var(--text-sec)',marginTop:'6px'}}>Las propiedades que guardaste para revisar después</p>
      </div>

      {favProps.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><Heart size={36} /></div>
          <div className="empty-title">Todavía no tenés favoritos</div>
          <div className="empty-sub">Hacé clic en el corazón de cualquier propiedad para guardarla acá</div>
          <button className="btn-contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'12px 28px',width:'auto'}}
            onClick={() => setPage('properties')}>
            Explorar propiedades <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="props-grid">
          {favProps.map(p => (
            <PropertyCard key={p.id} prop={p} isFav={isFav(p.id)} onFav={onFav}
              onClick={() => { setSelected(p); setPage('detail'); }} />
          ))}
        </div>
      )}
    </div>
  );
}
