var moment = require('moment');

var generateMsg =(from, text)=>{
    return {
        from, 
        text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMsg=(from,lat, long) =>{
    return{
       from,
       url :`https://www.google.com.sg/maps?q=${lat},${long}`,
       createdAt: moment().valueOf()
    };
};

module.exports = {generateMsg, generateLocationMsg};