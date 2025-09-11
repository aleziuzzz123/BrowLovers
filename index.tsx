import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Helper component for SVG icons
// FIX: Added ...props to accept and spread additional attributes to the svg element.
const Icon = ({ path, className = '', ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d={path} />
    </svg>
);

// Enhanced data for e-commerce
// Comprehensive Services Data Structure
const servicesCategories = [
    {
        id: 'manos-pies',
        name: 'Manos y Pies',
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        description: 'Cuidado profesional para tus manos y pies',
        services: [
            { name: 'Clásicos & Niños', price: '$200', duration: '45 min', description: 'Manicure y pedicure clásico para toda la familia' },
            { name: 'Spa & Gel', price: '$350', duration: '60 min', description: 'Experiencia spa con esmaltado en gel' },
            { name: 'Refuerzos', price: '$150', duration: '30 min', description: 'Mantenimiento y refuerzo de uñas' },
            { name: 'Extras', price: '$100', duration: '15 min', description: 'Servicios adicionales personalizados' }
        ]
    },
    {
        id: 'pestanas',
        name: 'Pestañas',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
        description: 'Extensiones y tratamientos para pestañas perfectas',
        services: [
            { name: 'Pestañas Clásicas', price: '$1,200', duration: '120 min', description: 'Extensiones individuales para un look natural' },
            { name: 'Pestañas Híbridas', price: '$1,400', duration: '150 min', description: 'Combinación perfecta de clásicas y volumen' },
            { name: 'Pestañas con Volumen', price: '$1,600', duration: '180 min', description: 'Máximo volumen y densidad' },
            { name: 'Lifting', price: '$550', duration: '75 min', description: 'Curvatura natural sin extensiones' },
            { name: 'Retoque de Pestañas', price: '$500', duration: '60 min', description: 'Mantenimiento de extensiones existentes' }
        ]
    },
    {
        id: 'cejas',
        name: 'Cejas',
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        description: 'Diseño y cuidado profesional de cejas',
        services: [
            { name: 'Aplicación de Henna', price: '$200', duration: '30 min', description: 'Tinte natural con henna para cejas' },
            { name: 'Laminado', price: '$500', duration: '60 min', description: 'Alisado y fijación de vellos' },
            { name: 'Diseño + Depilación', price: '$380', duration: '45 min', description: 'Diseño personalizado con depilación con cera' },
            { name: 'Diseño + Henna + Depilación', price: '$500', duration: '75 min', description: 'Servicio completo de cejas' },
            { name: 'Limpieza de Cejas', price: '$280', duration: '30 min', description: 'Depilación con cera de cejas' },
            { name: 'Limpieza de Patilla', price: '$180', duration: '20 min', description: 'Depilación de patillas con cera' }
        ]
    },
    {
        id: 'depilacion',
        name: 'Depilación',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
        description: 'Depilación con cera para todo el cuerpo',
        services: [
            { name: 'Abdomen', price: '$400', duration: '30 min', description: 'Depilación completa del abdomen' },
            { name: 'Línea de Abdomen', price: '$250', duration: '15 min', description: 'Depilación de la línea del bikini' },
            { name: 'Área Bikini Dama', price: '$300', duration: '20 min', description: 'Depilación del área bikini' },
            { name: 'Glúteos Dama', price: '$350', duration: '25 min', description: 'Depilación de glúteos' },
            { name: 'Medias Piernas Dama', price: '$400', duration: '30 min', description: 'Depilación de medias piernas' },
            { name: 'Piernas Completas Dama', price: '$600', duration: '60 min', description: 'Depilación completa de piernas' },
            { name: 'Axilas', price: '$250', duration: '15 min', description: 'Depilación de axilas' },
            { name: 'Medio Brazo', price: '$250', duration: '20 min', description: 'Depilación de medio brazo' },
            { name: 'Brazos', price: '$300', duration: '30 min', description: 'Depilación completa de brazos' },
            { name: 'Pecho', price: '$400', duration: '30 min', description: 'Depilación del pecho' },
            { name: 'Depilación Rostro Completo', price: '$700', duration: '45 min', description: 'Depilación completa del rostro' }
        ]
    },
    {
        id: 'masajes',
        name: 'Masajes',
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        description: 'Relajación y bienestar con masajes terapéuticos',
        services: [
            { name: 'Masaje Relajante', price: '$800', duration: '60 min', description: 'Masaje completo para relajación' },
            { name: 'Masaje Descontracturante', price: '$900', duration: '60 min', description: 'Masaje para aliviar tensiones musculares' },
            { name: 'Masaje Facial', price: '$600', duration: '45 min', description: 'Masaje facial rejuvenecedor' },
            { name: 'Masaje de Pies', price: '$400', duration: '30 min', description: 'Masaje relajante de pies' }
        ]
    },
    {
        id: 'despigmentacion',
        name: 'Despigmentación',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
        description: 'Tratamientos para uniformar el tono de la piel',
        services: [
            { name: 'Ingle', price: '$400', duration: '30 min', description: 'Despigmentación del área inguinal' },
            { name: 'Glúteos', price: '$600', duration: '45 min', description: 'Despigmentación de glúteos' },
            { name: 'Axilas', price: '$400', duration: '30 min', description: 'Despigmentación de axilas' }
        ]
    }
];

const servicesData = [
    { 
        id: 'eyebrows', 
        name: 'Cejas Perfectas', 
        description: 'Transforma tu mirada con cejas que realzan tu belleza natural. Técnicas profesionales que duran hasta 6 semanas.', 
        price: 'Desde $450', 
        duration: '45-60 min', 
        category: 'eyebrows',
        items: ['Diseño Personalizado', 'Laminado Premium', 'Tinte Profesional'],
        image: '/images/services/Cejas Perfectas.jpg',
        popular: true,
        benefits: ['Resultados naturales', 'Duración hasta 6 semanas', 'Técnicas certificadas'],
        testimonial: '"Mis cejas nunca se vieron tan perfectas" - María',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
    },
    { 
        id: 'lashes', 
        name: 'Mirada de Impacto', 
        description: 'Despierta cada mañana con pestañas perfectas. Lifting y extensiones que transforman tu mirada completamente.', 
        price: 'Desde $600', 
        duration: '60-120 min', 
        category: 'lashes',
        items: ['Lash Lift Premium', 'Extensiones Clásicas', 'Extensiones Híbridas'],
        image: '/images/services/Pestañas con Volumen.jpg',
        popular: true,
        benefits: ['Efecto despierta', 'Duración hasta 8 semanas', 'Materiales premium'],
        testimonial: '"Me siento como una diosa cada día" - Ana',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
    },
    { 
        id: 'packages', 
        name: 'Pack Completo', 
        description: 'La experiencia definitiva de belleza. Combina todos nuestros servicios premium y ahorra hasta $500.', 
        price: 'Desde $1200', 
        duration: '120-180 min', 
        category: 'packages',
        items: ['Cejas + Pestañas', 'Pack Mirada Perfecta', 'Pack VIP Completo'],
        image: '/images/services/Servicio Completo de Cejas.jpg',
        popular: false,
        discount: '20% OFF',
        benefits: ['Ahorro garantizado', 'Experiencia VIP', 'Resultados espectaculares'],
        testimonial: '"La mejor inversión en mi belleza" - Carmen',
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
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
        image: '/images/services/Diseño de Cejas.jpg',
        beforeAfterImages: [
            '/images/services/Diseño de Cejas.jpg',
            '/images/services/Cejas Perfectas.jpg'
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
        image: '/images/services/Laminado de Cejas.jpg',
        beforeAfterImages: [
            '/images/services/Laminado de Cejas.jpg',
            '/images/services/Cejas Perfectas.jpg'
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
        image: '/images/services/Lash Lifting1.jpg',
        beforeAfterImages: [
            '/images/services/Lash Lifting1.jpg',
            '/images/services/lash lifting.jpg'
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
        image: '/images/services/Pestañas Clásicas.jpg',
        beforeAfterImages: [
            '/images/services/Pestañas Clásicas.jpg',
            '/images/services/aplicacion de pestanas.jpg'
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
        image: '/images/services/Pestañas Híbridas.jpg',
        beforeAfterImages: [
            '/images/services/Pestañas Híbridas.jpg',
            '/images/services/aplicacion de pestanas.jpg'
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
        image: '/images/services/Retoque de Pestañas.jpg',
        beforeAfterImages: [
            '/images/services/Retoque de Pestañas.jpg',
            '/images/services/aplicacion de pestanas.jpg'
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
        image: '/images/services/Servicio Completo de Cejas.jpg',
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
        image: '/images/services/Servicio Completo de Cejas.jpg'
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
        image: '/images/services/Retoque de Pestañas.jpg'
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
    {
        src: "/images/gallery/472489442_18055986229979367_5513418679129385293_n.jpg",
        title: "BrowLovers Studio",
        description: "Nuestro hermoso espacio de trabajo"
    },
    {
        src: "/images/gallery/472774084_18055983967979367_4986265582630817824_n.jpg",
        title: "Técnicas Profesionales",
        description: "Especialistas certificadas en acción"
    },
    {
        src: "/images/gallery/489016252_1471941760910116_9181180159860215452_n.jpg",
        title: "Resultados Naturales",
        description: "Transformaciones que realzan tu belleza"
    },
    {
        src: "/images/gallery/489570359_1473193410784951_4203302208149019963_n.jpg",
        title: "Cuidado Especializado",
        description: "Atención personalizada para cada cliente"
    },
    {
        src: "/images/gallery/489700761_1473890210715271_4432911660146424524_n.jpg",
        title: "Experiencia Premium",
        description: "Servicio de lujo y calidad"
    },
    {
        src: "/images/gallery/489828573_1475462133891412_1961840682886663545_n.jpg",
        title: "Materiales de Calidad",
        description: "Solo utilizamos productos premium"
    },
    {
        src: "/images/gallery/489964756_1473241304113495_1777495793948847417_n.jpg",
        title: "Antes y Después",
        description: "Transformaciones increíbles"
    },
    {
        src: "/images/gallery/489992319_1474108050693487_5018716340148390998_n.jpg",
        title: "Pedicure Profesional",
        description: "Cuidado completo para tus pies"
    },
    {
        src: "/images/gallery/490108586_1472156990888593_6359241336222807415_n.jpg",
        title: "Manicure Elegante",
        description: "Uñas hermosas y bien cuidadas"
    },
    {
        src: "/images/gallery/490216248_1474974993940126_7467501285171760123_n.jpg",
        title: "Diseño Personalizado",
        description: "Cada cliente recibe un diseño único"
    },
    {
        src: "/images/gallery/490218128_1475384617232497_3988251121563819873_n.jpg",
        title: "Técnicas Avanzadas",
        description: "Profesionalismo en cada detalle"
    },
    {
        src: "/images/gallery/490356462_1474188797352079_3235815387827069230_n.jpg",
        title: "Resultados Duraderos",
        description: "Calidad que perdura en el tiempo"
    },
    {
        src: "/images/gallery/490360023_1474789760625316_6582122424527602979_n.jpg",
        title: "Ambiente Relajante",
        description: "Espacio cómodo para tu bienestar"
    },
    {
        src: "/images/gallery/490437658_1474785213959104_3883898729790632797_n.jpg",
        title: "Cejas Perfectas",
        description: "Técnicas precisas para cejas definidas"
    },
    {
        src: "/images/gallery/490453638_1475043473933278_1490244235792597058_n.jpg",
        title: "Pestañas Hermosas",
        description: "Extensiones y tratamientos especializados"
    },
    {
        src: "/images/gallery/490454995_1475454333892192_2887675764238904555_n.jpg",
        title: "Micropigmentación",
        description: "Resultados naturales y duraderos"
    },
    {
        src: "/images/gallery/490572734_1473899760714316_4579435540852326513_n.jpg",
        title: "Lash Lift",
        description: "Pestañas perfectas sin extensiones"
    },
    {
        src: "/images/gallery/490874734_1475392120565080_9088281600979069367_n.jpg",
        title: "Depilación Profesional",
        description: "Piel suave con técnicas especializadas"
    },
    {
        src: "/images/gallery/491925934_1490877865683172_9116011737903368321_n.jpg",
        title: "Tratamientos Faciales",
        description: "Cuidado completo para tu rostro"
    },
    {
        src: "/images/gallery/492910370_1490794845691474_7860051898947430819_n.jpg",
        title: "Spa Experience",
        description: "Experiencia de relajación total"
    },
    {
        src: "/images/gallery/493212789_1490608362376789_9036256927012492219_n.jpg",
        title: "Microblading",
        description: "Cejas perfectas con técnica artística"
    },
    {
        src: "/images/gallery/493225126_1491035095667449_7714156041846408520_n.jpg",
        title: "Extensiones de Pestañas",
        description: "Pestañas voluminosas y naturales"
    },
    {
        src: "/images/gallery/493729517_1492151022222523_3185098264488736713_n.jpg",
        title: "Laminado de Cejas",
        description: "Cejas peinadas y definidas"
    },
    {
        src: "/images/gallery/493757957_1492033485567610_6213488218604832294_n.jpg",
        title: "Baby Lips",
        description: "Labios suaves y hermosos"
    },
    {
        src: "/images/gallery/494040694_1490372282400397_6695823104331673434_n.jpg",
        title: "Técnicas Híbridas",
        description: "Combinación de técnicas profesionales"
    },
    {
        src: "/images/gallery/494102542_1491767078927584_308195913150742042_n.jpg",
        title: "Retoque Profesional",
        description: "Mantenimiento de resultados perfectos"
    },
    {
        src: "/images/gallery/494119196_1492996448804647_3017111311317932072_n.jpg",
        title: "Diseño Artístico",
        description: "Creatividad en cada trabajo"
    },
    {
        src: "/images/gallery/494148813_1493610732076552_4170981404546648522_n.jpg",
        title: "Resultados Premium",
        description: "Calidad excepcional en cada servicio"
    },
    {
        src: "/images/gallery/494214912_1491296685641290_5097861306329968054_n.jpg",
        title: "Atención Personalizada",
        description: "Cada cliente es único y especial"
    },
    {
        src: "/images/gallery/494266608_1492009202236705_3430899686832517330_n.jpg",
        title: "Transformación Completa",
        description: "De principio a fin, resultados perfectos"
    },
    {
        src: "/images/gallery/494462233_1493192455451713_9093084198939947650_n.jpg",
        title: "Belleza Natural",
        description: "Realzando tu belleza interior"
    },
    {
        src: "/images/gallery/494542235_1493845148719777_4755108139237745242_n.jpg",
        title: "Confianza Renovada",
        description: "Sintiéndote radiante y segura"
    }
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
                                placeholder="+52 998 246 0023"
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

const FaqItem = ({ item, index, activeIndex, setActiveIndex, ...props }) => {
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
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="container nav">
                <a href="#home" className="nav-logo" onClick={closeMobileMenu}>
                    <img src="/images/logo/logo1.png" alt="BrowLovers" className="logo-image" />
                </a>
                <nav className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
                    <ul className="nav-links">
                        <li><a href="#services" className="nav-link" onClick={closeMobileMenu}>Servicios</a></li>
                        <li><a href="#about" className="nav-link" onClick={closeMobileMenu}>Nosotras</a></li>
                        <li><a href="#gallery" className="nav-link" onClick={closeMobileMenu}>Galería</a></li>
                        <li><a href="#booking" className="nav-link" onClick={closeMobileMenu}>Reserva</a></li>
                        <li><a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contacto</a></li>
                    </ul>
                </nav>
                <button 
                    className={`nav-toggle ${isMobileMenuOpen ? 'nav-toggle-open' : ''}`} 
                    onClick={toggleMobileMenu}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
};

const Hero = () => (
    <section id="home" className="hero">
        <div className="container">
            <div className="hero-content">
                <h1>Rituales de belleza que abrazan tu ser</h1>
                <p>Somos especialistas en crear nuevas miradas. Reserva con 30% de anticipo, trabajamos con materiales premium y ofrecemos garantía de 48 horas.</p>
            <div className="hero-features">
                <div className="feature-item">
                        <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" className="feature-icon" />
                        <span>Materiales Premium</span>
                </div>
                <div className="feature-item">
                        <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" className="feature-icon" />
                        <span>Garantía 48h</span>
                </div>
                <div className="feature-item">
                        <Icon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" className="feature-icon" />
                        <span>Diseño Personalizado</span>
                    </div>
                </div>
                <div className="hero-actions">
                    <a href="#booking" className="btn btn-primary">Reservar Ahora</a>
                    <a href="#services" className="btn btn-secondary">Ver Servicios</a>
                </div>
            </div>
        </div>
    </section>
);

const Stats = () => (
    <section className="stats-section">
        <div className="container">
            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Clientas satisfechas</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number">3+</div>
                    <div className="stat-label">Años de experiencia</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Garantía de calidad</div>
                </div>
            </div>
        </div>
    </section>
);

const TrustBadges = () => (
    <section className="trust-section">
        <div className="container">
            <div className="trust-content">
                <h3>Confianza y Garantía</h3>
                <div className="trust-badges">
                    <div className="trust-badge">
                        <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" className="trust-icon" />
                        <span>Materiales Premium</span>
                    </div>
                    <div className="trust-badge">
                        <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" className="trust-icon" />
                        <span>Certificación Profesional</span>
                    </div>
                    <div className="trust-badge">
                        <Icon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" className="trust-icon" />
                        <span>Garantía 48h</span>
                    </div>
                    <div className="trust-badge">
                        <Icon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" className="trust-icon" />
                        <span>Higiene Certificada</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


// Helper functions for service details
const getServiceImage = (serviceName) => {
    const imageMap = {
        'Clásicos & Niños': './images/services/classicosninos.png',
        'Spa & Gel': './images/services/Spa y Gel.png',
        'Refuerzos': './images/services/Refuerzos.png',
        'Extras': './images/services/extras.png',
        'Pestañas Clásicas': './images/services/aplicacion de pestanas.jpg',
        'Pestañas Híbridas': './images/services/cejas hibradas.jpg',
        'Pestañas con Volumen': './images/services/aplicacion de pestanas.jpg',
        'Lifting': './images/services/lash lifting.jpg',
        'Retoque de Pestañas': './images/services/aplicacion de pestanas.jpg',
        'Aplicación de Henna': './images/services/cejas hibradas.jpg',
        'Laminado': './images/services/cejas hibradas.jpg',
        'Diseño + Depilación': './images/services/cejas hibradas.jpg',
        'Diseño + Henna + Depilación': './images/services/cejas hibradas.jpg',
        'Limpieza de Cejas': './images/services/cejas hibradas.jpg',
        'Limpieza de Patilla': './images/services/cejas hibradas.jpg',
        'Abdomen': './images/services/depilacion con cera.jpg',
        'Línea de Abdomen': './images/services/depilacion con cera.jpg',
        'Área Bikini Dama': './images/services/depilacion con cera.jpg',
        'Glúteos Dama': './images/services/depilacion con cera.jpg',
        'Medias Piernas Dama': './images/services/depilacion con cera.jpg',
        'Piernas Completas Dama': './images/services/depilacion con cera.jpg',
        'Brazos Dama': './images/services/depilacion con cera.jpg',
        'Axilas Dama': './images/services/depilacion con cera.jpg',
        'Bigote Dama': './images/services/depilacion con cera.jpg',
        'Patillas Dama': './images/services/depilacion con cera.jpg',
        'Abdomen Caballero': './images/services/depilacion con cera.jpg',
        'Línea de Abdomen Caballero': './images/services/depilacion con cera.jpg',
        'Área Bikini Caballero': './images/services/depilacion con cera.jpg',
        'Glúteos Caballero': './images/services/depilacion con cera.jpg',
        'Medias Piernas Caballero': './images/services/depilacion con cera.jpg',
        'Piernas Completas Caballero': './images/services/depilacion con cera.jpg',
        'Brazos Caballero': './images/services/depilacion con cera.jpg',
        'Axilas Caballero': './images/services/depilacion con cera.jpg',
        'Bigote Caballero': './images/services/depilacion con cera.jpg',
        'Patillas Caballero': './images/services/depilacion con cera.jpg',
        'Pecho Caballero': './images/services/depilacion con cera.jpg',
        'Espalda Caballero': './images/services/depilacion con cera.jpg',
        'Eliminación con Láser': './images/services/eliminacion con laser.jpg',
        'Aplicación de Pestañas': './images/services/aplicacion de pestanas.jpg'
    };
    return imageMap[serviceName] || './images/services/manicure.jpg';
};

const getServiceBenefits = (serviceName) => {
    const benefitsMap = {
        'Clásicos & Niños': [
            'Cuidado profesional para toda la familia',
            'Técnicas seguras para niños',
            'Materiales hipoalergénicos'
        ],
        'Spa & Gel': [
            'Experiencia de lujo y relajación',
            'Esmaltado en gel de larga duración',
            'Resultados que duran hasta 3 semanas'
        ],
        'Refuerzos': [
            'Mantenimiento profesional del esmaltado',
            'Reparación de uñas dañadas',
            'Extensión de duración del esmaltado'
        ],
        'Extras': [
            'Servicios personalizados',
            'Decoración artística de uñas',
            'Atención premium'
        ]
    };
    return benefitsMap[serviceName] || ['Servicio profesional de alta calidad'];
};

const getServiceIncludes = (serviceName) => {
    const includesMap = {
        'Clásicos & Niños': [
            'Limpieza y preparación de uñas',
            'Corte y limado profesional',
            'Esmaltado con colores a elegir'
        ],
        'Spa & Gel': [
            'Exfoliación suave de manos',
            'Aplicación de gel de larga duración',
            'Secado con lámpara LED'
        ],
        'Refuerzos': [
            'Evaluación del estado actual',
            'Aplicación de refuerzo de gel',
            'Pulido y acabado'
        ],
        'Extras': [
            'Consulta personalizada',
            'Servicio especializado',
            'Materiales premium'
        ]
    };
    return includesMap[serviceName] || ['Servicio completo y profesional'];
};

// Tabbed Services Component
const TabbedServices = () => {
    const [activeTab, setActiveTab] = useState('manos-pies');
    const [favoriteServices, setFavoriteServices] = useState(new Set());
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const activeCategory = servicesCategories.find(cat => cat.id === activeTab);

    const openServiceModal = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
        // Don't prevent body scroll, let the modal handle its own scrolling
    };

    const closeServiceModal = () => {
        setSelectedService(null);
        setIsModalOpen(false);
        // No need to restore body scroll since we didn't disable it
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeServiceModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isModalOpen]);

    const toggleFavorite = (serviceName) => {
        setFavoriteServices(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(serviceName)) {
                newFavorites.delete(serviceName);
            } else {
                newFavorites.add(serviceName);
            }
            return newFavorites;
        });
    };

    const isFavorite = (serviceName) => favoriteServices.has(serviceName);

    return (
        <section id="services" className="section services-section">
            <div className="container">
                <div className="services-header">
                    <h2 className="section-title">Nuestros Servicios</h2>
                    <p className="section-subtitle">
                        Transformamos tu belleza natural con técnicas profesionales
                    </p>
                </div>

                <div className="services-tabs">
                    <div className="tabs-container">
                        {servicesCategories.map(category => (
                            <button
                                key={category.id}
                                className={`tab-button ${activeTab === category.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(category.id)}
                            >
                                <div className="tab-icon">
                                    <Icon path={category.icon} className="tab-icon-svg" />
                                </div>
                                <span className="tab-text">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="services-content">
                    <div className="category-info">
                        <h3 className="category-title">{activeCategory?.name}</h3>
                        <p className="category-description">{activeCategory?.description}</p>
                    </div>

                    <div className="services-grid">
                        {activeCategory?.services.map((service, index) => {

                            return (
                                <div key={index} className="service-item">
                                    <div className="service-item-image">
                                        <img src={getServiceImage(service.name)} alt={service.name} />
                                        <button
                                            className={`favorite-btn-corner ${isFavorite(service.name) ? 'favorited' : ''}`}
                                            onClick={() => toggleFavorite(service.name)}
                                            title={isFavorite(service.name) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                                        >
                                            <Icon 
                                                path={isFavorite(service.name) ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" : "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"} 
                                                className="favorite-icon" 
                                            />
                                        </button>
                                    </div>
                                    <div className="service-item-content">
                                        <div className="service-item-header">
                                            <h4 className="service-item-name">{service.name}</h4>
                                            <div className="service-item-price">{service.price}</div>
                                        </div>
                                        <div className="service-item-details">
                                            <span className="service-duration">{service.duration}</span>
                                            <p className="service-description">{service.description}</p>
                                        </div>
                                        <div className="service-item-actions">
                                            <button 
                                                className="btn btn-secondary btn-small"
                                                onClick={() => openServiceModal(service)}
                                            >
                                                Ver Más
                                            </button>
                                            <a 
                                                href={`https://wa.me/529982460023?text=Hola! Quiero reservar: ${service.name} - ${service.price} - ${service.duration}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-small"
                                            >
                                                Reservar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Service Detail Modal */}
            {isModalOpen && selectedService && (
                <div className="service-modal-overlay" onClick={closeServiceModal}>
                    <div className="service-modal" onClick={e => e.stopPropagation()}>
                        <button className="service-modal-close" onClick={closeServiceModal}>
                            <Icon path="M6 18L18 6M6 6l12 12" />
                        </button>
                        
                        <div className="service-modal-content">
                            <div className="service-modal-image">
                                <img 
                                    src={getServiceImage(selectedService.name)} 
                                    alt={selectedService.name}
                                    className="modal-hero-image"
                                />
                                <div className="service-modal-price-badge">
                                    <span className="modal-price">{selectedService.price}</span>
                                    <span className="modal-duration">{selectedService.duration}</span>
                                </div>
                            </div>
                            
                            <div className="service-modal-info">
                                <h2 className="service-modal-title">{selectedService.name}</h2>
                                <p className="service-modal-description">{selectedService.description}</p>
                                
                                <div className="service-modal-benefits">
                                    <h3>✨ Beneficios</h3>
                                    <ul className="benefits-list">
                                        {getServiceBenefits(selectedService.name).map((benefit, index) => (
                                            <li key={index}>
                                                <Icon path="M9 12l2 2 4-4" className="benefit-icon" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="service-modal-includes">
                                    <h3>📋 Incluye</h3>
                                    <ul className="includes-list">
                                        {getServiceIncludes(selectedService.name).map((item, index) => (
                                            <li key={index}>
                                                <Icon path="M9 12l2 2 4-4" className="include-icon" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="service-modal-actions">
                                    <button 
                                        className="modal-reserve-btn"
                                        onClick={() => {
                                            closeServiceModal();
                                            document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Reservar
                                    </button>
                                    <button 
                                        className="modal-gallery-btn"
                                        onClick={() => {
                                            closeServiceModal();
                                            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        <Icon path="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        Ver Galería
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};


const Services = ({ onServiceClick }) => (
    <section id="services" className="section services-section">
        <div className="container">
            <div className="services-header">
            <h2 className="section-title">Nuestros Servicios</h2>
                <p className="section-subtitle">
                    Transformamos tu belleza natural con técnicas profesionales
                </p>
            </div>
            
            <div className="services-grid">
                {servicesData.map(service => (
                    <div key={service.id} className={`service-card ${service.popular ? 'popular' : ''}`}>
                        <div className="service-card-content">
                            <div className="service-card-header">
                                <div className="service-icon-container">
                                    <div className="service-icon">
                                        <Icon path={service.icon} className="service-icon-svg" />
                                    </div>
                                    {service.popular && (
                                        <div className="popular-badge">Más Popular</div>
                                    )}
                                </div>
                            </div>

                            <h3 className="service-name">{service.name}</h3>
                            <p className="service-description">{service.description}</p>

                            <div className="service-pricing">
                                <div className="price-info">
                                    <span className="price">{service.price}</span>
                                    <span className="duration">{service.duration}</span>
                                </div>
                                {service.discount && (
                                    <div className="discount-badge">{service.discount}</div>
                                )}
                            </div>

                            <div className="service-actions">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => onServiceClick(service)}
                                >
                                    Ver Detalles
                                </button>
                                <a href="#booking" className="btn btn-primary">
                                    Reservar Ahora
                                </a>
                            </div>
                        </div>
                    </div>
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

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryRef = useRef(null);
    const itemsPerView = 6; // Show 6 images at once
    const maxIndex = Math.max(0, galleryImages.length - itemsPerView);

    const scrollToIndex = (index) => {
        if (galleryRef.current) {
            const containerWidth = galleryRef.current.offsetWidth;
            const scrollPosition = index * containerWidth;
            
            galleryRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            setCurrentIndex(index);
        }
    };

    const scrollNext = () => {
        if (currentIndex < maxIndex) {
            scrollToIndex(currentIndex + 1);
        }
    };

    const scrollPrev = () => {
        if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    };

    const handleScroll = () => {
        if (galleryRef.current) {
            const containerWidth = galleryRef.current.offsetWidth;
            const newIndex = Math.round(galleryRef.current.scrollLeft / containerWidth);
            setCurrentIndex(newIndex);
        }
    };

    return (
        <section id="gallery" className="section gallery-section">
        <div className="container">
                <div className="gallery-header">
            <h2 className="section-title">Galería</h2>
                    <p className="section-subtitle">
                        Descubre nuestros trabajos más hermosos y las transformaciones que realizamos
                    </p>
                </div>
                
                <div className="gallery-container">
                    <button 
                        className={`gallery-nav gallery-nav-prev ${currentIndex === 0 ? 'disabled' : ''}`}
                        onClick={scrollPrev}
                        disabled={currentIndex === 0}
                        aria-label="Imagen anterior"
                    >
                        <Icon path="M15 19l-7-7 7-7" className="nav-icon" />
                    </button>
                    
                    <div 
                        className="gallery-scroll-container"
                        ref={galleryRef}
                        onScroll={handleScroll}
                    >
                        <div className="gallery-scroll-track">
                            {galleryImages.map((image, index) => (
                                <div className="gallery-item" key={index}>
                                    <div className="gallery-item-image">
                                        <img 
                                            src={image.src} 
                                            alt={image.title}
                                        />
                                        <div className="gallery-item-overlay">
                                            <div className="gallery-item-content">
                                                <h4 className="gallery-item-title">{image.title}</h4>
                                                <p className="gallery-item-description">{image.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        className={`gallery-nav gallery-nav-next ${currentIndex >= maxIndex ? 'disabled' : ''}`}
                        onClick={scrollNext}
                        disabled={currentIndex >= maxIndex}
                        aria-label="Siguiente imagen"
                    >
                        <Icon path="M9 5l7 7-7 7" className="nav-icon" />
                    </button>
                </div>
                
                <div className="gallery-indicators">
                    {Array.from({ length: maxIndex + 1 }, (_, index) => (
                        <button
                            key={index}
                            className={`gallery-indicator ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => scrollToIndex(index)}
                            aria-label={`Ir a la página ${index + 1}`}
                        />
                ))}
            </div>
        </div>
    </section>
);
};

// Services Carousel Component
const ServicesCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const serviceImages = [
        {
            id: 1,
            src: "./images/sobre browlovers/browlovers1.jpg",
            title: "BrowLovers Studio",
            description: "Nuestro hermoso estudio en Cancún donde creamos magia"
        },
        {
            id: 2,
            src: "./images/sobre browlovers/browlovers2.jpg",
            title: "Técnicas Profesionales",
            description: "Especialistas certificadas con años de experiencia"
        },
        {
            id: 3,
            src: "./images/sobre browlovers/browlovers3.jpg",
            title: "Resultados Naturales",
            description: "Transformaciones que realzan tu belleza natural"
        },
        {
            id: 4,
            src: "./images/sobre browlovers/browlovers4.jpg",
            title: "Materiales Premium",
            description: "Solo utilizamos productos de la más alta calidad"
        },
        {
            id: 5,
            src: "./images/sobre browlovers/browlovers5.jpg",
            title: "Experiencia Única",
            description: "Cada cliente recibe atención personalizada y especializada"
        },
        {
            id: 6,
            src: "./images/sobre browlovers/browlovers6.jpg",
            title: "Resultados Duraderos",
            description: "Transformaciones que perduran y te hacen sentir radiante"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === serviceImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000);

        return () => clearInterval(interval);
    }, [serviceImages.length]);

    return (
        <div className="services-carousel">
            <div className="carousel-container">
                <div 
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {serviceImages.map((service, index) => (
                        <div key={service.id} className="carousel-slide">
                            <div className="slide-image">
                                <img src={service.src} alt={service.title} />
                                <div className="slide-overlay">
                                    <h3 className="slide-title">{service.title}</h3>
                                    <p className="slide-description">{service.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="carousel-indicators">
                {serviceImages.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

// About Section Component
const About = () => (
    <section id="about" className="section about-section">
        <div className="container">
            <div className="about-content">
                <div className="about-text">
                    <h2 className="section-title">Sobre BrowLovers</h2>
                    <p className="section-subtitle">
                        Especialistas en belleza de mirada con más de 5 años de experiencia transformando la confianza de nuestras clientas
                    </p>
                    <div className="about-description">
                        <p>
                            En BrowLovers, creemos que cada mujer merece sentirse radiante y confiada. Nuestro equipo de especialistas certificadas 
                            combina técnicas profesionales con productos de la más alta calidad para crear resultados naturales y duraderos.
                        </p>
                        <p>
                            Desde nuestro estudio en Cancún, hemos transformado la mirada de más de 500 clientas, ayudándolas a descubrir 
                            su belleza natural con servicios personalizados de cejas y pestañas.
                        </p>
                    </div>
                    <div className="about-stats">
                        <div className="stat-item">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Clientas Satisfechas</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">5+</div>
                            <div className="stat-label">Años de Experiencia</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Materiales Premium</div>
                        </div>
                    </div>
                </div>
                <div className="about-image">
                    <ServicesCarousel />
                </div>
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
                        <div className="booking-placeholder">
                            <p>Próximamente: Sistema de reservas en línea</p>
                            <a 
                                href="https://wa.me/529982460023?text=Hola! Me gustaría agendar una cita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                <Icon path="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" className="whatsapp-icon" />
                                Agendar por WhatsApp
                            </a>
                        </div>
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



const News = () => {
    const newsItems = [
        {
            id: 1,
            title: "Nueva Técnica de Microblading 3D",
            content: "Hemos incorporado la última técnica de microblading 3D para resultados aún más naturales.",
            date: "20 Mar 2024",
            type: "Novedad"
        },
        {
            id: 2,
            title: "Promoción de Primavera",
            content: "20% de descuento en todos los servicios de cejas durante el mes de abril.",
            date: "18 Mar 2024",
            type: "Promoción"
        },
        {
            id: 3,
            title: "Nuevos Horarios de Atención",
            content: "Ampliamos nuestros horarios para mejor atención. Ahora atendemos hasta las 20:00 hrs.",
            date: "15 Mar 2024",
            type: "Actualización"
        }
    ];

    return (
        <section id="news" className="section news-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Noticias y Actualizaciones</h2>
                    <p className="section-subtitle">Mantente al día con nuestras últimas novedades</p>
                </div>
                <div className="news-list">
                    {newsItems.map(item => (
                        <div key={item.id} className="news-item">
                            <div className="news-type">{item.type}</div>
                            <div className="news-content">
                                <h3 className="news-title">{item.title}</h3>
                                <p className="news-text">{item.content}</p>
                                <span className="news-date">{item.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    return (
        <section id="newsletter" className="section newsletter-section">
            <div className="container">
                <div className="newsletter-content">
                    <div className="newsletter-text">
                        <h2>¡Mantente al día!</h2>
                        <p>Recibe tips de belleza, promociones exclusivas y las últimas tendencias directamente en tu inbox.</p>
                    </div>
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <div className="newsletter-input-group">
                            <input
                                type="email"
                                placeholder="Tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                {isSubscribed ? '¡Suscrito!' : 'Suscribirse'}
                            </button>
                        </div>
                        {isSubscribed && (
                            <p className="newsletter-success">¡Gracias por suscribirte! Te enviaremos contenido exclusivo.</p>
                        )}
                    </form>
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
                        <span>Av Huayacán Km 3.5, 77560 Cancún, Q.R.</span>
                    </p>
                    <p>
                        <Icon path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <span>Lunes a Sábado: 10:00 - 19:00</span>
                    </p>
                    <p>
                        <Icon path="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                        <span>+52 998 246 0023</span>
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
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-brand">
                        <h3 className="footer-logo">BrowLovers</h3>
                        <p className="footer-tagline">Transformamos tu belleza natural con técnicas profesionales que te harán sentir radiante cada día.</p>
                        <div className="social-links">
                            <a href="https://www.instagram.com/browloverscancun" className="social-link" aria-label="Instagram">
                                <Icon path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </a>
                            <a href="https://www.facebook.com/browloversmexico/" className="social-link" aria-label="Facebook">
                                <Icon path="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </a>
                            <a href="https://wa.me/529982460023" className="social-link" aria-label="WhatsApp">
                                <Icon path="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="footer-section">
                    <h4 className="footer-title">Servicios</h4>
                    <ul className="footer-links">
                        <li><a href="#services" className="footer-link">Cejas Perfectas</a></li>
                        <li><a href="#services" className="footer-link">Mirada de Impacto</a></li>
                        <li><a href="#services" className="footer-link">Pack Completo</a></li>
                        <li><a href="#prices" className="footer-link">Ver Precios</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4 className="footer-title">Información</h4>
                    <ul className="footer-links">
                        <li><a href="#about" className="footer-link">Sobre Nosotras</a></li>
                        <li><a href="#gallery" className="footer-link">Galería</a></li>
                        <li><a href="#testimonials" className="footer-link">Testimonios</a></li>
                        <li><a href="#contact" className="footer-link">Contacto</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4 className="footer-title">Contacto</h4>
                    <div className="contact-info">
                        <div className="contact-item">
                            <Icon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" className="contact-icon" />
                            <span>Av Huayacán Km 3.5, 77560 Cancún, Q.R.</span>
                        </div>
                        <div className="contact-item">
                            <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" className="contact-icon" />
                            <span>Lunes a Sábado: 10:00 - 19:00</span>
                        </div>
                        <div className="contact-item">
                            <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="contact-icon" />
                            <span>+52 998 246 0023</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-legal">
            <p>&copy; {new Date().getFullYear()} BrowLovers Cancún. Todos los derechos reservados.</p>
                    <div className="legal-links">
                        <a href="#" className="legal-link">Términos y Condiciones</a>
                        <a href="#" className="legal-link">Aviso de Privacidad</a>
                        <a href="#" className="legal-link">Política de Cookies</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);



// Enhanced Testimonials Section
const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "María González",
            service: "Laminado de Cejas",
            rating: 5,
            text: "Increíble experiencia! Mis cejas se ven perfectas y el servicio es de primera calidad. El ambiente es súper relajante y las especialistas son muy profesionales. Definitivamente regresaré.",
            image: "/images/services/Cejas Perfectas.jpg",
            date: "Hace 2 semanas",
            verified: true
        },
        {
            id: 2,
            name: "Ana Rodríguez",
            service: "Extensiones Clásicas",
            rating: 5,
            text: "Las extensiones quedaron hermosas y naturales. El personal es muy profesional y el lugar súper limpio. Me encanta cómo se ven mis pestañas, se ven completamente naturales pero con mucho más volumen.",
            image: "/images/services/Pestañas Clásicas.jpg",
            date: "Hace 1 mes",
            verified: true
        },
        {
            id: 3,
            name: "Laura Martínez",
            service: "Lash Lift",
            rating: 5,
            text: "Mi mirada se ve completamente diferente! El Lash Lift es perfecto para mi rutina diaria. No necesito rímel y mis pestañas se ven increíbles. 100% recomendado.",
            image: "/images/services/Lash Lifting1.jpg",
            date: "Hace 3 semanas",
            verified: true
        },
        {
            id: 4,
            name: "Carmen Silva",
            service: "Pack Completo",
            rating: 5,
            text: "El pack completo fue la mejor decisión. Cejas y pestañas perfectas en una sola sesión. El ahorro es increíble y la calidad del servicio es excepcional. Ya soy cliente frecuente!",
            image: "/images/services/Servicio Completo de Cejas.jpg",
            date: "Hace 1 semana",
            verified: true
        },
        {
            id: 5,
            name: "Isabella Torres",
            service: "Diseño de Cejas",
            rating: 5,
            text: "Por fin encontré el lugar perfecto para mis cejas. El diseño es exactamente lo que quería y la duración es increíble. El estudio es hermoso y muy acogedor.",
            image: "/images/services/Diseño de Cejas.jpg",
            date: "Hace 2 meses",
            verified: true
        },
        {
            id: 6,
            name: "Valentina Cruz",
            service: "Extensiones Híbridas",
            rating: 5,
            text: "Las extensiones híbridas son perfectas para mi estilo. Se ven naturales pero con el drama que quería. El proceso fue muy cómodo y el resultado superó mis expectativas.",
            image: "/images/services/Pestañas Híbridas.jpg",
            date: "Hace 5 días",
            verified: true
        }
    ];

    return (
        <section id="testimonials" className="section testimonials-section">
            <div className="container">
                <h2 className="section-title">Lo que dicen nuestras clientas</h2>
                <p className="section-subtitle">
                    Más de 500 clientas satisfechas confían en nosotros para realzar su belleza natural
                </p>
                <div className="testimonials-grid">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="testimonial-header">
                                <div className="testimonial-avatar-container">
                                    <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                                    {testimonial.verified && (
                                        <div className="verified-badge">
                                            <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </div>
                                    )}
                                </div>
                                <div className="testimonial-info">
                                    <h4 className="testimonial-name">{testimonial.name}</h4>
                                    <p className="testimonial-service">{testimonial.service}</p>
                                    <div className="testimonial-rating">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Icon key={i} path="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        ))}
                                    </div>
                                    <span className="testimonial-date">{testimonial.date}</span>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <p className="testimonial-text">"{testimonial.text}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// WhatsApp Integration Component
const WhatsAppButton = () => {
    const phoneNumber = "529982460023";
    const message = "Hola! Me interesa agendar una cita en BrowLovers. ¿Podrían ayudarme?";
    
    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button 
            className="whatsapp-button"
            onClick={handleWhatsAppClick}
            aria-label="Contactar por WhatsApp"
        >
            <Icon path="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            <span>WhatsApp</span>
        </button>
    );
};


// Modern Video Section Component
const Video = () => {
    const [videoError, setVideoError] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const videoRef = useRef(null);

    const handleVideoError = () => {
        console.log('Video failed to load, showing fallback...');
        setVideoError(true);
    };

    const handleVideoLoad = () => {
        console.log('Video loaded successfully');
        setVideoLoaded(true);
    };

    const handleVideoPlay = () => {
        setIsPlaying(true);
        setShowControls(true);
    };

    const handleVideoPause = () => {
        setIsPlaying(false);
    };

    const handlePlayClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseEnter = () => {
        setShowControls(true);
    };

    const handleMouseLeave = () => {
        if (!isPlaying) {
            setShowControls(false);
        }
    };

    return (
        <section className="modern-video-section">
            <div className="container">
                <div className="video-header">
                    <h2 className="video-title">
                        Descubre la <span className="video-title-accent">magia</span> de BrowLovers
                    </h2>
                    <p className="video-description">
                        Ve cómo transformamos tu mirada con técnicas profesionales y materiales premium. 
                        Cada tratamiento es una experiencia única diseñada especialmente para ti.
                    </p>
                </div>
                
                <div className="modern-video-container">
                    <div className="video-wrapper">
                        {!videoError ? (
                            <div className="modern-video-player" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <video 
                                    className="main-video"
                                    controls={showControls}
                                    preload="metadata"
                                    muted
                                    loop
                                    playsInline
                                    webkit-playsinline="true"
                                    onError={handleVideoError}
                                    onLoadedData={handleVideoLoad}
                                    onPlay={handleVideoPlay}
                                    onPause={handleVideoPause}
                                    poster="./images/videos/broloversthumbnail.jpg"
                                    ref={videoRef}
                                >
                                    <source src="./images/videos/browloversvideo.mp4" type="video/mp4" />
                                    <source src="./videos/browloversvideo.mp4" type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
                                </video>
                                
                                {!isPlaying && (
                                    <div className="video-thumbnail-overlay" onClick={handlePlayClick}>
                                        <div className="thumbnail-content">
                                            <div className="play-button-modern">
                                                <Icon path="M8 5v14l11-7z" className="play-icon-modern" />
                                            </div>
                                            <div className="thumbnail-text">
                                                <h3>BrowLovers Experience</h3>
                                                <p>Haz clic para ver la transformación</p>
                                            </div>
                                        </div>
                                        <div className="thumbnail-gradient"></div>
                                    </div>
                                )}
                                
                                {isPlaying && showControls && (
                                    <div className="video-controls-overlay">
                                        <div className="controls-content">
                                            <div className="video-info">
                                                <h4>BrowLovers Studio</h4>
                                                <p>Transformación Profesional</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="video-fallback-modern">
                                <img 
                                    src="./images/videos/broloversthumbnail.jpg" 
                                    alt="BrowLovers Studio - Transformación Profesional" 
                                    className="fallback-image-modern"
                                />
                                <div className="fallback-overlay-modern">
                                    <div className="fallback-content-modern">
                                        <h3>BrowLovers Experience</h3>
                                        <p>Transformación Profesional de Mirada</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="video-features-modern">
                    <div className="feature-card">
                        <div className="feature-icon-modern">
                            <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </div>
                        <h4>Técnicas Profesionales</h4>
                        <p>Métodos certificados y actualizados</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-modern">
                            <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </div>
                        <h4>Resultados Garantizados</h4>
                        <p>Calidad asegurada en cada tratamiento</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-modern">
                            <Icon path="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </div>
                        <h4>Materiales Premium</h4>
                        <p>Productos de la más alta calidad</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Service Detail Modal Component
const ServiceModal = ({ service, isOpen, onClose }) => {
    if (!isOpen || !service) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <Icon path="M6 18L18 6M6 6l12 12" />
                </button>
                
                <div className="service-modal">
                    <div className="service-modal-header">
                        <h2 className="service-modal-title">{service.name}</h2>
                        <div className="service-modal-price">{service.price}</div>
                    </div>

                    <div className="service-modal-body">
                        <p className="service-description">{service.description}</p>
                        
                        <div className="service-details">
                            <h3>¿Qué incluye?</h3>
                            <ul className="service-includes">
                                {service.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="service-modal-footer">
                        <a href="#booking" className="btn btn-primary" onClick={onClose}>
                            Reservar Ahora
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Scroll-triggered animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => observer.observe(item));

        // Observe testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => observer.observe(card));

        // Page load animation
        setTimeout(() => {
            setIsLoading(false);
            document.body.classList.add('loaded');
        }, 1000);

        return () => observer.disconnect();
    }, []);

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        parallaxElements.forEach(element => {
            const speed = 0.5;
            if (element instanceof HTMLElement) {
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
    <>
        {isLoading && (
            <div className="loading-screen">
                <div className="loading-content">
                    <div className="loading-logo">
                        <div className="loading-spinner"></div>
                        <h2>BrowLovers</h2>
                    </div>
                    <p>Preparando tu experiencia de belleza...</p>
                </div>
            </div>
        )}
        <Header />
        <main>
            <Hero />
            <Stats />
            <TrustBadges />
            <TabbedServices />
            <About />
            <Testimonials />
            <Video />
            <Prices />
            <Gallery />
            <WhyUs />
            <News />
            <Newsletter />
            <Booking />
            <FAQ />
            <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
    </>
);
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);