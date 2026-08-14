# Dev Testing — Team Page

Branch: feature/team-page Tester: Sahil Date: 11 Aug 2026

# Scope
Testing against BA Task 1 requirements for the Login Team Page, covering styling, functionality, and the specified edge cases.

# Requirements Tested
Team Page
    REQ1 — Dark theme with light accent colour
    REQ2 — Team name displayed at top of page
    REQ3 — Each team member has a card with photo, name, role, and description

#	Test Case	Result
1	Invalid login credentials rejected ✅ Pass
2	Direct access to /team without auth redirects to login ✅ Pass
3	Valid login tested end-to-end on deployed URL ✅ Pass
4	Redirect to team page confirmed after login	✅ Pass
5	Missing-photo edge case (CASE1) — placeholder image shown ✅ Pass
6	Long-description edge case (CASE2) — text over 200 characters ⚠️ Fail
7	All required team card content (photo, name, role, description) verified correct ✅ Pass
8	Deployment completed via boilerplate pipeline ✅ Pass
9	Live URL loads without errors ✅ Pass
10	Login → redirect → team page flow spot-checked on deployed URL ✅ Pass

# Bugs Found
BUG-01: Long description overflows card instead of truncating
Requirement: CASE2 — description over 200 characters should cut off with … and be clickable to expand.
Actual behaviour: Description text runs past the card boundary and overflows across the screen instead of truncating.
Repro steps:
Go to Team page (/team).
View a team member card with a description longer than 200 characters 
Observed text overflowing horizontally past the card edge instead of being clamped.
Expected: Text truncates at 200 characters, appends …, and is expandable per CASE2.
Status: Open

# Summary
9 of 10 test cases passed. One bug identified relating to long descriptions (CASE2)
All other login, redirect, deployment, and team-card display requirements verified are functional on the deployed URL.