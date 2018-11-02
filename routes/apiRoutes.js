const router = require("express").Router();
const db = require("../db/connection");

//create note
router.post("/api/save", function(req, res) {
  
    db.query("INSERT INTO notes SET ?", [req.body], function(err, result) {
      if(err){
        console.log(err);
        return res.status(500).end();
      }

        res.json(result);
    });
});

// Get all notes where del_flag is 1 (not deleted)
router.get("/api/view", function(req, res) {
  db.query("SELECT * FROM notes WHERE del_flag = '1' ORDER BY search_ts DESC", function(err, result) {
    if(err){
      console.log(err);
      return res.status(500).end();
    }
    var html = `<h3> Note Lists <span class="fas fa-pen-square float-right mt-2 create_btn" title="CREATE" alt="CREATE"></span></h3>
              <ul class="list-group">`;
        result.forEach((note) => {
            html += `<li class="list-group-item note" data-idx="${note.idx}" data-content="${note.content}">${note.title}
                      <span class="fas fa-trash-alt float-right text-danger delete_btn title="DELETE" alt="DELETE"></span>
                     </li>`;
        })
        html += `</ul>`;
    res.json(html);
  });
});

// delete 
router.put("/api/delete", function(req, res) {
  db.query("UPDATE notes SET del_flag='0' WHERE ?", [req.body], function(err, result) {
    if(err){
        console.log(err);
        return res.status(500).end();
      }
    res.json(result);
  });
});

module.exports = router;
