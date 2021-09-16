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

/* ---------------------------------- FIND ---------------------------------- */

exports.find = (req, res) => {
  const id = req.query.id;
  let msg = "";
  if (id && id.length == 24) {
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          msg = `Not found User with ID ${id}`;
          res.status(400).send({
            status: "bad",
            msg,
          });
        } else {
          msg = `Find by User ID`;
          res.send({
            status: "good",
            msg,
            data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          status: "bad",
          err,
        });
      });
  } else {
    Userdb.find()
      .then((data) => {
        msg = "Find all User";
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
  }
};

/* ------------------------------- FIND BY ID ------------------------------- */

// exports.findById = (req, res) => {
//   const id = req.params.id;

//   Userdb.findById(id, (err, data) => {
//     if (!data) {
//       res.status(400).send({
//         status: "bad",
//         err,
//       });
//     } else {
//       res.send({
//         status: "good",
//         data,
//       });
//     }
//   });
// };

/* --------------------------------- UPDATE --------------------------------- */
// !name || !email || !gender || !status
exports.update = (req, res) => {
  const id = req.params.id;
  // const { name, email, gender, status } = req.body;

  if (!id || id.length < 24 || id.length > 24) {
    res.status(400).send({
      status: "bad",
      msg: "Please check your User ID",
    });
  } else if (!req.body) {
    res.status(400).send({
      status: "bad",
      msg: "Data to update cannot be empty",
    });
  } else {
    Userdb.findByIdAndUpdate(id, req.body, { new: true })
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
        let msg = "";
        if (err.code === 11000) {
          msg = `Error duplicate Email ${err.keyValue.email} is already used`;
        }

        res.status(500).send({
          status: "bad",
          msg,
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
