const handleProfile = (req, res, db) => {
  const { id } = req.params; //id = profile/:'id'
  db("users")
    .select("*")
    .where({
      id: id
    }) //passing obj as condition ,has other way check knex where doc
    .then(user => {
      //always return an array
      if (user.length) {
        //if return [] ,not found
        res.json(user[0]);
      } else {
        res.status(400).json("Not Found");
      }
    })
    .catch(err => {
      res.status(400).json("User Not Found");
    });
};
module.exports = {
  handleProfile: handleProfile
};
