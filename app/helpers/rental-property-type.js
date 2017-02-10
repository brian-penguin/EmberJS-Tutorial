import Ember from 'ember';

const communityPropertyTypes = [
  'Condo',
  'Townhouse',
  'Apartment'
];

/*
 * wow
 * so this uses something called Destructuring assignment which is an ES2015 thing (ES6)
 * Basically it works like pattern matching to try and match a var to whatever value given
 * in this case we are given an array of params from out hbs template and we assign the first position
 * in the array to be type and then can use the type var wherever we want (I'm not sure what the limitations are there or if it will raise errors )
*/
export function rentalPropertyType([type]/*, hash*/) {
  if (communityPropertyTypes.includes(type)) {
    return 'Community';
  }
  return 'Standalone';
}

export default Ember.Helper.helper(rentalPropertyType);
