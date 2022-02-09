const paths = {
  development: '.env.dev',
  production: '.env',
};

module.exports =
  process.env.NODE_ENV && paths[process.env.NODE_ENV]
    ? require('dotenv').config({ path: paths[process.env.NODE_ENV] })
    : require('dotenv').config({ path: paths.development });
