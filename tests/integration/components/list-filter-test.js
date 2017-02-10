import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

test('should initially load all listings', function (assert) {
  // we want promises returned since they could be async
  this.on('filterByCity', (val) => {
    if (val === ''){
      return RSVP.resolve(ITEMS);
    } else {
      return FILTERED_ITEMS.resolve(FILTERED_ITEMS);
    }
  });

  // In integration tests we can use the template the same way our app will use it
  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
    <ul>
      {{#each results as |item|}}
      <li class="city">
        {{item.city}}
      </li>
      {{/each}}
    </ul>
    {{/list-filter}}
  `);

  // Keyup to trigger action!
  this.$('.list-filter input') .val('San').keyUp();

  // the wait function returns a promise that will wait for ALL promises
  return wait().then(() => {
    assert.equal(this.$('.city').length, 3);
    assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
  });
});
