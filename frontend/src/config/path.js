const path = require('path');

// Helper function to resolve paths relative to the project root
function resolveApp(relativePath) {
  return path.resolve(__dirname, relativePath);
}

module.exports = {
  // ... other paths
  dotenv: resolveApp('env/.env'),
};
