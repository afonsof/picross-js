import chai from 'chai';
import Picross from "../picross";
var assert = chai.assert;

describe('picross', ()=> {
    describe('getCol', ()=> {
        let picross = new Picross([
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 1, 1, 0],
            [1, 1, 1, 1]
        ]);

        it('1111 when the grid is 1000,1100,1110,1111 and the selected col is 0', () => {
            assert.deepEqual([1, 1, 1, 1], picross.cols[0]);
        });
        it('0111 when the grid is 1000,1100,1110,1111 and the selected col is 1', ()=> {
            assert.deepEqual([0, 1, 1, 1], picross.cols[1]);
        });
        it('0011 when the grid is 1000,1100,1110,1111 and the selected col is 2', ()=> {
            assert.deepEqual([0, 0, 1, 1], picross.cols[2]);
        });
        it('0001 when the grid is 1000,1100,1110,1111 and the selected col is 3', () => {
            assert.deepEqual([0, 0, 0, 1], picross.cols[3]);
        });
        it('undefined when selected col is out of range', ()=> {
            assert.deepEqual(undefined, picross.cols[-1]);
        });
    });

    describe('getRow', ()=> {
        let picross = new Picross([
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 1, 1, 0],
            [1, 1, 1, 1]
        ]);

        it('1000 when the grid is 1000,1100,1110,1111 and the selected col is 0', () => {
            assert.deepEqual([1, 0, 0, 0], picross.rows[0]);
        });
        it('1100 when the grid is 1000,1100,1110,1111 and the selected col is 1', ()=> {
            assert.deepEqual([1, 1, 0, 0], picross.rows[1]);
        });
        it('1110 when the grid is 1000,1100,1110,1111 and the selected col is 2', ()=> {
            assert.deepEqual([1, 1, 1, 0], picross.rows[2]);
        });
        it('1111 when the grid is 1000,1100,1110,1111 and the selected col is 3', () => {
            assert.deepEqual([1, 1, 1, 1], picross.rows[3]);
        });
        it('undefined when selected col is out of range', ()=> {
            assert.deepEqual(undefined, picross.rows[-1]);
        });
    });

    describe('colCount', ()=> {
        let picross = new Picross([
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 1, 1, 0]
        ]);

        it('4 when the grid is 1000,1100,1110', () => {
            assert.equal(4, picross.cols.length);
        });
    });
    describe('rowCount', ()=> {
        let picross = new Picross([
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 1, 1, 0]
        ]);

        it('3 when the grid is 1000,1100,1110', () => {
            assert.equal(3, picross.rows.length);
        });
    });
    describe('getPicCell', ()=> {
        let picross = new Picross([
            [0, 0, 1],
            [0, 1, 0],
            [1, 0, 0]
        ]);

        it('corresponds to the correct cell', () => {
            assert.equal(0, picross.pic[0][0]);
            assert.equal(0, picross.pic[0][1]);
            assert.equal(1, picross.pic[0][2]);
            assert.equal(0, picross.pic[1][0]);
            assert.equal(1, picross.pic[1][1]);
            assert.equal(0, picross.pic[1][2]);
            assert.equal(1, picross.pic[2][0]);
            assert.equal(0, picross.pic[2][1]);
            assert.equal(0, picross.pic[2][2]);
        });
    });

    describe('rows', ()=> {
        let rows = [
            [0, 0, 1],
            [0, 1, 1],
            [1, 0, 1]
        ];

        let picross = new Picross(rows);

        it('corresponds to the correct cell', () => {
            assert.deepEqual(rows, picross.rows);
        });
    });

    describe('cols', ()=> {
        let rows = [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [1, 0, 1, 0]
        ];

        let cols = [
            [0, 0, 1],
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];

        let picross = new Picross(rows);

        it('corresponds to the correct cell', () => {
            assert.deepEqual(cols, picross.cols);
        });
    });

    describe('rowTips', ()=> {
        let rows = [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [1, 0, 1, 0]
        ];

        let picross = new Picross(rows);

        it('corresponds to the correct cell', () => {
            assert.deepEqual([[1], [2], [1, 1]], picross.rowsTips);
            assert.deepEqual([[1], [1], [3], [0]], picross.colsTips);
        });
    });

    describe('getTip', ()=> {
        it('0 when the array is 0', ()=> {
            assert.deepEqual([0], Picross._getTip([0]));
        });
        it('0 when the array is 0000', ()=> {
            assert.deepEqual([0], Picross._getTip([0, 0, 0, 0]));
        });
        it('1,1 when the array is 101', ()=> {
            assert.deepEqual([1, 1], Picross._getTip([1, 0, 1]));
        });
        it('1,1 when the array is 1001', ()=> {
            assert.deepEqual([1, 1], Picross._getTip([1, 0, 0, 1]));
        });
        it('1,1 when the array is 001000100', ()=> {
            assert.deepEqual([1, 1], Picross._getTip([0, 0, 1, 0, 0, 1, 0, 0]));
        });
        it('1,2,3 when the array is 0101101110', ()=> {
            assert.deepEqual([1, 2, 3], Picross._getTip([0, 1, 0, 1, 1, 0, 1, 1, 1, 0]));
        });
        it('throws exception when the array is a', ()=> {
            assert.throws(()=> {
                Picross()._getTip(['a'])
            }, TypeError);
        });
        it('throws exception when the array is -1 0 -1', ()=> {
            assert.throws(()=> {
                Picross._getTip([-1, 0, -1])
            }, TypeError);
        });
        it('throws exception when the array is 123', ()=> {
            assert.throws(()=> {
                Picross._getTip([1, 2, 3])
            }, TypeError);
        });
    });

    describe('check', ()=> {
        let pic = [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [1, 0, 1, 0]
        ];
        let picross = new Picross(pic);

        it('is empty when starts', ()=> {
            assert.deepEqual([
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ], picross.grid);
        });

        it('is checked one item when check is called', ()=> {
            picross.check(0, 0);
            picross.check(1, 2);
            picross.check(2, 3);

            assert.deepEqual([
                [1, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ], picross.grid);
        });
    });

    describe('status', ()=> {
        let pic = [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [1, 0, 1, 0]
        ];
        let picross = new Picross(pic);

        it('', ()=> {
            assert.deepEqual(Picross.status.PLAYING, picross.currentStatus);
        });

        it('', ()=> {
            picross.check(0, 2);
            assert.deepEqual(Picross.status.PLAYING, picross.currentStatus);

            picross.check(1, 1);
            assert.deepEqual(Picross.status.PLAYING, picross.currentStatus);

            picross.check(1, 2);
            assert.deepEqual(Picross.status.PLAYING, picross.currentStatus);

            picross.check(2, 0);
            assert.deepEqual(Picross.status.PLAYING, picross.currentStatus);

            picross.check(2, 2);
            assert.deepEqual(Picross.status.FINISHED, picross.currentStatus);
        });
    });
});