---
status: TODO
source_lines: professor-ui.md:421-430
references:
  - professor-ui.md: lines 421-430 (scoring interface with evaluation dimensions)
---

# Story 321: Professor Visual Grading Rubric Designer

## Description
As a professor, I want a visual drag-and-drop grading rubric designer so that I can create custom evaluation criteria with weighted components and automated scoring calculations for different assessment types.

## Acceptance Criteria

### Core Functionality
- [ ] Drag-and-drop interface for creating evaluation dimensions
- [ ] Weight adjustment using visual sliders for each criterion
- [ ] Score range definition for each dimension (0-100 scale)
- [ ] Automatic total score calculation based on weights
- [ ] Template system for reusable rubrics

### Visual Design Requirements
- [ ] Card-based layout for evaluation dimensions
- [ ] Interactive sliders for weight adjustment
- [ ] Real-time preview of scoring formula
- [ ] Color-coded score ranges (excellent/good/average/poor)
- [ ] Collapsible sections for detailed criteria

### Evaluation Dimensions Support
- [ ] Academic performance metrics
- [ ] Research innovation criteria  
- [ ] Comprehensive quality indicators
- [ ] Custom dimension creation
- [ ] Historical average score reference display

### Advanced Features
- [ ] Rubric templates library (save/load)
- [ ] Peer comparison functionality
- [ ] Export to PDF for distribution
- [ ] Integration with existing grading system
- [ ] Batch application to multiple students

## Implementation Notes
- Supports both comprehensive evaluation and lab rotation course grading
- Integrates with existing professor assessment interfaces
- Provides consistency across different evaluation scenarios
- Includes AI-suggested criteria based on course type

## Dependencies
- Story 011: Professor Assessment and Grading
- Story 024: Professor Evaluation Interface  
- Story 085: Professor Intelligent Grading Assistant

## Route
`/professor/grading/rubric-designer`