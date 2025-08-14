#!/usr/bin/env python3
"""
Test file for utils.py functions.
Simple tests to validate the functionality added for issue #22.
"""

import sys
import os

# Add the current directory to the path to import utils
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from utils import greet, calculate_sum

def test_greet():
    """Test the greet function."""
    # Test default greeting
    assert greet() == "Hello, World!"
    
    # Test custom name
    assert greet("Alice") == "Hello, Alice!"
    
    # Test with empty string
    assert greet("") == "Hello, !"
    
    print("✓ greet() tests passed")

def test_calculate_sum():
    """Test the calculate_sum function."""
    # Test empty list
    assert calculate_sum([]) == 0
    
    # Test single number
    assert calculate_sum([5]) == 5
    
    # Test multiple numbers
    assert calculate_sum([1, 2, 3, 4, 5]) == 15
    
    # Test negative numbers
    assert calculate_sum([-1, -2, -3]) == -6
    
    # Test mixed numbers
    assert calculate_sum([-5, 10, -3]) == 2
    
    print("✓ calculate_sum() tests passed")

def main():
    """Run all tests."""
    print("Running tests for utils.py...")
    
    try:
        test_greet()
        test_calculate_sum()
        print("\n🎉 All tests passed successfully!")
        return 0
    except AssertionError as e:
        print(f"\n❌ Test failed: {e}")
        return 1
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        return 1

if __name__ == "__main__":
    exit(main())