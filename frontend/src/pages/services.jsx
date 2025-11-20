// import React from 'react'
// // import { motion } from 'framer-motion'
// import { Code, Smartphone, Cloud, Database, Globe, Layers } from 'lucide-react'
// import './services.css'

// export default function ServicePage() {

//     //particle update
    
//     //particle update




//   const services = [
//     {
//       title: 'Web Development',
//       description: 'Building responsive, high-performance websites tailored to your business goals.',
//       icon: <Globe size={40} className="text-accent" />,
//     },
//     {
//       title: 'Mobile App Development',
//       description: 'Creating cross-platform mobile applications with seamless user experiences.',
//       icon: <Smartphone size={40} className="text-accent" />,
//     },
//     {
//       title: 'Cloud Solutions',
//       description: 'Empowering businesses with scalable and secure cloud-based infrastructures.',
//       icon: <Cloud size={40} className="text-accent" />,
//     },
//     {
//       title: 'Backend Engineering',
//       description: 'Designing robust APIs and database systems to power your applications.',
//       icon: <Database size={40} className="text-accent" />,
//     },
//     {
//       title: 'UI/UX Design',
//       description: 'Crafting visually stunning and intuitive designs focused on user engagement.',
//       icon: <Layers size={40} className="text-accent" />,
//     },
//     {
//       title: 'Custom Software',
//       description: 'Developing tailored software solutions to solve complex business challenges.',
//       icon: <Code size={40} className="text-accent" />,
//     },
//   ]

//   return (
//     <section id="services" className="relative z-10 py-24 bg-[#071920] text-white">
//       <div className="container mx-auto px-6">
//         <h2
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-5xl font-bold text-center mb-12"
//         >
//           Our Services
//         </h2>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-[#0b2b2f] hover:bg-[#10373d] transition-all duration-300 rounded-2xl p-8 shadow-lg border border-white/10 hover:shadow-accent/20"
//             >
//               <div className="mb-4">{service.icon}</div>
//               <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
//               <p className="text-white/80 text-sm leading-relaxed">{service.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }













import React from 'react'
import { motion } from 'framer-motion'
import { Code, Smartphone, Cloud, Database, Globe, Layers } from 'lucide-react'
import './services.css'

export default function ServicePage() {
  const services = [
    {
      title: 'Web Development',
      description: 'Building responsive, high-performance websites tailored to your business goals.',
      icon: <Globe size={40} className="text-accent" />,
    },
    {
      title: 'Mobile App Development',
      description: 'Creating cross-platform mobile applications with seamless user experiences.',
      icon: <Smartphone size={40} className="text-accent" />,
    },
    {
      title: 'Cloud Solutions',
      description: 'Empowering businesses with scalable and secure cloud-based infrastructures.',
      icon: <Cloud size={40} className="text-accent" />,
    },
    {
      title: 'Backend Engineering',
      description: 'Designing robust APIs and database systems to power your applications.',
      icon: <Database size={40} className="text-accent" />,
    },
    {
      title: 'UI/UX Design',
      description: 'Crafting visually stunning and intuitive designs focused on user engagement.',
      icon: <Layers size={40} className="text-accent" />,
    },
    {
      title: 'Custom Software',
      description: 'Developing tailored software solutions to solve complex business challenges.',
      icon: <Code size={40} className="text-accent" />,
    },
  ]

  return (
    <section id="services" className="relative z-10 py-24 bg-[#071920] text-white">
      <div className="container mx-auto px-6">
        {/* ✅ use motion.h2 */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-12"
        >
          Our Services
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            // ✅ use motion.div for animation
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0b2b2f] hover:bg-[#10373d] transition-all duration-300 rounded-2xl p-8 shadow-lg border border-white/10 hover:shadow-accent/20"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
