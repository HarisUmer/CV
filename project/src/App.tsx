import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, Menu, X, ExternalLink, ChevronDown, ChevronUp, Github } from 'lucide-react';

// Projects data (images selected via web search for relevant visuals)
const projects = [
  {
    title: "AI-Powered Comic Generator",
    description: "Developed a fine-tuned SDXL model integrating IP-Adapter, ControlNet, and Transformer-based techniques to generate comics with customizable character styling, pose control, and expression manipulation.",
    technologies: ["Deep Learning", "Transformers", "SDXL" , "ControlNet" , "Lang Graph"],
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDdiemlkc3I5OHF1N2djMnJqd2treGdvbnc5dTUzbmFtcjB0aXY4diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pVWuLuV1JESZJdebkI/giphy.gif",
    link: "#"
  },
  {
    title: "Studify",
    description: "Android app in Java/Kotlin with Firebase; features Group Chat conference calls, video calls, screen sharing, and gesture-based drawing.",
    technologies: ["Java", "Kotlin", "Firebase" ,"Agora"],
    image: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHE1NmtmdGtkMmxhcTZ3enYxcWFncmdmdmF6dmFkaHk1cGpvdG90ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/O3B7Qhx5OHaKr62wpe/giphy.gif",
    link: "#"
  },
  {
    title: "Character Bot",
    description: "Audio Chatbot using prompt engineering and Retrieval-Augmented Generation (RAG) to incorporate user-defined character traits and maintain conversation memory. Audio Conversation for better intraction",
    technologies: ["Python", "LLMs", "RAG" , "LlamaIndex", "whisper"],
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGdkZ2RkZ2hsaWxkamt3NWFyamQ2bjc2bnZ6Y2hqZTFkZXV3cjhuciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/S60CrN9iMxFlyp7uM8/giphy.gif",
    link: "#"
  },
  {
    title: "Gesture Recognition Model",
    description: "ML model using CNN and RandomForestClassifier for gesture detection, integrated within the Studify app.",
    technologies: ["CNN", "RandomForest", "Python"],
    image: "https://www.unite.ai/wp-content/uploads/2021/12/Screen-Shot-2021-12-28-at-4.27.52-PM.jpg",
    link: "#"
  },
  {
    title: "DocReader Bot",
    description: "Read text documents (pdf,docx) and cleans data using LLMs to reduce noise. ",
    technologies: ["LLMs", "Python", "OCR", "LlamaParser" , "langchain"],
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWJmcnQyNm93M3R6Y2Z6emU4MDU3cjl3a2w0emkxNWFoeWNxbXRhYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QdX8FM4rppAkM/giphy.gif",
    link: "#"
  },
  {
    title: "CRUD Web App",
    description: "React-based application integrating APIs with AWS Lambda for serverless backend processing.",
    technologies: ["React", "AWS Lambda", "API Integration"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/1024px-Amazon_Lambda_architecture_logo.svg.png",
    link: "#"
  },
  {
    title: "F1 Racing Game",
    description: "Racing game created using Assembly language, showcasing low-level programming skills with functionalities like player control and collision detection.",
    technologies: ["Assembly"],
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjE4OWNtbWx0dHc2MXpmdndnNWZiNHphdHpoN2dwY2RjOGE2d2VzeSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qDQj6tO9V3Fas7fkkP/giphy.gif",
    link: "#"
  }
];

// Skills data (adapted from Haris Umer’s CV)
const skills = [
  {
    category: "Programming & Frameworks",
    items: ["C++", "C#", "Java", "Kotlin", "Python", "React", "JavaScript", ".NET"]
  },
  {
    category: "Machine Learning & AI",
    items: ["LLMs", "Transformers", "Deep Learning (RNNs, CNNs)", "TensorFlow", "PyTorch", "LangChain", "LangGraph", "LlamaIndex"]
  },
  {
    category: "Cloud & Backend",
    items: ["AWS Lambda", "API Integration", "Serverless Architecture"]
  },
  {
    category: "Data & Tools",
    items: ["Data Extraction", "Embeddings", "Tokenization", "Feature Extraction", "Data Visualization", "Multimodal Control"]
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [expandedSkills, setExpandedSkills] = useState([]);

  // Handle scroll and set active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSkillCategory = (category) => {
    setExpandedSkills(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Space background with stars */}
      <div className="fixed inset-0 bg-black z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40"></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Haris Umer
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm uppercase tracking-wider hover:text-purple-400 transition-colors ${
                  activeSection === section ? 'text-purple-400 font-semibold' : 'text-gray-300'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
          
          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm uppercase tracking-wider py-2 hover:text-purple-400 transition-colors ${
                    activeSection === section ? 'text-purple-400 font-semibold' : 'text-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400">
              Haris Umer
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
              Aspiring AI & ML Engineer | CS Student at FAST-NUCES Lahore
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Hello, I’m Haris Umer—a determined and innovative Computer Science student at FAST-NUCES, Lahore. With a robust foundation in programming, competitive coding, and problem-solving, I am passionate about leveraging machine learning, deep learning, and Gen-AI to create cutting-edge tech solutions. My journey is fueled by curiosity and a drive to push the boundaries of technology, whether it's developing intelligent chatbots, building intuitive web applications, or exploring the intricacies of AI. I’m always excited to collaborate on projects that challenge conventional thinking and bring transformative ideas to life.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#contact" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity">
                Contact Me
              </a>
              <a href="#projects" className="px-6 py-3 border border-purple-500 rounded-full text-purple-400 font-medium hover:bg-purple-500 hover:bg-opacity-20 transition-all">
                View Projects
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-lg overflow-hidden shadow-xl shadow-purple-900/20">
                <img 
                  src="https://i.postimg.cc/Ss6hVP6S/Profile.jpg" 
                  alt="Haris Umer" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-300">My Journey</h3>
                <p className="text-gray-300 mb-4">
                  I’m currently Fresh Graduate of BS in Computer Science from FAST-NUCES, Lahore, and previously completed my Intermediate (ICS) from Punjab Group of Colleges. My passion for technology is fueled by a strong foundation in programming, competitive coding, and a deep interest in AI.
                </p>
                <p className="text-gray-300 mb-6">
                  During my recent internship as an AI/ML intern at BitPix-Soft, I gained hands-on experience with LLMs, chatbots, and Retrieval-Augmented Generation (RAG), further fueling my drive to innovate.
                </p>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com/in/harisumer1124" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="mailto:harisumer58@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 bg-black bg-opacity-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Projects & Experience
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-900 bg-opacity-80 rounded-lg overflow-hidden shadow-lg shadow-purple-900/20 hover:shadow-purple-700/30 transition-all hover:translate-y-[-5px]">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-purple-300">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 text-xs bg-purple-900 bg-opacity-50 rounded-full text-purple-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300"
                    >
                      View Project <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Skills & Expertise
            </h2>
            <div className="space-y-6">
              {skills.map((skillCategory) => (
                <div 
                  key={skillCategory.category} 
                  className="bg-gray-900 bg-opacity-80 rounded-lg p-6 shadow-lg shadow-purple-900/20"
                >
                  <button 
                    className="w-full flex justify-between items-center text-xl font-semibold text-purple-300 mb-2"
                    onClick={() => toggleSkillCategory(skillCategory.category)}
                  >
                    {skillCategory.category}
                    {expandedSkills.includes(skillCategory.category) ? 
                      <ChevronUp size={20} /> : 
                      <ChevronDown size={20} />
                    }
                  </button>
                  
                  {expandedSkills.includes(skillCategory.category) && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {skillCategory.items.map((skill, index) => (
                        <div 
                          key={index} 
                          className="px-4 py-2 bg-purple-900 bg-opacity-30 rounded-md text-center text-purple-200"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-black bg-opacity-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-300">Contact Information</h3>
                <p className="text-gray-300 mb-6">
                  I’m available for freelance work and exciting tech opportunities. Feel free to reach out if you’d like to discuss a project or simply connect.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="text-purple-400 mr-3" size={20} />
                    <a href="mailto:harisumer58@gmail.com" className="text-gray-300 hover:text-purple-300 transition-colors">
                      harisumer58@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="text-purple-400 mr-3" size={20} />
                    <a href="https://linkedin.com/in/harisumer1124" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-300 transition-colors">
                      linkedin.com/in/harisumer1124
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Github className="text-purple-400 mr-3" size={20} />
                    <a href="https://github.com/HarisUmer" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-300 transition-colors">
                      github.com/HarisUmer
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-400 mr-3 text-lg">📞</span>
                    <span className="text-gray-300">(+92) 31242607214</span>
                  </div>
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black bg-opacity-80 py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4 md:mb-0">
              Haris Umer
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://linkedin.com/in/harisumer1124" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/HarisUmer" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="mailto:harisumer58@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
