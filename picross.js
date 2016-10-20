export default class Picross {
    constructor(pic) {
        this._pic = pic ? pic : [];
        this._rows = this._pic;

        if (this._rows.length > 0) {
            this._cols = [];
            for (let i = 0; i < this._rows[0].length; i++) {
                var col = this._pic.map(row=>row[i]);
                this._cols.push(col);
            }
        }
        var internal = new Array(this._cols.length).fill(0);
        this._grid = new Array(this._rows.length).fill(0).map(()=>internal.slice());
    }

    static get status() {
        return {
            PLAYING: 'PLAYING',
            FINISHED: 'FINISHED'
        }
    }

    get pic() {
        return this._pic;
    }

    get rows() {
        return this._rows;
    }

    get cols() {
        return this._cols;
    }

    get grid() {
        return this._grid;
    }

    get rowsTips() {
        return Picross._tips(this._rows);
    }

    get colsTips() {
        return Picross._tips(this._cols);
    }

    static _tips(array) {
        return array.map(item=>Picross._getTip(item));
    }

    static _getTip(array) {
        let tip = [];
        let sum = 0;

        for (let i = 0; i < array.length; i++) {
            let cur = array[i];

            if (cur != 1 && cur != 0) throw TypeError('Bad argument');

            if (cur == 1) {
                sum++;
            }
            if (sum > 0 && (cur === 0 || i == array.length - 1)) {
                tip.push(sum);
                sum = 0;
            }
        }
        return tip.length > 0 ? tip : [0];
    }

    _setCellValue(x, y, val) {
        if (x < this._rows.length && y < this._cols.length) {
            return this._grid[x][y] = val;
        }
    }

    _getCellValue(x, y) {
        if (x < this._rows.length && y < this._cols.length) {
            return this._grid[x][y];
        }
        return undefined;
    }

    check(x, y) {
        return this._setCellValue(x, y, 1);
    }

    toggleCheck(x, y) {
        var val = this._getCellValue(x, y);
        val = val == 1 ? 0 : 1;
        return this._setCellValue(x, y, val);
    }

    get currentStatus() {
        for (let x = 0; x < this._rows.length; x++) {
            for (let y = 0; y < this._cols.length; y++) {
                var checked = this._grid[x][y];
                var real = this._pic[x][y];
                if (real === 0 && checked == 1) {
                    return Picross.status.PLAYING;
                }
                if (real == 1 && checked != 1) {
                    return Picross.status.PLAYING;
                }
            }
        }
        return Picross.status.FINISHED;
    }
}