import Provinces from '../../models/province'

class Province {
    async getProvinces(req, res, next) {
        try {
            const provinces = Provinces.find({}, '-_id');
            console.log('danh sach tinh tp'+ provinces);
            res.send({
                'status': 200,
                provinces: provinces
            })
        } catch (err) {
            console.log('not found province');
            res.send({
                "status":404,
                'type':'ERROR_DATA',
                'message':'provinces not  found'
            })
        }
    }

    async findProvince(req,res,next){
       Province.findOne({provinceName:req.provinceName},function (err,province) {
            if (err){
                console.log(err);
                return res.send({
                    'status':401,
                    'message':'province not found'
                })
            }else{
                res.send({
                    'status':200,
                    province:province
                })
            }
       })
    }
}

export default  new Province()
