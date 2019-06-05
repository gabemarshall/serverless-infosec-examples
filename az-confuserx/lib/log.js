const Multispinner = require('multispinner');
const figures = require('figures');
const chalk = require('chalk');

exports.info = function (msg) {
  console.log(msg);
}
exports.success = function (msg) {
  let quickStep = exports.loading(msg);
  quickStep.status.success(quickStep.finished);
}
exports.loading = function (msg) {
  let spinners;
  if (typeof (msg) === 'string') {
    spinners = [];
    spinners.push(msg);
  } else {
    spinners = msg;
  }
  const opts = {
    'interval': 120,

    'color': {
      incomplete: 'white'
    },
    'preText': '',
    // 'frames': [
    //   '[      ]',
    //   '[*     ]',
    //   '[**    ]',
    //   '[ **   ]',
    //   '[  **  ]',
    //   '[   ** ]',
    //   '[    **]',
    //   '[     *]'
    // ],
    // 'symbol': {
    //   'success': ' '.repeat(7) + figures.tick
    // }
  }

  // initialize
  let m = new Multispinner(spinners, opts);
  return { status: m, finished: spinners[0] };
}

// function printHeader(color, text) {
//   const fill = '═'.repeat(text.length)
//   console.log(chalk[color](
// `
// ╔═${fill}═╗
// ║ ${text} ║
// ╚═${fill}═╝
// `
//   ))
// }