#!/usr/bin/env python3
"""
Generate velocity summary and trends visualization
"""
import json
from datetime import datetime


def generate_velocity_summary():
    """Generate a text-based velocity summary with trends"""
    
    # Load the analysis data
    try:
        with open('velocity_analysis.json', 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print("Run velocity_analyzer.py first to generate analysis data")
        return
    
    print("🎯 VELOCITY TRENDS SUMMARY")
    print("=" * 50)
    
    milestones = data['milestone_details']
    
    # Issue completion trend
    completion_rates = []
    for m in milestones:
        if m['total_issues'] > 0:
            rate = (m['closed_issues'] / m['total_issues']) * 100
            completion_rates.append(rate)
        else:
            completion_rates.append(0)
    
    print("\n📊 Issue Completion Rate Trend:")
    for i, (milestone, rate) in enumerate(zip(milestones, completion_rates)):
        trend = ""
        if i > 0:
            prev_rate = completion_rates[i-1]
            if rate > prev_rate:
                trend = f" ⬆️ +{rate-prev_rate:.1f}%"
            elif rate < prev_rate:
                trend = f" ⬇️ -{prev_rate-rate:.1f}%"
            else:
                trend = " ➡️ No change"
        
        print(f"  {milestone['title']}: {rate:.1f}% ({milestone['closed_issues']}/{milestone['total_issues']} issues){trend}")
    
    # Cycle time trend
    print(f"\n⏱️ Average Cycle Time Trend:")
    cycle_times = []
    for milestone in milestones:
        cycle_time = milestone['avg_cycle_time']
        cycle_times.append(cycle_time)
        print(f"  {milestone['title']}: {cycle_time:.1f} days")
    
    # Story points analysis
    print(f"\n📈 Story Points Analysis:")
    total_sp_committed = sum(m['total_story_points'] for m in milestones)
    total_sp_completed = sum(m['closed_story_points'] for m in milestones)
    
    print(f"  Total Story Points Committed: {total_sp_committed}")
    print(f"  Total Story Points Completed: {total_sp_completed}")
    print(f"  Overall Completion Rate: {(total_sp_completed/total_sp_committed)*100 if total_sp_committed > 0 else 0:.1f}%")
    
    # Sprint-by-sprint breakdown
    print(f"\n🎯 Sprint Story Points Breakdown:")
    for milestone in milestones:
        sp_committed = milestone['total_story_points']
        sp_completed = milestone['closed_story_points'] 
        sp_remaining = milestone['open_story_points']
        
        if sp_committed > 0:
            completion_pct = (sp_completed / sp_committed) * 100
            print(f"  {milestone['title']}:")
            print(f"    Committed: {sp_committed} SP | Completed: {sp_completed} SP | Remaining: {sp_remaining} SP")
            print(f"    Completion: {completion_pct:.1f}%")
        else:
            print(f"  {milestone['title']}: No story points assigned")
    
    # Key insights
    print(f"\n💡 KEY INSIGHTS:")
    
    # Best performing sprint
    best_sprint = max(milestones, key=lambda x: (x['closed_issues']/x['total_issues']) if x['total_issues'] > 0 else 0)
    best_rate = (best_sprint['closed_issues']/best_sprint['total_issues'])*100 if best_sprint['total_issues'] > 0 else 0
    print(f"  📌 Best Sprint: {best_sprint['title']} ({best_rate:.1f}% completion rate)")
    
    # Fastest completion
    all_completed_issues = []
    for m in milestones:
        for issue in m['issues_detail']['closed']:
            if issue['cycle_time'] is not None:
                all_completed_issues.append((issue, m['title']))
    
    if all_completed_issues:
        fastest_issue = min(all_completed_issues, key=lambda x: x[0]['cycle_time'])
        print(f"  🚀 Fastest Completion: #{fastest_issue[0]['number']} in {fastest_issue[0]['cycle_time']} days ({fastest_issue[1]})")
    
    # Longest cycle
    if all_completed_issues:
        longest_issue = max(all_completed_issues, key=lambda x: x[0]['cycle_time'])
        print(f"  ⏳ Longest Cycle: #{longest_issue[0]['number']} took {longest_issue[0]['cycle_time']} days ({longest_issue[1]})")
    
    # Story points concentration
    sp_by_milestone = [(m['title'], m['total_story_points']) for m in milestones]
    sp_by_milestone.sort(key=lambda x: x[1], reverse=True)
    if sp_by_milestone[0][1] > 0:
        print(f"  📊 Story Points Concentration: {sp_by_milestone[0][1]} SP in {sp_by_milestone[0][0]}")
    
    print(f"\n🎯 RECOMMENDATIONS:")
    print(f"  1. Complete Sprint 1 backlog (31 SP remaining)")
    print(f"  2. Assign story points to all future sprints")
    print(f"  3. Target <30 day average cycle time")
    print(f"  4. Maintain Sprint 2's 67% completion rate consistency")
    
    # Generate trend indicators
    if len(completion_rates) >= 2:
        if completion_rates[-1] > completion_rates[0]:
            trend_indicator = "📈 Improving"
        elif completion_rates[-1] < completion_rates[0]:
            trend_indicator = "📉 Declining"  
        else:
            trend_indicator = "➡️ Stable"
        
        print(f"\n🔮 OVERALL TREND: {trend_indicator}")
        print(f"   Completion rate moved from {completion_rates[0]:.1f}% to {completion_rates[-1]:.1f}%")


if __name__ == "__main__":
    generate_velocity_summary()