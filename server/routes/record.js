const express = require("express");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/dna_penyakit").get(function (req, res) {
  let db_connect = dbo.getDb("dnapattern");
  db_connect
    .collection("dna_penyakit")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/dna_penyakit/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("dna_penyakit")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
// This section will help you get a single record by nama
recordRoutes.route("/dna_penyakit/nama/:nama").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { nama: req.params.nama };
  db_connect
    .collection("dna_penyakit")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new dna_penyakit record
recordRoutes.route("/dna_penyakit/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    nama: req.body.nama,
    dna: req.body.dna,
  };
  db_connect.collection("dna_penyakit").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you create a new log record
recordRoutes.route("/log/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    tanggal: req.body.tanggal,
    nama_pengguna: req.body.nama_pengguna,
    nama_penyakit: req.body.nama_penyakit,
    hasil: req.body.hasil,
    kemiripan: req.body.kemiripan,
  };
  db_connect.collection("log").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(obj);
//   });
// });

module.exports = recordRoutes;
