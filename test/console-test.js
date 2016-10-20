import blessed from 'blessed';
import Picross from "../picross";

let picross = new Picross([
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0]
]);

// Create a screen object.
var screen = blessed.screen({
    //smartCSR: true
});

screen.title = 'Picross';


var style = {
    fg: 'white',
    bg: '#000000'
};
var style2 = {
    fg: 'white',
    bg: 'white'
};


picross.rowsTips.forEach((cur, index)=> {
    let box = blessed.box({
        top: 130 + (index * 30) + '',
        left: '0',
        width: '100',
        height: '30',
        content: `{right}${cur}{/right}`,
        tags: true,
        style: style
    });
    screen.append(box);
});

picross.colsTips.forEach((cur, index)=> {
    let tipText = cur.join('\n');
    let box = blessed.box({
        top: '0',
        left: 130 + (index * 30) + '',
        width: '30',
        height: 30 * cur.length + '',
        content: `{right}${tipText}{/right}`,
        tags: true,
        style: style
    });
    screen.append(box);
});

var statusBox = blessed.box({
    top: '500',
    left: '0',
    width: '400',
    height: '30',
    content: picross.currentStatus,
    tags: true,
    style: style
});

screen.append(statusBox);

for (let col = 0; col < picross.cols.length; col++) {
    for (let row = 0; row < picross.rows.length; row++) {
        let text = picross.pic[row][col];
        let s = text ? style : style2;

        let box = blessed.box({
            top: 130 + (row * 30) + '',
            left: 130 + (col * 30) + '',
            width: '30',
            height: '30',
            content: `{right}{/right}`,
            tags: true,
            style: style
        });
        box.on('click', function (data) {
            let val = picross.toggleCheck(row, col);
            if (val) {
                box.setContent('■');
            }
            else {
                box.setContent('');
            }
            statusBox.setContent(picross.currentStatus);
            screen.render();
        });

        screen.append(box);
    }
}

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

// Render the screen.
screen.render();