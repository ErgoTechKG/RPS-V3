As the **frontend-developer** subagent do the following in yolo mode:

## Migrate All Finished Stories to Ant Design

1. **Identify implemented stories from git history**:
   ```bash
   git log --oneline --grep="Implement Story" | grep -oE "Story [0-9]{3}" | sort -u
   ```

2. **For each implemented story (001-030), check migration status**:
   - Check if components are importing from 'antd'
   - Identify components still using custom CSS classes
   - List all CSS files associated with the story

3. **Migrate components following these patterns**:

   ### Form Migration Pattern
   - Replace custom inputs with `<Input>`, `<Input.Password>`, `<Select>`, etc.
   - Use `<Form>` with `Form.Item` for validation
   - Replace custom buttons with `<Button type="primary">`
   - Use `<Alert>` for error/success messages

   ### Layout Migration Pattern
   - Replace custom cards with `<Card title="..." extra={<Icon />}>`
   - Use `<Row gutter={[16,16]}>` and `<Col xs={24} sm={12} lg={6}>` for grids
   - Replace custom statistics with `<Statistic title="..." value={...} />`
   - Use `<Space>` for consistent spacing

   ### Navigation Migration Pattern
   - Use `<Menu mode="horizontal">` for navigation
   - Replace custom dropdowns with `<Dropdown>`
   - Use `<Breadcrumb>` for breadcrumb navigation
   - Replace emojis with Ant Design Icons

   ### Data Display Migration Pattern
   - Replace custom tables with `<Table columns={} dataSource={} />`
   - Use `<List>` for simple lists
   - Replace custom progress bars with `<Progress percent={} />`
   - Use `<Tag>` for labels and badges

4. **Update CSS files**:
   - Keep only essential layout styles (container, background gradients)
   - Remove all component-specific styles (buttons, inputs, cards, etc.)
   - Aim for 80-90% CSS reduction

5. **Test each migrated component**:
   ```javascript
   important: Use Playwright to verify:
   - Components render correctly
   - Forms submit properly
   - Navigation works
   - Responsive behavior is maintained
   ```

6. **Migration Priority Order**:
   - Story 002: Complete dashboard migrations (Professor, Secretary, Leader)
   - Story 004: NotificationCenter → Ant Design notification API
   - Story 005-007: Shared components (Calendar, Help, Profile)
   - Story 008-011: Professor features
   - Story 012-015: Student features
   - Story 016-019: Secretary features
   - Story 020-022: Leader features
   - Story 023-029: Comprehensive evaluation features

7. **For each component migration**:
   - Read the original component and CSS
   - Import necessary Ant Design components
   - Replace custom JSX with Ant Design components
   - Update inline styles to use theme tokens where needed
   - Simplify or remove the CSS file
   - Test the component functionality

8. **Common Ant Design imports to use**:
   ```javascript
   import { 
     Button, Card, Form, Input, Select, Table, List, Tag, 
     Row, Col, Space, Typography, Progress, Statistic, Alert,
     Menu, Dropdown, Avatar, Modal, DatePicker, Upload,
     Tabs, Badge, Tooltip, Divider, Steps, Result, Empty
   } from 'antd'
   ```

9. **After all migrations are complete**:
   - Create a summary report of components migrated
   - Document any custom patterns discovered
   - Commit with message: "Migrate all finished stories (001-030) to Ant Design"

10. **Test credentials for verification**:
    ```
    教授: professor1 / password123
    学生: student1 / password123
    秘书: secretary1 / password123
    领导: leader1 / password123
    ```

Remember:
- Preserve all functionality while migrating
- Maintain Chinese language UI elements
- Keep role-based styling considerations
- Ensure accessibility is maintained or improved
- Follow the established migration patterns from LoginForm, StudentDashboard, Navigation examples