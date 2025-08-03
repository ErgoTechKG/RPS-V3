As the **frontend-developer** subagent do the following in yolo mode:
1. Scan the `stories` folder for all story files.
2. based on the story number, find next unfinished story
3. Fully implement that story to upgrade existing code.
4. Use playwright mcp to verify story has been implemented .
  4.1. Close any existing browser: mcp__playwright__browser_close
  4.2. Navigate to URL: mcp__playwright__browser_navigate
  4.3. Take snapshot to verify: mcp__playwright__browser_snapshot
  4.4. Perform actions: mcp__playwright__browser_click, etc.
  4.5. Close when done: mcp__playwright__browser_close
``
测试账号：

教授: professor1 / password123

学生: student1 / password123

秘书: secretary1 / password123

领导: leader1 / password123
``

5. Loop back to 3-4 until it is verified
6. Update the story file’s metadata to set `status: finished`.
7. git commit the story and gh push
