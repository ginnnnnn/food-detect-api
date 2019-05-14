const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect submit form");
  }

  db("login")
    .select("hash") // select/ returning select all will return all,returnung wont work
    .where("email", "=", email) //check email
    .then(hash => {
      //return array with an obj like [{hash:'lsjfowfcooi'}]
      const isVaild = bcrypt.compareSync(password, hash[0].hash); //sync call
      if (isVaild) {
        db("users")
          .select("*")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          });
      } else {
        res.status(400).json("Password/Email Combination Not Match");
      }
    })
    .catch(err => res.status(400).json("Password/Email Combination Not Match"));
};

module.exports = {
  handleSignin: handleSignin
};
