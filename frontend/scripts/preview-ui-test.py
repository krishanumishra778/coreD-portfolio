import json, threading, http.server, socketserver, os, sys, re
from playwright.sync_api import sync_playwright
DIST='/tmp/fe/frontend/dist'
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s,*a,**k): super().__init__(*a,directory=DIST,**k)
    def do_GET(s):
        p=s.path.split('?')[0]
        if not os.path.exists(DIST+p) or os.path.isdir(DIST+p) and not os.path.exists(DIST+p+'/index.html'): s.path='/index.html'
        return super().do_GET()
    def log_message(*a): pass
srv=socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.TCPServer(('127.0.0.1',4174),H); threading.Thread(target=srv.serve_forever,daemon=True).start()
PARTNERS=[{"slug":"demo-cloud-a","name":"Demo GPU Cloud A","tagline":"Placeholder partner for staging only.","summary":"Demo record.","website_url":None,"affiliate_url":None,"tags":["demo","GPU"],"is_demo":True,"details":{"capabilities":[{"title":"Capability (demo)","body":"Placeholder text."}],"pros":["Placeholder pro"],"cons":["Placeholder con"],"steps":["Review","Talk","Launch"],"metrics":[]}},
 {"slug":"demo-hosting-d","name":"Demo Hosting D","tagline":"t","summary":"s","website_url":None,"affiliate_url":None,"tags":["PaaS"],"is_demo":True,"details":{"metrics":[]}}]
posted=[]
def api(route):
    u=route.request.url; m=route.request.method
    j=lambda b,s=200: route.fulfill(status=s,content_type='application/json',headers={'access-control-allow-origin':'http://127.0.0.1:4174','access-control-allow-credentials':'true'},body=json.dumps(b))
    if m=='OPTIONS': return route.fulfill(status=204,headers={'access-control-allow-origin':'http://127.0.0.1:4174','access-control-allow-credentials':'true','access-control-allow-headers':'content-type,accept','access-control-allow-methods':'GET,POST'})
    if u.endswith('/partners'): return j({"ok":True,"partners":PARTNERS})
    if '/partners/demo-cloud-a' in u: return j({"ok":True,"partner":PARTNERS[0]})
    if '/partners/' in u: return j({"ok":False},404)
    if 'availability' in u: return j({"ok":True,"timezone":"Asia/Kolkata","slots":["2026-12-08T04:30:00Z","2026-12-08T05:00:00Z"]})
    if u.endswith('/booking'): posted.append(json.loads(route.request.post_data)); return j({"ok":True,"status":"requested","message":"We’ll reach out to confirm your appointment."})
    if u.endswith('/intake'): posted.append(json.loads(route.request.post_data)); return j({"ok":True,"receipt":"x"})
    route.continue_()
STUB="window.turnstile={render:function(el,o){setTimeout(function(){o.callback('XXXX.DUMMY.TOKEN.XXXX')},50);return 1},reset:function(){},remove:function(){}};"
res=[]; 
def ok(n,c): res.append((n,bool(c))); print(('PASS ' if c else 'FAIL ')+n)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for name,vp in (('desktop',{'width':1440,'height':900}),('mobile',{'width':390,'height':844})):
        pg=b.new_context(viewport=vp).new_page(); errs=[]
        pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' and 'Failed to load resource' not in m.text else None)
        pg.route('**/cored/api/**',api); pg.route('**/turnstile/v0/api.js*',lambda r: r.fulfill(status=200,content_type='application/javascript',body=STUB))
        for path,must in (('/book-appointment','Book an Architecture'),('/cloud-partners','Cloud & Hosting Partners'),('/cloud-partners/demo-cloud-a','Demo GPU Cloud A'),('/cloud-partners/nope','Partner not found')):
            pg.goto('http://127.0.0.1:4174'+path); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(500)
            ok(f'{name} {path} renders',must in pg.inner_text('body'))
            ok(f'{name} {path} navbar+footer+chatbot present',pg.locator('nav, header').count()>0 and pg.locator('footer').count()>0 and pg.locator('img[src*="Chatbot"], [class*="chatbot"] img, [class*="chatbot"]').count()>0)
            ok(f'{name} {path} no horizontal overflow',pg.evaluate('document.documentElement.scrollWidth<=window.innerWidth+1'))
            pg.evaluate("async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}window.scrollTo(0,0)}"); pg.wait_for_timeout(400)
            if name=='desktop' and path=='/book-appointment': print('step text visible:',pg.evaluate("[...document.querySelectorAll('.cdx-step h3,.cdx-step p,.cdx-band h2,.cdx-dark p')].map(e=>getComputedStyle(e).opacity+'/'+getComputedStyle(e).color+'/'+(e.getBoundingClientRect().height>0)).join(' | ')"))
            pg.screenshot(path=f'/tmp/fe/shot-{name}-{re.sub("[^a-z]","_",path)}.png',full_page=True)
        ok(f'{name} no JS errors',not errs or print(errs[:3]))
        if name=='desktop':
            pg.goto('http://127.0.0.1:4174/book-appointment'); pg.wait_for_load_state('networkidle')
            # pick a Tuesday in Dec 2026 (mock returns slots for any date): navigate to next month if needed
            pg.get_by_role('button',name='Next month').click(); pg.get_by_role('button',name='8',exact=True).first.click()
            pg.wait_for_selector('.cdx-slot'); pg.locator('.cdx-slot').first.click()
            pg.fill('input[name=FullName]','[SYNTHETIC] UI Tester'); pg.fill('input[name=CompanyEmail]','ui@example.invalid'); pg.fill('input[name=NationalNumber]','9000000000')
            pg.select_option('select[name=Service]','General consultation'); pg.fill('textarea[name=Overview]','UI test overview'); pg.check('input[name=Terms]')
            pg.wait_for_timeout(300); pg.get_by_role('button',name='Request appointment').click(); pg.wait_for_selector('.cdx-msg--ok',timeout=5000)
            ok('booking success shows reach-out wording',"reach out to confirm" in pg.inner_text('.cdx-msg--ok') and 'Meet' not in pg.inner_text('.cdx-msg--ok'))
            bk=posted[-1]; ok('booking payload: token, UTC slot, IST tz, phone E.164',bk['turnstile_token'].startswith('XXXX') and bk['starts_at'].endswith('Z') and bk['timezone']=='Asia/Kolkata' and bk['phone']=='+919000000000')
            pg.goto('http://127.0.0.1:4174/contact'); pg.wait_for_load_state('networkidle')
            ok('contact page loads in CRM mode',pg.locator('form#project-enquiry').count()==1)
    b.close()
bad=[n for n,c in res if not c]; print(f"\n{len(res)-len(bad)}/{len(res)} passed"); sys.exit(1 if bad else 0)
