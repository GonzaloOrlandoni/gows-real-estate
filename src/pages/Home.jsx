import { useState } from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  Shield,
  Clock,
  Home,
  Building,
  Star,
  ArrowRight,
} from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

export default function HomePage({ setPage, setSelected, isFav, onFav }) {
  const [op, setOp] = useState("");
  const [type, setType] = useState("");
  const [zone, setZone] = useState("");

  const handleSearch = () => setPage("properties");
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  const zones = [...new Set(properties.map((p) => p.zone))];

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Star size={13} /> Portal Inmobiliario #1 en Buenos Aires
          </div>
          <h1>
            Encontrá tu <span>próxima propiedad</span> en Buenos Aires
          </h1>
          <p className="hero-sub">
            Más de 15.000 propiedades en venta y alquiler en CABA y GBA. Tu
            hogar ideal está a un clic.
          </p>

          {/* SEARCH */}
          <div className="search-box">
            <select
              className="search-select"
              value={op}
              onChange={(e) => setOp(e.target.value)}
            >
              <option value="">Operación</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>
            <select
              className="search-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Tipo</option>
              <option value="departamento">Departamento</option>
              <option value="casa">Casa</option>
              <option value="ph">PH</option>
              <option value="local">Local</option>
            </select>
            <div className="search-input-wrap">
              <MapPin size={15} color="var(--text-muted)" />
              <input
                placeholder="Barrio, zona o dirección..."
                value={zone}
                onChange={(e) => setZone(e.target.value)}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              <Search size={16} /> Buscar
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>15.000+</strong>
              <span>Propiedades</span>
            </div>
            <div className="hero-stat">
              <strong>8.500+</strong>
              <span>Clientes felices</span>
            </div>
            <div className="hero-stat">
              <strong>25+</strong>
              <span>Años de experiencia</span>
            </div>
            <div className="hero-stat">
              <strong>4.9★</strong>
              <span>Calificación</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Propiedades <span>Destacadas</span>
            </h2>
            <p className="section-sub">
              Selección especial de nuestros asesores
            </p>
          </div>
          <button
            className="section-link"
            onClick={() => setPage("properties")}
          >
            Ver todas <ArrowRight size={14} />
          </button>
        </div>
        <div className="props-grid">
          {featured.map((p) => (
            <PropertyCard
              key={p.id}
              prop={p}
              isFav={isFav(p.id)}
              onFav={onFav}
              onClick={() => {
                setSelected(p);
                setPage("detail");
              }}
            />
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ background: "white", padding: "0" }}>
        <div className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                ¿Por qué elegir <span>GOWS</span>?
              </h2>
              <p className="section-sub">
                La plataforma inmobiliaria más completa de Buenos Aires
              </p>
            </div>
          </div>
          <div className="features-grid">
            {[
              {
                icon: <Shield size={24} color="#1B3A5C" />,
                bg: "#eef3f9",
                title: "Transacciones Seguras",
                desc: "Respaldo legal en cada operación. Escribanos propios y documentación completa.",
              },
              {
                icon: <Search size={24} color="#E8941A" />,
                bg: "#fef3e2",
                title: "Búsqueda Inteligente",
                desc: "Filtros avanzados y mapa interactivo para encontrar exactamente lo que buscás.",
              },
              {
                icon: <Clock size={24} color="#059669" />,
                bg: "#ecfdf5",
                title: "Respuesta Rápida",
                desc: "Nuestros asesores te contactan en menos de 2 horas. Atención 7 días a la semana.",
              },
              {
                icon: <TrendingUp size={24} color="#7c3aed" />,
                bg: "#f5f3ff",
                title: "Mejores Precios",
                desc: "Acceso a propiedades off-market y oportunidades de inversión exclusivas.",
              },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon" style={{ background: f.bg }}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ZONES */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Buscá por <span>Zona</span>
            </h2>
            <p className="section-sub">
              Las zonas más buscadas de Buenos Aires
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setPage("properties")}
              style={{
                padding: "10px 20px",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "99px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
                color: "var(--text-sec)",
                transition: "all .2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-sec)";
              }}
            >
              <MapPin size={13} /> {z}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="cta-section">
        <h2>¿Querés vender o alquilar tu propiedad?</h2>
        <p>
          Tasación gratuita en 24hs. Más de 25 años ayudando a propietarios a
          obtener el mejor precio.
        </p>
        <div className="cta-btns">
          <button className="btn-cta-primary">Tasar mi propiedad</button>
          <button className="btn-cta-outline">Hablar con un asesor</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "var(--accent)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  color: "white",
                }}
              >
                G
              </div>
              <span
                style={{ color: "white", fontWeight: "700", fontSize: "16px" }}
              >
                GOWS Propiedades
              </span>
            </div>
            <p>
              La plataforma inmobiliaria más completa de Buenos Aires. Más de 25
              años conectando personas con propiedades.
            </p>
          </div>
          <div className="footer-col">
            <h4>Propiedades</h4>
            <a>Departamentos en venta</a>
            <a>Casas en venta</a>
            <a>PHs</a>
            <a>Alquileres</a>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <a>Quiénes somos</a>
            <a>Nuestros asesores</a>
            <a>Tasación gratuita</a>
            <a>Blog inmobiliario</a>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <a>gowebsolutions4@gmail.com</a>
            <a>+54 11 2883-1895</a>
            <a>CABA, Argentina</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 GOWS Propiedades. Todos los derechos reservados. Desarrollado
          por <span style={{ color: "var(--accent)" }}>GO Web Solutions</span>
        </div>
      </footer>
    </div>
  );
}
