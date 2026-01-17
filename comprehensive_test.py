import requests
import json

# Configuration
USER_SERVICE_URL = "http://localhost:3001"
COST_SERVICE_URL = "http://localhost:3002"
LOG_SERVICE_URL = "http://localhost:3003"
ADMIN_SERVICE_URL = "http://localhost:3004"

# Test data
new_user = {
    "id": 456789,
    "first_name": "Test",
    "last_name": "User",
    "birthday": "1990-01-15"
}
new_cost = {
    "userid": 123123,
    "description": "Coffee for testing",
    "category": "food",
    "sum": 5.75,
    "year": 2026,
    "month": 1,
    "day": 17 
}

def print_header(title):
    print("\n" + "="*50)
    print(f"============== {title}То=============")
    print("="*50 + "\n")

def print_test_step(description, url, method, status_code, response_body):
    print(f"--- {description} ---")
    print(f"URL: {method} {url}")
    print(f"Status Code: {status_code}")
    print("Response Body:")
    try:
        # Pretty print json
        print(json.dumps(response_body, indent=4))
    except (json.JSONDecodeError, TypeError):
        print(response_body)
    print("")

def run_tests():
    """Runs a comprehensive suite of tests against the web services."""

    # ==================================================
    # ============== SERVICE SANITY CHECK ==============
    # ==================================================
    print_header("SERVICE SANITY CHECK")
    
    # --- Get Developer Info ---
    try:
        url = f"{ADMIN_SERVICE_URL}/api/about/"
        response = requests.get(url)
        print_test_step("Get Developer Info", url, "GET", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Admin Service: {e}")


    # ==================================================
    # === TESTING USER MANAGEMENT (USER ID: 456789) ====
    # ==================================================
    print_header("TESTING USER MANAGEMENT (USER ID: 456789)")
    
    # --- Add a new user ---
    try:
        url = f"{USER_SERVICE_URL}/api/add"
        response = requests.post(url, json=new_user)
        print_test_step("Add a new user", url, "POST", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to User Service: {e}")

    # --- Verify new user exists ---
    try:
        user_id = new_user["id"]
        url = f"{USER_SERVICE_URL}/api/users/{user_id}"
        response = requests.get(url)
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to User Service: {e}")

    # --- Verify list all users endpoint ---
    try:
        url = f"{USER_SERVICE_URL}/api/users"
        response = requests.get(url)
        print_test_step("Verify list all users endpoint", url, "GET", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to User Service: {e}")


    # ==================================================
    # == TESTING COST & REPORT FLOW (USER ID: 123123) ==
    # ==================================================
    print_header("TESTING COST & REPORT FLOW (USER ID: 123123)")

    # --- Get initial (empty) report ---
    try:
        url = f"{COST_SERVICE_URL}/api/report/?id=123123&year=2026&month=1"
        response = requests.get(url)
        print_test_step("Get initial report", url, "GET", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Cost Service: {e}")

    # --- Add a new cost item for the user ---
    try:
        url = f"{COST_SERVICE_URL}/api/add"
        response = requests.post(url, json=new_cost)
        print_test_step("Add a new cost item for the user", url, "POST", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Cost Service: {e}")
        
    # --- Get updated report to see the new cost ---
    try:
        url = f"{COST_SERVICE_URL}/api/report/?id=123123&year=2026&month=1"
        response = requests.get(url)
        print_test_step("Get updated report to see the new cost", url, "GET", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Cost Service: {e}")
        

    # ==================================================
    # =========== TESTING CROSS-SERVICE DATA ===========
    # ==================================================
    print_header("TESTING CROSS-SERVICE DATA")

    # --- Check user details and see total cost update ---
    try:
        url = f"{USER_SERVICE_URL}/api/users/123123"
        response = requests.get(url)
        print_test_step("Check user details and see total cost update", url, "GET", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to User Service: {e}")


    # ==================================================
    # ============== TESTING LOGS SERVICE ==============
    # ==================================================
    print_header("TESTING LOGS SERVICE")
    
    # --- Fetch API request logs ---
    try:
        url = f"{LOG_SERVICE_URL}/api/logs"
        response = requests.get(url)
        print_test_step("Fetch API request logs", url, "GET", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Log Service: {e}")


    # ==================================================
    # === TESTING REPORT CACHING (COMPUTED PATTERN) ====
    # ==================================================
    print_header("TESTING REPORT CACHING (COMPUTED PATTERN)")
    
    past_cost = {
        "userid": 123123,
        "description": "Book for past month test",
        "category": "education",
        "sum": 150,
        "year": 2025,
        "month": 12,
        "day": 25
    }

    # --- Add a cost item for a past month ---
    try:
        url = f"{COST_SERVICE_URL}/api/add"
        response = requests.post(url, json=past_cost)
        print_test_step("Add cost item for past month", url, "POST", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Cost Service: {e}")

    # --- Fetch report for the past month to trigger caching ---
    try:
        url = f"{COST_SERVICE_URL}/api/report/?id=123123&year=2025&month=12"
        response = requests.get(url)
        print_test_step("Fetch report for past month", url, "GET", response.status_code, response.json())
        print("\n--> VERIFICATION: Check your 'reports' collection in MongoDB Atlas.")
        print("--> You should now see a new document for user 123123 for year 2025, month 12.\n")
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Cost Service: {e}")


    print_header("COMPREHENSIVE TEST COMPLETE")

if __name__ == "__main__":
    run_tests()