
const bcrypt = require("bcrypt");
const models = require("../models");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const fs = require("fs");

// Regex de validation
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,20}/;

// Inscription
exports.signup = (req, res, next) => {

  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if (email == null || firstName == null || lastName == null || password == null) {
    return res.status(400).json({ 'error': 'missing parameters' })
  }

  // Permet de contrôler la validité de l'adresse mail
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Adresse mail invalide' });
  }

  // Permet de contrôler la validité du mot de passe
      if(!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir entre 8 et 20 caractères dont au moins une lettre majuscule, une lettre minusucle, un chiffre et un symbole' });
    }

  models.User.findOne({
    where: { email: email }
  })
    .then((userFound) => {
      // si l'utilisateur n'existe pas 
      if (!userFound) {
        // Hash du mot de passe avec bcrypt
        bcrypt.hash(password, 10)
          .then(hash => {

            // Création du nouvel utilisateur
            const user = new models.User({
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: hash,
              admin: false
            })
            // Sauvegarde dans la base de données
            user.save()
              .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
              .catch(error => res.status(400).json({ error }));
          })
      } else if (userFound) {
        return res.status(409).json({ error: 'L utilisateur existe déjà !' })
      }
    })
    .catch(error => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).json({ 'error': 'missing parameters' })
  }

  // Recherche de l'utilisateur dans la BDD
  models.User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // Si l'utilisateur existe comparaison du MPD avec la BDD
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          // Si MDP correct création d'un TOKEN de session
          res.status(200).json({
            userId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            userAdmin: user.admin,
            token: jwt.sign(
              { userId: user.id, userAdmin: user.admin },
              'RjfkdlRFempocSl',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// Permet d'afficher un user
exports.profil = (req, res, next) => {
  models.User.findOne({
    attributes: ["first_name", "last_name", "email", "id", "bio", "photo"],
    where: { id: req.params.id },
  })
    .then((user) => {
      console.log(user)
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Impossible de voir le profil" });
    });
};

// Permet à un utilisateur de modifier son profil
exports.updateProfile = (req, res) => {
  const id = req.params.id;
  const data = req.file
    ? {
      // Si image
      bio: req.body.bio,
      photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : {
      // Sans image
      bio: req.body.bio,
    };
    console.log(data)

  models.User.findByPk(id).then((user) => {
    const filename = user.photo ? {name: user.photo.split("/images/")[1]} : {name: user.photo};
    fs.unlink(`images/${filename.name}`, () => {
      
      if(data.bio.length <= 0){
        data.bio = user.bio;
      }
      //console.log(data)

      models.User.update(data, {
        where: { id: id },
      })
      .then((user) => {
        res.status(200).send({message: "Votre profil a été mis à jour."});
      })
      .catch((err) => {
        res.status(500).send({message: "Impossible de mettre à jour de votre profil."});
      });
    })
  }).catch((err) => {
    res.status(404).send({message: "profil non trouve"});
  });
};

// Permet supprimer un user
exports.deleteProfil = (req, res, next) => {
  const id = req.params.id;
  models.User.findOne({
    attributes: ['id'],
    where: { id: id }
  })
    .then(user => {
      if (user) {
        
        models.User.destroy({
          where: { id: id }
        })
          .then(() => res.status(200).json({ message: 'Votre compte a été supprimé' }))
          .catch(() => res.status(500).json({ error: 'une erreur s\'est produite !' }));

      } else {
        return res.status(404).json({ error: 'Utilisateur non trouvé' })
      }
    })
    .catch(error => res.status(500).json({ error: 'Impossible de supprimer le profile.' }));
} 


// Permet d'afficher tous les users
exports.getAllUsers = (req, res, next) => {
  models.User.findAll({
    attributes: ["first_name", "last_name", "email", "id"],
  })
    .then((user) => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(500).json({ error: "Impossible de voir le profil" });
    });
};

