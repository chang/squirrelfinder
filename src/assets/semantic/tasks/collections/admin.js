/*******************************
     Admin Task Collection
*******************************/

/*
  This are tasks to be run by project maintainers
  - Creating Component Repos
  - Syncing with GitHub via APIs
  - Modifying package files
*/

/*******************************
             Tasks
*******************************/


module.exports = function(gulp) {
  var
    // less/css distributions
    initcomponents      = require('../admin/components/init'),
    createcomponents    = require('../admin/components/create'),
    updatecomponents    = require('../admin/components/update'),

    // single component releases
    initDistributions   = require('../admin/distributions/init'),
    createDistributions = require('../admin/distributions/create'),
    updateDistributions = require('../admin/distributions/update'),

    release             = require('../admin/release'),
    publish             = require('../admin/publish'),
    register            = require('../admin/register')
  ;

  /* Release */
  gulp.task('init distributions', 'Grabs each component from GitHub', initDistributions);
  gulp.task('create distributions', 'Updates files in each repo', createDistributions);
  gulp.task('init components', 'Grabs each component from GitHub', initcomponents);
  gulp.task('create components', 'Updates files in each repo', createcomponents);

  /* Publish */
  gulp.task('update distributions', 'Commits component updates from create to GitHub', updateDistributions);
  gulp.task('update components', 'Commits component updates from create to GitHub', updatecomponents);

  /* Tasks */
  gulp.task('release', 'Stages changes in GitHub repos for all distributions', release);
  gulp.task('publish', 'Publishes all releases (components, package)', publish);
  gulp.task('register', 'Registers all packages with NPM', register);

};