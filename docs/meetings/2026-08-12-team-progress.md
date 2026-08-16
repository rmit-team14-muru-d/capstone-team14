# Meeting Minutes — Assignment 1 Progress

**Project:** Telstra — AI Workloads Muru-d Innovation Lab (Group 2)

| | |
|---|---|
| **Date** | 12/08/2026 |
| **Time** | 12:00–12:18 |
| **Location** | Microsoft Teams |
| **Meeting Chair** | Sean Danailoff |
| **Minute Taker** | Sean Danailoff |
| **Meeting No.** | 3 |

## Attendees

| Name | Role / Title | Present / Apologies |
|---|---|---|
| Sean Danailoff | Project Manager | Present |
| Senglong Te | Developer 2 | Present |
| Sahil Khan | Developer 1 | Present |
| Ziggy Debrincat | UX / BA | Present |

## Meeting Objective

To review progress on Assignment 1 deliverables, confirm the status of the deployment and team page feature, and agree the process for reviewing and merging pull requests.

## Summary

Team progress check-in on Assignment 1. Senglong reported that deployment is complete and the application is now live, and that the team page has been pushed. He flagged one outstanding defect: the team list reads from the database, but when a new person signs up the write does not complete before the first render, so the new member does not appear until a subsequent refresh. Ziggy suggested handling this asynchronously; Senglong agreed with the approach and confirmed it was not yet implemented.

Sean noted the team is tracking well against Assignment 1, with the repository being the main outstanding item. Ziggy confirmed he will raise a pull request for his documentation that evening, noting little further work is required on it.

The team then discussed ownership of pull request review and merging. Sean asked whether the developers should review each other's work. Sahil and Ziggy both indicated the PM should own it, with Ziggy reasoning that whoever is responsible for approving a task should also review and accept the corresponding pull request. Sean accepted this and confirmed he will review and merge, raising questions with the team where needed.

Sean confirmed his availability for ad-hoc meetings if anyone is blocked, and closed the meeting.

## Action Items

| # | Action | Owner | Due Date | Status |
|---|---|---|---|---|
| 1 | Fix team list not displaying newly registered members on first load | Senglong Te | 13/08/26 | Closed |
| 2 | Raise pull request for requirements documentation | Ziggy Debrincat | 12/08/26 | Open |
| 3 | Review and merge outstanding pull requests | Sean Danailoff | Ongoing | Closed |
| 4 | Confirm developer peer-testing arrangement against assignment requirements | Sean Danailoff | 13/08/26 | Open |
| 5 | Update `docs/FIRESTORE-SCHEMA.md` with the `team_members` collection | Senglong Te | 13/08/26 | Open |

## Risks / Issues Raised

**Pull request review process may not satisfy assignment requirements** — The team agreed the PM will review and merge all pull requests. The assignment states developers never test their own code and that Dev 1 builds while Dev 2 tests. PM sign-off does not remove the requirement for developer peer testing.

**Known defect in deployed feature** — Newly registered members did not appear in the team list until a refresh. The application was already live with this behaviour at the time of the meeting.

**No automated tests accompanying the team page feature** — The feature adds substantial functionality with no corresponding test coverage, leaving verification entirely manual.

**Documentation convention not followed** — The `team_members` collection has a type, typed collection export and security rules, but no entry in `docs/FIRESTORE-SCHEMA.md`, which the boilerplate requires for every collection.

## Next Meeting

| | |
|---|---|
| **Date** | TBC |
| **Location** | Microsoft Teams |
| **Focus** | Assignment 1 finalisation |

---

*Minutes prepared by: Sean Danailoff | Distribution: All attendees*
