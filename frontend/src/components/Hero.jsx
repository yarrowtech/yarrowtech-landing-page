

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Hero.css";

// const Hero = () => {
//   const canvasRef = useRef(null);
//   const [wordIndex, setWordIndex] = useState(0);
//   const words = ["Website", "Mobile App", "Software", "ERP System"];
//   const navigate = useNavigate();

//   /* Smooth Word Rotation */
//   // useEffect(() => {
//   //   const fadeOut = setTimeout(() => {
//   //     document.querySelector(".fade-text").classList.add("hidden");
//   //   }, 2500);

//   //   const fadeIn = setTimeout(() => {
//   //     setWordIndex((prev) => (prev + 1) % words.length);
//   //     document.querySelector(".fade-text").classList.remove("hidden");
//   //   }, 2600);

//   //   return () => {
//   //     clearTimeout(fadeOut);
//   //     clearTimeout(fadeIn);
//   //   };
//   // }, [wordIndex]);



//   /* Smooth Word Rotation */
// useEffect(() => {
//   const fadeText = document.querySelector(".fade-text");

//   // Fade OUT
//   fadeText.classList.add("fade-out");

//   const t1 = setTimeout(() => {
//     setWordIndex((prev) => (prev + 1) % words.length);
//   }, 400);

//   // Fade IN
//   const t2 = setTimeout(() => {
//     fadeText.classList.remove("fade-out");
//   }, 450);

//   return () => {
//     clearTimeout(t1);
//     clearTimeout(t2);
//   };
// }, [wordIndex]);


//   /* Canvas Animation (Improved Stability) */
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

//         // Optimized connection logic
//         for (let i = 0; i < particles.length; i++) {
//           for (let j = i + 1; j < i + 40 && j < particles.length; j++) {
//             const dx = particles[i].x - particles[j].x;
//             const dy = particles[i].y - particles[j].y;
//             const dist = Math.sqrt(dx * dx + dy * dy);

//             if (dist < 150) {
//               ctx.beginPath();
//               ctx.moveTo(particles[i].x, particles[i].y);
//               ctx.lineTo(particles[j].x, particles[j].y);
//               const opacity = (1 - dist / 150) * 0.6;
//               ctx.strokeStyle = `rgba(0, 206, 209, ${opacity})`;
//               ctx.lineWidth = 0.5;
//               ctx.stroke();
//             }
//           }
//         }

//         animationFrameId = requestAnimationFrame(animate);
//       };

//       animate();

//       return () => {
//         cancelAnimationFrame(animationFrameId);
//         window.removeEventListener("resize", resizeCanvas);
//       };
//     }, 50); // Important delay!

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <section className="hero">
//       <canvas ref={canvasRef} className="hero-canvas" />
//       <div className="hero-content">
//         <h1 className="hero-title">
//           Leading <br />
//           <span className="highlight fade-text">{words[wordIndex]}</span> <br />
//           Development Company
//         </h1>

//         <p className="hero-subtitle">
//           Transform your operations with innovative software, AI-powered systems <br />
//           and customized ERP solutions designed to scale your business efficiently
//         </p>

//         <a href="#products" className="cta-btn" id="cta1">
//           See Our Works
//         </a>
//       </div>
//     </section>
//   );
// };

// export default Hero;



















import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const canvasRef = useRef(null);

  /* Words */
  const words = ["Website", "Mobile App", "Software", "ERP System"];
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  /* Typing Animation */
  useEffect(() => {
    let word = words[wordIndex];
    let i = 0;

    setTypedText("");

    const typingInterval = setInterval(() => {
      setTypedText(word.slice(0, i + 1));
      i++;

      if (i === word.length) clearInterval(typingInterval);
    }, 80);

    // Fade-out + next word
    const nextWordTimeout = setTimeout(() => {
      setTypedText("");
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(nextWordTimeout);
    };
  }, [wordIndex]);

  /* Canvas Animation (same as yours, unchanged) */
  useEffect(() => {
    const timeout = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let animationFrameId;
      let particles = [];

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      class Particle {
        constructor() {
          this.x = canvas.width * 0.4 + Math.random() * canvas.width * 0.6;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
          this.depth = Math.random();
          this.radius = this.depth * 3 + 1.5;
          this.opacity = this.depth * 0.8 + 0.2;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < canvas.width * 0.4 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 242, ${this.opacity})`;
          ctx.shadowBlur = 10 + this.depth * 15;
          ctx.shadowColor = `rgba(0, 255, 242, ${this.opacity})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      for (let i = 0; i < 200; i++) particles.push(new Particle());

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.update();
          p.draw();
        });

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < i + 40 && j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              const opacity = (1 - dist / 150) * 0.6;
              ctx.strokeStyle = `rgba(0, 206, 209, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", resizeCanvas);
      };
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content">
        <h1 className="hero-title">
          Leading <br />
          <span className="highlight fade-text">{typedText}</span> <br />
          Development Company
        </h1>

        <p className="hero-subtitle">
          Transform your operations with innovative software, AI-powered systems <br />
          and customized ERP solutions designed to scale your business efficiently
        </p>

        <a href="#products" className="cta-btn" id="cta1">
          See Our Works
        </a>
      </div>
    </section>
  );
};

export default Hero;

