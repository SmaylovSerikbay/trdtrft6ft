module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {
      flexbox: true,
      grid: true
    },
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true
      }
    }
  }
} 