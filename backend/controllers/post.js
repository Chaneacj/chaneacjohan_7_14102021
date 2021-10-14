//const { model } = require("mongoose");
const models = require("../models");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const fs = require("fs");

// Permet d'afficher tous les post
exports.getAllPost = (req, res) => {
	models.Post.findAll(
		{ include: [{ model: models.User, attributes: ['first_name', "last_name", "email", "id"] }] }
	)
		.then((messages) => {
			console.log(messages)
			res.status(200).json(messages)
		})
		.catch((error) => res.status(500).json({ error }));
};

// Permet d'afficher un les post
exports.getOnePost = (req, res) => {

	//console.log(req.params.id);
	models.Post.findOne({
		where: { id: req.params.id },
		include: [{ model: models.User, attributes: ['first_name'] }]
	})
		.then((message) => {
			console.log(message)
			if (!message) {
				return res.status(400).json({ error: "Post non disponible !" });
			}
			res.status(200).json(message);
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
};

// Permet de créer un post
exports.create = (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RjfkdlRFempocSl');
	const userId = decodedToken.userId;
	//console.log(req.params.id);

	models.User.findOne({
		where: { id: userId },
	})
		.then((user) => {
			if (user) {
				///console.log(userId , req.body , req.file);
				const image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
				//console.log(image, req.body);
				//if (req.body.content == "" && req.file == undefined) {
				//res.status(400).json({ error: "Il n'y a aucun contenu à ajouter !" });
				//} else {
				models.Post.create({
					title: req.body.title,
					content: req.body.content,
					UserId: user.id,
					imagePost: image,
				})
					.then((newMsg) => {
						res.status(201).json(newMsg);
					})
					.catch((err) => {
						res.status(500).json(err);
					});
				//}
			} else {
				res.status(400).json("IMPOSSIBLE");
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: "erreur serveur" });
		});
};

// Permet de modifier un post
exports.update = (req, res) => {
	const id = req.params.id;

	const data = req.file
		? {
			title: req.body.title,
			content: req.body.content,
			userId: req.body.userId,
			imagePost: `${req.protocol}://${req.get("host")}/images/${req.file.filename
				}`,
		}
		: {
			title: req.body.title,
			content: req.body.content,
			userId: req.body.userId,
		};

	console.log(id, data)

	models.Post.findByPk(id).then((post) => {

		if (data.content.length <= 0) {
			data.content = post.content;
		}
		const filename = post.imagePost ? { name: post.imagePost.split("/images/")[1] } : { name: post.imagePost };
		fs.unlink(`images/${filename.name}`, () => {
			post.update(data, {
				where: { id: id },
			})
				.then((post) => {
					res.send({
						message: "Le message a été mis à jour.",
					});
				})
				.catch((err) => {
					res.status(500).send({
						message: "Impossible de mettre à jour ce message",
					});
				});
		});
	}).catch((err) => {
		res.status(500).send({
			message: "Impossible de trouver le post",
		});
	});
};

// Permet de supprimer un post
exports.delete = (req, res, next) => {

	models.Post.findOne({
		attributes: ['id', 'imagePost'],
		where: { id: req.params.id }
	})
		.then(post => {
			if (post) {
				if (post.imagePost != null) {
					const filename = post.imagePost.split('/images/')[1];
					fs.unlink(`images/${filename}`, (err) => { });
				}
				models.Post.destroy({
					where: { id: req.params.id }
				})
					.then(() => res.status(200).json({ message: 'Votre post a été supprimé' }))
					.catch(() => res.status(500).json({ error: 'une erreur s\'est produite !' }));

			} else {
				return res.status(404).json({ error: 'Message non trouvé' })
			}
		})
		.catch(error => res.status(500).json({ error: 'une erreur s\'est produite!' }));
};
