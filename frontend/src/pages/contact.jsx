// import React, { useState } from 'react'
// import './contact.css'
// import { Mail, Phone, MapPin, Send } from 'lucide-react'

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   })

//   const [submitted, setSubmitted] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // TODO: connect with backend / EmailJS here
//     console.log(formData)
//     setSubmitted(true)
//     setTimeout(() => setSubmitted(false), 3000)
//     setFormData({ name: '', email: '', message: '' })
//   }

//   return (
//     <section id="contact" className="contact-section">
//       <div className="container">
//         <h2 className="title">Contact Us</h2>
//         <p className="subtitle">
//           We’d love to hear from you! Whether you have a question about our services, pricing, or projects — our team is here to help.
//         </p>

//         <div className="contact-grid">
//           {/* Left side — contact info */}
//           <div className="contact-info">
//             <div className="info-card">
//               <Mail size={32} className="icon" />
//               <div>
//                 <h4>Email</h4>
//                 <p>contact@yarrowtech.com</p>
//               </div>
//             </div>

//             <div className="info-card">
//               <Phone size={32} className="icon" />
//               <div>
//                 <h4>Phone</h4>
//                 <p>+91 98765 43210</p>
//               </div>
//             </div>

//             <div className="info-card">
//               <MapPin size={32} className="icon" />
//               <div>
//                 <h4>Address</h4>
//                 <p>Salt Lake, Kolkata, India</p>
//               </div>
//             </div>
//           </div>

//           {/* Right side — form */}
//           <form className="contact-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Your Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Your Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="message">Your Message</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Write your message here..."
//                 rows="5"
//                 required
//               />
//             </div>

//             <button type="submit" className="submit-btn">
//               <Send className="mr-2" size={20} /> Send Message
//             </button>

//             {submitted && <p className="success-msg">✅ Thank you! We’ll get back to you soon.</p>}
//           </form>
//         </div>
//       </div>
//     </section>
//   )
// }





import React, { useState } from 'react'
import './contact.css'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import toast from 'react-hot-toast' // npm i react-hot-toast (and mount <Toaster /> once in App)

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [busy, setBusy] = useState(false)
  const [submitted, setSubmitted] = useState(false) // kept for an inline fallback/UX

  const API_BASE =
    import.meta.env.VITE_API_BASE ||
    (typeof window !== 'undefined' && window.__API_BASE__) ||
    'http://localhost:5000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (busy) return

    // tiny client-side sanity checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields.')
      return
    }

    const loadingId = toast.loading('Sending your message…')
    setBusy(true)
    setSubmitted(false)

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to send. Please try again.')
      }

      toast.success('Message sent! Please check your email for confirmation.', { id: loadingId })
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(true)
      // Auto-hide the inline success after a few seconds
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      toast.error(err.message || 'Something went wrong.', { id: loadingId })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="title">Contact Us</h2>
        <p className="subtitle">
          We’d love to hear from you! Whether you have a question about our services, pricing, or projects — our team is here to help.
        </p>

        <div className="contact-grid">
          {/* Left side — contact info */}
          <div className="contact-info">
            <div className="info-card">
              <Mail size={32} className="icon" />
              <div>
                <h4>Email</h4>
                <p>career@yarrowtech.co.in</p>
              </div>
            </div>

            <div className="info-card">
              <Phone size={32} className="icon" />
              <div>
                <h4>Phone</h4>
                <p>+91 9830590929</p>
              </div>
            </div>

            <div className="info-card">
              <MapPin size={32} className="icon" />
              <div>
                <h4>Address</h4>
                <p>Esplanade, Kolkata, India</p>
              </div>
            </div>
          </div>

          {/* Right side — form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                disabled={busy}
                aria-disabled={busy}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                disabled={busy}
                aria-disabled={busy}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="5"
                required
                disabled={busy}
                aria-disabled={busy}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={busy} aria-busy={busy}>
              <Send className="mr-2" size={20} />
              {busy ? 'Sending...' : 'Send Message'}
            </button>

            {/* Inline success as a subtle fallback (toasts handle primary feedback) */}
            {submitted && <p className="success-msg">✅ Thank you! We’ll get back to you soon.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
