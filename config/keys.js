//figure out set of credentials to return
if (process.env.NODE_ENV == 'production') {
    //we are in production-return production set of keys
    module.exports = require('./prod');
}else{
    //we are in developement-return devt keys
    module.exports = require( './dev');
}