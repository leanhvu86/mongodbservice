const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProvinceSchema = new Schema({
    provinceId: { type: String, default: '' },
    provinceName: { type: String, default: '' },
    status: { type: Number, default: 1 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Province', ProvinceSchema);