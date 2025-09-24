#!/usr/bin/env python3
"""
Velocity Analysis Script for maggieconboy/Personal-Repo
Using data from GitHub search results to analyze velocity trends
"""

import json
from datetime import datetime
from typing import Dict, List


def analyze_velocity_from_search_data():
    """
    Analyze velocity trends based on the search results we obtained
    """
    
    # Milestone data from our search
    milestones = {
        1: {
            'title': 'Sprint 1 - 7/14-7/25', 
            'state': 'open',
            'open_issues': 5,
            'closed_issues': 4,
            'created_at': '2025-07-15T20:23:24Z'
        },
        2: {
            'title': 'Sprint 2 - 7/28-8/8',
            'state': 'open', 
            'open_issues': 2,
            'closed_issues': 4,
            'created_at': '2025-07-15T20:23:53Z'
        },
        3: {
            'title': 'Sprint 3 - 8/11-8/22',
            'state': 'open',
            'open_issues': 5, 
            'closed_issues': 3,
            'created_at': '2025-07-15T20:24:41Z'
        }
    }
    
    # Issues with story points from our search data
    issues_with_story_points = [
        # Sprint 1 issues
        {'number': 19, 'title': 'Phase 2: Zendesk Personas', 'milestone': 1, 'state': 'open', 'story_points': 8, 'created_at': '2025-04-23T20:33:12Z'},
        {'number': 18, 'title': 'Phase 1: Seller User Personas', 'milestone': 1, 'state': 'closed', 'story_points': 0, 'created_at': '2025-04-23T20:31:14Z', 'closed_at': '2025-04-23T20:39:02Z'},
        {'number': 15, 'title': 'Help Parker & team push through salesforce entitlement automation efforts', 'milestone': 1, 'state': 'open', 'story_points': 5, 'created_at': '2025-04-23T20:15:02Z'},
        {'number': 14, 'title': 'GitHub Seller Journey Research Project', 'milestone': 1, 'state': 'open', 'story_points': 2, 'created_at': '2025-04-23T20:05:39Z'},
        {'number': 9, 'title': 'Request System Data', 'milestone': 1, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-15T18:58:34Z', 'closed_at': '2025-04-23T20:01:37Z'},
        {'number': 7, 'title': 'Conduct User Survey', 'milestone': 1, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-15T18:46:57Z', 'closed_at': '2025-04-23T20:02:01Z'},
        {'number': 5, 'title': 'Synthesis of user insights and research', 'milestone': 1, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-15T18:43:54Z', 'closed_at': '2025-04-23T20:01:30Z'},
        {'number': 2, 'title': 'Clean up unused fields in SFDC', 'milestone': 1, 'state': 'open', 'story_points': 13, 'created_at': '2025-02-14T16:07:46Z'},
        {'number': 1, 'title': 'Set up Gong to allow for simultaneous use of both Zoom & Teams', 'milestone': 1, 'state': 'open', 'story_points': 3, 'created_at': '2025-02-14T15:52:58Z'},
        
        # Sprint 2 issues  
        {'number': 13, 'title': 'Write user stories & AC for the GitHub Recommender work', 'milestone': 2, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-20T21:03:09Z', 'closed_at': '2025-04-23T20:00:21Z'},
        {'number': 12, 'title': 'Salesforce ending support for Workflow Rules and Process Builder on December 31, 2025', 'milestone': 2, 'state': 'open', 'story_points': 0, 'created_at': '2025-02-19T14:05:53Z'},
        {'number': 11, 'title': 'Get Copilot/Transcription on by default in Teams meetings', 'milestone': 2, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-18T21:29:23Z', 'closed_at': '2025-04-23T20:01:09Z'},
        {'number': 6, 'title': 'Customer Lifecycle Maps', 'milestone': 2, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-15T18:44:20Z', 'closed_at': '2025-04-23T20:11:33Z'},
        {'number': 4, 'title': 'Create User Journey Maps', 'milestone': 2, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-15T18:42:54Z', 'closed_at': '2025-04-23T20:11:00Z'},
        {'number': 17, 'title': 'Epic: GitHub Persona Development', 'milestone': 2, 'state': 'open', 'story_points': 0, 'created_at': '2025-04-23T20:29:15Z'},
        
        # Sprint 3 issues
        {'number': 26, 'title': 'I am an enhancement request that is aligned to an approved project', 'milestone': 3, 'state': 'open', 'story_points': 0, 'created_at': '2025-09-19T20:21:30Z'},
        {'number': 23, 'title': 'Test 3', 'milestone': 3, 'state': 'open', 'story_points': 0, 'created_at': '2025-08-14T13:02:47Z'},
        {'number': 22, 'title': 'Test 2', 'milestone': 3, 'state': 'open', 'story_points': 0, 'created_at': '2025-08-14T13:02:23Z'},
        {'number': 21, 'title': 'Test', 'milestone': 3, 'state': 'open', 'story_points': 0, 'created_at': '2025-08-14T13:01:58Z'},
        {'number': 16, 'title': 'Standardize Salesforce Roles & Permissions', 'milestone': 3, 'state': 'open', 'story_points': 0, 'created_at': '2025-04-23T20:16:14Z'},
        {'number': 10, 'title': 'Conduct User Interviews', 'milestone': 3, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-15T19:00:43Z', 'closed_at': '2025-04-23T20:02:23Z'},
        {'number': 8, 'title': 'Get seller demographic data from HR', 'milestone': 3, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-15T18:49:53Z', 'closed_at': '2025-02-25T20:58:44Z'},
        {'number': 3, 'title': 'Create Personas for Revenue Team Users', 'milestone': 3, 'state': 'closed', 'story_points': 0, 'created_at': '2025-02-15T18:42:23Z', 'closed_at': '2025-04-23T20:00:23Z'},
    ]
    
    def calculate_cycle_time(issue):
        """Calculate cycle time in days"""
        if issue['state'] != 'closed' or 'closed_at' not in issue:
            return None
        
        created = datetime.fromisoformat(issue['created_at'].replace('Z', '+00:00'))
        closed = datetime.fromisoformat(issue['closed_at'].replace('Z', '+00:00'))
        return (closed - created).days
    
    # Analyze each milestone
    milestone_analyses = []
    
    for milestone_num, milestone_info in milestones.items():
        milestone_issues = [issue for issue in issues_with_story_points if issue['milestone'] == milestone_num]
        
        closed_issues = [issue for issue in milestone_issues if issue['state'] == 'closed']
        open_issues = [issue for issue in milestone_issues if issue['state'] == 'open']
        
        closed_story_points = sum(issue['story_points'] for issue in closed_issues)
        open_story_points = sum(issue['story_points'] for issue in open_issues)
        total_story_points = closed_story_points + open_story_points
        
        # Calculate cycle times
        cycle_times = []
        for issue in closed_issues:
            cycle_time = calculate_cycle_time(issue)
            if cycle_time is not None:
                cycle_times.append(cycle_time)
        
        avg_cycle_time = sum(cycle_times) / len(cycle_times) if cycle_times else 0
        
        analysis = {
            'milestone_number': milestone_num,
            'title': milestone_info['title'],
            'state': milestone_info['state'],
            'total_issues': len(milestone_issues),
            'closed_issues': len(closed_issues),
            'open_issues': len(open_issues),
            'closed_story_points': closed_story_points,
            'open_story_points': open_story_points,
            'total_story_points': total_story_points,
            'completion_rate': (closed_story_points / total_story_points * 100) if total_story_points > 0 else 0,
            'cycle_times': cycle_times,
            'avg_cycle_time': avg_cycle_time,
            'created_at': milestone_info['created_at'],
            'issues_detail': {
                'closed': [{
                    'number': issue['number'],
                    'title': issue['title'],
                    'story_points': issue['story_points'],
                    'cycle_time': calculate_cycle_time(issue)
                } for issue in closed_issues],
                'open': [{
                    'number': issue['number'], 
                    'title': issue['title'],
                    'story_points': issue['story_points']
                } for issue in open_issues]
            }
        }
        milestone_analyses.append(analysis)
    
    # Calculate overall trends
    completed_points = [m['closed_story_points'] for m in milestone_analyses]
    avg_story_points = sum(completed_points) / len(completed_points) if completed_points else 0
    
    all_cycle_times = []
    for m in milestone_analyses:
        all_cycle_times.extend(m['cycle_times'])
    
    avg_cycle_time = sum(all_cycle_times) / len(all_cycle_times) if all_cycle_times else 0
    
    # Calculate velocity trend
    if len(completed_points) >= 2 and completed_points[0] > 0:
        velocity_trend = ((completed_points[-1] - completed_points[0]) / completed_points[0]) * 100
    else:
        # Alternative calculation if first sprint has 0 points
        if len(completed_points) >= 2:
            non_zero_points = [p for p in completed_points if p > 0]
            if len(non_zero_points) >= 2:
                velocity_trend = ((non_zero_points[-1] - non_zero_points[0]) / non_zero_points[0]) * 100
            else:
                velocity_trend = 0
        else:
            velocity_trend = 0
    
    return {
        'analysis_date': datetime.now().isoformat(),
        'repository': 'maggieconboy/Personal-Repo',
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
    print("🚀 Starting Velocity Analysis for maggieconboy/Personal-Repo")
    print("=" * 60)
    
    results = analyze_velocity_from_search_data()
    
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
        if milestone['total_story_points'] > 0:
            print(f"  Completion Rate: {milestone['completion_rate']:.1f}%")
        else:
            print(f"  Completion Rate: N/A (no story points assigned)")
        print(f"  Average Cycle Time: {milestone['avg_cycle_time']:.1f} days")
        
        if milestone['issues_detail']['closed']:
            print(f"  Completed Issues:")
            for issue in milestone['issues_detail']['closed'][:5]:  # Show top 5
                sp_text = f"({issue['story_points']} SP)" if issue['story_points'] > 0 else "(0 SP)"
                cycle_text = f"{issue['cycle_time']} days" if issue['cycle_time'] is not None else "N/A"
                print(f"    #{issue['number']}: {issue['title'][:40]}... {sp_text} - {cycle_text}")
    
    # Save results
    with open('velocity_analysis.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n💾 Detailed results saved to velocity_analysis.json")
    return results


if __name__ == "__main__":
    main()