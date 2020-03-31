const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const app = express();
const PORT = process.env.PORT || 9000 ;

mongoose.connect('mongodb://localhost:27017/userBlog',{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) => {
    if(!err) console.log(`Connected to MongoDatabase blogSystem`)
    else console.log(err)
})

app.use(express.json());
app.use((req, res, next) => {
    console.log("Request Method : " + req.method);
    console.log(Date.now().toLocaleString());
    console.log("Request URL : " + req.baseUrl);
    next();
})
app.use('/users', userRouter);
app.use('/posts', postsRouter);

// app.get('/nonexistant', (req, res, next) => {
//     let err = new Error('I couldn\'t find it.');
//     err.httpStatusCode = 404;
//     next(err);
//   });
  
//   app.get('/problematic', (req, res, next) => {
//     let err = new Error('I\'m sorry, you can\'t do that, Dave.');
//     err.httpStatusCode = 304;
//     next(err);
//   });
  
  // handles not found errors
  app.use((err, req, res, next) => {
    if (err.httpStatusCode === 404) {
      res.status(400).render('NotFound');
    }
    next(err);
  });
  
  // handles unauthorized errors
  app.use((err, req, res, next) => {
    if(err.httpStatusCode === 304){
      res.status(304).render('Unauthorized');
    }
    next(err);
  })
  
  // catch all
  app.use((err, req, res, next) => {
    console.log(err);
    if (!res.headersSent) {
      res.status(err.httpStatusCode || 500).render('UnknownError');
    }
  });

app.listen(PORT, (err) => {
    if(!err) console.log(`Server Started on port ${PORT}`)
})