var expect = require('expect');

var {generateMsg} = require('./message');
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
})