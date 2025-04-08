const express = require('express');
const shortid = require('shortid');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory database for demo purposes
const links = new Map();

// Generate new tracking link
app.post('/api/links', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    
    // Validate URL format
    if (!originalUrl.match(/^https?:\/\//)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const shortCode = shortid.generate();
    
    links.set(shortCode, {
      shortCode,
      originalUrl,
      clicks: []
    });

    res.json({ shortCode });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate tracking link' });
  }
});

// Track link visit and capture location
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = links.get(shortCode);

    if (link) {
      // Real geolocation API call (replace with your preferred service)
      let locationData = {
        latitude: 0,
        longitude: 0,
        city: "Unknown",
        country: "Unknown"
      };

      try {
        const geoResponse = await fetch(`https://ipapi.co/${req.ip}/json/`);
        const geoData = await geoResponse.json();
        locationData = {
          latitude: geoData.latitude,
          longitude: geoData.longitude,
          city: geoData.city,
          country: geoData.country_name
        };
      } catch (error) {
        console.error('Geolocation error:', error);
      }
      
      link.clicks.push({
        timestamp: new Date(),
        location: locationData,
        ipAddress: req.ip
      });

      res.redirect(link.originalUrl);
    } else {
      res.status(404).send('Link not found');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Tracking error');
  }
});

// Get link stats
app.get('/api/links/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = links.get(shortCode);
    res.json(link || { error: 'Link not found' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get link stats' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
