import Block from './Block';

class BlockGrid {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.grid = [];

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
    console.log(this.grid)
  }

  blockClicked(e, block) {
    this.checkColumnElements(block)
  }

  checkColumnElements(block) {
    const blockClickedColour = blockClickedColour ||
      document.getElementById(`block_${block.x}x${block.y}`).style.background
    let currentColumnColors = []

    for (let y = 0; y < this.height; y++) {
      currentColumnColors.push(document.getElementById(`block_${block.x}x${y}`).style.background)
    }

    const matchingBlocks = this.getMatchingBlocks(currentColumnColors, blockClickedColour, block)
    this.updateColumn(matchingBlocks, currentColumnColors, block)
    this.checkAdjacentColumns(matchingBlocks, block, blockClickedColour)
  }

  getMatchingBlocks(currentColumnColors, blockClickedColour, block) {
    let matchingBlocks = []

    for (let y = block.y; y < 10 && currentColumnColors[y] === blockClickedColour; y++ ) {
      matchingBlocks.push(y)
    }

    for (let y = block.y; y >= 0 && currentColumnColors[y] === blockClickedColour; y-- ) {
      matchingBlocks.push(y)
    }

    return matchingBlocks
  }

  updateColumn(matchingBlocks, currentColumnColors, block) {
    const firstXCoordinate = matchingBlocks.sort()[0]
    const lastXCoordinate = matchingBlocks.sort()[matchingBlocks.length - 1]
    const numberOfMatchingBlocks = lastXCoordinate - firstXCoordinate + 1
    console.log(currentColumnColors)

    currentColumnColors.splice(firstXCoordinate, numberOfMatchingBlocks)
    for (var i = 0; i < numberOfMatchingBlocks; i++) currentColumnColors.push('grey');

    for (let y = 0; y < this.height; y++) {
      document.getElementById(`block_${block.x}x${y}`).style.background = currentColumnColors[y]
    }
  }

  checkAdjacentColumns(matchingBlocks, block, blockClickedColour) {
    const columnIndex = block.x + 1
    if (columnIndex < 10) {
      matchingBlocks.forEach(block => {
          if (document.getElementById(`block_${columnIndex}x${block}`).style.background === blockClickedColour) {
            this.checkColumnElements(this.grid[columnIndex][block])
          }
        }
      )
    }
  }

}

export default BlockGrid;
