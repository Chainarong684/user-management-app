var Userdb = require("../model/userModel");

/* --------------------------------- CREATE --------------------------------- */
exports.create = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let gender = req.body.gender;
  let status = req.body.status;

  if (!req.body || !name || !email || !gender || !status) {
    res.status(400).send({
      status: "bad",
      msg: "Please insert your data !!",
    });
  } else {
    const user = new Userdb({
      name,
      email: email.toLowerCase(),
      gender,
      status,
    });

    user
      .save(user)
      .then((data) => {
        res.send({
          status: "good",
          data,
        });
      })
      .catch((err) => {
        let msg = "";
        if (err.code === 11000) {
          msg = "Email is duplicate";
        }
        res.status(500).send({
          status: "bad",
          msg,
          error: err.message,
        });
      });
  }
};

/* ---------------------------------- FIND ALL ---------------------------------- */

exports.find = (req, res) => {
  Userdb.find()
    .then((data) => {
      let msg = "";
      if (data.length == 0) {
        msg = "User is empty";
      }
      res.send({
        status: "good",
        msg,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "bad",
        error: err || "Some thing wrong can not get user",
      });
    });
};

/* ------------------------------- FIND BY ID ------------------------------- */

// if (!id || id.length < 24 || id.length > 24) {

// }
exports.findById = (req, res) => {
  const id = req.params.id;

  Userdb.findById(id, (err, data) => {
    if (!data) {
      res.status(400).send({
        status: 'bad',
        err
      })
    } else {
      res.send({
        status: 'good',
        data
      })
    }
  })
};

/* --------------------------------- UPDATE --------------------------------- */

exports.update = (req, res) => {
  let id = req.params.id;
  let update = req.body;

  if (!id || !update || (Object.keys(update).length === 0 && update.constructor === Object)) {
    res.status(400).send({
      status: "bad",
      msg: "Data to update can not be empty",
    });
  } else {
    Userdb.findByIdAndUpdate(id, update, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            status: "bad",
            msg: `User with ${id} has not found please try agian`,
          });
        } else {
          res.send({
            status: "good",
            data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          status: "bad",
          msg: `Error duplicate Email ${err.keyValue.email} is already used`,
          error: err.message,
        });
      });
  }
};

/* ------------------------------- DELETE ------------------------------- */

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id || id.length < 24 || id.length > 24) {
    return res.status(400).send({
      status: "bad",
      msg: "Please check User ID",
    });
  } else {
    Userdb.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            status: "bad",
            msg: `User with ${id} not found`,
          });
        } else {
          res.send({
            status: "good",
            msg: `Successfully User ID ${id} was deleted`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          status: "bad",
          msg: `Cannot delete User with ID ${id}`,
          err,
        });
      });
  }
};
