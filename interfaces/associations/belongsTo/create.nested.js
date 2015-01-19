var assert = require('assert');
var _ = require('lodash');
var util = require('util');



describe('Association Interface', function() {

  describe('Belongs To Associations', function() {
    describe('create nested association', function() {

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should create a parent and child record and store the foreign key on the parent', function(done) {
        var data = {
          amount: 200,
          customer: {
            title: 'belongsTo nested create'
          }
        };

        // console.log('----- Associations.Paymentbelongs.create');
        Associations.Paymentbelongs.create(data)
          .then(function(payment) {
            assert(payment.customer);

            return Associations.Paymentbelongs.findOne(payment.id).populate('customer');
          })
          .then(function (_paymnt) {
            assert.equal(_paymnt.customer.title, 'belongsTo nested create',
              'Expecting `_paymnt.customer.title`==="belongsTo nested create", but instead `_paymnt` ==>'+
              util.inspect(_paymnt, false, null));
            done();
          })

          .catch(function (err) {
            done(err);
            assert(!err,'Tried to execute .findOne() with criteria:\n'+
              util.inspect(payment.id, false, null)+'\nBut got error:\n'+
              util.inspect(err, false, null));
          });
      });
    });

  });
});
