// Database anime GUARDALO - Lista completa con 94 anime - AGGIORNATO
const animeData = [
    {
        title: "Attack on Titan",
        rating: 10,
        top: true,
        genres: ["Action", "Drama", "Fantasy"],
        year: 2013,
        img: "https://img.anili.st/media/16498.jpg",
        studio: "Wit/MAPPA",
        status: "Finito",
        episodes: 94,
        synopsis: "In un mondo dove l'umanità vive all'interno di città circondate da enormi mura per proteggersi dai Titani, giganti divoratori di uomini, il giovane Eren Yeager giura vendetta dopo aver visto sua madre venir divorata. Insieme ai suoi amici Mikasa e Armin, si arruola nell'esercito per combattere i Titani e scoprire il mistero della loro origine.",
        structure: [{ name: "Totale", episodes: "94" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=attack+on+titan+streaming" }]
        }
    },
    {
        title: "Berserk",
        rating: 10,
        top: true,
        genres: ["Action", "Dark Fantasy", "Horror"],
        year: 1997,
        img: "https://img.anili.st/media/339.jpg",
        studio: "OLM",
        status: "Finito",
        episodes: 25,
        synopsis: "Gatsu, conosciuto come il Guerriero Nero, è un mercenario solitario che vaga per il mondo brandendo una spada gigantesca. La sua vita è segnata da una tragedia: il tradimento del suo migliore amico Griffith, che ha sacrificato la sua ciurma per diventare un membro dei God Hand. Ora Gatsu combatte contro demoni e mostri in un mondo medievale oscuro e violento, cercando vendetta e proteggendo quelli che ama.",
        structure: [{ name: "Serie", episodes: "25" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=berserk+1997+streaming" }]
        }
    },
    {
        title: "BLEACH",
        rating: 9,
        top: true,
        genres: ["Action", "Adventure", "Supernatural"],
        year: 2004,
        img: "https://img.anili.st/media/269.jpg",
        studio: "Pierrot",
        status: "Finito",
        episodes: 366,
        synopsis: "Ichigo Kurosaki è un adolescente che può vedere gli spiriti. Un giorno incontra Rukia Kuchiki, una Shinigami (dea della morte) che si ferisce per proteggerlo da un Hollow (spirito maligno). Per salvare entrambi, Rukia trasferisce i suoi poteri a Ichigo, che diventa un Shinigami sostituto. Ora Ichigo deve proteggere gli umani dagli Hollow e salvare Rukia, condannata a morte per aver trasferito i suoi poteri.",
        structure: [{ name: "Serie", episodes: "366" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=bleach+streaming" }]
        }
    },
    {
        title: "Cyberpunk: Edgerunners",
        rating: 9,
        top: true,
        genres: ["Sci-Fi", "Action", "Cyberpunk"],
        year: 2022,
        img: "https://img.anili.st/media/145390.jpg",
        studio: "Studio Trigger",
        status: "Finito",
        episodes: 10,
        synopsis: "Nella metropoli futuristica di Night City, David Martinez è un ragazzo di strada che sogna di diventare un edgerunner, un mercenario cybernetico. Dopo aver perso tutto, decide di impiantarsi tecnologia militare illegale per sopravvivere nelle strade violente della città. Insieme alla sua squadra, accetta lavori pericolosi che lo porteranno a scoprire oscure verità sulle corporazioni che governano il mondo.",
        structure: [{ name: "Serie", episodes: "10" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=cyberpunk+edgerunners+streaming" }]
        }
    },
    {
        title: "Death Note",
        rating: 9,
        top: true,
        genres: ["Thriller", "Psychological", "Mystery"],
        year: 2006,
        img: "https://img.anili.st/media/21.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 37,
        synopsis: "Light Yagami è un liceale geniale che trova un quaderno misterioso: il Death Note. Qualsiasi nome scritto su questo quaderno causa la morte della persona. Light decide di usarlo per eliminare tutti i criminali del mondo e creare un utopia di giustizia. Ma quando il detective più geniale del mondo, noto solo come L, inizia a cacciarlo, inizia un gioco psicologico mortale tra i due.",
        structure: [{ name: "Serie", episodes: "37" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=death+note+streaming" }]
        }
    },
    {
        title: "Fullmetal Alchemist: Brotherhood",
        rating: 10,
        top: true,
        genres: ["Action", "Adventure", "Fantasy"],
        year: 2009,
        img: "https://img.anili.st/media/5114.jpg",
        studio: "Bones",
        status: "Finito",
        episodes: 64,
        synopsis: "In un mondo dove l'alchimia è una potente scienza, i fratelli Edward e Alphonse Elric commettono il tabù supremo: tentano di resuscitare loro madre. Edward perde un braccio e una gamba, mentre Alphonse perde tutto il suo corpo, con la sua anima intrappolata in un'armatura. Determinati a riparare i loro corpi, i due fratelli partono in viaggio per trovare la leggendaria Pietra Filosofale, scoprendo oscuri segreti sul governo e sull'alchimia stessa.",
        structure: [{ name: "Serie", episodes: "64" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=fullmetal+alchemist+brotherhood+streaming" }]
        }
    },
    {
        title: "Gurren Lagann",
        rating: 9,
        top: true,
        genres: ["Mecha", "Action", "Adventure"],
        year: 2007,
        img: "https://img.anili.st/media/2001.jpg",
        studio: "Gainax",
        status: "Finito",
        episodes: 27,
        synopsis: "In un futuro lontano, l'umanità vive in villaggi sotterranei, ignara del mondo di superficie. Simon è un ragazzo timido che scava tunnel, mentre Kamina è il suo carismatico leader ribelle. Quando scoprono un robot meccanico e una ragazza dal mondo di superficie, i due iniziano una viaggio epico per combattere i Beastmen che opprimono l'umanità, usando il loro robot Gurren Lagann per sfidare il destino stesso.",
        structure: [{ name: "Serie", episodes: "27" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=gurren+lagann+streaming" }]
        }
    },
    {
        title: "Hunter x Hunter (2011)",
        rating: 9,
        top: true,
        genres: ["Action", "Adventure", "Fantasy"],
        year: 2011,
        img: "https://img.anili.st/media/11061.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 148,
        synopsis: "Gon Freecss è un ragazzo di 12 anni che scopre che suo padre, che credeva morto, è in realtà un Hunter leggendario. Deciso a trovarlo, Gon parte per diventare un Hunter himself, un'élite di individui con abilità sovrumane. Durante il suo viaggio, farà amici come Killua, Kurapika e Leorio, affrontando esami pericolosi, nemici potenti e scoprendo il vero significato dell'amicizia e del sacrificio.",
        structure: [{ name: "Serie", episodes: "148" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=hunter+x+hunter+2011+streaming" }]
        }
    },
    {
        title: "JoJo's Bizarre Adventure",
        rating: 9,
        top: true,
        genres: ["Action", "Adventure", "Supernatural"],
        year: 2012,
        img: "https://img.anili.st/media/14719.jpg",
        studio: "David Production",
        status: "In corso",
        episodes: 190,
        synopsis: "La saga della famiglia Jostrar attraverso diverse generazioni, ognuna con protagonisti unici e poteri soprannaturali. Da Jonathan Joestar nell'Inghilterra vittoriana a Jotaro Kujo in Giappone, fino a Giorno Giovanna in Italia, ogni membro della famiglia affronta minacce soprannaturali usando il loro potere Hamon o Stand, in una avventura bizzarra e indimenticabile.",
        structure: [{ name: "Serie", episodes: "190" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=jojo+bizarre+adventure+streaming" }]
        }
    },
    {
        title: "Naruto",
        rating: 8,
        top: true,
        genres: ["Action", "Adventure", "Martial Arts"],
        year: 2002,
        img: "https://img.anili.st/media/20.jpg",
        studio: "Pierrot",
        status: "Finito",
        episodes: 220,
        synopsis: "Naruto Uzumaki è un giovane ninja del Villaggio della Foglia, ostracizzato perché contiene dentro di sé la Volpe a Nove Code, un demono distruttivo. Sogna di diventare Hokage, il leader del villaggio, per guadagnare il rispetto di tutti. Insieme ai suoi compagni Sakura e Sasuke, sotto la guida del maestro Kakashi, Naruto affronta missioni pericolose, nemici potenti e scopre il vero significato dell'amicizia e del sacrificio.",
        structure: [{ name: "Serie", episodes: "220" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=naruto+streaming" }]
        }
    }
    // Continua con gli altri 84 anime...
];
