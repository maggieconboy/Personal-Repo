# GitHub Copilot Instructions

## Repository Context
This is Maggie Conboy's personal GitHub profile repository, showcasing her professional background as a Product Manager of Revenue Systems at GitHub. The repository focuses on AI automation, product management excellence, and demonstrating expertise in Copilot tools and workflows.

## Repository Purpose
- **Primary Function**: Personal professional profile and portfolio
- **Audience**: Potential employers, collaborators, and the GitHub community
- **Focus Areas**: AI automation, product management, revenue systems, and Copilot tooling

## Content Guidelines

### Documentation Standards
- Use clear, professional, and engaging markdown formatting
- Maintain consistency with the existing README.md structure and tone
- Include emoji icons to enhance readability and visual appeal
- Structure content with clear headings and bullet points
- Reference external links appropriately with descriptive anchor text

### Professional Tone
- Emphasize outcome-driven and data-driven approaches
- Highlight concrete achievements and measurable impact
- Use diplomatic and collaborative language
- Focus on opportunities and proactive thinking
- Maintain a balance between confidence and humility

### AI and Automation Focus
- When suggesting improvements, consider AI automation opportunities
- Reference Copilot tools (Agents, Loops, Spaces, Spark) where relevant
- Emphasize how solutions can benefit both technical and non-technical stakeholders
- Consider workflow automation and productivity enhancements

## Technical Preferences

### File Organization
- Keep the root directory clean with essential files only
- Use `.github/` directory for GitHub-specific configurations
- Organize templates and workflows logically within `.github/`
- Maintain clear file naming conventions

### Issue Templates and Workflows
- Follow the existing engineering sizing template pattern
- Create structured forms with clear validation requirements
- Use appropriate labels and categorization
- Include helpful descriptions and placeholder text

### Code Quality
- Prioritize readability and maintainability
- Include comprehensive documentation for any code or scripts
- Use consistent formatting and style
- Add appropriate comments for complex logic

## Project Alignment

### Values Integration
- **Proactive Leadership**: Suggest solutions that demonstrate forward-thinking
- **Data-Driven Decisions**: Include metrics or references where appropriate
- **Diplomatic Collaboration**: Use inclusive and collaborative language
- **Concrete Outcomes**: Focus on actionable results over aspirations

### Career Focus Areas
- Product strategy and roadmapping
- Cross-functional collaboration
- Rapid prototyping approaches  
- Software Development Lifecycle (SDLC)
- Agile methodologies

## Contribution Guidelines
When making changes or suggestions:
1. Align with the professional and outcome-focused tone
2. Consider the impact on both technical and business audiences
3. Maintain the existing structure and formatting patterns
4. Enhance rather than replace existing content
5. Ensure changes support Maggie's career objectives and professional brand

## AI Tool Integration
- Leverage Copilot capabilities for content generation and improvement
- Consider how changes can demonstrate AI tool proficiency
- Reference relevant GitHub features and capabilities
- Showcase understanding of modern development workflows

## Technology Stack

### Core Technologies
- **Static Site Generator**: Jekyll (GitHub Pages)
- **Frontend**: HTML5, CSS3, vanilla JavaScript
- **Styling**: Custom CSS with responsive design
- **External Libraries**: Swiper.js for carousels
- **Automation**: GitHub Actions (Node.js 20)

### Key Dependencies
- No npm/package manager dependencies for frontend code
- GitHub Actions use Node.js 20 for automation scripts
- Jekyll theme: `jekyll-theme-primer`

## Build & Deployment

### Local Development
- This is a Jekyll-based GitHub Pages site
- GitHub Pages automatically builds and deploys on push to main branch
- No local build process required for HTML/CSS/JS changes
- To test Jekyll locally (optional):
  ```bash
  bundle install
  bundle exec jekyll serve
  ```

### Deployment
- **Automatic**: Changes to main branch trigger GitHub Pages deployment
- **Manual Testing**: Preview HTML files directly in a browser
- **No build artifacts**: All files are source files

### Validation Before Deployment
1. Check HTML syntax and structure
2. Verify JavaScript functionality in browser
3. Test responsive design across different screen sizes
4. Validate all internal and external links
5. Check accessibility features (ARIA labels, keyboard navigation)

## Testing Guidelines

### Manual Testing Required
- **Visual Testing**: Open HTML files in browser to verify layout and styling
- **Functional Testing**: Test interactive features (navigation, carousels, links)
- **Responsive Testing**: Check display on mobile, tablet, and desktop viewports
- **Cross-browser Testing**: Verify compatibility with major browsers

### GitHub Actions Testing
- Workflows automatically validate on workflow_dispatch or schedule triggers
- Review workflow run logs for any errors
- Test issue refinement automation by creating test issues

### Accessibility Testing
- Verify keyboard navigation works for all interactive elements
- Check ARIA labels are present and descriptive
- Ensure color contrast meets WCAG guidelines
- Test with screen reader if making significant UI changes

## Acceptance Criteria

### For Content Changes
- ✅ Markdown is properly formatted with correct syntax
- ✅ Links are valid and point to correct destinations
- ✅ Content tone matches professional and outcome-focused style
- ✅ Emoji usage is consistent with existing patterns
- ✅ Changes support Maggie's career objectives and personal brand

### For Code Changes
- ✅ HTML is valid and semantic
- ✅ CSS follows existing naming conventions and patterns
- ✅ JavaScript is functional and error-free (check browser console)
- ✅ Responsive design works across all screen sizes
- ✅ Accessibility features are maintained or improved
- ✅ Changes are tested in at least one modern browser

### For GitHub Actions Changes
- ✅ Workflow syntax is valid YAML
- ✅ Permissions are correctly scoped and minimal
- ✅ Workflow runs successfully without errors
- ✅ Changes are documented in comments or README

### For Documentation
- ✅ Instructions are clear and actionable
- ✅ Examples are provided where helpful
- ✅ Tone is professional and welcoming
- ✅ Documentation is updated when related code changes

## Common Tasks & Commands

### Working with the Repository
```bash
# View the site structure
ls -la

# Check git status
git status

# View recent commits
git log --oneline -10

# Test workflows manually
gh workflow run issue-refinement.yml
gh workflow run velocity-report.yml
```

### Modifying Content
- **Profile Content**: Edit `README.md`
- **HTML Pages**: Edit corresponding `.html` files in root
- **Styling**: Edit files in `css/` directory
- **JavaScript**: Edit files in `js/` directory
- **Jekyll Config**: Edit `_config.yml`

### GitHub Actions
- **Issue Refinement**: `.github/workflows/issue-refinement.yml`
- **Velocity Reports**: `.github/workflows/velocity-report.yml`
- Both use Node.js 20 and GitHub's Octokit API

## Notes for Copilot
- This is a **portfolio repository** - changes should enhance professional presentation
- **No dependencies to install** - all code is vanilla HTML/CSS/JS
- **No build step needed** - files can be previewed directly
- **Focus on content quality** over technical complexity
- **Preserve existing functionality** - don't break working features
- **Match existing style** - maintain consistency in code and content
- When in doubt, **ask for clarification** rather than making assumptions