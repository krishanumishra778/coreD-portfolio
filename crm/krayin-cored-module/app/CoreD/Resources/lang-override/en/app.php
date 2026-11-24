<?php

// Installed to lang/vendor/admin/en/app.php. Laravel merges this over the package file (array_replace_recursive),
// so only the strings that carry upstream branding are listed here.
return [
    'components' => [
        'layouts' => [
            'powered-by' => ['description' => 'CoreDhristi CRM'],
        ],
    ],
    'help' => [
        'index' => [
            'title' => 'Help & Support',
            'description' => 'Contact CoreDhristi for help with this CRM workspace.',
            'contact-us' => 'Contact support',
            'still-need-help-title' => 'Still need a hand?',
            'still-need-help-description' => 'Write to the CoreDhristi support desk and we will get back to you.',
            'services' => ['title' => 'Contact'],
            'resources' => ['title' => 'Policies and website'],
        ],
    ],
];
