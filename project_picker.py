import random
import time

projects = [
    "Arc - TASK MANAGER WEB APP",
    "SOCIAL MEDIA MOBILE APP",
    "OFFLINE FIRST ANALYTICS WORKSPACE WEB APP",
    "TIC TAC TOE MOBILE APP (WITH A TWIST)",
    "MULTIPLAYER 3D GAME WEB APP",
    "REALTIME AI DASHBOARD ARENA WEB APP",
    "ECOMMERCE WEB APP",
    "AN EXTENSION THAT CONNECTS TO VSCODE/GITHUB/SLACK/LINEAR/DISCORD",
    "QUICK HOMES",
    "TIME ZONE CHROME EXTENSION",
    "RESOURCE BANK",
    "AI POWERED COMMUNICATION COACH",
    "GITHUB CHART GRAPH",
    "TIKTOK CLONE MOBILE APP",
    "OPEN DATING APP",
    "ACCOUNTABILITY SYSTEM (AI AND COMMUNITY BASED)",
    "2048 GAME MOBILE APP",
    "YT Music Wrapped",
    "UI COMPONENT LIBRARY CHALLENGE",
]

print("Spinning the project wheel...")
time.sleep(1)
print("And the selected project is...")
time.sleep(1)
selected_project = random.choice(projects)
print(f"🚀 YOUR MISSION: {selected_project}")