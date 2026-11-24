<?php

// Replaces upstream's "Help & Resources" content (which promotes the upstream vendor's paid services) with CoreDhristi contacts.
// Titles/descriptions are plain strings (the view passes them through @lang(), which returns unknown keys unchanged).
return [
    'services' => [
        ['icon' => 'support', 'title' => 'Support', 'description' => 'Questions about your CRM workspace, access or data? Write to our support desk.', 'url' => 'mailto:support@coredhristi.com', 'url_label' => 'support@coredhristi.com'],
        ['icon' => 'extensions', 'title' => 'New enquiries and projects', 'description' => 'Talk to CoreDhristi about automation, AI agents, cloud infrastructure or web development.', 'url' => 'mailto:info@coredhristi.com', 'url_label' => 'info@coredhristi.com'],
    ],
    'resources' => [
        ['icon' => 'docs', 'title' => 'CoreDhristi website', 'description' => 'Services, pricing and project work.', 'url' => 'https://coredhristi.com/', 'url_label' => 'coredhristi.com'],
        ['icon' => 'docs', 'title' => 'Privacy Policy', 'description' => 'How CoreDhristi handles personal data.', 'url' => 'https://coredhristi.com/privacyPolicy', 'url_label' => 'coredhristi.com/privacyPolicy'],
        ['icon' => 'docs', 'title' => 'Terms & Conditions', 'description' => 'The terms that apply to CoreDhristi services.', 'url' => 'https://coredhristi.com/termsCondition', 'url_label' => 'coredhristi.com/termsCondition'],
    ],
    'community' => [],
    'contact_url' => 'mailto:support@coredhristi.com',
];
