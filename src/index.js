import p5 from 'p5';
import './styles.css';
import { Delaunay } from './delaunay.js';


let points = [];
let triangles = [];

const sketch = (p) => {
    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = function() {
        p.background(100); // 0, 100, 200
        for (let i = 0; i < points.length; i++) {
            p.ellipse(points[i][0], points[i][1], 5, 5);
        }
        for (let i = 0; i < triangles.length; i += 3) {
            p.beginShape();
            p.fill(255-(i / triangles.length)*255, 0, 128);
            p.vertex(points[triangles[i]][0], points[triangles[i]][1]);
            p.vertex(points[triangles[i+1]][0], points[triangles[i+1]][1]);
            p.vertex(points[triangles[i+2]][0], points[triangles[i+2]][1]);
            p.endShape(p.CLOSE);
        }
    };

    p.mousePressed = function() {
        points.push([p.mouseX, p.mouseY]);
        triangles = Delaunay.triangulate(points);
    };
};

const containerElement = document.getElementById('root');

new p5(sketch, containerElement);



