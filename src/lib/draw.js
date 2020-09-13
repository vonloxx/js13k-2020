function drawPath(ctx, path, stroke, fill, lineWidth) {
  let path2d = new Path2D(path);

  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.lineWidth = lineWidth;

  stroke && ctx.stroke(path2d);
  fill && ctx.fill(path2d);
};

function drawCircle(ctx, x, y, r, stroke, fill, lineWidth) {
  let path2d = new Path2D();

  path2d.ellipse(x, y, r, r, Math.PI / 4, 0, 2 * Math.PI);

  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.lineWidth = lineWidth;

  stroke && ctx.stroke(path2d);
  fill && ctx.fill(path2d);
};

function drawRect(ctx, x, y, w, h, stroke, fill, lineWidth) {
  let path2d = new Path2D();

  path2d.rect(x, y, w, h);

  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.lineWidth = lineWidth;

  stroke && ctx.stroke(path2d);
  fill && ctx.fill(path2d);
}

function drawBird(ctx, x, y, w, h, frame, color) {
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-90 * Math.PI / 180);
  ctx.translate(-w / 2, -h / 2);

  // legs
  drawPath(ctx, 'M79 117s-2 9-10 12m0 0s-7 3-15 3m15-3c1 2 0 3-7 11', '#FFA63D', null, 5);
  drawPath(ctx, 'M97 117s-2 9-9 12m0 0s-8 3-15 3m15-3c0 2-1 3-8 11', '#FFA63D', null, 5);

  // beak
  ctx.save();
  this.type == 2 && this.counter % 20 < 10 && ctx.rotate(-5 * Math.PI / 180);
  drawPath(ctx, 'M189 99l-17 8 5-13 12 5z', '#000', '#FFA63D', 10);
  this.type == 2 && this.counter % 20 < 10 && ctx.rotate(10 * Math.PI / 180);
  drawPath(ctx, 'M198 89l-21-16 1 18 20-2z', '#000', '#FFA63D', 10);
  ctx.restore();

  // top feather
  drawPath(ctx, 'M126 25s-8-19-6-19 11 8 18 18 4 10 4 10l-21-2s-17-13-16-14 13 7 13 7-8-12-5-13c2 0 13 13 13 13z', '#000', '#000', 5);

  // back feathers
  drawPath(ctx, 'M40 77S7 73 7 75c-1 2 13 10 30 14 17 5 16 3 16 3l1-22S33 55 31 57c-2 1 10 11 10 11s-20-5-21-2c-2 3 20 11 20 11z', '#000', '#000', 5);

  // body
  drawPath(ctx, 'M166 47c-14-21-86-16-103 0-16 17-11 51 0 64 12 12 89 10 103 0 14-11 15-43 0-64z', '#000', this.color, 15);
  drawPath(ctx, 'M124 99c-16-6-68-13-68-13s0 7 4 14c4 8 4 9 9 12 5 2 15 4 28 5 19 1 40-1 40-1s3-12-13-17z', null, '#fff', null);

  // eye
  drawCircle(ctx, 143.6, 75.6, 19.1, '#000', '#fff', 10);
  drawCircle(ctx, 148.6, 75.6, 8.2, null, '#000', null);
  drawCircle(ctx, 150.9, 72.8, 2.9, null, '#fff', null);

  // eyebrow
  drawPath(ctx, 'M152 48l-23-2-1 7 21-1 3-4z', null, '#000', null);

  // wing
  switch (this.currentFrame) {
    case 0:
      // ctx.translate(0, 40);
      ctx.scale(1, 1);
      break;
    case 1:
      ctx.translate(0, 40);
      ctx.scale(1, .5);
      break;
    case 2:
      ctx.translate(0, 130);
      ctx.scale(1, -.5);
      break;
    case 3:
      ctx.translate(0, 160);
      ctx.scale(1, -1);
      break;
    case 4:
      ctx.translate(0, 130);
      ctx.scale(1, -.5);
      break;
    case 5:
      ctx.translate(0, 40);
      ctx.scale(1, .5);        
      break;
            
    default:
      break;
  }

  drawPath(ctx, 'M93 82s8 4-4 17c-12 14-26 24-28 23-3-1 13-28 13-28s-18 17-21 15 10-18 10-18-17 8-18 6 25-17 25-17', '#000', null, 10);
  drawPath(ctx, 'M74 94s-16 27-13 28c2 1 16-9 28-23s4-17 4-17l-23-2S44 95 45 97s18-6 18-6-13 16-10 18 21-15 21-15z', null, this.color, null);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * 11 x 15 ish (including 0s) grid for drawing in
 */
const glyphs = [
  // ...new Array(33) is nicer but doesn't zip as well (~7 B)
  '','','','','','','','','','','',
  '','','','','','','','','','','',
  '','','','','','','','','','','',
  '5 0 5 9 M5 12 5 14',            // !
  '',                              // "
  '',                              // #
  '0 11 0 15 3 15 0 0 9 2 11 15 8 15 8 11',  // $ (music logo)
  '1 5 1 2 4 2 4 5Z M2 15 9 0 M7 10 10 10 10 13 7 13Z',// %
  '',                              // &
  '6 0 4 3',                       // '
  '',                              // (
  '',                              // )
  '',                              // *
  '',                              // +
  '6 12 4 15',                     // ,
  '3 6 8 6',                       // -
  '6 15 6 14',                     // .
  '2 15 8 0',                      // /
  '6 0 11 7 6 14 1 7Z M6 6 6 8',   // 0
  '2 4 6 1 6 14',                  // 1
  '0 4 6 0 10 4 1 13 11 13',       // 2
  '2 0 10 3 6 7 10 11 2 13',       // 3
  '6 1 1 11 10 11 M6 7 6 15',      // 4
  '10 1 3 1 1 7 10 7 8 13 0 13',   // 5
  '11 1 6 1 1 13 10 13 10 7 4 7',  // 6
  '3 1 11 1 6 14',                 // 7
  '2 4 6 0 10 4 2 10 6 14 10 10Z', // 8
  '1 13 6 13 11 1 2 1 2 7 9 7',    // 9
  '',                              // :
  '',                              // ;
  '10 4 2 8 10 12',                // <
  '2 6 10 6 M2 10 10 10',          // =
  '2 4 10 8 2 12',                 // >
  '',                              // ?
  '',                              // @
  '1 14 5 2 10 14 M3 9 8 9',       // A
  '3 13 3 0 10 3 4 7 10 10Z',      // B
  '9 1 5 1 3 3 3 11 5 13 9 13',    // C
  '3 13 3 1 7 1 9 4 9 10 7 13Z',   // D
  '9 13 3 13 3 1 9 1 M3 7 7 7',    // E
  '3 14 3 1 9 1 M3 7 7 7',         // F
  '7 1 2 4 2 11 6 13 9 9 5 9',     // G
  '2 14 2 0 M9 14 9 0 M2 8 9 8',   // H
  '3 13 9 13 M3 1 9 1 M6 13 6 1',  // I
  '2 11 6 14 9 11 9 1 4 1',        // J
  '3 14 3 0 M9 2 4 8 9 14',        // K
  '4 0 4 13 9 13',                 // L
  '2 14 2 2 6 6 10 2 10 14',       // M
  '2 14 2 2 9 12 9 0',             // N
  '6 0 11 7 6 14 1 7Z',            // 0
  '3 14 3 1 10 1 9 7 3 7',         // P
  '5 1 10 7 5 13 0 7Z M9 13 5 8',  // Q
  '3 14 3 1 10 1 9 7 4 7 10 13',   // R
  '10 1 3 1 1 7 10 7 8 13 0 13',   // S
  '6 14 6 1 M2 1 10 1',            // T
  '3 0 3 12 6 14 9 12 9 0',        // U
  '3 1 3 7 6 13 9 7 9 1',          // V
  '1 0 3 12 6 5 9 12 11 0',        // W
  '2 0 10 14 M10 0 2 14',          // X
  '6 14 6 8 M2 1 6 8 10 1',        // Y
  '1 1 9 1 2 13 10 13',            // Z
  '8 0 4 0 4 14 8 14',             // [
  '8 15 2 0',                      // \
  '3 0 7 0 7 14 3 14',             // ]
].map(path => new Path2D('M' + path));

/**
 * SVG like font by burntcustard https://twitter.com/burntcustard
 */
function drawText(ctx, text, x, y, size, stroke, lineWidth, align) {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  align == 1 && (x = x - (text.length * 13 * size));
  align == 2 && (x = x - (text.length * 13 * size / 2));

  ctx.translate(x, y);
  ctx.scale(size, size);

  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;

  [...text].forEach((c, i) => {
    let glyph = glyphs[c.toUpperCase().charCodeAt(0)];
    if (glyph) {
      ctx.stroke(glyph);
    }
    ctx.translate(
      13, 0
      // ((i + 2) % 15 === 1 ? -182 : 13),
      // ((i + 2) % 15 === 1 ? 24 : 0)
    );
  });
  ctx.restore();
}

function drawTextWithShadow(ctx, text, x, y, size, stroke, lineWidth, align) {
  drawText(ctx, text, x + 2, y + 2, size, '#000', lineWidth, align);
  drawText(ctx, text, x, y, size, stroke, lineWidth, align);
}

export {drawPath, drawCircle, drawRect, drawText, drawTextWithShadow};