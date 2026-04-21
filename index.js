const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with cart management, Stripe payment integration, order tracking, and a powerful admin dashboard.',
    tech: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: true,
    year: 2024
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A Kanban-style task management application with drag-and-drop, team collaboration, and real-time updates via WebSockets.',
    tech: ['Angular', 'Node.js', 'Socket.io', 'PostgreSQL'],
    category: 'Full Stack',
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: true,
    year: 2024
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with 7-day forecast, interactive charts, geolocation support, and unit toggling.',
    tech: ['Angular', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    category: 'Frontend',
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: false,
    year: 2023
  },
  {
    id: 4,
    title: 'REST API Boilerplate',
    description: 'A production-ready Node.js REST API boilerplate with JWT auth, rate limiting, input validation, and Swagger docs.',
    tech: ['Node.js', 'Express', 'JWT', 'MongoDB'],
    category: 'Backend',
    github: 'https://github.com',
    live: null,
    featured: false,
    year: 2023
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'A modern animated portfolio website with Angular frontend, Node.js backend API, and glassmorphism design.',
    tech: ['Angular', 'Node.js', 'Express', 'CSS Animations'],
    category: 'Full Stack',
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: true,
    year: 2024
  },
  {
    id: 6,
    title: 'Blog Platform',
    description: 'A full-featured blogging platform with markdown editor, categories, comments system, and SEO optimization.',
    tech: ['Angular', 'Node.js', 'MongoDB', 'Marked.js'],
    category: 'Full Stack',
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: false,
    year: 2023
  }
];

const skills = [
  { category: 'Frontend', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'RxJS'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'WebSockets'] },
  { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Postman'] }
];

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET all projects (optional ?category= & ?featured=true filters)
app.get('/api/projects', (req, res) => {
  const { category, featured } = req.query;
  let result = [...projects];

  if (category && category !== 'All') {
    result = result.filter(p => p.category === category);
  }
  if (featured === 'true') {
    result = result.filter(p => p.featured);
  }

  res.json({ success: true, count: result.length, data: result });
});

// GET single project by ID
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.json({ success: true, data: project });
});

// GET skills
app.get('/api/skills', (req, res) => {
  res.json({ success: true, data: skills });
});

// POST contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  console.log('\n📧 New Contact Form Submission:');
  console.log('─'.repeat(40));
  console.log(`  Name   : ${name}`);
  console.log(`  Email  : ${email}`);
  console.log(`  Message: ${message}`);
  console.log('─'.repeat(40) + '\n');

  res.json({
    success: true,
    message: `Thanks ${name}! Your message has been received. I'll get back to you at ${email} soon! 🚀`
  });
});

// GET health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Portfolio API is running!', timestamp: new Date().toISOString() });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio Server → http://localhost:${PORT}`);
  console.log(`📋 Available Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/projects`);
  console.log(`   GET  /api/projects/:id`);
  console.log(`   GET  /api/skills`);
  console.log(`   POST /api/contact\n`);
});
