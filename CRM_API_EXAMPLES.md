# CRM API Examples & Integration Guide

## Authentication

```javascript
import { createDirectus, rest, authentication } from "@directus/sdk";

const directus = createDirectus("http://localhost:8055")
  .with(authentication())
  .with(rest());

await directus.login("email@example.com", "password");
```

## Complete CRUD Examples

### Organizations

#### Create Organization

```javascript
const newOrg = await directus.items("organizations").createOne({
  name: "Tech Innovators Inc",
  website: "https://techinnovators.com",
  industry: "SaaS",
  size: "51-200",
  phone: "+1-415-555-0100",
  address: "456 Innovation Drive, San Francisco, CA 94107",
  status: "active",
  notes: "<p>Fast-growing SaaS company in the HR tech space.</p>",
});
```

#### Read Organization with Contacts

```javascript
const org = await directus.items("organizations").readOne("org-uuid", {
  fields: [
    "*",
    "contacts.id",
    "contacts.first_name",
    "contacts.last_name",
    "contacts.email",
    "contacts.title",
    "contacts.status",
  ],
});
```

#### Update Organization

```javascript
await directus.items("organizations").updateOne("org-uuid", {
  size: "201-500",
  notes: "<p>Updated: They just secured Series B funding!</p>",
});
```

### Contacts

#### Create Contact with Organization

```javascript
const newContact = await directus.items("contacts").createOne({
  first_name: "Michael",
  last_name: "Chen",
  email: "michael.chen@techinnovators.com",
  phone: "+1-415-555-0101",
  mobile: "+1-415-555-0102",
  title: "Head of HR Technology",
  organization: "org-uuid-here",
  status: "lead",
  lead_score: 50,
  lead_source: "referral",
  tags: ["hr-tech", "decision-maker", "budget-holder"],
  linkedin_url: "https://linkedin.com/in/michaelchen",
  assigned_to: "user-uuid-here",
  notes:
    "<p>Referred by existing customer. Interested in our onboarding solution.</p>",
});
```

#### Bulk Create Contacts

```javascript
const contacts = await directus.items("contacts").createMany([
  {
    first_name: "Alice",
    last_name: "Williams",
    email: "alice@startup.io",
    status: "lead",
    lead_source: "website",
  },
  {
    first_name: "Bob",
    last_name: "Martinez",
    email: "bob@enterprise.com",
    status: "qualified",
    lead_source: "event",
  },
]);
```

#### Search Contacts

```javascript
// Search by name or email
const searchResults = await directus.items("contacts").readByQuery({
  search: "john",
  fields: ["*", "organization.name"],
  limit: 25,
});

// Filter by multiple criteria
const qualifiedLeads = await directus.items("contacts").readByQuery({
  fields: ["*", "organization.name", "assigned_to.first_name"],
  filter: {
    _and: [
      { status: { _eq: "qualified" } },
      { lead_score: { _gte: 60 } },
      { assigned_to: { _eq: "$CURRENT_USER" } },
    ],
  },
  sort: ["-lead_score", "last_name"],
});
```

#### Update Lead Score

```javascript
await directus.items("contacts").updateOne("contact-uuid", {
  lead_score: 85,
  status: "opportunity",
  next_follow_up: "2025-11-15",
});
```

#### Get Contact Full Profile

```javascript
const contactProfile = await directus
  .items("contacts")
  .readOne("contact-uuid", {
    fields: [
      "*",
      "organization.*",
      "assigned_to.first_name",
      "assigned_to.last_name",
      "assigned_to.email",
      "activities.*",
      "activities.user_created.first_name",
      "activities.user_created.last_name",
      "tasks.*",
      "tasks.assigned_to.first_name",
      "tasks.assigned_to.last_name",
      "tasks.completed_by.first_name",
      "tasks.completed_by.last_name",
    ],
    deep: {
      activities: {
        _sort: ["-activity_date"],
        _limit: 100,
      },
      tasks: {
        _sort: ["due_date"],
        _limit: 50,
      },
    },
  });
```

### Activities

#### Log Email Sent

```javascript
await directus.items("activities").createOne({
  contact: "contact-uuid",
  activity_type: "email_sent",
  subject: "Product Update: New Features Available",
  content: `
    <p>Hi John,</p>
    <p>I wanted to share some exciting updates about our platform...</p>
    <ul>
      <li>New analytics dashboard</li>
      <li>Advanced automation rules</li>
      <li>Mobile app release</li>
    </ul>
    <p>Would love to show you a demo!</p>
  `,
  activity_date: new Date().toISOString(),
  metadata: {
    campaign_id: "product-update-nov-2025",
    email_id: "email-12345",
    template: "product-update",
    sent_via: "mailgun",
  },
});
```

#### Log Email Opened

```javascript
// This would typically be triggered by an email tracking webhook
await directus.items("activities").createOne({
  contact: "contact-uuid",
  activity_type: "email_opened",
  subject: "Product Update: New Features Available",
  activity_date: new Date().toISOString(),
  metadata: {
    email_id: "email-12345",
    opened_count: 2,
    first_opened: "2025-11-10T14:23:15Z",
    user_agent: "Mozilla/5.0...",
    ip_address: "192.168.1.1",
  },
});
```

#### Log Link Click

```javascript
// Triggered by link tracking
await directus.items("activities").createOne({
  contact: "contact-uuid",
  activity_type: "link_opened",
  subject: "Visited Pricing Page",
  url: "https://yoursite.com/pricing?utm_source=email&utm_campaign=product-update",
  activity_date: new Date().toISOString(),
  metadata: {
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: "product-update-nov-2025",
    page_views: 3,
    time_on_page: 245,
    clicked_link: "View Pricing",
  },
});
```

#### Log Text Message

```javascript
await directus.items("activities").createOne({
  contact: "contact-uuid",
  activity_type: "text_sent",
  subject: "Quick follow-up",
  content:
    "Hi John! Quick question - are you available for a 15-min call tomorrow at 2pm?",
  activity_date: new Date().toISOString(),
  metadata: {
    sms_id: "sms-abc123",
    carrier: "verizon",
    sent_via: "twilio",
    delivery_status: "delivered",
  },
});
```

#### Log Call

```javascript
await directus.items("activities").createOne({
  contact: "contact-uuid",
  activity_type: "call_completed",
  subject: "Product Demo Call",
  content: `
    <h3>Call Summary</h3>
    <p>Discussed:</p>
    <ul>
      <li>Current pain points with existing solution</li>
      <li>Integration requirements</li>
      <li>Pricing expectations</li>
      <li>Timeline for decision</li>
    </ul>
    <p><strong>Next Steps:</strong> Send proposal by Friday</p>
  `,
  activity_date: new Date().toISOString(),
  duration: 45,
  outcome: "Very positive - ready to move forward with proposal",
  metadata: {
    call_id: "call-xyz789",
    recording_url: "https://recordings.example.com/xyz789",
    participants: ["John Smith", "Sales Rep"],
    call_quality: "excellent",
  },
});
```

#### Log Meeting

```javascript
await directus.items("activities").createOne({
  contact: "contact-uuid",
  activity_type: "meeting_completed",
  subject: "Executive Alignment Meeting",
  content: `
    <h3>Meeting Notes</h3>
    <p><strong>Attendees:</strong> John Smith (VP Eng), Sarah Johnson (CTO), Our Team</p>
    <p><strong>Discussion Points:</strong></p>
    <ol>
      <li>Technical architecture review</li>
      <li>Security and compliance requirements</li>
      <li>Implementation timeline</li>
      <li>Training and onboarding plan</li>
    </ol>
    <p><strong>Decisions:</strong></p>
    <ul>
      <li>Approved security audit</li>
      <li>Agreed on Q1 implementation</li>
      <li>Committed to pilot program</li>
    </ul>
  `,
  activity_date: "2025-11-10T15:00:00Z",
  duration: 90,
  outcome: "Approved - moving to contract stage",
  metadata: {
    meeting_type: "executive",
    location: "virtual",
    calendar_event_id: "cal-event-123",
    attendee_count: 5,
  },
});
```

#### Log Document Activity

```javascript
// Document sent
await directus.items("activities").createOne({
  contact: "contact-uuid",
  activity_type: "document_sent",
  subject: "Proposal Document Sent",
  content:
    "<p>Sent detailed proposal with pricing and implementation timeline.</p>",
  activity_date: new Date().toISOString(),
  metadata: {
    document_id: "doc-proposal-123",
    document_name: "Acme_Corp_Proposal_Nov2025.pdf",
    document_size: 2457600,
    sent_via: "docusign",
  },
});

// Document viewed
await directus.items("activities").createOne({
  contact: "contact-uuid",
  activity_type: "document_viewed",
  subject: "Proposal Document Viewed",
  activity_date: new Date().toISOString(),
  metadata: {
    document_id: "doc-proposal-123",
    view_count: 3,
    pages_viewed: 12,
    time_spent: 420,
    ip_address: "192.168.1.1",
  },
});
```

#### Get Activity Timeline

```javascript
const timeline = await directus.items("activities").readByQuery({
  fields: [
    "*",
    "contact.first_name",
    "contact.last_name",
    "user_created.first_name",
    "user_created.last_name",
  ],
  filter: {
    contact: { _eq: "contact-uuid" },
  },
  sort: ["-activity_date"],
  limit: 50,
});
```

### Tasks

#### Create Task

```javascript
await directus.items("tasks").createOne({
  contact: "contact-uuid",
  task_type: "call",
  title: "Follow-up call to discuss proposal",
  description: `
    <h3>Call Objectives</h3>
    <ul>
      <li>Answer any questions about the proposal</li>
      <li>Address pricing concerns</li>
      <li>Discuss implementation timeline</li>
      <li>Get commitment on next steps</li>
    </ul>
    <p><strong>Prep:</strong> Review their current tech stack from discovery call</p>
  `,
  due_date: "2025-11-15",
  priority: "high",
  status: "pending",
  assigned_to: "user-uuid",
  reminder_date: "2025-11-14T09:00:00Z",
});
```

#### Create Task Sequence

```javascript
// Create multiple related tasks
const demo = await directus.items("tasks").createOne({
  contact: "contact-uuid",
  task_type: "demo",
  title: "Product Demo",
  due_date: "2025-11-12",
  priority: "high",
  status: "pending",
  assigned_to: "user-uuid",
});

await directus.items("tasks").createOne({
  contact: "contact-uuid",
  task_type: "follow_up",
  title: "Demo Follow-up",
  description: "<p>Send demo recording and resources</p>",
  due_date: "2025-11-13",
  priority: "medium",
  status: "pending",
  assigned_to: "user-uuid",
});

await directus.items("tasks").createOne({
  contact: "contact-uuid",
  task_type: "proposal",
  title: "Send Proposal",
  due_date: "2025-11-16",
  priority: "high",
  status: "pending",
  assigned_to: "user-uuid",
});
```

#### Complete Task

```javascript
await directus.items("tasks").updateOne("task-uuid", {
  status: "completed",
  completed_date: new Date().toISOString(),
  completed_by: "user-uuid",
  completion_notes: `
    <h3>Task Completed</h3>
    <p>Had excellent call with John. Key points:</p>
    <ul>
      <li>He loves the proposal and pricing is acceptable</li>
      <li>Needs to get final approval from CFO</li>
      <li>Expects decision by end of week</li>
      <li>Asked for security documentation (sent)</li>
    </ul>
    <p><strong>Next:</strong> Follow up on Friday for decision</p>
  `,
});

// Automatically log activity when task completed
await directus.items("activities").createOne({
  contact: "contact-uuid",
  activity_type: "call_completed",
  subject: "Follow-up call to discuss proposal",
  content: "<p>See task completion notes for details</p>",
  activity_date: new Date().toISOString(),
  duration: 25,
  outcome: "Positive - waiting on CFO approval",
});
```

#### Get My Tasks

```javascript
const myTasks = await directus.items("tasks").readByQuery({
  fields: [
    "*",
    "contact.first_name",
    "contact.last_name",
    "contact.email",
    "contact.organization.name",
  ],
  filter: {
    assigned_to: { _eq: "$CURRENT_USER" },
    status: { _in: ["pending", "in_progress"] },
  },
  sort: ["due_date", "-priority"],
});
```

#### Get Overdue Tasks

```javascript
const overdue = await directus.items("tasks").readByQuery({
  fields: [
    "*",
    "contact.first_name",
    "contact.last_name",
    "assigned_to.first_name",
    "assigned_to.last_name",
  ],
  filter: {
    due_date: { _lt: "$NOW" },
    status: { _nin: ["completed", "cancelled"] },
  },
  sort: ["due_date"],
});
```

#### Get Tasks Due Today

```javascript
const today = new Date().toISOString().split("T")[0];

const todaysTasks = await directus.items("tasks").readByQuery({
  fields: ["*", "contact.*"],
  filter: {
    due_date: { _eq: today },
    status: { _neq: "completed" },
  },
  sort: ["-priority", "due_date"],
});
```

## Advanced Queries

### Pipeline Report

```javascript
const pipeline = await directus.items("contacts").readByQuery({
  aggregate: {
    count: ["id"],
  },
  groupBy: ["status"],
  sort: ["status"],
});

// Returns something like:
// [
//   { status: 'lead', count: { id: 45 } },
//   { status: 'qualified', count: { id: 23 } },
//   { status: 'opportunity', count: { id: 12 } },
//   { status: 'customer', count: { id: 8 } },
//   { status: 'lost', count: { id: 15 } }
// ]
```

### Activity Metrics

```javascript
const activityMetrics = await directus.items("activities").readByQuery({
  aggregate: {
    count: ["id"],
  },
  groupBy: ["activity_type"],
  filter: {
    activity_date: { _gte: "$NOW(-30 days)" },
  },
  sort: ["-count"],
});
```

### Top Performing Reps

```javascript
const repPerformance = await directus.items("tasks").readByQuery({
  fields: ["assigned_to.first_name", "assigned_to.last_name", "assigned_to.id"],
  aggregate: {
    count: ["id"],
  },
  groupBy: ["assigned_to"],
  filter: {
    status: { _eq: "completed" },
    completed_date: { _gte: "$NOW(-30 days)" },
  },
  sort: ["-count"],
  limit: 10,
});
```

### Lead Conversion Rate

```javascript
// Contacts created last 30 days
const newLeads = await directus.items("contacts").readByQuery({
  aggregate: { count: ["id"] },
  filter: {
    date_created: { _gte: "$NOW(-30 days)" },
  },
});

// Converted to customer in last 30 days
const conversions = await directus.items("contacts").readByQuery({
  aggregate: { count: ["id"] },
  filter: {
    status: { _eq: "customer" },
    date_updated: { _gte: "$NOW(-30 days)" },
  },
});

const conversionRate = (conversions[0].count.id / newLeads[0].count.id) * 100;
```

### Engagement Score

```javascript
// Get contacts with activity count
const engagementScores = await directus.items("contacts").readByQuery({
  fields: ["id", "first_name", "last_name", "email", "lead_score"],
  aggregate: {
    count: ["activities.id"],
  },
  groupBy: ["id"],
  filter: {
    "activities.activity_date": { _gte: "$NOW(-30 days)" },
  },
  sort: ["-activities.id.count"],
  limit: 20,
});
```

## Webhook Integration Examples

### Email Service Integration (SendGrid, Mailgun, etc.)

```javascript
// When email is sent
app.post("/webhooks/email-sent", async (req, res) => {
  const { contactEmail, subject, content, emailId, campaignId } = req.body;

  // Find contact by email
  const contacts = await directus.items("contacts").readByQuery({
    filter: { email: { _eq: contactEmail } },
    limit: 1,
  });

  if (contacts[0]) {
    await directus.items("activities").createOne({
      contact: contacts[0].id,
      activity_type: "email_sent",
      subject: subject,
      content: content,
      activity_date: new Date().toISOString(),
      metadata: {
        email_id: emailId,
        campaign_id: campaignId,
      },
    });
  }

  res.json({ success: true });
});

// When email is opened
app.post("/webhooks/email-opened", async (req, res) => {
  const { contactEmail, subject, emailId } = req.body;

  const contacts = await directus.items("contacts").readByQuery({
    filter: { email: { _eq: contactEmail } },
    limit: 1,
  });

  if (contacts[0]) {
    // Log activity
    await directus.items("activities").createOne({
      contact: contacts[0].id,
      activity_type: "email_opened",
      subject: subject,
      activity_date: new Date().toISOString(),
      metadata: { email_id: emailId },
    });

    // Increment lead score
    await directus.items("contacts").updateOne(contacts[0].id, {
      lead_score: contacts[0].lead_score + 5,
    });
  }

  res.json({ success: true });
});
```

### SMS Integration (Twilio)

```javascript
app.post("/webhooks/sms-sent", async (req, res) => {
  const { to, body, messageSid } = req.body;

  const contacts = await directus.items("contacts").readByQuery({
    filter: {
      _or: [{ mobile: { _eq: to } }, { phone: { _eq: to } }],
    },
    limit: 1,
  });

  if (contacts[0]) {
    await directus.items("activities").createOne({
      contact: contacts[0].id,
      activity_type: "text_sent",
      subject: "SMS Message",
      content: body,
      activity_date: new Date().toISOString(),
      metadata: {
        sms_id: messageSid,
        sent_via: "twilio",
      },
    });
  }

  res.json({ success: true });
});
```

### Website Tracking Integration

```javascript
// Track page visits
app.post("/webhooks/page-view", async (req, res) => {
  const { contactId, url, title, timeOnPage, utmParams } = req.body;

  await directus.items("activities").createOne({
    contact: contactId,
    activity_type: "link_opened",
    subject: `Visited: ${title}`,
    url: url,
    activity_date: new Date().toISOString(),
    metadata: {
      time_on_page: timeOnPage,
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
    },
  });

  // Increment lead score based on page importance
  if (url.includes("/pricing") || url.includes("/demo")) {
    const contact = await directus.items("contacts").readOne(contactId);
    await directus.items("contacts").updateOne(contactId, {
      lead_score: contact.lead_score + 10,
    });
  }

  res.json({ success: true });
});
```

## Real-time Updates with Directus SDK

```javascript
// Subscribe to new activities
const subscription = await directus.subscribe("activities", {
  event: "create",
  query: {
    fields: ["*", "contact.*"],
  },
});

for await (const item of subscription) {
  console.log("New activity:", item);
  // Trigger real-time notifications, update dashboards, etc.
}
```

## Batch Operations

### Import Contacts from CSV

```javascript
async function importContacts(csvData) {
  const contacts = csvData.map((row) => ({
    first_name: row.firstName,
    last_name: row.lastName,
    email: row.email,
    phone: row.phone,
    title: row.title,
    status: "lead",
    lead_source: "import",
    lead_score: 0,
  }));

  // Batch create in chunks of 100
  const chunkSize = 100;
  for (let i = 0; i < contacts.length; i += chunkSize) {
    const chunk = contacts.slice(i, i + chunkSize);
    await directus.items("contacts").createMany(chunk);
  }
}
```

### Bulk Update Lead Scores

```javascript
async function recalculateLeadScores() {
  const contacts = await directus.items("contacts").readByQuery({
    fields: ["id", "activities.*"],
    limit: -1,
  });

  for (const contact of contacts) {
    let score = 0;

    contact.activities.forEach((activity) => {
      switch (activity.activity_type) {
        case "email_opened":
          score += 5;
          break;
        case "link_opened":
          score += 10;
          break;
        case "call_completed":
          score += 15;
          break;
        case "meeting_completed":
          score += 25;
          break;
      }
    });

    await directus.items("contacts").updateOne(contact.id, {
      lead_score: Math.min(score, 100),
    });
  }
}
```

## Error Handling

```javascript
try {
  await directus.items("contacts").createOne({
    // ... contact data
  });
} catch (error) {
  if (error.errors) {
    error.errors.forEach((err) => {
      console.error(`Error: ${err.message}`);
      if (err.extensions?.field) {
        console.error(`Field: ${err.extensions.field}`);
      }
    });
  }
}
```

## Export Data

### Export Contacts to JSON

```javascript
const allContacts = await directus.items("contacts").readByQuery({
  fields: ["*", "organization.name"],
  limit: -1,
});

const fs = require("fs");
fs.writeFileSync("contacts-export.json", JSON.stringify(allContacts, null, 2));
```

### Export to CSV

```javascript
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const contacts = await directus.items("contacts").readByQuery({
  fields: ["*", "organization.name"],
  limit: -1,
});

const csvWriter = createCsvWriter({
  path: "contacts-export.csv",
  header: [
    { id: "first_name", title: "First Name" },
    { id: "last_name", title: "Last Name" },
    { id: "email", title: "Email" },
    { id: "phone", title: "Phone" },
    { id: "title", title: "Title" },
    { id: "organization.name", title: "Organization" },
    { id: "status", title: "Status" },
    { id: "lead_score", title: "Lead Score" },
  ],
});

await csvWriter.writeRecords(contacts);
```

---

This guide provides comprehensive examples for integrating with your CRM. Adapt these examples to fit your specific needs and tech stack!
