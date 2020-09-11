import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  _minColWidth = 40;
  _minRowHeight = 20;

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.$targetEl = event.target;
      this.$targetEl.classList.add('hover');
      this.resizeType = event.target.dataset.resize;

      switch (this.resizeType) {
        case 'row':
          this.$resizeEl = event.target.parentNode.parentNode;
          this.resizeStartPosition = event.clientY;
          this.resizeStartSize =
            event.target.parentNode.getClientRects()[0].height;
          this.$resizeEl.style.borderBottom='1px solid #3c74ff';
          break;
        case 'col':
          this.$resizeEl = document.querySelectorAll(
              `[data-colid='${event.target.dataset.id}']`
          );
          this.resizeStartPosition = event.clientX;
          this.resizeStartSize =
            event.target.parentNode.getClientRects()[0].width;
          this.$resizeEl.forEach((el) =>
            el.style.borderRight='1px solid #3c74ff');
          break;
      }

      this.onMouseup = this.onMouseup.bind(this);
      this.onMousemove = this.onMousemove.bind(this);
      this.$root.on('mousemove', this.onMousemove);
      this.$root.on('mouseup', this.onMouseup);
    }
  }

  onMousemove(event) {
    if (this.resizeType === 'row') {
      const delta = event.clientY - this.resizeStartPosition;
      const newSize = this.resizeStartSize + delta < this._minRowHeight
        ? this._minRowHeight
        : this.resizeStartSize + delta;
      this.$resizeEl.style.height=`${newSize}px`;
    } else if (this.resizeType === 'col') {
      const delta = event.clientX - this.resizeStartPosition;
      const newSize = this.resizeStartSize + delta < this._minColWidth
        ? this._minColWidth
        : this.resizeStartSize + delta;
      this.$resizeEl.forEach((el) =>
        el.style.width=`${newSize}px`);
    }
  }

  onMouseup() {
    this.$root.off('mousemove', this.onMousemove);
    this.$root.off('mouseup', this.onMouseup);

    this.$targetEl.classList.remove('hover');
    if (this.resizeType === 'row') {
      this.$resizeEl.style.borderBottom = '';
    } else if (this.resizeType === 'col') {
      this.$resizeEl.forEach((el) =>
        el.style.borderRight = '');
    }
  }
}
