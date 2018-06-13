import getElements, { ISelectorMap } from './get-element';
import Dom from './dom';
const ClipboardJS = require('clipboard');

const prefixReq = '.placeholder-request-args ul ';
const prefixRes = '.placeholder-response-args ul ';
class ApiDocPlugins {
  Els: getElements | null;
  clipboard: any;
  reqParamsList: string[] = [];
  resParamsList: string[] = [];
  resParamsDescList: string[] = [];
  selectorsMap: ISelectorMap = {
    REQ_DEFAULT_VALUE_SELECTOR: `${prefixReq} li:nth-child(4)`,
    REQ_DESCRIPTION_SELECTOR: `${prefixReq} li:last-child`,
    REQ_PARAMS_SELECTOR: `${prefixReq} li:first-child`,
    REQ_PARAMS_NAME_SELECTOR: '.div-table-header li:first-child',

    RES_DESCRIPTION_SELECTOR: `${prefixRes} li:last-child`,
    RES_PARAMS_SELECTOR: `${prefixRes} li:first-child`,
    RES_PARAMS_NAME_SELECTOR: '.div-table-header li:first-child',
    RES_PARAMS_DESC_SELECTOR: '.div-table-header li:last-child',

    WRAPPER_TABLE_SELECTOR: '#api-details .div-table'
  };

  constructor() {
    this.Els = new getElements(this.selectorsMap);
    this.setRowButton();
    this.setTableHeadCopyButton(this.Els.reqParamsNameEl, this.reqParamsList.join(''));
    this.setTableHeadCopyButton(this.Els.resParamsNameEl, this.resParamsList.join(''));
    this.setTableHeadCopyButton(this.Els.resParamsDescEl, this.resParamsDescList.join(''));

    this.clipboard = new ClipboardJS('.copy-mark');
  }

  setRowButton() {
    const { reqParamsEls, reqDefaultValueEls, reqDescriptionELs, resParamsEls, resDescriptionELs } = this.Els!;
    [reqParamsEls, reqDefaultValueEls, reqDescriptionELs, resParamsEls, resDescriptionELs].forEach(els => {
      Array.from(els).forEach(el => {
        const oldInnerHTML = (el as HTMLElement).innerText;
        const dontNeed = ['module', 'service', 'method', ''];

        if (dontNeed.includes(oldInnerHTML.trim())) return;

        const button = Dom.create(
          `<span>${oldInnerHTML}&nbsp;<button class='copy-mark' data-clipboard-text='${oldInnerHTML}'>复制</button></span>`
        )!;

        if (!oldInnerHTML.includes('复制')) {
          el.innerHTML = '';
          el.appendChild(button);
        }
        if (els === reqParamsEls) {
          this.pushToList(this.reqParamsList, oldInnerHTML);
        }
        if (els === resParamsEls) {
          this.pushToList(this.resParamsList, oldInnerHTML);
        }
        if (els === resDescriptionELs) {
          this.pushToList(this.resParamsDescList, oldInnerHTML);
        }
      });
    });
  }
  pushToList(list: string[], str: string) {
    list.push(str.replace('复制', '').trim() + '\n');
  }
  setTableHeadCopyButton(el: Element, text: string) {
    const oldInnerHTML = (el as HTMLElement).innerText.replace('复制', '').trim();
    const button = Dom.create(
      `<span>${oldInnerHTML}&nbsp;<button class='copy-mark' data-clipboard-text='${text}'>复制</button></span>`
    )!;
    el.innerHTML = '';
    el.appendChild(button);
  }
  destroyed() {
    this.Els = null;
    this.reqParamsList = [];
    this.resParamsList = [];
    this.resParamsDescList = [];
  }
}

var instance: ApiDocPlugins | null;

Dom.on(document.body, 'click', 'div.api-name', function(event: Event) {
  if ((event.target as Element).matches('.api-folder')) return;
  if (instance) {
    instance.destroyed();
    instance = null;
  }
  instance = new ApiDocPlugins();
});
