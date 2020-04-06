import React from "react";
import { Menu, Layout } from "antd";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { observable } from "mobx";

import "./style.scss";

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
          <SubMenu key="maintenance" title="维修">
            <MenuItem key="declare">
              <Link to="/main/maintenance/declare">维修申报</Link>
            </MenuItem>
            <MenuItem key="plan">
              <Link to="/main/maintenance/plan">维修计划</Link>
            </MenuItem>
            <MenuItem key="project">
              <Link to="/main/maintenance/project">维修立项</Link>
            </MenuItem>
          </SubMenu>
          <MenuItem key="investment">
            <Link to="/main/investment">投资</Link>
          </MenuItem>
          <MenuItem key="user">
            <Link to="/main/user">用户管理</Link>
          </MenuItem>
        </Menu>
      </Sider>
    );
  }
}
