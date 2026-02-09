const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  
  test('1. Viewing one stock: GET request to /api/stock-prices/', function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'goog' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'stockData');
        assert.isObject(res.body.stockData);
        assert.property(res.body.stockData, 'stock');
        assert.property(res.body.stockData, 'price');
        assert.property(res.body.stockData, 'likes');
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        done();
      });
  });

  test('2. Viewing one stock and liking it: GET request to /api/stock-prices/', function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'msft', like: true })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'stockData');
        assert.equal(res.body.stockData.stock, 'MSFT');
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        // Store initial likes for next test
        this.msftLikes = res.body.stockData.likes;
        done();
      }.bind(this));
  });

  test('3. Viewing the same stock and liking it again: GET request to /api/stock-prices/', function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'msft', like: true })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'stockData');
        assert.equal(res.body.stockData.stock, 'MSFT');
        // Likes should not increase because same IP
        assert.equal(res.body.stockData.likes, this.msftLikes);
        done();
      }.bind(this));
  });

  test('4. Viewing two stocks: GET request to /api/stock-prices/', function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: ['goog', 'msft'] })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'stockData');
        assert.isArray(res.body.stockData);
        assert.equal(res.body.stockData.length, 2);
        
        // Check first stock
        assert.property(res.body.stockData[0], 'stock');
        assert.property(res.body.stockData[0], 'price');
        assert.property(res.body.stockData[0], 'rel_likes');
        assert.notProperty(res.body.stockData[0], 'likes');
        
        // Check second stock
        assert.property(res.body.stockData[1], 'stock');
        assert.property(res.body.stockData[1], 'price');
        assert.property(res.body.stockData[1], 'rel_likes');
        assert.notProperty(res.body.stockData[1], 'likes');
        
        // Verify rel_likes calculation
        const relLikes1 = res.body.stockData[0].rel_likes;
        const relLikes2 = res.body.stockData[1].rel_likes;
        assert.equal(relLikes1 + relLikes2, 0);
        done();
      });
  });

  test('5. Viewing two stocks and liking them: GET request to /api/stock-prices/', function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: ['aapl', 'amzn'], like: true })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'stockData');
        assert.isArray(res.body.stockData);
        assert.equal(res.body.stockData.length, 2);
        
        // Both should have rel_likes
        assert.property(res.body.stockData[0], 'rel_likes');
        assert.property(res.body.stockData[1], 'rel_likes');
        
        // Verify both stocks were liked (rel_likes should reflect the difference)
        const stock1 = res.body.stockData[0];
        const stock2 = res.body.stockData[1];
        
        assert.isNumber(stock1.rel_likes);
        assert.isNumber(stock2.rel_likes);
        assert.equal(stock1.rel_likes + stock2.rel_likes, 0);
        done();
      });
  });
});
