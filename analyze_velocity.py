#!/usr/bin/env python3
"""
Velocity Analysis Script for maggieconboy/Personal-Repo

This script analyzes velocity trends across the last 3 milestones including:
- Average story points completed per milestone
- Cycle time analysis
- Velocity trends and patterns
"""

import json
import requests
from datetime import datetime
from typing import Dict, List, Tuple, Optional
import sys


class VelocityAnalyzer:
    def __init__(self, owner: str, repo: str, token: Optional[str] = None):
        self.owner = owner
        self.repo = repo
        self.base_url = "https://api.github.com"
        self.headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28"
        }
        if token:
            self.headers["Authorization"] = f"Bearer {token}"
    
    def get_milestones(self) -> List[Dict]:
        """Get all milestones for the repository"""
        url = f"{self.base_url}/repos/{self.owner}/{self.repo}/milestones"
        params = {"state": "all", "per_page": 100}
        
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error fetching milestones: {response.status_code}")
            return []
    
    def get_issues_for_milestone(self, milestone_number: int, state: str = "all") -> List[Dict]:
        """Get all issues for a specific milestone"""
        url = f"{self.base_url}/repos/{self.owner}/{self.repo}/issues"
        params = {
            "milestone": milestone_number,
            "state": state,
            "per_page": 100
        }
        
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error fetching issues for milestone {milestone_number}: {response.status_code}")
            return []
    
    def extract_story_points(self, issue: Dict) -> int:
        """Extract story points from issue labels (format: 'SP: X')"""
        labels = issue.get('labels', [])
        for label in labels:
            if isinstance(label, dict):
                name = label.get('name', '')
            else:
                name = str(label)
            
            if name.startswith('SP: '):
                try:
                    return int(name.split('SP: ')[1])
                except (ValueError, IndexError):
                    continue
        return 0
    
    def calculate_cycle_time(self, issue: Dict) -> Optional[int]:
        """Calculate cycle time in days from creation to closure"""
        if issue.get('state') != 'closed' or not issue.get('closed_at'):
            return None
        
        created = datetime.fromisoformat(issue['created_at'].replace('Z', '+00:00'))
        closed = datetime.fromisoformat(issue['closed_at'].replace('Z', '+00:00'))
        
        return (closed - created).days
    
    def analyze_milestone(self, milestone: Dict) -> Dict:
        """Analyze a single milestone for velocity metrics"""
        milestone_number = milestone['number']
        milestone_title = milestone['title']
        
        # Get all issues for this milestone
        issues = self.get_issues_for_milestone(milestone_number)
        
        # Separate open and closed issues
        closed_issues = [issue for issue in issues if issue['state'] == 'closed']
        open_issues = [issue for issue in issues if issue['state'] == 'open']
        
        # Calculate story points
        closed_story_points = sum(self.extract_story_points(issue) for issue in closed_issues)
        open_story_points = sum(self.extract_story_points(issue) for issue in open_issues)
        total_story_points = closed_story_points + open_story_points
        
        # Calculate cycle times for closed issues
        cycle_times = []
        for issue in closed_issues:
            cycle_time = self.calculate_cycle_time(issue)
            if cycle_time is not None:
                cycle_times.append(cycle_time)
        
        avg_cycle_time = sum(cycle_times) / len(cycle_times) if cycle_times else 0
        
        return {
            'milestone_number': milestone_number,
            'title': milestone_title,
            'state': milestone['state'],
            'total_issues': len(issues),
            'closed_issues': len(closed_issues),
            'open_issues': len(open_issues),
            'closed_story_points': closed_story_points,
            'open_story_points': open_story_points,
            'total_story_points': total_story_points,
            'completion_rate': (closed_story_points / total_story_points) * 100 if total_story_points > 0 else 0,
            'cycle_times': cycle_times,
            'avg_cycle_time': avg_cycle_time,
            'created_at': milestone['created_at'],
            'updated_at': milestone['updated_at'],
            'due_on': milestone.get('due_on'),
            'issues_detail': {
                'closed': [{'number': issue['number'], 'title': issue['title'], 
                           'story_points': self.extract_story_points(issue),
                           'cycle_time': self.calculate_cycle_time(issue)} for issue in closed_issues],
                'open': [{'number': issue['number'], 'title': issue['title'],
                         'story_points': self.extract_story_points(issue)} for issue in open_issues]
            }
        }
    
    def analyze_velocity_trends(self) -> Dict:
        """Analyze velocity trends across the last 3 milestones"""
        milestones = self.get_milestones()
        
        # Sort milestones by creation date (most recent first)
        milestones.sort(key=lambda x: x['created_at'], reverse=True)
        
        # Take the last 3 milestones for analysis
        target_milestones = milestones[:3] if len(milestones) >= 3 else milestones
        
        milestone_analyses = []
        for milestone in target_milestones:
            analysis = self.analyze_milestone(milestone)
            milestone_analyses.append(analysis)
        
        # Sort by milestone number for chronological analysis
        milestone_analyses.sort(key=lambda x: x['milestone_number'])
        
        # Calculate overall trends
        completed_points = [m['closed_story_points'] for m in milestone_analyses]
        avg_story_points = sum(completed_points) / len(completed_points) if completed_points else 0
        
        all_cycle_times = []
        for m in milestone_analyses:
            all_cycle_times.extend(m['cycle_times'])
        
        avg_cycle_time = sum(all_cycle_times) / len(all_cycle_times) if all_cycle_times else 0
        
        # Calculate velocity trend (% change from first to last milestone)
        if len(completed_points) >= 2 and completed_points[0] > 0:
            velocity_trend = ((completed_points[-1] - completed_points[0]) / completed_points[0]) * 100
        else:
            velocity_trend = 0
        
        return {
            'analysis_date': datetime.now().isoformat(),
            'repository': f"{self.owner}/{self.repo}",
            'milestones_analyzed': len(milestone_analyses),
            'milestone_details': milestone_analyses,
            'summary': {
                'avg_story_points_completed': avg_story_points,
                'avg_cycle_time_days': avg_cycle_time,
                'velocity_trend_percent': velocity_trend,
                'total_story_points_completed': sum(completed_points),
                'total_issues_completed': sum(m['closed_issues'] for m in milestone_analyses)
            }
        }


def main():
    """Main function to run the velocity analysis"""
    # Initialize analyzer
    analyzer = VelocityAnalyzer("maggieconboy", "Personal-Repo")
    
    print("🚀 Starting Velocity Analysis for maggieconboy/Personal-Repo")
    print("=" * 60)
    
    # Perform analysis
    results = analyzer.analyze_velocity_trends()
    
    # Display results
    print(f"\n📊 VELOCITY ANALYSIS RESULTS")
    print(f"Analysis Date: {results['analysis_date']}")
    print(f"Repository: {results['repository']}")
    print(f"Milestones Analyzed: {results['milestones_analyzed']}")
    
    print(f"\n📈 SUMMARY METRICS")
    summary = results['summary']
    print(f"• Average Story Points Completed: {summary['avg_story_points_completed']:.1f}")
    print(f"• Average Cycle Time: {summary['avg_cycle_time_days']:.1f} days")
    print(f"• Velocity Trend: {summary['velocity_trend_percent']:.1f}%")
    print(f"• Total Story Points Completed: {summary['total_story_points_completed']}")
    print(f"• Total Issues Completed: {summary['total_issues_completed']}")
    
    print(f"\n🎯 MILESTONE BREAKDOWN")
    for milestone in results['milestone_details']:
        print(f"\n{milestone['title']} (#{milestone['milestone_number']})")
        print(f"  Status: {milestone['state'].upper()}")
        print(f"  Story Points Completed: {milestone['closed_story_points']}")
        print(f"  Issues: {milestone['closed_issues']} closed, {milestone['open_issues']} open")
        print(f"  Completion Rate: {milestone['completion_rate']:.1f}%")
        print(f"  Average Cycle Time: {milestone['avg_cycle_time']:.1f} days")
        
        if milestone['issues_detail']['closed']:
            print(f"  Completed Issues:")
            for issue in milestone['issues_detail']['closed']:
                sp_text = f"({issue['story_points']} SP)" if issue['story_points'] > 0 else "(No SP)"
                cycle_text = f"{issue['cycle_time']} days" if issue['cycle_time'] is not None else "N/A"
                print(f"    #{issue['number']}: {issue['title'][:50]}... {sp_text} - {cycle_text}")
    
    # Save detailed results to JSON
    with open('velocity_analysis.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n💾 Detailed results saved to velocity_analysis.json")
    
    return results


if __name__ == "__main__":
    main()