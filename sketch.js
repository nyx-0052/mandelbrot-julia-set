let angle = 0;

function setup() {
    createCanvas(800,800);
    pixelDensity(1);
}

function draw(){
    loadPixels();

    // loops through every pixel
    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++){

          // tinkle with the scale "how much it is zoomed in by" by changing the bound values 
          var bound = 2;

          var a = map(x, 0, width, -bound, bound);
          var b = map(y, 0, height, -bound, bound);

          //constant
          var c_a = (PI/10);
          var c_b = (PI/100);


          // breathing/animated
          // var c_a = sin(angle);
          // var c_b = tan(angle);

          // mouse tracking
        //   var c_a = map(mouseX, 0, width, -1, 1); 
        //   var c_b = map(mouseY, 0, width, -1, 1); 

          var n = 0;
          var max_iterations = 100;

          while (n < max_iterations){
            //getting new z^2 + c
            var aa = a*a - b*b;
            var bb = 2*a*b;
            a = aa + c_a;
            b = bb + c_b;
            if (abs(a+b)> 4){
              break;
            }
            n++;
          }

          var r = map(n, 0, max_iterations, 0, 255);
          var g = map(n, 0, max_iterations, 0, 0);
          var b = map(n, 0, max_iterations, 0, 144);

          // if it is in the mandelbrot set
          if (n === max_iterations){
            r = 0;
            g = 0;
            b = 0;
          }

            var pix = (x + y * width) * 4;
            // uses a rgba system
            //r: red value
            pixels[pix + 0] = r;
            //g: green value
            pixels[pix + 1] = g;
            //b: blue value
            pixels[pix + 2] = b;
            // alpha: transparent
            pixels[pix + 3] = 255;

        }
    }
    updatePixels();
    angle = angle + 0.02;
}