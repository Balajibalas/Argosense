import requests
import random
import time
from datetime import datetime



# Supabase details
project_url = "https://ntsvufrozfjxkuxcfcxz.supabase.co"
api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50c3Z1ZnJvemZqeGt1eGNmY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NTA0MzUsImV4cCI6MjA1NDMyNjQzNX0.kfr1etTCuWR15_asHkniTDD2swBwoxhHRx-OqcKS3Mo"
table_name= "Weather"  # Replace with your table name

# Prepare the API endpoint
url = f"{project_url}/{table_name}"

# Prepare headers
headers = {
    "apikey": api_key,
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"  # Use "return=representation" if you want to get the inserted data back
}
for _ in range(50):
    temp = random.randint(20, 60)
    humid = random.randint(1, 100)
    now = datetime.now()
    sm= random.randint(20, 50)
    ph=random.randint(1, 14)
    i= now.strftime("%Y-%m-%d %H:%M:%S")
    rai=random.randint(0, 1)
    mot=random.randint(0, 1)   
    # Data to insert
    data = {
        "temperature": temp,
        "id":i,
        "humidity": humid,
        "SoilMoisture": sm,
        "PH":ph,
        "rain":rai,
        "motor":mot
    }

    # Send POST request to insert data
    response = requests.post(url, json=data, headers=headers)


    if response.status_code == 201:
        print("Data inserted successfully!")
    else:
        print(f"Failed to insert data. Status code: {response.status_code}")
        print("Response:", response.json())
    time.sleep(5)
