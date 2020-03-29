const express = require('express');
const userService = require('../services/user.service');
exports.authenticate = (req, res, next) => {
    userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({message: 'Email o contraseña incorrecto'}))
    .catch(err => next(err));

    console.log(req.body);
}

exports.register = (req, res, next) => {
    userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

exports.getAll = (req, res, next) => {
    userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

exports.getById = (req, res, next) => {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}