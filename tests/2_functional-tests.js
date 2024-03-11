/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let id0;
let id1;
let id2;
let id3;
let id4;

let test0 = 'test' + Math.floor(Math.random() * 100000) +1;
let test1 = 'test' + Math.floor(Math.random() * 100000) +1;
let test2 = 'test' + Math.floor(Math.random() * 100000) +1;
let test3 = 'test' + Math.floor(Math.random() * 100000) +1;
let test4 = 'test' + Math.floor(Math.random() * 100000) +1;

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {
    

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .send({title: test0})
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            assert.isObject(res.body, 'response should be an object');
            assert.isNotArray(res.body, 'response should not ba an array');
            assert.property(res.body,'_id', 'response object should contain "_id"');
            assert.property(res.body, 'title', 'response object should contain "title"');
            
            id0 = res.body._id;
            done();
          })
      });

      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .send({title: test1})
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            
            id1 = res.body._id;
            done();
          })
      });
      
      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .send({title: test2})
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            
            id2 = res.body._id;
            done();
          })
      });

      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .send({title: test3})
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            
            id3 = res.body._id;
            done();
          })
      });

      test('Test POST /api/books with title', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .send({title: test4})
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            
            id4 = res.body._id;
            done();
          })
      });

      test('Test POST /api/books with no title given', function(done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .send({})
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            assert.strictEqual(res.text, "missing required field title", `expect ${res.text} to be equal to "missing required field title"`);
            done();
          })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get('/api/books')
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            assert.isArray(res.body, 'response should be an array');
            assert.isAtLeast(res.body.length, 5, 'Array length should be at least 5');
            assert.isObject(res.body[0], 'response should be an array contain objects');
            done();
          })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
          .request(server)
          .keepOpen()
          .get(`/api/books/65eabf81067310001303a795`)
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            assert.strictEqual(res.text, 'no book exists', `expect ${res.text} to be equal to "no book exists"`)
            done();
          })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){

      chai
          .request(server)
          .keepOpen()
          .get(`/api/books/${id0}`)
          .end((err, res) => {

            assert.strictEqual(res.status, 200, 'Response status should be 200');
            assert.isObject(res.body, 'response should be an Object');
            assert.strictEqual(res.body.title, test0, `expect ${res.body.title} to be equal to "${test0}"`)
            done();
          })
      });
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai
          .request(server)
          .keepOpen()
          .post(`/api/books/${id0}`)
          .send({comment: '123'})
          .end((err, res) => {
            console.log(res.body.comments[0],'test');
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            assert.isObject(res.body, 'response should be an Object');
            assert.property(res.body, 'comments', 'response object should contain "comments"');
            assert.property(res.body, '_id', 'response object should contain "_id"');
            assert.property(res.body, 'title', 'response object should contain "title"');
            assert.property(res.body, 'commentcount', 'response object should contain "commentcount"');
            assert.strictEqual(res.body.comments[0], '123', `expect ${res.body.comments[0]} to be equal to "123"`);
            assert.strictEqual(res.body.commentcount, 1, `expect ${res.body.commentcount} to be equal to 1`);
            done();
          })
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai
          .request(server)
          .keepOpen()
          .post(`/api/books/${id1}`)
          .send({})
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            assert.strictEqual(res.text, 'missing required field comment', `expect ${res.text} to be equal to "missing required field comment"`);
            done();
          })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai
          .request(server)
          .keepOpen()
          .post(`/api/books/65ee71f1067310001303a87b`)
          .send({comment: '123'})
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200');
            assert.strictEqual(res.text, 'no book exists', `expect ${res.text} to be equal to "no book exists"`);
            done();
          })
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
        .request(server)
        .keepOpen()
        .delete(`/api/books/${id2}`)
        .end((err, res) => {
          assert.strictEqual(res.status, 200, 'Response status should be 200');
          assert.strictEqual(res.text, 'delete successful', `expect ${res.text} to be equal to "delete successful"`);
          done();
        })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
        .request(server)
        .keepOpen()
        .delete(`/api/books/65ee71f1067310001303a87b`)
        .end((err, res) => {
          assert.strictEqual(res.status, 200, 'Response status should be 200');
          assert.strictEqual(res.text, 'no book exists', `expect ${res.text} to be equal to "no book exists"`);
          done();
        })
      });

    });

  });

});
