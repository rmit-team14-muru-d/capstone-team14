# Meeting Minutes — Project Kickoff

**Project:** Telstra — AI Workloads Muru-d Innovation Lab (Group 2)

|                   |                 |
| ----------------- | --------------- |
| **Date**          | 07/08/2026      |
| **Time**          | 13:30–14:00     |
| **Location**      | Microsoft Teams |
| **Meeting Chair** | Alessio Bonti   |
| **Minute Taker**  | Sean Danailoff  |
| **Meeting No.**   | 1               |

## Attendees

| Name            | Role / Title              | Present / Apologies |
| --------------- | ------------------------- | ------------------- |
| Alessio Bonti   | Client Proxy / Supervisor | Present             |
| Sean Danailoff  | Project Manager           | Present             |
| Sahil Khan      | Developer 1               | Present             |
| Aiden Brundell  | Developer 2               | Present             |
| Ziggy Debrincat | UX / BA                   | Present             |

## Meeting Objective

To formally open the Telstra AI Workloads project, confirm team roles, and establish a shared understanding of the problem space, technical approach and administrative requirements ahead of the brief being issued.

## Summary

Opening session for the Telstra AI Workloads Muru-D Innovation Lab project. The team introduced themselves and their specific roles, and Alessio outlined the problem space — the team needs to build a systematic, repeatable AI workflow which takes Telstra's Muru Innovation Lab from a one-sentence idea to a working prototype. Alessio also walked through an example of what the workflow looks like in practice.

The team and Alessio then discussed the engineering considerations for an LLM-based system, including model selection, prompt design, evaluation and token budget, along with governance constraints for the client, the week four submission video, and the pending project brief. The team also clarified expectations for project communication with Alessio.

## Action Items

| #   | Action                                                               | Owner                       | Due Date     | Status |
| --- | -------------------------------------------------------------------- | --------------------------- | ------------ | ------ |
| 1   | Issue the rewritten project brief to the team                        | Alessio Bonti               | 09/08/26     | Open   |
| 2   | Map the full workflow — all boxes from idea to prototype             | All                         | 15/08/26     | Open   |
| 3   | Define evaluation framework for comparing models and prompts per box | Sahil Khan / Aiden Brundell | 21/08/26     | Open   |
| 4   | Set up and maintain Planner (assessed each Sunday)                   | Sean Danailoff              | Weekly (Sun) | Open   |
| 5   | Prepare 2-minute submission video (PM only)                          | Sean Danailoff              | 15/08/26     | Open   |

## Risks / Issues Raised

**Project brief not yet issued** — The brief is still being rewritten based on discussions with Telstra. The team is proceeding without the documented requirements, creating a risk of time wastage if the scope shifts once it is sent.

**No communication with client yet** — Nikhita is unavailable as the client/supervisor until next week; Alessio is acting as proxy. This delays validation of assumptions with the real client.

**Reduced team capacity** — The team lost a developer. Ziggy is now both the UX and BA, which risks those two roles being under-resourced.

**LLM non-determinism** — Identical prompts return different outputs. Without a structured comparison framework, design decisions risk being made on single-run evidence.

**Token cost escalation** — A poorly designed workflow could consume more tokens for worse results. If not budgeted early, the solution provided may be unusable at Telstra's scale.

## Next Meeting

|              |                       |
| ------------ | --------------------- |
| **Date**     | 12/08/26              |
| **Time**     | 12:00–12:30           |
| **Location** | Microsoft Teams       |
| **Focus**    | Assignment 1 Progress |

---

_Minutes prepared by: Sean Danailoff | Reviewed by: Aiden Brundell | Distribution: All attendees_
