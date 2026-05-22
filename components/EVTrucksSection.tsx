'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

const features = [
  {
    title: '“YUN DU” WIRE CONTROL CHASSIS',
    content: [
      { subtitle: 'YUN DU WIRED CONTROL BRAKE SYSTEM:', text: 'At 60 km/h, the braking distance is reduced by 4 m compared to similar products. It provides electronic power assistance and motor-assisted braking, greatly reducing brake pad wear.' },
      { subtitle: 'YUN DU CONTROL SYSTEM:', text: 'Transition from mechanical operation to electronic signal language ultra-fast response, streamlined operation.' },
      { subtitle: 'YUN DU WIRED SHIFT CONTROL SYSTEM:', text: 'Intelligent Gear Shifting Smooth and Precise Comfortable and Low Consumption Safe and Smooth.' },
      { subtitle: 'YUN DU WIRE-CONTROLLED STEERING SYSTEM:', text: 'Low-Speed Smoothness, High-Speed Stability Fine-Tuned Steering Re-centering Three-Mode Power-Assisted Steering.' },
      { subtitle: 'YUN DU WIRED CONTROL DRIVE SYSTEM:', text: 'Highly integrated transmission system, freeing up chassis space.' },
    ]
  },
  {
    title: 'STABLE AND COMFORTABLE',
    content: [
      { text: '2400mm Wide cockpit The best in the industry; The first to cancel the middle sub-instrument+ Handbrake+gear shift, the widest “big sleeper” in the industry; Increased steering column inclination angle provides more legroom...' },
    ]
  },
  {
    title: 'EXTRAORDINARY DYNAMIC APPEARANCE',
    content: [
      { text: 'The Sany R&D team collaborated with ltaly\'s Pininfarina to analyze the streamlined design elements of Ferrari and Lamborghini. By integrating elegant streamlining expressions, they crafted a sleek overall vehicle design.' },
      { text: 'High efficiency with special style (full LED crystal headlights, streamer turn lights, thick wall daily lights; lighting increased by 30%+).' },
      { text: 'Smooth appearance with safe and anti-theft quality (hidden antenna + wiper).' },
      { text: 'Excellent streamline with lower wind resistance.(original streamlined guide hood) .' },
      { text: 'A wider field of vision (upright A-column, hyperboloid glass).' },
    ]
  },
  {
    title: 'ECONOMICAL AND ENVIRONMENTALLY FRIENDLY',
    content: [
      { text: 'One electric light truck operating for a day can purify the same volume of air that 210 adults breathe daily.' },
      { text: 'The amount of fuel saved per vehicle per year 7200L.' },
      { text: 'Each vehicle reduces carbon emissions by approximately 19 ton per year.' },
    ]
  },
  {
    title: 'ULTRA-LONG RANGE',
    content: [
      { text: '300km can redefine the range of urban transportation.' },
      { text: 'Actual Calculation of Fully Loaded Urban Working Conditions: 85kWh range 230-260KM, 106kWh range 280-320KM.' },
      { text: 'Soc Charges From 20% to 100% <1h.' },
    ]
  },
  {
    title: 'ENERGY SAVING AND LOW CONSUMPTION',
    content: [
      { text: 'Extreme optimization reduces consumption by 10%. Reduce costs and increase efficiency save power and worry.' },
      { text: 'Traditional braking energy recovery increases cruising range by 5%, decoupled braking energy recovery strategy increases cruising range by 13%.' },
    ]
  },
  {
    title: 'LOADING A LOT AND RUNNING FAST',
    content: [
      { text: '18.5m³ super large volume configuration, use transportation capacity to cross spatial boundaries.' },
      { text: 'Chassis weight reduction 50KG+, Highly integrated electric drive axle releases chassis space and makes the entire vehicle lighter.' },
      { text: 'Highly flexible and multiple configurations, A variety of top-loading models including van, warehouse, fence, and refrigerated to meet different transportation needs.' },
    ]
  },
  {
    title: 'SAFE AND RELIABLE',
    content: [
      { text: '26m precision braking distance, continuously commit to safer driving.' },
      { text: 'Braking distance is the shortest in the whole industry, Compared with traditional vacuum hydraulic braking, electronic hydraulic braking shortens the braking distance by more than 4 meters.' },
      { text: 'Electronic control assist no fear of frequent braking, Wire-controlled dispatching provides electronic control assistance and an auxiliary braking drive motor, greatly reducing brake pad wear.' },
    ]
  },
  {
    title: 'DIVERSE SCENARIOS',
    content: [
      { text: 'Express Delivery, Supermarket Delivery, General Department Store, LTL Shipping, Cold Chain Guarantee.' },
    ]
  }
];

const trucks = [
  {
    name: 'EV106kWh-6t',
    image: '/EV106kWh-6t.png',
    specs: [
      { label: 'Class II Chassis :', value: '2400 - 2550 kg' },
      { label: 'Max. Speed :', value: '90 km/h' },
      { label: 'Rated/Max. Power :', value: '60/115 kW' }
    ]
  },
  {
    name: 'EV103kWh-6t',
    image: '/EV103kWh-6t.png',
    specs: [
      { label: 'Class II Chassis :', value: '2400 kg' },
      { label: 'Max. Speed :', value: '90 km/h' },
      { label: 'Rated/Max. Power :', value: '60/115 kW' }
    ]
  }
];

const parameters = [
  { label: 'Type', value: 'Electric Type' },
  { label: 'Charging Time (20%-80%)', value: '< 1h' },
  { label: 'Overall Length', value: '5995 mm' },
  { label: 'GVW', value: '6000 kg' },
  { label: 'Max. Speed', value: '90 km/h' },
  { label: 'Rated Storage Energy', value: '84.48 kWh' },
  { label: 'Rated/Max. Power', value: '60/115 kW' },
  { label: 'Rated/Max. Torque', value: '135/350 NM' },
  { label: 'Wheelbase', value: '2000/4000 mm' },
];

function AccordionItem({ item, isOpen, onClick }: { item: any; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm tracking-widest uppercase font-light text-zinc-200 group-hover:text-white transition-colors duration-300">
          {item.title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-zinc-500 group-hover:text-white transition-colors duration-300 ml-4 flex-shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 flex flex-col gap-4">
              {item.content.map((c: any, i: number) => (
                <div key={i} className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed tracking-wide">
                  {c.subtitle && <strong className="text-zinc-200 font-normal block mb-1">{c.subtitle}</strong>}
                  {c.text}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EVTrucksSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleAll = () => {
    if (openItems.length === features.length) {
      setOpenItems([]); // Collapse all
    } else {
      setOpenItems(features.map((_, i) => i)); // Expand all
    }
  };

  return (
    <section id="ev-trucks" className="py-24 px-6 md:px-12 lg:px-16 bg-[#050505] relative z-20">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 lg:gap-24">
        
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <SectionTitle number="03 / FLEET" title="EV Trucks" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left Column: Features Accordion */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h3 className="text-xl font-light tracking-wide text-white uppercase">Features</h3>
              <button 
                onClick={toggleAll}
                className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 hover:text-white transition-colors duration-300"
              >
                {openItems.length === features.length ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
            <div className="flex flex-col border-b border-white/10">
              {features.map((feature, index) => (
                <AccordionItem 
                  key={index} 
                  item={feature} 
                  isOpen={openItems.includes(index)}
                  onClick={() => toggleItem(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Truck Cards & Parameters */}
          <div className="lg:col-span-7 flex flex-col gap-16">
            
            {/* Truck Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trucks.map((truck, idx) => (
                <div key={idx} className="flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm group hover:border-white/20 transition-all duration-500">
                  <div className="relative w-full h-64 bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center p-6">
                    <Image
                      src={truck.image}
                      alt={truck.name}
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-8 flex flex-col gap-6">
                    <h3 className="text-2xl font-light text-white tracking-tight">{truck.name}</h3>
                    
                    <div className="flex flex-col gap-4">
                      {truck.specs.map((spec, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <span className="text-lg text-zinc-200 font-light">{spec.value}</span>
                          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{spec.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <button className="flex-1 bg-[#E60000] text-white py-3 rounded text-[11px] uppercase tracking-widest font-medium hover:bg-[#CC0000] transition-colors duration-300">
                        Inquiry
                      </button>
                      <button className="flex-1 border border-[#E60000] text-[#E60000] py-3 rounded text-[11px] uppercase tracking-widest font-medium hover:bg-[#E60000] hover:text-white transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Parameters Table */}
            <div className="flex flex-col">
              <h3 className="text-xl font-light tracking-wide text-white uppercase mb-8 border-b border-white/10 pb-4">Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
                {parameters.map((param, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-sm font-light text-white">{param.value}</span>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{param.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
