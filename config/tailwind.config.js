module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/assets/javascripts/preline.js',
  ],
  plugins: [
    require('preline/plugin'),
  ],
}
