# Send Message to Contact Flow

## Overview

This Directus Flow allows you to send emails or text messages to contacts directly from the contact detail page. When triggered, it automatically logs the activity in the contact's activity history.

**Flow URL:** http://localhost:8055/admin/settings/flows/23b37019-df49-4f4f-9149-f2ba3d257d7d

## How to Use

### Sending a Message

1. Navigate to any contact in your CRM
2. Click the **"Send Message to Contact"** button (lightning bolt icon)
3. Fill in the form:
   - **Message Type**: Choose "Email" or "Text Message (SMS)"
   - **Subject**: (Only for emails) Enter the email subject line
   - **Message**: Enter your message content (supports HTML for emails)
4. Click **Confirm** to send

### What Happens

The flow will:
1. ✅ Check the message type (email or SMS)
2. ✅ Create an activity record in the contact's history
3. ✅ Send you a notification confirming the message was logged

## Flow Structure

```
┌─────────────────────────┐
│   Manual Trigger        │
│   (Contact Detail Page) │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Check Message Type     │
│  (Condition)            │
└─────┬──────────┬────────┘
      │          │
  Email│          │SMS
      ▼          ▼
┌──────────┐  ┌──────────┐
│Log Email │  │Log SMS   │
│Activity  │  │Activity  │
└────┬─────┘  └────┬─────┘
     │             │
     ▼             ▼
┌──────────┐  ┌──────────┐
│Notify    │  │Notify    │
│Success   │  │Success   │
└──────────┘  └──────────┘
```

## Operations Breakdown

### 1. Check Message Type (Condition)
- **Purpose**: Routes the flow based on whether email or SMS was selected
- **Logic**: If `message_type == "email"` → resolve (email path), otherwise → reject (SMS path)

### 2. Log Email Activity (Item Create)
- **Collection**: `activities`
- **Payload**:
  - `contact`: The selected contact's ID
  - `activity_type`: "email_sent"
  - `subject`: Email subject from form
  - `content`: Email message from form
  - `activity_date`: Current timestamp
  - `metadata`: Flow tracking info

### 3. Log SMS Activity (Item Create)
- **Collection**: `activities`
- **Payload**:
  - `contact`: The selected contact's ID
  - `activity_type`: "text_sent"
  - `subject`: "SMS Message"
  - `content`: SMS message from form
  - `activity_date`: Current timestamp
  - `metadata`: Flow tracking info

### 4. Send Notifications
- **Purpose**: Confirm to the user that the message was logged
- **Recipients**: The user who triggered the flow
- **Message**: Confirmation that the email/SMS was logged

## Activity Data Captured

All sent messages are logged in the `activities` collection with:

- **Activity Type**: `email_sent` or `text_sent`
- **Subject**: Email subject or "SMS Message"
- **Content**: Full message content (HTML or plain text)
- **Timestamp**: When the message was sent
- **Metadata**: Includes flow ID and source information

## Extending the Flow

### Adding Actual Email/SMS Sending

Currently, this flow **logs the activity only**. To actually send messages, you can add additional operations:

#### Option 1: Using Directus Mail Operation

Add a **Mail** operation after the condition for emails:

```json
{
  "type": "mail",
  "options": {
    "to": ["{{$trigger.payload.email}}"],
    "subject": "{{$trigger.body.subject}}",
    "body": "{{$trigger.body.message}}",
    "type": "html"
  }
}
```

#### Option 2: Using Webhook/API for SMS

Add a **Request** operation for SMS via Twilio, Vonage, or similar:

```json
{
  "type": "request",
  "options": {
    "method": "POST",
    "url": "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json",
    "headers": [
      {
        "header": "Authorization",
        "value": "Basic YOUR_AUTH_TOKEN"
      }
    ],
    "body": "{\"To\": \"{{$trigger.payload.phone}}\", \"From\": \"+1234567890\", \"Body\": \"{{$trigger.body.message}}\"}"
  }
}
```

#### Option 3: Using Custom Code (Exec Operation)

Add an **Exec** operation with custom JavaScript/TypeScript:

```javascript
module.exports = async function(data) {
  const { $trigger, $accountability } = data;
  const messageType = $trigger.body.message_type;
  
  if (messageType === 'email') {
    // Use your email service (SendGrid, Mailgun, etc.)
    await sendEmail({
      to: $trigger.payload.email,
      subject: $trigger.body.subject,
      html: $trigger.body.message
    });
  } else {
    // Use your SMS service (Twilio, Vonage, etc.)
    await sendSMS({
      to: $trigger.payload.phone,
      message: $trigger.body.message
    });
  }
  
  return { success: true };
}
```

### Adding Template Support

You can enhance this flow to use templates from your `outreach_email` or `outreach_text` collections:

1. Add a new field to the manual trigger form for "Select Template"
2. Add a **Read Item** operation to fetch the template
3. Use the template's content with variable substitution
4. Merge with custom message content

### Adding Scheduling

To schedule messages for later:

1. Add a "Send Time" field to the manual trigger form
2. Instead of logging immediately, create a task or scheduled record
3. Use a separate scheduled flow to process pending messages

## Best Practices

1. **Testing**: Test the flow with yourself as the contact first
2. **Compliance**: Ensure you have permission to contact people via email/SMS
3. **Rate Limiting**: If adding real sending, implement rate limits
4. **Error Handling**: Add error operations to handle failures gracefully
5. **Logging**: The activity log serves as your audit trail
6. **Personalization**: Use contact fields in your messages (e.g., "Hi {{first_name}}")

## Related Collections

- **contacts**: Source of recipient information
- **activities**: Where all messages are logged
- **outreach_email**: Email templates you can reference
- **outreach_text**: SMS templates you can reference

## Troubleshooting

### Flow Doesn't Appear on Contact Page
- Verify the flow status is "active"
- Check that `location` is set to "item" in flow options
- Ensure you're viewing a contact detail page

### Activity Not Being Created
- Check that the contact ID is valid
- Verify activities collection permissions
- Review operation logs in Directus admin

### Subject Field Not Showing/Hiding
- The subject field should auto-hide when SMS is selected
- This uses conditional display rules in the form configuration

## Variables Available in Flow

- `{{$trigger.body.message_type}}`: "email" or "sms"
- `{{$trigger.body.subject}}`: Email subject (if provided)
- `{{$trigger.body.message}}`: Message content
- `{{$trigger.body.keys[0]}}`: Selected contact ID
- `{{$trigger.payload}}`: Full contact record data
- `{{$accountability.user}}`: Current user ID
- `{{$now}}`: Current timestamp

## Next Steps

1. Test the flow with a few sample contacts
2. Customize the form fields if needed
3. Add actual sending capability (see "Extending the Flow" above)
4. Create message templates for common scenarios
5. Set up a scheduled flow to send campaign messages


