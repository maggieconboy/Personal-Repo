# Issue Refinement Automation - Quick Reference

## What It Does

The Issue Refinement workflow automatically:
1. ✅ Analyzes issue content for complexity and priority
2. ✅ Assigns story points (1, 2, 3, 5, 8, 13, 21)
3. ✅ Sets priority level (Critical, High, Medium, Low)
4. ✅ Adds labels to issues
5. ✅ Assigns to "Intake" milestone
6. ✅ Posts analysis comment
7. ✅ **NEW**: Adds to GitHub Projects board
8. ✅ **NEW**: Updates Priority field on board
9. ✅ **NEW**: Updates Estimate field with story points

## Quick Setup (5 minutes)

### For GitHub Projects Integration

1. **Create PAT**: [GitHub Settings → Tokens](https://github.com/settings/tokens?type=beta)
   - Grant `project` read/write permissions
   - Select this repository

2. **Add Secret**: [Repository Settings → Secrets](https://github.com/maggieconboy/Personal-Repo/settings/secrets/actions)
   - Name: `PROJECT_PAT`
   - Value: Your token

3. **Verify Project**: [Your Project Board](https://github.com/users/maggieconboy/projects/1)
   - Must have "Priority" field (single-select)
   - Must have "Estimate" field (number)

4. **Test**: Create a new issue and watch it appear on your board!

## Story Point Scale

| Points | Effort | Example |
|--------|--------|---------|
| 1 | Minutes-1 hour | Typo fix, copy update |
| 2 | < 1 day | Small bug fix, simple change |
| 3 | 1-2 days | Bug fix, small feature |
| 5 | 3-5 days | Feature with research |
| 8 | 6-10 days | Complex feature, cross-team |
| 13 | 11+ days | Unclear requirements, discovery |
| 21 | 2+ sprints | Project-level, multiple tasks |

## Priority Levels

| Priority | Indicators | Example Keywords |
|----------|-----------|------------------|
| 🔴 Critical | Production down, security | critical, urgent, security vulnerability |
| 🟠 High | Customer/revenue impact | important, customer impact, deadline |
| 🟡 Medium | Standard development | (default for most issues) |
| 🟢 Low | Nice-to-have | low priority, future, enhancement |

## Common Workflows

### Creating an Issue
1. Create issue with description
2. Wait ~30-60 seconds
3. Check for automation comment
4. Verify labels and milestone
5. See it on project board!

### Manual Refinement
1. Go to Actions tab
2. Select "Issue Refinement Automation"
3. Click "Run workflow"
4. Enter issue number
5. Run workflow

### Debugging
Check Actions tab for logs showing:
- Keywords detected
- Story points reasoning
- Priority logic
- Project integration status
- Any errors

## Important Notes

⚠️ **Without PROJECT_PAT**: 
- Labels and milestones still work
- Project integration is skipped
- Workflow completes successfully

✅ **With PROJECT_PAT**:
- Full automation including project board
- Priority field automatically updated
- Estimate field automatically set

## Links

- 📖 [Full Documentation](ISSUE-REFINEMENT-AUTOMATION.md)
- 🔧 [Setup Guide](GITHUB-PROJECTS-SETUP.md)
- 🎯 [Project Board](https://github.com/users/maggieconboy/projects/1)
- ⚙️ [Workflow File](../.github/workflows/issue-refinement.yml)

## Troubleshooting

**Issue not refined?**
- Check Actions tab for errors
- Verify workflow has permissions
- Ensure issue was created/edited after deployment

**Not added to project?**
- Verify PROJECT_PAT is configured
- Check token has project permissions
- Review GraphQL errors in logs

**Fields not updating?**
- Confirm field names: "Priority" and "Estimate"
- Check Priority options: Critical, High, Medium, Low
- Verify Estimate is Number type

## Support

Need help? Open an issue with:
- Link to the issue being refined
- Screenshot of Actions log
- Description of expected vs actual behavior
