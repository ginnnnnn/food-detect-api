const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "30dfa4c480f84ff6a567be8809827908"
});

const handleImageUrl = (req, res) => {
  const { url } = req.body;

  app.models
    .initModel({
      id: "bd367be194cf45149e75f01d59f77ba7", //model id foodmodel here
      version: "aa7f35c01e0642fda5cf400f543e7c40"
    })
    .then(generalModel => {
      return generalModel.predict(url);
    })
    .then(response => {
      const concepts = response["outputs"][0]["data"]["concepts"];
      return res.json(concepts);
    })
    .catch(err => res.status(400).json([]));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1) //increment('column','amount')
    .returning("entries") //only return entries
    .then(entries => {
      //entries will auto increment ,if not match get[]
      if (entries.length) {
        res.json(entries[0]);
      } else {
        res.json("Not Able To Update");
      }
    })
    .catch(err => {
      res.status(400).json("Not Able To Update");
    });
};

module.exports = {
  handleImage: handleImage,
  handleImageUrl: handleImageUrl
};
