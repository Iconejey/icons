const app = require('express')();
const { registerFont, createCanvas } = require('canvas');

// Register material icons font
registerFont(`./Material Icons and Simbols Outlined.ttf`, { family: 'Material Icons' });

// Icon generation api
app.get('/:shape/:code/:bg/:fg/:width/:height', (req, res) => {
	// Get params
	const { shape, code, bg, fg, width, height } = req.params;
	const w = parseInt(width);
	const h = parseInt(height);

	console.log(shape, code, bg, fg, w, h);

	// Create canvas
	const canvas = createCanvas(w, h);
	const ctx = canvas.getContext('2d');

	// If background is not "none"
	if (bg !== 'none') {
		// Set background color
		ctx.fillStyle = `#${bg}`;

		// If shape is circle
		if (shape === 'circle') {
			ctx.beginPath();
			ctx.arc(w / 2, h / 2, w / 2, 0, 2 * Math.PI);
			ctx.fill();
		}

		// Else fill with color
		else ctx.fillRect(0, 0, w, h);
	}

	// Set font to Material Icons centered with color
	let font_size = h !== w ? 300 : h * 0.6;
	if (shape === 'circle') font_size /= 0.8;
	if (shape === 'badge') font_size = h;

	font_size = Math.floor(font_size);
	ctx.font = `${font_size}px Material Icons`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = `#${fg}`;

	// Draw text
	ctx.fillText(code, w / 2, h / 2);

	const buffer = canvas.toBuffer('image/png');

	// Send icon
	res.set('Content-Type', 'image/png');
	res.send(buffer);
});

// Start server
app.listen(8013, () => console.log('Server running on port 8013'));
