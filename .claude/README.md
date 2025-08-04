while true; do                                      
  claude -p "/pick-up-story"  --verbose --dangerously-skip-permissions
done

while true; do                                      
  claude -p "/add-story"  --verbose --dangerously-skip-permissions
done

use subagent frontend-developer to init a frontend in frontend folder with best practice. Don't need any content, just want to test the infrustraction. and use playwright mcp to test

lease revise @research-platform-ui-design.md (you only need to work on this file).

Then, create four new files, each representing a distinct user role view. Ensure the following:
	•	Each user role has a clearly defined and separate interface.
	•	Shared views are logically organized and consistently structured.
	•	Data visibility respects role boundaries—users should only access what’s appropriate for their role.

Use logical reasoning to define access control and improve clarity in the role-specific UI design.

use subagent design-task-planner based on brainstorm @design.md, generate
   workflow-role.md。also remember this platform language is Chinese, 
  better genereate in Chinese.


 subagent doc-to-stories-splitter, based on DESIGN.md and ui files in @ui-ux/  compare to @stories/, find what feature is not covered, logially add stories in @stories in order.  

ui-ux中我指的布局试图是类似
#### 页面结构
```
┌─────────────────────────────────────────────────────────────┐
│ 顶部导航栏 (Top Navigation Bar)                              │
├─────────────────────────────────────────────────────────────┤
│ 面包屑导航 (Breadcrumb Navigation)                           │
├──────────────┬──────────────────────────────────────────────┤
│ 侧边栏导航    │ 主内容区域 (Main Content Area)                │
│ (Sidebar)    │                                              │
│              │                                              │
│              │                                              │
│              │                                              │
│              │                                              │
├──────────────┴──────────────────────────────────────────────┤
│ 底部信息栏 (Footer)                                          │
└─────────────────────────────────────────────────────────────┘
```
请给给每个ui-ux设计都添加


please use subagent doc-to-stories-splitter based on @ui-ux/ design write
   the stories from beginning(ignore old stories memeory, it is not 
  correct), please make sure use the exact 页面布局结构 and have proper 
  descript, so dev can understand. Only design the important/necessary 
  stories
