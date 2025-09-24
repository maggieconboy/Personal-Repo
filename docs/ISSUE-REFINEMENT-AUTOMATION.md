# Issue Refinement Automation

## Overview

This repository includes an automated issue refinement system that analyzes new issues and automatically assigns story points based on complexity and priority levels based on severity and urgency. The system provides instant feedback and notifications when new issues are ready for review.

## How It Works

### 1. Automated Trigger
- **When**: Automatically triggered when new issues are opened or edited
- **Manual**: Can be triggered manually via workflow dispatch for specific issues
- **Runtime**: ~30-60 seconds per issue analysis

### 2. Complexity Analysis
The system analyzes issue content using keyword detection and content analysis to determine story points:

#### Story Point Assignment Logic
- **1 Point**: Bug fixes, typos, documentation updates, minor configuration changes
- **3 Points**: Small enhancements, minor feature additions
- **5 Points**: Standard feature development, API modifications, UI/UX changes
- **8 Points**: Complex features, integrations, significant system modifications
- **13 Points**: Architecture changes, new services, security reviews, multi-system projects

#### Analysis Factors
- **Content Keywords**: Scans for complexity indicators in title and description
- **Content Length**: Longer, more detailed issues often indicate higher complexity
- **System Components**: Multiple systems or components increase complexity score
- **Technical Requirements**: API changes, database modifications, security considerations

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
- **Story Points**: `points-1`, `points-3`, `points-5`, `points-8`, `points-13`
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

## Setup Requirements

### Labels
The workflow automatically creates these labels if they don't exist:

**Story Point Labels:**
- `points-1` (Light blue) - 1 story point
- `points-3` (Medium blue) - 3 story points  
- `points-5` (Blue) - 5 story points
- `points-8` (Dark blue) - 8 story points
- `points-13` (Deep blue) - 13 story points

**Priority Labels:**
- `priority-critical` (Red) - Critical priority
- `priority-high` (Orange) - High priority
- `priority-medium` (Yellow) - Medium priority
- `priority-low` (Green) - Low priority

**Process Labels:**
- `refined` (Green) - Issue has been automatically refined

### Permissions
The workflow requires these permissions (already configured):
- `issues: write` - Add labels and comments to issues
- `contents: read` - Access repository content for analysis
- `pull-requests: read` - Access milestone and project data

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

**Story Points**: 8 points  
**Priority**: High

### Analysis Details
- **Complexity Reasoning**: Medium-high complexity: significant feature work or integrations
- **Priority Reasoning**: High: Customer or revenue impact, or time-sensitive requirements
- **Keywords Detected**: feature, api, integration, customer impact
- **Content Length**: 1247 characters

### Next Steps
This issue has been automatically refined and is ready for review...
```

### Refinement Tracking Issue
```markdown
## 📋 New Issue Refined - Ready for Review

**Issue**: #45 - Add user authentication system
**Story Points**: 8 points
**Priority**: High
**Refined**: 2024-09-24

**Analysis Summary**:
- Medium-high complexity: significant feature work or integrations
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

**Missing labels**
- Workflow creates labels automatically on first run
- Check repository permissions for label creation
- Verify label creation step completed successfully

### Debugging

Check the Actions tab for detailed execution logs including:
- Issue content analysis
- Keyword detection results
- Complexity scoring breakdown
- Priority assignment logic
- Label application status
- Comment creation success

## Benefits

### For Product Managers
- **Instant Refinement**: Issues are analyzed immediately upon submission
- **Consistent Sizing**: Standardized story point assignment reduces estimation variance
- **Priority Clarity**: Automatic priority assignment based on defined criteria
- **Ready Notifications**: Clear indication when issues are ready for planning

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

This automation system demonstrates how AI-driven analysis can eliminate manual overhead while providing actionable insights for product delivery.