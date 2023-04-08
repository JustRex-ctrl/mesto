export class Section {
  constructor(items, containerSelector){
    this._items = items
    this._container = document.querySelector(containerSelector);

  }

 /*  _renderSection(){
    this._items.forEach((item) => {
      this._container.appendChild(item)
    });
  } */

  addItem(element) {
    this._container.prepend(element);
  }
}
