import { RouterStore as BaseRouterStore } from "mobx-react-router";
import { computed } from "mobx";
import { size } from "lodash";
import * as qs from "querystring";
import { parseSearch, formatURL } from "utils/url";
import { IKeyValues } from "models/base";
import bind from "utils/bind";

interface IQuery extends IKeyValues<any> {}

class RouterStore extends BaseRouterStore {
  @computed get query() {
    return parseSearch(this.location.search);
  }

  @computed get pathname() {
    return this.location.pathname;
  }

  @computed get hash() {
    return this.location.hash;
  }

  @bind
  getHash(params: IQuery) {
    let hash = "";
    if (size(params) !== 0) {
      hash =
        this.pathname.indexOf("?") > -1
          ? `&${qs.stringify(params)}`
          : `${qs.stringify(params)}`;
    }
    return hash;
  }

  @bind
  replaceHash(params: IQuery) {
    const hash = this.getHash(params);
    this.replace(`${formatURL(this.pathname, this.query)}#${hash}`);
  }
}

export default new RouterStore();
