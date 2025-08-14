#!/usr/bin/env python3
"""
Simple utility functions for the Personal-Repo test repository.
This addresses issue #22 - Test 2
"""

def greet(name="World"):
    """
    Return a greeting message.
    
    Args:
        name (str): Name to greet. Defaults to "World".
        
    Returns:
        str: Greeting message
    """
    return f"Hello, {name}!"

def calculate_sum(numbers):
    """
    Calculate the sum of a list of numbers.
    
    Args:
        numbers (list): List of numbers to sum
        
    Returns:
        int/float: Sum of the numbers
    """
    if not numbers:
        return 0
    return sum(numbers)

def main():
    """Main function to demonstrate the utilities."""
    print(greet())
    print(greet("Test User"))
    
    test_numbers = [1, 2, 3, 4, 5]
    result = calculate_sum(test_numbers)
    print(f"Sum of {test_numbers} = {result}")

if __name__ == "__main__":
    main()