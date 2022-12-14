import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "travelopiaDb",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/booking", (req, res) => {
  const q = "SELECT * FROM trip_booking";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/booking", (req, res) => {
  const q = "INSERT INTO trip_booking(`name`, `email`, `destination`, `qty`, `net_amt`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.destination,
    req.body.qty,
    req.body.qty*req.body.net_amt,
  ];
db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// app.delete("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = " DELETE FROM trip_booking WHERE id = ? ";

//   db.query(q, [bookId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.put("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = "UPDATE trip_booking SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

//   const values = [
//     req.body.title,
//     req.body.desc,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [...values,bookId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

app.listen(8800, () => {
  console.log("Connected to backend.");
});
