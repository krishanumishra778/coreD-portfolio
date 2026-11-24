<?php
// Usage: KRAYIN_ROOT=/path/to/krayin php tests/selftest.php  (module must be linked at $KRAYIN_ROOT/app/CoreD)
// Standalone self-test of the CoreD module on an isolated Laravel app + sqlite (Krayin tables not needed).
putenv('APP_ENV=testing'); putenv('APP_KEY=base64:'.base64_encode(random_bytes(32))); putenv('DB_CONNECTION=sqlite');
$MINI0=__DIR__.'/mini-app'; putenv('DB_DATABASE='.$MINI0.'/database/t.sqlite'); putenv('CACHE_STORE=array'); putenv('LOG_CHANNEL=null'); putenv('SESSION_DRIVER=array');
$_ENV['APP_ENV']='testing';
$MINI=__DIR__.'/mini-app'; @mkdir($MINI.'/storage/framework/views',0777,true); @mkdir($MINI.'/storage/framework/cache',0777,true); @mkdir($MINI.'/storage/logs',0777,true); @mkdir($MINI.'/database',0777,true); @mkdir($MINI.'/bootstrap/cache',0777,true);
require (getenv('KRAYIN_ROOT')?:'/tmp/krayin-probe/rel').'/vendor/autoload.php';
@mkdir($MINI.'/database',0777,true); @unlink($MINI.'/database/t.sqlite'); touch($MINI.'/database/t.sqlite');
$app = require $MINI.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class); $kernel->bootstrap();
use Illuminate\Support\Facades\{Artisan,Http,Schema,RateLimiter}; use Carbon\CarbonImmutable;
use App\CoreD\Models\{Appointment,AvailabilityRule,CloudPartner}; use App\CoreD\Services\{AvailabilityService,TurnstileVerifier};
$pass=0;$fail=0; function fk($r){Http::swap(new \Illuminate\Http\Client\Factory()); Http::fake($r);}
function t($n,$c){global $pass,$fail; if($c){$pass++;echo "PASS $n\n";}else{$fail++;echo "FAIL $n\n";}}

// 1 migrations up/down/up
Artisan::call('migrate',['--force'=>true]);
foreach(['cored_intake_events','cored_availability_rules','cored_appointments','cored_cloud_partners'] as $tb) t("table $tb exists",Schema::hasTable($tb));
Artisan::call('migrate:rollback',['--force'=>true]); t('rollback drops all',!Schema::hasTable('cored_appointments')&&!Schema::hasTable('cored_cloud_partners'));
Artisan::call('migrate',['--force'=>true]); t('re-migrate ok',Schema::hasTable('cored_appointments'));

// 2 seed + idempotent
config(['cored.owner_user_id'=>1]);
Artisan::call('cored:seed-demo',['--force'=>true]); Artisan::call('cored:seed-demo',['--force'=>true]);
t('seed idempotent: 10 rules',AvailabilityRule::count()===10); t('seed idempotent: 4 partners',CloudPartner::count()===4);

// 3 availability
$svc=app(AvailabilityService::class); $now=CarbonImmutable::parse('2026-12-01 00:00:00','UTC'); // Tuesday
$d='2026-12-08'; $tz=config('cored.booking.timezone'); $slots=$svc->slotsForDate($d,$now);
t('Tue has 12 slots',count($slots)===12); t('first slot 10:00 IST = 04:30Z',$slots[0]==='2026-12-08T04:30:00Z');
t('Sunday empty',$svc->slotsForDate('2026-12-13',$now)===[]); t('invalid date empty',$svc->slotsForDate('2026-13-45',$now)===[] && $svc->slotsForDate('garbage',$now)===[]);
t('past/too-soon excluded',$svc->slotsForDate('2026-12-01',CarbonImmutable::parse('2026-12-01 10:00:00','UTC'))===[]); t('beyond 45 days excluded',$svc->slotsForDate('2027-03-02',$now)===[]);
Appointment::create(['request_id'=>str_repeat('a',20),'starts_at'=>CarbonImmutable::parse($slots[0]),'ends_at'=>CarbonImmutable::parse($slots[0])->addMinutes(30),'timezone'=>$tz,'service'=>'x','channel'=>'email','active_slot'=>'202612080430']);
t('booked slot removed',count($svc->slotsForDate($d,$now))===11 && !in_array($slots[0],$svc->slotsForDate($d,$now)));
$dup=false; try{Appointment::create(['request_id'=>str_repeat('b',20),'starts_at'=>CarbonImmutable::parse($slots[0]),'ends_at'=>CarbonImmutable::parse($slots[0])->addMinutes(30),'timezone'=>$tz,'service'=>'x','channel'=>'email','active_slot'=>'202612080430']);}catch(\Illuminate\Database\UniqueConstraintViolationException $e){$dup=true;}
t('double-booking blocked by unique slot',$dup);
Appointment::where('request_id',str_repeat('a',20))->update(['active_slot'=>null,'status'=>'cancelled']);
t('cancelled slot becomes free again',count($svc->slotsForDate($d,$now))===12);

// 4 partners public shape
$p=CloudPartner::first(); $p->update(['details'=>['metrics'=>[['label'=>'a','value'=>'1','verified'=>true],['label'=>'b','value'=>'99%','verified'=>false],['label'=>'c','value'=>'2']]]]);
$pub=$p->fresh()->toPublic(); t('only verified metrics public',count($pub['details']['metrics'])===1 && $pub['details']['metrics'][0]['label']==='a');
t('public shape has no raw timestamps/ids',!array_key_exists('id',$pub)&&!array_key_exists('created_at',$pub));

// 5 turnstile
$v=app(TurnstileVerifier::class);
config(['cored.turnstile.secret'=>null,'cored.turnstile.mode'=>'required']); t('no secret -> fails closed',$v->verify('tok')['reason']==='not_configured');
config(['cored.turnstile.secret'=>'s']);
t('missing token',$v->verify(null)['ok']===false); t('oversized token',$v->verify(str_repeat('x',2049))['ok']===false);
Http::fake(['*'=>Http::response(['success'=>true,'hostname'=>'coredhristi.com'],200)]); t('success accepted',$v->verify('tok','1.2.3.4')['ok']===true);
config(['cored.turnstile.allowed_hostnames'=>['coredhristi.com']]); t('hostname allowed',$v->verify('tok')['ok']===true);
fk(['*'=>Http::response(['success'=>true,'hostname'=>'evil.test'],200)]); t('hostname mismatch rejected',$v->verify('tok')['reason']==='hostname_mismatch');
fk(['*'=>Http::response(['success'=>false,'error-codes'=>['timeout-or-duplicate']],200)]); t('failure rejected',$v->verify('tok')['ok']===false);
fk(['*'=>Http::response('boom',500)]); t('upstream 500 rejected',$v->verify('tok')['ok']===false);
fk(fn()=>throw new \Illuminate\Http\Client\ConnectionException('down')); t('network error rejected',$v->verify('tok')['reason']==='verify_unreachable');
config(['cored.turnstile.mode'=>'off']); $app['env']='production'; t('off refused in production',$v->verify('t')['ok']===false);

// 6 HTTP-level
$app['env']='testing'; config(['cored.turnstile.mode'=>'required','cored.turnstile.secret'=>null]);
function call($m,$u,$d=[]){global $kernel; $r=Illuminate\Http\Request::create($u,$m,$d,[],[],['REMOTE_ADDR'=>'9.9.9.'.mt_rand(1,250),'HTTP_ACCEPT'=>'application/json']); return $kernel_app=app()->handle($r);}
$base=['kind'=>'contact','request_id'=>'req_0123456789abcdef','name'=>'Test User','email'=>'t@example.com','phone'=>'+919000000000','phone_country'=>'IN','dial_code'=>'+91','message'=>'Hello there','consent'=>['terms'=>true,'privacy'=>true]];
t('partners list 200',call('GET','/cored/api/partners')->getStatusCode()===200);
t('unknown partner 404',call('GET','/cored/api/partners/nope')->getStatusCode()===404);
$draft=CloudPartner::create(['slug'=>'draft-x','name'=>'D','status'=>'draft']); t('draft partner not public',call('GET','/cored/api/partners/draft-x')->getStatusCode()===404);
t('bad kind 422',call('POST','/cored/api/intake',['kind'=>'x']+$base)->getStatusCode()===422);
t('bad email 422',call('POST','/cored/api/intake',['email'=>'nope']+$base)->getStatusCode()===422);
t('short request_id 422',call('POST','/cored/api/intake',['request_id'=>'x']+$base)->getStatusCode()===422);
t('contact needs message 422',call('POST','/cored/api/intake',['message'=>'']+$base)->getStatusCode()===422);
t('honeypot -> 200, nothing stored',call('POST','/cored/api/intake',['website'=>'spam.example']+$base)->getStatusCode()===200 && !Schema::hasTable('lead_sources'));
t('no turnstile secret -> 503 fail closed',call('POST','/cored/api/intake',$base)->getStatusCode()===503);
config(['cored.turnstile.secret'=>'s']); fk(['*'=>Http::response(['success'=>false],200)]);
t('turnstile rejected -> 422',call('POST','/cored/api/intake',$base)->getStatusCode()===422);
$ip='7.7.7.7'; $codes=[]; for($i=0;$i<7;$i++){$r=Illuminate\Http\Request::create('/cored/api/intake','POST',['kind'=>'x'],[],[],['REMOTE_ADDR'=>$ip,'HTTP_ACCEPT'=>'application/json']); $codes[]=app()->handle($r)->getStatusCode();}
t('IP rate limit -> 429 after 5',in_array(429,$codes)&&$codes[0]===422);
t('availability invalid date 422',call('GET','/cored/api/booking/availability?date=bad')->getStatusCode()===422);
$r=call('GET','/cored/api/booking/availability?date=2026-12-08'); t('availability 200 json',$r->getStatusCode()===200 && ($r->getData(true)['ok']??false));
t('booking bad service 422',call('POST','/cored/api/booking',['request_id'=>'req_0123456789abcdef','name'=>'A B','email'=>'a@b.co','service'=>'nope','channel'=>'email','starts_at'=>'2026-12-08T04:30:00Z','timezone'=>'Asia/Kolkata'])->getStatusCode()===422);

// 6b intake contract (full form data, consent, phone) and CORS allow-list
use App\CoreD\Services\IntakePayload; use App\CoreD\Http\Middleware\CorsAllowlist;
function callO($m,$u,$d=[],$origin=null){$sv=['REMOTE_ADDR'=>'8.8.8.'.mt_rand(1,250),'HTTP_ACCEPT'=>'application/json']; if($origin!==null)$sv['HTTP_ORIGIN']=$origin; return app()->handle(Illuminate\Http\Request::create($u,$m,$d,[],[],$sv));}
function vf($r){return $r->getStatusCode()===422 && ($r->getData(true)['error']??'')==='verification_failed';} // passed validation, stopped at (faked) Turnstile
function rl(){RateLimiter::clear('cored:intake:email:'.hash('sha256','t@example.com'));}
$fields=fn($r)=>callO('POST','/cored/api/intake',$r)->getData(true)['fields']??[];
t('phone must be E.164',callO('POST','/cored/api/intake',['phone'=>'+91 90000 00000']+$base)->getStatusCode()===422 && callO('POST','/cored/api/intake',['phone'=>'9000000000']+$base)->getStatusCode()===422);
t('contact without terms/privacy consent 422',in_array('consent.terms',$fields(['consent'=>['privacy'=>true]]+$base)) && in_array('consent.privacy',$fields(['consent'=>[]]+$base)));
t('faq needs privacy_notice flag',in_array('consent.privacy_notice',$fields(['kind'=>'faq_chatbot','message'=>'x']+$base)));
rl(); t('faq with notice and no message passes validation (reaches Turnstile)',vf(callO('POST','/cored/api/intake',['kind'=>'faq_chatbot','message'=>'','consent'=>['privacy_notice'=>true]]+$base)));
rl(); t('quote kind with budget accepted by validation',vf(callO('POST','/cored/api/intake',['kind'=>'quote','details'=>['plan'=>'Custom','budget_amount'=>'5000','budget_currency'=>'USD']]+$base)));
t('dial code must prefix the phone',in_array('dial_code',$fields(['dial_code'=>'+44']+$base)));
t('budget amount needs a currency',in_array('details.budget_currency',$fields(['details'=>['budget_amount'=>'100']]+$base)));
t('bad currency / negative budget rejected',callO('POST','/cored/api/intake',['details'=>['budget_amount'=>'-5','budget_currency'=>'usd']]+$base)->getStatusCode()===422);
$cl=IntakePayload::clean(['email'=>'A@B.CO','details'=>['plan'=>'P','evil'=>'x','service'=>''],'consent'=>['terms'=>'1','x'=>1],'name'=>"Joe\x01"]);
t('clean(): lowercases e-mail, drops unknown/empty details and consent keys, strips control chars',$cl['email']==='a@b.co' && $cl['details']===['plan'=>'P'] && array_keys($cl['consent'])===['terms','privacy','privacy_notice'] && $cl['name']==='Joe');
t('storable() omits turnstile token and honeypot',!array_key_exists('turnstile_token',IntakePayload::storable(['turnstile_token'=>'x','website'=>'','name'=>'n'])) && IntakePayload::storable(['website'=>'','name'=>'n'])===['name'=>'n']);
$sum=IntakePayload::summary('quote','Website - Quote request',['request_id'=>'req_0123456789abcdef','name'=>'N','email'=>'n@x.co','phone'=>'+919000000000','phone_country'=>'IN','dial_code'=>'+91','company'=>'Co','message'=>'Hi','details'=>['service'=>'AI CRM','plan'=>'Custom','budget_range'=>'5000 USD','add_ons'=>'SLA','requested_integrations'=>'ERP','target_timeline'=>'Q1'],'consent'=>['terms'=>true,'privacy'=>true]],'2026-11-24 12:00:00');
t('summary keeps service, plan, budget, add-ons, integrations, timeline, phone+country, consent, request id',str_contains($sum,'Service: AI CRM')&&str_contains($sum,'Budget: 5000 USD')&&str_contains($sum,'Add-ons: SLA')&&str_contains($sum,'Integrations: ERP')&&str_contains($sum,'Target timeline: Q1')&&str_contains($sum,'+919000000000 (country IN, dial code +91)')&&str_contains($sum,'Request ID: req_0123456789abcdef')&&str_contains($sum,'terms accepted'));
config(['app.url'=>'https://crm.example.test','cored.allowed_origins'=>['https://coredhristi.com','http://evil.test','*','https://x.test/path']]);
t('CORS allow-list is exact https origins + own origin only',CorsAllowlist::allowed()===['https://crm.example.test','https://coredhristi.com']);
$r=callO('OPTIONS','/cored/api/intake',[],'https://coredhristi.com'); t('preflight from allowed origin: 204 + exact ACAO, no credentials',$r->getStatusCode()===204 && $r->headers->get('Access-Control-Allow-Origin')==='https://coredhristi.com' && $r->headers->get('Vary')==='Origin' && !$r->headers->has('Access-Control-Allow-Credentials') && str_contains($r->headers->get('Access-Control-Allow-Methods'),'POST'));
t('preflight from other origin refused',callO('OPTIONS','/cored/api/intake',[],'https://evil.test')->getStatusCode()===403 && callO('OPTIONS','/cored/api/intake',[],'null')->getStatusCode()===403);
t('POST from other origin refused even with a valid body',callO('POST','/cored/api/intake',$base,'https://evil.test')->getStatusCode()===403 && callO('POST','/cored/api/booking',$base,'http://evil.test')->getStatusCode()===403);
rl(); $r=callO('POST','/cored/api/intake',$base,'https://coredhristi.com'); t('POST from allowed origin reaches validation/Turnstile and carries ACAO',vf($r) && $r->headers->get('Access-Control-Allow-Origin')==='https://coredhristi.com');
rl(); $r=callO('POST','/cored/api/intake',$base,'https://crm.example.test'); t('same-origin POST allowed',vf($r));
$r=callO('GET','/cored/api/partners',[],'https://evil.test'); t('GET from other origin gets no ACAO (browser blocks the read)',$r->getStatusCode()===200 && !$r->headers->has('Access-Control-Allow-Origin'));
$r=callO('GET','/cored/api/partners'); t('no Origin header: no CORS headers',!$r->headers->has('Access-Control-Allow-Origin'));

// 6c Formspree historical import: parsing, classification, dry-run numbers
use App\CoreD\Services\FormspreeImport;
$H=['_date','RequestId','FullName','CompanyEmail','ContactNumber','CountryCode','DialCode','CompanyName','ProjectDescription','ServiceSelection','ChooseYourPlan','PriceBasis','BudgetAmount','BudgetCurrency','LeadSource','Website','TermsAccepted','PrivacyAccepted'];
$R=[
 ['2026-11-10T08:00:00Z','req_aaaaaaaaaaaaaaaa','Asha Rao','asha@acme.in','+919811111111','IN','+91','Acme','Need a CRM with ERP sync for 20 users','AI CRM','Standard','fixed','','','','','yes','yes'],
 ['2026-11-10T08:01:00Z','req_aaaaaaaaaaaaaaaa','Asha Rao','asha@acme.in','+919811111111','IN','+91','Acme','Need a CRM with ERP sync for 20 users','AI CRM','Standard','fixed','','','','','yes','yes'],
 ['2026-11-11T09:00:00Z','req_bbbbbbbbbbbbbbbb','Asha Rao','asha@acme.in','+919811111111','IN','+91','Acme','Need a CRM with  ERP sync for 20 USERS','AI CRM','Standard','fixed','','','','','yes','yes'],
 ['2026-11-12T09:00:00Z','req_cccccccccccccccc','Bot','bot@spam.biz','+10000000','US','+1','','Buy now','','','','','','','http://spam.example','',''],
 ['2026-11-13T09:00:00Z','req_dddddddddddddddd','Someone','someone@example.com','+919822222222','IN','+91','','Hello there friend','','','','','','','','yes','yes'],
 ['2026-11-14T09:00:00Z','req_eeeeeeeeeeeeeeee','QA Tester','qa@corp.io','+919833333333','IN','+91','','checking the form works','','','','','','','','yes','yes'],
 ['2026-11-15T09:00:00Z','req_ffffffffffffffff','No Email','not-an-email','+919844444444','IN','+91','','Hello hello','','','','','','','','yes','yes'],
 ['2026-11-16T09:00:00Z','req_gggggggggggggggg','Dev Patel','dev@shop.in','+919855555555','IN','+91','','FAQ assistant registration','FAQ assistant enquiry','','','','','FAQ chatbot','','',''],
 ['2026-11-17T09:00:00Z','req_hhhhhhhhhhhhhhhh','Mira Shah','mira@firm.in','+919866666666','IN','+91','Firm','Custom build with Zoho','AI CRM','Custom','quote','5000','USD','','','yes','yes'],
 ['','req_iiiiiiiiiiiiiiii','Ravi K','ravi@co.in','+919877777777','IN','+91','Co','Please call me about automation','Automation','Basic','fixed','','','','','yes','yes'],
];
$fh=fopen('php://temp','r+'); fputcsv($fh,$H,',','"',''); foreach($R as $r) fputcsv($fh,$r,',','"',''); rewind($fh); $csv=stream_get_contents($fh);
$rows=FormspreeImport::parse($csv); $an=FormspreeImport::analyse($rows); $rep=$an['report']; $c=$rep['counts'];
t('csv parsed into 10 rows',count($rows)===10);
t('dry-run counts: 4 importable, 2 duplicates (same request id / same e-mail+text), 1 spam, 2 QA, 1 invalid, 1 without date',$c==['total'=>10,'invalid'=>1,'spam'=>1,'qa_test'=>2,'duplicate'=>2,'importable'=>4,'no_date'=>1]);
t('dry-run keeps separate sources: contact 2, quote 1, FAQ 1',$rep['importable_by_source']===['Website - Reach Us Out'=>2,'Website - Quote request'=>1,'Website - FAQ chatbot'=>1]);
t('dry-run reports original date range',$rep['first_submission']==='2026-11-10 08:00:00 UTC' && $rep['last_submission']==='2026-11-17 09:00:00 UTC');
t('excluded rows list row numbers + reason only (no personal data)',count($rep['excluded_rows'])===6 && !str_contains(json_encode($rep),'asha@') && !str_contains(json_encode($rep),'Asha'));
$q=array_values(array_filter($an['importable'],fn($n)=>$n['kind']==='quote'))[0]; t('quote row keeps budget, plan, consent and original date',$q['payload']['details']['budget_amount']==='5000' && $q['payload']['details']['plan']==='Custom' && $q['payload']['consent']['privacy']===true && $q['submitted_at']->format('Y-m-d')==='2026-11-17');
$f=array_values(array_filter($an['importable'],fn($n)=>$n['kind']==='faq_chatbot'))[0]; t('FAQ row: privacy notice flag set, phone + country kept',$f['payload']['consent']['privacy_notice']===true && $f['payload']['phone']==='+919855555555' && $f['payload']['phone_country']==='IN');
$js=json_encode(['submissions'=>array_map(fn($r)=>array_combine($H,$r),$R)]); t('same export as JSON gives identical numbers',FormspreeImport::analyse(FormspreeImport::parse($js))['report']['counts']==$c);
t('empty / bad input handled',FormspreeImport::parse('')===[] && (function(){try{FormspreeImport::parse('{bad');return false;}catch(\InvalidArgumentException $e){return true;}})());

// 7 CoreDhristi branding
$B=__DIR__.'/../app/CoreD/Resources/brand/';
$r=call('GET','/cored/brand/cored-crm.css'); t('brand css served 200 text/css',$r->getStatusCode()===200 && str_contains((string)$r->headers->get('Content-Type'),'text/css') && $r->headers->get('X-Content-Type-Options')==='nosniff');
foreach(['logo-light.svg','logo-dark.svg','mark.svg','favicon.svg','favicon-32.png','favicon.ico'] as $f) t("brand asset $f 200",call('GET','/cored/brand/'.$f)->getStatusCode()===200);
t('unknown brand file 404',call('GET','/cored/brand/secret.txt')->getStatusCode()===404 && call('GET','/cored/brand/.env')->getStatusCode()===404 && call('GET','/cored/brand/composer.json')->getStatusCode()===404);
t('brand route sets no cookies',count(call('GET','/cored/brand/mark.svg')->headers->getCookies())===0);
t('app name is CoreDhristi',config('app.name')==='CoreDhristi');
$head=view('cored::branding.head')->render();
t('head template: css + svg/png/ico favicons + title suffix',str_contains($head,'cored/brand/cored-crm.css?v=') && str_contains($head,'favicon.svg') && str_contains($head,'favicon-32.png') && str_contains($head,'favicon.ico') && str_contains($head,'document.title'));
t('head template has no upstream names',!preg_match('/krayin|webkul/i',$head));
$mgr=new class{public array $t=[];public function addTemplate($n){$this->t[]=$n;}};
Illuminate\Support\Facades\Event::dispatch('admin.layout.head.after',$mgr); Illuminate\Support\Facades\Event::dispatch('admin.layout.head',$mgr);
t('head hooks add the template for both layouts',$mgr->t===['cored::branding.head','cored::branding.head']);
t('help/support config has no upstream links',!preg_match('/krayin|webkul/i',json_encode(config('support'))) && config('support.contact_url')==='mailto:support@coredhristi.com');
$lang=require __DIR__.'/../app/CoreD/Resources/lang-override/en/app.php'; t('lang override has no upstream names',is_array($lang) && !preg_match('/krayin|webkul/i',json_encode($lang)));
$css=file_get_contents($B.'cored-crm.css'); t('css uses website palette, no remote urls',str_contains($css,'#FFB734') && str_contains($css,'#7A4208') && str_contains($css,'#120F0B') && !preg_match('#https?://#',$css));
t('logo files are valid SVG with CoreD mark',(function() use($B){foreach(['logo-light.svg','logo-dark.svg','mark.svg','favicon.svg'] as $f){$x=@simplexml_load_file($B.$f); if(!$x||!str_contains(file_get_contents($B.$f),'#FF9000'))return false;} return true;})());
t('footer default patched when upstream config exists',(function(){config(['core_config'=>[['key'=>'general.settings.footer','fields'=>[['name'=>'show'],['name'=>'label','default'=>'Powered by Krayin']]]]]); (new App\CoreD\CoreDServiceProvider(app()))->boot(); $l=config('core_config.0.fields.1.default'); return $l===config('cored.brand.footer_label') && str_contains($l,'CoreDhristi');})());
echo "\n$pass passed, $fail failed\n"; exit($fail?1:0);
