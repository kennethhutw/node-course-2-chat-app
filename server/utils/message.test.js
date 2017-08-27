var expect = require('expect');

var {generateMsg, generateLocationMsg} = require('./message');
describe('generateMessage',()=>{
   it('should generate correct message object', ()=>{
      var from='Jen';
      var text = 'some message';
        var Msg = generateMsg(from, text);
        expect(Msg.createdAt).toBeA('number');
        expect(Msg).toInclude({
            from,
            text
        });
   });
});

describe('generateLocationMessage',() =>{
    it('should generate correct location object',()=>{
        var from = 'Deb';
        var latitude = 15;
        var longtitude = 19;
        var url = 'https://www.google.com.sg/maps?q=15,19';
        var msg = generateLocationMsg(from, latitude, longtitude);
        expect(msg.createdAt).toBeA('number');
        expect(msg).toInclude({from, url});
    });
});