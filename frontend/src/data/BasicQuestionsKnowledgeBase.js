/**
 * CoreD Basic & Everyday Questions (BQ1 - BQ100)
 *
 * 100 normal, everyday questions visitors commonly type: greetings, how to use
 * the chat, CRM basics, day-to-day management, work roles and responsibilities,
 * AI basics, getting started, customer communication, website/contact help and
 * general business terms. None repeat questions in KnowledgeBase.js,
 * KnowledgeBaseExpanded.js, AIAgentKnowledgeBase.js or CyberSecurityKnowledgeBase.js.
 *
 * Content only: no UI and no matching logic. Same entry schema as the other files.
 *   id, category, questions[], keywords[], answer (plain text), action (optional "contact").
 *
 * Accuracy rule: only confirmed CoreD facts are used (CRM services, custom and
 * AI-agent CRM, Basic = one Basic option, Standard = one Standard plus one Basic option, website services list,
 * Contact us). No prices, timelines, addresses, phone numbers or hours are invented.
 *
 * HOW TO ADD THIS TO YOUR PROJECT (3 steps)
 * 1. Copy this file next to KnowledgeBase.js.
 * 2. At the top of KnowledgeBase.js add:
 *      import { basicQuestionsKnowledgeBase } from "./BasicQuestionsKnowledgeBase";
 * 3. At the bottom of KnowledgeBase.js, add it to the final array:
 *      export const knowledgeBase = [
 *        ...existingKnowledgeBase,
 *        ...expandedKnowledgeBase,
 *        ...aiAgentKnowledgeBase,
 *        ...cyberSecurityKnowledgeBase,
 *        ...basicQuestionsKnowledgeBase,
 *      ];
 *    (Keep only the lines for files you have actually added.)
 */

export const basicQuestionsKnowledgeBase = [
  {
    id: "basic-bq001-hello-have-few-questions",
    category: "greetings-and-polite-conversation",
    questions: [
      "Hello, I have a few questions",
      "Hi CoreD, can you help me?",
      "Namaste CoreD team",
    ],
    keywords: [],
    answer:
      "Hello! Welcome to CoreD. Ask about AI-powered CRM, AI agents, automation, consulting or cybersecurity, and I will help you find the relevant information.",
  },
  {
    id: "basic-bq002-how-are-you",
    category: "greetings-and-polite-conversation",
    questions: [
      "How are you?",
      "How are you doing today?",
      "Aap kaise ho?",
    ],
    keywords: [],
    answer:
      "I'm a program, so I don't have feelings, but I'm ready to help. What would you like to know about CoreD's CRM services?",
  },
  {
    id: "basic-bq003-good-night",
    category: "greetings-and-polite-conversation",
    questions: [
      "Good night",
      "Good evening, CoreD",
      "Shubh ratri",
    ],
    keywords: [],
    answer:
      "Good night! If you have more questions about CoreD later, just come back and ask, or use the Contact us option to reach the team.",
    action: "contact",
  },
  {
    id: "basic-bq004-nice-meet",
    category: "greetings-and-polite-conversation",
    questions: [
      "Nice to meet you",
      "Pleased to meet you",
      "Aapse milkar accha laga",
    ],
    keywords: [],
    answer:
      "Nice to meet you too! Tell me what you're trying to organise or improve in your business, and I'll point you to the right information.",
  },
  {
    id: "basic-bq005-sorry-have-silly-question",
    category: "greetings-and-polite-conversation",
    questions: [
      "Sorry, I have a silly question",
      "Sorry to bother you",
      "Maaf kijiye, ek simple sawal hai",
    ],
    keywords: [],
    answer:
      "No need to apologise, and no question is silly. Ask whatever you like, and if I don't have a verified answer I'll tell you honestly.",
  },
  {
    id: "basic-bq006-excuse-ask-something",
    category: "greetings-and-polite-conversation",
    questions: [
      "Excuse me, can I ask something?",
      "Can I ask you a question?",
      "Ek sawal poochna hai",
    ],
    keywords: [],
    answer:
      "Of course. Go ahead and ask your question.",
  },
  {
    id: "basic-bq007-okay-got",
    category: "greetings-and-polite-conversation",
    questions: [
      "Okay, got it",
      "Alright",
      "Theek hai, samajh gaya",
    ],
    keywords: [],
    answer:
      "Great! If you'd like to go deeper on anything, or have another question, just let me know.",
  },
  {
    id: "basic-bq008-there",
    category: "greetings-and-polite-conversation",
    questions: [
      "Are you there?",
      "Hello? Anyone there?",
      "Kya aap yahan ho?",
    ],
    keywords: [],
    answer:
      "Yes, I'm here. What would you like to ask?",
  },
  {
    id: "basic-bq009-please-wait-moment",
    category: "greetings-and-polite-conversation",
    questions: [
      "Please wait a moment",
      "Give me a minute",
      "Ek minute ruko",
    ],
    keywords: [],
    answer:
      "Sure, take your time. I'll be here when you're ready to continue.",
  },
  {
    id: "basic-bq010-was-helpful",
    category: "greetings-and-polite-conversation",
    questions: [
      "That was helpful",
      "Great answer",
      "Ye helpful tha",
    ],
    keywords: [],
    answer:
      "I'm glad it helped! If you'd like to discuss your own requirements in detail, the Contact us option will connect you with the CoreD team.",
    action: "contact",
  },
  {
    id: "basic-bq011-name",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "What is your name?",
      "What should I call you?",
      "Aapka naam kya hai?",
    ],
    keywords: ["name"],
    answer:
      "I'm the CoreD Assistant, the chat helper on this website. I'm a program, not a person, and I answer from a prepared set of information about CoreD.",
  },
  {
    id: "basic-bq012-created",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "Who created you?",
      "Who built this chat assistant?",
      "Tumhe kisne banaya?",
    ],
    keywords: ["created"],
    answer:
      "I'm the CoreD website assistant, set up to answer common questions about CoreD's CRM services. I don't have more verified detail about how I was built, so for that please ask the CoreD team.",
  },
  {
    id: "basic-bq013-use-chat",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "How do I use this chat?",
      "How should I ask my question?",
      "Is chat ko kaise use karun?",
    ],
    keywords: ["use chat"],
    answer:
      "Just type your question in the box in plain words, for example 'What plans do you offer?' or 'Can you build a custom CRM?'. You can also tap the suggested questions. English and Hinglish both work.",
  },
  {
    id: "basic-bq014-type-hinglish",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "Can I type in Hinglish?",
      "Can I ask in Hindi words using English letters?",
      "Kya main Hinglish mein pooch sakta hoon?",
    ],
    keywords: ["type hinglish"],
    answer:
      "Yes, you can type in English or Hinglish, such as 'Basic plan kya hai?'. If I can't match your question I'll say so rather than guess, and you can rephrase it or use Contact us.",
    action: "contact",
  },
  {
    id: "basic-bq015-didn-t-understand-answer",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "I didn't understand your answer",
      "Can you explain that more simply?",
      "Samajh nahi aaya, simple mein batao",
    ],
    keywords: ["didn t understand answer"],
    answer:
      "Sorry about that. Please tell me which part was unclear, or ask the question again in simpler words, and I'll explain it in a shorter, plainer way.",
  },
  {
    id: "basic-bq016-repeat",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "Can you repeat that?",
      "Say that again please",
      "Dobara batao",
    ],
    keywords: ["repeat"],
    answer:
      "Of course. Please scroll up to re-read my last answer, or ask the question again and I'll answer it once more.",
  },
  {
    id: "basic-bq017-work",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "Can you do my work for me?",
      "Can you complete my tasks?",
      "Kya aap mera kaam kar doge?",
    ],
    keywords: ["work"],
    answer:
      "I can answer questions about CoreD's CRM services and plans and help you prepare for a discussion with the team. I can't carry out tasks in your own systems or business, but the CoreD team can discuss what could be built for you.",
  },
  {
    id: "basic-bq018-questions-ask-here",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "What questions can I ask here?",
      "What topics do you cover?",
      "Yahan main kya pooch sakta hoon?",
    ],
    keywords: ["questions ask here"],
    answer:
      "You can ask about CoreD, CRM workflows, AI agents and automation, consulting, cybersecurity, proposed plans and requesting a quote. I match questions to our FAQ; use Contact us if your question needs the team to check a specific setup.",
    action: "contact",
  },
  {
    id: "basic-bq019-remember-earlier-questions",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "Do you remember my earlier questions?",
      "Will you remember this conversation tomorrow?",
      "Kya aapko meri pichli baatein yaad rehti hain?",
    ],
    keywords: ["remember earlier questions"],
    answer:
      "I don't have verified information about how long chats are kept, so please don't rely on me remembering earlier conversations. If you have something important, share it with the CoreD team through Contact us.",
    action: "contact",
  },
  {
    id: "basic-bq020-human-reading-chat",
    category: "about-this-assistant-and-how-to-use-the-chat",
    questions: [
      "Is a human reading this chat?",
      "Is anyone from CoreD watching this?",
      "Kya yahan koi insaan baat kar raha hai?",
    ],
    keywords: ["human reading chat"],
    answer:
      "No, you're talking to an automated assistant. I don't have verified details on whether staff review chats. To reach a person, please use the Contact us option on the website.",
    action: "contact",
  },
  {
    id: "basic-bq021-lead-simple-words",
    category: "crm-basics-in-simple-words",
    questions: [
      "What is a lead in simple words?",
      "What does lead mean in sales?",
      "Lead kya hota hai?",
    ],
    keywords: ["lead simple words"],
    answer:
      "A lead is a person or company that has shown some interest in what a business sells, for example by sending an enquiry, filling a form or messaging on WhatsApp, but hasn't bought yet.",
  },
  {
    id: "basic-bq022-difference-between-lead-customer",
    category: "crm-basics-in-simple-words",
    questions: [
      "What is the difference between a lead and a customer?",
      "Lead vs customer",
      "Lead aur customer mein kya fark hai?",
    ],
    keywords: ["difference between lead customer"],
    answer:
      "A lead is someone who has shown interest but hasn't bought. A customer is someone who has already paid for your product or service. A CRM helps you track a person as they move from lead to customer.",
  },
  {
    id: "basic-bq023-sales-pipeline",
    category: "crm-basics-in-simple-words",
    questions: [
      "What is a sales pipeline?",
      "What does pipeline mean in a CRM?",
      "Sales pipeline kya hota hai?",
    ],
    keywords: ["sales pipeline"],
    answer:
      "A sales pipeline is the set of stages a lead moves through before buying, such as new enquiry, contacted, quotation sent and won or lost. It lets a team see where each opportunity stands at a glance.",
  },
  {
    id: "basic-bq024-follow-up-sales",
    category: "crm-basics-in-simple-words",
    questions: [
      "What is a follow-up in sales?",
      "Why are follow-ups needed?",
      "Follow-up ka matlab kya hai?",
    ],
    keywords: ["follow up sales"],
    answer:
      "A follow-up is a later message or call to someone who showed interest, to answer questions or move things forward. Many enquiries are lost simply because nobody followed up on time, which is why CRMs track them.",
  },
  {
    id: "basic-bq025-customer-database",
    category: "crm-basics-in-simple-words",
    questions: [
      "What is a customer database?",
      "What is a contact list in a CRM?",
      "Customer database kya hota hai?",
    ],
    keywords: ["customer database"],
    answer:
      "A customer database is an organised collection of customer details such as names, phone numbers, emails and past conversations. A CRM keeps it in one place so the whole team sees the same, current information.",
  },
  {
    id: "basic-bq026-crm-dashboard",
    category: "crm-basics-in-simple-words",
    questions: [
      "What is a CRM dashboard?",
      "What does a dashboard show?",
      "CRM dashboard kya hota hai?",
    ],
    keywords: ["crm dashboard"],
    answer:
      "A dashboard is a single screen that summarises important information, such as new leads, pending follow-ups and deals in progress. What it shows depends on how the CRM is set up for your business.",
  },
  {
    id: "basic-bq027-crm-better-than-keeping-records",
    category: "crm-basics-in-simple-words",
    questions: [
      "Is a CRM better than keeping records in Excel?",
      "Why use a CRM instead of a spreadsheet?",
      "Excel ki jagah CRM kyun use karein?",
    ],
    keywords: ["crm better than keeping"],
    answer:
      "A spreadsheet works for very small lists. A CRM adds shared access, follow-up tracking, history of conversations and role-based access, which become hard to manage in Excel as the team and data grow.",
  },
  {
    id: "basic-bq028-normally-uses-crm-company",
    category: "crm-basics-in-simple-words",
    questions: [
      "Who normally uses a CRM in a company?",
      "Which teams use CRM software?",
      "CRM company mein kaun use karta hai?",
    ],
    keywords: ["normally uses crm company"],
    answer:
      "Sales teams use it most, but marketing, customer support, account managers and business owners also use it to see leads, customers, tasks and progress.",
  },
  {
    id: "basic-bq029-main-parts-crm",
    category: "crm-basics-in-simple-words",
    questions: [
      "What are the main parts of a CRM?",
      "What does a CRM usually include?",
      "CRM ke main parts kya hote hain?",
    ],
    keywords: ["main parts crm"],
    answer:
      "A CRM typically has contact records, a lead or deal pipeline, tasks and reminders, a history of conversations and some reporting. The exact modules in a CoreD solution depend on the option and requirements, so please confirm with the team.",
  },
  {
    id: "basic-bq030-cloud-based-crm-mean",
    category: "crm-basics-in-simple-words",
    questions: [
      "What does cloud-based CRM mean?",
      "Is a CRM online or installed on a computer?",
      "Cloud CRM ka matlab kya hai?",
    ],
    keywords: ["cloud based crm mean"],
    answer:
      "A cloud-based CRM runs on internet servers and is opened through a browser or app, instead of being installed on one computer. I don't have verified hosting details for CoreD's CRM, so please ask the team how yours would be hosted.",
  },
  {
    id: "basic-bq031-manage-customers-properly",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How do I manage my customers properly?",
      "How should I keep track of all my customers?",
      "Apne customers ko kaise manage karein?",
    ],
    keywords: ["manage customers properly"],
    answer:
      "Keep each customer's details, conversations and next action in one place, assign an owner to every customer, and review follow-ups daily. A CRM is designed to make exactly this easier.",
  },
  {
    id: "basic-bq032-manage-leads-different-sources",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How can I manage leads from different sources?",
      "How do I handle leads coming from calls, WhatsApp and forms?",
      "Alag-alag jagah se aaye leads ko kaise manage karein?",
    ],
    keywords: ["manage leads different sources"],
    answer:
      "Collect every enquiry into one list, note the source, assign it to a person and set the next follow-up date. Using one shared place avoids leads being forgotten on personal phones or notebooks.",
  },
  {
    id: "basic-bq033-make-sure-never-miss-follow",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How do I make sure I never miss a follow-up?",
      "How can I remember to call customers back?",
      "Follow-up miss na ho iske liye kya karein?",
    ],
    keywords: ["make sure never miss"],
    answer:
      "Write a follow-up date every time you speak to a lead, check a daily task list each morning and use reminders. A CRM can hold these dates and reminders for the whole team.",
  },
  {
    id: "basic-bq034-plan-daily-sales-tasks",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How should I plan my daily sales tasks?",
      "What should a salesperson do every day?",
      "Roz ke sales tasks ka plan kaise banayein?",
    ],
    keywords: ["plan daily sales tasks"],
    answer:
      "Start with today's follow-ups, then new enquiries, then quotations or pending replies, and end by updating notes. Planning by priority, with the hottest leads first, is a good habit.",
  },
  {
    id: "basic-bq035-manage-team-without-micromanaging",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How can I manage a team without micromanaging?",
      "How do I track my team's work easily?",
      "Team ka kaam bina baar-baar poochhe kaise dekhein?",
    ],
    keywords: ["manage team without micromanaging"],
    answer:
      "Agree clear targets, give each person owned tasks and use a shared view of progress so you can see status without asking. Review weekly instead of checking every action.",
  },
  {
    id: "basic-bq036-handle-customer-complaint",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How do I handle a customer complaint?",
      "What is the right way to respond to an unhappy customer?",
      "Naraz customer ko kaise handle karein?",
    ],
    keywords: ["handle customer complaint"],
    answer:
      "Listen first, acknowledge the problem, record the details, give a realistic next step and follow up when promised. Keeping a written record helps the next person continue smoothly.",
  },
  {
    id: "basic-bq037-keep-repeat-customers-coming-back",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How do I keep repeat customers coming back?",
      "How can I stay in touch with old customers?",
      "Purane customers ko wapas kaise layein?",
    ],
    keywords: ["keep repeat customers coming"],
    answer:
      "Keep their purchase history, remember important dates, check in politely from time to time and solve problems quickly. A CRM helps by storing the history so nothing depends on memory.",
  },
  {
    id: "basic-bq038-organise-enquiries-get-too-many",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How do I organise my enquiries when I get too many?",
      "I am getting too many messages, what should I do?",
      "Bahut zyada enquiries aa rahi hain, kaise sambhalein?",
    ],
    keywords: ["organise enquiries get too"],
    answer:
      "Sort them by urgency and interest, reply to the most promising first and keep a single list with status for each. If volume keeps growing, a CRM or automation may be worth discussing.",
  },
  {
    id: "basic-bq039-stay-top-quotations-proposals",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How do I stay on top of quotations and proposals?",
      "How do I track which quotes are pending?",
      "Quotation ka status kaise track karein?",
    ],
    keywords: ["stay top quotations proposals"],
    answer:
      "Record the date each quotation was sent, the amount and a follow-up date. Then review the pending list weekly and ask each lead for a decision.",
  },
  {
    id: "basic-bq040-save-time-repetitive-office-work",
    category: "how-to-manage-everyday-business-work",
    questions: [
      "How can I save time on repetitive office work?",
      "What office tasks can be made easier with software?",
      "Repetitive kaam ka time kaise bachayein?",
    ],
    keywords: ["save time repetitive office"],
    answer:
      "List tasks you repeat often, such as sending the same reply or updating the same sheet, and see which follow fixed steps. Those are the best candidates for templates or automation.",
  },
  {
    id: "basic-bq041-work-responsibility-sales-executive",
    category: "work-roles-and-responsibilities",
    questions: [
      "What is the work responsibility of a sales executive?",
      "What does a sales executive do?",
      "Sales executive ki zimmedari kya hoti hai?",
    ],
    keywords: ["work responsibility sales executive"],
    answer:
      "A sales executive usually follows up with leads, explains the product or service, prepares quotations, closes deals and keeps customer records updated.",
  },
  {
    id: "basic-bq042-crm-administrator",
    category: "work-roles-and-responsibilities",
    questions: [
      "What does a CRM administrator do?",
      "What are the duties of a CRM admin?",
      "CRM admin ka kaam kya hota hai?",
    ],
    keywords: ["crm administrator"],
    answer:
      "A CRM admin manages user accounts and permissions, keeps fields and workflows set up correctly, checks data quality and helps staff use the system.",
  },
  {
    id: "basic-bq043-role-manager-using-crm",
    category: "work-roles-and-responsibilities",
    questions: [
      "What is the role of a manager in using a CRM?",
      "How should a manager use the CRM?",
      "CRM mein manager ka role kya hota hai?",
    ],
    keywords: ["role manager using crm"],
    answer:
      "A manager reviews the pipeline, checks that follow-ups are happening, supports the team on difficult deals and uses reports to plan targets.",
  },
  {
    id: "basic-bq044-responsibilities-customer-support-executive",
    category: "work-roles-and-responsibilities",
    questions: [
      "What are the responsibilities of a customer support executive?",
      "What does a support team member do?",
      "Customer support executive kya kaam karta hai?",
    ],
    keywords: ["responsibilities customer support executive"],
    answer:
      "A support executive answers customer questions, records issues, solves or escalates problems and follows up until the customer is satisfied.",
  },
  {
    id: "basic-bq045-staff-update-crm-every-day",
    category: "work-roles-and-responsibilities",
    questions: [
      "What should my staff update in the CRM every day?",
      "Which details should employees record daily?",
      "Staff ko roz CRM mein kya update karna chahiye?",
    ],
    keywords: ["staff update crm every"],
    answer:
      "They should record new leads, calls and messages, notes of what was discussed, the next follow-up date and any change in the lead's status.",
  },
  {
    id: "basic-bq046-responsible-keeping-crm-data-accurate",
    category: "work-roles-and-responsibilities",
    questions: [
      "Who should be responsible for keeping CRM data accurate?",
      "Whose job is it to keep records clean?",
      "CRM data sahi rakhne ki zimmedari kiski hai?",
    ],
    keywords: ["responsible keeping crm data"],
    answer:
      "Everyone who enters data is responsible for its accuracy, and one named owner, often a manager or admin, should check quality and fix problems regularly.",
  },
  {
    id: "basic-bq047-difference-between-role-task",
    category: "work-roles-and-responsibilities",
    questions: [
      "What is the difference between a role and a task?",
      "Role vs task",
      "Role aur task mein kya fark hai?",
    ],
    keywords: ["difference between role task"],
    answer:
      "A role is a person's ongoing position and responsibilities, such as sales executive. A task is one specific piece of work with a due date, such as calling a lead tomorrow.",
  },
  {
    id: "basic-bq048-assign-work-team-members-clearly",
    category: "work-roles-and-responsibilities",
    questions: [
      "How do I assign work to team members clearly?",
      "How can I delegate tasks properly?",
      "Team members ko kaam kaise assign karein?",
    ],
    keywords: ["assign work team members"],
    answer:
      "State what needs to be done, who owns it, the deadline and what a good result looks like. Writing it in a shared tool avoids confusion about who is doing what.",
  },
  {
    id: "basic-bq049-accountability-mean-work",
    category: "work-roles-and-responsibilities",
    questions: [
      "What does accountability mean at work?",
      "What is accountability in a team?",
      "Accountability ka matlab kya hai?",
    ],
    keywords: ["accountability mean work"],
    answer:
      "Accountability means a person owns an outcome and answers for it. It works best when responsibilities are clear and progress is visible to everyone involved.",
  },
  {
    id: "basic-bq050-work-ai-assistant-take-over",
    category: "work-roles-and-responsibilities",
    questions: [
      "What work can an AI assistant take over, and what should stay with people?",
      "Which tasks suit an AI helper?",
      "AI kaun sa kaam kar sakta hai aur kaun sa insaan ko karna chahiye?",
    ],
    keywords: ["work ai assistant take"],
    answer:
      "Repetitive, rule-based work like first replies, sorting and reminders suits an AI helper. Decisions about pricing, exceptions, sensitive customers and final approvals should stay with people. The exact split should be agreed per business.",
  },
  {
    id: "basic-bq051-ai-simple-words",
    category: "ai-and-automation-basics",
    questions: [
      "What is AI in simple words?",
      "What does artificial intelligence mean?",
      "AI kya hota hai?",
    ],
    keywords: ["ai simple words"],
    answer:
      "AI, or artificial intelligence, is software that can do tasks that normally need human thinking, such as understanding language, spotting patterns or suggesting replies.",
  },
  {
    id: "basic-bq052-automation",
    category: "ai-and-automation-basics",
    questions: [
      "What is automation?",
      "What does automation mean?",
      "Automation kya hota hai?",
    ],
    keywords: ["automation"],
    answer:
      "Automation means setting software to perform a task by itself according to fixed rules, such as sending a reminder every time a lead is added.",
  },
  {
    id: "basic-bq053-difference-between-ai-automation",
    category: "ai-and-automation-basics",
    questions: [
      "What is the difference between AI and automation?",
      "AI vs automation",
      "AI aur automation mein kya difference hai?",
    ],
    keywords: ["difference between ai automation"],
    answer:
      "Automation follows fixed rules you define in advance. AI can handle flexible inputs like free-text messages and make judgement-style choices. Many solutions combine both.",
  },
  {
    id: "basic-bq054-chatbot",
    category: "ai-and-automation-basics",
    questions: [
      "What is a chatbot?",
      "What does a chat bot do?",
      "Chatbot kya hota hai?",
    ],
    keywords: ["chatbot"],
    answer:
      "A chatbot is a program that talks with people through chat. Simple ones follow scripts, while newer ones use AI to understand free-form questions.",
  },
  {
    id: "basic-bq055-generative-ai",
    category: "ai-and-automation-basics",
    questions: [
      "What is generative AI?",
      "What is ChatGPT-style AI?",
      "Generative AI kya hota hai?",
    ],
    keywords: ["generative ai"],
    answer:
      "Generative AI creates new content such as text, images or summaries from a prompt, rather than only sorting or analysing existing data.",
  },
  {
    id: "basic-bq056-prompt",
    category: "ai-and-automation-basics",
    questions: [
      "What is a prompt?",
      "What does prompt mean in AI?",
      "Prompt kya hota hai?",
    ],
    keywords: ["prompt"],
    answer:
      "A prompt is the instruction or question you give an AI system. Clear, specific prompts usually give better answers.",
  },
  {
    id: "basic-bq057-ai-make-mistakes",
    category: "ai-and-automation-basics",
    questions: [
      "Can AI make mistakes?",
      "Is AI always correct?",
      "Kya AI galat jawab de sakta hai?",
    ],
    keywords: ["ai make mistakes"],
    answer:
      "Yes. AI can misunderstand a request or give an incorrect answer, so important information should be checked by a person, especially for prices, policies and legal or financial matters.",
  },
  {
    id: "basic-bq058-need-technical-knowledge-use-ai",
    category: "ai-and-automation-basics",
    questions: [
      "Do I need technical knowledge to use an AI agent?",
      "Is AI difficult for a non-technical person?",
      "AI use karne ke liye technical knowledge chahiye?",
    ],
    keywords: ["need technical knowledge use"],
    answer:
      "Not necessarily for everyday use, since you interact in plain language. Setup usually needs technical help, which is where a provider such as CoreD can discuss a solution with you.",
  },
  {
    id: "basic-bq059-ai-take-over-job",
    category: "ai-and-automation-basics",
    questions: [
      "Will AI take over my job?",
      "Is AI going to replace employees?",
      "Kya AI meri naukri le lega?",
    ],
    keywords: ["ai take over job"],
    answer:
      "AI is generally used to take over repetitive tasks so that people can focus on judgement and relationships. How much it changes any job depends on the role and the business, and I can't predict it.",
  },
  {
    id: "basic-bq060-small-business-start-using-ai",
    category: "ai-and-automation-basics",
    questions: [
      "How can a small business start using AI?",
      "Where should a small company begin with AI?",
      "Chhota business AI kaise shuru kare?",
    ],
    keywords: ["small business start using"],
    answer:
      "Start with one repetitive task that takes time, such as answering common questions or sorting enquiries, try a small pilot and measure the result before expanding.",
  },
  {
    id: "basic-bq061-very-small-business-really-need",
    category: "getting-started-and-small-business-basics",
    questions: [
      "Does a very small business really need a CRM?",
      "Is a CRM useful if I only have a few customers?",
      "Bahut chhote business ko CRM chahiye?",
    ],
    keywords: ["very small business really"],
    answer:
      "Not always. With a handful of customers a simple list may be enough. A CRM becomes valuable when leads, follow-ups or team members grow beyond what you can track by memory or a spreadsheet.",
  },
  {
    id: "basic-bq062-right-time-start-using-crm",
    category: "getting-started-and-small-business-basics",
    questions: [
      "When is the right time to start using a CRM?",
      "How do I know I need a CRM now?",
      "CRM kab use karna shuru karna chahiye?",
    ],
    keywords: ["right time start using"],
    answer:
      "Common signs are missed follow-ups, scattered customer information, several people handling the same leads and difficulty seeing what is happening in sales.",
  },
  {
    id: "basic-bq063-first-want-crm",
    category: "getting-started-and-small-business-basics",
    questions: [
      "What should I do first if I want a CRM?",
      "Where do I begin with a CRM project?",
      "CRM lena ho to pehle kya karein?",
    ],
    keywords: ["first want crm"],
    answer:
      "Write down how enquiries come in and what happens next, note where things get stuck and list what you want to track. That gives a clear brief for a conversation with CoreD or any provider.",
  },
  {
    id: "basic-bq064-choose-right-crm-business",
    category: "getting-started-and-small-business-basics",
    questions: [
      "How do I choose the right CRM for my business?",
      "What should I look for in a CRM?",
      "Sahi CRM kaise chunein?",
    ],
    keywords: ["choose right crm business"],
    answer:
      "Compare how well it fits your workflow, how easy it is for your team to use, what integrations you need, the support offered, and the total cost. Ask for confirmed details in writing.",
  },
  {
    id: "basic-bq065-signs-have-outgrown-spreadsheet",
    category: "getting-started-and-small-business-basics",
    questions: [
      "What are the signs I have outgrown my spreadsheet?",
      "When is Excel not enough for customer tracking?",
      "Excel kab kam padne lagta hai?",
    ],
    keywords: ["signs have outgrown spreadsheet"],
    answer:
      "Duplicate entries, outdated copies, no reminders, nobody knowing who contacted a lead and slow searching all suggest it is time to move to a proper system.",
  },
  {
    id: "basic-bq066-get-team-actually-use-new",
    category: "getting-started-and-small-business-basics",
    questions: [
      "How do I get my team to actually use a new system?",
      "How can I make employees adopt a CRM?",
      "Team naya system use kare iske liye kya karein?",
    ],
    keywords: ["get team actually use"],
    answer:
      "Keep it simple, explain the benefit to each person, train them with real examples, make one person responsible for support and have managers use it in their own reviews.",
  },
  {
    id: "basic-bq067-common-mistakes-starting-crm",
    category: "getting-started-and-small-business-basics",
    questions: [
      "What are common mistakes when starting with a CRM?",
      "What should I avoid when setting up a CRM?",
      "CRM shuru karte waqt kaun si galtiyan na karein?",
    ],
    keywords: ["common mistakes starting crm"],
    answer:
      "Common mistakes include too many fields, no clear owner, messy imported data, skipping staff training and expecting results without changing habits.",
  },
  {
    id: "basic-bq068-know-whether-crm-working-business",
    category: "getting-started-and-small-business-basics",
    questions: [
      "How do I know whether a CRM is working for my business?",
      "How can I measure CRM success?",
      "CRM kaam kar raha hai ya nahi, kaise pata karein?",
    ],
    keywords: ["know whether crm working"],
    answer:
      "Look at things like faster follow-up, fewer lost leads, clearer reporting and better team visibility. Set simple measures before you start so you can compare later.",
  },
  {
    id: "basic-bq069-start-small-add-more-later",
    category: "getting-started-and-small-business-basics",
    questions: [
      "Can I start small and add more later?",
      "Do I have to set up everything at once?",
      "Kya pehle chhota start karke baad mein badha sakte hain?",
    ],
    keywords: ["start small add more"],
    answer:
      "Starting with one workflow and expanding later is a common, sensible approach. How CoreD handles phased growth should be confirmed with the team; Basic, Standard and Custom options exist for different needs.",
  },
  {
    id: "basic-bq070-information-need-share-get-advice",
    category: "getting-started-and-small-business-basics",
    questions: [
      "What information do I need to share to get advice?",
      "What should I tell a CRM provider about my business?",
      "Salah lene ke liye kya details deni hongi?",
    ],
    keywords: ["information need share get"],
    answer:
      "Describe what your business does, how enquiries arrive, who handles them, your pain points and what you would like to improve. The more concrete your example, the more useful the advice.",
  },
  {
    id: "basic-bq071-quickly-reply-new-enquiry",
    category: "customer-communication-basics",
    questions: [
      "How quickly should I reply to a new enquiry?",
      "What is a good response time for leads?",
      "Nayi enquiry ka reply kitni jaldi dena chahiye?",
    ],
    keywords: ["quickly reply new enquiry"],
    answer:
      "As quickly as realistically possible. Interest fades quickly, so a prompt acknowledgement, even a short one, is better than a perfect reply sent much later.",
  },
  {
    id: "basic-bq072-write-good-follow-up-message",
    category: "customer-communication-basics",
    questions: [
      "How do I write a good follow-up message?",
      "What should a follow-up message say?",
      "Achha follow-up message kaise likhein?",
    ],
    keywords: ["write good follow up"],
    answer:
      "Keep it short, mention what you discussed, ask one clear question or give one next step, and be polite. Avoid repeating the same message again and again.",
  },
  {
    id: "basic-bq073-response-time-customer-service",
    category: "customer-communication-basics",
    questions: [
      "What is response time in customer service?",
      "What does first response time mean?",
      "Response time kya hota hai?",
    ],
    keywords: ["response time customer service"],
    answer:
      "Response time is how long it takes a customer to receive a reply after contacting you. Shorter, predictable response times usually mean happier customers.",
  },
  {
    id: "basic-bq074-stay-professional-whatsapp-customers",
    category: "customer-communication-basics",
    questions: [
      "How do I stay professional on WhatsApp with customers?",
      "How should a business use WhatsApp for customers?",
      "Customers ke saath WhatsApp par professional kaise rahein?",
    ],
    keywords: ["stay professional whatsapp customers"],
    answer:
      "Use a clear greeting, correct spelling, business hours, a consistent tone and respect for consent. Keep records of important decisions outside the chat too.",
  },
  {
    id: "basic-bq075-listening-customer-important",
    category: "customer-communication-basics",
    questions: [
      "Why is listening to the customer important?",
      "How does understanding customers help sales?",
      "Customer ki baat sunna kyun zaroori hai?",
    ],
    keywords: ["listening customer important"],
    answer:
      "Understanding what a customer actually needs lets you offer the right solution and avoid wasted effort. Notes taken during the conversation also make later follow-ups more relevant.",
  },
  {
    id: "basic-bq076-customer-retention",
    category: "customer-communication-basics",
    questions: [
      "What is customer retention?",
      "What does retaining customers mean?",
      "Customer retention kya hota hai?",
    ],
    keywords: ["customer retention"],
    answer:
      "Customer retention is the ability to keep existing customers buying or staying with you over time, usually cheaper than finding new ones.",
  },
  {
    id: "basic-bq077-customer-journey",
    category: "customer-communication-basics",
    questions: [
      "What is a customer journey?",
      "What does customer journey mean?",
      "Customer journey kya hota hai?",
    ],
    keywords: ["customer journey"],
    answer:
      "A customer journey is the path a person takes from first hearing about you to buying and beyond, including every contact along the way.",
  },
  {
    id: "basic-bq078-customer-satisfaction-measured",
    category: "customer-communication-basics",
    questions: [
      "What is customer satisfaction and how can it be measured?",
      "How do I know if my customers are happy?",
      "Customer khush hai ya nahi, kaise pata karein?",
    ],
    keywords: ["customer satisfaction measured"],
    answer:
      "Satisfaction is how happy customers are with your product and service. You can measure it with short surveys, ratings after service and by watching complaints and repeat purchases.",
  },
  {
    id: "basic-bq079-say-no-politely-customer-request",
    category: "customer-communication-basics",
    questions: [
      "How do I say no politely to a customer request?",
      "How can I decline a request without losing the customer?",
      "Customer ko politely mana kaise karein?",
    ],
    keywords: ["say no politely customer"],
    answer:
      "Thank them, explain honestly what you can't do and why, and offer an alternative if there is one. A clear, respectful no usually protects the relationship.",
  },
  {
    id: "basic-bq080-message-template-use-one",
    category: "customer-communication-basics",
    questions: [
      "What is a message template and why use one?",
      "What are canned responses?",
      "Message template kya hota hai?",
    ],
    keywords: ["message template use one"],
    answer:
      "A message template is a pre-written reply you reuse for common situations. It saves time and keeps your wording consistent, and you can personalise it before sending.",
  },
  {
    id: "basic-bq081-call-email-cored-directly",
    category: "website-contact-and-support-help",
    questions: [
      "Can I call or email CoreD directly?",
      "Do you have a phone number or email address?",
      "Kya main seedha call ya email kar sakta hoon?",
    ],
    keywords: ["call email cored directly"],
    answer:
      "For general enquiries, email info@coredhristi.com. For support, use support@coredhristi.com. You can also use Contact us on this website. I do not have a confirmed phone number to share.",
    action: "contact",
  },
  {
    id: "basic-bq082-where-see-cored-s-services",
    category: "website-contact-and-support-help",
    questions: [
      "Where can I see CoreD's services on the website?",
      "Where is the Services section?",
      "Website par services kahan dikhengi?",
    ],
    keywords: ["where see cored s"],
    answer:
      "Open Services from the navigation. The five service categories are AI-Powered CRM, AI Agents, AI Consulting, AI Cybersecurity Consulting and Cybersecurity. Each has a Custom option.",
    action: "contact",
  },
  {
    id: "basic-bq083-cored-s-office-hours",
    category: "website-contact-and-support-help",
    questions: [
      "What are CoreD's office hours?",
      "When is CoreD available?",
      "CoreD kitne baje tak available hai?",
    ],
    keywords: ["cored s office hours"],
    answer:
      "I don't have verified information about office hours. Please use Contact us and the team can tell you when they are available.",
    action: "contact",
  },
  {
    id: "basic-bq084-where-cored-located",
    category: "website-contact-and-support-help",
    questions: [
      "Where is CoreD located?",
      "What is CoreD's address?",
      "CoreD ka office kahan hai?",
    ],
    keywords: ["where cored located"],
    answer:
      "I don't have a verified address to share in this chat. Please ask the team through Contact us for location details.",
    action: "contact",
  },
  {
    id: "basic-bq085-long-cored-take-reply-message",
    category: "website-contact-and-support-help",
    questions: [
      "How long will CoreD take to reply to my message?",
      "When will the team get back to me?",
      "CoreD kitne time mein reply karega?",
    ],
    keywords: ["long cored take reply"],
    answer:
      "I don't have a confirmed reply time. Please mention your requirement clearly in the Contact us message so the team can respond properly.",
    action: "contact",
  },
  {
    id: "basic-bq086-free-ask-questions-discuss-idea",
    category: "website-contact-and-support-help",
    questions: [
      "Is it free to ask questions or discuss my idea?",
      "Do I have to pay to talk to the team?",
      "Kya baat karne ke liye paise lagte hain?",
    ],
    keywords: ["free ask questions discuss"],
    answer:
      "Asking me questions in this chat is free. I don't have verified information about the charges, if any, for consultations, so please confirm with the team.",
    action: "contact",
  },
  {
    id: "basic-bq087-write-contact-message",
    category: "website-contact-and-support-help",
    questions: [
      "What should I write in the Contact us message?",
      "What details should I include when I contact CoreD?",
      "Contact us mein kya likhna chahiye?",
    ],
    keywords: ["write contact message"],
    answer:
      "Share your name, company, the problem you want to solve, the service or plan you are considering, the systems involved and how to reach you. Basic AI Agents includes one Basic option; Standard includes one Standard option plus one Basic option. Describe other needs as a Custom request, without sending passwords or sensitive customer records.",
    action: "contact",
  },
  {
    id: "basic-bq088-have-problem-existing-crm-ask",
    category: "website-contact-and-support-help",
    questions: [
      "I have a problem with my existing CRM. Who can I ask?",
      "Who can help with a CRM issue?",
      "Mere CRM mein problem hai, kisse poochun?",
    ],
    keywords: ["have problem existing crm"],
    answer:
      "For support with a CoreD solution, email support@coredhristi.com and describe the issue without sending passwords or sensitive customer records. Use Contact us for help scoping work on another CRM. I cannot see your account or fix technical problems from this chat.",
    action: "contact",
  },
  {
    id: "basic-bq089-share-requirements-chat-instead-form",
    category: "website-contact-and-support-help",
    questions: [
      "Can I share my requirements in this chat instead of a form?",
      "Can I describe my project here?",
      "Kya main apni requirement yahin likh sakta hoon?",
    ],
    keywords: ["share requirements chat instead"],
    answer:
      "You can tell me about your needs and I'll explain what I can. I can't take a project order here, so for the team to act on it please send the details through Contact us.",
    action: "contact",
  },
  {
    id: "basic-bq090-see-demo-crm-here",
    category: "website-contact-and-support-help",
    questions: [
      "Can I see a demo of the CRM here?",
      "Is there a live demo on this chat?",
      "Kya yahan demo dekh sakte hain?",
    ],
    keywords: ["see demo crm here"],
    answer:
      "I don't have a verified demo to show here. Please ask the CoreD team through Contact us whether a demonstration can be arranged.",
    action: "contact",
  },
  {
    id: "basic-bq091-prioritise-tasks-everything-feels-urgent",
    category: "productivity-and-general-business-terms",
    questions: [
      "How do I prioritise tasks when everything feels urgent?",
      "How can I decide what to do first?",
      "Sab kuch urgent lagta hai, priority kaise tay karein?",
    ],
    keywords: ["prioritise tasks everything feels"],
    answer:
      "List tasks, mark which ones have a real deadline or high value, do those first and schedule the rest. Reviewing the list at the start of each day keeps it manageable.",
  },
  {
    id: "basic-bq092-kpi",
    category: "productivity-and-general-business-terms",
    questions: [
      "What is a KPI?",
      "What does KPI mean in business?",
      "KPI kya hota hai?",
    ],
    keywords: ["kpi"],
    answer:
      "A KPI, or key performance indicator, is a measurable number that shows how well something is going, such as the number of leads followed up per week.",
  },
  {
    id: "basic-bq093-business-report-useful",
    category: "productivity-and-general-business-terms",
    questions: [
      "What is a business report and why is it useful?",
      "Why do companies make reports?",
      "Business report kya hoti hai?",
    ],
    keywords: ["business report useful"],
    answer:
      "A report summarises numbers or events so decision makers can see what is happening, spot problems and plan next steps.",
  },
  {
    id: "basic-bq094-workflow",
    category: "productivity-and-general-business-terms",
    questions: [
      "What is a workflow?",
      "What does workflow mean?",
      "Workflow kya hota hai?",
    ],
    keywords: ["workflow"],
    answer:
      "A workflow is the series of steps a piece of work goes through from start to finish, such as enquiry received, reply sent, quotation made, order confirmed.",
  },
  {
    id: "basic-bq095-reminder-system-use",
    category: "productivity-and-general-business-terms",
    questions: [
      "What is a reminder system and why use it?",
      "How do reminders help a business?",
      "Reminder system kyun use karte hain?",
    ],
    keywords: ["reminder system use"],
    answer:
      "Reminders prompt people to do a task at the right time, such as calling a lead back. They reduce reliance on memory and help prevent missed opportunities.",
  },
  {
    id: "basic-bq096-integration-mean-simple-terms",
    category: "productivity-and-general-business-terms",
    questions: [
      "What does an integration mean in simple terms?",
      "What does connecting two apps mean?",
      "Integration ka matlab kya hai?",
    ],
    keywords: ["integration mean simple terms"],
    answer:
      "An integration connects two software tools so they can share information automatically, for example sending form submissions into a customer list.",
  },
  {
    id: "basic-bq097-data-entry-errors-reduced",
    category: "productivity-and-general-business-terms",
    questions: [
      "What is data entry and how can errors be reduced?",
      "How do I avoid mistakes when typing customer details?",
      "Data entry mein galtiyan kaise kam karein?",
    ],
    keywords: ["data entry errors reduced"],
    answer:
      "Data entry means typing information into a system. Errors fall with dropdown choices, required fields, simple formats, regular checks and by capturing data once instead of retyping.",
  },
  {
    id: "basic-bq098-scalable-mean-business-system",
    category: "productivity-and-general-business-terms",
    questions: [
      "What does scalable mean for a business system?",
      "What is scalability?",
      "Scalable ka kya matlab hota hai?",
    ],
    keywords: ["scalable mean business system"],
    answer:
      "A scalable system can handle growth, such as more users, customers or data, without needing to be replaced. How far a given CRM scales depends on its design.",
  },
  {
    id: "basic-bq099-often-team-review-its-customer",
    category: "productivity-and-general-business-terms",
    questions: [
      "How often should a team review its customer list?",
      "How regularly should I clean my contact data?",
      "Customer list kitni baar review karni chahiye?",
    ],
    keywords: ["often team review its"],
    answer:
      "A quick weekly check of follow-ups and a deeper monthly or quarterly clean-up of duplicates and outdated contacts is a practical routine.",
  },
  {
    id: "basic-bq100-business-process",
    category: "productivity-and-general-business-terms",
    questions: [
      "What is a business process?",
      "What does process mean in a company?",
      "Business process kya hota hai?",
    ],
    keywords: ["business process"],
    answer:
      "A business process is a repeatable set of activities a company uses to get something done, such as handling a new enquiry or approving an invoice.",
  },
];
