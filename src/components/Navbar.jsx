import { Home, Heart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ page, setPage, favCount }) {
  const [open, setOpen] = useState(false);
  const nav = (p) => { setPage(p); setOpen(false); };
  return (
    <nav className="navbar">
      <a className="nav-logo" onClick={() => nav('home')} style={{cursor:'pointer'}}>
        <div className="nav-logo-icon">G</div>
        <span className="nav-logo-text"><span>GOWS</span> Propiedades</span>
      </a>

      <div className={`nav-links ${open ? 'mobile-open' : ''}`} style={open ? {display:'flex',flexDirection:'column',position:'fixed',top:'var(--nav-h)',left:0,right:0,background:'white',padding:'16px',borderBottom:'1px solid var(--border)',gap:'4px',zIndex:99} : {}}>
        {['home','properties','favorites'].map(p => (
          <button key={p} className={`nav-link ${page===p?'active':''}`} onClick={() => nav(p)}>
            {p==='home'?'Inicio':p==='properties'?'Propiedades':'Favoritos'}
          </button>
        ))}
        <button className="nav-btn" onClick={() => { nav('properties'); }}>
          <Search size={14} style={{marginRight:6}} />Buscar
        </button>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
        <button className="nav-fav-btn" onClick={() => nav('favorites')} title="Mis favoritos">
          <Heart size={18} />
          {favCount > 0 && <span className="fav-count">{favCount}</span>}
        </button>
        <button className="nav-mobile-toggle" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
