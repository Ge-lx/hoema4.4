function run() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  createVectors(2);
  ctx.fillStyle = 'orange';
  Vectors.forEach( vector => drawVector(ctx, transform2(vector)) );
  ctx.fillStyle = 'blue';
  Vectors.forEach( vector => drawVector(ctx, transform(vector)) );
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  Vectors.forEach( vector => drawVector(ctx, vector) );
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

let Vectors = [];

function transform(vec) {
  let mat = [ [ 1, 2 ],
              [ 0, 1 ] ];

  return new Vector (
    mat[0][0] * vec.x + mat[0][1] * vec.y,
    mat[1][0] * vec.x + mat[1][1] * vec.y );
}

function transform2(vec) {
  let mat = [ [ 0.0, -2 ],
              [ 0.8, 0.2 ] ];

  return new Vector (
    mat[0][0] * vec.x +  mat[0][1] * vec.y,
    140 * ( Math.sin(10 * mat[1][0] * vec.x) + Math.sin(0.02 * vec.x)) + 4 * mat[1][1] * vec.y);
}

function createVectors(limit = 1) {
  for (let x = -limit; x < limit; x += 0.0001) {
    let y1 = Math.sqrt( 1 - x * x);
    let y2 =  -1 * y1;
    Vectors.push(new Vector(x * 200, y1 * 200) );
    Vectors.push(new Vector(x * 200, y2 * 200) );
  }
}

function drawVector (ctx, vec, from) {
  from = from ? from : new Vector(500, 500);
  let to = from.add(vec);
  ctx.fillRect(to.x, to.y, 2, 2);
  let oldcolor = ctx.fillStyle;
  ctx.fillStyle = 'black';
  ctx.fillRect(to.x, to.y, 1, 1);
  ctx.fillStyle = oldcolor;
  console.log('X: ' + to.x + ' Y: ' + to.y);
}

const NORMS = ['Max', 'Eukl.', 'Hoch1'];
class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  norm (norm) {
    switch (norm) {
      case 'Max': 
        return Math.max(Math.abs(this.x), Math.abs(this.y) );
      case 'Eukl.':
        return sqrt( (this.x * this.x) + (this.y * this.y) );
      case 'Hoch1':
        return Math.abs(this.x) + Math.abs(this.y);
    }
  }

  multiply (times) { return new Vector(this.x * times, this.y * times); }
  add (other) { return new Vector(this.x + other.x, this.y + other.y); }
  subtract (other){ return this.add(other.multiply(-1)); }
}



window.onload = run;
