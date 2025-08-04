import React from 'react';
import { Layout } from 'antd';
import TopNav from '../Navigation/TopNav';
import SideNav from '../Navigation/SideNav';
import './style.css';

const { Content, Footer } = Layout;

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  topNavProps?: React.ComponentProps<typeof TopNav>;
  sideNavProps?: React.ComponentProps<typeof SideNav>;
  showSidebar?: boolean;
  showFooter?: boolean;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  topNavProps,
  sideNavProps,
  showSidebar = false,
  showFooter = true,
}) => {
  return (
    <Layout className="responsive-layout">
      {topNavProps && <TopNav {...topNavProps} />}
      
      <Layout>
        {showSidebar && sideNavProps && <SideNav {...sideNavProps} />}
        
        <Content className="responsive-layout__content">
          <div className="responsive-layout__container">
            {children}
          </div>
        </Content>
      </Layout>
      
      {showFooter && (
        <Footer className="responsive-layout__footer">
          <div className="responsive-layout__footer-content">
            <span>© 2024 科研管理平台</span>
            <span className="responsive-layout__footer-divider">|</span>
            <a href="/help">帮助中心</a>
            <span className="responsive-layout__footer-divider">|</span>
            <a href="/support">技术支持</a>
          </div>
        </Footer>
      )}
    </Layout>
  );
};

export default ResponsiveLayout;