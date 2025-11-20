// import React from "react";
// import "./about.css";
// // import teamImg from "../assets/about/team.svg"; 

// export default function AboutUs() {
//   const values = [
//     {
//       title: "Innovation",
//       desc: "We embrace creativity and cutting-edge technologies to deliver future-ready digital products.",
//     },
//     {
//       title: "Integrity",
//       desc: "Transparency and trust are at the heart of our client relationships and team culture.",
//     },
//     {
//       title: "Excellence",
//       desc: "We strive for pixel-perfect design and robust functionality in everything we create.",
//     },
//     {
//       title: "Collaboration",
//       desc: "We believe in teamwork, both within our company and with our clients, for shared success.",
//     },
//   ];

//   return (
//     <section id="about" className="about-section">
//       <div className="container">
//         <div className="about-grid">
//           <div className="about-text">
//             <h2 className="title">About Us</h2>
//             <p className="desc">
//               At <span className="highlight">YarrowTech</span>, we are a team of
//               passionate developers, designers, and innovators committed to
//               crafting powerful digital solutions. Our mission is to help
//               businesses grow through technology that’s both intelligent and
//               intuitive.
//             </p>

//             <p className="desc">
//               From building responsive web applications to enterprise-grade ERP
//               systems, we bring your vision to life with a focus on scalability,
//               design, and performance.
//             </p>

//             <button className="contact-btn">Get in Touch</button>
//           </div>

//           <div className="about-image">
//             {/* <img src={teamImg} alt="YarrowTech Team" /> */}
//           </div>
//         </div>

//         <div className="values-section">
//           <h3 className="values-title">Our Core Values</h3>
//           <div className="values-grid">
//             {values.map((v, i) => (
//               <div className="value-card" key={i}>
//                 <h4>{v.title}</h4>
//                 <p>{v.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





import React from "react";
import "./about.css";
// import teamImg from "../assets/about/team.svg"; 

export default function AboutUs() {
  const values = [
    {
      title: "Innovation that Drives Growth",
      desc: "We believe in innovation with purpose — building modern, scalable, and future-ready software that helps our clients stay ahead in a competitive digital world.",
    },
    {
      title: "Client-Centric Approach",
      desc: "Every solution we design begins with understanding your business. We focus on creating customized, user-friendly, and result-oriented software that meets real-world needs."

    },
    {
      title: "Quality & Reliability",
      desc: "We never compromise on quality. Every project is developed, tested, and delivered with precision to ensure high performance, security, and reliability.",
    },
    {
      title: "Transparency & Trust",
      desc: "We maintain open communication and complete transparency throughout every stage of development, ensuring long-term partnerships built on trust."
    ,
    },
    {
      title: "Future-Focused Technology",
      desc: "From cloud computing, AI, and IoT to data analytics, we leverage the latest tech to future-proof your business operations."
    ,
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="title">About Us</h2>
            <p className="desc">
              At <span className="highlight">YarrowTech</span>, we are a next-generation software development company
               committed to turning technology into a business advantage.
               From custom software development and enterprise resource planning (ERP) systems 
               to AI-driven applications, web & mobile app development, and digital transformation solutions, we help organizations
               streamline processes, enhance productivity, and grow faster.
            </p>

            <p className="desc last-para">
              With a passionate team of developers, designers, and strategists, Yarrowtech combines innovation,
               intelligence, and integrity to deliver end-to-end technology 
               solutions for every business size — startups to enterprises.

            </p>
          </div>

          <div className="about-image">
            {/* <img src={teamImg} alt="YarrowTech Team" /> */}
          </div>
        </div>

        <div className="values-section">
          <h3 className="values-title">Our Core Values</h3>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

