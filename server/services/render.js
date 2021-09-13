const axios = require("axios");

exports.homeRoutes = (req, res) => {
  axios
    .get("http://localhost:3000/api/users")
    .then((result) => {
      res.render("index", {
        page: "index",
        users: result.data,
        type: result.data.msg,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user", {
    page: "Add User",
  });
};

exports.update_user = (req, res) => {
  const id = req.query.id;
  axios
    // .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .get(`http://localhost:3000/api/users?id=${id}`)
    .then((response) => {
      const { data } = response.data;
      console.log(data.gender);
      res.render("update_user", {
        page: "Update User",
        userData: data,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
