// Add a byline or publication date only when confirmed.
export const articleImage = ({ art }) => "/Images/journal/" + art + ".webp";
export const articles = [
  {
    slug: "ai-agent-first-workflow", topic: "AI agents", art: "agent",
    title: "What should your first AI agent do?",
    description: "Pick one repeatable task, give the agent an approved source, and decide what a person must still approve.",
    imageAlt: "Amber routing card and a document tray on a charcoal desk",
    answer: "Start with one reversible task, such as classifying enquiries or drafting answers from approved material. Keep staff in charge of sending, define when the agent should stop, and compare the pilot with the way the team works today.",
    service: ["Explore AI agent plans", "/services?service=ai-agents#quotation-section"],
    sections: [
      { heading: "Pick a task you can check", body: [
        "A useful first agent does one job with a clear finish. Take a support inbox: you might ask the agent to classify incoming questions and draft answers from your approved help pages. A staff member reviews the draft and sends it. This is easier to test than asking an agent to ‘handle support’.",
        "Before you build, collect a small set of routine examples and a few awkward ones. Include a question with no answer in your documents, an old policy, a duplicate request and a customer asking to speak to a person. Write down the response you would expect in each case.",
      ] },
      { heading: "Give the agent a source and a limit", body: [
        "Choose one owner for the knowledge source. Agree which documents the agent may read, what it should do when two documents disagree and where it should send a question it cannot answer. Give it read access before giving it permission to make changes.",
        "For an agent connected to a CRM, write a short list of allowed actions: read a lead record, prepare a note, or suggest an owner. Changing a deal stage, sending a message or deleting a record should require separate approval until your team agrees otherwise.",
      ] },
      { heading: "Measure the review, not the demo", body: [
        "A demo shows that one example worked. In a pilot, track how often staff accept a draft, how often they have to correct it and why they send it back. Compare the review time with how long the same task takes today.",
        "Start with a queue someone owns. Review the first batch together, add the missed cases to your test set and decide whether the next step should be better coverage, a single integration or no expansion at all.",
      ] },
      { heading: "Where an agent fits better than a rule", body: [
        "Use a rule when the condition and the action are known. A form tagged “billing” can go directly to a billing queue. An AI agent can help when the input varies, such as a customer describing an invoice question without using the word “billing”. Both can run in the same workflow. Let the rule enforce permissions and let the agent interpret the wording.",
        "A first pilot can work in draft mode. Classify a support email, show which policy the draft relied on and leave the Send button with staff. Give the agent an “unclear” outcome so an unusual message still reaches the right person. The reviewer needs the original question and the reason the draft was routed there.",
      ] },
      { heading: "Make a small acceptance set", body: [
        "Collect routine cases from the team, remove unnecessary personal information and write the expected outcome for each. Include two lookalike requests that should take different paths. A billing question and a request to change banking details may sound similar, but only the first belongs in an FAQ workflow.",
        "Keep a separate set for checking changes to source material, instructions or the model. Look for serious errors staff might miss. A draft that confidently cites an outdated policy may cost more than one that simply asks for human help.",
      ] },
      { heading: "Decide what happens when the pilot ends", body: [
        "Review time spent per case, how many drafts staff actually use and why they reject the rest. If people spend more time checking evidence than they save writing, improve the sources and format before adding more actions. Name a person who can pause the workflow and agree how the team will handle incoming requests during a pause.",
      ] },
      { heading: "Does a first agent need access to the whole CRM?", body: [
        "Usually one read-only view or a small set of approved fields is enough for a pilot. Add permission to write or send after the team has agreed on an approval step and knows how to revoke access.",
      ] },
    ],
    sources: [["NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"]],
    related: ["crm-automation-existing-crm", "security-review-before-launch"],
  },
  {
    slug: "crm-automation-existing-crm", topic: "CRM automation", art: "crm",
    title: "Automate the CRM you already use",
    description: "A practical plan for capturing leads, assigning owners and keeping follow-ups visible without moving every record.",
    imageAlt: "An office inbox with neatly sorted index cards",
    answer: "You can often automate your existing CRM by starting with one source and one routing rule. Check that your plan supports the integration, define how to match records and leave unusual cases for a person to review.",
    service: ["Compare CRM automation plans", "/services#quotation-section"],
    sections: [
      { heading: "Draw the path of one enquiry", body: [
        "Start with one source, such as a website form. Follow an enquiry from the moment it arrives until a salesperson replies. Note where someone copies information, decides who owns the enquiry, or has to ask whether anyone followed up.",
        "Write down the few fields you actually need to make that handoff: contact, source, date, owner, stage and next action. Name the system that owns each field. If the CRM is the source of truth, a spreadsheet export should not silently change it.",
      ] },
      { heading: "Make repeat submissions safe", body: [
        "Agree on a stable key, such as a source record ID, before importing leads. Matching on a cleaned email address or phone number can be useful, but shared inboxes and changed numbers still need review. Send uncertain matches to a staff queue instead of merging them automatically.",
        "When the same source event arrives twice, the workflow should leave one traceable record. Test retries, blank fields and an existing lead with a different owner. Keep an activity note explaining whether a record was created, updated or held for review.",
      ] },
      { heading: "Check access before planning a rollout", body: [
        "Find out which CRM plan you have, which API actions it permits and whether you can try the workflow in a separate test space. Use only the fields and permissions the workflow needs. Agree who owns access when a staff member leaves.",
        "Start with a small queue and review the results with the people who use it. If you later add invoicing or payment reminders, read current balances from verified finance records and confirm the payment state before any reminder is sent.",
      ] },
      { heading: "Map ownership before connecting tools", body: [
        "Put the source field, the destination field and the rule for existing values on the same row. For a phone number, decide whether to replace a verified number, append a second one or keep the form entry in a note. Decide separately whether a new enquiry should change the record’s owner.",
        "Suppose a contact fills out a form again to add a budget. Keep the same contact and record a new enquiry or activity, depending on how your team tracks demand. A network retry is different and should leave a single enquiry. Tracking a contact key and a submission key separately helps you tell those cases apart.",
      ] },
      { heading: "Add an exception queue your team will check", body: [
        "Start with three states: needs assignment, needs duplicate review and failed to sync. Include the source reference and the next action. Give one team responsibility for clearing the queue. When a workflow cannot save an enquiry, make that visible to the owner rather than silently dropping it.",
        "Use a separate integration account where the CRM permits it. Give it the fields and actions needed for this workflow. Check where its activity is logged and how to turn it off. Tying the connection to a salesperson’s account can make it fail when that person leaves.",
      ] },
      { heading: "Choose a rollout check you can compare", body: [
        "Before changing the workflow, record how many enquiries arrived, how many had an owner and how long the team took to make a first response. Compare the pilot using the same definitions. Include holidays or shift changes if they affect routing.",
        "Test a failed connection and retry. Every source event should update the right record, create a new one or explain why it is waiting for review. Ask a salesperson to verify an entry without help from the person who built the workflow.",
      ] },
      { heading: "When is a custom CRM worth considering?", body: [
        "Consider it when the current system cannot represent the records, permissions or approvals your team needs. Compare the cost of workarounds with the cost of building, migrating and maintaining a new system. If the main problem is repetitive lead entry, a focused integration is usually a simpler start.",
      ] },
    ],
    sources: [["HubSpot guidance on record deduplication", "https://knowledge.hubspot.com/records/deduplication-of-records"]],
    related: ["whatsapp-follow-up-workflow", "email-follow-up-workflow"],
  },
  {
    slug: "whatsapp-follow-up-workflow", topic: "Messaging workflows", art: "whatsapp",
    title: "Design a WhatsApp follow-up that knows when to stop",
    description: "Connect a business number to your CRM with a record of permission, approved messages and a clear handoff to staff.",
    imageAlt: "An unbranded phone showing abstract chat bubbles and a pause indicator",
    answer: "Start with a business number, a record of opt-in and templates where required. Before every send, check whether the contact has replied, booked, opted out or been taken over by a person. Any of those events should pause the follow-up.",
    service: ["Explore CRM and WhatsApp automation", "/services#quotation-section"],
    sections: [
      { heading: "Record permission before the first message", body: [
        "Use an approved WhatsApp business number. Record who opted in, when they did it and what they agreed to receive. Do not assume that a phone number collected for an unrelated purpose can be used for WhatsApp follow-ups.",
        "Check the WhatsApp Business Messaging Policy and use approved templates when required. Keep the template name, version and message purpose in the workflow so staff can see what was sent. Confirm channel charges with your provider before setting a volume target.",
      ] },
      { heading: "Check the contact before every send", body: [
        "Give each contact a single workflow owner. Before sending, confirm the current permission and check whether the contact has replied, booked, opted out or been taken over by a staff member. Check again at send time, because a reply can arrive while a reminder is waiting.",
        "Write outbound messages and incoming replies to the CRM against the same contact. If a person opts out, mark the contact as suppressed. If the provider retries a message event, use its identifier to avoid recording or sending the same action twice.",
      ] },
      { heading: "Hand over the conversation with context", body: [
        "When a reply needs a person, show the salesperson the original enquiry, the last message and the reason it was handed over. A staff takeover should pause queued follow-ups until the owner makes a deliberate decision to resume.",
        "Before launch, use internal test contacts. Check a normal reply, an opt-out, a booking, a duplicate event and a staff takeover. Ask someone who did not build the workflow to find the record and pick up the conversation.",
      ] },
      { heading: "Write down what cancels a scheduled message", body: [
        "Imagine an enquiry arrives Monday and a reminder is planned for Wednesday. If the customer replies Tuesday, the inbound event pauses the reminder and assigns the conversation. A second check just before the scheduled send protects against a reply that arrived while the reminder was queued.",
        "Define what “booked” means. One team may use a calendar confirmation; another requires staff to approve the slot first. Use the confirmed status as a stop signal. If a meeting is cancelled, let the owner decide whether to resume instead of restarting the old sequence automatically.",
      ] },
      { heading: "Keep consent and conversation history separate", body: [
        "Keep the opt-in source, scope and time where staff can find them. Log each send and reply against a stable contact record, with its provider event ID when available. Conversation history tells you what happened. A permission record tells you what the team may do next.",
        "If someone changes number or asks to stop through another channel, route the case to the person who owns suppression. Update the source future sends check. When several tools send messages, make sure each sees the opt-out rather than relying on a note in one inbox.",
      ] },
      { heading: "Build a launch checklist the owner can run", body: [
        "Have staff run an approved test contact through a normal reminder, a late reply, a duplicate provider notification, a booking, an opt-out and a manual takeover. Compare the CRM activity with the provider’s send log. A paused reminder should have no outgoing message.",
        "Decide who reviews rejected templates and delivery errors. Set a starting volume your team can handle. If the workflow creates more replies than staff can review, reduce the volume or adjust assignment before adding contacts.",
      ] },
      { heading: "Can you follow up automatically after someone replies?", body: [
        "For a sales reminder sequence, pause when a reply arrives. Staff can decide whether to send a separate response or resume the original sequence. Check the platform’s current messaging rules and the contact’s permission before starting a different workflow.",
      ] },
    ],
    sources: [["WhatsApp Business Messaging Policy", "https://business.whatsapp.com/policy"]],
    related: ["email-follow-up-workflow", "crm-automation-existing-crm"],
  },
  {
    slug: "email-follow-up-workflow", topic: "Messaging workflows", art: "email",
    title: "Set up an email follow-up your sales team can trust",
    description: "Prepare the sender, map replies to the right CRM record, and test what happens when a follow-up should be cancelled.",
    imageAlt: "A cream envelope beside a dark metal inbox tray",
    answer: "Use an approved sender and a reply inbox that someone owns. Record the conversation in the CRM and cancel queued reminders when the recipient replies, books, opts out or reaches a staff member.",
    service: ["Compare CRM and email automation plans", "/services#quotation-section"],
    sections: [
      { heading: "Start with an approved sender", body: [
        "Choose the domain, mailbox and reply owner before writing a sequence. Ask your administrator or email provider to set up the required domain authentication. Check SPF and DKIM, and configure DMARC with the administrator so legitimate senders stay aligned.",
        "Use contact lists you are allowed to message. Record the source, purpose and permission for each contact. Give recipients a clear way to stop messages and keep a suppression list shared by the systems that send them.",
      ] },
      { heading: "Route replies somewhere people check", body: [
        "Decide who handles replies and what counts as a handoff. A human owner should see the last message, relevant CRM details and any questions the contact asked. Automatically record the reply and stop the follow-up while the person reviews it.",
        "Avoid a second workflow starting for the same contact. If an email address already has an active sequence, show that status in the CRM rather than sending again. Stop future sends after a reply, booking, opt-out or staff takeover. Suppress known bounces and check exceptions with the team.",
      ] },
      { heading: "Run a small test with real review", body: [
        "Try the workflow with internal addresses first. Send a reply just before a scheduled follow-up and check that the next send is cancelled. Test an opt-out, a failed delivery, a duplicate and a contact whose owner changes.",
        "When the test is ready, agree on a daily cap, what the owner will review and when the team will pause the workflow. Use delivery and reply records to diagnose problems; an open count alone does not tell you whether a conversation moved forward.",
      ] },
      { heading: "Check the sending setup before drafting a sequence", body: [
        "Ask which service sends the mail, which domain appears in From and which mailbox receives replies. SPF names allowed sending services, DKIM signs the message and DMARC tells receivers how to handle mail that fails its alignment checks. Have your administrator verify the setup for the providers you actually use.",
        "Send to internal inboxes and inspect authentication results. Google publishes separate requirements for higher-volume senders to personal Gmail accounts, so check its current guidelines when changing providers or volume. A technically valid message can still be unwanted. Keep permission, message relevance and suppression visible in the workflow.",
      ] },
      { heading: "Separate delivery, reply and suppression states", body: [
        "Track whether a message was scheduled, accepted for delivery, failed or received a reply. A recipient who unsubscribes should go on the suppression list even if they never replied. Test that every tool that can send checks the same suppression decision.",
        "Suppose a sales owner gets a reply Tuesday and a reminder is due Wednesday. Record the reply against the current CRM entry and cancel the reminder. If two contacts share an inbox or an address is ambiguous, ask staff to link the reply to the correct record before resuming.",
      ] },
      { heading: "Choose a short set of launch checks", body: [
        "Check authentication, the reply address and that the unsubscribe path works. Simulate a bounce, a late reply, a booking and a staff takeover. Confirm the CRM shows why sending stopped and who gets notified when a reply cannot be linked.",
        "After launch, look at qualified replies, delivery errors and cases staff have to clean up. An open may reflect automated mail scanning or a client setting. Use replies and recorded actions to decide whether the workflow is moving conversations forward.",
      ] },
      { heading: "Do you need a new domain for email follow-ups?", body: [
        "Start with a sender your company authorizes and a domain the administrator can authenticate. If a new sender or domain makes sense for your volume and provider setup, document who owns its configuration and how replies will reach the team.",
      ] },
    ],
    sources: [["Google’s email sender guidelines", "https://support.google.com/a/answer/81126"]],
    related: ["whatsapp-follow-up-workflow", "crm-automation-existing-crm"],
  },
  {
    slug: "security-review-before-launch", topic: "Cybersecurity", art: "security",
    title: "What to check before an AI workflow goes live",
    description: "A review checklist for business owners: assets, data access, permissions, logs and what happens if someone needs to take over.",
    imageAlt: "A metal keyring beside neatly organized network cables",
    answer: "Before launch, list the tools and data the workflow can reach, limit permissions, define which actions need approval, and test how the team can stop it. Turn gaps into a fix list with owners and closure checks.",
    service: ["Explore cybersecurity assessment services", "/services#cybersecurity"],
    sections: [
      { heading: "Write down what the workflow can reach", body: [
        "List the systems, owners, accounts and kinds of data the workflow can use. Include connections that are easy to forget, such as email, a shared drive, a calendar or an export. Mark where customer data leaves one service and enters another.",
        "Give each integration the narrowest permissions it needs. Separate testing from production and avoid shared administrator accounts. Review who can change permissions and how the team can revoke them if something goes wrong.",
      ] },
      { heading: "Review decisions and write activity down", body: [
        "For each action, decide whether the system may do it automatically or a person should approve it. Put payment, deletion and broad changes behind explicit review. Treat incoming documents, messages and model output as untrusted input when deciding what actions are allowed.",
        "Keep enough activity history to answer what happened, when and under whose authority. Avoid storing credentials or unnecessary personal data in logs. Run through a staff takeover and make sure the workflow stops using the old approval once access is withdrawn.",
      ] },
      { heading: "Get findings you can act on", body: [
        "A readiness review should leave you with a prioritised fix list, an owner for each item and a way to verify what changed. Ask whether remediation, follow-up checks and ongoing support are included in the scope.",
        "If you need formal security testing, get written approval from the asset owner and agree which assets, environments and test windows are in scope. Keep customer-facing systems and production data out of any work that has not been approved.",
      ] },
      { heading: "Walk through one real business task on paper", body: [
        "Take a support agent that reads help documents and drafts an answer. List what comes in, where data goes, what the workflow reads and who approves the result. Repeat for an exception, such as a customer asking to change account information. Exceptions often expose permissions or handoff decisions that normal cases hide.",
        "Check the credentials used at each step and who can rotate or revoke them. Start with read-only access where it meets the requirement. Make sure a test environment has its own credentials and uses approved test data. Give every connection a named owner.",
      ] },
      { heading: "Treat approvals and handover as part of the system", body: [
        "Write the permitted actions in plain English. A CRM assistant might be allowed to read a record and create a draft. Sending an email or updating an account can require a person to approve. Keep the approval beside the specific action, record and version it covers.",
        "Test a missing approval, an expired approval and a staff member taking over midway. Verify that the workflow waits or stops instead of continuing with an old decision. Check that someone on duty knows where to find the activity log and who can pause the integration.",
      ] },
      { heading: "Use findings to decide whether to launch", body: [
        "For each finding, write down the affected asset, business impact, owner, next action and closure check. If an agent uses a shared administrator account, for example, name the IT owner, plan an individual service account with limited rights and verify that shared access can be removed.",
        "Agree which findings block launch and which the owner can accept temporarily. Save the approval and review date. The decision record helps the team reopen the review when it adds another action or provider.",
      ] },
      { heading: "Is a readiness review the same as a penetration test?", body: [
        "A readiness review checks whether controls, owners and handover are ready for the workflow. Penetration testing is a separate engagement that requires written authorization and agreed assets and methods. Ask for the scope and deliverables in writing.",
      ] },
    ],
    sources: [["OWASP risks for applications using language models", "https://genai.owasp.org/llm-top-10/"], ["NIST Cybersecurity Framework", "https://www.nist.gov/cyberframework"]],
    related: ["ai-agent-first-workflow", "crm-automation-existing-crm"],
  },
];
