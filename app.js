// ============ KONFIG ============
const ANIMAL_APP_URL = "https://zecior13.github.io/Namibia-animals/";
document.getElementById("animalAppLink").href = ANIMAL_APP_URL;

const MONTH_NAMES_SHORT = {"06":"cze","07":"lip"};

// ============ ONBOARDING ============
function closeOnboard(){
  document.getElementById("onboard").style.display = "none";
  localStorage.setItem("namibia_guide_seen", "1");
}
if(localStorage.getItem("namibia_guide_seen")){
  document.getElementById("onboard").style.display = "none";
}

// ============ TABS ============
function switchTab(name){
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active", t.dataset.tab===name));
  document.getElementById("panel-trasa").style.display = name==="trasa" ? "" : "none";
  document.getElementById("panel-jedzenie").style.display = name==="jedzenie" ? "" : "none";
  document.getElementById("panel-info").style.display = name==="info" ? "" : "none";
  if(name==="info" && !document.getElementById("panel-info").dataset.rendered){
    renderInfoTab();
    document.getElementById("panel-info").dataset.rendered = "1";
  }
  if(name==="jedzenie" && !document.getElementById("panel-jedzenie").dataset.rendered){
    renderFoodTab();
    document.getElementById("panel-jedzenie").dataset.rendered = "1";
  }
}

// ============ MAPA OGÓLNA (SVG) ============
function renderOverviewMap(highlightRegion){
  const W = 320, H = 230;
  const pad = 20;
  function px(r){ return pad + (r.x/100)*(W-2*pad); }
  function py(r){ return pad + (r.y/100)*(H-2*pad); }

  // linia trasy
  let pathPts = ROUTE_ORDER.map(key => {
    const r = REGION_MAP[key];
    return `${px(r)},${py(r)}`;
  }).join(" ");

  let dots = "";
  let labels = "";
  const seen = new Set();
  ROUTE_ORDER.forEach((key)=>{
    if(seen.has(key)) return; // nie duplikuj punktu windhoek na końcu
    seen.add(key);
    const r = REGION_MAP[key];
    const isHi = key === highlightRegion;
    const x = px(r), y = py(r);
    dots += `<circle cx="${x}" cy="${y}" r="${isHi?7:5}" fill="${isHi?'#C1652F':'#6E7C59'}" stroke="#fff" stroke-width="2"/>`;
    const anchor = x > W-60 ? "end" : (x < 60 ? "start" : "middle");
    const dx = x > W-60 ? -10 : (x < 60 ? 10 : 0);
    labels += `<text x="${x+dx}" y="${y-12}" font-size="9.5" font-weight="${isHi?'700':'500'}" fill="${isHi?'#9B4E22':'#5B5040'}" text-anchor="${anchor}" font-family="Georgia,serif">${r.label}</text>`;
  });

  const svg = `
  <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${W}" height="${H}" fill="#F1ECDB" rx="10"/>
    <polyline points="${pathPts}" fill="none" stroke="#D9A24B" stroke-width="2.5" stroke-dasharray="1,5" stroke-linecap="round"/>
    ${dots}
    ${labels}
  </svg>`;
  return svg;
}

function paintOverviewMap(){
  document.getElementById("overviewMapWrap").innerHTML =
    renderOverviewMap(null) +
    `<div class="map-caption">Schematyczna trasa wyprawy (nie geograficznie dokładna)</div>`;
}

// ============ LISTA DNI ============
function renderDayList(){
  const q = (document.getElementById("daySearch").value || "").toLowerCase().trim();
  const wrap = document.getElementById("dayListWrap");
  wrap.innerHTML = "";
  DAYS.forEach(day=>{
    if(q){
      const hay = [
        day.title, day.subtitle, REGION_LABELS[day.region],
        ...(day.guide||[]).map(g=>g.h+" "+g.t),
        ...(day.animals||[]).map(a=>a.name+" "+a.note),
        ...(day.schedule||[]).map(s=>s.text)
      ].join(" ").toLowerCase();
      if(!hay.includes(q)) return;
    }
    const [dd,mm] = day.date.split(".");
    const item = document.createElement("div");
    item.className = "daylist-item";
    item.onclick = ()=>openDay(day.id);
    item.innerHTML = `
      <div class="dl-date"><span class="num">${dd}</span><span class="mon">${MONTH_NAMES_SHORT[mm]||mm}</span></div>
      <div class="dl-mid">
        <span class="ti">Dzień ${day.id} · ${day.title}</span>
        <span class="su">${day.subtitle}</span>
        <span class="region-pill">${REGION_LABELS[day.region]||day.region}</span>
      </div>
      <div class="dl-icon">${(day.weather&&day.weather.icon)||"📍"}</div>
    `;
    wrap.appendChild(item);
  });
  if(wrap.innerHTML === "" ){
    wrap.innerHTML = `<p style="text-align:center;color:var(--ink-soft);font-size:13px;padding:20px 0;">Brak wyników dla „${q}”.</p>`;
  }
}
// ============ WIDOK SZCZEGÓŁU DNIA ============
let currentDayId = null;

function openDay(id){
  currentDayId = id;
  const day = DAYS.find(d=>d.id===id);
  if(!day) return;
  renderDayDetail(day);
  document.getElementById("dayDetail").classList.add("open");
  document.getElementById("dayDetail").scrollTop = 0;
  window.scrollTo(0,0);
}
function closeDay(){
  document.getElementById("dayDetail").classList.remove("open");
}
function navDay(delta){
  const idx = DAYS.findIndex(d=>d.id===currentDayId);
  const next = DAYS[idx+delta];
  if(next) openDay(next.id);
}

function miniMap(region){
  // mała wersja overview map z podświetlonym regionem dnia
  return renderOverviewMap(region);
}

function renderDayDetail(day){
  const idx = DAYS.findIndex(d=>d.id===day.id);
  const isFirst = idx===0, isLast = idx===DAYS.length-1;

  const routeBlock = day.route && day.route.from !== "—" ? `
    <div class="dd-block">
      <div class="dd-block-title">🚗 Trasa dnia</div>
      <div class="route-line"><span class="pt">${day.route.from}</span> → <span class="pt">${day.route.to}</span></div>
      <div class="route-meta">
        <span><b>${day.route.distance}</b></span>
        <span>⏱ ${day.route.time}</span>
        <span>🛣 ${day.route.surface}</span>
      </div>
      <div class="mini-map-wrap">${miniMap(day.region)}</div>
    </div>` : `
    <div class="dd-block">
      <div class="dd-block-title">📍 Dziś bez przejazdu</div>
      <div class="mini-map-wrap">${miniMap(day.region)}</div>
    </div>`;

  const weatherBlock = day.weather ? `
    <div class="dd-block">
      <div class="dd-block-title">🌡 Pogoda i ubiór</div>
      <div class="dd-weather">
        <div class="ic">${day.weather.icon||"🌤️"}</div>
        <div>
          <div class="temp">${day.weather.temp}</div>
          <div class="desc">${day.weather.desc}</div>
        </div>
      </div>
    </div>` : "";

  const schedBlock = day.schedule && day.schedule.length ? `
    <div class="dd-block">
      <div class="dd-block-title">🗓 Plan dnia</div>
      ${day.schedule.map(s=>`<div class="sched-item"><div class="sched-time">${s.time}</div><div class="sched-text">${s.text}</div></div>`).join("")}
    </div>` : "";

  const prepBefore = day.prepDayBefore && day.prepDayBefore.length ? `
    <div class="dd-block">
      <div class="dd-block-title">🌙 Przygotuj dzień wcześniej</div>
      <ul class="prep-list">${day.prepDayBefore.map(p=>`<li>${p}</li>`).join("")}</ul>
    </div>` : "";

  const prepMorning = day.prepMorning && day.prepMorning.length ? `
    <div class="dd-block">
      <div class="dd-block-title">☀️ Przygotuj rano</div>
      <ul class="prep-list">${day.prepMorning.map(p=>`<li>${p}</li>`).join("")}</ul>
    </div>` : "";

  const guideBlock = day.guide && day.guide.length ? `
    <div class="dd-block">
      <div class="dd-block-title">📖 Wirtualny przewodnik</div>
      ${day.guide.map(g=>`<div class="guide-entry"><h4>${g.h}</h4><p>${g.t}</p></div>`).join("")}
    </div>` : "";

  const animalsBlock = day.animals && day.animals.length ? `
    <div class="dd-block">
      <div class="dd-block-title">🐾 Zwierzęta do zobaczenia dziś</div>
      <div class="animal-chip-row">
        ${day.animals.map(a=>`<div class="animal-chip"><div class="paw">🐾</div><div><span class="an-name">${a.name}</span><span class="an-note">${a.note}</span></div></div>`).join("")}
      </div>
      <a class="animal-cta" href="${ANIMAL_APP_URL}" target="_blank">Otwórz album zwierząt i zaznacz obserwacje →</a>
    </div>` : "";

  document.getElementById("dayDetail").innerHTML = `
    <div class="dd-header">
      <button class="dd-back" onclick="closeDay()">← Lista dni</button>
      <div class="dd-eyebrow">Dzień ${day.id} · ${day.date} (${day.weekday})</div>
      <div class="dd-title">${day.title}</div>
      <div class="dd-sub">${day.subtitle}</div>
      <div class="dd-nav">
        <button onclick="navDay(-1)" ${isFirst?"disabled":""}>← Poprzedni</button>
        <button onclick="navDay(1)" ${isLast?"disabled":""}>Następny →</button>
      </div>
    </div>
    <div class="dd-body">
      ${routeBlock}
      ${weatherBlock}
      ${schedBlock}
      ${prepBefore}
      ${prepMorning}
      ${guideBlock}
      ${animalsBlock}
    </div>
  `;
}

// ============ INIT ============
paintOverviewMap();
renderDayList();
// ============ INFO TAB ============
function renderInfoTab(){
  document.getElementById("panel-info").innerHTML = `
    <div class="info-section">
      <h3>⚠️ Najważniejsze</h3>
      <ul>
        <li><b>Akt urodzenia córki</b> (pełny odpis, po angielsku) — bez tego straż graniczna nie wpuści 14-latki do Namibii.</li>
        <li><b>Paszporty</b> ważne min. 6 miesięcy od daty powrotu + kserokopie schowane osobno.</li>
        <li><b>Międzynarodowe prawo jazdy</b> kierowcy razem z polskim dokumentem.</li>
        <li><b>Wydrukowane i offline (PDF w telefonie) vouchery</b> wszystkich noclegów — w wielu miejscach nie będzie internetu.</li>
        <li><b>Godziny otwarcia parków</b>: bramy (Sossusvlei, Etosha) otwierają się o wschodzie, zamykają o zachodzie. W czerwcu/lipcu ok. <b>6:30–17:30</b>. Spóźnienie = wysoka grzywna.</li>
        <li><b>Aplikacja LEFA</b> — lokalny Uber, działa w Windhoek i okolicach lotniska.</li>
      </ul>
    </div>

    <div class="info-section">
      <h3>🧥 Ubiór — zasada „cebulki"</h3>
      <p>Rano w Sesriem czy Etoszy bywa zaledwie 5°C, w dzień na pustyni temperatura skacze do 28°C.</p>
      <ul>
        <li>Ciepła kurtka/wiatrówka z polarem + 2× gruby polar — na świt w Deadvlei i nocne czuwania w Okaukuejo.</li>
        <li>Czapka, rękawiczki, lekki komin (Buff) — na poranny pęd autem w Sandwich Harbour i kajaki.</li>
        <li>Ciepła bielizna termiczna — do spania w namiocie dachowym (Spitzkoppe, Madisa — brak prądu i ogrzewania).</li>
        <li>4–5× t-shirty w kolorach ziemi (unikać bieli — czerwony pył; czerni/granatu — muchy tse-tse).</li>
        <li>Buty trekkingowe za kostkę (Big Daddy, Elim Dune) + lekkie tenisówki na zmianę.</li>
        <li>Min. 4 pary grubych skarpet trekkingowych — kluczowe na sandboarding (Dzień 5).</li>
        <li>2× strój kąpielowy — baseny w Madisa, Mount Etjo, Halali, plaża The Mole.</li>
      </ul>
    </div>

    <div class="info-section">
      <h3>💊 Apteczka i kosmetyczka</h3>
      <ul>
        <li>Krem SPF 50, pomadka z UV, krem do rąk — powietrze pustyni jest skrajnie suche.</li>
        <li>Krople nawilżające do oczu — must-have z powodu kurzu.</li>
        <li>Spray na komary DEET 30–50% — przydatny wieczorami przy wodopojach Etoszy.</li>
        <li>Leki osobiste: przeciwbólowe, na żołądek (Stoperan/Smecta), elektrolity, plastry na pęcherze.</li>
        <li>Recepta na Malarone, Ibuprom — kupione przed wyjazdem.</li>
      </ul>
    </div>

    <div class="info-section">
      <h3>🔌 Elektronika i ochrona przed kurzem</h3>
      <ul>
        <li>Szczelne worki strunowe / dry-bagi na aparaty i telefony — szuter przez Kuiseb Canyon jest bardzo tarty.</li>
        <li>Pędzelek do optyki, gruszka fotograficzna.</li>
        <li>Latarki czołowe + zapasowe baterie — niezbędne na Spitzkoppe, Madisa, w drodze do wieży Olifantsrus.</li>
        <li>Powerbanki min. 20 000 mAh — naładowane do pełna przed Spitzkoppe (brak prądu na miejscu).</li>
        <li>Lornetka (najlepiej dwie) — bez niej połowa magii Etoszy ucieknie, gdy drapieżniki leżą daleko w trawie.</li>
      </ul>
    </div>

    <div class="info-section">
      <h3>🏕️ Do kupienia w Windhoek (Maerua Mall, dzień 1)</h3>
      <ul>
        <li>Chusteczki nawilżane (2–3 paczki), papier toaletowy do kabiny.</li>
        <li>Okulary przeciwsłoneczne z polaryzacją dla każdego — biała panewka Etoszy oślepia.</li>
        <li>Zapalniczka/zapałki na braai, klamerki/linka na suszenie ręczników.</li>
        <li>Rękawice robocze, płyn do spryskiwaczy, taśma naprawcza, mała łopatka — sprawdźcie u wypożyczalni, jak nie ma, dokupcie.</li>
      </ul>
    </div>

    <div class="info-section">
      <h3>🛒 Kupić przed wyjazdem</h3>
      <ul>
        <li>Recepta — Malarone</li>
        <li>Ibuprom, Smekta, elektrolity</li>
        <li>Pędzelki do optyki</li>
        <li>Karty eSim (MTC MobileHome, kupcie w punkcie w przylotach)</li>
      </ul>
    </div>
  `;
}
// ============ DANE: JEDZENIE ============
// Bez przypisania do konkretnych dni - swobodny wybór w trasie.
const FOOD_CATEGORIES = [
  { key:"zakupy", label:"🛒 Lista zakupów" },
  { key:"wieczor", label:"🥩 Wieczór / Braai" },
  { key:"lunch", label:"🥪 Lunch w aucie" },
  { key:"tipy", label:"💡 Pro-tipy" }
];

const FOOD_ITEMS = [
  // --- ZAKUPY ---
  { cat:"zakupy", title:"Świeże i na grilla (do lodówki, zapas na 4–5 dni)", time:"Dzień 1 · Maerua Mall",
    body:`<ul>
      <li><b>Steki z dziczyzny</b> — oryks, kudu lub skoczek (springbok). Tańsze od wołowiny, chude i miękkie, idealne na ognisko.</li>
      <li><b>Kiełbaski Braaiwors</b> (boerewors) — klasyk grillowy, zwinięty w ślimaka, robi się błyskawicznie.</li>
      <li><b>Filety z kurczaka</b> — alternatywa, gdy ktoś chce odpocząć od czerwonego mięsa.</li>
      <li><b>Ser Halloumi</b> lub do grillowania — nie topi się w kratę.</li>
      <li><b>Masło czosnkowe</b> — na gorące steki po zdjęciu z ognia.</li>
      <li><b>Warzywa twarde</b>: czerwona cebula, papryka, cukinia — nie psują się szybko.</li>
      <li><b>Duże ziemniaki</b> — do pieczenia w folii w żarze ogniska.</li>
    </ul>` },
  { cat:"zakupy", title:"Baza i „suchy prowiant” (na cały wyjazd)", time:"Dzień 1 · Maerua Mall",
    body:`<ul>
      <li><b>Woda:</b> 3–4 bańki 5L (gotowanie, mycie) + 3 zgrzewki 0,5L do kabiny (zamrażajcie w lodówce — schłodzą napoje w trasie).</li>
      <li><b>Biltong / Droëwors</b> — namibijska suszona wołowina/kiełbaski. Absolutny must-have, kupcie 1 kg od razu — to wasz podstawowy lunch w aucie.</li>
      <li><b>Pieczywo:</b> 2 paczki chleba tostowego (najdłużej świeże).</li>
      <li><b>Puszki:</b> pomidory krojone, fasolka w sosie (Baked Beans), kukurydza, tuńczyk w oleju.</li>
      <li><b>Węglowodany:</b> makaron, ryż w torebkach, kuskus (zalewa się wrzątkiem).</li>
      <li><b>Sos BBQ</b> — duża butelka (np. Spur lub Jimmy's Sauces).</li>
      <li><b>Śniadania:</b> płatki/musli, mleko UHT, banany, jabłka, orzeszki, kawa, herbata.</li>
    </ul>` },
  { cat:"zakupy", title:"Techniczne", time:"Dzień 1 · Maerua Mall",
    body:`<ul>
      <li><b>Węgiel/brykiet</b> — 1 worek na szybki żar + drewno Kameeldoring (przy drogach lub w markecie).</li>
      <li><b>Folia aluminiowa</b> — gruba, do pieczenia ziemniaków i warzyw.</li>
      <li><b>Chusteczki nawilżane</b> — 3 paczki, do mycia rąk przy braku wody.</li>
    </ul>` },

  // --- WIECZÓR / BRAAI ---
  { cat:"wieczor", title:"Zestaw A: „Klasyk z Etoszy”", time:"~20 min",
    body:`<p><b>Główne danie:</b> steki z oryksa lub kudu.</p>
    <p><b>Jak zrobić:</b> wyciągacie z lodówki 15 min przed pieczeniem. Solicie i pieprzycie dopiero na ruszcie. Grillujecie krótko — 3–4 min z każdej strony (dziczyzna jest chuda, przeciągnięta zrobi się "podeszwą"). Po zdjęciu z ognia kładziecie plaster masła czosnkowego na każdy stek.</p>
    <p><b>Dodatek:</b> chleb tostowy przypieczony na ruszcie jako grzanki czosnkowe.</p>
    <p><b>Warzywo:</b> sałatka z pomidorków koktajlowych i ogórka z oliwą.</p>` },
  { cat:"wieczor", title:"Zestaw B: „Afrykański Ślimak z Ziemniakiem”", time:"~40 min, wymaga planowania",
    body:`<p><b>Start:</b> zaraz po rozpaleniu ogniska zawijacie duże ziemniaki w folię i wrzucacie wprost w czerwony żar na dno paleniska. Same się piekną przez ok. 40 min.</p>
    <p><b>Główne danie:</b> kiełbasa Braaiwors (Boerewors) — cały krążek na ruszt, pieczecie powoli, obracając tylko raz.</p>
    <p>Pod koniec kładziecie na ruszt plastry sera Halloumi (po 2 min z każdej strony).</p>
    <p><b>Finał:</b> rozcinacie upieczone w żarze ziemniaki, dajecie masło do środka i jecie z kiełbaską.</p>` },
  { cat:"wieczor", title:"Zestaw C: „Szaszłyki Damaraland”", time:"~25 min",
    body:`<p><b>Główne danie:</b> pierś z kurczaka lub steki ze skoczka (springbok), pokrojone w kostkę.</p>
    <p><b>Jak zrobić:</b> na metalowe szpadki (będą w wyposażeniu auta Asco) nawleka się na zmianę: mięso, czerwoną paprykę, krążki czerwonej cebuli i cukinię. Smarujecie gotowym sosem BBQ z butelki.</p>
    <p><b>Jak piec:</b> często obracajcie na małym żarze, aż warzywa zmiękną, a mięso przejdzie dymem.</p>
    <p><b>Dodatek:</b> błyskawiczny kuskus — wrzątek do garnka, 5 min i gotowe.</p>` },

  // --- LUNCH W AUCIE ---
  { cat:"lunch", title:"Zestaw 1: „Biltong & Energy Boost”", time:"Bez gotowania",
    body:`<p>Garść namibijskiego biltongu (słona, suszona dziczyzna) + suszone kiełbaski droëwors.</p>
    <p>Do tego banan lub jabłko i garść orzechów.</p>
    <p><b>Zaleta:</b> zero śmieci, wysoka energia, idealne do trzymania w jednej ręce, gdy druga trzyma aparat — kluczowe w Etoszy, gdzie nie wolno wysiadać z auta.</p>` },
  { cat:"lunch", title:"Zestaw 2: „Kempingowy Burger z Tuńczykiem”", time:"~3 min",
    body:`<p>Chleb tostowy. Otwieracie puszkę tuńczyka w oleju, odlewacie płyn, mieszacie w miseczce z kukurydzą z puszki i odrobiną majonezu/ketchupu.</p>
    <p>Nakładacie na chleb. Sycące, chłodne i gotowe w 3 minuty.</p>` },

  // --- PRO-TIPY ---
  { cat:"tipy", title:"Zasada czystej lodówki", time:"",
    body:`<p>Lodówka w aucie od Asco chłodzi tylko wtedy, gdy silnik pracuje lub auto jedzie. W nocy działa na dodatkowym akumulatorze kempingowym. Nie otwierajcie jej bez potrzeby po zmroku, by trzymała temperaturę do rana.</p>` },
  { cat:"tipy", title:"Marynowanie w trasie", time:"",
    body:`<p>Jeśli kupicie twarde mięso, pokrójcie je rano w kostkę, zalejcie sosem BBQ w szczelnym pojemniku i wrzućcie do lodówki w aucie. Podczas wielu godzin jazdy szutrami wibracje samochodu idealnie "wmasują" marynatę — wieczorem mięso będzie idealnie miękkie.</p>` },
  { cat:"tipy", title:"Najpierw drewno, potem węgiel", time:"",
    body:`<p>Zasada namibijskiego kempingu: najpierw rozpalacie ognisko z twardego drewna dla klimatu i ciepła, ale samo mięso pieczecie na węglu lub brykiecie — daje stabilny, równomierny żar i nie pali mięsa.</p>` }
];

function renderFoodTab(){
  const panel = document.getElementById("panel-jedzenie");
  panel.innerHTML = `
    <div class="food-chips" id="foodChips"></div>
    <div id="foodCardsWrap"></div>
  `;
  const chipsWrap = document.getElementById("foodChips");
  let activeCat = "zakupy";

  function paintChips(){
    chipsWrap.innerHTML = FOOD_CATEGORIES.map(c=>
      `<div class="food-chip ${c.key===activeCat?'active':''}" data-cat="${c.key}">${c.label}</div>`
    ).join("");
    chipsWrap.querySelectorAll(".food-chip").forEach(chip=>{
      chip.onclick = ()=>{ activeCat = chip.dataset.cat; paintChips(); paintCards(); };
    });
  }
  function paintCards(){
    const items = FOOD_ITEMS.filter(i=>i.cat===activeCat);
    document.getElementById("foodCardsWrap").innerHTML = items.map(i=>`
      <div class="food-card">
        <div class="food-card-head">
          <span class="food-card-title">${i.title}</span>
          ${i.time?`<span class="food-card-time">${i.time}</span>`:""}
        </div>
        ${i.body}
      </div>
    `).join("");
  }
  paintChips();
  paintCards();
}
