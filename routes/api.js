'use strict';

const fetch = require('node-fetch');
const crypto = require('crypto');

// In-memory storage for likes (use MongoDB in production)
const stockLikes = new Map();
const ipLikes = new Map();

// Anonymize IP address
function anonymizeIP(ip) {
  // Remove port if present
  ip = ip.split(':')[0];
  // Hash the IP using SHA-256 and take first 16 chars
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

// Get stock price from proxy
async function getStockPrice(stock) {
  try {
    const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);
    const data = await response.json();
    return data.latestPrice || null;
  } catch (err) {
    return null;
  }
}

module.exports = function(app) {
  
  app.route('/api/stock-prices')
    .get(async function(req, res) {
      let { stock, like } = req.query;
      
      // Handle single stock as array for uniform processing
      if (!Array.isArray(stock)) {
        stock = [stock];
      }
      
      // Limit to 2 stocks max
      if (stock.length > 2) {
        return res.json({ error: 'Maximum 2 stocks allowed' });
      }
      
      const likeBool = like === 'true';
      const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const anonymizedIP = anonymizeIP(clientIP);
      
      try {
        const stockDataArray = [];
        
        for (const symbol of stock) {
          const upperSymbol = symbol.toUpperCase();
          const price = await getStockPrice(upperSymbol);
          
          if (price === null) {
            return res.json({ error: `Invalid stock symbol: ${upperSymbol}` });
          }
          
          // Initialize stock in map if not exists
          if (!stockLikes.has(upperSymbol)) {
            stockLikes.set(upperSymbol, new Set());
          }
          
          const stockLikeSet = stockLikes.get(upperSymbol);
          
          // Handle like
          if (likeBool) {
            const likeKey = `${anonymizedIP}_${upperSymbol}`;
            if (!ipLikes.has(likeKey)) {
              stockLikeSet.add(anonymizedIP);
              ipLikes.set(likeKey, true);
            }
          }
          
          stockDataArray.push({
            stock: upperSymbol,
            price: price,
            likes: stockLikeSet.size
          });
        }
        
        // Format response
        if (stockDataArray.length === 1) {
          res.json({
            stockData: {
              stock: stockDataArray[0].stock,
              price: stockDataArray[0].price,
              likes: stockDataArray[0].likes
            }
          });
        } else {
          // Calculate relative likes
          const likes1 = stockDataArray[0].likes;
          const likes2 = stockDataArray[1].likes;
          
          res.json({
            stockData: [
              {
                stock: stockDataArray[0].stock,
                price: stockDataArray[0].price,
                rel_likes: likes1 - likes2
              },
              {
                stock: stockDataArray[1].stock,
                price: stockDataArray[1].price,
                rel_likes: likes2 - likes1
              }
            ]
          });
        }
        
      } catch (error) {
        res.json({ error: 'Error fetching stock data' });
      }
    });
    
};
