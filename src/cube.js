const nano3d = require('./nano3d');

const positions = [
    -1, -1, -1,
     1, -1, -1,
     1,  1, -1,
    -1,  1, -1,

    -1, -1,  1,
     1, -1,  1,
     1,  1,  1,
    -1,  1,  1,
];

const lines = [
    [0, 1, 2, 3, 0],
    [4, 5, 6, 7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
];

module.exports = new nano3d.Wireframe(positions, lines);
