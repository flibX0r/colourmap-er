var fs = require('fs');
var PNGImage = require('pngjs-image');
var parseColour = require('parse-color');
var d3chromatic = require('d3-scale-chromatic');

function vomitImage(func, filename) {
	var image = PNGImage.createImage(256,1);

	for (var x = 0; x < 256; ++x) {
		var col = parseColour(func(x/256));
			
		image.setAt(x,0, {
			red: col.rgba[0],
			green: col.rgba[1],
			blue: col.rgba[2],
			alpha: 255*col.rgba[3]
		});
	}

	image.writeImage('./colourmaps/'+filename+'.png');
}

if (!fs.existsSync('colourmaps')) {
	fs.mkdirSync('colourmaps');
}

vomitImage(d3chromatic.interpolateViridis, 'viridis');
vomitImage(d3chromatic.interpolateInferno, 'inferno');
vomitImage(d3chromatic.interpolateMagma, 'magma');
vomitImage(d3chromatic.interpolatePlasma, 'plasma');

vomitImage(d3chromatic.interpolateWarm, 'warm');
vomitImage(d3chromatic.interpolateCool, 'cool');
vomitImage(d3chromatic.interpolateRainbow, 'rainbow');