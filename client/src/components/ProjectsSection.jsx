import { ArrowRight, ExternalLink, Github, ChevronUp, Star, Code, ChevronDown, MoveRight, Filter, Sparkles, Award, Zap, Play, Eye, Calendar, Users, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";


const categoryColors = {
  "Healthcare SaaS": "from-emerald-500/20 to-teal-600/20 text-emerald-600 border-emerald-500/30",
  "E-commerce": "from-purple-500/20 to-indigo-600/20 text-purple-600 border-purple-500/30",
  "Real-time Communication": "from-blue-500/20 to-cyan-600/20 text-blue-600 border-blue-500/30",
  "Artificial Intelligence": "from-amber-500/20 to-orange-600/20 text-amber-600 border-amber-500/30",
  "FinTech": "from-rose-500/20 to-pink-600/20 text-rose-600 border-rose-500/30",
  "Food Tech": "from-violet-500/20 to-purple-600/20 text-violet-600 border-violet-500/30",
  "HR Tech": "from-orange-500/20 to-red-600/20 text-orange-600 border-orange-500/30"
};

export const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [projects, setProjects] = useState([])


  useEffect(() => {
    fetch('https://api.github.com/users/harveymarshall/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
      })
      .catch(console.error);
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(project =>
        Array.isArray(project.topics) &&
        project.topics.includes(activeFilter)
      );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  const categories = [
    "All",
    ...new Set(
      projects
        .flatMap(project => project.topics)
        .filter(Boolean) // removes '', null, undefined, 0, false
    ),
  ];

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setShowAll(false);
    setIsMobileFilterOpen(false);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      ref={sectionRef}
    >
      {/* Clean Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4" />
            My Projects
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Project
            <span className="block text-primary">Portfolio</span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A collection of projects I've built to showcase my skills in full-stack development and modern web technologies.
          </motion.p>
        </motion.div>

        {/* Simple Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilterChange(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative bg-background border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col">

                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${categoryColors[project.topics[0]]}`}>
                        {project.topics[0]}
                      </span>
                    </div>

                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <motion.div
                          className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 text-xs font-medium border border-amber-500/30"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <Star size={12} className="fill-amber-500" />
                          Featured
                        </motion.div>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.topics.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + tagIndex * 0.05 + 0.4 }}
                          className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-border justify-center">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`inline-flex w-full items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium border transition-all duration-300 ${project.html_url === '#'
                          ? 'bg-muted text-muted-foreground cursor-not-allowed border-border'
                          : 'bg-background text-foreground border-border hover:border-primary hover:bg-primary/5'
                          }`}
                        onClick={(e) => {
                          project.url === '#'
                            ? e.preventDefault()
                            : window.open(project.html_url, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    </div>
                  </div>

                  {/* Accent Border */}
                  <div className={`h-1 bg-gradient-to-r ${project.accentColor}`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {filteredProjects.length > 3 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 ${showAll
                ? "bg-muted text-foreground border border-border"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
            >
              {showAll ? (
                <>
                  <ChevronUp size={18} />
                  Show Less
                </>
              ) : (
                <>
                  View More Projects
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Simple CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-background border border-border rounded-2xl p-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Zap className="h-4 w-4" />
              Get In Touch
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">Like what you see?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              >
                Contact Me
                <ArrowRight size={18} />
              </motion.a>

              <motion.a
                href="https://github.com/harveymarshall"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-medium border border-border text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Github size={18} />
                View GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-background rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedVideo.title} Demo
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedVideo.category}
                  </p>
                </div>
                <motion.button
                  onClick={handleCloseVideo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.video}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onEnded={handleCloseVideo}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-muted-foreground text-sm flex-1">
                    Watch the demo of {selectedVideo.title} in action
                  </p>
                  <div className="flex gap-3">
                    <motion.a
                      href={selectedVideo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedVideo.demoUrl === "#"
                        ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      onClick={(e) => selectedVideo.demoUrl === "#" && e.preventDefault()}
                    >
                      Visit Live Site
                    </motion.a>
                    <motion.a
                      href={selectedVideo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${selectedVideo.githubUrl === "#"
                        ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                        : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/5"
                        }`}
                      onClick={(e) => selectedVideo.githubUrl === "#" && e.preventDefault()}
                    >
                      View Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
