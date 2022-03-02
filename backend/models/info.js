'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = Schema({
    info:Schema.Types.Mixed,
    created_at: Date,
    update_at: Date,  
});

Schema.plugin(mongoosePaginate);

module.exports = mongoose.model('documento', Schema);