import React from "react";
import { Menu, Layout } from "antd";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { computed } from "mobx";
import { isNull } from "lodash";
import { StorageName } from "../../constants";

import "./style.scss";

const { Sider } = Layout;

const MenuItem = Menu.Item;
const { SubMenu } = Menu;

interface ISideBarProps {}

@observer
export default class SideBar extends React.Component<ISideBarProps, any> {
  componentDidMount() {}

  @computed
  get user() {
    const localeUser = localStorage.getItem(StorageName.User);
    return isNull(localeUser) ? null : JSON.parse(localeUser);
  }

  render() {
    return (
      <Sider trigger={null} collapsible>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["declare"]}
          defaultOpenKeys={["maintenance"]}
        >
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
          <SubMenu key="investment" title="投资">
            <MenuItem key="statistical">
              <Link to="/main/investment/statistical">统计</Link>
            </MenuItem>
            <MenuItem key="report">
              <Link to="/main/investment/report">月报</Link>
            </MenuItem>
          </SubMenu>
          {!isNull(this.user) && this.user.roleID === 597 && (
            <MenuItem key="user">
              <Link to="/main/user">用户管理</Link>
            </MenuItem>
          )}
        </Menu>
      </Sider>
    );
  }
}
