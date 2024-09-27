module.exports = (app) => {
    const urlController = require('../controllers/url.controller.js');
   app.post('/url', urlController.create);
    app.get('/url', urlController.findAll);
    app.get('/url/:urlId', urlController.findOne);
    app.delete('/url/:urlId', urlController.delete);
}