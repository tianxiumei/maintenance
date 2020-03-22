import React from "react";
import { Menu, Layout } from "antd";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import "./style.scss";
import { observable } from "mobx";

const { Sider } = Layout;

const MenuItem = Menu.Item;
const { SubMenu } = Menu;

interface ISideBarProps {}

@observer
export default class SideBar extends React.Component<ISideBarProps, any> {
  @observable collapsed: boolean = false;

  componentDidMount() {}

  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <SubMenu key="sub1" title="维修">
            <MenuItem key="1">
              <Link to="/main/maintenance/declare">维修申报</Link>
            </MenuItem>
            <MenuItem key="2">
              <Link to="/main/maintenance">维修计划</Link>
            </MenuItem>
            <MenuItem key="3">
              <Link to="/main/maintenance">维修立项</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
