import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './style.css';

const { Sider } = Layout;

export interface SideNavProps {
  menuItems: MenuProps['items'];
  defaultSelectedKey?: string;
  onMenuClick?: (key: string) => void;
  collapsible?: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ 
  menuItems, 
  defaultSelectedKey,
  onMenuClick,
  collapsible = true 
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className="side-nav"
      width={200}
      collapsedWidth={60}
      trigger={
        collapsible ? (
          <div className="side-nav__trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        ) : null
      }
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={defaultSelectedKey ? [defaultSelectedKey] : undefined}
        items={menuItems}
        className="side-nav__menu"
        onClick={({ key }) => onMenuClick?.(key)}
      />
    </Sider>
  );
};

export default SideNav;