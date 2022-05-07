module.exports = {
  content: {
    files: ["src/**/*.purs"],
  },
  theme: {
    extend: {
      animation: {
        'disappear-useful': 'disappear 2s linear 1s 1 forwards',
        'disappear-important': 'disappear 2s linear 4s 1 forwards',
        'disappear-critical': 'disappear 2s linear 7s 1 forwards',
      },
      keyframes: {
        disappear: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      },
    },
  },
  plugins: [],
};
