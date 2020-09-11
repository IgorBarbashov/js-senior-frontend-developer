const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `<div class="cell" contenteditable></div>`;
}

function toColumn(col) {
  return `
    <div class="column">
      ${col}
      <div class="col-resize"></div>
    </div>
  `;
}

function createRow(dataContent, infoContent='') {
  return `
    <div class="row">
        <div class="row-info">
          ${infoContent}
          ${infoContent && `<div class="row-resize"></div>`}
        </div>
        <div class="row-data">${dataContent}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 25) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');
  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(cells, String(i + 1)));
  }

  return rows.join('');
}
