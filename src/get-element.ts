function getWrapperTable(selector: string) {
  const [reqTableEl, resTableEl] = Array.from(document.querySelectorAll(selector)) as Array<Element>;
  return {
    reqTableEl,
    resTableEl
  };
}
export interface ISelectorMap {
  REQ_PARAMS_SELECTOR: string;
  REQ_DEFAULT_VALUE_SELECTOR: string;
  REQ_DESCRIPTION_SELECTOR: string;
  REQ_PARAMS_NAME_SELECTOR: string;
  RES_PARAMS_SELECTOR: string;
  RES_DESCRIPTION_SELECTOR: string;
  RES_PARAMS_NAME_SELECTOR: string;
  RES_PARAMS_DESC_SELECTOR: string;
  WRAPPER_TABLE_SELECTOR: string;
}

export default class getElements {
  private reqTableEl: Element;
  private resTableEl: Element;
  /**
   * 请求参数title
   */
  reqTitleEl: Element;
  /**
   * 响应数据 title
   */
  resTitleEl: Element;
  /**
   * 请求参数名称 表头 元素
   */
  reqParamsNameEl: Element;
  /**
   *响应数据 表头 元素
   */
  resParamsNameEl: Element;
  /**
   *响应数据 描述 表头 元素
   */
  resParamsDescEl: Element;
  /**
   * 请求参数
   */
  reqParamsEls: NodeListOf<Element>;
  /**
   * 响应参数
   */
  resParamsEls: NodeListOf<Element>;
  /**
   * 请求参数默认值
   */
  reqDefaultValueEls: NodeListOf<Element>;

  /**
   * 请求参数描述
   */
  reqDescriptionELs: NodeListOf<Element>;
  /**
   * 响应数据描述
   */
  resDescriptionELs: NodeListOf<Element>;

  constructor(opts: ISelectorMap) {
    let wrapperTabelEl = getWrapperTable(opts.WRAPPER_TABLE_SELECTOR);
    this.reqTableEl = wrapperTabelEl.reqTableEl;
    this.resTableEl = wrapperTabelEl.resTableEl;

    this.reqDefaultValueEls = this.reqTableEl.querySelectorAll(opts.REQ_DEFAULT_VALUE_SELECTOR);
    this.reqParamsEls = this.reqTableEl.querySelectorAll(opts.REQ_PARAMS_SELECTOR);
    this.reqTitleEl = this.reqTableEl.previousElementSibling!;
    this.reqDescriptionELs = this.reqTableEl.querySelectorAll(opts.REQ_DESCRIPTION_SELECTOR);
    this.reqParamsNameEl = this.reqTableEl.querySelector(opts.REQ_PARAMS_NAME_SELECTOR)!;

    this.resParamsEls = this.resTableEl.querySelectorAll(opts.RES_PARAMS_SELECTOR);
    this.resDescriptionELs = this.resTableEl.querySelectorAll(opts.RES_DESCRIPTION_SELECTOR);
    this.resParamsNameEl = this.resTableEl.querySelector(opts.RES_PARAMS_NAME_SELECTOR)!;
    this.resParamsDescEl = this.resTableEl.querySelector(opts.RES_PARAMS_DESC_SELECTOR)!;
    this.resTitleEl = this.resTableEl.previousElementSibling!;
  }
}
