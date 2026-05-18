import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, MapPin, Bed, Bath, Square, Car, Check, Share2, Phone } from 'lucide-react';

const fmt = (p, cur) => cur === 'USD' ? `USD ${p.toLocaleString('es-AR')}` : `$ ${p.toLocaleString('es-AR')}`;

export default function PropertyDetail({ prop, isFav, onFav, setPage }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(`Hola, me interesa la propiedad "${prop.title}". ¿Podrían darme más información?`);
  const [sent, setSent] = useState(false);

  const prev = () => setImgIdx(i => (i - 1 + prop.imgs.length) % prop.imgs.length);
  const next = () => setImgIdx(i => (i + 1) % prop.imgs.length);

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${prop.lng-0.01}%2C${prop.lat-0.01}%2C${prop.lng+0.01}%2C${prop.lat+0.01}&layer=mapnik&marker=${prop.lat}%2C${prop.lng}`;
  const waMsg = encodeURIComponent(`Hola, vi la propiedad "${prop.title}" en GOWS Propiedades y me gustaría obtener más información.`);

  return (
    <div className="detail-page">
      {/* GALLERY */}
      <div className="detail-gallery">
        <img src={prop.imgs[imgIdx]} alt={prop.title} />
        {prop.imgs.length > 1 && <>
          <button className="gallery-nav gallery-prev" onClick={prev}><ChevronLeft size={20} /></button>
          <button className="gallery-nav gallery-next" onClick={next}><ChevronRight size={20} /></button>
          <div className="gallery-counter">{imgIdx + 1} / {prop.imgs.length}</div>
          <div className="gallery-dots">
            {prop.imgs.map((_, i) => (
              <button key={i} className={`gallery-dot ${i === imgIdx ? 'active' : ''}`} onClick={() => setImgIdx(i)} />
            ))}
          </div>
        </>}
      </div>

      {/* CONTENT */}
      <div className="detail-content">
        <div className="detail-main">
          <button className="btn-back" onClick={() => setPage('properties')}>
            <ChevronLeft size={16} /> Volver a resultados
          </button>

          <div className="detail-header">
            <span className={`detail-op-badge badge-${prop.op}`}>{prop.op}</span>
            <div className="detail-price">
              {fmt(prop.price, prop.currency)}
              {prop.op === 'alquiler' && <span style={{fontSize:'1rem',fontWeight:500,color:'var(--text-sec)'}}> /mes</span>}
            </div>
            <div className="detail-title">{prop.title}</div>
            <div className="detail-location"><MapPin size={16} />{prop.address}</div>
          </div>

          {/* FEATURES */}
          <div className="detail-features">
            {prop.rooms > 0 && <div className="detail-feat">
              <div className="detail-feat-icon"><Bed size={22} /></div>
              <strong>{prop.rooms}</strong><span>Ambientes</span>
            </div>}
            <div className="detail-feat">
              <div className="detail-feat-icon"><Bath size={22} /></div>
              <strong>{prop.baths}</strong><span>Baños</span>
            </div>
            <div className="detail-feat">
              <div className="detail-feat-icon"><Square size={22} /></div>
              <strong>{prop.area} m²</strong><span>Superficie</span>
            </div>
            {prop.parking > 0 && <div className="detail-feat">
              <div className="detail-feat-icon"><Car size={22} /></div>
              <strong>{prop.parking}</strong><span>Cochera{prop.parking > 1 ? 's' : ''}</span>
            </div>}
          </div>

          {/* DESCRIPTION */}
          <div className="detail-section">
            <h3>Descripción</h3>
            <p>{prop.desc}</p>
            <div style={{display:'flex',gap:'16px',marginTop:'16px',flexWrap:'wrap'}}>
              {[
                {label:'Tipo', val: prop.type},
                {label:'Antigüedad', val: prop.age === 0 ? 'A estrenar' : `${prop.age} años`},
                {label:'Piso', val: prop.floor},
                {label:'Zona', val: prop.zone},
              ].map(d => (
                <div key={d.label} style={{background:'var(--bg)',padding:'12px 16px',borderRadius:'8px',minWidth:'120px'}}>
                  <div style={{fontSize:'11px',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:'4px'}}>{d.label}</div>
                  <div style={{fontSize:'14px',fontWeight:600,color:'var(--text)',textTransform:'capitalize'}}>{d.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AMENITIES */}
          <div className="detail-section">
            <h3>Amenities y características</h3>
            <div className="detail-amenities">
              {prop.amenities.map(a => (
                <div key={a} className="amenity-item">
                  <Check size={16} color="var(--accent)" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div className="detail-section">
            <h3>Ubicación</h3>
            <p style={{marginBottom:'14px'}}>{prop.address}</p>
            <div className="detail-map">
              <iframe src={mapSrc} title="Mapa de ubicación" loading="lazy" />
            </div>
          </div>
        </div>

        {/* CONTACT CARD */}
        <div>
          <div className="contact-card">
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
              <div>
                <div style={{fontSize:'1.4rem',fontWeight:800,color:'var(--primary)'}}>{fmt(prop.price, prop.currency)}</div>
                {prop.op === 'alquiler' && <div style={{fontSize:'12px',color:'var(--text-muted)'}}>por mes</div>}
              </div>
              <div style={{display:'flex',gap:'8px'}}>
                <button onClick={() => onFav(prop.id)} style={{padding:'8px',border:`1px solid ${isFav?'#ef4444':'var(--border)'}`,borderRadius:'8px',background:'none',cursor:'pointer',color:isFav?'#ef4444':'var(--text-sec)',display:'flex',alignItems:'center'}}>
                  <Heart size={18} fill={isFav?'#ef4444':'none'} stroke={isFav?'#ef4444':'currentColor'} />
                </button>
                <button style={{padding:'8px',border:'1px solid var(--border)',borderRadius:'8px',background:'none',cursor:'pointer',color:'var(--text-sec)',display:'flex',alignItems:'center'}}>
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <div className="agent-header">
              <div className="agent-avatar">{prop.agent.split(' ').map(n=>n[0]).join('')}</div>
              <div>
                <div className="agent-name">{prop.agent}</div>
                <div className="agent-role">Asesor GOWS</div>
                <div style={{display:'flex',alignItems:'center',gap:'4px',marginTop:'4px',fontSize:'12px',color:'var(--accent)',fontWeight:600}}>
                  {'★★★★★'} <span style={{color:'var(--text-muted)',fontWeight:400}}>4.9</span>
                </div>
              </div>
            </div>

            {sent ? (
              <div style={{textAlign:'center',padding:'20px',color:'var(--accent)',fontWeight:600}}>
                <Check size={32} style={{margin:'0 auto 8px',display:'block'}} />
                ¡Consulta enviada! Te contactamos pronto.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSend}>
                <input placeholder="Tu nombre" value={name} onChange={e=>setName(e.target.value)} required />
                <input type="email" placeholder="Tu email" value={email} onChange={e=>setEmail(e.target.value)} required />
                <textarea placeholder="Tu mensaje..." value={msg} onChange={e=>setMsg(e.target.value)} rows={3} />
                <button type="submit" className="btn-contact">Enviar consulta</button>
                <a href={`https://wa.me/5491128831895?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn-whatsapp" style={{textDecoration:'none',display:'flex'}}>
                  <Phone size={16} /> WhatsApp
                </a>
              </form>
            )}

            <div style={{marginTop:'16px',padding:'12px',background:'var(--bg)',borderRadius:'8px',fontSize:'12px',color:'var(--text-muted)',textAlign:'center'}}>
              🔒 Tus datos están protegidos. No compartimos tu información.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
