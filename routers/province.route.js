
module.exports = (app) => {
    const provinceRouter = require('../controllers/province/provinces');

    app.get('/provinces', provinceRouter.getProvinces)

    app.post('/createProvince', provinceRouter.create)

    // app.get('/logout', users.logout)

    // app.get('/currentAuthen', users.currentAuthen)
}
