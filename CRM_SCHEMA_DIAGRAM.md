# CRM Schema Diagram

## Collection Relationships

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DIRECTUS CRM SCHEMA                          │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│   ORGANIZATIONS 🏢   │
│──────────────────────│
│ • id (UUID) PK       │
│ • name ✓             │
│ • website            │
│ • industry           │
│ • size               │
│ • phone              │
│ • address            │
│ • status             │
│ • notes              │
│ • [System Fields]    │
└──────────────────────┘
          │
          │ O2M (contacts)
          ▼
┌──────────────────────┐         ┌──────────────────────┐
│     CONTACTS 👤      │◄────────┤  DIRECTUS_USERS 👥  │
│──────────────────────│  M2O    │──────────────────────│
│ • id (UUID) PK       │assigned │ • id (UUID) PK       │
│ • first_name ✓       │   to    │ • first_name         │
│ • last_name ✓        │         │ • last_name          │
│ • email ✓ (unique)   │         │ • email              │
│ • phone              │         │ • avatar             │
│ • mobile             │         │ • ...                │
│ • title              │         └──────────────────────┘
│ • organization (FK)  │                  ▲
│ • lead_score (0-100) │                  │
│ • lead_source        │                  │ M2O
│ • status             │                  │ (assigned_to,
│ • tags               │                  │  completed_by,
│ • linkedin_url       │                  │  user_created)
│ • assigned_to (FK)   │                  │
│ • last_contact_date  │         ┌────────┴────────┐
│ • next_follow_up     │         │                 │
│ • notes              │         │                 │
│ • [System Fields]    │         │                 │
└──────────────────────┘         │                 │
          │                      │                 │
          │ O2M                  │                 │
          ├──────────────────────┼─────────────────┤
          │                      │                 │
          ▼                      │                 ▼
┌──────────────────────┐         │       ┌──────────────────────┐
│   ACTIVITIES 📊      │         │       │      TASKS ✅        │
│──────────────────────│         │       │──────────────────────│
│ • id (UUID) PK       │         │       │ • id (UUID) PK       │
│ • contact (FK) ✓     │         │       │ • contact (FK) ✓     │
│ • activity_type ✓    │         │       │ • task_type ✓        │
│ • subject            │         │       │ • title ✓            │
│ • content            │         │       │ • description        │
│ • url                │         │       │ • due_date ✓         │
│ • metadata (JSON)    │         │       │ • priority           │
│ • activity_date ✓    │         │       │ • status             │
│ • duration           │         │       │ • assigned_to (FK) ✓ │
│ • outcome            │         │       │ • completed_date     │
│ • user_created (FK)  │─────────┘       │ • completed_by (FK)  │
│ • date_created       │                 │ • completion_notes   │
└──────────────────────┘                 │ • reminder_date      │
                                         │ • [System Fields]    │
                                         └──────────────────────┘

CASCADE DELETE ⚡
- Deleting a Contact deletes all its Activities and Tasks
- Deleting a User is RESTRICTED if they have assigned Tasks

SET NULL 🔄
- Deleting an Organization sets Contact.organization to NULL
- Deleting a User sets assigned_to to NULL (for Contacts)
```

## Data Flow Example

```
1️⃣  CREATE ORGANIZATION
    ↓
2️⃣  CREATE CONTACT (link to organization, assign to user)
    ↓
3️⃣  LOG ACTIVITY (email sent)
    ├─→ activity_type: "email_sent"
    ├─→ subject: "Product Introduction"
    ├─→ content: "<p>Email body...</p>"
    └─→ metadata: {campaign_id: "spring-2025"}
    ↓
4️⃣  CREATE TASK (schedule follow-up)
    ├─→ task_type: "call"
    ├─→ due_date: "2025-11-15"
    ├─→ assigned_to: user_id
    └─→ status: "pending"
    ↓
5️⃣  LOG ACTIVITY (email opened) → Increment lead_score by +5
    ↓
6️⃣  LOG ACTIVITY (link clicked) → Increment lead_score by +10
    ↓
7️⃣  COMPLETE TASK
    ├─→ status: "completed"
    ├─→ completed_date: now()
    ├─→ completed_by: user_id
    └─→ completion_notes: "<p>Great call!</p>"
    ↓
8️⃣  LOG ACTIVITY (call completed)
    ├─→ activity_type: "call_completed"
    ├─→ duration: 30
    └─→ outcome: "Moving to proposal stage"
    ↓
9️⃣  UPDATE CONTACT
    ├─→ status: "opportunity"
    ├─→ lead_score: 85
    └─→ next_follow_up: "2025-11-20"
    ↓
🔟 CREATE TASK (send proposal)
    └─→ task_type: "proposal"
```

## Activity Types Flow

```
OUTBOUND ACTIVITIES          ENGAGEMENT ACTIVITIES        CONVERSION ACTIVITIES
─────────────────────       ────────────────────────     ─────────────────────
📧 email_sent               📬 email_opened (+5 pts)     📞 call_completed (+15 pts)
💬 text_sent                🖱️ email_clicked (+8 pts)    🤝 meeting_completed (+25 pts)
📄 document_sent            🔗 link_opened (+10 pts)     📑 contract_signed (+50 pts)
                            👁️ document_viewed (+12 pts)

                                    ↓
                            LEAD SCORE INCREASES
                                    ↓
                            STATUS PROGRESSION:
                            Lead → Qualified → Opportunity → Customer
```

## Task Workflow

```
┌─────────────┐
│ Task Created│
│ status:     │
│ "pending"   │
└──────┬──────┘
       │
       ▼
┌─────────────┐     Optional     ┌─────────────┐
│ User picks  ├─────────────────→│  Cancelled  │
│   up task   │                  │   status:   │
│ status:     │                  │ "cancelled" │
│"in_progress"│                  └─────────────┘
└──────┬──────┘
       │
       ▼
┌─────────────┐     Auto         ┌─────────────┐
│ Due date    ├─────────────────→│  Overdue    │
│   passes    │   (via Flow)     │   status:   │
│   without   │                  │ "overdue"   │
│ completion  │                  └─────────────┘
└─────────────┘
       │
       ▼
┌─────────────┐
│ Task done   │
│ status:     │
│ "completed" │
│ + notes     │
│ + timestamp │
│ + completed │
│   by user   │
└─────────────┘
```

## Lead Status Pipeline

```
┌────────┐  Qualify   ┌───────────┐  Engage   ┌─────────────┐  Close   ┌──────────┐
│  LEAD  ├───────────→│ QUALIFIED ├──────────→│ OPPORTUNITY ├─────────→│ CUSTOMER │
│  (New) │            │ (Vetted)  │           │ (Active)    │          │ (Won)    │
└────┬───┘            └───────────┘           └──────┬──────┘          └──────────┘
     │                                               │
     │ Disqualify                                    │ Lost
     ▼                                               ▼
┌────────┐                                      ┌────────┐
│  LOST  │                                      │  LOST  │
│ (DNQ)  │                                      │ (Lost) │
└────────┘                                      └────────┘

Lead Score Ranges:
• 0-30:   Cold lead
• 31-50:  Warm lead
• 51-70:  Hot lead
• 71-85:  Very hot
• 86-100: Extremely hot (high priority)
```

## Field Types Reference

```
STRING (255 chars)     TEXT (unlimited)       UUID (36 chars)
├─ name                ├─ description         ├─ id (PK)
├─ email               ├─ notes (rich HTML)   ├─ organization (FK)
├─ phone               └─ content             ├─ contact (FK)
└─ title                                      └─ assigned_to (FK)

INTEGER                DATE/TIMESTAMP         JSON
├─ lead_score          ├─ due_date           ├─ metadata
├─ duration            ├─ activity_date      │   ├─ campaign_id
└─ sort                ├─ completed_date     │   ├─ email_id
                       └─ reminder_date       │   └─ custom fields

CSV (tags)             BOOLEAN               ALIAS (virtual)
└─ tags                └─ (not used)         ├─ contacts (O2M)
                                             ├─ activities (O2M)
                                             └─ tasks (O2M)
```

## Metadata JSON Examples

```json
// Email Activity
{
  "campaign_id": "spring-campaign-2025",
  "email_id": "email-12345",
  "template": "product-update",
  "sent_via": "sendgrid"
}

// Link Click Activity
{
  "utm_source": "email",
  "utm_medium": "email",
  "utm_campaign": "product-update",
  "page_time": 245,
  "clicked_link": "View Pricing"
}

// Call Activity
{
  "call_id": "call-xyz789",
  "recording_url": "https://recordings.example.com/xyz789",
  "participants": ["John Smith", "Sales Rep"],
  "call_quality": "excellent"
}

// Text Message
{
  "sms_id": "sms-abc123",
  "carrier": "verizon",
  "sent_via": "twilio",
  "delivery_status": "delivered"
}
```

## Permission Strategy

```
┌─────────────────────┐
│   ADMIN ROLE 👑     │
│─────────────────────│
│ Full access to all  │
│ collections and     │
│ system settings     │
└─────────────────────┘
          │
          ├─────────────────────────────────┐
          ▼                                 ▼
┌─────────────────────┐         ┌─────────────────────┐
│  SALES MANAGER 📊   │         │   SALES REP 💼      │
│─────────────────────│         │─────────────────────│
│ • View all contacts │         │ • View assigned     │
│ • Create/edit all   │         │   contacts only     │
│ • Assign contacts   │         │ • Create/edit own   │
│ • View all tasks    │         │   activities/tasks  │
│ • Reports access    │         │ • Complete own      │
│ • Analytics access  │         │   tasks             │
└─────────────────────┘         │ • No delete         │
                                └─────────────────────┘
```

## Automation Flow Ideas

```
FLOW 1: Auto Lead Scoring
─────────────────────────
Trigger: Activity Created
↓
Condition: Check activity_type
├─ email_opened → +5 points
├─ link_opened → +10 points
├─ call_completed → +15 points
└─ meeting_completed → +25 points
↓
Action: Update Contact.lead_score

FLOW 2: Overdue Task Manager
─────────────────────────────
Trigger: Schedule (Daily 1am)
↓
Query: Tasks where due_date < NOW
       AND status = 'pending'
↓
Action: Update status to 'overdue'
       Send notification to assigned user

FLOW 3: Hot Lead Alert
──────────────────────
Trigger: Contact Updated
↓
Condition: lead_score >= 80
           AND status = 'qualified'
↓
Action: Send notification to sales manager
       Create high-priority follow-up task

FLOW 4: Activity → Last Contact
────────────────────────────────
Trigger: Activity Created
↓
Action: Update Contact.last_contact_date
        to Activity.activity_date
```

## Query Patterns

```sql
-- Hot Leads (SQL equivalent)
SELECT c.*, o.name as org_name
FROM contacts c
LEFT JOIN organizations o ON c.organization = o.id
WHERE c.lead_score >= 70
  AND c.status IN ('qualified', 'opportunity')
ORDER BY c.lead_score DESC;

-- Tasks Due This Week
SELECT t.*, c.first_name, c.last_name
FROM tasks t
JOIN contacts c ON t.contact = c.id
WHERE t.due_date BETWEEN NOW() AND NOW() + INTERVAL '7 days'
  AND t.status NOT IN ('completed', 'cancelled')
ORDER BY t.due_date, t.priority DESC;

-- Activity Timeline
SELECT a.*, c.first_name, c.last_name
FROM activities a
JOIN contacts c ON a.contact = c.id
WHERE c.id = :contact_id
ORDER BY a.activity_date DESC
LIMIT 50;

-- Top Performers (Most Completed Tasks)
SELECT
  u.first_name,
  u.last_name,
  COUNT(t.id) as tasks_completed
FROM tasks t
JOIN directus_users u ON t.completed_by = u.id
WHERE t.status = 'completed'
  AND t.completed_date >= NOW() - INTERVAL '30 days'
GROUP BY u.id
ORDER BY tasks_completed DESC
LIMIT 10;
```

---

## 🎯 Quick Reference

**Main Collections**: Organizations, Contacts, Activities, Tasks
**Key Relationships**: Organization → Contacts → Activities/Tasks
**Delete Behavior**: CASCADE for Activities/Tasks, SET NULL for Organization
**Required Fields**: Check ✓ marks in schema
**Lead Flow**: Lead → Qualified → Opportunity → Customer
**Task Flow**: Pending → In Progress → Completed
**Activity Types**: 11 types covering emails, texts, calls, meetings
**Task Types**: 9 types covering all sales activities

---

Built with ❤️ using Directus MCP
