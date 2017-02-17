import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const DUMMY_ELEMENT = {};

let MapUtilStub = Ember.Object.extend({
  createMap(element, location) {
    this.assert.ok(element, 'created map with element');
    this.assert.ok(location, 'created map with location');
  }
});

moduleFor('service:maps', 'Unit | Service | maps', {
  // We need to require our google maps utility to use the maps service but we stubbed out the util above
  needs: ['util:google-maps']
});

test('should create a new map id one isnt cached for location', function(assert) {
  // We expect there to be four maps? maybe?
  assert.expect(4);

  let stubMapUtil = MapUtilStub.create({ assert });
  let mapService = this.subject({ mapUtil: stubMapUtil });
  let element = mapService.getMapElement('San Francisco');

  assert.ok(element, 'element exists');
  assert.ok(element.className, 'map', 'element has class name of map');
});

test('should use an existing map if one is chached for location', function(assert) {
  assert.expect(1);
  let stubCachedMaps = Ember.Object.create({
    sanFrancisco: DUMMY_ELEMENT
  });
  let mapService = this.subject({ cachedMaps: stubCachedMaps });
  let element = mapService.getMapElement('San Francisco');

  assert.equal(element, DUMMY_ELEMENT, 'element fetched from cache');
});
