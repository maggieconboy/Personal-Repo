#!/usr/bin/env python3
"""
Example usage of the utilities in utils.py
Demonstrates the functionality added for issue #22 - Test 2
"""

from utils import greet, calculate_sum

def example_greetings():
    """Show different ways to use the greet function."""
    print("=== Greeting Examples ===")
    print(greet())  # Default greeting
    print(greet("Developer"))  # Custom greeting
    print(greet("Test 2"))  # Referencing the issue
    print()

def example_calculations():
    """Show different ways to use the calculate_sum function."""
    print("=== Calculation Examples ===")
    
    # Basic sum
    numbers1 = [1, 2, 3, 4, 5]
    print(f"Sum of {numbers1} = {calculate_sum(numbers1)}")
    
    # Empty list
    print(f"Sum of empty list = {calculate_sum([])}")
    
    # Single number
    print(f"Sum of [42] = {calculate_sum([42])}")
    
    # Negative numbers
    numbers2 = [-10, 5, -3, 8]
    print(f"Sum of {numbers2} = {calculate_sum(numbers2)}")
    
    print()

def main():
    """Run all examples."""
    print("Personal-Repo Utils - Example Usage")
    print("===================================")
    print()
    
    example_greetings()
    example_calculations()
    
    print("✨ Examples completed successfully!")

if __name__ == "__main__":
    main()