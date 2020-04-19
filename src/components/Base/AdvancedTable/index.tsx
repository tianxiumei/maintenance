import * as React from "react";
import classnames from "classnames";
import { observer } from "mobx-react";
import { toJS, computed } from "mobx";
import { Card, Button, Input, DatePicker } from "antd";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import Table, { TableProps } from "antd/lib/table";

import "./style.scss";

interface ISearchProps {
  placeholder: string;
  value: string | number;
  key: string;
  type: "string" | "number" | "date";
  onChange: (value: string | number) => void;
}

interface IAdvancedTableProps<T> extends TableProps<T> {
  tableTitle?: string | React.ReactNode;
  addBtn?: IButtonProps;
  searchFilters?: ISearchProps[];
}

interface IButtonProps {
  title?: string | React.ReactNode;
  onClick?: (source?: any) => void;
}

@observer
export default class AdvancedTable<T> extends React.Component<
  IAdvancedTableProps<T>,
  any
> {
  @computed
  get addBtn() {
    const { addBtn } = this.props;
    if (addBtn) {
      return <Button onClick={addBtn.onClick}>{addBtn.title}</Button>;
    }
    return "";
  }
  @computed
  get searchFilter() {
    const { searchFilters } = this.props;
    if (searchFilters) {
      return searchFilters.map((search, index) => {
        const type = search.type;
        if (type === "date") {
          return (
            <DatePicker
              className="dadvanceDate"
              key={index}
              placeholder={search.placeholder}
              onChange={(date) => {
                if (date) {
                  search.onChange(moment(date).valueOf());
                } else {
                  search.onChange(-1);
                }
              }}
            />
          );
        }
        return (
          <Input
            key={index}
            onChange={(e) => search.onChange(e.target.value)}
            className="input"
            placeholder={search.placeholder}
            prefix={<SearchOutlined />}
          />
        );
      });
    }
    return "";
  }
  @computed
  get header() {
    return (
      <div>
        {this.addBtn}
        {this.searchFilter}
      </div>
    );
  }

  render() {
    const { tableTitle, className, dataSource, ...restProps } = this.props;

    return (
      <Card title={this.header}>
        <Table
          className={classnames("advancedTableWrapper", this.props.className)}
          dataSource={toJS(this.props.dataSource)}
          {...(restProps as any)}
        />
      </Card>
    );
  }
}
