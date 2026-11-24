<?php

return [
    // Turnstile. mode "required" fails closed when no secret is configured.
    'turnstile' => [
        'secret' => env('CORED_TURNSTILE_SECRET'),
        'mode' => env('CORED_TURNSTILE_MODE', 'required'), // required | off (off is refused when APP_ENV=production unless forced)
        'allowed_hostnames' => array_filter(array_map('trim', explode(',', (string) env('CORED_TURNSTILE_HOSTNAMES', '')))),
        'verify_url' => 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    ],
    'rate_limits' => [
        'intake_per_minute_ip' => (int) env('CORED_RL_INTAKE_IP', 5),
        'intake_per_hour_email' => (int) env('CORED_RL_INTAKE_EMAIL', 5),
        'booking_per_minute_ip' => (int) env('CORED_RL_BOOKING_IP', 5),
        'read_per_minute_ip' => (int) env('CORED_RL_READ_IP', 60),
    ],
    'owner_user_id' => env('CORED_OWNER_USER_ID'), // CRM user that owns booking activities (defaults to the first user)
    'dedupe_window_minutes' => 15,
    'sources' => [
        'contact' => 'Website - Reach Us Out',
        'faq_chatbot' => 'Website - FAQ chatbot',
        'booking' => 'Website - Appointment',
    ],
    'booking' => [
        'timezone' => env('CORED_BOOKING_TZ', 'Asia/Kolkata'),
        'min_notice_hours' => 12,
        'max_days_ahead' => 45,
        'slot_minutes' => 30,
        'services' => ['Cloud & AI infrastructure', 'Web development', 'Automation & AI agents', 'General consultation'],
        'channels' => ['phone', 'email', 'whatsapp'],
    ],
    // Public API is hidden unless explicitly enabled; keeps the module inert until configured.
    'public_api_enabled' => (bool) env('CORED_PUBLIC_API', true),
];
