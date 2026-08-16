**Business Analyst Task 1** 

**Login Page**

REQ1 \- The page Should follow a dark theme with a light accent colour  
REQ2 \- Login functionality Must not be changed only style should be modified  
REQ3 \- The teams name and Must be added to the screen so the project is easily identifiable

**Teams Page**

REQ1 \- The page Should follow a dark theme with a light accent colour  
REQ2 \- The teams page Must display the teams name at the top of the page  
REQ3 \- Each team member Must be given a card displaying a photo of the member, their name, their role, and a description about themselves

| Field | Mandatory | Rules | Display |
| :---- | :---- | :---- | :---- |
| Photo | No | Sizing/dimensions TBC | Placeholder image if absent |
| Name | Yes | Full name must be visible | Plain text |
| Role | Yes | Role must be presented  | Plain text |
| Description | Yes | 200 characters, expandable if longer | Plaint text, if over 200 characters, cut of with a … and a read more button under |

**Edge Cases**

CASE1 \- Given a team member has no photo on file, the card will load with a placeholder image as substitution  
CASE2 \- Given a team members description is too long, it should cut off after 200 characters with a … and be clickable to expand

