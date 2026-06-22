// Schematyczne pozycje regionów na mapie ogólnej (układ względny 0-100, nie geograficznie dokładny,
// ale zachowuje ogólne relacje: północ-południe / wschód-zachód Namibii)
const REGION_MAP = {
  transit:     { x: 50, y: 6,  label: "Europa", short:"✈️" },
  windhoek:    { x: 55, y: 50, label: "Windhoek" },
  sossusvlei:  { x: 30, y: 70, label: "Sossusvlei / Sesriem" },
  swakopmund:  { x: 18, y: 48, label: "Swakopmund" },
  spitzkoppe:  { x: 28, y: 38, label: "Spitzkoppe" },
  damaraland:  { x: 30, y: 28, label: "Damaraland" },
  etosha:      { x: 52, y: 14, label: "Etosha" },
  mountetjo:   { x: 50, y: 32, label: "Mount Etjo" }
};

// Kolejność odwiedzania regionów (do narysowania linii trasy)
const ROUTE_ORDER = ["windhoek","sossusvlei","swakopmund","spitzkoppe","damaraland","etosha","mountetjo","windhoek"];

const REGION_LABELS = {
  transit: "W trasie", windhoek: "Windhoek", sossusvlei: "Sossusvlei", swakopmund: "Swakopmund",
  spitzkoppe: "Spitzkoppe", damaraland: "Damaraland", etosha: "Etosha", mountetjo: "Mount Etjo"
};
const DAYS = 
[
  {
    "id": 0,
    "date": "25.06",
    "weekday": "Czwartek",
    "title": "Wylot z Europy",
    "subtitle": "Wrocław → Wiedeń → Frankfurt → Windhoek",
    "region": "transit",
    "route": {
      "from": "Wrocław",
      "to": "w powietrzu",
      "distance": "—",
      "time": "cały dzień",
      "surface": "—"
    },
    "weather": {
      "temp": "—",
      "desc": "Dzień w trasie i samolotach — ubiór wygodny, podróżny.",
      "icon": "✈️"
    },
    "schedule": [
      {
        "time": "08:00",
        "text": "Wyjazd samochodem z Wrocławia (ok. 6 h)"
      },
      {
        "time": "18:30",
        "text": "Wylot z Wiednia"
      },
      {
        "time": "20:00",
        "text": "Przylot Frankfurt"
      },
      {
        "time": "21:55",
        "text": "Wylot do Namibii"
      }
    ],
    "prepDayBefore": [
      "Spakowane bagaże wg listy (warstwa cebulki — patrz zakładka Info)",
      "Wydrukowane/offline PDF wszystkich voucherów w telefonie",
      "Paszporty + akt urodzenia córki (wymóg wjazdu z nieletnim!) + kserokopie osobno",
      "Powerbanki naładowane do pełna"
    ],
    "prepMorning": [
      "Międzynarodowe prawo jazdy kierowcy razem z polskim",
      "Karty płatnicze (dwie różne) + trochę gotówki na start"
    ],
    "guide": [
      {
        "h": "Co warto wiedzieć przed startem",
        "t": "To najdłuższy dzień w trasie — dwa przesiadkowe loty i ok. 10 h w powietrzu do Windhoek. Warto się wyspać w samolocie, bo dzień 1 zaczyna się od razu od formalności i odbioru auta."
      }
    ],
    "animals": []
  },
  {
    "id": 1,
    "date": "26.06",
    "weekday": "Piątek",
    "title": "Przylot — Windhoek",
    "subtitle": "Lotnisko Hosea Kutako (WDH) → Windhoek",
    "region": "windhoek",
    "route": {
      "from": "Lotnisko WDH",
      "to": "Windhoek",
      "distance": "ok. 45 km",
      "time": "45 min – 1 h",
      "surface": "asfalt (B6)"
    },
    "weather": {
      "temp": "5–22°C",
      "desc": "Windhoek zimą: chłodny poranek, ciepłe, słoneczne popołudnie. Lekka kurtka na rano wystarczy.",
      "icon": "🌤️"
    },
    "schedule": [
      {
        "time": "08:10",
        "text": "Lądowanie i kontrola paszportowa. Akt urodzenia córki — wymóg wjazdu z nieletnim."
      },
      {
        "time": "08:40",
        "text": "Wiza na lotnisku (ok. 1200 NAD/os) + wypłata gotówki (NAD/ZAR) + karta eSim."
      },
      {
        "time": "09:00",
        "text": "Transfer do Asco Car Hire — odbiór 4×4, szkolenie z namiotu dachowego, kół zapasowych i kompresora."
      },
      {
        "time": "13:00",
        "text": "Wielkie zakupy w Maerua Mall (Checkers/Spar) — woda, mięso na braai, lodówka do pełna."
      },
      {
        "time": "19:00",
        "text": "Kolacja: Joe's Beerhouse (stolik zarezerwowany) — spróbujcie Bushman Sosatie lub Game Steak."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Gotówka NAD/ZAR z bankomatu na lotnisku — przyda się już na bramy parków",
      "Sprawdźcie limit transferu/transakcji na kartach przed wyjazdem z banku"
    ],
    "guide": [
      {
        "h": "Windhoek — pierwsze kroki",
        "t": "Stolica Namibii leży na wysokości ok. 1700 m, dlatego nawet w środku lata wieczory bywają chłodne. Miasto jest bezpieczne w centrum za dnia, ale jak każda afrykańska metropolia wymaga rozsądku po zmroku."
      },
      {
        "h": "Pro-tip zakupowy",
        "t": "W Maerua Mall kupcie 2 zgrzewki wody 5L więcej niż się wam wydaje, że potrzeba, oraz drewno na ognisko (bundle of wood) — przyda się już następnego dnia w Sesriem."
      },
      {
        "h": "Spacer po mieście (opcjonalnie)",
        "t": "Christuskirche — niemiecki kościół-symbol miasta. Independence Memorial Museum — darmowy wjazd windą na taras widokowy. Namibia Craft Centre — rękodzieło wyższej jakości plus dobra kawiarnia."
      }
    ],
    "animals": [
      {
        "name": "Pawian czarny",
        "note": "Czasem widywany na obrzeżach miasta i przy drogach."
      }
    ]
  },
  {
    "id": 2,
    "date": "27.06",
    "weekday": "Sobota",
    "title": "Windhoek → Sesriem",
    "subtitle": "Wjazd w pustynię Namib",
    "region": "sossusvlei",
    "route": {
      "from": "Windhoek",
      "to": "Sesriem",
      "distance": "320–350 km",
      "time": "5–6 h",
      "surface": "asfalt → szuter"
    },
    "weather": {
      "temp": "5–28°C rano/dzień",
      "desc": "Klasyczna 'cebulka': mroźny świt, piekący upał w południe. Czapka i rękawiczki na poranny wyjazd.",
      "icon": "🌅"
    },
    "schedule": [
      {
        "time": "08:30",
        "text": "Wyjazd z Windhoek przez Rehoboth i przełęcz Remhoogte/Spreetshoogte."
      },
      {
        "time": "—",
        "text": "Przełęcz Spreetshoogte — najbardziej stromy i spektakularny zjazd w Namibii, punkt widokowy na pustynię Namib."
      },
      {
        "time": "—",
        "text": "Solitaire — zdjęcie przy wrakach aut i szarlotka w Moose McGregor's Desert Bakery. Zatankujcie tu — ważne!"
      },
      {
        "time": "—",
        "text": "Wjazd do parku: 1600 NAD (ok. 84 EUR)."
      },
      {
        "time": "po zameldowaniu",
        "text": "Elim Dune na zachód słońca — krótki podjazd (5 km), pierwsze 'płonące' czerwienią piaski."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Ciepła kurtka i polar pod ręką w kabinie, nie w bagażniku",
      "Pełny bak przed wyjazdem z Windhoek"
    ],
    "guide": [
      {
        "h": "Droga B1 i szuter",
        "t": "Do Rehoboth asfalt, dalej zaczyna się szuter — jedźcie maks. 80 km/h. Korugowane drogi C są wszechobecne w Namibii; nadmierna prędkość to najczęstsza przyczyna defektów opon."
      },
      {
        "h": "Solitaire — kultowy przystanek",
        "t": "Malutka osada na środku niczego, znana z legendarnej szarlotki w Moose McGregor's Desert Bakery i wraków starych aut, które stały się jednym z najbardziej fotografowanych miejsc w Namibii."
      },
      {
        "h": "Elim Dune",
        "t": "Ruszajcie z campu 60–90 min przed zachodem. Sam podjazd to chwila, ale podejście na grzbiet w sypkim piasku wymaga wysiłku. Pierwsza krawędź widziana z dołu to nie szczyt — warto podejść wyżej dla widoków na czerwone piaski i trawiaste równiny."
      }
    ],
    "animals": [
      {
        "name": "Oryks (antylopa szablorogata)",
        "note": "Symbol pustyni Namib — często widywany przy drogach o świcie."
      },
      {
        "name": "Szakal czarnogrzbiety",
        "note": "Aktywny o zmierzchu, częsty na trasie do Sesriem."
      },
      {
        "name": "Struś",
        "note": "Spotykany na otwartych równinach przed parkiem."
      }
    ]
  },
  {
    "id": 3,
    "date": "28.06",
    "weekday": "Niedziela",
    "title": "Sossusvlei — Deadvlei i Big Daddy",
    "subtitle": "Wczesny wyjazd przed świtem",
    "region": "sossusvlei",
    "route": {
      "from": "Sesriem",
      "to": "Deadvlei → Sesriem",
      "distance": "ok. 120 km",
      "time": "asfalt 60 km + 5 km piachu",
      "surface": "asfalt + 4x4"
    },
    "weather": {
      "temp": "ok. 5°C rano, 28°C w dzień",
      "desc": "Najchłodniejszy start dnia całej wyprawy. Pełna 'cebulka' na poranny wyjazd — czapka, rękawiczki, polar.",
      "icon": "❄️"
    },
    "schedule": [
      {
        "time": "05:15",
        "text": "Pobudka, szybka kawa."
      },
      {
        "time": "05:35",
        "text": "Szybkie złożenie namiotu dachowego (reszta obozowiska zostaje)."
      },
      {
        "time": "05:45",
        "text": "Start spod wewnętrznej bramy. Asfalt (60 km), maks 70–80 km/h — uważać na oryksy i szakale. Po 45 km mija się Dune 45 — jedźcie dalej!"
      },
      {
        "time": "06:30",
        "text": "Parking 2WD, przesiadka na shuttle NWR do Deadvlei."
      },
      {
        "time": "07:00–09:30",
        "text": "Zwiedzanie Deadvlei, wejście na Big Daddy, śniadanie z widokiem na wydmy."
      },
      {
        "time": "09:30–10:00",
        "text": "Powrót shuttlem do auta."
      },
      {
        "time": "10:15",
        "text": "Stop fotograficzny przy Dune 45."
      },
      {
        "time": "11:15",
        "text": "Powrót na Sesriem Campsite — basen, obiad, relaks w najgorętszej części dnia."
      },
      {
        "time": "15:30",
        "text": "Sesriem Canyon — spacer w cieniu ścian kanionu (ok. 45 min)."
      },
      {
        "time": "17:00",
        "text": "Powrót na kemping, braai i namibijskie niebo pełne gwiazd."
      }
    ],
    "prepDayBefore": [
      "Bagaże gotowe do szybkiego złożenia namiotu o 5:35 — minimum rzeczy w namiocie na noc"
    ],
    "prepMorning": [
      "Pełne butelki wody, śniadanie/przekąski na wynos — w Deadvlei jecie śniadanie w terenie",
      "Naładowane aparaty/telefony, dry-bag na sprzęt fotograficzny"
    ],
    "guide": [
      {
        "h": "Dune 45 — dlaczego jedziecie dalej",
        "t": "Choć to najbardziej znana z fotografii wydma w Namibii, plan dnia stawia na Deadvlei i Big Daddy jako priorytet poranny — światło i temperatura są tam kluczowe przed 9:00. Dune 45 zwiedzicie w drodze powrotnej, bez pośpiechu."
      },
      {
        "h": "Deadvlei — dolina śmierci, która nie umarła do końca",
        "t": "Deadvlei to biała glinianka otoczona najwyższymi wydmami świata. Setki lat temu rzeka Tsauchab zmieniła koryto, odcinając dopływ wody do rosnących tu drzew kameeldoorn (akacja wielbłądzia). Drzewa obumarły, ale dzięki ekstremalnie suchemu klimatowi ich szkielety nie zgniły — po prostu wyschły i sczerniały od słońca, zachowując formę nawet po 600–900 latach. Efekt: czarne, skamieniałe sylwetki drzew na tle białej glinki i pomarańczowych wydm — jeden z najbardziej fotografowanych krajobrazów na świecie, wykorzystywany nawet w filmach (m.in. w 'The Cell' z Jennifer Lopez)."
      },
      {
        "h": "Big Daddy — taktyka wejścia",
        "t": "To jedna z najwyższych wydm w okolicy (ok. 325 m). Samo podejście to 1–1,5 h w sypkim piasku — najlepiej iść grzbietem wydmy, gdzie piasek jest bardziej zbity, a nie po zboczu. Ruszajcie na szczyt od razu po przesiadce, żeby być na górze przed 9:00, zanim piach się rozgrzeje. Klasyczny zjazd na dół to zbieg wprost do Deadvlei — szybki i zabawny sposób na zejście, choć buty napełnią się piaskiem."
      },
      {
        "h": "Sesriem Canyon",
        "t": "Wąski, naturalny kanion wyrzeźbiony przez rzekę Tsauchab w warstwach zlepieńca. Nazwa pochodzi od 'six thongs' — dawni osadnicy musieli związać sześć pasów skórzanych, by wyciągnąć wodę z głębokich sadzawek na dnie kanionu. Spacer w jego cieniu to przyjemny kontrast po upalnym dniu na wydmach."
      }
    ],
    "animals": [
      {
        "name": "Oryks (antylopa szablorogata)",
        "note": "Doskonale widoczny na tle czerwonych wydm."
      },
      {
        "name": "Skoczek pręgowany",
        "note": "Mały gryzoń pustynny, aktywny o świcie."
      },
      {
        "name": "Jaszczurka pustynna (Shovel-snouted lizard)",
        "note": "Słynna z 'tańca termoregulacyjnego' na rozgrzanym piasku."
      }
    ]
  },
  {
    "id": 4,
    "date": "29.06",
    "weekday": "Poniedziałek",
    "title": "Sesriem → Swakopmund",
    "subtitle": "Przez pustynię Namib do wybrzeża",
    "region": "sossusvlei",
    "route": {
      "from": "Sesriem",
      "to": "Swakopmund",
      "distance": "ok. 350 km",
      "time": "09:00 → 17:30",
      "surface": "szuter przez pustynię"
    },
    "weather": {
      "temp": "28°C pustynia → 14–16°C wybrzeże + mgła",
      "desc": "Drastyczna zmiana! Prąd Benguelski chłodzi wybrzeże. Ciepłe polary i wiatrówki w kabinie, nie w bagażniku.",
      "icon": "🌫️"
    },
    "schedule": [
      {
        "time": "08:00",
        "text": "Spokojne śniadanie i wyjazd z Sesriem."
      },
      {
        "time": "09:15",
        "text": "Przystanek 1: Solitaire (szarlotki i wraki)."
      },
      {
        "time": "11:30",
        "text": "Przystanek 2: Kuiseb Canyon i Zwrotnik Koziorożca — droga C14 przez przełęcze Gaub Pass i Kuiseb Pass, krajobraz marsjański. Obowiązkowe zdjęcie przy tablicy Tropic of Capricorn."
      },
      {
        "time": "13:30",
        "text": "Przystanek 3: Walvis Bay — promenada (Waterfront/Lagoon), tysiące flamingów i pelikanów na płyciznach."
      },
      {
        "time": "15:30",
        "text": "Trasa solna do Swakopmund (30 km) — asfaltowa B2 wzdłuż brzegu."
      },
      {
        "time": "16:00",
        "text": "Przyjazd do Swakopmund i zakwaterowanie."
      },
      {
        "time": "19:00",
        "text": "Kolacja: Jetty 1905 (stolik zarezerwowany)."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Schowajcie aparaty i elektronikę do szczelnych worków w kabinie — droga przez Kuiseb bywa bardzo tarta",
      "Ciepłe warstwy pod ręką, nie w bagażniku — temperatura spadnie gwałtownie na wybrzeżu"
    ],
    "guide": [
      {
        "h": "Kuiseb Canyon — krajobraz marsjański",
        "t": "Droga C14 wspina się serpentynami przez dwie przełęcze, Gaub Pass i Kuiseb Pass, odkrywając krajobraz przypominający powierzchnię Marsa — czerwone skały, głębokie rozpadliny i zero wegetacji. To jeden z bardziej dramatycznych odcinków całej trasy."
      },
      {
        "h": "Walvis Bay — flamingi",
        "t": "Laguna Walvis Bay to jedno z ważniejszych miejsc lęgowych i żerowych dla flamingów różowych i mniejszych w południowej Afryce. Tysiące ptaków żerują na płyciznach, filtrując wodę przez specjalnie zbudowane dzioby — widok, który zwykle najbardziej zapada w pamięć dzieciom."
      },
      {
        "h": "Dlaczego na wybrzeżu jest tak chłodno",
        "t": "Prąd Benguelski niesie lodowatą wodę z Antarktyki wzdłuż wybrzeża Namibii, tworząc kontrast termiczny z gorącą pustynią — efektem jest gęsta mgła i temperatury nawet 10–15°C niższe niż w głębi lądu, mimo że jest to wciąż Afryka."
      }
    ],
    "animals": [
      {
        "name": "Flaming różowy i mniejszy",
        "note": "Tysiące osobników żerujących w lagunie Walvis Bay."
      },
      {
        "name": "Pelikan różowy",
        "note": "Często widywany razem z flamingami na płyciznach."
      },
      {
        "name": "Szakal czarnogrzbiety",
        "note": "Polujący na padlinę wzdłuż wybrzeża."
      }
    ]
  },
  {
    "id": 5,
    "date": "30.06",
    "weekday": "Wtorek",
    "title": "Swakopmund — pustynia i adrenalina",
    "subtitle": "Living Desert, sandboarding, zakupy do parków",
    "region": "swakopmund",
    "route": {
      "from": "—",
      "to": "Brak (dzień w mieście i na wydmach)",
      "distance": "—",
      "time": "pełny dzień aktywności",
      "surface": "—"
    },
    "weather": {
      "temp": "14–18°C, mgliście rano",
      "desc": "Typowa pogoda Swakopmund — chłodny, mglisty poranek, rozjaśnia się w ciągu dnia. Polar na rano.",
      "icon": "🌫️"
    },
    "schedule": [
      {
        "time": "08:00–12:30",
        "text": "Living Desert Tour (mała 'Piątka pustyni') — 3000 NAD (cash!)."
      },
      {
        "time": "13:00",
        "text": "Lunch: Village Café."
      },
      {
        "time": "13:45",
        "text": "Duże zakupy do parków (Spar/Pick n Pay): drewno na ognisko, woda, jedzenie — na Spitzkoppe nie ma sklepów."
      },
      {
        "time": "15:00–17:00",
        "text": "Sandboarding (Desert Explorers — zarezerwowane, opłacone)."
      },
      {
        "time": "17:30–18:00",
        "text": "Crystal Gallery — największy na świecie kryształ kwarcu."
      },
      {
        "time": "19:00",
        "text": "Kolacja: The Tug (stolik zarezerwowany)."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Gotówka na Living Desert Tour (3000 NAD, cash!)",
      "Grube, wysokie skarpety trekkingowe na sandboarding — chronią nogi przed obtarciem od butów snowboardowych"
    ],
    "guide": [
      {
        "h": "Living Desert — 'Mała Piątka'",
        "t": "W przeciwieństwie do Wielkiej Piątki (lwy, słonie, bawoły, lampart, nosorożec), Mała Piątka pustyni to mistrzowie przetrwania w wydmach: gekon palczasty, żmija rogata (sidewinder), chrząszcz Tok-tokkie, kameleon namibijski i pająk 'tańcząca biała dama'. Poranek to optymalna pora — tropy na piasku są świeże, zwierzęta aktywne, a temperatura jeszcze znośna."
      },
      {
        "h": "Sandboarding na wydmach",
        "t": "Swakopmund leży tuż przy ogromnych wydmach pustyni Namib, co czyni je jednym z najlepszych miejsc na świecie do zjeżdżania na desce po piasku — prędkości potrafią przekraczać 80 km/h na leżąco."
      }
    ],
    "animals": [
      {
        "name": "Gekon palczasty (Palmatogecko)",
        "note": "Przezroczysty, nocny — łapie wilgoć z mgły na ciele."
      },
      {
        "name": "Żmija rogata (Peringuey's adder)",
        "note": "Poluje zakopana w piasku, poruszając się charakterystycznym 'side-winding'."
      },
      {
        "name": "Chrząszcz Tok-tokkie",
        "note": "Zbiera poranną mgłę na pancerzu, by przetrwać bez deszczu."
      },
      {
        "name": "Kameleon namibijski",
        "note": "Endemit pustyni Namib, doskonale kamuflujący się w piasku."
      }
    ]
  },
  {
    "id": 6,
    "date": "01.07",
    "weekday": "Środa",
    "title": "Walvis Bay i Sandwich Harbour",
    "subtitle": "Kajaki z fokami + rajd 4×4 po wydmach",
    "region": "swakopmund",
    "route": {
      "from": "Swakopmund",
      "to": "Walvis Bay → Sandwich Harbour → Swakopmund",
      "distance": "ok. 80 km + rajd",
      "time": "07:30–17:30",
      "surface": "asfalt + wydmy"
    },
    "weather": {
      "temp": "14–17°C, wietrznie nad wodą",
      "desc": "Pełny dzień na wodzie i wydmach — ciepła, wodoodporna kurtka obowiązkowa (dostaniecie pianki na kajaki).",
      "icon": "🌬️"
    },
    "schedule": [
      {
        "time": "07:00",
        "text": "Wyjazd do Walvis Bay."
      },
      {
        "time": "07:45",
        "text": "Kajaki: Mola Mola Safaris (zarezerwowane, opłacone)."
      },
      {
        "time": "08:30",
        "text": "Wiosłowanie wśród tysięcy fok w bezpiecznej lagunie. Pianki i kurtki nieprzemakalne w cenie."
      },
      {
        "time": "12:30",
        "text": "Lunch na plaży."
      },
      {
        "time": "13:00",
        "text": "Sandwich Harbour 4×4 — przesiadka do auta terenowego, rajd po gigantycznych wydmach."
      },
      {
        "time": "17:30",
        "text": "Powrót do apartamentu."
      },
      {
        "time": "19:00",
        "text": "Kolacja: Old Steamer Restaurant."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Strój kąpielowy/szybkoschnący pod piankę kajakową",
      "Ciepła bluza na po kajakach — wiatr nad laguną bywa ostry"
    ],
    "guide": [
      {
        "h": "Kajaki wśród fok",
        "t": "Laguna Walvis Bay to bezpieczna, płytka zatoka, gdzie foki uchatki (Cape fur seal) są niezwykle ufne wobec kajaków — czasem wskakują na pokład albo płyną tuż przy wiośle. To też dobre miejsce na obserwację szakali patrolujących linię brzegową."
      },
      {
        "h": "Sandwich Harbour — gdzie pustynia wpada w ocean",
        "t": "To jedno z niewielu miejsc na Ziemi, gdzie ogromne wydmy (sięgające 100 m) opadają wprost do oceanu. Niegdyś było to naturalne, choć ryzykowne schronienie dla wielorybniczych statków — stąd nazwa, od pierwszego statku 'Sandwich', który zakotwiczył tu w 1790 r. Dziś to obszar Ramsar — chroniony teren podmokły o międzynarodowym znaczeniu, gdzie żyje ponad 40 000 ptaków, w tym rzadkie czerwonostrzyki namibijskie i kulony pustynne. Rajd 4×4 po stromych wydmach wprost przy linii brzegowej to jeden z najbardziej widowiskowych off-roadów w Namibii — kierowcy znają każdy grzbiet wydmy na pamięć."
      }
    ],
    "animals": [
      {
        "name": "Foka uchatka (Cape fur seal)",
        "note": "Tysiące osobników w lagunie Walvis Bay, bardzo ufne wobec kajaków."
      },
      {
        "name": "Szakal czarnogrzbiety",
        "note": "Patrolujący linię brzegową w poszukiwaniu padliny i jajek ptasich."
      },
      {
        "name": "Czerwonostrzyk namibijski",
        "note": "Rzadki, endemiczny ptak siewkowy z obszaru Sandwich Harbour."
      }
    ]
  },
  {
    "id": 7,
    "date": "02.07",
    "weekday": "Czwartek",
    "title": "Wybrzeże → Spitzkoppe",
    "subtitle": "Wrak Zeila, foki Cape Cross, granitowe szczyty",
    "region": "spitzkoppe",
    "route": {
      "from": "Swakopmund",
      "to": "Spitzkoppe (Damaraland)",
      "distance": "ok. 280 km",
      "time": "08:30–16:30",
      "surface": "droga solna + szuter"
    },
    "weather": {
      "temp": "do 28°C w dzień, ok. 5°C noc",
      "desc": "Spitzkoppe to pustynia bez prądu — noce bardzo chłodne, dni gorące. Bielizna termiczna na noc obowiązkowa.",
      "icon": "🏔️"
    },
    "schedule": [
      {
        "time": "07:30",
        "text": "Wyjazd ze Swakopmund. Lodówka podpięta do zasilania, powerbanki naładowane — w Spitzkoppe nie będzie prądu."
      },
      {
        "time": "08:30",
        "text": "Stop 1: Wrak statku Zeila — przez poranną mgłę wygląda mrocznie. Max 20 min."
      },
      {
        "time": "09:00",
        "text": "Henties Bay — tankowanie do pełna (ostatnie pewne paliwo przed Damaralandem)."
      },
      {
        "time": "10:15",
        "text": "Stop 2: Cape Cross Seal Reserve. Permit dla trójki: 800 NAD."
      },
      {
        "time": "11:30",
        "text": "Wjazd w głąb lądu (C34→C14→D1918) — krajobraz zmienia się w suchy, górzysty Damaraland."
      },
      {
        "time": "15:00",
        "text": "Przyjazd do Spitzkoppe i formalności — meldunek w Tented Camp."
      },
      {
        "time": "16:15",
        "text": "Wjazd pod główną bramę Spitzkoppe Mountain Reserve, bilet dzienny."
      },
      {
        "time": "16:30–18:15",
        "text": "Trekking: Little Bushman Paradise (malowidła Buszmenów San), potem Rock Arch — zdjęcia o zachodzie słońca (ok. 18:15)."
      },
      {
        "time": "po zmroku",
        "text": "Nocne zdjęcia nieba — Droga Mleczna nad Spitzkoppe."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Powerbanki i wszystkie urządzenia naładowane do pełna — w Spitzkoppe nie ma prądu",
      "Latarki czołowe + zapasowe baterie dla każdego"
    ],
    "guide": [
      {
        "h": "Wrak Zeila",
        "t": "Ten trawler rybacki osiadł na mieliźnie w 2008 r. podczas transportu na złom i tak już został — rdzewiejący szkielet na tle pustej plaży, otoczony zwykle gęstą poranną mgłą znoszoną z prądu Benguelskiego."
      },
      {
        "h": "Cape Cross — historia i tysiące fok",
        "t": "To miejsce ma podwójne znaczenie. Po pierwsze historyczne: w 1486 r. portugalski żeglarz Diogo Cão jako pierwszy Europejczyk postawił tu stopę, wznosząc kamienny krzyż (padrão) na rozkaz króla Jana II. Replika krzyża stoi tu do dziś. Po drugie przyrodnicze: to jedna z największych kolonii fok uchatek na świecie — w szczytowym sezonie (listopad-grudzień) zbiera się tu nawet ponad 200 000 zwierząt. Zapach amoniaku i hałas uderzają natychmiast po wyjściu z auta — to w pełni naturalne, intensywne doświadczenie sensoryczne."
      },
      {
        "h": "Spitzkoppe — 'Matterhorn Afryki'",
        "t": "Te granitowe szczyty wyrastające pionowo z płaskiej pustyni uformowały się ok. 120-135 milionów lat temu, gdy roztopiona skała wdarła się w starsze warstwy podczas rozpadu kontynentu Gondwana i otwierania się Oceanu Atlantyckiego. Miliony lat erozji zostawiły charakterystyczne, zaokrąglone kopuły. Spitzkoppe to też jedno z najstarszych miejsc zamieszkanych przez ludzi w regionie — malowidła naskalne ludu San (Buszmenów) w Little Bushman Paradise mają od 2000 do nawet 4000 lat i przedstawiają zwierzęta, postacie ludzkie i symbole rytualne. Rock Arch to naturalny łuk skalny, jeden z najbardziej fotografowanych punktów w Namibii, szczególnie spektakularny podświetlony zachodzącym słońcem."
      }
    ],
    "animals": [
      {
        "name": "Foka uchatka (Cape fur seal)",
        "note": "Ogromna kolonia w Cape Cross Seal Reserve — nawet 100 000+ osobników."
      },
      {
        "name": "Skalniak (Rock hyrax / Dassie)",
        "note": "Mały ssak żyjący w szczelinach granitowych skał Spitzkoppe."
      },
      {
        "name": "Orzełek skalny (Black eagle)",
        "note": "Gnieździ się na klifach granitowych masywu."
      }
    ]
  },
  {
    "id": 8,
    "date": "03.07",
    "weekday": "Piątek",
    "title": "Twyfelfontein → Madisa Camp",
    "subtitle": "UNESCO petroglify + Organ Pipes + Burnt Mountain",
    "region": "damaraland",
    "route": {
      "from": "Spitzkoppe",
      "to": "Madisa Camp (Damaraland)",
      "distance": "ok. 230 km",
      "time": "07:30–16:00",
      "surface": "szuter"
    },
    "weather": {
      "temp": "do 28°C w dzień",
      "desc": "Suchy, górzysty Damaraland — temperatura rośnie gwałtownie po wyjeździe z gór Spitzkoppe.",
      "icon": "🪨"
    },
    "schedule": [
      {
        "time": "07:30",
        "text": "Wyjazd w stronę Twyfelfontein (ok. 230 km szutru, drogi D3716, D2612)."
      },
      {
        "time": "10:30",
        "text": "Szybki stop w Uis (opcjonalnie, tankowanie)."
      },
      {
        "time": "12:00",
        "text": "Twyfelfontein Visitor Centre — bilet 650 NAD, lokalny przewodnik w cenie."
      },
      {
        "time": "12:15–13:45",
        "text": "Spacer wśród czerwonych skał piaskowca — słynne ryty, m.in. 'Lwa z ogonem jak dłoń'."
      },
      {
        "time": "14:00",
        "text": "Organ Pipes — pionowe słupy bazaltowe sprzed 120 mln lat (15-20 min)."
      },
      {
        "time": "14:30",
        "text": "Burnt Mountain (Góra Spalona) — krótki stop widokowy."
      },
      {
        "time": "15:00",
        "text": "Przejazd do Madisa Camp (ok. 50 km)."
      },
      {
        "time": "17:30–20:00",
        "text": "Scenic Sundowner Drive (zarezerwowane, 1950 NAD) — otwartym wozem wśród granitowych wzgórz, drink o zachodzie słońca na szczycie skały."
      },
      {
        "time": "20:15",
        "text": "Wieczorne braai pod gwiazdami."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Napiwek dla przewodnika w Twyfelfontein (ok. 50-100 NAD, gotówka)",
      "Lunch box ze Swakopmund na lunch w trasie"
    ],
    "guide": [
      {
        "h": "Twyfelfontein — afrykańska galeria sztuki sprzed tysiącleci",
        "t": "To jedyne miejsce w Namibii wpisane na listę UNESCO (od 2007 r.) i jedna z największych koncentracji petroglifów (rytów naskalnych) w Afryce — ponad 2500 wyrytych obrazów. Twórcami byli myśliwi-zbieracze z ludu San, a wiek rytów szacuje się na 2000 do nawet 6000-10000 lat. Wyryto je kamiennymi narzędziami z kwarcu, bez metalu. Przedstawiają nosorożce, słonie, żyrafy, strusie, odciski ludzkich i zwierzęcych stóp oraz zagadkowe symbole geometryczne. Co intrygujące, znajdują się tu też ryty fok — choć ocean jest stąd 100 km, co sugeruje, że San docierali aż na wybrzeże po sól. Najsłynniejszy wizerunek to 'Lwa z ogonem jak dłoń' (Lion Man) — postać o ciele lwa i ludzkich stopach, uznawana za mającą znaczenie rytualne, prawdopodobnie związane z transformacją szamana w trakcie transu. Nazwa Twyfelfontein znaczy 'wątpliwe źródło' — w tym suchym krajobrazie obecność jakiejkolwiek wody decydowała o przetrwaniu, a ryty mogły służyć też jako mapy wodopojów."
      },
      {
        "h": "Organ Pipes i Burnt Mountain",
        "t": "Organ Pipes to ściana pionowych słupów bazaltowych uformowanych 120 mln lat temu, gdy lawa krystalizowała się równomiernie, tworząc regularne, kolumnowe kształty przypominające piszczałki organowe. Burnt Mountain tuż obok zawdzięcza swój kolor minerałom w skale, które od daleka wyglądają jak zwęglone przez ogień, choć to czysto geologiczny efekt."
      }
    ],
    "animals": [
      {
        "name": "Słoń pustynny (Desert-adapted elephant)",
        "note": "Szukajcie tabliczek 'Desert Elephant Tracking' — lokalni farmerzy wiedzą, gdzie stado było rano."
      },
      {
        "name": "Skalniak (Rock hyrax)",
        "note": "Powszedni wśród skał Twyfelfontein i Organ Pipes."
      },
      {
        "name": "Oryks",
        "note": "Częsty widok na otwartych równinach Damaralandu."
      }
    ]
  },
  {
    "id": 9,
    "date": "04.07",
    "weekday": "Sobota",
    "title": "Damaraland → Etosza (Galton Gate)",
    "subtitle": "Himba Village, Damara Living Museum, pierwsze safari",
    "region": "etosha",
    "route": {
      "from": "Twyfelfontein",
      "to": "Etosha (Galton Gate) → Olifantsrus",
      "distance": "ok. 270 km",
      "time": "08:00–16:30",
      "surface": "szuter + asfalt"
    },
    "weather": {
      "temp": "do 28°C w dzień, 5-8°C noc",
      "desc": "Noc w Olifantsrus chłodna — ciepłe bluzy na wieczorne czuwanie przy wodopoju.",
      "icon": "🐘"
    },
    "schedule": [
      {
        "time": "07:00",
        "text": "Pobudka i śniadanie w Madisa Camp."
      },
      {
        "time": "08:00",
        "text": "Wyjazd w stronę Kamanjab (D2612, potem C35)."
      },
      {
        "time": "10:15–11:30",
        "text": "Otjikandero Himba Village — opowieść o strukturze rodzinnej, świętym ogniu (Okuruwo), pokaz przygotowania otjize."
      },
      {
        "time": "11:45–12:45",
        "text": "Damara Living Museum (150-200 NAD/os) — tradycyjne stroje, rozpalanie ognia patykami, pokaz tańca i śpiewu."
      },
      {
        "time": "13:00",
        "text": "Kamanjab — ostatnie zakupy i tankowanie pod korek."
      },
      {
        "time": "14:15",
        "text": "Wjazd do parku przez Galton Gate — kontrola weterynaryjna, Permit Office (2400 NAD na 3 dni), zakup papierowej mapy wodopojów (100 NAD)."
      },
      {
        "time": "14:45–16:30",
        "text": "Pierwsze safari — ok. 60 km do Olifantsrus, pierwsze wodopoje Kamaku i Otjovasandu."
      },
      {
        "time": "16:30",
        "text": "Przyjazd na Olifantsrus Camp i zameldowanie."
      },
      {
        "time": "20:00–21:30",
        "text": "Wielki finał: nocne czuwanie w oszklonej wieży obserwacyjnej nad wodopojem."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Zgłoszenie drona na bramie wjazdowej — surowo wymagane",
      "Vouchery noclegów (Olifantsrus, Okaukuejo, Namutoni) do Permit Office",
      "Ciepłe bluzy i czołówki na nocne czuwanie w wieży (5-8°C)"
    ],
    "guide": [
      {
        "h": "Wioska Himba",
        "t": "Himba to półnomadyczny lud pastoralny z północnej Namibii, znany z tradycyjnego stylu życia praktycznie niezmienionego od pokoleń. Kobiety pokrywają skórę i włosy pastą otjize — mieszaniną tłuszczu zwierzęcego i czerwonej ochry, która chroni przed słońcem i owadami, a jednocześnie ma znaczenie estetyczne i kulturowe. Święty ogień (Okuruwo) podtrzymywany jest w centrum wioski jako duchowe łącze z przodkami."
      },
      {
        "h": "Permit do Etoszy — logistyka",
        "t": "Wjazd wymaga trzech kroków: kontroli weterynaryjnej na zewnętrznej bramie (Namibia ma rygorystyczne restrykcje na przewóz mięsa i dronów między regionami, by chronić zwierzęta gospodarskie przed chorobami), opłaty w Permit Office (ważnej na cały czas pobytu w parku, na podstawie voucherów noclegowych) i zakupu papierowej mapy wodopojów — obowiązkowej i niezwykle przydatnej, bo to ona pokazuje, gdzie szukać zwierząt."
      },
      {
        "h": "Olifantsrus — kemping z wieżą obserwacyjną",
        "t": "Unikalny w skali Etoszy kemping z oszkloną, podziemną wieżą tuż nad wodopojem. W nocy, w absolutnej ciszy, zza grubej szyby można obserwować z bliska słonie czy nawet rzadkie czarne nosorożce podchodzące pić — jedno z najbardziej immersyjnych doświadczeń bezpiecznego kontaktu z dziką przyrodą w całej Afryce."
      }
    ],
    "animals": [
      {
        "name": "Słoń afrykański",
        "note": "Stada regularnie odwiedzające wodopój Olifantsrus nocą."
      },
      {
        "name": "Nosorożec czarny",
        "note": "Rzadkie, ale realne szanse na obserwację z wieży w Olifantsrus."
      },
      {
        "name": "Zebra Hartmanna",
        "note": "Endemiczny podgatunek górski, widywany w drodze do Olifantsrus."
      },
      {
        "name": "Antylopa szablorogata (Oryks)",
        "note": "Częsty gość przy wodopojach Kamaku i Otjovasandu."
      }
    ]
  },
  {
    "id": 10,
    "date": "05.07",
    "weekday": "Niedziela",
    "title": "Etosza: Olifantsrus → Okaukuejo",
    "subtitle": "Cały dzień game drive — najlepsze wodopoje parku",
    "region": "etosha",
    "route": {
      "from": "Olifantsrus",
      "to": "Okaukuejo",
      "distance": "ok. 130 km",
      "time": "06:30 (otwarcie bram) → 15:00",
      "surface": "drogi parkowe, powolna jazda"
    },
    "weather": {
      "temp": "5°C świt, 26°C dzień",
      "desc": "Klasyczny dzień safari — zimny start, gorące południe. Warstwy na zmianę przez cały dzień.",
      "icon": "🦁"
    },
    "schedule": [
      {
        "time": "06:00",
        "text": "Pobudka i pakowanie auta. Zwińcie namiot — opuszczacie kemping."
      },
      {
        "time": "06:30–11:30",
        "text": "Poranny game drive (Olifantsrus → Ozonjuitji m'Bari). Jazda 20-30 km/h, wodopoje Toboti i Duineveld."
      },
      {
        "time": "ok. 10:00-11:00",
        "text": "Ozonjuitji m'Bari — absolutny hit, potężny otwarty wodopój ze stadami zebr, gnu, skoczków i oryksów, często lwy. Min. 30-45 min, silnik wyłączony."
      },
      {
        "time": "11:30",
        "text": "Lunch w trasie — w samochodzie, obserwując wodopój."
      },
      {
        "time": "12:15–14:30",
        "text": "Popołudniowe safari: wodopoje Sprookjeswoud (bajkowy las z drzewami Moringa) i Homob."
      },
      {
        "time": "15:00",
        "text": "Przyjazd do Okaukuejo i zameldowanie."
      },
      {
        "time": "16:30–18:00",
        "text": "Pierwsze spotkanie z wodopojem Okaukuejo — stada słoni z młodymi, idealne światło."
      },
      {
        "time": "20:00",
        "text": "Magia nocy: spektakl przy oświetlonym wodopoju. Zasada absolutna: cisza."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Najcieplejsze polary i koce na wieczorny spektakl przy wodopoju",
      "Lunch box — jecie w aucie, z auta nie można wysiadać poza strefami ogrodzonymi"
    ],
    "guide": [
      {
        "h": "Etosha Pan — geologia jeziora, które już nie istnieje",
        "t": "Solnisko Etosha to ślad po ogromnym jeziorze, które istniało tu miliony lat temu, zasilane przez rzekę Kunene. Z czasem ruchy tektoniczne zmieniły kierunek rzeki — popłynęła na zachód do Atlantyku, odcinając dopływ. Jezioro wyschło, pozostawiając gigantyczną, białą skorupę solną o powierzchni ok. 4800 km² — większą niż samo województwo opolskie. Sama panewka jest praktycznie pozbawiona życia (zbyt sucha i zasolona), ale jej obrzeża, gdzie wciąż wytryskają źródła, są jednym z najgęściej zasiedlonych przez dziką zwierzynę miejsc na świecie — bo to jedyna woda w promieniu wielu kilometrów w porze suchej."
      },
      {
        "h": "Ozonjuitji m'Bari",
        "t": "Ten wodopój regularnie okazuje się scenicznym sercem Etoszy — otwarta przestrzeń pozwala obserwować setki zwierząt jednocześnie, a obecność dużych stad zebr i gnu przyciąga lwy. Wyłączenie silnika i cierpliwe czekanie to najlepsza strategia — drapieżniki często czają się niewidoczne w trawie, zanim coś się wydarzy."
      },
      {
        "h": "Wieczór przy wodopoju Okaukuejo",
        "t": "To jeden z najsłynniejszych punktów obserwacyjnych w Afryce — oświetlony reflektorami wodopój, gdzie nocą regularnie schodzą się czarne nosorożce (czasem 5-7 naraz) i lwy. Bezwzględna cisza wśród widzów to nie tylko etykieta — głośny dźwięk realnie odstrasza ostrożne zwierzęta, zwłaszcza nosorożce."
      }
    ],
    "animals": [
      {
        "name": "Lew afrykański",
        "note": "Częsty wokół wodopoju Ozonjuitji m'Bari, gdzie czekają na stada zebr i gnu."
      },
      {
        "name": "Zebra Burchella",
        "note": "Wielkie stada przy większości wodopojów Etoszy."
      },
      {
        "name": "Gnu pasiaste",
        "note": "Liczne stada migrujące między wodopojami."
      },
      {
        "name": "Nosorożec czarny",
        "note": "Nocny gość przy oświetlonym wodopoju Okaukuejo."
      },
      {
        "name": "Słoń afrykański",
        "note": "Rodziny z młodymi regularnie odwiedzające wodopój Okaukuejo po południu."
      }
    ]
  },
  {
    "id": 11,
    "date": "06.07",
    "weekday": "Poniedziałek",
    "title": "Etosza: Okaukuejo → Namutoni",
    "subtitle": "Solnisko, gepardy, żyrafy w 'szpagacie'",
    "region": "etosha",
    "route": {
      "from": "Okaukuejo",
      "to": "Namutoni",
      "distance": "ok. 150 km",
      "time": "07:00–17:00",
      "surface": "drogi parkowe"
    },
    "weather": {
      "temp": "5-26°C",
      "desc": "Krajobraz zazieleniony bardziej niż na zachodzie parku — lasy Tamboti i Mopane.",
      "icon": "🦒"
    },
    "schedule": [
      {
        "time": "06:15",
        "text": "Pobudka, opuszczenie pokoju (bramy otwierają się 06:30)."
      },
      {
        "time": "06:30–11:00",
        "text": "Poranne safari wzdłuż krawędzi solniska — Nebrownii, Salvadora & Charitsaub (często gepardy), Rietfontein (słonie kąpiące się rano)."
      },
      {
        "time": "11:00–11:30",
        "text": "Etosha Pan Lookout — piaszczysta grobla w głąb wyschniętego jeziora, efekt fatamorgany."
      },
      {
        "time": "11:45–13:45",
        "text": "Halali — lunch i basen, 15 min na wodopój Moringa (jedno z najlepszych miejsc na lamparta)."
      },
      {
        "time": "13:45–16:30",
        "text": "Popołudniowe safari do Namutoni — krajobraz zazielenia się. Wodopój Chudop (must-do): żyrafy pijące w 'szpagacie', hieny plamiste w krzakach."
      },
      {
        "time": "16:30",
        "text": "Przyjazd do Namutoni i zameldowanie."
      },
      {
        "time": "17:30",
        "text": "Spacer po historycznym forcie niemieckim."
      },
      {
        "time": "20:00",
        "text": "Noc przy wodopoju King Nehale — lwy, czarne nosorożce, hieny."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Strój kąpielowy na basen w Halali",
      "Lornetki w zasięgu ręki — drapieżniki bywają daleko od drogi w trawie"
    ],
    "guide": [
      {
        "h": "Etosha Pan Lookout — efekt fatamorgany",
        "t": "Piaszczysta grobla wbiega w głąb solniska, gdzie z każdej strony otacza was biała, oślepiająca pustka. W upale powietrze faluje, tworząc klasyczny efekt fatamorgany — w oddali zwierzęta i horyzont wyglądają jak unoszące się nad ziemią. Jedno z bardziej kreatywnych miejsc na zdjęcia w całej Etoszy."
      },
      {
        "h": "Chudop — żyrafy w 'szpagacie'",
        "t": "Ten głęboki wodopój zasilany źródłem artezyjskim jest tak skonstruowany, że żyrafy muszą rozkładać przednie nogi w charakterystyczny, niemal akrobatyczny 'szpagat', by dosięgnąć pyskiem wody — moment naturalnej bezbronności wykorzystywanej przez lwy czujnie obserwujące z pobliskich krzaków."
      },
      {
        "h": "Fort Namutoni",
        "t": "Biały, niemiecki fort kolonialny z czasów Schutztruppe, strategicznie postawiony nad źródłem wody. Jego białe mury i wieżyczki kontrastują z otaczającą sawanną — popularne miejsce na zdjęcia o zachodzie słońca."
      }
    ],
    "animals": [
      {
        "name": "Gepard",
        "note": "Regularnie widywany przy wodopojach Salvadora i Charitsaub na otwartym solnisku."
      },
      {
        "name": "Lampart",
        "note": "Najlepsze szanse na obserwację przy wodopoju Moringa w Halali."
      },
      {
        "name": "Żyrafa",
        "note": "Gigantyczne stada pijące w charakterystycznym 'szpagacie' przy Chudop."
      },
      {
        "name": "Hiena plamista",
        "note": "Częsta w krzakach wokół wodopoju Chudop i nocą przy King Nehale."
      },
      {
        "name": "Słoń afrykański",
        "note": "Kąpiele poranne przy głębokim wodopoju Rietfontein."
      }
    ]
  },
  {
    "id": 12,
    "date": "07.07",
    "weekday": "Wtorek",
    "title": "Etosza → Mount Etjo",
    "subtitle": "Karmienie lwów i wodopój pełen hipopotamów",
    "region": "mountetjo",
    "route": {
      "from": "Etosha (Von Lindequist Gate)",
      "to": "Mount Etjo Safari Lodge",
      "distance": "ok. 220 km",
      "time": "08:00–13:00",
      "surface": "asfalt B1"
    },
    "weather": {
      "temp": "do 28°C",
      "desc": "Powrót w cieplejsze, niższe tereny po dniach w Etoszy.",
      "icon": "☀️"
    },
    "schedule": [
      {
        "time": "06:45",
        "text": "Pobudka i śniadanie w Namutoni."
      },
      {
        "time": "08:00",
        "text": "Wyjazd przez wschodnią bramę Von Lindequist Gate. C38, w Tsumeb na B1."
      },
      {
        "time": "10:30",
        "text": "Przystanek w Otjiwarongo — tankowanie i zakupy."
      },
      {
        "time": "13:00",
        "text": "Przyjazd do Mount Etjo Safari Lodge i meldunek."
      },
      {
        "time": "13:30–15:00",
        "text": "Relaks nad basenem z widokiem na wodopój i hipopotamy."
      },
      {
        "time": "15:30–18:30",
        "text": "Popołudniowe game drive (zarezerwowane, 1850 NAD) — poszukiwanie nosorożców w świetle zachodu."
      },
      {
        "time": "19:30",
        "text": "Uroczysta kolacja (460 NAD/os) z widokiem na oświetlony wodopój."
      },
      {
        "time": "21:00–22:00",
        "text": "Karmienie lwów (Lion Feeding, zarezerwowane, 1850 NAD) — autem z przewodnikiem do odgrodzonej strefy, z kamiennego schronu za kratą oglądacie lwy z bliska."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [],
    "guide": [
      {
        "h": "Mount Etjo — lodża z historią ochrony przyrody",
        "t": "Mount Etjo to prywatny rezerwat znany jako miejsce podpisania w 1989 roku porozumienia rozejmowego (tzw. Mount Etjo Declaration), które rozpoczęło proces prowadzący do niepodległości Namibii. Dziś to przede wszystkim luksusowa lodża safari z bogatą populacją zwierząt, w tym nosorożców białych reintroduced do rezerwatu."
      },
      {
        "h": "Karmienie lwów — kontrowersyjna, ale spektakularna atrakcja",
        "t": "To kontrolowane spotkanie z lwami żyjącymi w dużej, odgrodzonej części rezerwatu — turyści obserwują z bezpiecznego, kamiennego schronu za kratą, podczas gdy przewodnicy rozkładają mięso. To jeden z niewielu sposobów zobaczenia lwów z tak bliskiej odległości w pełnej ciemności, choć warto pamiętać, że to nie jest dzika, niczym niezakłócona obserwacja jak w Etoszy — to raczej kontrolowana interakcja w warunkach rezerwatu prywatnego."
      }
    ],
    "animals": [
      {
        "name": "Lew afrykański",
        "note": "Karmienie w odgrodzonej strefie rezerwatu — bliski kontakt po zmroku."
      },
      {
        "name": "Hipopotam",
        "note": "Stado żyjące w wodopoju widocznym z restauracji lodży."
      },
      {
        "name": "Nosorożec biały",
        "note": "Reintroduced do prywatnego rezerwatu Mount Etjo."
      }
    ]
  },
  {
    "id": 13,
    "date": "08.07",
    "weekday": "Środa",
    "title": "Mount Etjo → Daan Viljoen",
    "subtitle": "Targ rzeźby w Okahandja + piesze safari bez przewodnika",
    "region": "windhoek",
    "route": {
      "from": "Mount Etjo",
      "to": "Daan Viljoen",
      "distance": "ok. 240 km",
      "time": "09:00–15:30",
      "surface": "asfalt B1"
    },
    "weather": {
      "temp": "do 24°C",
      "desc": "Khomas Hochland — wyżyna wokół Windhoek, łagodniejszy klimat niż pustynia.",
      "icon": "🌄"
    },
    "schedule": [
      {
        "time": "07:30–08:30",
        "text": "Śniadanie w Mount Etjo."
      },
      {
        "time": "09:00",
        "text": "Wyjazd na B1 na południe."
      },
      {
        "time": "11:30–12:30",
        "text": "Okahandja Woodcarvers Market — największy targ rzeźby w drewnie w Namibii. Targujcie się bezlitośnie (60-70%)."
      },
      {
        "time": "12:30",
        "text": "Szybki lunch w Okahandja."
      },
      {
        "time": "15:00",
        "text": "Przyjazd do Daan Viljoen (C28, ok. 20 km od Windhoek). Permit 610 NAD."
      },
      {
        "time": "16:00–17:30",
        "text": "Piesze safari bez przewodnika — Wag-'n-Bietjie Trail (3 km, lekka opcja)."
      },
      {
        "time": "18:00",
        "text": "Zachód słońca nad Khomas Hochland z tarasu restauracji Boma."
      },
      {
        "time": "19:30",
        "text": "Pożegnalna kolacja w Namibii."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Gotówka na targowanie się w Okahandja"
    ],
    "guide": [
      {
        "h": "Targ rzeźby w Okahandja",
        "t": "Najwięksi rzemieślnicy z całego kraju zjeżdżają tu, by sprzedawać rzeźby z drewna heban i palisander, maski, biżuterię. Targowanie się jest tu kulturową normą — początkowa cena bywa 2-3 razy wyższa niż finalna; spokojne odchodzenie w stronę auta to skuteczna technika negocjacyjna."
      },
      {
        "h": "Daan Viljoen — bezpieczne safari piesze",
        "t": "To jeden z niewielu rezerwatów w Namibii, gdzie można chodzić pieszo czy jeździć na rowerze bez przewodnika — bo nie ma tu dużych drapieżników ani słoni. Idealne miejsce, by 14-latka mogła samodzielnie poczuć dziką przyrodę z bliska, bez ryzyka. Wag-'n-Bietjie Trail wiedzie wzdłuż koryta rzeki Augeigas i tamy Stengels."
      }
    ],
    "animals": [
      {
        "name": "Oryks",
        "note": "Bezpieczne obserwacje pieszo na szlakach Daan Viljoen."
      },
      {
        "name": "Zebra górska Hartmanna",
        "note": "Częsta na wzgórzach Khomas Hochland."
      },
      {
        "name": "Kudu wielki",
        "note": "Antylopa o spiralnych rogach, typowa dla rezerwatu."
      }
    ]
  },
  {
    "id": 14,
    "date": "09.07",
    "weekday": "Czwartek",
    "title": "Daan Viljoen → Windhoek → wylot",
    "subtitle": "Ostatni trekking, pamiątki, pożegnanie z Namibią",
    "region": "windhoek",
    "route": {
      "from": "Daan Viljoen",
      "to": "Windhoek → lotnisko (WDH)",
      "distance": "ok. 110 km",
      "time": "08:30–18:30",
      "surface": "asfalt"
    },
    "weather": {
      "temp": "do 24°C",
      "desc": "Ostatni dzień — pogodny, łagodny klimat wyżyny Windhoek.",
      "icon": "🛫"
    },
    "schedule": [
      {
        "time": "07:00–10:30",
        "text": "Rooibos Trail (9 km, 2,5-3 h) — panoramy na Windhuk z wzgórz Khomas Hochland."
      },
      {
        "time": "10:30–11:30",
        "text": "Prysznic, pakowanie, wymeldowanie z loży."
      },
      {
        "time": "11:30–12:30",
        "text": "Przejazd do centrum Windhuk, parking pod Namibia Craft Centre."
      },
      {
        "time": "12:30–13:15",
        "text": "Pożegnalny lunch w The Craft Cafe."
      },
      {
        "time": "13:30–14:00",
        "text": "Ostatnie tankowanie i myjnia."
      },
      {
        "time": "14:15–15:15",
        "text": "Zdanie auta w Asco Car Hire."
      },
      {
        "time": "15:30",
        "text": "Darmowy bus Asco na lotnisko."
      },
      {
        "time": "16:15–18:30",
        "text": "Relaks w Ondekaremba Lodge (Day Visitor access) — basen, taras, Wi-Fi."
      },
      {
        "time": "18:30",
        "text": "Odprawa paszportowa."
      },
      {
        "time": "20:40",
        "text": "Wylot z Windhoek."
      }
    ],
    "prepDayBefore": [],
    "prepMorning": [
      "Wszystkie pamiątki bezpiecznie zapakowane w bagażu głównym"
    ],
    "guide": [
      {
        "h": "Namibia Craft Centre",
        "t": "Zadaszone centrum rękodzieła w samym sercu Windhoek, gdzie jakość znacznie przewyższa targi przydrożne — biżuteria, tekstylia, rzeźby najwyższej klasy. The Craft Cafe wewnątrz słynie ze świeżych sałatek i legendarnych ciast."
      },
      {
        "h": "Ondekaremba — oaza przed lotem",
        "t": "Prywatna lodża 10 minut od terminalu lotniska, gdzie za symboliczną opłatą można poczekać na lot w cieniu ogrodu, przy basenie, z szybkim Wi-Fi — znacznie przyjemniejsza alternatywa niż nudne oczekiwanie w hali odlotów."
      }
    ],
    "animals": [
      {
        "name": "Kudu wielki",
        "note": "Możliwy do zobaczenia na ostatnim trekkingu, Rooibos Trail."
      },
      {
        "name": "Pawian czarny",
        "note": "Czasem widywany na wzgórzach Khomas Hochland."
      }
    ]
  }
];
