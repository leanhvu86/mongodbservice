const mongoose = require('mongoose');

const Province = mongoose.model('Province');
exports.getProvinces = (async (req, res, next) => {
    // try {
    //     const provinces = Province.find({}, '-_id');
    //     console.log('danh sach tinh tp' + provinces);
    //     res.send({
    //         'status': 200,
    //         provinces: provinces
    //     })
    // } catch (err) {
    //     console.log('not found province');
    //     res.send({
    //         "status": 404,
    //         'type': 'ERROR_DATA',
    //         'message': 'provinces not  found'
    //     })
    // }
    await Province.find
    // ({}, function(err, provinces) {
    //     console.log(provinces);
    //     if (provinces.length===0){
    //         res.status(404).send(
    //             {
    //                 'status':404,
    //                 'message':err||'can not find provinces'
    //             }
    //         )
    //     }else {
    //         res.status(200).send(provinces);
    //     }
    // });
    ()
        .then(provinces => {
            console.log('tìm provice'+provinces);
            res.status(200).send( provinces
            )
        }).catch(err => {
            console.log('not found province');
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding province'
            })
        })
});

exports.findProvince = async (req, res, next) => {
    await Province.findOne({provinceName: req.provinceName}, function (err, province) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'province not found'
            })
        } else {
            res.send({
                'status': 200,
                province: province
            })
        }
    })
}
exports.create = (req, res) => {
    const province = new Province({
        provinceId: req.body.provinceId,
        provinceName: req.body.provinceName,
        status: 1
    })

    province.save()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        })
    })
}

