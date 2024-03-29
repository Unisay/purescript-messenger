module.exports = {
  content: {
    files: ["src/**/*.purs"],
  },
  theme: {
    fontFamily: {
      'mono': ['Roboto Mono', 'monospace']
    },
    extend: {
      animation: {
        'disappear-useful': 'disappear 2s linear 1s 1 forwards',
        'disappear-important': 'disappear 2s linear 4s 1 forwards',
        'disappear-critical': 'disappear 2s linear 7s 1 forwards',
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
      },
      keyframes: {
        disappear: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0) ' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      },
      scale: {
        101: '1.01',
      },
      gridTemplateColumns: {
        chat: '1fr 13rem'
      },
      height: {
        21: '85px',
        'chat': 'calc(100vh - 12rem)'
      },
      colors: {
        'slate-350': 'E2E0E0'
      },
      fontWeight: {
        'datetime': '550'
      },
      maxWidth: {
        'chat': '77rem',
      }
    }
  },
  plugins: [],
};
