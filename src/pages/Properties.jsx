import { useState, useMemo } from 'react';
import { Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

const PRICE_MAX = { USD: 800000, ARS: 600000 };

export default function PropertiesPage({ setPage, setSelected, isFav, onFav }) {
  const [op, setOp] = useState('');
  const [types, setTypes] = useState([]);
  const [zones, setZones] = useState([]);
  const [rooms, setRooms] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState('featured');
  const [listView, setListView] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setCurrentPage] = useState(1);
  const PER_PAGE = 9;

  const toggleArr = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  const filtered = useMemo(() => {
    let r = [...properties];
    if (op) r = r.filter(p => p.op === op);
    if (types.length) r = r.filter(p => types.includes(p.type));
    if (zones.length) r = r.filter(p => zones.includes(p.zone));
    if (rooms) r = r.filter(p => rooms === '4+' ? p.rooms >= 4 : p.rooms === parseInt(rooms));
    if (sort === 'price-asc') r.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') r.sort((a, b) => b.price - a.price);
    else if (sort === 'area') r.sort((a, b) => b.area - a.area);
    else r.sort((a, b) => b.featured - a.featured);
    return r;
  }, [op, types, zones, rooms, sort]);

  const allZones = [...new Set(properties.map(p => p.zone))];
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const clearFilters = () => { setOp(''); setTypes([]); setZones([]); setRooms(''); setMaxPrice(100); setCurrentPage(1); };

  return (
    <div className="page-layout">
      {/* FILTER SIDEBAR */}
      <aside className="filter-sidebar">
        <div className="filter-panel">
          <div className="filter-title">
            Filtros
            <button className="filter-clear" onClick={clearFilters}>Limpiar</button>
          </div>

          <div className="filter-section">
            <div className="filter-label">Operación</div>
            <div className="filter-chips">
              {['venta','alquiler'].map(o => (
                <span key={o} className={`filter-chip ${op===o?'active':''}`}
                  onClick={() => { setOp(op===o?'':o); setCurrentPage(1); }}
                  style={{textTransform:'capitalize'}}>{o}</span>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-label">Tipo de propiedad</div>
            <div className="filter-options">
              {['departamento','casa','ph','local'].map(t => (
                <label key={t} className="filter-option">
                  <input type="checkbox" checked={types.includes(t)}
                    onChange={() => { toggleArr(types, setTypes, t); setCurrentPage(1); }} />
                  <span style={{textTransform:'capitalize'}}>{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-label">Ambientes</div>
            <div className="filter-chips">
              {['1','2','3','4+'].map(r => (
                <span key={r} className={`filter-chip ${rooms===r?'active':''}`}
                  onClick={() => { setRooms(rooms===r?'':r); setCurrentPage(1); }}>
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-label">Zona</div>
            <div className="filter-options" style={{maxHeight:'180px',overflowY:'auto'}}>
              {allZones.map(z => (
                <label key={z} className="filter-option">
                  <input type="checkbox" checked={zones.includes(z)}
                    onChange={() => { toggleArr(zones, setZones, z); setCurrentPage(1); }} />
                  {z}
                </label>
              ))}
            </div>
          </div>

          <button className="filter-apply" onClick={() => setCurrentPage(1)}>
            Aplicar filtros
          </button>
        </div>
      </aside>

      {/* RESULTS */}
      <div className="results-area">
        <div className="results-toolbar">
          <span className="results-count">
            <strong>{filtered.length}</strong> propiedades encontradas
          </span>
          <div className="toolbar-right">
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="featured">Destacados primero</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="area">Mayor superficie</option>
            </select>
            <button className={`view-btn ${!listView?'active':''}`} onClick={() => setListView(false)} title="Vista grilla">
              <Grid size={16} />
            </button>
            <button className={`view-btn ${listView?'active':''}`} onClick={() => setListView(true)} title="Vista lista">
              <List size={16} />
            </button>
          </div>
        </div>

        {paginated.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><SlidersHorizontal size={32} /></div>
            <div className="empty-title">Sin resultados</div>
            <div className="empty-sub">Probá ajustando los filtros de búsqueda</div>
            <button className="filter-apply" style={{width:'auto',padding:'10px 24px'}} onClick={clearFilters}>Limpiar filtros</button>
          </div>
        ) : (
          <div className={listView ? 'props-list' : 'props-grid'}>
            {paginated.map(p => (
              <PropertyCard key={p.id} prop={p} isFav={isFav(p.id)} onFav={onFav} listView={listView}
                onClick={() => { setSelected(p); setPage('detail'); }} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={page===1}>‹</button>
            {Array.from({length: totalPages}, (_, i) => i+1).map(n => (
              <button key={n} className={`page-btn ${page===n?'active':''}`} onClick={() => setCurrentPage(n)}>{n}</button>
            ))}
            <button className="page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}>›</button>
          </div>
        )}
      </div>
    </div>
  );
}
