const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

//json
app.use(bodyParser.json());

//테이블 생성
// db.pool.query(
//   `CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`,
//   (err, results, fileds) => {
//     console.log("results", results);
//   }
// );

// db list 테이블에 있는 데이터를 프론트로 보내주기
app.get("/api/values", function (req, res) {
  db.pool.query("SELECT * FROM lists;", (req, results, fileds) => {
    if (err) {
      return res.status(500).send(err);
    } else return res.json(results);
  });
});

app.post("/api/value", function (req, res, next) {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}");`,
    (req, results, fileds) => {
      if (err) {
        return res.status(500).send(err);
      } else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5001, () => {
  console.log("5000번 실행중...");
});
