const Item = require('../models/item.model.js');

exports.create = (req, res) => {
    const item = new Item({
        imgUrl: req.body.imgUrl,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        color: req.body.color
    })

    item.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un error"
        })
    })
}

exports.findAll = (req, res) => {
    Item.find().then(items => {
        res.send(items);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un error al mostrar los items"
        })
    })
}

exports.findOne = (req, res) => {
    Item.findById(req.params.itemId).then(item => {
        if (!item) {
            return res.status(404).send({
                message: "No se encontro algun item con el id " + req.params.itemId
            });
        }
        res.send(item);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No se encontro algun item con el id " + req.params.itemId
            })
        }
        return releaseEvents.status(500).send({
            message: "Error al encontrar item con id " + req.params.itemId
        })
    })
}

exports.update = (req, res) => {
    Item.findByIdAndUpdate(req.params.itemId, {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio
    }, {new: true}).then(item => {
        if (!item) {
            return res.status(404).send({
                message: "No se encontró el item con id " + req.params.itemId
            })
        }
        res.send(item);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No se encontró el item con id " + req.params.itemId
            })
        }
        return res.status(500).send({
            message: "Error actualizando el item con id " + req.params.itemId
        })
    })
}

exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params.itemId).then(item => {
        if(!item) {
            return res.status(404).send({
                message: "No se encontró el item con id " + req.params.itemId
            })
        }
        res.send({message: "Item borrado exitosamente!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "No se encontró el item con id " + req.params.itemId
            })
        }
        return releaseEvents.status(500).send({
            message: "No se pudo borrar el item con id " + req.params.itemId
        })
    })
}
