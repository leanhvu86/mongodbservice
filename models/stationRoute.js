const mongoose = require('mongoose');

const StationRouteSchema = mongoose.Schema({
    id: { type: String, default: '' },
    status: { type: Number, default: 1 }
},
    station_dee = {
        nameStation: { type: String, default: '' },
        addressStation: { type: String, default: '' },
        personCapacity: { type: Number, default: 500 },
        typeOfStation: { type: Number, default: 1 },
        openTime: { type: String, default: '05h 00' },
        closeTime: { type: String, default: '23h 00' },
        status: { type: Number, default: 1 },
        description: { type: String, default: '' },
        mediaItem_dee: {
            mediaItemId: { type: String, default: '' },
            path: { type: String, default: '' },
            mediaType: { type: Number, default: 1 }
        }
    },

    route_dee = {
        routeId: { type: String, default: '' },
        nameRoute: { type: String, default: '' },
        status: { type: Number, default: 1 }
    }, {
    timestamps: true
});

module.exports = mongoose.model('StationRoutes', StationRouteSchema);
