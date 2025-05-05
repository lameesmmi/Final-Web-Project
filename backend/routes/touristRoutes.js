const express = require('express');
const router = express.Router();

const {
  createTourist,
  getTourists,
  loginTourist, 
  getTouristPlan, 
  addToPlan, 
  removeActivityFromPlan, 
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  updateTouristStatus,
  deleteTourist
} = require('../controllers/touristController');


router.post('/login', loginTourist);

// POST /api/tourists
router.post('/', createTourist);

// GET /api/tourists
router.get('/', getTourists);

 // Add to plan
router.post('/:id/add-plan', addToPlan);

// View plan
router.get('/:id/myplan', getTouristPlan); 

router.get('/username/:username', async (req, res) => {
  try {
    const tourist = await Tourist.findOne({ username: req.params.username });
    if (!tourist) return res.status(404).json({ message: 'Tourist not found' });
    res.json(tourist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove activity from plan

router.delete('/:id/myplan/:activityId', removeActivityFromPlan);


// Wishlist routes
router.get('/:id/wishlist', getWishlist);
router.post('/:id/wishlist', addToWishlist);
router.delete('/:id/wishlist/:activityId', removeFromWishlist);

// user management routes
router.patch('/:id/status', updateTouristStatus);
router.delete('/:id', deleteTourist);


module.exports = router;
