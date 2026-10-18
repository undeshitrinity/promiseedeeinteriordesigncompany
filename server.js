const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

const DATA_FILE = path.join(__dirname, 'data.json');

// COMPLETE 40+ MASTER CATALOG
const masterProducts = [
    // Furniture (15)
    { id: 'f1', name: 'Luxury Sofa Set (Royal Velvet)', category: 'furniture', price: 850000, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
    { id: 'f2', name: 'Modern Floating TV Stand Unit', category: 'furniture', price: 220000, img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80' },
    { id: 'f3', name: 'Marble Top Centre Table', category: 'furniture', price: 165000, img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80' },
    { id: 'f4', name: '8-Seater Dining Table & Chairs', category: 'furniture', price: 780000, img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80' },
    { id: 'f5', name: 'King Size Padded Bed Frame', category: 'furniture', price: 420000, img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80' },
    { id: 'f6', name: 'Modern 6-Door Sliding Wardrobe', category: 'furniture', price: 650000, img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=600&q=80' },
    { id: 'f7', name: 'Executive Modern Office Desk', category: 'furniture', price: 290000, img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80' },
    { id: 'f8', name: 'Ergonomic Mesh Office Chair', category: 'furniture', price: 110000, img: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80' },
    { id: 'f9', name: 'Multi-Tier Wooden Shoe Rack', category: 'furniture', price: 75000, img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80' },
    { id: 'f10', name: 'Luxury Entryway Console Table', category: 'furniture', price: 185000, img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80' },
    { id: 'f11', name: 'Modern Bedside Table Nightstand', category: 'furniture', price: 55000, img: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=600&q=80' },
    { id: 'f12', name: 'Hollywood Mirror Dressing Table', category: 'furniture', price: 240000, img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80' },
    { id: 'f13', name: 'Industrial Wooden Bookshelf', category: 'furniture', price: 140000, img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80' },
    { id: 'f14', name: 'Modular High-Gloss Kitchen Cabinet Set', category: 'furniture', price: 1250000, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80' },
    { id: 'f15', name: 'All-Weather Patio Outdoor Furniture', category: 'furniture', price: 480000, img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80' },

    // Lighting (10)
    { id: 'l1', name: 'Grand Crystal Modern Chandelier', category: 'lighting', price: 380000, img: 'https://images.unsplash.com/photo-1543198181-e619b694b11a?auto=format&fit=crop&w=600&q=80' },
    { id: 'l2', name: 'LED Ceiling Spot Lights (Pack of 6)', category: 'lighting', price: 35000, img: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=600&q=80' },
    { id: 'l3', name: 'Nordic Minimalist Pendant Light', category: 'lighting', price: 48000, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
    { id: 'l4', name: 'Luxury Brass Wall Sconce', category: 'lighting', price: 32000, img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80' },
    { id: 'l5', name: 'RGB Smart LED Strip Light (5m)', category: 'lighting', price: 18000, img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80' },
    { id: 'l6', name: 'Ceiling Mounted Decorative Light', category: 'lighting', price: 85000, img: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=600&q=80' },
    { id: 'l7', name: 'Touch Sensor Bedside Table Light', category: 'lighting', price: 25000, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
    { id: 'l8', name: 'Standing Contemporary Floor Lamp', category: 'lighting', price: 65000, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
    { id: 'l9', name: 'Waterproof Outdoor Wall Light', category: 'lighting', price: 28000, img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80' },
    { id: 'l10', name: 'Smart Home Automated Light System', category: 'lighting', price: 220000, img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80' },

    // Curtains & Accessories (8)
    { id: 'c1', name: 'Luxury Velvet Drape Curtain (Set)', category: 'curtains', price: 95000, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 'c2', name: 'White Voile Sheer Curtains', category: 'curtains', price: 35000, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 'c3', name: '100% Thermal Blackout Curtains', category: 'curtains', price: 75000, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 'c4', name: 'Double Metallic Curtain Rod Set', category: 'curtains', price: 22000, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 'c5', name: 'Silent Ceiling Curtain Track', category: 'curtains', price: 18000, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 'c6', name: 'Motorized Automatic Curtain System', category: 'curtains', price: 195000, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 'c7', name: 'Decorative Magnetic Curtain Tiebacks', category: 'curtains', price: 8500, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 'c8', name: 'Custom Zebra Window Blinds', category: 'curtains', price: 42000, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },

    // Rugs & Flooring (7)
    { id: 'r1', name: 'Plush Living Room Area Rug (3x4m)', category: 'rugs', price: 145000, img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80' },
    { id: 'r2', name: 'Soft Microfiber Bedroom Rug', category: 'rugs', price: 65000, img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80' },
    { id: 'r3', name: 'Patterned Hallway Runner Rug', category: 'rugs', price: 45000, img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80' },
    { id: 'r4', name: 'High-Density Artificial Grass (Per Sqm)', category: 'rugs', price: 9500, img: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=600&q=80' },
    { id: 'r5', name: 'Wood-Effect Vinyl Flooring Plank (Sqm)', category: 'rugs', price: 12000, img: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80' },
    { id: 'r6', name: 'Decorative Geometric Floor Tiles (Sqm)', category: 'rugs', price: 18500, img: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80' },
    { id: 'r7', name: 'Non-Slip Staircase Runner Mat', category: 'rugs', price: 38000, img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80' },

    // Wall Decor (8)
    { id: 'w1', name: '3D Geometric Wall Panels (Pack of 12)', category: 'walldecor', price: 48000, img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80' },
    { id: 'w2', name: 'Decorative Wall Moulding Strips Set', category: 'walldecor', price: 32000, img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80' },
    { id: 'w3', name: 'Large Framed Canvas Wall Art', category: 'walldecor', price: 85000, img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80' },
    { id: 'w4', name: 'Gold Sunburst Decorative Wall Mirror', category: 'walldecor', price: 68000, img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80' },
    { id: 'w5', name: 'Modern Oversized Wall Clock', category: 'walldecor', price: 42000, img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80' },
    { id: 'w6', name: 'Decorative PVC Wall Stickers Pack', category: 'walldecor', price: 15000, img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80' },
    { id: 'w7', name: 'Soundproof Acoustic Wall Panels', category: 'walldecor', price: 55000, img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80' },
    { id: 'w8', name: 'Stone Effect Wall Cladding (Per Sqm)', category: 'walldecor', price: 28000, img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80' },

    // POP Ceilings (5)
    { id: 'p1', name: 'Premium POP Cement (50kg Bag)', category: 'pop', price: 10500, img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },
    { id: 'p2', name: 'POP Ceiling Decorative Center Design Mould', category: 'pop', price: 25000, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 'p3', name: 'Decorative POP Cornice (Per Piece)', category: 'pop', price: 4500, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 'p4', name: 'Gypsum Ceiling Access Panel (60x60)', category: 'pop', price: 18000, img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },
    { id: 'p5', name: 'Professional Ceiling Installation Tool Kit', category: 'pop', price: 65000, img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },

    // Promise Eedee Paints (6)
    { id: 'paint1', name: 'Promise Eedee Premium Matt Emulsion (20L)', category: 'paints', price: 68000, img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80' },
    { id: 'paint2', name: 'Promise Eedee Silk Emulsion Paint (20L)', category: 'paints', price: 82000, img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80' },
    { id: 'paint3', name: 'Promise Eedee High Gloss Wood & Metal Paint (4L)', category: 'paints', price: 24000, img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80' },
    { id: 'paint4', name: 'Exterior Weather-Resistant Paint Shield (20L)', category: 'paints', price: 95000, img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80' },
    { id: 'paint5', name: 'Promise Eedee Interior Wall Primer (20L)', category: 'paints', price: 45000, img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80' },
    { id: 'paint6', name: 'Promise Eedee Exterior Heavy Primer (20L)', category: 'paints', price: 52000, img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80' },

    // Bedding (8)
    { id: 'b1', name: 'Orthopedic Memory Foam Mattress (King)', category: 'bedding', price: 320000, img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80' },
    { id: 'b2', name: 'Luxury Cotton Duvet Set with Cover', category: 'bedding', price: 48000, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80' },
    { id: 'b3', name: '100% Egyptian Cotton Bedsheet Set', category: 'bedding', price: 35000, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80' },
    { id: 'b4', name: 'Microfiber Hotel Sleeping Pillows (Pair)', category: 'bedding', price: 22000, img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80' },
    { id: 'b5', name: 'Silk Smooth Pillowcases Set', category: 'bedding', price: 12000, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80' },
    { id: 'b6', name: 'Waterproof Fitted Mattress Protector', category: 'bedding', price: 25000, img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80' },
    { id: 'b7', name: 'Warm Ambient Bedside Table Lamp', category: 'bedding', price: 28000, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
    { id: 'b8', name: 'Decorative Velvet Bedroom Cushions', category: 'bedding', price: 15000, img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80' },

    // Kitchen & Bathroom (7)
    { id: 'kb1', name: 'Stainless Steel Kitchen Organizer Rack', category: 'kitchenbath', price: 38000, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
    { id: 'kb2', name: 'Flexible Pull-Out Kitchen Faucet', category: 'kitchenbath', price: 42000, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
    { id: 'kb3', name: 'LED Smart Anti-Fog Bathroom Mirror', category: 'kitchenbath', price: 85000, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
    { id: 'kb4', name: 'Wall Mounted Bathroom Storage Shelves', category: 'kitchenbath', price: 24000, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
    { id: 'kb5', name: 'Matte Black Towel Rack Rail', category: 'kitchenbath', price: 18000, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
    { id: 'kb6', name: 'High-Pressure Rainfall Shower Head', category: 'kitchenbath', price: 32000, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
    { id: 'kb7', name: 'Automatic Sensor Soap Dispenser', category: 'kitchenbath', price: 16000, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },

    // Smart Home Deals (3)
    { id: 'aff1', name: 'Smart Air Fryer & Multi-Cooker', category: 'affiliate', price: 78000, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80' },
    { id: 'aff2', name: 'Smart Home Hub & Voice Assistant', category: 'affiliate', price: 45000, img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80' },
    { id: 'aff3', name: 'Compact Espresso Coffee Machine', category: 'affiliate', price: 110000, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80' }
];

const masterServices = [
    { id: 's1', title: 'Full Interior Design Service', category: 'interior', desc: 'Complete end-to-end interior planning, furniture arrangement, and spatial styling.' },
    { id: 's2', title: '3D Interior Visualization', category: 'interior', desc: 'Photorealistic 3D architectural renders of your space before purchasing materials.' },
    { id: 's3', title: 'POP Ceiling Design & Installation', category: 'pop', desc: 'Bespoke POP cornices, ceiling access panels, LED troughs, and modern designs.' },
    { id: 's4', title: 'Living Room & Bedroom Design', category: 'interior', desc: 'Tailored luxury lounge setup, wall paneling, acoustic panels, and mood lighting.' },
    { id: 's5', title: 'Professional Painting Services', category: 'painting', desc: 'Expert application of Promise Eedee paints, primers, and exterior weather coats.' },
    { id: 's6', title: 'Renovation & Colour Consultation', category: 'painting', desc: 'On-site technical consultation, material sourcing, and maintenance works.' }
];

function initializeDB() {
  let db = { products: masterProducts, services: masterServices, orders: [], consultations: [] };
  if (fs.existsSync(DATA_FILE)) {
    try {
      const fileData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      db.orders = fileData.orders || [];
      db.consultations = fileData.consultations || [];
      
      // Merge all master products ensuring custom prices/images are kept
      db.products = masterProducts.map(master => {
        const existing = (fileData.products || []).find(p => p.id === master.id);
        return existing ? existing : master;
      });
    } catch (err) {
      console.log('Error reading DB, resetting to default.');
    }
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
  return db;
}

let dbCache = initializeDB();

function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (err) {
    return dbCache;
  }
}

function writeDB(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: db.products.length, data: db.products });
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { price, img, name } = req.body;

  const db = readDB();
  const productIndex = db.products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  if (price !== undefined) db.products[productIndex].price = Number(price);
  if (img) db.products[productIndex].img = img;
  if (name) db.products[productIndex].name = name;

  writeDB(db);

  res.json({ success: true, message: 'Product updated successfully', product: db.products[productIndex] });
});

// DELETE Product by ID
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();

  const productIndex = db.products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Remove product from array
  db.products.splice(productIndex, 1);
  writeDB(db);

  res.json({ success: true, message: 'Product deleted successfully' });
});

// POST Add New Product
app.post('/api/products', (req, res) => {
  const { name, category, price, img } = req.body;

  if (!name || !category || price === undefined || !img) {
    return res.status(400).json({ success: false, message: 'Please provide name, category, price, and image URL' });
  }

  const db = readDB();
  const newProduct = {
    id: 'prod-' + Date.now(),
    name,
    category,
    price: Number(price),
    img
  };

  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json({
    success: true,
    message: 'Product added successfully',
    product: newProduct
  });
});

app.get('/api/admin/data', (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    products: db.products || [],
    services: db.services || [],
    orders: db.orders || [],
    consultations: db.consultations || [],
    totalRevenue: (db.orders || []).reduce((sum, o) => sum + (o.totalAmount || 0), 0)
  });
});

app.post('/api/orders', (req, res) => {
  const { customerName, address, notes, items, totalAmount } = req.body;
  if (!customerName || !address || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing order details' });
  }

  const db = readDB();
  const newOrder = {
    id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    customerName,
    address,
    notes: notes || '',
    items,
    totalAmount,
    status: 'Pending WhatsApp Confirmation',
    createdAt: new Date().toISOString()
  };

  db.orders.push(newOrder);
  writeDB(db);

  let whatsappMsg = `*NEW ORDER #${newOrder.id} - PROMISEEDEE INTERIOR DESIGN*\n`;
  whatsappMsg += `-----------------------------------\n`;
  whatsappMsg += `*Customer:* ${customerName}\n*Address:* ${address}\n`;
  items.forEach((item, i) => {
    whatsappMsg += `${i + 1}. ${item.name} (x${item.qty}) - ₦${(item.price * item.qty).toLocaleString()}\n`;
  });
  whatsappMsg += `-----------------------------------\n*TOTAL:* ₦${totalAmount.toLocaleString()}\n`;

  const waUrl = `https://wa.me/2348107974034?text=${encodeURIComponent(whatsappMsg)}`;
  res.status(201).json({ success: true, orderId: newOrder.id, whatsappUrl: waUrl });
});

app.post('/api/consultations', (req, res) => {
  const { serviceType, name, phone, email, location, details } = req.body;
  if (!serviceType || !name || !phone || !location) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const db = readDB();
  const newBooking = {
    id: 'CNS-' + Math.floor(100000 + Math.random() * 900000),
    serviceType,
    name,
    phone,
    email: email || '',
    location,
    details: details || '',
    createdAt: new Date().toISOString()
  };

  db.consultations.push(newBooking);
  writeDB(db);

  let whatsappMsg = `*CONSULTATION INQUIRY #${newBooking.id}*\n*Service:* ${serviceType}\n*Client:* ${name}\n*Phone:* ${phone}\n*Location:* ${location}\n`;
  const waUrl = `https://wa.me/2348107974034?text=${encodeURIComponent(whatsappMsg)}`;

  res.status(201).json({ success: true, bookingId: newBooking.id, whatsappUrl: waUrl });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔑 Admin Portal: http://localhost:${PORT}/admin`);
});