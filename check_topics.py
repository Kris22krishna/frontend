import requests
import json

BASE_URL = 'http://localhost:8000'

for g in [3, 4, 5, 6, 7, 8]:
    try:
        r = requests.get(f'{BASE_URL}/api/v1/skills/?grade={g}')
        data = r.json()
        skills = data.get('data', data) if isinstance(data, dict) else data
        topics = set(s.get('topic', 'General') for s in skills)
        print(f"Grade {g} Topics: {sorted(list(topics))}")
    except Exception as e:
        print(f"Error for Grade {g}: {e}")
