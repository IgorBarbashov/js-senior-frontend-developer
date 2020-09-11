const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, colIndex) {
  return `<div class="cell" data-colid=${colIndex} contenteditable></div>`;
}

function toColumn(col, index) {
  return `
    <div class="column" data-colid=${index}>
      ${col}
      <div class="col-resize" data-resize="col" data-id=${index}></div>
    </div>
  `;
}

function createRow(dataContent, infoContent = '') {
  return `
    <div class="row">
        <div class="row-info">
          ${infoContent}
          ${infoContent && `
            <div
              class="row-resize"
              data-resize="row"
              data-id=${infoContent}
            ></div>
          `}
        </div>
        <div class="row-data" data-rowid=${infoContent}>${dataContent}</div>
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
