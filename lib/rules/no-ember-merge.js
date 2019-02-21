'use strict';

const utils = require('../utils/utils');
const ember = require('../utils/ember');

//----------------------------------------------------------------------------------
// General rule - Ember.merge is deprecated and Ember.assign should be used instead
//----------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow Ember.merge in favor of Ember.assign',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
  },

  create(context) {
    const message = 'Ember.merge is deprecated; please use Ember.assign';

    let importsEmberMerge;

    const report = function (node) {
      context.report(node, message);
    };

    return {
      ImportDeclaration(node) {
        if (node.source.value === '@ember/polyfills') {
          importsEmberMerge = node.specifiers.filter(specifier => specifier.local.name === 'merge').length;
        }
      },

      CallExpression(node) {
        if (importsEmberMerge && node.callee && node.callee.name === 'merge') {
          report(node);
        }
      },

      MemberExpression(node) {
        if (node.object && node.object.name === 'Ember' && node.property && node.property.name === 'merge') {
          report(node);
        }
      }
    };
  }
};
