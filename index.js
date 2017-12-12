module.exports = function () {
  const fs = require('fs');
  const path = require('path');
  const param = {};
  const size = {'B': 1, 'K': 1024, 'M': 1024 ** 2, 'G': 1024 ** 3};
  const arg = process.argv.slice(2);

  const toBytes = (str) => +str.match(/\d{1,}/g) * size[str.match(/B|K|M|G/g)];
  const filter = (str) => {
	if (/--/.test(str)) {
	  return param[(str.match(/--(.*)=/)[1]).toLowerCase()] = str.replace(/(.*)=/g, '$`');
	}
  };

  arg.map((i) => filter(i));

  if (param['min-size']) {
	param['min-size'] = toBytes(param['min-size']);
  }

  if (param['max-size']) {
	param['max-size'] = toBytes(param['max-size']);
  }

  const func = (err, arr) => err ? console.log(err) : arr.map((i) => console.log(i));

  const getFiles = function (dir, callback) {
	let results = [];
	fs.readdir(dir, function (err, files) {
	  if (err) return callback(err);
	  let counter = files.length;
	  if (!counter) return callback(null, results);
	  files.forEach(function (item) {
		let essence = item;
		item = path.resolve(dir, item);
		fs.stat(item, function (err, stat) {
		  if (stat && stat.isDirectory()) {
			param.type !== 'F' ?
			  !param.pattern || (essence.indexOf(param.pattern) >= 0) ? results.push(item)
				: null
			  : null;
			getFiles(item, function (err, res) {
			  results = results.concat(res);
			  if (!--counter) callback(null, results);
			});
		  } else {
			param.type !== 'D' ?
			  !param['max-size'] || stat.size < param['max-size'] ?
				!param['min-size'] || stat.size > param['min-size'] ?
				  !param.pattern || (essence.indexOf(param.pattern) >= 0) ? results.push(item)
					: null
				  : null
				: null
			  : null;
			if (!--counter) callback(null, results);
		  }
		});
	  });
	});
  };

  getFiles(param.dir, func);
};

