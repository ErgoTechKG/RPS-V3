---
status: TODO
source_lines: DESIGN.md lines 193-199, professor-ui.md lines 193-199
references:
  - professor-ui.md: lines 193-199 (Step-by-step publishing wizard)
  - DESIGN.md: lines 237-261 (Topic management routes)
---

# Story 406: Professor Step-by-Step Content Publishing Wizard

## Description
As a professor, I want a guided step-by-step wizard for publishing course topics that provides real-time preview and auto-save functionality, so that I can efficiently create high-quality course content without losing any work.

## Acceptance Criteria

### Step-by-Step Wizard Interface
- [ ] Implement 4-step publishing wizard with progress indicator
- [ ] Step 1: Basic information (title, description, keywords)
- [ ] Step 2: Detailed explanation (background, objectives, requirements)
- [ ] Step 3: Resource configuration (lab, equipment, funding)
- [ ] Step 4: Enrollment settings (capacity, requirements, deadlines)
- [ ] Visual progress indicator showing current step (●○○○ format)

### Real-Time Features
- [ ] Live preview panel updating as user types
- [ ] Auto-save functionality every 30 seconds
- [ ] Auto-save status indicator with timestamp
- [ ] Draft recovery on session restore

### Navigation and Validation
- [ ] "Save Draft" and "Next Step" buttons on each step
- [ ] Validation before allowing step progression
- [ ] Ability to navigate back to previous steps
- [ ] Final review step before publishing

### User Experience
- [ ] Responsive design for different screen sizes
- [ ] Helpful tooltips and field descriptions
- [ ] Character counters for text fields
- [ ] Clear error messages and validation feedback

## Technical Requirements
- Frontend: React component with stepper UI
- Auto-save: Local storage + API persistence
- Validation: Form validation library
- Preview: Real-time markdown/rich text rendering
- State management: Maintain wizard state across steps

## Priority
High - Core content creation functionality

## Story Points
8

## Dependencies
- Story 008 (Professor Topic Management)
- Shared UI components for stepper and form elements

## Notes
This wizard significantly improves the content creation experience by providing structured guidance and preventing data loss through auto-save functionality.