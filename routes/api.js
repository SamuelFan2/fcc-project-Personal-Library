/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { ObjectId } = require('mongodb');

module.exports = function (app, database) {
  console.log('connection success!');

  app.route('/api/books')
  
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      
      console.log('\nGET: all books');

      let arr = await database.find({}).toArray();
      res.json(arr);
    })
    
    .post(async function (req, res){
      
      console.log('\nPOST: save new book');

      let title = req.body.title;
      //response will contain new book object including atleast _id and title
  
      //if no title submitted
      if (!title) {
        res.send('missing required field title');
        return;
      }

      let objToSave = {
        title: title,
        comments: [],
        commentcount: 0
      };

      await database.insertOne(objToSave);
      res.json({_id: objToSave._id, title: objToSave.title});
    })
    
    .delete(async function(req, res){
      console.log('\nDELETE: remove all books')
      //if successful response will be 'complete delete successful'
      await database.deleteMany();
      res.send('complete delete successful');
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      console.log('\nGET: search book by id');
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let arr = await database.find({_id: new ObjectId(bookid)}).toArray();
      
      // if no book found
      if (arr.length === 0) {
        res.send('no book exists');
        return;
      }
      res.json(arr[0]);
    })
    
    .post(async function(req, res){
      console.log('\nPOST: add comment to a book by id');

      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      // if comment is undefined
      if (!comment) {
        res.send('missing required field comment');
        return;
      }

      let arr = await database.find({_id: new ObjectId(bookid)}).toArray();

      // if no book found
      if (arr.length === 0) {
        res.send('no book exists');
        return;
      }

      let commentsArr = arr[0].comments;
      let commentsUpdate = commentsArr.concat(comment);
      let count = commentsUpdate.length;

      // update database
      await database.updateOne({_id: new ObjectId(bookid)}, {$set: {
        comments: commentsUpdate,
        commentcount: count
      }})

      res.json({_id: arr[0]._id, title: arr[0].title, comments: commentsUpdate, commentcount: count});
    })
    
    .delete(async function(req, res){
      console.log('\nDELETE: remove a book by id');

      let bookid = req.params.id;
      //if successful response will be 'delete successful'

      let arr = await database.find({_id: new ObjectId(bookid)}).toArray();

      // if no book found
      if (arr.length === 0) {
        res.send('no book exists');
        return;
      }

      await database.deleteOne({_id: new ObjectId(bookid)});
      res.send('delete successful');
    });
  
};
