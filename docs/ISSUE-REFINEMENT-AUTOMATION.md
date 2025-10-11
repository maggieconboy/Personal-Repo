# Issue Refinement Automation

## Overview

This repository includes an automated issue refinement system that analyzes new issues and automatically assigns story points based on complexity and priority levels based on severity and urgency. The system provides instant feedback, notifications when new issues are ready for review, and seamlessly integrates with GitHub Projects to keep your project board up-to-date.

**New in this version**: Automatic integration with [GitHub Projects](https://github.com/users/maggieconboy/projects/1) - issues are automatically added to your project board with Priority and Estimate fields populated based on the automated refinement.

## Complete Workflow

```
New Issue Created/Edited
         ↓
   Analysis Engine
   ├─ Keyword Detection
   ├─ Content Analysis
   └─ Priority Assessment
         ↓
   Apply Labels & Milestone
   ├─ Story Points (points-X)
   ├─ Priority (priority-X)
   └─ Assign to "Intake" milestone
         ↓
   Add Analysis Comment
   └─ Reasoning & Next Steps
         ↓
   GitHub Projects Integration
   ├─ Add to Project Board
   ├─ Set Priority Field
   └─ Set Estimate Field
         ↓
   Create Notification
   └─ Post to Tracking Issue
```

## How It Works

### 1. Automated Trigger
- **When**: Automatically triggered when new issues are opened or edited
- **Manual**: Can be triggered manually via workflow dispatch for specific issues
- **Runtime**: ~30-60 seconds per issue analysis

### 2. Complexity Analysis
The system analyzes issue content using keyword detection and content analysis to determine story points based on realistic engineering effort. The scoring considers the time needed to complete the work, clarity of requirements, research needed, and collaboration required—thinking like a real engineer who needs to go back and forth with teams.

#### Story Point Assignment Logic
- **1 Point**: Super quick minor change (typo, copy update) - minutes to an hour
- **2 Points**: Less than a day's work - clear requirements, straightforward implementation
- **3 Points**: 1-2 days of work - mostly clear, minimal research or collaboration needed
- **5 Points**: 3-5 days of work - requires research and collaboration to complete
- **8 Points**: 6-10 days of work - significant research and cross-team collaboration required
- **13 Points**: 11+ days of work - requirements unclear, needs discovery, extensive collaboration, and research
- **21 Points**: 2+ sprints - project-level work with multiple tasks, research, collaboration, and approvals

#### Analysis Factors
- **Effort Indicators**: Keywords that signal time to complete and complexity level
- **Requirement Clarity**: Issues with unclear requirements or mentioning "discovery" get higher points
- **Collaboration Needs**: Keywords indicating multiple teams or stakeholders increase complexity
- **Content Length**: Very short issues (<100 chars) may need clarification (13 points); very long issues (>2000 chars) suggest complexity (min 8 points)
- **Research Requirements**: Keywords like "investigate", "research", "spike" indicate discovery work
- **Template Filtering**: Unchecked checkboxes from issue templates (lines matching the pattern `- [ ] <text>`) are filtered out before analysis to prevent false keyword matches. For example, this prevents a typo fix from being incorrectly assigned 8 points when the template includes an unchecked "- [ ] Third-party integrations" option.
- **Keyword Priority**: Keywords are checked from lowest to highest points (1→2→3→5→8→13→21) to ensure specific indicators like "typo" or "quick fix" take precedence over generic keywords that might appear elsewhere in the issue

### 3. Priority Assignment
Priority is determined based on urgency indicators and business impact:

#### Priority Levels
- **Critical**: Production outages, security vulnerabilities, data loss, blocking issues
- **High**: Customer impact, revenue impact, time-sensitive requirements, release blockers
- **Medium**: Standard priority for new development work
- **Low**: Nice-to-have enhancements, future improvements, backlog items

### 4. Automated Actions
For each analyzed issue, the system:

#### Labels Applied
- **Story Points**: `points-1`, `points-2`, `points-3`, `points-5`, `points-8`, `points-13`, `points-21`
- **Priority**: `priority-critical`, `priority-high`, `priority-medium`, `priority-low`
- **Status**: `refined` to indicate automated analysis is complete

#### Analysis Comment
Adds a detailed comment to each issue containing:
- Story point assignment with reasoning
- Priority level with explanation
- Keywords detected during analysis
- Content analysis summary
- Next steps for engineering review

#### Notification System
- Posts notification to refinement tracking issue
- Logs analysis results to workflow output
- Ready-for-review status for planning sessions

#### Milestone Assignment
- Automatically assigns refined issues to the **"Intake"** milestone
- Creates the "Intake" milestone if it doesn't exist
- Provides leads with an easy way to identify issues ready for review
- Milestone description: "Issues that have been automatically refined and are ready for review by leads"

#### GitHub Projects Integration
- Automatically adds refined issues to the [Work Tracker Project](https://github.com/users/maggieconboy/projects/1)
- Updates the **Priority** field on the project board based on automated refinement
- Sets the **Estimate** field with the assigned story points
- Provides seamless integration between issue labels and project board fields

## Setup Requirements

### Labels
The workflow automatically creates these labels if they don't exist:

**Story Point Labels:**
- `points-1` (Light blue) - 1 story point - Super quick minor change
- `points-2` (Light blue) - 2 story points - Less than a day of work
- `points-3` (Medium blue) - 3 story points - 1-2 days of work
- `points-5` (Blue) - 5 story points - 3-5 days of work
- `points-8` (Dark blue) - 8 story points - 6-10 days of work
- `points-13` (Deep blue) - 13 story points - 11+ days, discovery needed
- `points-21` (Darker blue) - 21 story points - 2+ sprints, project-level

**Priority Labels:**
- `priority-critical` (Red) - Critical priority
- `priority-high` (Orange) - High priority
- `priority-medium` (Yellow) - Medium priority
- `priority-low` (Green) - Low priority

**Process Labels:**
- `refined` (Green) - Issue has been automatically refined

### Milestones
The workflow automatically manages milestones:

**Intake Milestone:**
- **Title**: "Intake"
- **Purpose**: Contains all automatically refined issues ready for review
- **Description**: "Issues that have been automatically refined and are ready for review by leads"
- **State**: Open
- **Auto-created**: If the milestone doesn't exist, it will be created automatically

### Permissions
The workflow requires these permissions (already configured):
- `issues: write` - Add labels and comments to issues
- `contents: read` - Access repository content for analysis
- `pull-requests: read` - Access milestone and project data
- `repository-projects: write` - Add issues to projects and update custom fields

### Authentication
For GitHub Projects integration, the workflow needs a Personal Access Token (PAT) with `project` scope:

1. **Create a PAT**: Go to [GitHub Settings > Developer settings > Personal access tokens > Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. **Set Permissions**: Grant the token `read:project` and `write:project` permissions for user projects
3. **Add as Secret**: In the repository, go to Settings > Secrets and variables > Actions
4. **Create Secret**: Add a new secret named `PROJECT_PAT` with your token value

**Note**: If `PROJECT_PAT` is not configured, the workflow will fall back to `GITHUB_TOKEN` but project integration features will be skipped as the default token lacks project permissions.

📖 **Detailed Setup Guide**: See [GitHub Projects Setup](GITHUB-PROJECTS-SETUP.md) for step-by-step instructions with screenshots and troubleshooting.

## Issue Templates

### General Issue Template
A comprehensive template (`general-issue.yml`) is provided to gather:
- Issue description and type
- Complexity estimation hints
- Urgency level indication
- Acceptance criteria
- Technical details
- Impact assessment
- System components involved

Using this template improves refinement accuracy by providing structured input for the analysis engine.

## Manual Execution

You can manually trigger refinement for specific issues:

1. Go to **Actions** tab in GitHub
2. Select **Issue Refinement Automation** workflow
3. Click **Run workflow**
4. Enter the issue number to analyze
5. Click **Run workflow**

## Integration with Velocity Reporting

The refinement system integrates seamlessly with the existing [Velocity Reporting](VELOCITY-AUTOMATION.md) system:
- Story points assigned here are used in velocity calculations
- Labels format matches velocity reporting requirements (`points-X`)
- Milestone assignment works with velocity tracking
- Historical data includes refined issues

## Sample Output

### Issue Analysis Comment
```markdown
## 🤖 Automated Issue Refinement

**Story Points**: 5 points  
**Priority**: High

### Analysis Details
- **Complexity Reasoning**: 3-5 days: Requires research and collaboration to complete
- **Priority Reasoning**: High: Customer or revenue impact, or time-sensitive requirements
- **Keywords Detected**: feature, api
- **Content Length**: 1247 characters

### Next Steps
This issue has been automatically refined and added to the **Intake** milestone for review...
```

### Refinement Tracking Issue
```markdown
## 📋 New Issue Refined - Ready for Review

**Issue**: #45 - Add user authentication system
**Story Points**: 5 points
**Priority**: High
**Refined**: 2024-09-24

**Analysis Summary**:
- 3-5 days: Requires research and collaboration to complete
- High: Customer or revenue impact, or time-sensitive requirements

[View Issue #45](https://github.com/owner/repo/issues/45)
```

## Customization

To modify the refinement logic:

1. **Complexity Keywords**: Edit keyword arrays in `issue-refinement.yml`
2. **Story Point Thresholds**: Adjust complexity scoring thresholds
3. **Priority Logic**: Modify priority assignment conditions
4. **Analysis Template**: Update comment template format
5. **Label Configuration**: Customize label names and colors
6. **Milestone Configuration**: Change the milestone name by updating the `MILESTONE_NAME` constant in the workflow file

## Troubleshooting

### Common Issues

**Issue not getting refined**
- Check that workflow has proper permissions
- Verify issue was opened/edited after workflow deployment
- Review workflow logs in Actions tab

**Incorrect story points assigned**
- Review keyword detection logic
- Check content analysis scoring
- Consider adding more descriptive keywords to issue
- Note: Unchecked checkboxes in issue templates are automatically filtered out to prevent false matches
- Keywords are checked from low to high complexity (1→2→3→5→8→13→21) so specific indicators take priority

**Missing labels**
- Workflow creates labels automatically on first run
- Check repository permissions for label creation
- Verify label creation step completed successfully

**Issue not added to project**
- Verify that `PROJECT_PAT` secret is configured with `project` scope permissions
- Check that the project number (1) matches the target project URL
- Review workflow logs for GraphQL errors in the "Add Issue to Project" step
- Ensure the project has "Priority" and "Estimate" custom fields configured

**Project fields not updating**
- Confirm Priority field options match: Critical, High, Medium, Low (case-insensitive)
- Verify Estimate field is configured as a Number type
- Check that field names are exactly "Priority" and "Estimate"
- Review GraphQL error details in workflow logs

### Debugging

Check the Actions tab for detailed execution logs including:
- Issue content analysis
- Keyword detection results
- Complexity scoring breakdown
- Priority assignment logic
- Label application status
- Comment creation success
- Project integration status (item ID, field updates)
- GraphQL API responses and errors

## Benefits

### For Product Managers
- **Instant Refinement**: Issues are analyzed immediately upon submission
- **Consistent Sizing**: Standardized story point assignment reduces estimation variance
- **Priority Clarity**: Automatic priority assignment based on defined criteria
- **Ready Notifications**: Clear indication when issues are ready for planning
- **Easy Review Process**: All refined issues automatically organized in "Intake" milestone

### For Engineering Teams
- **Faster Planning**: Pre-refined issues accelerate planning sessions
- **Better Estimation**: Consistent complexity analysis improves velocity predictions
- **Reduced Manual Work**: Eliminates manual refinement overhead
- **Historical Data**: Integration with velocity reporting provides trend analysis

### for Stakeholders
- **Transparency**: Clear analysis reasoning and priority justification
- **Consistency**: Standardized approach reduces subjective bias
- **Efficiency**: Faster time-to-planning for new requirements
- **Visibility**: Automatic notifications and tracking for issue status
- **Lead-Friendly**: Centralized "Intake" milestone makes it easy to find issues ready for review

This automation system demonstrates how AI-driven analysis can eliminate manual overhead while providing actionable insights for product delivery.