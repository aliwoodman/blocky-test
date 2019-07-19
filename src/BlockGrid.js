import Block from './Block';

class BlockGrid {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.columnsChecked = [];
    this.blockClickedColour = null;

    for (let x = 0; x < this.width; x++) {
      const col = [];
      for (let y = 0; y < this.height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  render(el = document.getElementById('gridEl')) {
    for (let x = 0; x < this.width; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const id = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }
  }

  blockClicked(e, block) {
    this.checkColumnElements(block);
    this.columnsChecked = [];
  }

  checkColumnElements(block) {
    this.blockClickedColour = document.getElementById(
      `block_${block.x}x${block.y}`
    ).style.background;
    if(this.blockClickedColour === 'grey') { return }

    this.columnsChecked.push(block.x);
    let currentColumnColors = [];

    for (let y = 0; y < this.height; y++) {
      currentColumnColors.push(
        document.getElementById(`block_${block.x}x${y}`).style.background
      );
    }

    const matchingBlocks = this.getMatchingBlocks(
      currentColumnColors,
      block
    );

    this.updateColumn(matchingBlocks, currentColumnColors, block);

    const sortedCheckedColumns = this.columnsChecked.sort();
    if (
      sortedCheckedColumns[sortedCheckedColumns.length - 1] === block.x &&
      block.x !== this.width - 1
    ) {
      this.checkAdjacentColumnsRight(matchingBlocks, block);
    }

    if (sortedCheckedColumns[0] === block.x && block.x !== 0) {
      this.checkAdjacentColumnsLeft(matchingBlocks, block);
    }
  }

  getMatchingBlocks(currentColumnColors, block) {
    let matchingBlocks = [];

    for (
      let y = block.y;
      y < this.width && currentColumnColors[y] === this.blockClickedColour;
      y++
    ) {
      matchingBlocks.push(y);
    }

    for (
      let y = block.y;
      y >= 0 && currentColumnColors[y] === this.blockClickedColour;
      y--
    ) {
      matchingBlocks.push(y);
    }

    return matchingBlocks;
  }

  updateColumn(matchingBlocks, currentColumnColors, block) {
    const firstXCoordinate = matchingBlocks.sort()[0];
    const lastXCoordinate = matchingBlocks.sort()[matchingBlocks.length - 1];
    const numberOfMatchingBlocks = lastXCoordinate - firstXCoordinate + 1;

    currentColumnColors.splice(firstXCoordinate, numberOfMatchingBlocks);
    for (var i = 0; i < numberOfMatchingBlocks; i++)
      currentColumnColors.push('gray');

    for (let y = 0; y < this.height; y++) {
      document.getElementById(`block_${block.x}x${y}`).style.background =
        currentColumnColors[y];
    }
  }

  getColumnElementsToCheck(matchingBlocks, columnIndex) {
    matchingBlocks.forEach(block => {
      if (
        document.getElementById(`block_${columnIndex}x${block}`).style
          .background === this.blockClickedColour
      ) {
        this.checkColumnElements(this.grid[columnIndex][block]);
      }
    });
  }

  checkAdjacentColumnsRight(matchingBlocks, block) {
    const columnIndex = block.x + 1;
    if (columnIndex < this.width) {
      this.getColumnElementsToCheck(
        matchingBlocks,
        columnIndex
      );
    }
  }

  checkAdjacentColumnsLeft(matchingBlocks, block) {
    const columnIndex = block.x - 1;
    if (columnIndex >= 0) {
      this.getColumnElementsToCheck(
        matchingBlocks,
        columnIndex
      );
    }
  }
}

export default BlockGrid;
