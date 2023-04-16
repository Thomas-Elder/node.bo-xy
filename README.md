# node.bo-xy
A box related game.

Learning some node.js

This app is basically to serve a Javascript game currently called Dodge.

## Testing
jasmine is the testing library used, and it's run with `npm test`.

nyc is used to check coverage of tests, it reports at the end of npm test, but the report can also be shown by running `npm run cover`.

## Workflow
### Tools
Two tools are used to make bo-xy easier to work on.

browserify bundles required files to make them easier to include. Running `npm build` bundles all single player box game scripts into client_sn.js. The build script also pipes the output of browserify through uglify.js to minify.

watchify watches the same set of required files, and rebundles anytime a change is saved. Running `npm watch` starts watchify.

Required files are listed in `client/browserify.js`.