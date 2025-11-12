# 🎯 CRM Campaigns - Automated Outreach Sequences

## ✅ What Was Created

A complete campaign management system has been added to your CRM with:

### Collections

1. **Campaigns** 🎯 (Pink #EC4899)
   - Main campaign collection with M2A steps and M2M contacts
   - Status: draft, active, paused, completed, archived
   - Goals: lead generation, nurture, demo booking, etc.

2. **Outreach Email** 📧 (Blue #3B82F6)
   - Email templates with variables
   - Subject and body (rich HTML)
   - From name and email

3. **Outreach Text** 💬 (Green #10B981)
   - SMS templates with variables
   - Message content
   - From phone number

4. **Outreach Wait** ⏳ (Orange #F59E0B)
   - Delay/pause steps
   - Duration and unit (minutes, hours, days, weeks)

5. **Campaign Steps** (Hidden junction for M2A)
   - Links campaigns to outreach items
   - Maintains step order with sort field

6. **Campaign Contacts** (Hidden junction for M2M)
   - Links campaigns to contacts
   - Tracks status and current step
   - Stores started/completed timestamps

## 🎯 Quick Access

- **Campaigns**: http://localhost:8055/admin/content/campaigns
- **Outreach Emails**: http://localhost:8055/admin/content/outreach_email
- **Outreach Texts**: http://localhost:8055/admin/content/outreach_text
- **Outreach Waits**: http://localhost:8055/admin/content/outreach_wait

## 📊 Sample Campaign Created

**"New Lead Nurture Sequence"** - A 7-step automated campaign:

1. 📧 Email: Introduction - Let's Connect
2. ⏳ Wait: 2 days
3. 📧 Email: Following up on my previous email
4. ⏳ Wait: 3 days
5. 💬 Text: Quick follow-up SMS
6. ⏳ Wait: 1 week
7. 📧 Email: Product Demo Invitation

**Enrolled Contacts**:
- John Smith (Active - on step 2)
- Sarah Johnson (Pending - not started)

## 🚀 How It Works

### Campaign Structure

```
Campaign
├─ Steps (M2A) - Ordered sequence
│  ├─ Outreach Email
│  ├─ Outreach Wait
│  ├─ Outreach Text
│  └─ Repeat...
└─ Contacts (M2M) - Enrolled contacts
   ├─ Status (pending/active/completed)
   ├─ Current Step (index in sequence)
   ├─ Started At
   └─ Completed At
```

### Variable Support

All email and text templates support variables:
- `{{first_name}}` - Contact's first name
- `{{last_name}}` - Contact's last name
- `{{email}}` - Contact's email
- `{{organization.name}}` - Organization name
- `{{title}}` - Contact's job title
- `{{phone}}` / `{{mobile}}` - Phone numbers

## 📝 Creating a Campaign

### 1. Create Outreach Items

**Email:**
```javascript
await directus.items("outreach_email").createOne({
  subject: "Welcome to {{organization.name}}!",
  body: "<p>Hi {{first_name}},</p><p>Thanks for your interest!</p>",
  from_name: "Sales Team",
  from_email: "sales@company.com"
});
```

**Text:**
```javascript
await directus.items("outreach_text").createOne({
  message: "Hi {{first_name}}! Quick follow-up - let me know if you have questions! 📱",
  from_number: "+1-555-0100"
});
```

**Wait:**
```javascript
await directus.items("outreach_wait").createOne({
  duration: 3,
  unit: "days"
});
```

### 2. Create Campaign with Steps

```javascript
await directus.items("campaigns").createOne({
  name: "Product Launch Sequence",
  description: "Automated sequence for product launch",
  goal: "lead_generation",
  status: "active",
  start_date: "2025-11-15",
  steps: [
    { collection: "outreach_email", item: "email-uuid-1" },
    { collection: "outreach_wait", item: "wait-uuid-1" },
    { collection: "outreach_email", item: "email-uuid-2" },
    { collection: "outreach_wait", item: "wait-uuid-2" },
    { collection: "outreach_text", item: "text-uuid-1" }
  ]
});
```

### 3. Enroll Contacts

```javascript
await directus.items("campaign_contacts").createOne({
  campaign_id: "campaign-uuid",
  contact_id: "contact-uuid",
  status: "pending",
  current_step: 0
});
```

## 🔄 Campaign Execution Flow

### Automated Processing (via Flow)

Create a Directus Flow to process campaigns:

```
Trigger: Schedule (every hour or minute)
↓
Read: campaign_contacts where status = 'active'
↓
For Each Contact:
├─ Get current campaign step
├─ Check step type:
│  ├─ If Email → Send email
│  ├─ If Text → Send SMS
│  └─ If Wait → Check if wait period elapsed
├─ If step completed:
│  ├─ Increment current_step
│  ├─ If last step → Mark campaign as completed
│  └─ Log activity to activities collection
└─ Update campaign_contacts record
```

### Manual Progression

```javascript
// Move contact to next step
const enrollment = await directus.items("campaign_contacts")
  .readOne("enrollment-uuid");

await directus.items("campaign_contacts").updateOne("enrollment-uuid", {
  current_step: enrollment.current_step + 1
});
```

### Complete Campaign

```javascript
await directus.items("campaign_contacts").updateOne("enrollment-uuid", {
  status: "completed",
  completed_at: new Date().toISOString()
});
```

## 📊 Campaign Tracking

### Get Campaign Progress

```javascript
const campaign = await directus.items("campaigns").readOne("campaign-uuid", {
  fields: [
    "*",
    "steps.*",
    "contacts.id",
    "contacts.status",
    "contacts.current_step",
    "contacts.contact_id.first_name",
    "contacts.contact_id.last_name",
    "contacts.contact_id.email"
  ]
});
```

### Campaign Metrics

```javascript
// Get enrollment counts by status
const metrics = await directus.items("campaign_contacts").readByQuery({
  filter: { campaign_id: { _eq: "campaign-uuid" } },
  aggregate: { count: ["id"] },
  groupBy: ["status"]
});

// Result:
// [
//   { status: "pending", count: { id: 5 } },
//   { status: "active", count: { id: 12 } },
//   { status: "completed", count: { id: 8 } }
// ]
```

### Contact Campaign Status

```javascript
const contact = await directus.items("contacts").readOne("contact-uuid", {
  fields: [
    "*",
    "campaigns.campaign_id.name",
    "campaigns.status",
    "campaigns.current_step",
    "campaigns.started_at"
  ]
});
```

## 🎨 Campaign Templates

### Welcome Series

```javascript
// 3-step welcome sequence
{
  name: "Welcome Series",
  steps: [
    { collection: "outreach_email", item: "welcome-email" },
    { collection: "outreach_wait", item: "2-days" },
    { collection: "outreach_email", item: "getting-started-tips" }
  ]
}
```

### Re-engagement Campaign

```javascript
// Win back inactive contacts
{
  name: "Re-engagement Campaign",
  goal: "reengagement",
  steps: [
    { collection: "outreach_email", item: "we-miss-you" },
    { collection: "outreach_wait", item: "3-days" },
    { collection: "outreach_text", item: "quick-check-in" },
    { collection: "outreach_wait", item: "1-week" },
    { collection: "outreach_email", item: "special-offer" }
  ]
}
```

### Demo Booking Sequence

```javascript
// Convert leads to demos
{
  name: "Demo Booking Sequence",
  goal: "demo_booking",
  steps: [
    { collection: "outreach_email", item: "intro-and-value-prop" },
    { collection: "outreach_wait", item: "2-days" },
    { collection: "outreach_email", item: "case-study" },
    { collection: "outreach_wait", item: "3-days" },
    { collection: "outreach_text", item: "demo-invitation" },
    { collection: "outreach_wait", item: "2-days" },
    { collection: "outreach_email", item: "last-chance-demo" }
  ]
}
```

## 🤖 Automation Examples

### Flow 1: Process Active Campaigns

```yaml
Name: Process Campaign Steps
Trigger: Schedule (every 15 minutes)
Operations:
  1. Read campaign_contacts where status = 'active'
  2. For each enrollment:
     - Get campaign steps
     - Get current step details
     - If email → Send via email service
     - If text → Send via SMS service
     - If wait → Check if duration passed
     - Update current_step
     - Log activity
```

### Flow 2: Auto-Start Campaigns

```yaml
Name: Auto-Start Pending Campaigns
Trigger: Schedule (hourly)
Operations:
  1. Read campaign_contacts where status = 'pending'
  2. Filter by campaign.start_date <= NOW
  3. Update status to 'active'
  4. Set started_at to NOW
```

### Flow 3: Campaign Completion Handler

```yaml
Name: Handle Campaign Completion
Trigger: When campaign_contacts.current_step updated
Operations:
  1. Get campaign total steps
  2. If current_step >= total_steps:
     - Set status = 'completed'
     - Set completed_at = NOW
     - Create completion activity
     - Update contact.last_contact_date
```

## 📈 Best Practices

### Campaign Design

✅ **Start with value** - First email should provide immediate value  
✅ **Space it out** - Don't overwhelm with too many touches  
✅ **Mix channels** - Combine email and SMS for better engagement  
✅ **Clear CTA** - Every step should have a clear call-to-action  
✅ **Test templates** - Always test with sample data first  

### Variable Usage

✅ **Personalize** - Use {{first_name}} and {{organization.name}}  
✅ **Fallbacks** - Handle cases where variables might be empty  
✅ **Test rendering** - Preview emails before launching  

### Timing

✅ **Business hours** - Send during working hours  
✅ **Time zones** - Consider recipient time zones  
✅ **Optimal days** - Tuesday-Thursday typically perform best  
✅ **Avoid weekends** - Unless B2C campaign  

### Enrollment

✅ **Quality over quantity** - Target right personas  
✅ **Segmentation** - Different campaigns for different segments  
✅ **Opt-out respect** - Honor unsubscribes immediately  
✅ **Track engagement** - Monitor opens, clicks, responses  

## 🔧 Advanced Features

### Conditional Steps (Future)

You could add a `condition` field to control flow:

```javascript
{
  collection: "outreach_email",
  item: "email-uuid",
  condition: {
    field: "lead_score",
    operator: "_gte",
    value: 70
  }
}
```

### A/B Testing

Create variants of templates and randomly assign:

```javascript
{
  steps: [
    { 
      collection: "outreach_email",
      item: "variant-a", // 50% of contacts
      variant: "A"
    },
    {
      collection: "outreach_email", 
      item: "variant-b", // 50% of contacts
      variant: "B"
    }
  ]
}
```

### Dynamic Wait Times

Adjust wait based on contact behavior:

```javascript
// If contact opened email, wait 2 days
// If no open, wait 5 days
{
  collection: "outreach_wait",
  item: "dynamic-wait",
  duration_formula: "{{last_activity_date}} ? 2 : 5"
}
```

## 📊 Reports & Analytics

### Campaign Performance

```javascript
// Get campaign stats
const stats = await directus.items("campaign_contacts").readByQuery({
  filter: { campaign_id: { _eq: "campaign-uuid" } },
  aggregate: {
    count: ["id"],
    avg: ["current_step"]
  },
  groupBy: ["status"]
});
```

### Top Performing Campaigns

```javascript
const topCampaigns = await directus.items("campaigns").readByQuery({
  fields: [
    "id",
    "name",
    "goal"
  ],
  aggregate: {
    count: ["contacts.id"]
  },
  filter: {
    "contacts.status": { _eq: "completed" }
  },
  sort: ["-contacts.id.count"],
  limit: 10
});
```

### Conversion Rate

```javascript
// Contacts who completed campaign
const completed = await directus.items("campaign_contacts").readByQuery({
  aggregate: { count: ["id"] },
  filter: {
    campaign_id: { _eq: "campaign-uuid" },
    status: { _eq: "completed" }
  }
});

// Total enrolled
const total = await directus.items("campaign_contacts").readByQuery({
  aggregate: { count: ["id"] },
  filter: { campaign_id: { _eq: "campaign-uuid" } }
});

const conversionRate = (completed[0].count.id / total[0].count.id) * 100;
```

## 🎯 Integration Examples

### Email Service Integration

```javascript
// When campaign step is email
const emailStep = await directus.items("outreach_email")
  .readOne(stepId);

const contact = await directus.items("contacts")
  .readOne(contactId, { fields: ["*", "organization.*"] });

// Replace variables
const subject = emailStep.subject
  .replace(/{{first_name}}/g, contact.first_name)
  .replace(/{{organization.name}}/g, contact.organization?.name || "");

const body = emailStep.body
  .replace(/{{first_name}}/g, contact.first_name)
  .replace(/{{last_name}}/g, contact.last_name)
  .replace(/{{organization.name}}/g, contact.organization?.name || "");

// Send via email service (SendGrid, Mailgun, etc.)
await sendEmail({
  to: contact.email,
  from: emailStep.from_email,
  fromName: emailStep.from_name,
  subject: subject,
  html: body
});

// Log activity
await directus.items("activities").createOne({
  contact: contactId,
  activity_type: "email_sent",
  subject: subject,
  content: body,
  activity_date: new Date().toISOString(),
  metadata: {
    campaign_id: campaignId,
    campaign_step: currentStep
  }
});
```

### SMS Service Integration

```javascript
// When campaign step is text
const textStep = await directus.items("outreach_text")
  .readOne(stepId);

const contact = await directus.items("contacts")
  .readOne(contactId);

const message = textStep.message
  .replace(/{{first_name}}/g, contact.first_name)
  .replace(/{{organization.name}}/g, contact.organization?.name || "");

// Send via Twilio
await twilioClient.messages.create({
  body: message,
  from: textStep.from_number,
  to: contact.mobile || contact.phone
});

// Log activity
await directus.items("activities").createOne({
  contact: contactId,
  activity_type: "text_sent",
  subject: "Campaign SMS",
  content: message,
  activity_date: new Date().toISOString(),
  metadata: {
    campaign_id: campaignId,
    campaign_step: currentStep,
    sent_via: "twilio"
  }
});
```

## 🎉 Summary

Your CRM now has a complete campaign management system:

✅ **M2A Steps** - Mix emails, texts, and waits in any order  
✅ **M2M Contacts** - Link many contacts to many campaigns  
✅ **Progress Tracking** - Know where each contact is in sequence  
✅ **Variable Support** - Personalize all communications  
✅ **Status Management** - Track pending/active/completed  
✅ **Sample Campaign** - Ready-to-use nurture sequence  

**Access it now**: http://localhost:8055/admin/content/campaigns

---

**Built on**: November 10, 2025  
**Version**: 1.0  
**Status**: Production Ready ✅


