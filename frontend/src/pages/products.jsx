import React from 'react'
import './products.css'
import { Package } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductsPage() {
  const products = [
    { name: 'Portfolio Website', description: 'Custom portfolio sites for professionals and creators.' },
    { name: 'E-Commerce Platform', description: 'Responsive online stores with secure payment systems.' },
    { name: 'Business Website', description: 'Company websites with modern UI and fast performance.' },
    { name: 'Landing Pages', description: 'High-conversion marketing and product landing pages.' },
    { name: 'Inventory Management', description: 'Track and manage stock, suppliers, and orders efficiently.' },
    { name: 'HR Management', description: 'Employee data, payroll, and attendance in one system.' },
    { name: 'CRM System', description: 'Manage customer interactions and sales pipelines effectively.' },
    { name: 'Finance Suite', description: 'Automated accounting, invoices, and analytics tools.' },
  ]

  // Wave animation for title letters
  const title = "Our Products"
  const letters = title.split("")

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' },
    }),
  }

  // Container and card animations for wave-like appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="products" className="products-section">
      <div className="container">
        {/* Title Animation */}
        <motion.h2
          className="title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {letters.map((char, i) => (
            <motion.span key={i} variants={letterVariants} custom={i}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>

        {/* Product Grid */}
        <motion.div
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="product-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="icon-wrapper"
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                  boxShadow: '0 0 25px rgba(255, 180, 0, 0.8)',
                }}
                transition={{ duration: 1 }}
              >
                <Package size={40} className="icon" />
              </motion.div>

              <h4>{product.name}</h4>
              <p>{product.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

