// import React from 'react'
// import './expertise.css'

// // Import your logos (place them in src/assets/tools/)
// // import reactLogo from '../assets/tools/react.svg'
// // import nextLogo from '../assets/tools/nextjs.svg'
// // import tailwindLogo from '../assets/tools/tailwind.svg'
// // import nodeLogo from '../assets/tools/node.svg'
// // import expressLogo from '../assets/tools/express.svg'
// // import mongoLogo from '../assets/tools/mongo.svg'
// // import mysqlLogo from '../assets/tools/mysql.svg'
// // import awsLogo from '../assets/tools/aws.svg'
// // import dockerLogo from '../assets/tools/docker.svg'
// // import githubLogo from '../assets/tools/github.svg'
// // import figmaLogo from '../assets/tools/figma.svg'
// // import xdLogo from '../assets/tools/xd.svg'

// const reactLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
// const nextLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
// const tailwindLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
// const nodeLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
// const expressLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
// const mongoLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
// const mysqlLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
// const awsLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";
// const dockerLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
// const githubLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
// const figmaLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
// const xdLogo = "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg"


// export default function ExpertisePage() {
//   const expertise = [
//     {
//       title: 'Frontend Development',
//       tools: [
//         { name: 'React', logo: reactLogo },
//         { name: 'Next.js', logo: nextLogo },
//         { name: 'Tailwind CSS', logo: tailwindLogo },
//       ],
//     },
//     {
//       title: 'Backend Engineering',
//       tools: [
//         { name: 'Node.js', logo: nodeLogo },
//         { name: 'Express.js', logo: expressLogo },
//       ],
//     },
//     {
//       title: 'Database Systems',
//       tools: [
//         { name: 'MongoDB', logo: mongoLogo },
//         { name: 'MySQL', logo: mysqlLogo },
//       ],
//     },
//     {
//       title: 'Cloud & DevOps',
//       tools: [
//         { name: 'AWS', logo: awsLogo },
//         { name: 'Docker', logo: dockerLogo },
//         { name: 'GitHub', logo: githubLogo },
//       ],
//     },
//     {
//       title: 'UI/UX & Design',
//       tools: [
//         { name: 'Figma', logo: figmaLogo },
//         { name: 'Adobe XD', logo: xdLogo },
//       ],
//     },
//   ]

//   return (
//     <section id='expertise' className="expertise-section">
//       <div className="container">
//         <h2 className="title">Our Expertise</h2>
//         <p className="subtitle">
//           The technologies and tools that power our innovation and creativity.
//         </p>

//         <div className="expertise-grid">
//           {expertise.map((category, index) => (
//             <div key={index} className="expertise-card">
//               <h3 className="category-title">{category.title}</h3>
//               <div className="tools-grid">
//                 {category.tools.map((tool, idx) => (
//                   <div className="tool-box" key={idx}>
//                     <img
//                       src={tool.logo}
//                       alt={tool.name}
//                       className="tool-logo"
//                     />
//                     <p className="tool-name">{tool.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }










import React from 'react'
import './expertise.css'

// Icons from CDN
const reactLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
const nextLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
const tailwindLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"

const angularLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"
const vueLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
const jsLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
const bootstrapLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"

const nodeLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
const expressLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
const djangoLogo = "https://w7.pngwing.com/pngs/10/113/png-transparent-django-web-development-web-framework-python-software-framework-django-text-trademark-logo-thumbnail.png"
const flaskLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg"

const mongoLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
const mysqlLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
const firebaseLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
const postgresLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"

const awsLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
const dockerLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
const githubLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"

const figmaLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
const xdLogo = "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg"

const flutterLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
const kotlinLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"
const reactNativeLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
const swiftLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg"

export default function ExpertisePage() {
  const expertise = [
    {
      title: 'Frontend Development',
      tools: [
        { name: 'React', logo: reactLogo },
        { name: 'Next.js', logo: nextLogo },
        { name: 'Tailwind CSS', logo: tailwindLogo },
        { name: 'Angular', logo: angularLogo },
        { name: 'Vue.js', logo: vueLogo },
        { name: 'JavaScript', logo: jsLogo },
        { name: 'Bootstrap', logo: bootstrapLogo },
      ],
    },
    {
      title: 'Backend Engineering',
      tools: [
        { name: 'Node.js', logo: nodeLogo },
        { name: 'Express.js', logo: expressLogo },
        { name: 'Django', logo: djangoLogo },
        { name: 'Flask', logo: flaskLogo },
      ],
    },
    {
      title: 'App Development',
      tools: [
        { name: 'Flutter', logo: flutterLogo },
        { name: 'Kotlin', logo: kotlinLogo },
        { name: 'React Native', logo: reactNativeLogo },
        { name: 'Swift', logo: swiftLogo },
      ],
    },
    {
      title: 'Database Systems',
      tools: [
        { name: 'MongoDB', logo: mongoLogo },
        { name: 'MySQL', logo: mysqlLogo },
        { name: 'Firebase', logo: firebaseLogo },
        { name: 'PostgreSQL', logo: postgresLogo },
      ],
    },
    {
      title: 'Cloud & DevOps',
      tools: [
        { name: 'AWS', logo: awsLogo },
        { name: 'Docker', logo: dockerLogo },
        { name: 'GitHub', logo: githubLogo },
      ],
    },
    {
      title: 'UI/UX & Design',
      tools: [
        { name: 'Figma', logo: figmaLogo },
        { name: 'Adobe XD', logo: xdLogo },
      ],
    },
  ]

  return (
    <section id='expertise' className="expertise-section">
      <div className="container">
        <h2 className="title">Our Expertise</h2>
        <p className="subtitle">
          The technologies and tools that power our innovation and creativity.
        </p>

        <div className="expertise-grid">
          {expertise.map((category, index) => (
            <div key={index} className="expertise-card">
              <h3 className="category-title">{category.title}</h3>

              <div className="tools-grid">
                {category.tools.map((tool, idx) => (
                  <div className="tool-box" key={idx}>
                    <img src={tool.logo} alt={tool.name} className="tool-logo" />
                    <p className="tool-name">{tool.name}</p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
