// import React, { useEffect, useRef, useState } from "react";
// import "./Hero.css";

// const Hero = ({ openFreeTrial }) => {
//   const canvasRef = useRef(null);

//   const words = ["Website", "Mobile App", "Software", "ERP System"];
//   const [wordIndex, setWordIndex] = useState(0);
//   const [typedText, setTypedText] = useState("");

//   useEffect(() => {
//     let word = words[wordIndex];
//     let i = 0;

//     setTypedText("");

//     const typingInterval = setInterval(() => {
//       setTypedText(word.slice(0, i + 1));
//       i++;

//       if (i === word.length) clearInterval(typingInterval);
//     }, 80);

//     const nextWordTimeout = setTimeout(() => {
//       setTypedText("");
//       setWordIndex((prev) => (prev + 1) % words.length);
//     }, 2800);

//     return () => {
//       clearInterval(typingInterval);
//       clearTimeout(nextWordTimeout);
//     };
//   }, [wordIndex]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       const ctx = canvas.getContext("2d");
//       let animationFrameId;
//       let particles = [];

//       const resizeCanvas = () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//       };
//       resizeCanvas();
//       window.addEventListener("resize", resizeCanvas);

//       class Particle {
//         constructor() {
//           this.x = canvas.width * 0.4 + Math.random() * canvas.width * 0.6;
//           this.y = Math.random() * canvas.height;
//           this.vx = (Math.random() - 0.5) * 0.5;
//           this.vy = (Math.random() - 0.5) * 0.5;
//           this.depth = Math.random();
//           this.radius = this.depth * 3 + 1.5;
//           this.opacity = this.depth * 0.8 + 0.2;
//         }
//         update() {
//           this.x += this.vx;
//           this.y += this.vy;
//           if (this.x < canvas.width * 0.4 || this.x > canvas.width) this.vx *= -1;
//           if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
//         }
//         draw() {
//           ctx.beginPath();
//           ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(0, 255, 242, ${this.opacity})`;
//           ctx.shadowBlur = 10 + this.depth * 15;
//           ctx.shadowColor = `rgba(0, 255, 242, ${this.opacity})`;
//           ctx.fill();
//           ctx.shadowBlur = 0;
//         }
//       }

//       for (let i = 0; i < 200; i++) particles.push(new Particle());

//       const animate = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         particles.forEach((p) => {
//           p.update();
//           p.draw();
//         });

//         animationFrameId = requestAnimationFrame(animate);
//       };

//       animate();

//       return () => {
//         cancelAnimationFrame(animationFrameId);
//         window.removeEventListener("resize", resizeCanvas);
//       };
//     }, 50);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <section className="hero">
//       <canvas ref={canvasRef} className="hero-canvas" />

//       <div className="hero-content">
//         <h1 className="hero-title">
//           Leading <br />
//           <span className="highlight fade-text">{typedText}</span> <br />
//           Development Company
//         </h1>

//         <p className="hero-subtitle">
//           Transform your operations with innovative software, AI-powered systems <br />
//           and customized ERP solutions designed to scale your business efficiently
//         </p>

//         {/* ⭐ UPDATED BUTTON */}
//         <button className="cta-btn" id="cta1" onClick={openFreeTrial}>
//           Get Free Trial
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Hero;



















// import React, { useEffect, useRef, useState } from "react";
// import "./Hero.css"; 
// import HeroImg from "../assets/laptop.png";

// const Hero = () => {
//   const canvasRef = useRef(null);

//   const words = ["Website", "Mobile App", "Software", "ERP System"];
//   const [wordIndex, setWordIndex] = useState(0);
//   const [typedText, setTypedText] = useState("");

//   useEffect(() => {
//     let word = words[wordIndex];
//     let i = 0;

//     setTypedText("");

//     const typingInterval = setInterval(() => {
//       setTypedText(word.slice(0, i + 1));
//       i++;

//       if (i === word.length) clearInterval(typingInterval);
//     }, 80);

//     const nextWordTimeout = setTimeout(() => {
//       setTypedText("");
//       setWordIndex((prev) => (prev + 1) % words.length);
//     }, 2800);

//     return () => {
//       clearInterval(typingInterval);
//       clearTimeout(nextWordTimeout);
//     };
//   }, [wordIndex]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       const ctx = canvas.getContext("2d");
//       let animationFrameId;
//       let particles = [];

//       const resizeCanvas = () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//       };
//       resizeCanvas();
//       window.addEventListener("resize", resizeCanvas);

//       class Particle {
//         constructor() {
//           this.x = canvas.width * 0.4 + Math.random() * canvas.width * 0.016;
//           this.y = Math.random() * canvas.height;
//           this.vx = (Math.random() - 0.5) * 10.5;
//           this.vy = (Math.random() - 0.5) * 10.5;
//           this.depth = Math.random();
//           this.radius = this.depth * 4 + 1.5;
//           this.opacity = this.depth * 0.8 + 0.2;
//         }
//         update() {
//           this.x += this.vx;
//           this.y += this.vy;
//           if (this.x < canvas.width * 0.4 || this.x > canvas.width) this.vx *= -1;
//           if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
//         }
//         draw() {
//           ctx.beginPath();
//           ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(0, 255, 242, ${this.opacity})`;
//           ctx.shadowBlur = 10 + this.depth * 15;
//           ctx.shadowColor = `rgba(0, 255, 242, ${this.opacity})`;
//           ctx.fill();
//           ctx.shadowBlur = 0;
//         }
//       }

//       // for (let i = 0; i < 200; i++) particles.push(new Particle());

//       for (let i = 0; i < 320; i++) {
//   particles.push(new Particle());
// }


//       const animate = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         particles.forEach((p) => {
//           p.update();
//           p.draw();
//         });

//         animationFrameId = requestAnimationFrame(animate);
//       };

//       animate();

//       return () => {
//         cancelAnimationFrame(animationFrameId);
//         window.removeEventListener("resize", resizeCanvas);
//       };
//     }, 50);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <section className="hero">
//       <canvas ref={canvasRef} className="hero-canvas" />

//       <div className="hero-content">
//         <div className="heroImg">
//           <img src={HeroImg} alt="Hero" />
//           </div>
//         <h1 className="hero-title">
//           Leading <br />
//           <span className="highlight fade-text">{typedText}</span> <br />
//           Development Company
//         </h1>

//         <p className="hero-subtitle">
//           Transform your operations with innovative software, AI-powered systems <br />
//           and customized ERP solutions designed to scale your business efficiently
//         </p>

//         {/* The ONLY Free Trial button */}
//         <button className="cta-btn" onClick={() => window.openFreeTrialModal()}>
//           Get a Free Quote
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Hero;






// import React, { useEffect, useRef, useState } from "react";
// import "./Hero.css";
// import HeroImg from "../assets/laptop.png";

// const Hero = () => {
//   const canvasRef = useRef(null);

//   const words = ["Website", "Mobile App", "Software", "ERP System"];
//   const [wordIndex, setWordIndex] = useState(0);
//   const [typedText, setTypedText] = useState("");

//   useEffect(() => {
//     let word = words[wordIndex];
//     let i = 0;

//     setTypedText("");

//     const typingInterval = setInterval(() => {
//       setTypedText(word.slice(0, i + 1));
//       i++;
//       if (i === word.length) clearInterval(typingInterval);
//     }, 80);

//     const nextWordTimeout = setTimeout(() => {
//       setTypedText("");
//       setWordIndex((prev) => (prev + 1) % words.length);
//     }, 2800);

//     return () => {
//       clearInterval(typingInterval);
//       clearTimeout(nextWordTimeout);
//     };
//   }, [wordIndex]);

//   /* =====================================================
//      PARTICLE ANIMATION — VISUAL MATCH TO REFERENCE IMAGE
//      (LOGIC STRUCTURE UNCHANGED)
//   ===================================================== */
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");

//     let animationFrameId;
//     let particles = [];

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     class Particle {
//       constructor() {
//         // 🔵 Right-side energy source (near laptop)
//         this.centerX = canvas.width * 0.72;
//         this.centerY = canvas.height * 0.58;

//         // Strong radial clustering
//         const angle = Math.random() * Math.PI * 2;
//         const radius = Math.random() ** 0.25 * canvas.width * 0.42;

//         this.x = this.centerX + Math.cos(angle) * radius;
//         this.y = this.centerY + Math.sin(angle) * radius;

//         // Slow floating motion (space dust)
//         this.vx = (Math.random() - 0.5) * 0.25;
//         this.vy = (Math.random() - 0.5) * 0.25;

//         const dist = Math.hypot(this.x - this.centerX, this.y - this.centerY);
//         this.depth = Math.max(0, 1 - dist / (canvas.width * 0.45));

//         // Visual weight
//         this.radius = 0.8 + this.depth * 4.5;
//         this.opacity = 0.25 + this.depth * 0.85;
//       }

//       update() {
//         this.x += this.vx;
//         this.y += this.vy;

//         // Soft wrap
//         if (this.x > canvas.width) this.x = 0;
//         if (this.x < 0) this.x = canvas.width;
//         if (this.y > canvas.height) this.y = 0;
//         if (this.y < 0) this.y = canvas.height;
//       }

//       draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

//         // ✨ Bright cyan glow like reference
//         ctx.fillStyle = `rgba(120, 210, 255, ${this.opacity})`;
//         ctx.shadowBlur = 18 + this.depth * 45;
//         ctx.shadowColor = `rgba(120, 210, 255, ${this.opacity})`;

//         ctx.fill();
//         ctx.shadowBlur = 0;
//       }
//     }

//     // Higher density like reference
//     const particleCount = window.innerWidth < 768 ? 260 : 700;
//     for (let i = 0; i < particleCount; i++) {
//       particles.push(new Particle());
//     }

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach((p) => {
//         p.update();
//         p.draw();
//       });
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, []);

//   return (
//     <section className="hero">
//       <canvas ref={canvasRef} className="hero-canvas" />

//       <div className="hero-content">
//         <div className="heroImg">
//           <img src={HeroImg} alt="Hero" />
//         </div>

//         <h1 className="hero-title">
//           Leading <br />
//           <span className="highlight fade-text">{typedText}</span> <br />
//           Development Company
//         </h1>

//         <p className="hero-subtitle">
//           Transform your operations with innovative software, AI-powered systems <br />
//           and customized ERP solutions designed to scale your business efficiently
//         </p>

//         <button className="cta-btn" onClick={() => window.openFreeTrialModal()}>
//           Get a Free Quote
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Hero;











import React, { useEffect, useState } from "react";
import "./Hero.css";
import HeroImg from "../assets/laptop.png";
import HeroParticles from "./HeroParticles";

const Hero = () => {
  const words = ["Website", "AI Systems" , "Mobile App", "Software", "ERP System"];
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    const word = words[wordIndex];
    setTypedText("");

    const typing = setInterval(() => {
      setTypedText(word.slice(0, i + 1));
      i++;
      if (i === word.length) clearInterval(typing);
    }, 80);

    const next = setTimeout(
      () => setWordIndex((p) => (p + 1) % words.length),
      2800
    );

    return () => {
      clearInterval(typing);
      clearTimeout(next);
    };
  }, [wordIndex]);

  return (
    <section className="hero">
      <HeroParticles />

      <div className="hero-content">
        <div className="heroImg">
          <img src={HeroImg} alt="ERP Laptop" />
        </div>

        <h1 className="hero-title">
          Industry-focused <br />
          <span className="highlight">{typedText}</span> <br />
          Development Company
        </h1>

        <p className="hero-subtitle">
          Transform your operations with innovative software, AI-powered systems
          <br />
          and customized ERP solutions designed to scale your business efficiently
        </p>

        {/* <button className="cta-btn">Get a Free Quote</button> */}
        <button className="cta-btn" onClick={() => window.openFreeTrialModal()}>
           Get a Free Quote
         </button>
      </div>
    </section>
  );
};

export default Hero;





