import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Brain, 
  ShieldAlert, 
  Activity, 
  Info, 
  Target, 
  MousePointer2, 
  Clock, 
  Users, 
  Beaker,
  AlertTriangle,
  Flame,
  Wind
} from 'lucide-react';

import juntaLogo from './assets/logos/junta-original.png';
import movimientoLogo from './assets/logos/movimiento-paz-original.png';

// --- SLIDE DATA ---
const SLIDES = [
  {
    id: 'cover',
    type: 'hero',
    tag: 'Taller de Prevención',
    title: 'LO QUE NO VES',
    subtitle: 'CUANDO VAPEAS',
    image: '/images/vape_cover_background_1779095587667.png',
    action: true,
    description: 'Un taller para ver lo invisible, entender lo que nadie explica y decidir con información real.',
    stats: [
      { icon: <Clock className="w-4 h-4" />, label: '60 minutos' },
      { icon: <Users className="w-4 h-4" />, label: 'Grupal' },
      { icon: <Activity className="w-4 h-4" />, label: 'Interactivo' }
    ]
  },
  {
    id: 'intro-1',
    type: 'split',
    eyebrow: 'Para empezar',
    title: '¿SABÉIS QUÉ ES ESTO?',
    image: '/images/slide1.png',
    questions: [
      '¿Habéis visto alguno antes? ¿Dónde?',
      '¿Sabéis cómo funciona por dentro?',
      '¿Lo consideráis peligroso?',
      '¿Conocéis a alguien que vapea?'
    ]
  },
  {
    id: 'intro-2',
    type: 'split',
    eyebrow: 'Lo que hace la industria',
    title: 'ASÍ FUNCIONA EL MARKETING',
    image: '/images/slide3.png',
    questions: [
      '«Solo es vapor de agua, no hace daño»',
      '«No tiene nicotina» — ¿seguro?',
      '«Es mucho más sano que fumar»',
      '¿Quién os ha dicho estas cosas?'
    ],
    dato: 'Hoy vamos a ver qué hay realmente dentro.'
  },
  {
    id: 'intro-3',
    type: 'split',
    eyebrow: 'La trampa del diseño',
    title: 'DISEÑADO PARA CAER EN LA TENTACIÓN',
    image: '/images/slide4.png',
    questions: [
      'Sabores a fresa, sandía, algodón de azúcar...',
      'Colores llamativos. Formato pequeño y discreto.',
      '¿Creéis que esto es casualidad?'
    ]
  },
  {
    id: 'impact',
    type: 'hero-dark',
    title: 'HOY NO VAMOS A HABLAR DE SABORES.',
    subtitle: 'VAMOS A HABLAR DE LO QUE ESCONDEN.',
    image: '/images/vape_intro_recon_1779095971985.png',
    description: 'Lo que la industria no te cuenta. Lo que no está en la etiqueta. Lo que pasa dentro de tu cuerpo.',
    questions: [
      '¿Sabéis qué son las sales de nicotina?',
      '¿Habéis leído alguna vez la etiqueta de un vaper?',
      '¿Sabríais distinguir un ingrediente peligroso?',
      '¿Creéis que «sin nicotina» significa sin riesgo?'
    ]
  },
  {
    id: 'label',
    type: 'interactive-label',
    title: 'LA ETIQUETA QUE NO ENTIENDES',
    image: '/images/slide6.png',
    description: 'Los vapers suelen ocultar sus ingredientes reales bajo nombres complejos o en letras minúsculas diseñadas para no ser leídas.',
    ingredients: [
      { name: 'Propilenoglicol', real: 'Gas de máquinas de humo / Anticongelante', risk: 'Irritación pulmonar severa' },
      { name: 'Glicerina Vegetal', real: 'Aceite vegetal procesado', risk: 'Neumonía lipoidea al inhalarse x tiempo' },
      { name: 'Diacetilo / Acetoína', real: 'Saborizante mantequilla', risk: 'Bronquiolitis Obliterante ("Pulmón de palomitas")' },
      { name: 'Acetaldehído', real: 'Fijador de perfumes / Químico', risk: 'Cancerígeno para el ser humano' },
      { name: 'BHA (Butilhidroxianisol)', real: 'Antioxidante industrial', risk: 'Posible alterador hormonal' },
      { name: 'Metales Pesados', real: 'De la resistencia (Níquel/Plomo)', risk: 'Toxicidad celular y daño renal' }
    ]
  },
  {
    id: 'instructions',
    type: 'steps',
    title: 'TRES PASOS PARA DESCIFRARLA',
    image: '/images/vape_label_ingredients_1779096050863.png',
    steps: [
      { n: '1', title: '🔍 LEED LA ETIQUETA', text: 'Observad ingredientes, sabores y detalles que normalmente pasarían desapercibidos.', icon: '🔍' },
      { n: '2', title: '🧪 DESCIFRAD CADA INGREDIENTE', text: 'Usad la ficha para descubrir qué es cada sustancia y qué función tiene.', icon: '🧪' },
      { n: '3', title: '📝 CREAD UNA ETIQUETA HONESTA', text: 'Decid qué información debería aparecer de forma clara y visible.', icon: '📝' }
    ],
    timer: 'Tenéis 20 minutos.'
  },
  {
    id: 'filter',
    type: 'comparison',
    title: 'EL CIGARRILLO TIENE FILTRO. EL VAPER, NO.',
    image: '/images/slide8.png',
    description: 'Todo lo que retiene el filtro del cigarrillo... en el vaper va directamente a tus pulmones.',
    images: [
      { src: '/images/vape_filter_comparison_1779096021548.png', label: 'ANÁLISIS DE RESIDUOS' }
    ]
  },
  {
    id: 'quiz',
    type: 'quiz',
    title: 'LOS NÚMEROS NO MIENTEN',
    image: '/images/workshop_abstract_bg_1779095692750.png',
    subtitle: 'Haz clic en cada pregunta para revelar el dato real',
    items: [
      { q: '¿Cuántas caladas tiene un vaper desechable estándar?', a: '600 CALADAS', detail: 'Equivale a entre 15 y 20 cigarrillos.' },
      { q: '¿Cuántas caladas se dan al día de media habitualmente?', a: '100–200 AL DÍA', detail: 'Un vaper dura entre 3 y 6 días.' },
      { q: '¿A cuántos cigarrillos equivale un vaper semanal al mes?', a: '60–80 CIGARRILLOS', detail: 'Más de 3 cajetillas al mes. Sin verlo ni olerlo.' },
      { q: '¿Hasta qué edad sigue desarrollándose el cerebro?', a: 'HASTA LOS 25 AÑOS', detail: 'La nicotina afecta directamente al desarrollo del cerebro adolescente.' }
    ]
  },
  {
    id: 'stats-final',
    type: 'stats',
    title: 'DATOS CLAVE',
    image: '/images/workshop_abstract_bg_1779095692750.png',
    stats: [
      { value: '34,5%', label: 'Jóvenes 14-18 años', desc: 'Lo han probado al menos una vez.', source: 'ESTUDES 2022' },
      { value: '50 mg', label: 'Concentración Nicotina', desc: 'Frente a ~1,5 mg de un cigarrillo.', source: 'FDA' },
      { value: '7-10 s', label: 'Llegada al cerebro', desc: 'Igual de rápido que fumando.', source: 'Journal of Phys.' },
      { value: 'Diacetil', label: 'Pulmón de palomitas', desc: 'Enfermedad pulmonar irreversible.', source: 'NIOSH' }
    ]
  },
  {
    id: 'reflection',
    type: 'reflection',
    title: 'YA HAS VISTO LO QUE NO SE VE.',
    subtitle: 'LA PRÓXIMA DECISIÓN ES TUYA.',
    image: '/images/workshop_abstract_bg_1779095692750.png',
    description: 'La publicidad vende sabores.\nLas etiquetas suelen ocultar la complejidad.\nTomad decisiones con información completa.',
    footer: 'Gracias por participar'
  }
];


// --- COMPONENTS ---

export function Header() {
  return (
    <header className="absolute top-[28px] left-[40px] right-[40px] flex items-center justify-between pointer-events-none z-50">
      <div className="h-[110px] max-w-[300px] flex items-center justify-start">
        <img 
          src={juntaLogo} 
          alt="Junta de Andalucía" 
          className="max-h-[110px] max-w-[300px] w-auto h-auto object-contain" 
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="h-[110px] max-w-[300px] flex items-center justify-end">
        <img 
          src={movimientoLogo} 
          alt="Movimiento por la Paz" 
          className="max-h-[110px] max-w-[300px] w-auto h-auto object-contain" 
          referrerPolicy="no-referrer"
        />
      </div>
    </header>
  );
}

const QuizItem = ({ question, answer, detail, index, ...props }: { question: string, answer: string, detail: string, index: number, [key: string]: any }) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        setRevealed(true);
      }}
      className={`p-6 border border-white/10 cursor-pointer transition-all duration-300 interactive-element ${revealed ? 'bg-brand-red/10 border-brand-red/30' : 'bg-brand-gray/30 hover:border-white/20 hover:bg-brand-gray/50'}`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-[min(1.4vw,18px)] font-light mb-4 leading-relaxed text-white/90">{question}</p>
          <AnimatePresence>
            {revealed && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-brand-red text-white text-[min(1vw,12px)] font-bold px-3 py-1 rounded-sm shadow-xl tracking-widest">{answer}</span>
                </div>
                <p className="text-[min(1.1vw,14px)] text-white/60 leading-relaxed">{detail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!revealed && (
          <div className="text-[9px] tracking-widest text-brand-red/50 uppercase font-bold animate-pulse mt-2 flex-shrink-0">Revelar</div>
        )}
      </div>
    </div>
  );
};

// --- SLIDE RENDERER COMPONENT ---
const SlideContent: React.FC<{ slide: typeof SLIDES[0], index: number }> = ({ slide }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {slide.type === 'hero' && (
        <div className="text-center flex flex-col items-center max-w-5xl">
          <span className="inline-block px-4 py-1.5 border border-brand-red text-brand-red text-[min(1.2vw,14px)] font-bold tracking-[0.4em] uppercase mb-6">
            {slide.tag}
          </span>
          <h1 className="text-[min(8vw,110px)] leading-[0.85] font-display mb-6 tracking-tighter text-brand-cream uppercase">
            {slide.title}<br />
            <span className="text-brand-red">{slide.subtitle}</span>
          </h1>
          <p className="max-w-3xl text-white/70 text-[min(2vw,24px)] font-light mb-10 leading-relaxed">
            {slide.description}
          </p>
          <div className="flex items-center justify-center gap-12 border-t border-white/10 pt-10 w-full max-w-2xl">
            {slide.stats?.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div className="text-brand-red scale-125 mb-1">{s.icon}</div>
                <span className="text-[min(0.8vw,10px)] tracking-[0.3em] font-bold uppercase text-white/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {slide.type === 'hero-dark' && (
        <div className="text-center flex flex-col items-center w-full max-w-6xl">
          <h2 className="text-[min(6.2vw,86px)] leading-[0.82] font-display mb-10 mt-12 text-center uppercase tracking-tighter text-white">
            {slide.title}<br />
            <span className="text-brand-red">{slide.subtitle}</span>
          </h2>
          <p className="text-[min(1.8vw,20px)] font-light text-white/60 mb-10 max-w-3xl leading-relaxed">{slide.description}</p>
          <div className="grid grid-cols-2 gap-6 w-full text-left">
            {slide.questions?.map((q, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur-md border-l-4 border-brand-red text-[min(1.3vw,16px)] font-light text-white/70 hover:bg-brand-red/10 transition-all duration-300">
                {q}
              </div>
            ))}
          </div>
        </div>
      )}

      {slide.type === 'split' && (
        <div className="grid grid-cols-2 gap-12 items-center w-full max-w-6xl px-4">
          <div className="relative flex justify-center">
            <div className="aspect-[4/5] w-full max-w-[min(30vw,350px)] overflow-hidden rounded-sm shadow-2xl border border-white/10">
              <img src={slide.image} alt="visual" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="text-left flex flex-col justify-center">
            <span className="text-brand-red text-[min(1vw,12px)] font-bold tracking-[0.4em] uppercase mb-4 block">
              {slide.eyebrow}
            </span>
            <h2 className="text-[min(5vw,64px)] font-display leading-[0.9] mb-8 tracking-tight uppercase">
              {slide.title}
            </h2>
            <div className="space-y-4">
              {slide.questions?.map((q, i) => (
                <div key={i} className="flex items-center gap-6 text-white/50 group">
                  <div className="w-8 h-[2px] bg-brand-red/40 group-hover:w-12 transition-all duration-300 shrink-0"></div>
                  <p className="text-[min(1.4vw,18px)] font-light">{q}</p>
                </div>
              ))}
            </div>
            {slide.dato && (
              <div className="mt-8 p-6 bg-brand-yellow/10 border-l-4 border-brand-yellow text-brand-yellow font-bold text-[min(1.2vw,14px)] tracking-widest uppercase shadow-xl">
                {slide.dato}
              </div>
            )}
          </div>
        </div>
      )}

      {slide.type === 'steps' && (
        <div className="w-full flex flex-col items-center max-w-6xl">
          <h2 className="text-[min(5vw,60px)] font-display mb-12 text-center tracking-tighter uppercase">{slide.title}</h2>
          <div className="grid grid-cols-3 gap-6 w-full mb-10">
            {slide.steps?.map((step, i) => (
              <div key={i} className="p-8 bg-white/5 backdrop-blur-lg border border-white/5 rounded-sm relative group hover:border-brand-red/50 transition-all duration-300 flex flex-col items-center text-center">
                <div className="text-6xl absolute -top-4 -right-2 font-display text-brand-red/5 group-hover:text-brand-red/10 transition-colors pointer-events-none">{step.n}</div>
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{step.icon}</div>
                <h3 className="text-[min(1.5vw,18px)] font-display tracking-widest text-brand-red mb-4 uppercase">{step.title}</h3>
                <p className="text-[min(1.1vw,14px)] text-white/50 leading-relaxed font-light">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 text-brand-yellow bg-brand-yellow/10 px-6 py-2 rounded-full border border-brand-yellow/30">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="font-display text-[min(1.2vw,14px)] tracking-[0.3em] uppercase">{slide.timer}</span>
          </div>
        </div>
      )}

      {slide.type === 'comparison' && (
        <div className="w-full flex flex-col items-center max-w-6xl h-full justify-center mx-auto transform scale-[0.9] origin-top mt-10">
          <h2 className="text-[min(3.8vw,46px)] font-display mb-4 text-center uppercase tracking-tight leading-none">{slide.title}</h2>
          <p className="text-white/60 text-[min(1.1vw,15px)] font-light mb-8 text-center max-w-3xl leading-tight">{slide.description}</p>
          <div className={`grid gap-8 w-full max-w-4xl justify-center ${slide.images?.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 md:grid-cols-2'}`}>
            {slide.images?.map((img, i) => (
              <div key={i} className="flex flex-col items-center gap-4 w-full max-w-3xl">
                <div className="aspect-video w-full rounded-sm overflow-hidden border-2 border-brand-red shadow-2xl relative">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                </div>
                <div className="text-[min(0.9vw,11px)] font-bold tracking-[0.4em] uppercase text-brand-red py-2 px-6 border border-brand-red/20 bg-brand-red/5">
                  {img.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {slide.type === 'stats' && (
        <div className="w-full flex flex-col items-center max-w-6xl">
          <h2 className="text-[min(5vw,60px)] font-display mb-12 text-center uppercase tracking-[0.1em]">{slide.title}</h2>
          <div className="grid grid-cols-4 gap-6 w-full">
            {slide.stats?.map((s, i) => (
              <div key={i} className="p-8 bg-white/5 backdrop-blur-xl border-t-2 border-brand-red rounded-sm hover:-translate-y-2 transition-transform shadow-2xl">
                <div className="text-[min(3vw,44px)] font-display text-brand-red mb-3">{s.value}</div>
                <div className="text-[min(0.8vw,10px)] font-bold tracking-widest uppercase text-white/80 mb-4 border-l border-brand-red/40 px-2">{s.label}</div>
                <p className="text-[min(1.1vw,13px)] text-white/50 leading-relaxed min-h-[4em] font-light">{s.desc}</p>
                <div className="mt-6 pt-4 border-t border-white/10 text-[9px] text-white/30 tracking-widest uppercase font-bold">
                  {s.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {slide.type === 'quiz' && (
        <div className="w-full flex flex-col items-center max-w-5xl">
          <h2 className="text-[min(5vw,66px)] font-display mb-4 text-center uppercase tracking-tighter leading-none">{slide.title}</h2>
          <p className="text-center text-white/40 text-[min(1vw,12px)] font-bold tracking-[0.5em] uppercase mb-12 border-b border-white/5 pb-4 px-12">{slide.subtitle}</p>
          <div className="grid grid-cols-2 gap-4 w-full">
            {slide.items?.map((item, i) => (
              <QuizItem key={i} question={item.q} answer={item.a} detail={item.detail} index={i} />
            ))}
          </div>
        </div>
      )}

      {slide.type === 'interactive-label' && (
        <div className="grid grid-cols-[1fr_min(20vw,260px)] gap-16 w-full items-center max-w-6xl px-4 transform scale-[0.9] origin-top mt-10">
          <div className="text-left h-full flex flex-col justify-center">
            <h2 className="text-[min(3vw,40px)] font-display mb-4 leading-[0.8] tracking-tight uppercase">{slide.title}</h2>
            <p className="text-white/60 text-[min(0.9vw,13px)] font-light mb-6 leading-relaxed">{slide.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {slide.ingredients?.map((ing, i) => (
                  <div key={i} className="flex flex-col p-3 bg-white/5 border border-white/5 rounded-sm group hover:border-brand-red/30 transition-all">
                      <div className="flex justify-between items-center mb-1">
                          <span className="text-[min(1vw,14px)] font-display tracking-[0.1em] text-brand-red uppercase">{ing.name}</span>
                          <AlertTriangle className="w-3 h-3 text-brand-yellow/80" />
                      </div>
                      <div className="flex gap-3">
                          <div className="text-[9px] uppercase tracking-widest text-white/40 flex flex-col">
                            <span className="text-[7px] text-white/20 mb-1">Uso Real</span>
                            <span className="text-white/70 truncate max-w-[120px]">{ing.real}</span>
                          </div>
                          <div className="text-[9px] uppercase tracking-widest text-white/40 flex flex-col">
                            <span className="text-[7px] text-white/20 mb-1">Efecto</span>
                            <span className="text-red-500 font-bold">{ing.risk}</span>
                          </div>
                      </div>
                  </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
              <div className="w-[min(22vw,280px)] aspect-[3/4] bg-brand-black rounded-sm shadow-2xl relative overflow-hidden ring-1 ring-white/20 group cursor-zoom-in">
                  <img 
                    src="/images/vape_label_realistic_1779100291699.png" 
                    alt="Realistic Vaper Label" 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              <p className="mt-4 text-[min(0.8vw,10px)] font-bold tracking-[0.4em] uppercase text-white/30">Inspección de Etiquetado Real</p>
          </div>
        </div>
      )}

      {slide.type === 'reflection' && (
        <div className="text-center flex flex-col items-center max-w-5xl relative">
          {/* Subtle atmospheric effect */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,rgba(217,43,43,0.05)_0%,transparent_70%)]" />
          </div>

          <h2 className="text-[min(7vw,90px)] leading-[0.85] font-display mb-12 tracking-tighter text-brand-cream uppercase">
            {slide.title}<br />
            <span className="text-brand-red">{slide.subtitle}</span>
          </h2>

          <div className="space-y-6 mb-16">
            {slide.description?.split('\n').map((line, i) => (
              <p key={i} className="text-white/60 text-[min(1.8vw,22px)] font-light leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          <div className="pt-12 border-t border-white/10 w-full max-w-md">
            <span className="text-[min(1vw,12px)] font-bold tracking-[0.6em] uppercase text-brand-red/60">
              {slide.footer}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  const next = () => setActiveSlide(s => Math.min(s + 1, SLIDES.length - 1));
  const prev = () => setActiveSlide(s => Math.max(s - 1, 0));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleScreenClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.interactive-element')) return;
    
    const width = window.innerWidth;
    if (e.clientX > width / 2) {
      next();
    } else {
      prev();
    }
  };

  const currentSlide = SLIDES[activeSlide];

  return (
    <div className="presentation-wrapper font-sans" onClick={handleScreenClick}>
      {/* PERSISTENT BACKGROUND - Prevents flash */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 pointer-events-none z-0"
        >
          {currentSlide.image && (
            <>
              <img src={currentSlide.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-black/85" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="slide-canvas z-10 select-none">
        <Header />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full flex items-center justify-center pt-24 px-12 pb-8"
          >
            <SlideContent slide={currentSlide} index={activeSlide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Progress Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {SLIDES.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-300 rounded-full ${i === activeSlide ? 'w-8 bg-brand-red' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}

const SmokeParticle = ({ index, x }: { index: number, x: string }) => (
  <motion.div
    initial={{ y: '110vh', x: x, opacity: 0, scale: 1 }}
    animate={{ 
      y: '-20vh', 
      opacity: [0, 0.5, 0.4, 0],
      scale: [1, 2, 3],
      x: [`${parseInt(x) - 5}%`, `${parseInt(x) + 5}%`, `${parseInt(x) - 10}%`]
    }}
    transition={{ 
      duration: 10 + index * 2, 
      repeat: Infinity, 
      ease: "linear",
      delay: index * 3
    }}
    className="absolute w-64 h-64 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] rounded-full blur-3xl"
  />
);
