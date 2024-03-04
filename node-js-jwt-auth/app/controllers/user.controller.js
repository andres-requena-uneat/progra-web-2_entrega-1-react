const db = require("../models");
const User = db.user;
const Role = db.role;

const parseJwt = (token) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getUsers = (req, res) => {

  const accessToken = req?.headers['x-access-token']
  if (accessToken) {
    const decryptedAccessToken = parseJwt(accessToken)

    User.findOne({ where: {
      id: decryptedAccessToken.id
    }})
    .then(async currentUser => {
      const userRoles = await currentUser.getRoles()

      let roleNames;

      switch (userRoles[0].name) {
        case 'admin':
          roleNames = ['admin', 'moderator', 'user'];
          break;
        case 'moderator':
          roleNames = ['moderator', 'user'];
          break;
        default:
          roleNames = ['user'];
          break;
      }

      User.findAll({
        include: {
          model: Role,
          where: {
            name: roleNames
          }
        }
      })
      .then(roledUsers => {
        const restrictedData = roledUsers.map(user => {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles.map(role => role.name)
          }
        })
        res.status(200).send({users: restrictedData});
      })
    })

  } else {
    res.status(403).send({message: "Forbidden"});
  }
}

exports.getUser = (req, res) => {
  console.log(req.query.id)
  User.findOne({    where: {
    id: req.query.id
  }})
  .then(user => {
    res.status(200).send({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  })
  .catch(error => res.status(500).send({message: error.message}))
}