const URL = require('../models/url.model.js');
exports.create = (req, res) => {
    if (!req.body.url) {
        return res.status(400).send({
            message: "url content can not be empty"
        });
    }
    const url = new URL({
        url: req.body.url
    });
    console.log(url)
    url.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the url."
            });
        });
};
exports.findAll = (req, res) => {
    URL.find()
        .then(url => {
            res.send(url);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving urls."
            });
        });
};
exports.findOne = (req, res) => {
    URL.findById(req.params.urlId)
        .then(url => {
            if (!url) {
                return res.status(404).send({
                    message: "url not found with id " + req.params.urlId
                });
            }
            res.send(url);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "url not found with id " + req.params.urlId
                });
            }
            return res.status(500).send({
                message: "Error retrieving url with id " + req.params.urlId
            });
        });
};
exports.delete = (req, res) => {
    URL.findByIdAndRemove(req.params.urlId)
        .then(url => {
            if (!url) {
                return res.status(404).send({
                    message: "url not found with id " + req.params.urlId
                });
            }
            res.send({
                message: "url deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "url not found with id " + req.params.urlId
                });
            }
            return res.status(500).send({
                message: "Could not delete url with id " + req.params.urlId
            });
        });
};