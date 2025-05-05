const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const touristRoutes = require('./routes/touristRoutes');
const guideRoutes = require('./routes/guideRoutes');
const providerRoutes = require('./routes/providerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tourRoutes = require('./routes/tourRoutes');
const activityRoutes = require('./routes/activityRoutes'); 

const cityRoutes = require('./routes/cityRoutes');
const guideProfileRoutes = require('./routes/guideProfileRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const pendingActivitiesRoutes = require('./routes/pendingActivities');

// Use routes
app.use('/api/tourists', touristRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/cities', cityRoutes);
app.use('/api/guideProfile', guideProfileRoutes);

const guideReviewsRoutes = require('./routes/guideReviewsRoutes');
app.use('/api/guideReviews', guideReviewsRoutes);
const providerProfileRoutes = require('./routes/providerProfileRoutes');
app.use('/api/provider-profile', providerProfileRoutes);

const activityProviderReservationRoutes = require('./routes/activityProviderReservationRoutes');
app.use('/api/reservations', activityProviderReservationRoutes);

app.use('/api/admin', adminRoutes); // Use singular `/admin`
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes); // ✅ ADD THIS
app.use('/api/activities', activityRoutes);
app.use('/api/complaints', complaintRoutes);

app.use('/api/activities', activityRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes); // ADD THIS
app.use('/api/pendingActivities', pendingActivitiesRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 Backend server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🟢 Server running on port ${PORT}`));

