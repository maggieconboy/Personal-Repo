# GitHub Projects Integration Setup

This guide walks through setting up the Personal Access Token (PAT) required for the Issue Refinement workflow to automatically add issues to your GitHub Projects board and update custom fields.

## Prerequisites

- Repository with the Issue Refinement workflow installed
- A GitHub Projects (V2) board with "Priority" and "Estimate" custom fields
- Admin access to the repository to add secrets

## Step 1: Create a Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Click **"Generate new token"**
3. Configure the token:
   - **Token name**: "Issue Refinement Project Access" (or your preferred name)
   - **Expiration**: Choose an appropriate expiration date (recommend 1 year)
   - **Resource owner**: Select your username (maggieconboy)

## Step 2: Set Token Permissions

### Repository Access
- **Repository access**: Select "Only select repositories"
- Choose: `Personal-Repo` (or the repository where the workflow is installed)

### Repository Permissions
- **Issues**: Read and write
- **Metadata**: Read-only (automatically selected)

### Account Permissions
- **Projects**: Read and write

## Step 3: Generate and Copy Token

1. Click **"Generate token"** at the bottom of the page
2. **IMPORTANT**: Copy the token immediately - you won't be able to see it again
3. Store it securely (consider using a password manager)

## Step 4: Add Token as Repository Secret

1. Go to your repository: https://github.com/maggieconboy/Personal-Repo
2. Navigate to **Settings > Secrets and variables > Actions**
3. Click **"New repository secret"**
4. Configure the secret:
   - **Name**: `PROJECT_PAT`
   - **Secret**: Paste the token you copied in Step 3
5. Click **"Add secret"**

## Step 5: Verify Project Configuration

Ensure your GitHub Projects board has the required custom fields:

### Priority Field (Single Select)
- **Field name**: `Priority` (exact name, case-sensitive)
- **Field type**: Single select
- **Options** (must include these, case-insensitive matching):
  - Critical
  - High
  - Medium
  - Low

### Estimate Field (Number)
- **Field name**: `Estimate` (exact name, case-sensitive)
- **Field type**: Number

## Step 6: Test the Integration

1. Create a new issue in the repository
2. Wait for the workflow to complete (~1-2 minutes)
3. Check the Actions tab to verify the workflow succeeded
4. Verify the issue appears in your project board: https://github.com/users/maggieconboy/projects/1
5. Confirm the Priority and Estimate fields are populated

## Troubleshooting

### Token doesn't have access
**Error**: `Resource not accessible by integration`

**Solution**: 
- Verify the token has `project` read and write permissions
- Ensure the token is set as the `PROJECT_PAT` secret (not a different name)
- Confirm the repository is included in the token's repository access

### Project not found
**Error**: `Project not found` or `null` response

**Solution**:
- Verify the project number in the workflow matches your project URL
- Ensure the project is owned by the user account (not an organization)
- Check that the token has access to user projects

### Fields not updating
**Error**: Field updates fail silently or show `field not found`

**Solution**:
- Check field names are exactly "Priority" and "Estimate" (case-sensitive)
- Verify Priority has the correct options (Critical, High, Medium, Low)
- Confirm Estimate is configured as a Number field type
- Review the workflow logs for specific GraphQL error messages

### Token expired
**Error**: `Bad credentials` or authentication errors

**Solution**:
- Personal access tokens expire based on the expiration date you set
- Generate a new token following Steps 1-4 above
- Update the `PROJECT_PAT` secret with the new token value

## Security Best Practices

1. **Minimal Scope**: Only grant the permissions needed (projects + issues)
2. **Repository Access**: Only grant access to the specific repository that needs it
3. **Regular Rotation**: Rotate tokens periodically (e.g., every 6-12 months)
4. **Monitor Usage**: Review token usage in GitHub's token settings
5. **Revoke if Compromised**: If the token is exposed, revoke it immediately and create a new one

## Alternative: Organization-Level Projects

If your project is owned by an organization instead of a user account, modify the workflow:

1. Change the GraphQL query in `.github/workflows/issue-refinement.yml`
2. Replace:
   ```javascript
   const projectQuery = `
     query($owner: String!, $number: Int!) {
       user(login: $owner) {
         projectV2(number: $number) {
   ```
3. With:
   ```javascript
   const projectQuery = `
     query($owner: String!, $number: Int!) {
       organization(login: $owner) {
         projectV2(number: $number) {
   ```
4. Update `PROJECT_OWNER` constant to the organization name

## Support

For additional help:
- Review workflow logs in the Actions tab
- Check [GitHub's Projects API documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects)
- Open an issue in the repository with workflow logs attached
