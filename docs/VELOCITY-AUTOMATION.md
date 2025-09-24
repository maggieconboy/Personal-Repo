# Velocity Reporting Automation

## Overview

This repository includes an automated velocity reporting system that tracks team productivity by analyzing story points from completed issues. The system runs every Friday at 5pm PT and provides insights into velocity trends.

## How It Works

### 1. Automated Schedule
- **When**: Every Friday at 5pm PT (1am UTC Saturday)
- **Trigger**: GitHub Actions cron schedule + manual workflow dispatch
- **Runtime**: ~1-2 minutes per execution

### 2. Data Collection
The action automatically:
- Queries all issues closed in the previous week
- Filters by current milestone (earliest due date)
- Extracts story points from labels matching format: `points-X` (e.g., `points-5`, `points-13`)
- Calculates weekly velocity totals

### 3. Metrics Calculated
- **Weekly Points**: Total story points completed in the reporting week
- **3-Week Average**: Rolling average of the last 3 weeks
- **Velocity Trend**: Percentage change compared to previous week
  - ↑ X% for increases
  - ↓ X% for decreases  
  - → 0% for no change

### 4. Output Generation
The system produces:

#### VELOCITY.md File
Updated automatically with:
- Current week summary
- Historical data table
- List of completed issues with story points
- Last updated timestamp

#### Project Board Comments
Posts or updates comments on issue #1 (or creates a velocity tracking issue) with:
- Weekly velocity summary
- Trend analysis
- Link to full report

## Setup Requirements

### Labels
Ensure issues are labeled with story points using this format:
- `points-1`, `points-2`, `points-3`, `points-5`, `points-8`, `points-13`, etc.

### Milestones  
- Create milestones with due dates
- Assign issues to the current milestone
- The action uses the earliest due date milestone as "current"

### Permissions
The workflow requires these permissions (already configured):
- `contents: write` - Update VELOCITY.md file
- `issues: read` - Query closed issues  
- `pull-requests: read` - Access milestone data
- `projects: write` - Post project board comments

## Manual Execution

You can trigger the velocity report manually:

1. Go to **Actions** tab in GitHub
2. Select **Velocity Reporting** workflow
3. Click **Run workflow**
4. Choose the branch and click **Run workflow**

## Sample Output

### VELOCITY.md
```markdown
# Velocity Report

*Last updated: 2024-09-27*

## Current Week Summary

**Week of 2024-09-16**: 13 story points completed
**3-week average**: 11 points
**Velocity trend**: ↑ 18%

### Issues Completed This Week

- #123: Add user authentication (5 points)
- #124: Fix navigation bug (3 points)
- #125: Implement dashboard (5 points)

## Historical Data

- Week of 2024-09-16: 13 story points
- Week of 2024-09-09: 11 points
- Week of 2024-09-02: 9 points
```

### Project Board Comment
```markdown
## 📈 Weekly Velocity Report

**Week of 2024-09-16**: 13 story points completed
**3-week average**: 11 points  
**Velocity trend**: ↑ 18%

*Generated automatically by Velocity Reporting Action*
```

## Troubleshooting

### Common Issues

**No story points calculated**
- Check that issues have `points-X` labels
- Verify issues are assigned to current milestone
- Ensure issues were closed in the reporting week

**Action fails with permissions error**
- Verify repository settings allow GitHub Actions
- Check that GITHUB_TOKEN has required permissions

### Debugging

Check the Actions tab for detailed execution logs including:
- Issues queried and filtered
- Story points extracted
- Velocity calculations
- File update status

## Customization

To modify the reporting:

1. **Change schedule**: Edit the cron expression in `velocity-report.yml`
2. **Adjust metrics**: Modify the calculation logic in the workflow
3. **Change output format**: Update the VELOCITY.md template generation
4. **Add more data**: Extend the GitHub API queries