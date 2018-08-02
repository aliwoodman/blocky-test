import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach(column => {
      expect(column.length).toBe(10);

      column.forEach(block => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach(column => {
      expect(column.length).toBe(5);
    });
  });

  it('clicking a block in a column causes block colours in that column to update', () => {
    const testBlockColours = ['green', 'green', 'red', 'blue', 'blue', 'blue', 'red', 'blue', 'green', 'blue']

    const grid = new BlockGrid(10, 10)
    grid.grid[0].map(block => block.colour = testBlockColours[block.y])
    const gridEl = document.createElement('div')
    gridEl.id = "gridEl"
    document.body.appendChild(gridEl);

    grid.render(gridEl)

    document.getElementById('block_0x1').click()

    const getBlockColoursForColumn = (x) => {
      let blockColours = []
      for (let y = 0; y < 10; y++) {
        blockColours.push(document.getElementById(`block_${x}x${y}`).style.background)
      }
      return blockColours
    }

    expect(getBlockColoursForColumn(0)).toEqual(['red', 'blue', 'blue', 'blue', 'red', 'blue', 'green', 'blue', 'grey', 'grey'])
  });
});
