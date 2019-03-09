// let fs = require('fs');
let path = require('path');

function BuildManifestPlugins() {}

BuildManifestPlugins.prototype.apply = function(compliler) {
	compliler.plugin('emit', (compliler, callback) => {
		let manifest = JSON.stringify(
			compliler.getStats().toJson().assetsByChunkName
		);

		compliler.assets['manifest.json'] = {
			source: function () {
				return manifest;
			},

			size: function () {
				return manifest.length;
			},
		};

		callback();
	});

    // compliler.plugin('done', this.writeManifest);
};

// BuildManifestPlugins.prototype.writeManifest = function(stats) {
//     fs.writeFileSync(
//         path.resolve('dist/manifest.json'),
//         JSON.stringify(stats.toJson().assetsByChunkName)
//     );
// }

module.exports = BuildManifestPlugins;