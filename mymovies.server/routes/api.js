var express = require('express');
var router = express.Router();

var mysql = require('promise-mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Tv121212',
    database:'mymovies',
    connectionLimit: 10
});

//add new fav.
router.post('/addmovie', async (req, res, next) => {
    //req.body
    var query=`INSERT INTO movies (moviename, year ,image ,catagoryID) 
    VALUES ('${req.body.moviename}','${req.body.year}','${req.body.image}', ${req.body.catagoryID} )`;
   console.log(query);
    await pool.query(query)
    res.json({msg:"movie added"});
});

router.get('/getallmovies', async (req, res, next)=> {
    
    let movies = await pool.query(`SELECT * FROM movies`);
    let catagories = await pool.query(`SELECT * FROM catagory`);
    
    var results = movies.map(function (movie) {
        let catagoryObj = catagories.find(function (cat) {
            return cat.ID == movie.catagoryID
        })

        return {
            ID: movie.ID,
            moviename: movie.moviename,
            year: movie.year,
            image: movie.image,
            catagoryname: catagoryObj.name
        }
    })

    res.json(results);
   
 
 });


//get all cat
router.get('/getallcatagories', async (req, res, next) => {
    //req.body
    let result = await pool.query(`SELECT * FROM catagory`);
    res.json(result);
});



//delete fav
router.get('/deletemovie', async (req, res, next) => {
    await pool.query(`DELETE FROM movies WHERE ID = ${req.query.ID}`);
    res.json({msg:"OK"});
});



router.get('/insertcatagories', async (req, res) => {
    await pool.query(`INSERT INTO catagory (name) VALUES ('comedy') `);
    await pool.query(`INSERT INTO catagory (name) VALUES ('drama') `);
    await pool.query(`INSERT INTO catagory (name) VALUES ('thriller') `);
    await pool.query(`INSERT INTO catagory (name) VALUES ('action') `);

    res.json({
        msg: "catagories inserted"
    })
 
});



// router.get('/createdbandtables', async (req, res) => { 
//     await pool.query(`CREATE DATABASE mymovies`);
//     //create table1
//     await pool.query(`CREATE TABLE mymovies.catagory (
//         ID int NOT NULL AUTO_INCREMENT,
//         name varchar(255) NOT NULL ,
//         PRIMARY KEY (ID) )`)
//     //create table2 
//     await pool.query(`CREATE TABLE mymovies.movies (
//         ID int NOT NULL AUTO_INCREMENT,
//         moviename varchar(255) NOT NULL ,
//         year varchar(255) NOT NULL ,
//         image varchar(255) NOT NULL ,
//         catagoryID int,
//         PRIMARY KEY (ID) )`)
 
//     res.json({
//         msg: "db and tables created"
//     })
// });





module.exports = router;