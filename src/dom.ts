export default class Dom {
  static on(element: HTMLElement, eventType: string, selector: string, fn: Function) {
    element.addEventListener(eventType, e => {
      let el: any = e.target;
      while (!el.matches(selector)) {
        if (element === el) {
          el = null;
          break;
        }
        el = el.parentNode;
      }
      el && fn.call(el, e, el);
    });
    return element;
  }
  // http://stackoverflow.com/a/35385518/1262580
  static create(htmlStr: string) {
    var template = document.createElement('template');
    template.innerHTML = htmlStr.trim();
    return template.content.firstChild;
  }
}
