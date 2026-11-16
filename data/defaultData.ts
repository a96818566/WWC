import { DeckData } from '../types';
import { BASE_ESTIMATE_ITEMS } from './defaultEstimate';
import { chapter05Data } from './chapter05Data';
import { chapter07Data } from './chapter07Data';

export const initialDeckData: DeckData = {
  branding: {
    whiteLogo: 'https://res.cloudinary.com/dawlj9ne4/image/upload/AVN_Logo_white_d0g8x2.png',
    blackLogo: 'https://res.cloudinary.com/dawlj9ne4/image/upload/AVN_Logo_ugcq9l.png',
    nasharzIcon: 'https://res.cloudinary.com/dawlj9ne4/image/upload/Nasharz_Films___Icon_lirr87.png',
    clientLogo: '',
    sealStamp: 'https://res.cloudinary.com/dawlj9ne4/image/upload/NF_Seal_r4jy9r.png',
    robotWide: 'https://res.cloudinary.com/zpwicpo5/image/upload/wwc_hp.png',
    robotLong: 'https://res.cloudinary.com/zpwicpo5/image/upload/wwc_hp.png',
    clientAccessCode: 'nasharzfilms.com',
    adminPassword: 'wwcmaz',
    subtext: 'From brief to final execution.',
    producedBy: 'Produced by Nasharz',
    dateBadge: '2K26',
  },
  chapters: [
    {
      id: 'brief',
      number: '01',
      title: 'Brief',
      category: 'The Ask',
      visualImage: 'https://res.cloudinary.com/zpwicpo5/image/upload/Confident_Cable_Store_Ambassador_1.png',
      visualImagePosition: 'center center',
      overlayHeadline: 'Naam Se Nahi, Kaam Se Pehchaan — TVC Creative Brief',
      summary: "Worldwide Cables' first national TV campaign ft. Javed Sheikh — shifting buyers from 'Which cable do you recommend?' to 'Give me Worldwide Cables' through LSZH safety and pure-copper proof.",
      fullText: `WORLDWIDE CABLES: TVC CREATIVE BRIEF

Campaign: Naam Se Nahi, Kaam Se Pehchaan
Lead talent: Javed Sheikh (signed by client)
Prepared by: Nasharz Films | Craft Advertising
Status: Draft v1, November 2026. Confidential, for review only.

1. EXECUTIVE OVERVIEW AND OBJECTIVES
Worldwide Cables (WWC), Lahore, has built a credible product range, competitive value and institutional approvals. What it lacks is mental availability: most buyers, electricians and dealers still reach for the names they already know.
The task is WWC's first national television idea. It must:
• make a young brand feel established, dependable and unmistakably Pakistani;
• turn quality, safety and performance into a culturally memorable story;
• create distinctive brand assets WWC can own for years (the line, the character device, the split-screen proof);
• shift the buying question from "Which cable do you recommend?" to "Give me Worldwide Cables."
This is not a launch announcement. It is the start of building a popular Pakistani cable brand.
Current state: quality, value, institutional approvals, availability. Desired state: quality leadership, customer preference, trade recommendation, loyalty. First TV campaign goals: awareness, differentiation, trust, and customers asking dealers and electricians for WWC by name.

2. STRATEGIC ASSIGNMENT
Create awareness for WWC. Make WWC trusted. Make customers ask for WWC.
• Electrician or dealer recommends WWC, so the customer asks for WWC.
• WWC becomes the default trusted choice, not one more box on the shelf.
• Turn WWC's "no legacy" position into a virtue: in a market built on big names, WWC asks people to judge the work, not the name.

3. BRAND LAYER AND DIRECTION
• Category: Wires and cables: building wire, fire alarm, solar PV, LAN, CCTV, optical fibre
• Functional core: Safe, durable, pure-copper performance
• Commercial advantage: Premium safety technology (LSZH) at PVC-level pricing, subject to client confirmation
• Market advantage: Institutional approvals and credibility with developers and industry
• Emotional pay-off: Peace of mind: what is behind my wall cannot hurt my family
• Brand character: Confident, dependable, hardworking, contemporary, with a sense of humour
• Campaign line: Naam Se Nahi, Kaam Se Pehchaan
• Support line: Aap ka Hifazti Current
• Core VO line: Cable jis mein current taqat ban kar dorre, khauf ban kar nahi
• Desired response: "Cable? Give me Worldwide Cables."

4. THE COMMUNICATIONS CHALLENGE
Built (approvals, range, product) → Known → Trusted → Asked for → Recommended by the trade
The insight: cable is a blind purchase. It disappears behind walls and ceilings, so buyers fall back on the only signal they have: the name. WWC's argument is that the name tells you nothing about what is inside. Quality, performance and real value do.

5. BRAND AMBASSADOR: JAVED SHEIKH (SIGNED)
Why he works: mass trust across SEC A to D, credibility with an older decision-maker audience, comic range, and a voice that can carry an authoritative line like "main samjhauta nahi karta."
How we use him: one man, many characters, one punchline.
• Nishana — Character: Chaudhry Sb, flamboyant retired general and zamindar | Class reached: Rural, landowners, mass
• Guru Ji — Character: Spiritual master in a palace drawing room | Class reached: Middle-class homeowners
• Chamkila — Character: Flashy boutique owner with a bill-paper costume for his electrician | Class reached: Traders, urban homeowners, shop owners
• Client film — Character: Javed Sheikh as himself, a market walk-through | Class reached: All classes, hero film
Guardrail: he never boasts. He teaches, questions and corrects, which keeps the tone confident without being boastful.

6. TARGET AUDIENCE
• Primary: SEC A, B, C, D males, 20 to 55. The decision-maker for home wiring, shop and office fit-outs, and renovations, or the person who delegates the job to an electrician.
• Secondary: electricians and mistris, contractors, dealers and retailers, developers, builders and consultants.
• Note for the client: women strongly influence home-safety decisions. The Guru Ji and family-safety executions can be cut to speak to them in digital.

7. CLIENT SCRIPT (URDU)
جاوید شیخ:
"مارکیٹ میں بڑے بڑے نام ہیں...
کوئی اپنے نام پر بیچتا ہے، کوئی اپنی شہرت پر۔
لیکن میرا ایک سوال ہے...
نام بڑا ہونے سے کیبل بھی بہتر ہو جاتی ہے؟
میں نام نہیں دیکھتا۔ میں دیکھتا ہوں کوالٹی، پرفارمنس اور پیسے کی اصل ویلیو۔
کیونکہ جب بات ہو گھر کی سیفٹی اور سالوں کے اعتماد کی...
تو میں سمجھوتہ نہیں کرتا!
میرا انتخاب ہے...
ورلڈ وائیڈ کیبلز!
نام سے نہیں، کام سے پہچان!"

Observations on the script:
• It is a strong brand-belief film: a question, a refusal and a pledge. It does not show a problem, so it needs visual proof.
• It is about 40 seconds read at a measured pace. A 25-second cut means trimming to: market line, the question, "main naam nahi dekhta", "samjhauta nahi", brand name, line.
• It works as the hero film. The three comedy films are the series that dramatise the same idea.
• Storyboard for this script (3 frames: showroom tracking shot, box-weighing close-up, cut-cable macro) is already drawn in the A4 sheet format. Remaining frames (04 to 07) follow the client's own shot list.

8. REFERENCE ANALYSIS: ADITYA BIRLA ULTRAVOLT
What the client said: Ultravolt is a reference because it is a cable brand with a big name behind it, while WWC has no such legacy.
What the coverage shows:
• Ultravolt is itself a new brand. It was launched in September 2026 by the Aditya Birla Group, housed under UltraTech Cement, with a Rs 1,800 crore investment, a new plant in Gujarat and Shah Rukh Khan as ambassador.
• It does not rely on a cable legacy. It borrows parent credibility, a celebrity, a one-line emotional promise ("Power, ek zimmedari") and hard proof (TruePure copper, 99.97% purity, sourced from the group's own Hindalco).
• It pairs the campaign with trade visibility (6,000+ touchpoints) and an electrician training programme.
• The campaign was created by Ogilvy, with brand identity by Interbrand.
What this means for WWC:
• Parent-group legacy → WWC equivalent: No parent legacy. Replace with institutional proof: DHA Lahore and DHA Burki approvals, PEC certificate, MES, UET and C&W clients, TÜV Austria partnership
• Celebrity ambassador → WWC equivalent: Javed Sheikh
• One emotional line → WWC equivalent: Naam Se Nahi, Kaam Se Pehchaan
• Copper purity proof (99.97%) → WWC equivalent: 99.99% pure copper (site claim) and LSZH, which most competitors do not lead with
• Electrician programme → WWC equivalent: Opportunity: a WWC electrician loyalty or demo programme, tied to the "Give me WWC" trade goal
Where we deliberately differ: Ultravolt owns "responsibility" (zimmedari). WWC should not enter that territory. WWC's territory is judging by performance, not by name, which suits a challenger brand and is difficult for a legacy brand to copy without undermining itself.

9. CREATIVE CONCEPT CUES
1. The invisible protector: safety lives behind walls and above ceilings. Make the unseen visible (x-ray ceiling cutaway, split-screen proof).
2. The moment of truth: a short circuit, smoke, a shock of a bill. Tension resolves when WWC is the choice.
3. The Javed Sheikh device: one man, many costumes, one lesson. Distinctive, repeatable, easy to cut into short digital content.

10. TONE OF VOICE
• Yes: confident, genuinely Pakistani, human, mass, technically credible, warm, playful.
• No: boastful, stereotyped, industrial, cheap, technical for the sake of technical, noisy, imported-looking, fear-mongering, sentimental.
Note: comedy must make the competitor choice look foolish, not the audience. Never show injury or real tragedy.

11. VISUAL CUES AND FILM ARCHITECTURE
Visual memory: the cut-open cable (copper strands), the LSZH vs PVC split screen, the Worldwide pack shot with coils.
25-second architecture (series films):
• 0 to 5 s — Interruption: Unmistakable opening (rifle, smoking karahi, bill suit)
• 5 to 12 s — Hook and tension: Cheap choice made visible and funny
• 12 to 17 s — Lesson: Javed Sheikh: judge by the work, not the name
• 17 to 22 s — Product proof: Ceiling cutaway, PVC vs LSZH split screen, copper macro
• 22 to 25 s — Close: Pack shot, VO line, "Pehchaan naam se nahi, kaam se", logo
Storyboard style: hand-drawn black and white pencil and charcoal, A4 sheets with the Nasharz header and footer, three frames per row set.

12. FILMS IN THE CAMPAIGN
• Film H: Client script: market walk-through | Product focus: Brand belief, whole range | Status: Storyboard frames 01 to 03 drawn
• Film 1: Nishana (Chaudhry Sb) | Product focus: Building wire, LSZH | Status: Script and 3 board pages done
• Film 2: Guru Ji | Product focus: LSZH | Status: Script and 3 board pages done
• Film 3: Chamkila (Bill-Couture) | Product focus: LSZH and pure copper | Status: Script done. Boards, talent card and location pending

13. SEGMENTATION AND NEED STATES
• Homeowners: "What is inside my walls must not hurt my family" | Product: LSZH building wire | Reason to believe: Low smoke, zero halogen, flame retardant
• Shop and office owners (SME): "I can't afford a fire or an outage" | Product: LSZH, fire alarm | Reason to believe: Fire alarm cable to BS 7629, LSZH option
• Developers, builders, institutions: "I need approved, auditable material" | Product: Full range | Reason to believe: DHA Lahore and DHA Burki approvals, PEC, MES, UET, C&W
• Solar owners: "My panels need cable that lasts the sun" | Product: Solar PV cable | Reason to believe: Tinned copper, UV resistant, XLPO to 120 degrees C, TÜV certified
• Security and IT users: "My camera and network must be clear and reliable" | Product: CCTV RG-59, LAN | Reason to believe: Sub-line: Hifazti Connection (these carry signal, not current)
• Rural and agri users: "My tubewell must not blow" | Product: Building and flexible wire | Reason to believe: Pure copper conductor

14. REASON-TO-BELIEVE AND CLAIMS REGISTER
• LSZH: low smoke, zero halogen, flame retardant — Status: Supported by site and standards (IEC 60754, 61034, 60332)
• 99.99% pure copper — Status: Stated on the site and product pack. Keep a lab certificate on file
• DHA Lahore and DHA Burki approvals, PEC certificate, TÜV Austria partnership — Status: Stated on the site. Use the exact wording and logos the client approves
• Solar PV: UV resistant, XLPO 120 degrees C, TÜV certified — Status: Stated on the site
• "Na aag, na dhuan, na zehrili gas" — Status: Client wording. Keep "Low Smoke Zero Halogen" on screen. Test reports must be ready
• "Same price as PVC" — Status: Not on the site. Needs written confirmation
• Lower bills — Status: Not claimed. Joke only

15. DELIVERABLES
• Strategic thought and cracked insight
• Key frames and storyboards (A4 sheets, 9 frames per film)
• Scripts (Roman Urdu and Urdu) and end frames
• Talent cards and location art direction for each film
• Brand ambassador costs and detailed production cost quotes
Also planned, once concepts are locked: market research (Pakistan cable market, same structure as the Alaska chapter), brand foundation, Big Idea territories, and the marketing strategy for the first phase.

16. SUCCESS MEASURES
• Aided and unaided brand awareness among target homeowners, shop owners and electricians
• Dealer and electrician recommendation: "Which cable?" answered with "Worldwide"
• Trade enquiries and WhatsApp or website leads from campaign cutdowns
• Digital: views and completion on 10-second and 6-second cutdowns

17. OPEN QUESTIONS FOR THE CLIENT
1. Confirm cables only, or are batteries also part of this campaign?
2. Contract scope for Javed Sheikh: TV, digital, print, OOH, term and territory.
3. Written confirmation of price parity with PVC and access to LSZH and copper test reports.
4. Approval of the name "Chamkila" and a fictional bill header (no real utility branding).
5. Appetite for a firearm-prop gag (Nishana) on Pakistani broadcast.
6. Which part of the Ultravolt page do they want us to echo: tone, production value, or the celebrity-plus-proof structure?
7. Is a trade programme (electrician demos, training or rewards) in scope?`,
      keyPoints: [
        'Campaign & Talent: "Naam Se Nahi, Kaam Se Pehchaan" + "Aap ka Hifazti Current" ft. Javed Sheikh (signed by client)',
        'Product Scope & Advantage: Cables only — 99.99% pure copper & LSZH safety technology at PVC-level pricing (pending written confirmation)',
        '4-Film Slate: Hero Client Film (Market Walk-Through) + Series Films (1: Nishana, 2: Guru Ji, 3: Chamkila)',
        'Proof & Approvals: IEC 60754 / 61034 / 60332 test reports, DHA Lahore & Burki approvals, PEC, MES, UET, C&W & TÜV Austria'
      ],
      pageCount: 10,
      attachedFiles: [
        { name: 'WWC_TVC_Creative_Brief_Naam_Se_Nahi.pdf', url: '#', size: '3.2 MB' }
      ]
    },
    {
      id: 'market',
      number: '02',
      title: 'Market',
      category: 'Landscape & Opportunity',
      visualImage: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__Smart_Style_Strong_Connections.png',
      visualImagePosition: 'center center',
      overlayHeadline: 'Worldwide Cables: Two Decades of Proof & Solar Cable Opportunity',
      summary: 'Two decades of cable manufacturing — from tape-recorder leads and battery cables to ethernet, LSZH, and government-approved solar cables — positioned to own solar safety and what’s inside the wire.',
      fullText: `1. WORLDWIDE CABLES — OVERVIEW & PROOF POINTS
Worldwide Cables has been around for two decades. It started with tape-recorder leads, then moved into battery cables as UPS demand grew (per its CEO’s interview). It now also makes ethernet cables and LSZH cables. The strongest proof point I found is that its solar cables were approved for the CM Punjab Free Solar Program and the Lahore Electric Bus Terminal project. That fits your plan to lead with solar. (enggpost)

2. COMPETITOR LANDSCAPE
• Fast Cables (Lahore, founded 1985) — Probably the most active brand in the category.
• Its recent campaign “Bina Bataey, Bina Jataey, Sath Nibhaey” is an emotional, purpose-driven approach that sells care and unity rather than product. (propakistani)
• It has sponsored Islamabad United in the PSL for eight consecutive seasons. (isbunited)
• It runs a consumer authentication and prize scheme called Fast Tasdeeq. (sproxil)
• Its positioning is “Real Quality”. (propakistani)

• Pakistan Cables (founded 1953) — This is the heritage brand.
• It is the oldest listed cable maker on the PSX, with the largest geographic footprint and a two-decade electrician loyalty club. (pakistancables)
• Its creative has been insight-led. One TVC was praised because it had no celebrity and focused purely on a relatable insight. (dawn)
• It has also run a counterfeit-awareness campaign, “Is Your Cable Authentic?”, promoting SMS verification, and a direct “Choose Pakistan Cables” comparison campaign. (adsoftheworld)

• Newage Cables (Lahore, 1956) — It positions on scale and certification: the largest manufacturer in Pakistan and the first in its category with ISO 9000. (dev)

• Smaller and regional players — Coppergat leans on a portfolio of large projects such as CPEC, Kartarpur and the Punjab Assembly. Burq Cables sells on heritage since 1975. (ensun / google)

3. MARKET CONTEXT
• Solar is the growth story. One report estimates 51 GW of solar deployed by March 2026, against 54 GW of module imports. (nukta)
• Quality is a live consumer fear. Coverage notes substandard equipment flooding the market, and one report says cheap solar installations use low-quality cable, including copper-coated aluminum, which causes power loss. Solar buyers are already worried about what’s inside the wire. (thefridaytimes / loksujag)
• Celebrity cable ads are established in India. Examples include KEI with Irrfan Khan, Finolex with Kartik Aaryan and Kiara Advani and KEI again with Rashmika Mandanna. In the Pakistani sources I found, none of the major cable brands used a celebrity, though that isn’t exhaustive. (KEI Wires + Leo Burnett India’s campaign stars Irrfan Khan as the neighbourhood’s ‘lifeline’ +2)

4. WHAT THIS MEANS FOR THE BRIEF (MY READ)
• Everyone claims “quality” and “trust,” so it has stopped meaning anything. Fast, Pakistan Cables and Newage all use versions of it. The client’s script, “Naam se nahi, kaam se pehchaan,” makes the same claim with a famous face. The cable cross-section in the storyboard is what turns it into proof.
• Fast owns emotion and sport, and Pakistan Cables owns heritage and electricians. Neither owns solar safety or “what’s inside the wire.” That is open ground for Worldwide, backed by its government solar approvals.
• Authentication is already claimed by Fast and Pakistan Cables, so avoid a counterfeit-verification message.
• Javed Sheikh is a differentiator in this category, but only if the ads show proof.
• Check overlap with Waves. Its long-running line is “Waves ka Tou Naam Hi Kaafi”. It’s a different category, but “naam” is the opposite of Worldwide’s argument, so the script’s “naam” line could be heard against it. (dawn)

5. GAPS TO FILL WITH THE CLIENT
• Their current customers: contractors, electricians, solar installers or homeowners.
• Prices relative to Fast and Pakistan Cables.
• Their media budget and channels.
• Any past ads or social accounts.
• Whether they have test certificates or standards approvals we can show on camera.`,
      keyPoints: [
        'Worldwide Cables Proof Points: Solar cables approved for CM Punjab Free Solar Program & Lahore Electric Bus Terminal project',
        'Competitor Landscape: Fast Cables (1985 / Fast Tasdeeq / PSL), Pakistan Cables (1953 / PSX / electrician loyalty), Newage Cables (1956 / ISO 9000)',
        'Market Context: 51 GW solar deployed by March 2026 vs 54 GW module imports; rising fear around copper-coated aluminum cables',
        'Strategic Brief Direction: Own solar safety & "what’s inside the wire" with on-camera proof and Javed Sheikh as category differentiator'
      ],
      pageCount: 5,
      attachedFiles: [
        { name: 'WWC_Market_and_Competitor_Landscape.pdf', url: '#', size: '2.6 MB' }
      ]
    },
    {
      id: 'foundation',
      number: '03',
      title: 'Foundation',
      category: 'Strategic Pillar',
      visualImage: 'https://res.cloudinary.com/zpwicpo5/image/upload/Regal_Guru_with_Worldwide_Cables_Box.png',
      visualImagePosition: 'center center',
      overlayHeadline: 'Worldwide Cables: Brand Foundation — Hifazti Current',
      summary: 'Worldwide Cables puts LSZH safety technology at the PVC price, so current runs as power, never as fear — judge the results first, and the name comes after.',
      fullText: `WORLDWIDE CABLES: BRAND FOUNDATION

1. THE CATEGORY PROBLEM
Every major cable brand says “quality” and “trust.” Fast Cables stands on “Real Quality” and Pakistan Cables on heritage and the largest footprint, while Newage claims the largest manufacturer title. Buyers are being asked to choose on a name. No one in the category has made a safety technology the point. (propakistani.pk +2)

2. THE BRAND TRUTH
Worldwide Cables gives you LSZH technology at the price of ordinary PVC. The safer cable doesn’t cost more.

3. THE CONSUMER INSIGHT
People assume the safer, better cable is the premium one, so they default to the big name or the cheapest. They never think about what’s inside the wire until something goes wrong.

4. THE POSITIONING STATEMENT
For anyone who buys cable on a name or a price, Worldwide Cables is the one that puts LSZH safety technology at the PVC price, so current runs as power, never as fear. Judge the results first, and the name comes after.

5. THE BRAND IDEA: حفاظتی کرنٹ (HIFAZTI CURRENT)
This is the single thought behind every film. It is both the product promise and the sign-off line.

6. THE THREE-LINE MESSAGE HIERARCHY
The locked hierarchy, in order of priority:
• Proof: PVC vs LSZH technology, same price — The rational reason to choose us
• Feeling: No fear, just real power — The emotional payoff
• Signature: No big name, results first, then the Hifazti Current — The tagline and the sign-off
The Urdu lines you wrote carry all three, and they end every film.

7. WHO WE’RE TALKING TO
These come straight from your characters:
• The electrician or installer, who recommends and buys the cable (the Guru’s student).
• The shop or business owner, who pays the bills and wants no extra cost (the Costume Designer).
• The land and farm owner, who runs the tubewell and trusts big names (the Chaudhary).

8. ROLE OF JAVED SHEIKH
He is the biggest name in the ad, and he spends it arguing that names don’t matter. He plays characters who are fond of show and status, and the film wins by showing him change his mind in front of a result. The brand speaks calmly through the product and the voice-over, while the characters bring the colour and the noise.

9. PERSONALITY AND TONE
• Colourful, warm and alive. Saturated palettes, generous comedy and affection for the characters.
• Calm confidence. The brand never shouts or scares.
• Never haunting or deadly. The smoke demo is theatre. Nobody is ever afraid.

10. THE RULES FOR EVERY FILM
• A colourful character and a funny problem first.
• The PVC vs LSZH side-by-side, with the same price on both.
• The locked end sequence, ending on “Aap ka hifazti current. Pehchaan naam se nahi, kaam se!”
• 20 to 25 seconds, with no extra claims beyond the three lines.

11. WHAT WE WILL NOT DO
• Use fear to sell, because the promise is the opposite.
• Argue on heritage or size, which belongs to the competitors.
• Run an authenticity or verification message, which Fast and Pakistan Cables already own.
• Add any new selling idea beyond the three lines.

12. PHASE 1 GOAL AND WHAT TO MEASURE
Phase 1 is one clear message in the market. The two measures that matter are whether people remember “Hifazti Current” and whether they understand that LSZH comes at the PVC price.

TWO CLAIMS TO LOCK BEFORE THIS IS FINAL
• “Same price as PVC”: It must hold across the product range the ads feature. If it applies to only some products, the films should name them.
• “No fire, no smoke, no toxic gas”: Confirm the exact wording against the test certificates before it appears in print or voice-over.`,
      keyPoints: [
        'Brand Truth & Positioning: LSZH safety technology at the PVC price — current runs as power, never as fear',
        'Brand Idea: حفاظتی کرنٹ (Hifazti Current) — single thought behind every film and the sign-off line',
        'Three-Line Hierarchy: Proof (PVC vs LSZH, same price) • Feeling (No fear, real power) • Signature (Results first, Hifazti Current)',
        'Phase 1 Measures & Claims: Recall of "Hifazti Current" & LSZH-at-PVC-price; lock price parity scope & test-certificate wording'
      ],
      pageCount: 5,
      attachedFiles: [
        { name: 'WWC_Brand_Foundation_Hifazti_Current.pdf', url: '#', size: '2.1 MB' }
      ]
    },
    {
      id: 'big-idea',
      number: '04',
      title: 'Big Idea',
      category: 'Creative Core',
      visualImage: 'https://res.cloudinary.com/zpwicpo5/image/upload/Colourful_Courtyard_Cable_Advertisement_1.png',
      visualImagePosition: 'center center',
      overlayHeadline: '“Hifazti Current” (حفاظتی کرنٹ) — No Fear, Just Real Power',
      summary: '“Hifazti Current” (حفاظتی کرنٹ) — Javed Sheikh plays Pakistan’s loudest, most colourful characters who prove LSZH technology at the PVC price, landing on: Naam se nahi, kaam se pehchaan.',
      fullText: `1. THE BIG IDEA — “HIFAZTI CURRENT” (حفاظتی کرنٹ)
• One line: Javed Sheikh plays the loudest, most colourful characters in Pakistan. Each one is stuck in a problem, and each one learns that the answer is not a big name but the wire behind the wall. LSZH technology comes at the PVC price, and the current runs as power, not fear.
• The irony that drives it: Javed Sheikh’s characters are themselves “big names”: a guru, a chaudhary, a fashion designer. Each of them is dazzled by show and status. The film makes the point that you shouldn’t buy a cable on name, and it makes it through the biggest name on screen. This is your own tagline, “Naam se nahi, kaam se pehchaan,” played for comedy.

2. THE THREE STRATEGIC LINES
Every film proves one thing and then lands on the same three lines:
• PVC vs LSZH technology, same price. This is the proof.
• No fear, just real power. This is the feeling.
• No big name, see the results first, then the Hifazti Current. This is the sign-off.

3. THE STRUCTURE OF EVERY 20–25 SECOND FILM
• 0–5 sec: A colourful character, a colourful setting and a funny problem
• 5–12 sec: The side-by-side: PVC vs LSZH, with the same price tag on both
• 12–20 sec: Voice-over and a brand pack shot, with the character delighted and no one frightened
• 20–25 sec: Locked end sequence, identical in every film

The locked end sequence (Urdu, exactly as written):
اب پی وی سی کی قیمت میں ایل ایس زیڈ ایچ ٹیکنالوجی، نہ آگ، نہ دھواں اور نہ ہی زہریلی گیس۔
کیبل جس میں کرنٹ طاقت بن کر دوڑے، خوف بن کر نہیں...
ورلڈ وائیڈ کیبلز۔ آپ کا حفاظتی کرنٹ۔
پہچان نام سے نہیں، کام سے!

The timings above are a guide, and the full VO needs about 12 seconds on its own. The character beats before it have to stay very short to fit.

4. THE THREE FILMS
• Film 1: The Guru (orange robes, palace)
  - The problem: An electrician comes to the guru for wisdom, and the guru teaches by demonstration.
  - The proof: He holds up two cable pieces and burns them. The PVC one gives a theatrical cloud of thick smoke, so thick the electrician flaps his hands and coughs. The LSZH one gives none. Both pieces carry the same price tag.
  - The punchline: The guru gestures calmly at the clear air, sets down the Worldwide box and says the line.

• Film 2: The Costume Designer (pink tracksuit, boutique)
  - The problem: He waves a huge electricity bill and complains about everything that costs more and more.
  - The connection to the product: The bill is the expensive pain. The cable is the one thing in his shop that costs no extra. He gets the LSZH technology at the PVC price.
  - The side-by-side: He holds up the two cables with their price tags and shows they match.

• Film 3: The Chaudhary (pink jacket, courtyard)
  - The problem: His tubewell wiring, and a house full of people who all swear by different big brands.
  - The proof: He stages the PVC vs LSZH comparison in the courtyard, then dismisses the big-name arguments with a flourish.
  - The punchline: The Worldwide box and the end sequence.

More characters can slot into the same template later for the other segments you mentioned (malls, corporate projects), as long as each one keeps the same three-line landing.

5. TONE RULES (COLOURFUL, ALIVE, NOT HAUNTING)
• Saturated palettes, warm light and generous comedy.
• The smoke is a comic prop. Nobody is ever frightened, and the cable is the calm answer.
• The LSZH side is bright and clean, never a “before and after” horror.

6. THREE THINGS TO CHECK BEFORE SHOOTING
• "نہ آگ" (no fire): LSZH cables are typically described as low-smoke and flame-retardant rather than fireproof. Confirm the wording against your test certificates before the voice-over is locked, since Pakistani advertising clearances may ask you to substantiate it.
• Same price as PVC: This is the central claim, so the client has to be able to stand behind it. It matches what the CEO said in their interview, that LSZH options would come without an extra price burden for customers. (enggpost)
• References in your images: The boutique bill shows KE Electricity branding, so use a fictional utility on the real shoot. The shotgun in the chaudhary frame is a comic prop but sits awkwardly with “no fear,” and it may need broadcast clearance.`,
      keyPoints: [
        'The Big Idea: “Hifazti Current” (حفاظتی کرنٹ) — LSZH technology at the PVC price, running as power, not fear',
        'Three Strategic Lines: PVC vs LSZH same price (proof) • No fear, just real power (feeling) • Results first, then Hifazti Current (sign-off)',
        'Three Hero Films (20–25s): Film 1 The Guru (palace) • Film 2 The Costume Designer (boutique) • Film 3 The Chaudhary (courtyard)',
        'Pre-Shoot Clearances: Substantiate "نہ آگ" vs test certificates, confirm same price as PVC, replace KE Electricity utility & clear shotgun prop'
      ],
      pageCount: 8,
      attachedFiles: [
        { name: 'WWC_Hifazti_Current_Big_Idea.pdf', url: '#', size: '4.2 MB' }
      ]
    },
    chapter05Data,
    {
      id: 'storyboards',
      number: '06',
      title: 'Storyboards',
      category: 'Visual Framing',
      visualImage: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables_Electrician_Showcase_3.png',
      visualImagePosition: 'center center',
      overlayHeadline: 'Commercial Storyboards.',
      summary: 'Concept 1 & Concept 2 visual storyboards (12 high-resolution frames)',
      lastUpdated: 'Route 1',
      fullText: `WORLDWIDE CABLES — STORYBOARDS (CONCEPT 1 & CONCEPT 2)

CONCEPT 1 — STORYBOARD 1 (6 SLIDES)
• Slide 1 to Slide 6: Complete visual framing sequence for Concept 1.

CONCEPT 2 — STORYBOARD 2 (6 SLIDES)
• Slide 1 to Slide 6: Complete visual framing sequence for Concept 2.`,
      folders: [
        {
          id: 'concept-1',
          name: 'Concept 1',
          conceptName: 'Storyboard 1 — Concept 1',
          product: 'Worldwide Cables — Concept 1',
          images: [
            {
              title: 'Concept 1 — Slide 1',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F1.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 1 — Slide 2',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F2.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 1 — Slide 3',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F3.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 1 — Slide 4',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F4.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 1 — Slide 5',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F5.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 1 — Slide 6',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F6.png',
              objectPosition: 'center center'
            }
          ]
        },
        {
          id: 'concept-2',
          name: 'Concept 2',
          conceptName: 'Storyboard 2 — Concept 2',
          product: 'Worldwide Cables — Concept 2',
          images: [
            {
              title: 'Concept 2 — Slide 1',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N1.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 2 — Slide 2',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N1a.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 2 — Slide 3',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N2.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 2 — Slide 4',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N3.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 2 — Slide 5',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N4.png',
              objectPosition: 'center center'
            },
            {
              title: 'Concept 2 — Slide 6',
              url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N5.png',
              objectPosition: 'center center'
            }
          ]
        }
      ],
      galleryImages: [
        {
          title: 'Concept 1 — Slide 1',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F1.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 1 — Slide 2',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F2.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 1 — Slide 3',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F3.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 1 — Slide 4',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F4.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 1 — Slide 5',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F5.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 1 — Slide 6',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__F6.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 2 — Slide 1',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N1.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 2 — Slide 2',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N1a.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 2 — Slide 3',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N2.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 2 — Slide 4',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N3.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 2 — Slide 5',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N4.png',
          objectPosition: 'center center'
        },
        {
          title: 'Concept 2 — Slide 6',
          url: 'https://res.cloudinary.com/zpwicpo5/image/upload/Worldwide_Cables__N5.png',
          objectPosition: 'center center'
        }
      ],
      keyPoints: [
        'Concept 1 (Storyboard 1): 6 high-resolution storyboard slides (F1–F6)',
        'Concept 2 (Storyboard 2): 6 high-resolution storyboard slides (N1, N1a, N2–N5)',
        'Full PDF export includes Concept 1 and Concept 2 separated by reverse white-on-black section headings',
        'Interactive click-to-zoom and magnifying glass inspection across all 12 frames'
      ],
      pageCount: 12,
      attachedFiles: [
        { name: 'WWC_Storyboards_Concept1_and_Concept2.pdf', url: '#', size: '12 Slides • PDF' }
      ]
    },
    chapter07Data
  ],
  estimates: BASE_ESTIMATE_ITEMS,
  logs: [
    { id: 'log-1', name: 'WWC', role: 'client', timestamp: '2026-08-13 10:15:00' },
    { id: 'log-2', name: 'wwcadmin', role: 'admin', timestamp: '2026-08-13 10:30:12' }
  ],
  mediaAssets: [
    {
      id: 'media-color-grade-4',
      title: 'Color Grade Ref 4: Har Koi Peera (Lahori Zeera 2.0)',
      type: 'video',
      category: 'Color Grade & Tone Reference',
      url: 'https://res.cloudinary.com/zpwicpo5/video/upload/vidssave.com_Har_Koi_Peera_Lahori_Zeera_2.0_1080P.mp4',
      downloadUrl: 'https://res.cloudinary.com/zpwicpo5/video/upload/vidssave.com_Har_Koi_Peera_Lahori_Zeera_2.0_1080P.mp4',
      description: 'High-definition vibrant commercial grade, crisp Punjabi outdoor lighting, rich saturation and comedic rhythm — Lahori Zeera 2.0.',
      duration: '0:45',
      fileSize: '8.4 MB',
      uploadedAt: '2026-08-27'
    },
    {
      id: 'media-jingle-jalwa',
      title: 'Jalwa (Reveal)',
      type: 'audio',
      category: 'Jingle Reference Music',
      url: 'https://res.cloudinary.com/zpwicpo5/video/upload/Fashion_Ka_Jalwa_Sukhwinder_Singh_320_Kbps.mp3',
      downloadUrl: 'https://res.cloudinary.com/zpwicpo5/video/upload/Fashion_Ka_Jalwa_Sukhwinder_Singh_320_Kbps.mp3',
      description: 'High-energy rhythmic brass, percussion & vocal punch for the climactic Battery Phelwan / WWC Reveal sequence.',
      duration: '4:42',
      fileSize: '10.8 MB',
      uploadedAt: '2026-08-24'
    },
    {
      id: 'media-jingle-dhoom2',
      title: 'Dhoom 2 (Crazy Kiya Re)',
      type: 'audio',
      category: 'Jingle Reference Music',
      url: 'https://res.cloudinary.com/zpwicpo5/video/upload/Crazy_Kiya_Re_Dhoom_2__Back_In_Action_320_Kbps.mp3',
      downloadUrl: 'https://res.cloudinary.com/zpwicpo5/video/upload/Crazy_Kiya_Re_Dhoom_2__Back_In_Action_320_Kbps.mp3',
      description: 'High-octane electronic groove, modern bassline pulse & kinetic tempo reference for high-impact action cuts.',
      duration: '4:54',
      fileSize: '11.2 MB',
      uploadedAt: '2026-08-24'
    },
    {
      id: 'media-jingle-dangal-title',
      title: 'Dangal (Title Track)',
      type: 'audio',
      category: 'Jingle Reference Music',
      url: 'https://res.cloudinary.com/zpwicpo5/video/upload/Dangal_-_Title_Track_Dangal_Aamir_Khan_Pritam_Amitabh_Bhattacharya_Daler_Mehndi_HD_Video.mp3',
      downloadUrl: 'https://res.cloudinary.com/zpwicpo5/video/upload/Dangal_-_Title_Track_Dangal_Aamir_Khan_Pritam_Amitabh_Bhattacharya_Daler_Mehndi_HD_Video.mp3',
      description: 'Iconic energetic vocals by Daler Mehndi with anthemic Punjabi wrestling dhol cadence and epic build-up.',
      duration: '4:59',
      fileSize: '11.5 MB',
      uploadedAt: '2026-08-24'
    }
  ]
};
