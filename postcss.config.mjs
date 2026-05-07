const config = {
  plugins: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': {
          preserve: false
        },
        'custom-media-queries': true,
        'media-query-ranges': true
      },
      insertBefore: {
        'env-priority': 'postcss-priority-order'
      }
    }
  }
};

export default config;
