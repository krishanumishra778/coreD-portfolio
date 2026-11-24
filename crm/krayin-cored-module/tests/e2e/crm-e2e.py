import json, threading, http.server, socketserver, os, sys
from playwright.sync_api import sync_playwright
class Srv:
    def __init__(s, root, port):
        class H(http.server.SimpleHTTPRequestHandler):
            def __init__(h,*a,**k): super().__init__(*a,directory=root,**k)
            def do_GET(h):
                p=h.path.split('?')[0]
                if not os.path.exists(root+p) or os.path.isdir(root+p) and not os.path.exists(root+p+'/index.html'): h.path='/index.html'
                return super().do_GET()
            def log_message(*a): pass
        socketserver.TCPServer.allow_reuse_address=True
        s.s=socketserver.TCPServer(('127.0.0.1',port),H); threading.Thread(target=s.s.serve_forever,daemon=True).start(); s.base=f'http://127.0.0.1:{port}'
res=[]
def ok(n,c): res.append(bool(c)); print(('PASS ' if c else 'FAIL ')+n)
STUB="var n=0,cb;window.turnstile={render:function(el,o){cb=o.callback;setTimeout(function(){cb('XXXX.DUMMY.TOKEN.XXXX'+(++n))},50);return 1},reset:function(){setTimeout(function(){cb('XXXX.DUMMY.TOKEN.XXXX'+(++n))},80)},remove:function(){}};"
ALL=Srv('/tmp/fe/dist-all',4181); INTAKE=Srv('/tmp/fe/dist-intake',4182); BP=Srv('/tmp/fe/dist-bp',4183)
def mk(b, base, behaviour):
    ctx=b.new_context(viewport={'width':1440,'height':900}); pg=ctx.new_page(); posted=[]; fs=[]; nav=[]
    def api(route):
        r=route.request; hdr={'access-control-allow-origin':base,'access-control-allow-headers':'content-type,accept'}
        if r.method=='OPTIONS': return route.fulfill(status=204,headers=hdr)
        if r.url.endswith('/intake'):
            posted.append(json.loads(r.post_data)); mode=behaviour['mode']
            if mode=='fail': return route.fulfill(status=503,content_type='application/json',headers=hdr,body='{"ok":false}')
            return route.fulfill(status=200,content_type='application/json',headers=hdr,body='{"ok":true,"receipt":"r1","status":"created"}')
        if r.url.endswith('/partners'): return route.fulfill(status=200,content_type='application/json',headers=hdr,body='{"ok":true,"partners":[]}')
        route.continue_()
    pg.route('https://crm.example.test/**',api)
    pg.route('**/turnstile/v0/api.js*',lambda r: r.fulfill(status=200,content_type='application/javascript',body=STUB))
    pg.route('https://formspree.io/**',lambda r:(fs.append(r.request.url), r.fulfill(status=200,content_type='application/json',body='{"ok":true}')))
    pg.route('https://coredhristi.com/thank-you*',lambda r:(nav.append(r.request.url), r.fulfill(status=200,content_type='text/html',body='<h1>THANK YOU STUB</h1>')))
    return ctx,pg,posted,fs,nav
def fill_contact(pg, base, text='Need an AI CRM with ERPNext sync for 20 users'):
    pg.goto(base+'/contact?service=ai-crm'); pg.wait_for_load_state('networkidle')
    pg.fill('input[name=FullName]','[SYNTHETIC] Asha Rao'); pg.fill('input[name=CompanyName]','Acme QA'); pg.fill('input[name=CompanyEmail]','asha@example.invalid')
    pg.fill('input[name=NationalNumber]','9811111111')
    pg.get_by_label('Service',exact=True).select_option(index=1)
    opts=pg.get_by_label('Plan',exact=True).locator('option').all(); pg.get_by_label('Plan',exact=True).select_option(index=1)
    pg.fill('textarea[name=ProjectDescription]',text); pg.check('#contact-terms'); pg.check('#contact-privacy')
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    # ---- A: full CRM build
    beh={'mode':'fail'}; ctx,pg,posted,fs,nav=mk(b,ALL.base,beh)
    fill_contact(pg,ALL.base)
    pg.wait_for_function("document.querySelector('[name=cf-turnstile-response]')||true"); pg.wait_for_timeout(400)
    pg.get_by_role('button',name='Send enquiry').click() if pg.get_by_role('button',name='Send enquiry').count() else pg.locator('form button[type=submit]').last.click()
    pg.wait_for_timeout(900)
    ok('A failed CRM save: nothing sent to Formspree',len(fs)==0)
    ok('A failed CRM save: error shown, no redirect to /thank-you',len(nav)==0 and pg.locator('[role=alert], .quote-feedback').count()>0)
    ok('A failed CRM save: entered details preserved',pg.input_value('input[name=FullName]')=='[SYNTHETIC] Asha Rao' and pg.input_value('textarea[name=ProjectDescription]').startswith('Need an AI CRM') and pg.input_value('input[name=NationalNumber]')=='9811111111')
    first=posted[0]
    beh['mode']='ok'; pg.wait_for_timeout(300); pg.locator('form button[type=submit]').last.click(); pg.wait_for_timeout(1500)
    ok('A retry reuses the same request_id (server de-duplicates)',len(posted)==2 and posted[1]['request_id']==first['request_id'])
    pl=posted[-1]
    ok('A payload: kind, E.164 phone, phone_country, dial_code, company',pl['phone']=='+919811111111' and pl['phone_country']=='IN' and pl['dial_code']=='+91' and pl['company']=='Acme QA' and pl['kind'] in('contact','quote'))
    ok('A payload: service/plan/consent/turnstile token',pl['details'].get('service') and pl['details'].get('plan') and pl['consent']=={'terms':True,'privacy':True} and pl['turnstile_token'].startswith('XXXX') and pl['turnstile_token']!=first['turnstile_token'])
    ok('A success: redirected to /thank-you only after CRM confirmed',len(nav)==1 and len(fs)==0)
    print('   details sent:',sorted(pl['details'].keys())); json.dump(pl,open('/tmp/e2e/contact-payload.json','w'))
    ctx.close()
    # ---- A: chatbot FAQ
    beh={'mode':'fail'}; ctx,pg,posted,fs,nav=mk(b,ALL.base,beh)
    pg.goto(ALL.base+'/'); pg.wait_for_load_state('networkidle'); pg.get_by_label('Open CoreD chat assistant').click(); pg.wait_for_selector('#chat-lead-name')
    ok('A chatbot notice names the CRM, not Formspree',('CRM' in pg.inner_text('.chat-lead-notice')) and 'Formspree' not in pg.inner_text('.chat-lead-notice'))
    pg.fill('#chat-lead-name','[SYNTHETIC] Dev Patel'); pg.fill('#chat-lead-email','dev@example.invalid'); pg.fill('#chat-lead-phone','9855555555'); pg.wait_for_timeout(400)
    pg.get_by_role('button',name='Start chatting').click() if pg.get_by_role('button',name='Start chatting').count() else pg.locator('.chat-lead-form button[type=submit]').click()
    pg.wait_for_timeout(900)
    ok('A chatbot stays locked when the CRM save fails; details kept',pg.locator('#chat-lead-name').count()==1 and pg.input_value('#chat-lead-name')=='[SYNTHETIC] Dev Patel' and len(fs)==0)
    beh['mode']='ok'; pg.wait_for_timeout(300); pg.locator('.chat-lead-form button[type=submit]').click(); pg.wait_for_timeout(1200)
    ok('A chatbot unlocks only after CRM confirmation',pg.locator('#chat-lead-name').count()==0 and pg.get_by_label('Conversation messages').count()==1)
    f=posted[-1]; json.dump(f,open('/tmp/e2e/faq-payload.json','w'))
    ok('A FAQ payload: kind faq_chatbot, privacy_notice consent, phone+country, same request_id on retry',f['kind']=='faq_chatbot' and f['consent']=={'privacy_notice':True} and f['phone']=='+919855555555' and f['phone_country']=='IN' and posted[0]['request_id']==f['request_id'])
    ctx.close()
    # ---- A: privacy copy + nav
    ctx,pg,*_=mk(b,ALL.base,{'mode':'ok'}); pg.goto(ALL.base+'/privacyPolicy'); pg.wait_for_load_state('networkidle'); t=pg.inner_text('body')
    ok('A privacy page: CRM wording, no Formspree',('CoreD receives contact' in t) and 'Formspree' not in t)
    pg.goto(ALL.base+'/'); pg.wait_for_load_state('networkidle'); nt=pg.inner_text('body')
    ok('A navbar shows Partners & Cloud and Book a session',('Partners' in nt) and ('Book a session' in nt))
    ctx.close()
    # ---- B: intake only
    ctx,pg,posted,fs,nav=mk(b,INTAKE.base,{'mode':'ok'}); pg.goto(INTAKE.base+'/'); pg.wait_for_load_state('networkidle'); nt=pg.inner_text('body')
    ok('B intake-only: Booking and Partners hidden',('Book a session' not in nt) and ('Partners & Cloud' not in nt))
    pg.goto(INTAKE.base+'/book-appointment'); pg.wait_for_load_state('networkidle'); ok('B intake-only: /book-appointment not served as a page',('Book an Architecture' not in pg.inner_text('body')))
    fill_contact(pg,INTAKE.base); pg.wait_for_timeout(400); pg.locator('form button[type=submit]').last.click(); pg.wait_for_timeout(1500)
    ok('B intake-only: enquiry still goes to the CRM',len(posted)==1 and len(fs)==0 and len(nav)==1); ctx.close()
    # ---- C: booking+partners on, intake still Formspree
    ctx,pg,posted,fs,nav=mk(b,BP.base,{'mode':'ok'}); pg.goto(BP.base+'/'); pg.wait_for_load_state('networkidle'); nt=pg.inner_text('body')
    ok('C booking/partners on, intake off: nav items shown',('Book a session' in nt) and ('Partners' in nt))
    fill_contact(pg,BP.base); pg.wait_for_timeout(400); pg.locator('form button[type=submit]').last.click(); pg.wait_for_timeout(1500)
    ok('C intake stays on Formspree (nothing posted to the CRM)',len(posted)==0 and len(fs)==1)
    pg.goto(BP.base+'/privacyPolicy'); pg.wait_for_load_state('networkidle'); ok('C privacy copy unchanged (names Formspree)','Formspree' in pg.inner_text('body'))
    ctx.close(); b.close()
print(f"{sum(res)}/{len(res)} passed"); sys.exit(0 if all(res) else 1)
