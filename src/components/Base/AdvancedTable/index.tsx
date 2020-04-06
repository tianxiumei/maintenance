import * as React from "react";
import classnames from "classnames";
import { observer } from "mobx-react";
import { toJS, computed } from "mobx";
import { Card, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Table, { TableProps } from "antd/lib/table";
import bind from "utils/bind";

import "./style.scss";

interface ISearchProps {
  placeholder: string;
  value: string;
  key: string;
  onChange: (value: string) => void;
}

interface IAdvancedTableProps<T> extends TableProps<T> {
  tableTitle?: string | React.ReactNode;
  addBtn?: IButtonProps;
  searchFilter?: ISearchProps;
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
    const { searchFilter } = this.props;
    if (searchFilter) {
      return (
        <Input
          onChange={this.handleSearchChange as any}
          className="input"
          prefix={<SearchOutlined />}
        />
      );
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

  @bind
  handleSearchChange(e: any) {
    this.props.searchFilter!.onChange(e.target.value);
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
