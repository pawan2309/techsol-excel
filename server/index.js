const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Sample route for services
app.get('/api/services', (req, res) => {
  const services = [
    { id: 1, title: 'Web & App Development', icon: 'Layout' },
    { id: 2, title: 'Payment Integration', icon: 'CreditCard' },
    { id: 3, title: 'Cloud & Scalability', icon: 'Cloud' },
    { id: 4, title: 'AI Automation', icon: 'Cpu' },
    { id: 5, title: 'API Development', icon: 'Server' },
    { id: 6, title: 'DevOps Solutions', icon: 'Settings' },
    { id: 7, title: 'Cybersecurity', icon: 'Shield' },
    { id: 8, title: 'Pharma Publishing', icon: 'FileText' }
  ];
  res.json(services);
});

// Contact Lead Enrollment
app.post('/api/contact', (req, res) => {
  const { name, email, company, message, service } = req.body;
  console.log('New Lead Received:', { name, email, company, message, service });
  
  // In a real scenario, we would save to PostgreSQL/Prisma here.
  res.status(201).json({ 
    success: true, 
    message: 'Thank you! Your inquiry has been received by the techsol team.' 
  });
});

app.listen(PORT, () => {
  console.log(`techsol Backend running on http://localhost:${PORT}`);
});
