# User Story 000: Homepage Landing Page

## Status
**Status:** finished
**Implementation Date:** 2025-08-03  
**Notes:** Homepage has been fully implemented with all required sections: header with theme toggle and login, hero section, role-based cards for all 4 user types, course types section, key features grid, institution credibility with statistics, and comprehensive footer. All sections are responsive and use proper Chinese localization. Navigation to login page works correctly.

## Story
**As a** visitor to the Research Class Course Management System  
**I want** to see an informative and professional homepage  
**So that** I can understand the system's purpose and easily access the login for my specific role

## Acceptance Criteria

### General Requirements
- [ ] Homepage displays at root URL (/) before authentication
- [ ] Fully responsive design for desktop, tablet, and mobile devices
- [ ] Chinese-first interface with all primary content in simplified Chinese
- [ ] Dark/light theme toggle available
- [ ] Smooth scroll behavior and professional animations
- [ ] Loading time under 3 seconds on standard connections

### Header Section
- [ ] System logo and name "科研实验班课程管理系统" prominently displayed
- [ ] Language toggle between Chinese and English (future enhancement)
- [ ] Theme switcher (light/dark mode)
- [ ] Prominent "登录" (Login) button in header

### Hero Section
- [ ] Main headline: "科研实验班课程管理系统"
- [ ] Subtitle: "华中科技大学机械科学与工程学院"
- [ ] Brief system description emphasizing digital and intelligent management
- [ ] Primary CTA button "开始使用系统" (Start Using System)
- [ ] Background graphics or subtle animation
- [ ] Quick role-based login buttons

### Role Introduction Cards
- [ ] Four distinct cards for each user role
- [ ] Professor (教授) card with:
  - Blue theme color (#1A73E8)
  - Icon representing teaching/research
  - Description: "课程管理、学生选拔、成绩评定"
  - Key features list
  - "教授登录" button
- [ ] Student (学生) card with:
  - Green theme color (#4CAF50)
  - Icon representing learning
  - Description: "课程报名、任务完成、作业提交"
  - Key features list
  - "学生登录" button
- [ ] Secretary (科研秘书) card with:
  - Purple theme color (#7C4DFF)
  - Icon representing administration
  - Description: "系统管理、数据收集、流程监督"
  - Key features list
  - "秘书登录" button
- [ ] Leader (领导) card with:
  - Gold theme color (#FF9800)
  - Icon representing leadership/analytics
  - Description: "战略监督、数据分析、决策支持"
  - Key features list
  - "领导登录" button
- [ ] Hover effects on all cards with elevation change
- [ ] Cards are clickable and redirect to role-specific login

### Course Types Section
- [ ] Two-column layout showcasing main course types
- [ ] Lab Rotation Course (实验室轮转课程) with:
  - Descriptive icon
  - Brief explanation of multi-disciplinary research experience
  - Visual indicator for course flow
- [ ] Comprehensive Evaluation Course (综合素质评价课程) with:
  - Descriptive icon
  - Brief explanation of holistic assessment
  - Visual indicator for evaluation process

### Key Features Grid
- [ ] 2x2 grid layout (responsive to single column on mobile)
- [ ] Feature cards including:
  - 智能匹配系统 (Intelligent Matching System)
  - 流程自动化 (Process Automation)
  - 数据分析 (Data Analytics)
  - 权限管控 (Permission Control)
- [ ] Each feature with icon, title, and brief description
- [ ] Consistent visual styling with subtle animations

### Institution Credibility Section
- [ ] HUST official logo and full name
- [ ] Department information: 机械科学与工程学院
- [ ] Statistics showcase:
  - 500+ 活跃用户 (Active Users)
  - 100+ 开设课程 (Courses Offered)
  - 50+ 合作导师 (Collaborating Professors)
  - 95% 满意度 (Satisfaction Rate)
- [ ] Trust indicators and certifications

### Footer
- [ ] Quick links to important pages
- [ ] Contact information for technical support
- [ ] Copyright notice
- [ ] Privacy policy and terms of service links
- [ ] Social media links (if applicable)

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Alt text for all images
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Sufficient color contrast ratios

## Priority
High

## Route
`/`

## Dependencies
None (foundational story - homepage is the entry point)

## Technical Notes
- Implement using React with Ant Design v5 components
- Use existing theme configuration with role-specific colors
- Leverage CSS Grid and Flexbox for responsive layouts
- Implement lazy loading for images and below-the-fold content
- Use React Router for navigation to login pages
- Apply consistent spacing using Ant Design's spacing tokens
- Implement smooth scroll behavior for in-page navigation
- Cache static assets for performance
- SEO optimization with proper meta tags
- Analytics tracking for user behavior insights

## UI Requirements
- Follow Ant Design v5 design system
- Use the defined color scheme for each role:
  - Professor: #1A73E8 (教授蓝)
  - Student: #4CAF50 (学生绿)
  - Secretary: #7C4DFF (秘书紫)
  - Leader: #FF9800 (领导金)
- Typography scale:
  - H1: 38px, weight 700
  - H2: 30px, weight 600
  - H3: 24px, weight 600
  - Body: 16px/14px, weight 400
- Card components with:
  - 12px border radius
  - Subtle shadows (0 4px 16px rgba(0,0,0,0.08))
  - Hover states with elevation
  - Smooth transitions (0.3s cubic-bezier)
- Responsive breakpoints:
  - Desktop: ≥1200px (4-column grid for role cards)
  - Tablet: 768px-1199px (2-column grid)
  - Mobile: ≤767px (single column)
- Loading skeletons for dynamic content
- Micro-interactions on buttons and interactive elements
