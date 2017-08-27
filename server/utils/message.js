var generateMsg =(from, text)=>{
    return {
        from, 
        text,
        createdAt: new Date().getTime()
    };
};

var generateLocationMsg=(from,lat, long) =>{
    return{
       from,
       url :`https://www.google.com.sg/maps?q=${lat},${long}`,
       createdAt: new Date().getTime()
    };
};

module.exports = {generateMsg, generateLocationMsg};