var Userdb = require("../model/model");

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
      email,
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
          error: err || "Some thing wrong with create user",
        });
      });
  }
};

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

exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body || !id) {
    res.status(400).send({
      status: "bad",
      msg: "Data to update can not be empty",
    });
  }

  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: "bad",
          msg: `User not found with id ${id}`,
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
        msg: "Some thing wrong can not update user",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      status: "bad",
      msg: "Please insert User ID for delete",
    });
  } else {
    Userdb.findOneAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            status: "bad",
            msg: `Cannot delete User ID ${id}. Maybe User not found`,
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