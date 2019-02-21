// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-ember-merge');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const MESSAGE = rule.meta.message;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-ember-merge', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          init() {
            merge({}, {});
          }
        });`
    },
    {
      code: `
        import { assign } from '@ember/polyfills';

        function merge() {
          // custom merge
        }

        export default Ember.Component({
          init() {
            merge({}, {});
          }
        });`
    }
  ],
  invalid: [
    {
      code: `
        import Ember from 'ember';

        export default Ember.Component({
          init() {
            Ember.merge({}, {});
          }
        });`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        import { merge } from '@ember/polyfills';

        export default Ember.Component({
          init() {
            merge({}, {});
          }
        });`,
      errors: [{
        message: MESSAGE
      }]
    },
  ]
});
