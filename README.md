
# User Management Dashboard

[![](https://markdown-videos-api.jorgenkh.no/youtube/7aW9Xurfbl4)](https://youtu.be/7aW9Xurfbl4)


Description:
User Management Dashboard using React.js and Chakra UI.
The dashboard should allow administrators to view, create, edit, and delete user accounts. It
should also include a search feature to find specific users based on their attributes.
Requirements:
1. Display a table that shows a list of users with the following columns:
- User ID
- Name
- Email
- Role (e.g., Administrator, Editor, Viewer)
- Actions (Edit and Delete buttons)
2. Implement a form for creating new user accounts with the following fields:
- Name (text input)
- Email (text input)
- Password (password input)
- Role (dropdown/select input with options for different roles)
3. Enable administrators to edit existing user accounts by clicking the Edit button in the table.
This should open a modal or a separate page with pre-filled form fields for editing the user's
details.
4. Implement validation for the form fields to ensure that:
- Name and Email fields are required and cannot be empty.
- Email field must be a valid email address format.
- Password must have a minimum length of 8 characters.
5. Include a search bar that allows administrators to search for users based on their
attributes (e.g., name, email, role). As the user types in the search bar, the table should
dynamically update to display matching results.
6. Implement functionality for administrators to delete user accounts. Clicking the Delete
button in the table should prompt a confirmation modal before permanently removing the
user.
Design Requirements (Using Chakra UI):
1. Use Chakra UI's Table component to display the user list table.
2. Utilize Chakra UI's Form component for the user creation and editing forms.
3. Apply appropriate styling using Chakra UI's built-in features, such as colors, typography,
and spacing, to create a visually appealing dashboard layout.

## Installation


```bash
  npm i
  cd run dev
```
    
