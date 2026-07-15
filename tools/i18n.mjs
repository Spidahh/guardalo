// GUARDALO — stringhe e testi per lingua (usato dal prerender per generare le pagine statiche).
// L'italiano è la lingua di default (root). L'inglese vive sotto /en/.
// itGenre: mappa i generi AniList (in inglese) verso la lingua. In EN restano in inglese.

const IT_GENRE = { Action:'Azione', Adventure:'Avventura', Comedy:'Commedia', Drama:'Drammatico', Fantasy:'Fantasy', Horror:'Horror', Mecha:'Mecha', Music:'Musicale', Mystery:'Mistero', Psychological:'Psicologico', Romance:'Romantico', 'Sci-Fi':'Fantascienza', 'Slice of Life':'Slice of Life', Sports:'Sport', Supernatural:'Soprannaturale', Thriller:'Thriller' };

export const LANGS = ['it', 'en'];

export const I18N = {
  it: {
    htmlLang: 'it',
    prefix: '',
    genre: g => IT_GENRE[g] || g,
    titleSuffixTitolo: '— dove vederlo e da dove iniziare · GUARDALO',
    descTitoloFallback: t => `${t.title}: scheda, dove vederlo, quanto dura.`,
    lblGenere: 'Genere', lblStudio: 'Studio', lblRegia: 'Regia', lblDurata: 'Durata', lblVoto: 'Voto',
    hDaDoveIniziare: 'Da dove iniziare', hDritte: 'Dritte per la visione',
    guideLink: 'GUARDALO — la guida agli anime',
    crumbHome: 'Home', crumbGeneri: 'Generi', crumbPercorsi: 'Percorsi',
    pathGenreSuffix: '— i migliori anime del genere · GUARDALO',
    pathPercorsoSuffix: '— percorso · GUARDALO',
    titoliDi: p => `Titoli di ${p}`,
    bestH1: 'Il meglio',
    bestDesc: 'I migliori anime di GUARDALO: titoli messi in cima a generi e percorsi, senza doppioni.',
    bestIntro: 'I migliori anime di GUARDALO: titoli messi in cima ad almeno un genere o percorso, senza doppioni e ordinati dal migliore.',
    generiH1: 'Generi', generiSub: 'Tutti i generi: azione, mindfuck, horror, sci-fi, isekai e altro.',
    percorsiH1: 'Percorsi', percorsiSub: 'Viaggi tematici curati: storie che spezzano, protagonisti geniali, spettacolo visivo, antieroi e altro.',
    homeTitle: 'GUARDALO — La guida agli anime',
    homeDesc: 'I migliori anime di ogni genere, scelti e spiegati senza fronzoli: perché guardarli, da dove iniziare, quanto ti impegnano e dove vederli. Niente liste a caso.',
    heroTitleFallback: 'GUARDALO — la guida agli anime',
    backHome: 'Torna alla home',
    docs: [
      ['info', 'Chi sono', 'GUARDALO è una guida agli anime creata da Francesco Spidah: selezione, testi e percorsi sono curatela personale. Dati e immagini da AniList.'],
      ['privacy', 'Privacy Policy', 'Come GUARDALO tratta i tuoi dati: navigazione anonima, login opzionale con Google, eventuale pubblicità. Titolare: Francesco Spidah.'],
      ['cookie', 'Cookie Policy', 'I cookie usati da GUARDALO (tecnici necessari, funzionali e pubblicitari) e come gestire il consenso.'],
    ],
  },
  en: {
    htmlLang: 'en',
    prefix: '/en',
    genre: g => g,
    titleSuffixTitolo: '— where to watch and where to start · GUARDALO',
    descTitoloFallback: t => `${t.title}: guide, where to watch, how long it is.`,
    lblGenere: 'Genre', lblStudio: 'Studio', lblRegia: 'Director', lblDurata: 'Length', lblVoto: 'Score',
    hDaDoveIniziare: 'Where to start', hDritte: 'Viewing tips',
    guideLink: 'GUARDALO — the anime guide',
    crumbHome: 'Home', crumbGeneri: 'Genres', crumbPercorsi: 'Paths',
    pathGenreSuffix: '— the best anime of the genre · GUARDALO',
    pathPercorsoSuffix: '— curated path · GUARDALO',
    titoliDi: p => `${p} titles`,
    bestH1: 'The Best',
    bestDesc: "GUARDALO's best anime: titles placed at the top of genres and paths, no duplicates.",
    bestIntro: "GUARDALO's best anime: titles placed at the top of at least one genre or path, no duplicates, ordered best first.",
    generiH1: 'Genres', generiSub: 'Every genre: action, mindfuck, horror, sci-fi, isekai and more.',
    percorsiH1: 'Paths', percorsiSub: 'Curated themed journeys: stories that break you, brilliant minds, visual spectacle, antiheroes and more.',
    homeTitle: 'GUARDALO — The Anime Guide',
    homeDesc: 'The best anime of every genre, picked and explained without fluff: why to watch them, where to start, how much they ask of you and where to see them. No random lists.',
    heroTitleFallback: 'GUARDALO — the anime guide',
    backHome: 'Back to home',
    docs: [
      ['info', 'About', 'GUARDALO is an anime guide created by Francesco Spidah: selection, texts and paths are personal curation. Data and images from AniList.'],
      ['privacy', 'Privacy Policy', 'How GUARDALO handles your data: anonymous browsing, optional Google login, possible advertising. Owner: Francesco Spidah.'],
      ['cookie', 'Cookie Policy', 'The cookies GUARDALO uses (strictly necessary, functional and advertising) and how to manage consent.'],
    ],
  },
};

// hero della home in inglese (l'italiano lo prende da data.home.hero)
export const HOME_EN = {
  title: 'What to watch, where to start, where to see it.',
  sub: 'Anime picked and explained one by one: mood, real runtime and the right platform. No spoilers, no wasted time.',
};
