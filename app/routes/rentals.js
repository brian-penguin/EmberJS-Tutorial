import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    //Right now this is going to make a get to /api/rentals but using Mirage this data will be stubbed until we need to actually give this a endpoint
    return this.get('store').findAll('Rental');
  }
});
