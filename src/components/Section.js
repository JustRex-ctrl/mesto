export class Section {
  constructor(containerSelector){
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items){
    items.forEach((item) => {
      this._container.appendChild(item)
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
