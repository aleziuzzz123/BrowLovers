import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Helper component for SVG icons
// FIX: Added ...props to accept and spread additional attributes to the svg element.
const Icon = ({ path, className = '', ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d={path} />
    </svg>
);

// Enhanced data for e-commerce
const servicesData = [
    { 
        id: 'eyebrows', 
        name: 'Cejas', 
        description: 'Diseño, laminado, y más para unas cejas perfectas.', 
        price: 'Desde $450', 
        duration: '45-60 min', 
        category: 'eyebrows',
        items: ['Diseño de Cejas', 'Laminado de Cejas', 'Tinte de Cejas'],
        image: 'https://images.unsplash.com/photo-1599334543470-490a6b64e0a4?q=80&w=800',
        popular: true
    },
    { 
        id: 'lashes', 
        name: 'Pestañas', 
        description: 'Lifting, extensiones y todo para una mirada de impacto.', 
        price: 'Desde $600', 
        duration: '60-120 min', 
        category: 'lashes',
        items: ['Lash Lift', 'Extensiones Clásicas', 'Extensiones Híbridas'],
        image: 'https://images.unsplash.com/photo-1616474249339-99464b7b251a?q=80&w=800',
        popular: true
    },
    { 
        id: 'packages', 
        name: 'Packs & Promos', 
        description: 'Combina tus servicios favoritos y ahorra hasta un 20%.', 
        price: 'Desde $1200', 
        duration: '120-180 min', 
        category: 'packages',
        items: ['Lash Lift + Laminado', 'Pack Mirada Perfecta', 'Pack Completo'],
        image: 'https://images.unsplash.com/photo-1522337691883-c218aa163e77?q=80&w=800',
        popular: false,
        discount: '20% OFF'
    },
];

const detailedServices = [
    {
        id: 'eyebrow-design',
        name: 'Diseño de Cejas',
        category: 'eyebrows',
        price: 450,
        duration: 45,
        description: 'Análisis facial personalizado y diseño de cejas que realza tus rasgos naturales. Nuestras especialistas analizan la forma de tu rostro, el color de tu piel y cabello para crear el diseño perfecto que te favorezca.',
        detailedDescription: 'El diseño de cejas es un arte que requiere precisión y conocimiento de las proporciones faciales. Nuestras especialistas certificadas utilizan técnicas avanzadas para analizar tu estructura facial y crear un diseño que equilibre y realce tus rasgos naturales. Cada diseño es único y personalizado según tus necesidades y preferencias.',
        includes: [
            'Análisis facial completo',
            'Diseño personalizado según tu rostro',
            'Depilación con cera de alta calidad',
            'Tinte opcional (incluido)',
            'Aplicación de gel fijador',
            'Instrucciones de mantenimiento'
        ],
        preparation: [
            'Ven con la cara completamente limpia',
            'Evita usar cremas hidratantes 24h antes',
            'No uses retinol o ácidos 3 días antes',
            'Trae una foto de referencia si tienes un estilo preferido',
            'Evita la cafeína antes de tu cita para mayor relajación'
        ],
        aftercare: [
            'No mojes la zona por 24 horas',
            'Aplica crema hidratante suave después de 24h',
            'Evita el sol directo por 48 horas',
            'No uses productos con ácidos por una semana',
            'Cepilla las cejas hacia arriba diariamente'
        ],
        benefits: [
            'Realza la forma natural de tus ojos',
            'Equilibra las proporciones faciales',
            'Reduce la necesidad de maquillaje diario',
            'Duración de 4-6 semanas',
            'Resultado natural y profesional'
        ],
        contraindications: [
            'Alergias a la cera o tintes',
            'Heridas abiertas en la zona',
            'Tratamientos con ácidos recientes',
            'Embarazo (consultar con especialista)'
        ],
        image: 'https://images.unsplash.com/photo-1599334543470-490a6b64e0a4?q=80&w=800',
        beforeAfterImages: [
            'https://images.unsplash.com/photo-1599334543470-490a6b64e0a4?q=80&w=400',
            'https://images.unsplash.com/photo-1616474249321-81532c2560d2?q=80&w=400'
        ]
    },
    {
        id: 'eyebrow-lamination',
        name: 'Laminado de Cejas',
        category: 'eyebrows',
        price: 700,
        duration: 60,
        description: 'Técnica revolucionaria que alisa y fija los vellos para un look perfecto, definido y duradero. Ideal para cejas rebeldes o que necesitan más definición.',
        detailedDescription: 'El laminado de cejas es la técnica más innovadora en el cuidado de cejas. Utilizamos productos de la más alta calidad para alisar, fijar y dar forma a tus vellos, creando un look perfecto que dura hasta 8 semanas. Esta técnica es perfecta para cejas rebeldes, desordenadas o que necesitan más definición.',
        includes: [
            'Limpieza profunda de la zona',
            'Aplicación de solución alisadora',
            'Fijación con peróxido de hidrógeno',
            'Tinte profesional (incluido)',
            'Hidratación con aceite nutritivo',
            'Aplicación de gel fijador',
            'Kit de mantenimiento para casa'
        ],
        preparation: [
            'Cara completamente limpia y sin maquillaje',
            'Sin maquillaje en la zona 24h antes',
            'No usar retinol o ácidos 1 semana antes',
            'Evita tratamientos faciales 48h antes',
            'No uses cremas con ácidos 3 días antes'
        ],
        aftercare: [
            'No mojar la zona por 24 horas',
            'Cepillar las cejas hacia arriba diariamente',
            'Aplicar aceite de ricino cada noche',
            'Evitar productos con ácidos por 2 semanas',
            'No dormir boca abajo la primera semana'
        ],
        benefits: [
            'Look perfecto y definido por 6-8 semanas',
            'Ideal para cejas rebeldes o desordenadas',
            'Reduce el tiempo de maquillaje diario',
            'Resultado natural y elegante',
            'Fácil mantenimiento en casa'
        ],
        contraindications: [
            'Alergias a productos químicos',
            'Heridas o irritaciones en la zona',
            'Tratamientos con ácidos recientes',
            'Embarazo (consultar con especialista)',
            'Piel muy sensible o reactiva'
        ],
        image: 'https://images.unsplash.com/photo-1616474249321-81532c2560d2?q=80&w=800',
        beforeAfterImages: [
            'https://images.unsplash.com/photo-1616474249321-81532c2560d2?q=80&w=400',
            'https://images.unsplash.com/photo-1599334543470-490a6b64e0a4?q=80&w=400'
        ],
        popular: true
    },
    {
        id: 'lash-lift',
        name: 'Lash Lifting',
        category: 'lashes',
        price: 850,
        duration: 75,
        description: 'Curvatura natural de tus pestañas para una mirada más abierta, expresiva y definida. Sin extensiones, solo realzando tu belleza natural.',
        detailedDescription: 'El Lash Lifting es la técnica perfecta para realzar la belleza natural de tus pestañas. Utilizamos productos de alta calidad para crear una curvatura permanente que hace que tus ojos se vean más abiertos y expresivos. Es ideal para pestañas rectas o que necesitan más curvatura.',
        includes: [
            'Análisis detallado de tus pestañas',
            'Aplicación de solución lifting',
            'Fijación con peróxido de hidrógeno',
            'Tinte profesional (incluido)',
            'Hidratación con aceite nutritivo',
            'Aplicación de máscara hidratante',
            'Kit de mantenimiento especializado'
        ],
        preparation: [
            'Sin maquillaje en los ojos',
            'Sin lentes de contacto',
            'Sin extensiones de pestañas previas',
            'Pestañas limpias y secas',
            'Evita rímel waterproof 24h antes'
        ],
        aftercare: [
            'No mojar los ojos por 24 horas',
            'No frotar ni tocar los ojos',
            'Usar máscara de pestañas suave después de 24h',
            'Aplicar aceite de ricino cada noche',
            'Evitar saunas o vapor por 48h'
        ],
        benefits: [
            'Mirada más abierta y expresiva',
            'Duración de 6-8 semanas',
            'Sin necesidad de extensiones',
            'Resultado natural y elegante',
            'Perfecto para pestañas rectas'
        ],
        contraindications: [
            'Alergias a productos químicos',
            'Heridas o irritaciones en los ojos',
            'Conjuntivitis o infecciones oculares',
            'Embarazo (consultar con especialista)',
            'Pestañas muy cortas o escasas'
        ],
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800',
        beforeAfterImages: [
            'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400',
            'https://images.unsplash.com/photo-1605304924796-7c9c3e1e6f42?q=80&w=400'
        ],
        popular: true
    },
    {
        id: 'classic-extensions',
        name: 'Extensiones Clásicas',
        category: 'lashes',
        price: 1200,
        duration: 120,
        description: 'Extensiones clásicas 1:1 para un look natural, elegante y sofisticado. Cada pestaña natural recibe una extensión individual.',
        detailedDescription: 'Las extensiones clásicas son perfectas para quienes buscan un look natural pero impactante. Aplicamos una extensión por cada pestaña natural, creando un efecto de pestañas más largas y voluminosas sin verse artificial. Utilizamos pestañas de seda de alta calidad y adhesivos hipoalergénicos.',
        includes: [
            'Consulta previa y análisis de pestañas',
            'Aplicación de extensiones de seda',
            'Tinte opcional (incluido)',
            'Kit de mantenimiento completo',
            'Instrucciones de cuidado detalladas',
            'Cita de seguimiento incluida'
        ],
        preparation: [
            'Sin maquillaje en los ojos',
            'Sin lentes de contacto',
            'Pestañas completamente limpias',
            'Sin extensiones previas',
            'Evita rímel waterproof 24h antes'
        ],
        aftercare: [
            'No mojar por 24 horas',
            'Cepillar diariamente con cepillo especial',
            'Evitar aceites y cremas en la zona',
            'No frotar ni tocar los ojos',
            'Retoque recomendado en 2-3 semanas'
        ],
        benefits: [
            'Look natural y elegante',
            'Pestañas más largas y definidas',
            'Duración de 3-4 semanas',
            'Fácil mantenimiento',
            'Perfecto para el día a día'
        ],
        contraindications: [
            'Alergias a adhesivos o materiales',
            'Heridas o irritaciones oculares',
            'Conjuntivitis o infecciones',
            'Embarazo (consultar con especialista)',
            'Pestañas muy cortas o escasas'
        ],
        image: 'https://images.unsplash.com/photo-1605304924796-7c9c3e1e6f42?q=80&w=800',
        beforeAfterImages: [
            'https://images.unsplash.com/photo-1605304924796-7c9c3e1e6f42?q=80&w=400',
            'https://images.unsplash.com/photo-1522337691883-c218aa163e77?q=80&w=400'
        ],
        popular: true
    },
    {
        id: 'hybrid-extensions',
        name: 'Extensiones Híbridas',
        category: 'lashes',
        price: 1500,
        duration: 150,
        description: 'Combinación perfecta de extensiones clásicas y de volumen para un look más dramático y glamuroso. Ideal para ocasiones especiales.',
        detailedDescription: 'Las extensiones híbridas combinan lo mejor de ambos mundos: la naturalidad de las clásicas con el volumen de las de volumen. Aplicamos extensiones individuales en algunas pestañas y fans (múltiples extensiones) en otras, creando un look más dramático pero aún elegante.',
        includes: [
            'Consulta previa y diseño personalizado',
            'Aplicación híbrida (clásicas + volumen)',
            'Tinte opcional (incluido)',
            'Kit de mantenimiento premium',
            'Instrucciones de cuidado especializadas',
            'Cita de seguimiento incluida'
        ],
        preparation: [
            'Sin maquillaje en los ojos',
            'Sin lentes de contacto',
            'Pestañas completamente limpias',
            'Sin extensiones previas',
            'Evita rímel waterproof 24h antes'
        ],
        aftercare: [
            'No mojar por 24 horas',
            'Cepillar diariamente con cepillo especial',
            'Evitar aceites y cremas en la zona',
            'No frotar ni tocar los ojos',
            'Retoque recomendado en 2-3 semanas'
        ],
        benefits: [
            'Look más dramático y glamuroso',
            'Mayor volumen y densidad',
            'Perfecto para ocasiones especiales',
            'Duración de 3-4 semanas',
            'Resultado impactante pero elegante'
        ],
        contraindications: [
            'Alergias a adhesivos o materiales',
            'Heridas o irritaciones oculares',
            'Conjuntivitis o infecciones',
            'Embarazo (consultar con especialista)',
            'Pestañas muy cortas o escasas'
        ],
        image: 'https://images.unsplash.com/photo-1522337691883-c218aa163e77?q=80&w=800',
        beforeAfterImages: [
            'https://images.unsplash.com/photo-1522337691883-c218aa163e77?q=80&w=400',
            'https://images.unsplash.com/photo-1605304924796-7c9c3e1e6f42?q=80&w=400'
        ]
    },
    {
        id: 'retouch-extensions',
        name: 'Retoque Extensiones',
        category: 'lashes',
        price: 600,
        duration: 60,
        description: 'Mantenimiento profesional de tus extensiones existentes para conservar el look perfecto y prolongar su duración.',
        detailedDescription: 'El retoque es esencial para mantener tus extensiones en perfecto estado. Reemplazamos las extensiones que se han caído, ajustamos la forma y aplicamos hidratación para que tus pestañas se vean siempre perfectas. Es más económico que una aplicación completa y mantiene el resultado original.',
        includes: [
            'Limpieza profunda de extensiones existentes',
            'Reemplazo de extensiones faltantes',
            'Ajuste de forma y densidad',
            'Hidratación con aceite nutritivo',
            'Aplicación de gel fijador',
            'Kit de mantenimiento actualizado'
        ],
        preparation: [
            'Extensiones limpias y secas',
            'Sin maquillaje en los ojos',
            'Sin lentes de contacto',
            'Evita rímel waterproof 24h antes',
            'No uses aceites 12h antes'
        ],
        aftercare: [
            'No mojar por 24 horas',
            'Cepillar diariamente con cepillo especial',
            'Evitar aceites y cremas en la zona',
            'No frotar ni tocar los ojos',
            'Siguiente retoque en 2-3 semanas'
        ],
        benefits: [
            'Mantiene el look original',
            'Más económico que aplicación completa',
            'Prolonga la duración de las extensiones',
            'Resultado siempre fresco',
            'Mantenimiento profesional regular'
        ],
        contraindications: [
            'Alergias a adhesivos o materiales',
            'Heridas o irritaciones oculares',
            'Conjuntivitis o infecciones',
            'Extensiones muy dañadas o en mal estado'
        ],
        image: 'https://images.unsplash.com/photo-1605304924796-7c9c3e1e6f42?q=80&w=800',
        beforeAfterImages: [
            'https://images.unsplash.com/photo-1605304924796-7c9c3e1e6f42?q=80&w=400',
            'https://images.unsplash.com/photo-1522337691883-c218aa163e77?q=80&w=400'
        ]
    }
];

const addOnServices = [
    { id: 'eyebrow-tint', name: 'Tinte de Cejas', price: 150, duration: 15, category: 'addon' },
    { id: 'lash-tint', name: 'Tinte de Pestañas', price: 200, duration: 20, category: 'addon' },
    { id: 'aftercare-kit', name: 'Kit de Cuidado', price: 300, duration: 0, category: 'product' },
    { id: 'consultation', name: 'Consulta Personalizada', price: 200, duration: 30, category: 'addon' }
];

const packages = [
    {
        id: 'perfect-look',
        name: 'Pack Mirada Perfecta',
        description: 'Lash Lift + Laminado de Cejas',
        originalPrice: 1550,
        price: 1240,
        duration: 135,
        discount: 20,
        includes: ['Lash Lifting', 'Laminado de Cejas', 'Tinte de cejas', 'Kit de cuidado'],
        image: 'https://images.unsplash.com/photo-1522337691883-c218aa163e77?q=80&w=800',
        popular: true
    },
    {
        id: 'complete-package',
        name: 'Pack Completo',
        description: 'Diseño + Laminado + Lash Lift',
        originalPrice: 2000,
        price: 1600,
        duration: 180,
        discount: 20,
        includes: ['Diseño de Cejas', 'Laminado de Cejas', 'Lash Lifting', 'Tintes incluidos', 'Kit premium'],
        image: 'https://images.unsplash.com/photo-1616474249339-99464b7b251a?q=80&w=800'
    },
    {
        id: 'maintenance-package',
        name: 'Pack Mantenimiento',
        description: 'Retoque + Tinte + Kit de Cuidado',
        originalPrice: 1100,
        price: 900,
        duration: 90,
        discount: 18,
        includes: ['Retoque Extensiones', 'Tinte de Cejas', 'Tinte de Pestañas', 'Kit de cuidado premium'],
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800'
    }
];

const pricesData = [
    { service: 'Diseño de Cejas', duration: '45 min', price: '$450 MXN' },
    { service: 'Laminado de Cejas', duration: '60 min', price: '$700 MXN' },
    { service: 'Lash Lifting', duration: '75 min', price: '$850 MXN' },
    { service: 'Extensiones de Pestañas Clásicas', duration: '120 min', price: '$1,200 MXN' },
    { service: 'Extensiones Híbridas', duration: '150 min', price: '$1,500 MXN' },
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

// E-commerce state management
const useCart = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item, addOns = []) => {
        const cartItem = {
            id: `${item.id}-${Date.now()}`,
            service: item,
            addOns: addOns,
            totalPrice: item.price + addOns.reduce((sum, addon) => sum + addon.price, 0),
            totalDuration: item.duration + addOns.reduce((sum, addon) => sum + addon.duration, 0)
        };
        setCart([...cart, cartItem]);
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return { cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, clearCart };
};

// Advanced booking system state management
const useBooking = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const generateTimeSlots = (date) => {
        const slots = [];
        const startHour = 10; // 10 AM
        const endHour = 19;   // 7 PM
        const slotDuration = 30; // 30 minutes per slot

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minutes = 0; minutes < 60; minutes += slotDuration) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                slots.push({
                    time: timeString,
                    available: Math.random() > 0.3, // Simulate availability
                    booked: false
                });
            }
        }
        return slots;
    };

    const getAvailableDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                date: date,
                formatted: date.toLocaleDateString('es-MX', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                available: true
            });
        }
        return dates;
    };

    return {
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        availableSlots,
        setAvailableSlots,
        isBookingOpen,
        setIsBookingOpen,
        generateTimeSlots,
        getAvailableDates
    };
};

// Enhanced components
const ServiceCard = ({ service, onBook }) => (
    <div className="service-card">
        {service.popular && <div className="popular-badge">Más Popular</div>}
        {service.discount && <div className="discount-badge">{service.discount}</div>}
        <div className="service-image">
            <img src={service.image} alt={service.name} />
        </div>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <p><strong>{service.duration} | {service.price}</strong></p>
        <div className="service-actions">
            <button 
                className="btn btn-primary" 
                onClick={() => onBook(service)}
                style={{marginTop: '1rem', width: '100%'}}
            >
                Ver Detalles
            </button>
        </div>
    </div>
);

const ProductModal = ({ service, isOpen, onClose, onAddToCart }) => {
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !service) return null;

    const totalPrice = (service.price + selectedAddOns.reduce((sum, addon) => sum + addon.price, 0)) * quantity;
    const totalDuration = service.duration + selectedAddOns.reduce((sum, addon) => sum + addon.duration, 0);

    const toggleAddOn = (addon) => {
        setSelectedAddOns(prev => 
            prev.find(item => item.id === addon.id) 
                ? prev.filter(item => item.id !== addon.id)
                : [...prev, addon]
        );
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="product-details">
                    <div className="product-image">
                        <img src={service.image} alt={service.name} />
                    </div>
                    
                    <div className="product-info">
                        <h2>{service.name}</h2>
                        <p className="product-description">{service.description}</p>
                        
                        <div className="price-section">
                            <span className="price">${service.price} MXN</span>
                            <span className="duration">{service.duration} min</span>
                        </div>

                        <div className="includes-section">
                            <h4>Incluye:</h4>
                            <ul>
                                {service.includes.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="addons-section">
                            <h4>Servicios Adicionales:</h4>
                            {addOnServices.filter(addon => addon.category === 'addon').map(addon => (
                                <label key={addon.id} className="addon-option">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedAddOns.find(item => item.id === addon.id)}
                                        onChange={() => toggleAddOn(addon)}
                                    />
                                    <span>{addon.name} - +${addon.price} MXN ({addon.duration} min)</span>
                                </label>
                            ))}
                        </div>

                        <div className="quantity-section">
                            <label>Cantidad:</label>
                            <div className="quantity-controls">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>

                        <div className="total-section">
                            <h3>Total: ${totalPrice} MXN</h3>
                            <p>Duración total: {totalDuration} min</p>
                        </div>

                        <div className="modal-actions">
                            <button 
                                className="btn btn-primary"
                                onClick={() => {
                                    onAddToCart(service, selectedAddOns, quantity);
                                    onClose();
                                }}
                            >
                                Agregar al Carrito
                            </button>
                            <button 
                                className="btn btn-secondary"
                                onClick={() => {
                                    // Direct booking logic here
                                    onClose();
                                }}
                            >
                                Reservar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ShoppingCart = ({ cart, isOpen, onClose, onRemoveItem, onClearCart }) => {
    const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalDuration = cart.reduce((sum, item) => sum + item.totalDuration, 0);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={e => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Tu Carrito</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                
                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p>Tu carrito está vacío</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="item-info">
                                    <h4>{item.service.name}</h4>
                                    <p>${item.service.price} MXN - {item.service.duration} min</p>
                                    {item.addOns.length > 0 && (
                                        <div className="addons">
                                            {item.addOns.map(addon => (
                                                <span key={addon.id} className="addon-tag">
                                                    +{addon.name} (${addon.price})
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="item-actions">
                                    <span className="item-total">${item.totalPrice} MXN</span>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => onRemoveItem(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <h3>Total: ${total} MXN</h3>
                            <p>Duración total: {totalDuration} min</p>
                        </div>
                        <div className="cart-actions">
                            <button className="btn btn-secondary" onClick={onClearCart}>
                                Limpiar Carrito
                            </button>
                            <button className="btn btn-primary">
                                Proceder al Pago
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const LoginModal = ({ isOpen, onClose, onSwitchToRegister, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            const success = onLogin(email, password);
            if (success) {
                setEmail('');
                setPassword('');
            }
            setIsLoading(false);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="auth-content">
                    <h2>Iniciar Sesión</h2>
                    <p>Accede a tu cuenta para gestionar tus citas</p>
                    
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="login-email">Email</label>
                            <input
                                type="email"
                                id="login-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="tu@email.com"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="login-password">Contraseña</label>
                            <input
                                type="password"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Tu contraseña"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                    
                    <div className="auth-switch">
                        <p>¿No tienes cuenta? <button onClick={onSwitchToRegister}>Regístrate aquí</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegister }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            const success = onRegister(formData.name, formData.email, formData.phone, formData.password);
            if (success) {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: ''
                });
            }
            setIsLoading(false);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                
                <div className="auth-content">
                    <h2>Crear Cuenta</h2>
                    <p>Únete a BrowLovers y obtén 100 puntos de bienvenida</p>
                    
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="register-name">Nombre Completo</label>
                            <input
                                type="text"
                                id="register-name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Tu nombre completo"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="register-email">Email</label>
                            <input
                                type="email"
                                id="register-email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="tu@email.com"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="register-phone">Teléfono</label>
                            <input
                                type="tel"
                                id="register-phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="+52 998 123 4567"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="register-password">Contraseña</label>
                            <input
                                type="password"
                                id="register-password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="register-confirm">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="register-confirm"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Repite tu contraseña"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </button>
                    </form>
                    
                    <div className="auth-switch">
                        <p>¿Ya tienes cuenta? <button onClick={onSwitchToLogin}>Inicia sesión aquí</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
const Header = ({ cartCount, onCartClick }) => (
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
            <div className="nav-actions">
                <button 
                    className="cart-button" 
                    onClick={onCartClick}
                    aria-label="Ver carrito"
                >
                    <Icon path="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </button>
            <button className="nav-toggle" aria-label="Menu">&#9776;</button>
            </div>
        </div>
    </header>
);

const Hero = () => (
    <section id="home" className="hero">
        <div className="hero-bg-shape hero-bg-shape1"></div>
        <div className="hero-bg-shape hero-bg-shape2"></div>
        <div className="hero-video-overlay"></div>
        <div className="container hero-content">
            <div className="hero-text">
                <h1>Mira y siéntete impecable todos los días</h1>
                <p>Especialistas en cejas, laminado, lash lift y extensiones con resultados naturales que realzan tu belleza.</p>
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Clientas Felices</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">3+</span>
                        <span className="stat-label">Años de Experiencia</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">100%</span>
                        <span className="stat-label">Satisfacción</span>
                    </div>
                </div>
                <div className="hero-buttons">
                    <a href="#booking" className="btn btn-primary">Reservar ahora</a>
                    <a href="#services" className="btn btn-secondary">Ver servicios</a>
                    <button className="btn btn-video" onClick={() => document.getElementById('hero-video').play()}>
                        <Icon path="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        Ver Video
                    </button>
                </div>
            </div>
            <div className="hero-video">
                <video id="hero-video" className="hero-video-player" muted loop>
                    <source src="/images/videos/hero-video.mp4" type="video/mp4" />
                    <source src="/images/videos/hero-video.webm" type="video/webm" />
                    Tu navegador no soporta videos.
                </video>
                <div className="video-placeholder">
                    <div className="placeholder-content">
                        <Icon path="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        <p>Video de nuestros servicios</p>
                    </div>
                </div>
            </div>
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
    </section>
);

const Services = ({ onServiceClick }) => (
    <section id="services" className="section">
        <div className="container">
            <h2 className="section-title">Nuestros Servicios</h2>
            <div className="services-grid">
                {servicesData.map(service => (
                    <ServiceCard 
                        key={service.id} 
                        service={service} 
                        onBook={onServiceClick}
                    />
                ))}
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


// New sections for enhanced homepage
const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "María González",
            service: "Laminado de Cejas",
            rating: 5,
            text: "Increíble experiencia! Mis cejas se ven perfectas y el servicio es de primera calidad. Definitivamente regresaré.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150"
        },
        {
            id: 2,
            name: "Ana Rodríguez",
            service: "Extensiones Clásicas",
            rating: 5,
            text: "Las extensiones quedaron hermosas y naturales. El personal es muy profesional y el lugar súper limpio.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150"
        },
        {
            id: 3,
            name: "Laura Martínez",
            service: "Lash Lift",
            rating: 5,
            text: "Mi mirada se ve completamente diferente! El Lash Lift es perfecto para mi rutina diaria. 100% recomendado.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150"
        }
    ];

    return (
        <section id="testimonials" className="section testimonials-section">
            <div className="container">
                <h2 className="section-title">Lo que dicen nuestras clientas</h2>
                <div className="testimonials-grid">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="testimonial-header">
                                <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                                <div className="testimonial-info">
                                    <h4>{testimonial.name}</h4>
                                    <p>{testimonial.service}</p>
                                    <div className="testimonial-rating">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Icon key={i} path="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Process = () => {
    const steps = [
        {
            number: "01",
            title: "Consulta",
            description: "Analizamos tus necesidades y te asesoramos sobre el mejor tratamiento para ti."
        },
        {
            number: "02", 
            title: "Tratamiento",
            description: "Aplicamos la técnica más adecuada con productos de la más alta calidad."
        },
        {
            number: "03",
            title: "Resultado",
            description: "Disfruta de un look perfecto y recibe instrucciones para el mantenimiento."
        }
    ];

    return (
        <section id="process" className="section process-section">
            <div className="container">
                <h2 className="section-title">Nuestro Proceso</h2>
                <div className="process-steps">
                    {steps.map((step, index) => (
                        <div key={index} className="process-step">
                            <div className="step-number">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Promotions = () => {
    const promotions = [
        {
            id: 1,
            title: "Primera Vez",
            description: "20% de descuento en tu primer servicio",
            code: "BIENVENIDA20",
            validUntil: "31 Dic 2024"
        },
        {
            id: 2,
            title: "Pack Mirada Perfecta",
            description: "Lash Lift + Laminado con 15% OFF",
            code: "MIRADA15",
            validUntil: "31 Dic 2024"
        },
        {
            id: 3,
            title: "Amigas",
            description: "Trae a una amiga y ambas obtienen 10% OFF",
            code: "AMIGAS10",
            validUntil: "31 Dic 2024"
        }
    ];

    return (
        <section id="promotions" className="section promotions-section">
            <div className="container">
                <h2 className="section-title">Promociones Especiales</h2>
                <div className="promotions-grid">
                    {promotions.map(promo => (
                        <div key={promo.id} className="promotion-card">
                            <div className="promo-badge">Oferta</div>
                            <h3>{promo.title}</h3>
                            <p>{promo.description}</p>
                            <div className="promo-code">
                                <span>Código: {promo.code}</span>
                            </div>
                            <div className="promo-valid">
                                <small>Válido hasta: {promo.validUntil}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const App = () => {
    const { cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, clearCart } = useCart();
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleAddToCart = (service, addOns, quantity) => {
        for (let i = 0; i < quantity; i++) {
            addToCart(service, addOns);
        }
    };

    return (
        <>
            <Header cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
            <main>
                <Hero />
                <Services onServiceClick={handleServiceClick} />
                <Process />
                <Prices />
                <Testimonials />
                <Gallery />
                <Promotions />
                <WhyUs />
                <Booking />
                <FAQ />
                <Contact />
            </main>
            <Footer />
            <FloatingButtons />
            
            <ProductModal 
                service={selectedService}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedService(null);
                }}
                onAddToCart={handleAddToCart}
            />
            
            <ShoppingCart 
                cart={cart}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
            />
        </>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);