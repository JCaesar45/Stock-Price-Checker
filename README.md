# NEXUS | Quantum Market Intelligence Terminal

<div align="center">
  <img src="https://img.shields.io/badge/version-2.0.77-cyan?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/status-operational-green?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/security-quantum%20encrypted-magenta?style=for-the-badge" alt="Security">
</div>

<p align="center">
  <em>Advanced full-stack stock analysis platform with real-time market data visualization, sentiment tracking, and quantum-inspired cyberpunk interface design.</em>
</p>

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT INTERFACE                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Quantum    │  │   Holographic │  │   Terminal   │      │
│  │   Particle   │  │   Display    │  │   Console    │      │
│  │   Engine     │  │   System     │  │   Interface  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYER                           │
│  • Content Security Policy (CSP)                            │
│  • IP Anonymization (SHA-256 Hashing)                       │
│  • Rate Limiting & Duplicate Prevention                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                     API GATEWAY                             │
│  /api/stock-prices                                          │
│  ├── Single Asset Query                                     │
│  ├── Comparative Analysis                                   │
│  └── Sentiment Tracking Protocol                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                 EXTERNAL DATA SOURCE                        │
│     https://stock-price-checker-proxy.freecodecamp.rocks    │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Features

### Visual Interface
- **Quantum Particle System**: Interactive WebGL-inspired particle network with mouse-repulsion physics
- **3D Perspective Grid**: Animated infinite grid creating depth illusion
- **Glitch Typography**: Cyberpunk text effects with chromatic aberration
- **Holographic Displays**: Glass-morphism panels with animated borders
- **Real-time Terminal**: System console logging all operations with timestamps

### Market Intelligence
- **Real-time Price Data**: Live NASDAQ stock quotes via proxy API
- **Dual-Asset Comparison**: Side-by-side analysis with relative metrics
- **Sentiment Tracking**: Like-based popularity system with IP anonymization
- **Quantum Scoring**: Proprietary volatility and performance algorithms

### Security Implementation
```javascript
// IP Anonymization Protocol
function anonymizeIP(ip) {
  return crypto
    .createHash('sha256')
    .update(ip)
    .digest('hex')
    .substring(0, 16);
}
```

---

## API Endpoints

### Single Asset Query
```
GET /api/stock-prices?stock=GOOG
```

**Response:**
```json
{
  "stockData": {
    "stock": "GOOG",
    "price": 2865.12,
    "likes": 42
  }
}
```

### Asset with Sentiment Tracking
```
GET /api/stock-prices?stock=GOOG&like=true
```

### Comparative Analysis
```
GET /api/stock-prices?stock=GOOG&stock=MSFT
```

**Response:**
```json
{
  "stockData": [
    {
      "stock": "GOOG",
      "price": 2865.12,
      "rel_likes": 15
    },
    {
      "stock": "MSFT",
      "price": 378.91,
      "rel_likes": -15
    }
  ]
}
```

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Vanilla JavaScript (ES6+) |
| **Styling** | CSS3 with Custom Properties |
| **Graphics** | HTML5 Canvas API |
| **Backend** | Node.js + Express |
| **Security** | Helmet.js + Crypto |
| **Testing** | Mocha + Chai |

---

## Installation

```bash
# Clone repository
git clone https://github.com/JCaesar45/nexus-terminal.git

# Navigate to directory
cd nexus-terminal

# Install dependencies
npm install

# Set environment
export NODE_ENV=production

# Initialize system
npm start
```

**Access:** `http://localhost:3000`

---

## Testing Protocol

Execute validation suite:
```bash
npm test
```

**Functional Test Coverage:**
1. ✅ Single asset data retrieval
2. ✅ Sentiment tracking initialization
3. ✅ Duplicate prevention verification
4. ✅ Comparative analysis mode
5. ✅ Dual-asset sentiment tracking

---

## Design Philosophy

> *"The interface between human intuition and market data should be as fluid as thought itself."*

NEXUS combines:
- **Cyberpunk Aesthetics**: Neon gradients, glitch effects, scanlines
- **Information Density**: Maximum data visibility without clutter
- **Interactive Feedback**: Every action generates visual response
- **Privacy-First**: Zero raw data retention, cryptographic anonymization

---

## Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome 90+ | ✅ Full Support |
| Firefox 88+ | ✅ Full Support |
| Safari 14+ | ✅ Full Support |
| Edge 90+ | ✅ Full Support |

---

## License

MIT License - See `LICENSE` file for details.

---

<div align="center">
  <p><strong>NEXUS TERMINAL v2.0.77</strong></p>
  <p><em>Quantum Market Intelligence • Est. 2024</em></p>
</div>
```
