import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Helper component for SVG icons
// FIX: Added ...props to accept and spread additional attributes to the svg element.
const Icon = ({ path, className = '', ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d={path} />
    </svg>
);

// Data for the app
const servicesData = [
    { name: 'Cejas', description: 'Diseño, laminado, y más para unas cejas perfectas.', price: '$500', duration: '60 min', items: ['Diseño de Cejas', 'Laminado de Cejas', 'Tinte de Cejas'] },
    { name: 'Pestañas', description: 'Lifting, extensiones y todo para una mirada de impacto.', price: '$800', duration: '90 min', items: ['Lash Lift', 'Extensiones Clásicas', 'Extensiones Híbridas'] },
    { name: 'Packs & Promos', description: 'Combina tus servicios favoritos y ahorra.', price: 'Desde $1200', duration: '120 min', items: ['Lash Lift + Laminado', 'Pack Mirada Perfecta'] },
];

const pricesData = [
    { service: 'Diseño de Cejas', duration: '45 min', price: '$450 MXN' },
    { service: 'Laminado de Cejas', duration: '60 min', price: '$700 MXN' },
    { service: 'Lash Lifting', duration: '75 min', price: '$850 MXN' },
    { service: 'Extensiones de Pestañas Clásicas', duration: '120 min', price: '$1,200 MXN' },
    { service: 'Retoque Extensiones Clásicas', duration: '60 min', price: '$600 MXN' },
];

const galleryImages = [
    "https://images.unsplash.com/photo-1599334543470-490a6b64e0a4?q=80&w=800",
    "https://images.unsplash.com/photo-1616474249339-99464b7b251a?q=80&w=800",
    "https://images.unsplash.com/photo-1522337691883-c218aa163e77?q=80&w=800",
    "https://images.unsplash.com/photo-1616474249321-81532c2560d2?q=80&w=800",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800",
    "https://images.unsplash.com/photo-1605304924796-7c9c3e1e6f42?q=80&w=800",
];

const faqData = [
    { q: '¿Cómo debo prepararme para mi cita?', a: 'Ven con la cara limpia, sin maquillaje en la zona de ojos y cejas. Evita cafeína antes de tu cita para relajarte mejor.' },
    { q: '¿Cuánto dura el efecto del laminado/lash lift?', a: 'El efecto generalmente dura de 6 a 8 semanas, dependiendo del ciclo de crecimiento de tus vellos/pestañas naturales.' },
    { q: '¿Puedo mojar las pestañas después de extensiones?', a: 'Debes evitar el agua y el vapor en las primeras 24-48 horas. Después de eso, puedes mojarlas y es importante limpiarlas diariamente.' },
    { q: '¿Qué pasa si llego tarde?', a: 'Tenemos una tolerancia de 10 minutos. Después de este tiempo, es posible que necesitemos reagendar tu cita para no afectar a las siguientes clientas.' },
];

// Reusable components
const ServiceCard = ({ name, description, price, duration }) => (
    <div className="service-card">
        <h3>{name}</h3>
        <p>{description}</p>
        <p><strong>{duration} | {price}</strong></p>
        <a href="#booking" className="btn btn-primary" style={{marginTop: '1rem'}}>Reservar</a>
    </div>
);

const WhyUsCard = ({ icon, title, text }) => (
    <div className="service-card">
        <div style={{color: 'var(--rose-gold)', width: '50px', height: '50px', margin: '0 auto 1rem'}}>
            {icon}
        </div>
        <h3>{title}</h3>
        <p>{text}</p>
    </div>
);

const FaqItem = ({ item, index, activeIndex, setActiveIndex }) => {
    const isOpen = index === activeIndex;
    return (
        <div className="faq-item">
            <div className="faq-question" onClick={() => setActiveIndex(isOpen ? null : index)} role="button" aria-expanded={isOpen}>
                <span>{item.q}</span>
                <span className={`faq-toggle ${isOpen ? 'open' : ''}`}>
                    <Icon path="M12 4.5v15m7.5-7.5h-15" />
                </span>
            </div>
            <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                <p>{item.a}</p>
            </div>
        </div>
    );
};


// Main App Sections
const Header = () => (
    <header className="header">
        <div className="container nav">
            <a href="#home" className="nav-logo">BrowLovers</a>
            <nav>
                <ul className="nav-links">
                    <li><a href="#services" className="nav-link">Servicios</a></li>
                    <li><a href="#gallery" className="nav-link">Galería</a></li>
                    <li><a href="#booking" className="nav-link">Reserva</a></li>
                    <li><a href="#contact" className="nav-link">Contacto</a></li>
                </ul>
            </nav>
            <button className="nav-toggle" aria-label="Menu">&#9776;</button>
        </div>
    </header>
);

const Hero = () => (
    <section id="home" className="hero">
        <div className="hero-bg-shape hero-bg-shape1"></div>
        <div className="hero-bg-shape hero-bg-shape2"></div>
        <div className="container hero-content">
            <h1>Mira y siéntete impecable todos los días</h1>
            <p>Especialistas en cejas, laminado, lash lift y extensiones con resultados naturales que realzan tu belleza.</p>
            <div className="hero-buttons">
                <a href="#booking" className="btn btn-primary">Reservar ahora</a>
                <a href="#prices" className="btn btn-secondary">Ver precios</a>
            </div>
            <div className="hero-features">
                <div className="feature-item">
                    <Icon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <span>Calidad Premium</span>
                </div>
                <div className="feature-item">
                     <Icon path="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    <span>Técnicas Seguras</span>
                </div>
                <div className="feature-item">
                     <Icon path="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.002-.018.002-.006.001-.004.001-.001.001A49.954 49.954 0 0012 15.25a49.954 49.954 0 008.232-5.102l-.001-.001-.004-.001-.006-.001-.018-.002-.07-.002z" />
                    <span>Cuidado Personalizado</span>
                </div>
            </div>
        </div>
    </section>
);

const Services = () => (
    <section id="services" className="section">
        <div className="container">
            <h2 className="section-title">Nuestros Servicios</h2>
            <div className="services-grid">
                {/* FIX: Passed props explicitly to avoid passing the unused `items` property. */}
                {servicesData.map(service => <ServiceCard key={service.name} name={service.name} description={service.description} price={service.price} duration={service.duration} />)}
            </div>
        </div>
    </section>
);

const Prices = () => (
    <section id="prices" className="section">
        <div className="container">
            <h2 className="section-title">Precios</h2>
            <div className="prices-content">
                <div className="prices-table-container">
                    <table className="prices-table">
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Duración</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricesData.map(item => (
                                <tr key={item.service}>
                                    <td>{item.service}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <aside className="prices-policies">
                    <h3>Políticas del Estudio</h3>
                    <ul>
                        <li><strong>Retoques:</strong> Se realizan dentro de los primeros 7 días.</li>
                        <li><strong>Anticipos:</strong> Se requiere un anticipo no reembolsable para agendar.</li>
                        <li><strong>Tolerancia:</strong> 10 minutos de tolerancia máxima.</li>
                        <li><strong>Contraindicaciones:</strong> Favor de informar sobre alergias o condiciones médicas.</li>
                    </ul>
                </aside>
            </div>
             <div className="prices-cta">
                <a href="#booking" className="btn btn-primary">Reservar Cita</a>
            </div>
        </div>
    </section>
);

const Gallery = () => (
    <section id="gallery" className="section">
        <div className="container">
            <h2 className="section-title">Galería</h2>
            <div className="gallery-grid">
                {galleryImages.map((src, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={src} alt={`Trabajo de cejas y pestañas ${index + 1}`} loading="lazy" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const WhyUs = () => (
     <section id="why-us" className="section">
        <div className="container">
            <h2 className="section-title">Por Qué Elegirnos</h2>
            <div className="why-us-grid">
                 <WhyUsCard 
                    icon={<Icon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>}
                    title="Calidad & Seguridad"
                    text="Utilizamos solo productos de la más alta calidad y seguimos estrictos protocolos de higiene para tu seguridad."
                />
                <WhyUsCard 
                    icon={<Icon path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />}
                    title="Diseño Personalizado"
                    text="Cada servicio es 100% personalizado. Analizamos tus rasgos faciales para crear un look que te favorezca."
                />
                <WhyUsCard 
                    icon={<Icon path="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>}
                    title="Atención Cercana"
                    text="Nos importa tu comodidad. Disfruta de un ambiente relajante y una atención dedicada en cada visita."
                />
            </div>
        </div>
    </section>
);

const Booking = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="booking" className="section">
            <div className="container">
                <h2 className="section-title">Reserva tu Cita</h2>
                <div className="booking-options">
                    <div className="booking-option">
                        <h3>Agenda en Línea</h3>
                        <iframe 
                            className="booking-iframe"
                            src="https://calendly.com/d/cn3z-z2g-9v4/browlovers-cancun-services"
                            title="Agendador en línea de Calendly">
                        </iframe>
                    </div>
                    <div className="booking-option">
                        <h3>O Envíanos un Mensaje</h3>
                        {submitted ? (
                            <div className="form-confirmation">
                                ¡Gracias! Hemos recibido tu solicitud. Pronto te contactaremos por WhatsApp para confirmar.
                            </div>
                        ) : (
                            <form className="booking-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input type="text" id="name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="whatsapp">WhatsApp</label>
                                    <input type="tel" id="whatsapp" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="service">Servicio de Interés</label>
                                    <select id="service" required>
                                        <option value="">Selecciona un servicio</option>
                                        {pricesData.map(s => <option key={s.service} value={s.service}>{s.service}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Fecha Preferida</label>
                                    <input type="date" id="date" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Enviar Solicitud</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    return (
        <section id="faq" className="section">
            <div className="container">
                <h2 className="section-title">Preguntas Frecuentes</h2>
                <div className="faq-container">
                    {faqData.map((item, index) => (
                        <FaqItem
                            // FIX: Using a stable key `item.q` instead of `index`.
                            key={item.q}
                            item={item} 
                            index={index} 
                            activeIndex={activeIndex} 
                            setActiveIndex={setActiveIndex} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};


const Contact = () => (
    <section id="contact" className="section">
        <div className="container">
            <h2 className="section-title">Contacto</h2>
            <div className="contact-content">
                <div className="contact-info">
                    <h3>Visítanos</h3>
                    <p>
                        <Icon path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <Icon path="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        <span>Av. del Sol, SM 44, Cancún, Q.R.</span>
                    </p>
                    <p>
                        <Icon path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <span>Lunes a Sábado: 10:00 - 19:00</span>
                    </p>
                    <p>
                        <Icon path="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                        <span>+52 998 123 4567</span>
                    </p>
                     <div className="payment-methods">
                        <h3>Métodos de Pago</h3>
                        <p>Aceptamos tarjeta, transferencia y Mercado Pago.</p>
                    </div>
                </div>
                <div className="contact-map">
                    <iframe 
                        className="map-iframe"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.492837332766!2d-86.8488036855938!3d21.132549285942173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2c0e8f3b2f5b%3A0x6b446ff252b48873!2sAv.%20del%20Sol%2C%20Canc%C3%BAn%2C%20Q.R.!5e0!3m2!1sen!2smx!4v1678886400000" 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de BrowLovers Cancún">
                    </iframe>
                </div>
            </div>
        </div>
    </section>
);


const Footer = () => (
    <footer className="footer">
        <div className="container">
            <p>&copy; {new Date().getFullYear()} BrowLovers Cancún. Todos los derechos reservados.</p>
            <div className="footer-links">
                <a href="#" className="footer-link">Términos y Condiciones</a>
                <a href="#" className="footer-link">Aviso de Privacidad</a>
                <a href="#contact" className="footer-link">Contacto</a>
            </div>
        </div>
    </footer>
);

const FloatingButtons = () => (
    <div className="floating-buttons">
         <a href="#booking" className="floating-btn" aria-label="Reservar cita">
            <Icon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" />
        </a>
        <a href="https://wa.me/529981234567" target="_blank" rel="noopener noreferrer" className="floating-btn whatsapp" aria-label="Contactar por WhatsApp">
            <Icon path="M1.5 8.67v8.58a3 3 0 003 3h8.58a3 3 0 003-3V1.5a3 3 0 00-3-3h-1.17a3 3 0 00-2.512 1.257l-4.716 5.499a3 3 0 00-.284 1.415z" className="w-6 h-6" transform="rotate(270 12 12)"/>
            <Icon path="M12 18.75a.75.75 0 00.75-.75v-3.5a.75.75 0 00-1.5 0v3.5a.75.75 0 00.75.75zM12 12.75a.75.75 0 00.75-.75v-.008a.75.75 0 00-1.5 0v.008a.75.75 0 00.75.75z" className="w-6 h-6"/>
        </a>
    </div>
);


const App = () => (
    <>
        <Header />
        <main>
            <Hero />
            <Services />
            <Prices />
            <Gallery />
            <WhyUs />
            <Booking />
            <FAQ />
            <Contact />
        </main>
        <Footer />
        <FloatingButtons />
    </>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);