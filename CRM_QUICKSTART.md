# 🚀 CRM Quick Start Guide

## ✅ What You Have

Your Directus CRM is **fully built and ready to use** with:

- ✅ **4 Collections** created (Organizations, Contacts, Activities, Tasks)
- ✅ **All fields** configured with proper types and interfaces
- ✅ **Relationships** established between collections
- ✅ **Sample data** loaded (2 contacts, 5 activities, 4 tasks)
- ✅ **System fields** (user tracking, timestamps) working

## 🎯 Access Your CRM

Open these URLs in your browser:

1. **View Organizations**: http://localhost:8055/admin/content/organizations
2. **View Contacts**: http://localhost:8055/admin/content/contacts
3. **View Activities**: http://localhost:8055/admin/content/activities
4. **View Tasks**: http://localhost:8055/admin/content/tasks

## 🏃‍♂️ Try These First

### 1. Explore the Sample Contact

1. Go to **Contacts** collection
2. Click on **John Smith**
3. Scroll down to see:
   - His organization (Acme Corporation)
   - Activity history (4 activities)
   - Pending tasks (3 tasks)
4. Click through to explore activities and tasks

### 2. Create Your First Contact

1. Go to **Contacts** collection
2. Click **"+"** to create new
3. Fill in:
   - First Name: `Jane`
   - Last Name: `Doe`
   - Email: `jane.doe@company.com`
   - Status: `lead`
   - Lead Score: `50`
   - Lead Source: `website`
4. Click **Save**

### 3. Log Your First Activity

1. Go to **Activities** collection
2. Click **"+"** to create new
3. Fill in:
   - Contact: Select **Jane Doe**
   - Activity Type: `email_sent`
   - Subject: `Welcome Email`
   - Content: Write your email message
   - Activity Date: (auto-filled with now)
4. Click **Save**

### 4. Create Your First Task

1. Go to **Tasks** collection
2. Click **"+"** to create new
3. Fill in:
   - Contact: Select **Jane Doe**
   - Task Type: `call`
   - Title: `Follow-up call with Jane`
   - Due Date: Tomorrow's date
   - Priority: `high`
   - Status: `pending`
   - Assigned To: Select yourself
4. Click **Save**

### 5. Complete a Task

1. Go to **Tasks** collection
2. Find the "Discovery call with Sarah" task
3. Click to open it
4. Change:
   - Status: `completed`
   - Completed Date: (select now)
   - Completed By: Select yourself
   - Completion Notes: `Call went great!`
5. Click **Save**

## 📊 View Your Data

### See Contact's Full History

1. Open any contact (e.g., John Smith)
2. You'll see sections for:
   - **Basic Info**: Name, email, title
   - **Organization**: Linked company
   - **Lead Info**: Score, source, status
   - **Activities**: All interactions (scroll down)
   - **Tasks**: All pending and completed tasks

### Filter Contacts

1. Go to **Contacts** collection
2. Use the filter button (funnel icon)
3. Try filtering by:
   - Status = `opportunity`
   - Lead Score >= 70
   - Assigned To = yourself

### Sort Tasks by Due Date

1. Go to **Tasks** collection
2. Click the column header "Due Date"
3. Sort ascending to see soonest tasks first

## 🎨 Customize Your Views

### Create a "My Contacts" Preset

1. Go to **Contacts** collection
2. Apply filter: `Assigned To = $CURRENT_USER`
3. Click bookmark icon
4. Save as "My Contacts"
5. Now you can quickly access your contacts!

### Create a "Today's Tasks" Preset

1. Go to **Tasks** collection
2. Apply filters:
   - Due Date = Today
   - Status ≠ completed
3. Save as preset "Today's Tasks"

## 💡 Common Workflows

### Workflow 1: New Lead from Website

```
1. Create Contact
   └─ Set: status=lead, lead_source=website, lead_score=40

2. Log Activity (form submitted)
   └─ Type: note_added, Content: "Downloaded whitepaper"

3. Create Task (follow-up)
   └─ Type: email, Due: Tomorrow, Priority: medium
```

### Workflow 2: Qualified Lead → Opportunity

```
1. Log Activities (engagement)
   ├─ Email opened (+5 to lead_score)
   ├─ Link clicked (+10 to lead_score)
   └─ Call completed (+15 to lead_score)

2. Update Contact
   ├─ Status: qualified → opportunity
   └─ Lead Score: now 70+

3. Create Tasks (sales process)
   ├─ Demo (high priority)
   ├─ Proposal (high priority)
   └─ Contract (medium priority)
```

### Workflow 3: Daily Task Management

```
Morning:
1. Open "Tasks Due Today" preset
2. Review all pending tasks
3. Mark tasks as "in_progress" as you work them

Throughout Day:
4. Log activities as they happen
5. Update lead scores based on engagement

End of Day:
6. Complete finished tasks
7. Add completion notes
8. Create tomorrow's follow-up tasks
```

## 🔥 Power User Tips

### Tip 1: Use Tags for Segmentation

Add tags to contacts for easy filtering:

- `decision-maker`, `technical`, `budget-holder`
- `enterprise`, `smb`, `startup`
- `hot`, `warm`, `cold`

### Tip 2: Rich Notes with HTML

Use the rich text editor in notes/content fields:

- **Bold** for key points
- Bullet lists for action items
- Links to documents

### Tip 3: Metadata for Tracking

Use the metadata field in activities to store:

- Campaign IDs
- UTM parameters
- Email IDs
- Call recording URLs

### Tip 4: Lead Score Strategy

Develop a consistent scoring system:

- Email opened: +5
- Link clicked: +10
- Call completed: +15
- Meeting completed: +25
- Document viewed: +12

### Tip 5: Task Priorities

Use priorities strategically:

- **Urgent**: Hot leads, overdue follow-ups
- **High**: Key demos, proposals, contracts
- **Medium**: Regular follow-ups, research
- **Low**: Nice-to-have activities

## 📱 Mobile Access

Your Directus CRM works on mobile! Access it from your phone:

1. Navigate to: `http://localhost:8055` (or your server URL)
2. Login with your credentials
3. Browse collections, add activities, complete tasks

## 🤝 Team Setup

### Add Team Members

1. Go to **Settings** → **Users**
2. Create new users for your team
3. Assign appropriate roles

### Assign Contacts

1. Open a contact
2. Set **Assigned To** field
3. That rep now owns the relationship

### Share Presets

Create useful presets and share them:

- My Active Contacts
- Hot Leads
- Tasks This Week
- Recent Activity

## 📈 Reports to Build

Once you have data, create these reports:

### 1. Pipeline Report

- Count contacts by status
- Shows: Lead → Qualified → Opportunity → Customer

### 2. Activity Report

- Count activities by type
- Filter: Last 30 days

### 3. Task Completion Rate

- Completed tasks / Total tasks
- Per user or team-wide

### 4. Lead Score Distribution

- How many contacts in each score range
- Helps prioritize outreach

### 5. Conversion Funnel

- Leads → Qualified → Opportunities → Customers
- Conversion rate at each stage

## 🚨 Common Questions

**Q: How do I delete a contact?**
A: Open the contact, click the delete icon (trash). Note: This will cascade-delete all activities and tasks.

**Q: Can I bulk import contacts?**
A: Yes! Use the Directus API or create a CSV import flow. See `CRM_API_EXAMPLES.md` for code.

**Q: How do I set up email tracking?**
A: Integrate your email service (SendGrid, Mailgun) to POST to Directus API when emails are opened/clicked.

**Q: Can I customize the activity types?**
A: Yes! Go to **Settings** → **Data Model** → **activities** → **activity_type** field → Edit choices.

**Q: How do I backup my data?**
A: Use Directus backup features or export via API. See documentation for details.

**Q: Can I add custom fields?**
A: Absolutely! Go to **Settings** → **Data Model** → Select collection → Add field.

## 📚 Next Steps

1. **Read Full Documentation**

   - `CRM_USAGE_GUIDE.md` - Complete workflows
   - `CRM_API_EXAMPLES.md` - Integration code
   - `CRM_SCHEMA_DIAGRAM.md` - Visual reference

2. **Set Up Automation**

   - Create Flows for lead scoring
   - Auto-mark overdue tasks
   - Send task reminders

3. **Configure Permissions**

   - Set up sales rep role
   - Set up manager role
   - Test access controls

4. **Build Dashboard**

   - Add Insights panels
   - Create metric widgets
   - Build activity timeline

5. **Import Your Data**
   - Export from old system
   - Format as JSON/CSV
   - Import via API

## 🎉 You're Ready!

Your CRM is **fully functional** and ready for daily use. Start by:

1. ✅ Creating a few more contacts
2. ✅ Logging activities as you interact
3. ✅ Managing tasks throughout your day
4. ✅ Tracking your pipeline progress

**Need help?** Check the other documentation files or explore the Directus community forums.

---

**Happy selling!** 🚀

Built on: November 10, 2025
CRM Version: 1.0
