// Database anime GUARDALO - Lista completa con 94 anime
const animeData = [
    {
        title: "Attack on Titan",
        rating: 10,
        top: true,
        genres: ["Action", "Drama", "Fantasy"],
        year: 2013,
        img: "images/anime/attack-on-titan.jpg",
        studio: "Wit/MAPPA",
        status: "Finito",
        episodes: 94,
        synopsis: "In un mondo dove l'umanità vive rinchiusa dietro enormi mura per proteggersi dai Titani, giganti divoratori di uomini, il giovane Eren Jaeger assiste impotente alla distruzione della sua città e alla morte di sua madre. Giura vendetta e si arruola nel Corpo di Ricerca per sterminare tutti i Titani. Insieme ai suoi amici Mikasa e Armin, scoprirà sconvolgenti verità sulle origini dei Titani e sul mondo oltre le mura. Una delle serie più iconiche degli anni 2010, con colpi di scena memorabili e un finale epico.",
        structure: [
            { name: "Stagione 1", episodes: "25 episodi" },
            { name: "Stagione 2", episodes: "12 episodi" },
            { name: "Stagione 3", episodes: "22 episodi" },
            { name: "Stagione 4 (The Final Season)", episodes: "35 episodi" }
        ],
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
        img: "images/anime/berserk.jpg",
        studio: "OLM",
        status: "Finito",
        episodes: 25,
        synopsis: "Gatsu è un mercenario solitario con una spada enorme che vaga per un mondo medievale oscuro e brutale. Dopo essersi unito alla Banda del Falco guidata dal carismatico Griffith, trova per la prima volta amicizia e uno scopo. Ma il destino ha in serbo per lui una tragedia inimmaginabile che lo trasformerà nel Guerriero Nero, condannato a combattere demoni e a cercare vendetta. Basato sul manga di Kentaro Miura, è considerato un capolavoro del dark fantasy.",
        structure: [
            { name: "Serie TV 1997", episodes: "25 episodi" },
            { name: "Film Golden Age (2012-13)", episodes: "3 film" },
            { name: "Serie 2016-17", episodes: "24 episodi" }
        ],
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
        img: "images/anime/bleach.jpg",
        studio: "Pierrot",
        status: "Finito",
        episodes: 380,
        synopsis: "Ichigo Kurosaki è un liceale che può vedere i fantasmi. Quando la Shinigami Rukia Kuchiki gli trasferisce i suoi poteri per salvare la sua famiglia, Ichigo diventa un Sostituto Shinigami. Da quel momento si ritrova a combattere Hollow, spiriti maligni che minacciano i vivi e i morti. L'avventura lo porterà nella Soul Society, Hueco Mundo e oltre, affrontando nemici sempre più potenti. Include l'arco finale Thousand-Year Blood War (2022-2025).",
        structure: [
            { name: "Serie Originale", episodes: "366 episodi (2004-2012)" },
            { name: "Thousand-Year Blood War Pt.1", episodes: "13 episodi" },
            { name: "Thousand-Year Blood War Pt.2", episodes: "13 episodi" },
            { name: "Thousand-Year Blood War Pt.3", episodes: "14 episodi (2024-2025)" }
        ],
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
        img: "images/anime/cyberpunk-edgerunners.jpg",
        studio: "Studio Trigger",
        status: "Finito",
        episodes: 10,
        synopsis: "David Martinez è un giovane di Night City che vive con la madre in povertà, sognando un futuro migliore. Dopo una tragedia, si ritrova con un impianto cybernetico militare che gli dona velocità sovrumana ma rischia di farlo impazzire. Si unisce a una crew di mercenari cyberpunk guidati da Maine, trovando in Lucy un amore impossibile. Ambientato nell'universo di Cyberpunk 2077, è un capolavoro visivo di Studio Trigger con una colonna sonora indimenticabile e un finale devastante.",
        structure: [
            { name: "Serie Completa", episodes: "10 episodi" }
        ],
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
        img: "images/anime/death-note.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 37,
        synopsis: "Light Yagami, studente modello e genio assoluto, trova un quaderno soprannaturale caduto dal mondo degli Shinigami: il Death Note. Chiunque il cui nome venga scritto sul quaderno muore. Light decide di usarlo per creare un mondo senza criminali, diventando 'Kira'. Ma il misterioso detective L inizia a dargli la caccia in un duello psicologico mozzafiato. Chi è la vera giustizia? Un thriller cerebrale che ha definito un'era degli anime.",
        structure: [
            { name: "Arco L", episodes: "Episodi 1-25" },
            { name: "Arco Near & Mello", episodes: "Episodi 26-37" }
        ],
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
        img: "images/anime/fullmetal-alchemist.jpg",
        studio: "Bones",
        status: "Finito",
        episodes: 64,
        synopsis: "Edward e Alphonse Elric hanno commesso il tabù supremo dell'alchimia: tentare di riportare in vita la madre. Ed ha perso un braccio e una gamba, Al ha perso tutto il corpo e la sua anima è legata a un'armatura. Ora cercano la Pietra Filosofale per recuperare ciò che hanno perso. Ma dietro questa pietra si nasconde una cospirazione che minaccia l'intera nazione di Amestris. Considerato uno dei migliori anime di sempre per storia, personaggi e world-building.",
        structure: [
            { name: "Serie Completa", episodes: "64 episodi" },
            { name: "Film: Sacred Star of Milos", episodes: "1 film" }
        ],
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
        img: "images/anime/gurren-lagann.jpg",
        studio: "Gainax",
        status: "Finito",
        episodes: 27,
        synopsis: "Simon è un timido scavatore che vive sottoterra insieme al suo 'fratello maggiore' Kamina, un ragazzo temerario che sogna di raggiungere la superficie. Quando trovano un antico robot chiamato Lagann, inizia un'epica battaglia contro i Beastmen e il loro tirannico re. 'Chi diavolo credi che io sia?!' - una serie che parte come avventura mecha e diventa un'opera cosmica sulla forza di volontà umana. Iconica, esagerata, commovente.",
        structure: [
            { name: "Prima Parte (Underground)", episodes: "Episodi 1-8" },
            { name: "Seconda Parte (Superficie)", episodes: "Episodi 9-15" },
            { name: "Terza Parte (Finale)", episodes: "Episodi 16-27" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=gurren+lagann+streaming" }]
        }
    },
    {
        title: "HUNTER x HUNTER",
        rating: 9,
        top: true,
        genres: ["Adventure", "Action", "Fantasy"],
        year: 2011,
        img: "images/anime/hunter-x-hunter.jpg",
        studio: "Madhouse",
        status: "In pausa",
        episodes: 148,
        synopsis: "Gon Freecss scopre che suo padre Ging, che credeva morto, è in realtà uno dei più grandi Hunter del mondo. Decide di diventare Hunter anche lui per trovarlo. Insieme al suo migliore amico Killua, un ex-assassino, affronta sfide mortali, incontra nemici terrificanti e scopre il sistema di poteri del Nen. L'arco delle Formichimere è considerato uno dei migliori archi narrativi della storia degli anime. Il manga continua sporadicamente.",
        structure: [
            { name: "Esame Hunter", episodes: "Episodi 1-21" },
            { name: "Famiglia Zoldyck", episodes: "Episodi 22-26" },
            { name: "Heaven's Arena", episodes: "Episodi 27-36" },
            { name: "Isola di Greed", episodes: "Episodi 59-75" },
            { name: "Formichimere", episodes: "Episodi 76-136" },
            { name: "Elezione", episodes: "Episodi 137-148" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=hunter+x+hunter+2011+streaming" }]
        }
    },
    {
        title: "JoJo's Bizarre Adventure",
        rating: 10,
        top: true,
        genres: ["Action", "Adventure", "Supernatural"],
        year: 2012,
        img: "images/anime/jojos-bizarre-adventure.jpg",
        studio: "David Production",
        status: "In corso",
        episodes: 190,
        synopsis: "La saga multigenerazionale della famiglia Joestar e della loro lotta contro il male attraverso i secoli. Ogni parte segue un diverso JoJo con poteri e stile unici: dall'Hamon del 1800 agli Stand moderni. Combattimenti creativi, pose iconiche, meme leggendari e un'estetica inconfondibile. 'Yare yare daze' - un'esperienza anime unica che ha influenzato l'intera cultura pop.",
        structure: [
            { name: "Parte 1: Phantom Blood", episodes: "9 episodi" },
            { name: "Parte 2: Battle Tendency", episodes: "17 episodi" },
            { name: "Parte 3: Stardust Crusaders", episodes: "48 episodi" },
            { name: "Parte 4: Diamond is Unbreakable", episodes: "39 episodi" },
            { name: "Parte 5: Golden Wind", episodes: "39 episodi" },
            { name: "Parte 6: Stone Ocean", episodes: "38 episodi" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=jojo+bizarre+adventure+streaming" }]
        }
    },
    {
        title: "NARUTO",
        rating: 10,
        top: true,
        genres: ["Action", "Adventure", "Martial Arts"],
        year: 2002,
        img: "images/anime/naruto.jpg",
        studio: "Pierrot",
        status: "Finito",
        episodes: 720,
        synopsis: "Naruto Uzumaki è un ninja orfano emarginato dal villaggio perché porta dentro di sé la Volpe a Nove Code, un demone che quasi distrusse Konoha. Nonostante tutto, sogna di diventare Hokage per guadagnarsi il rispetto di tutti. Insieme al Team 7 (Sasuke, Sakura e Kakashi-sensei), affronta missioni sempre più pericolose, organizzazioni criminali come l'Akatsuki, e il peso del destino. Una delle serie più influenti di sempre, con temi di amicizia, perseveranza e redenzione.",
        structure: [
            { name: "Naruto Classico", episodes: "220 episodi (2002-2007)" },
            { name: "Naruto Shippuden", episodes: "500 episodi (2007-2017)" },
            { name: "Film", episodes: "11 film" },
            { name: "Boruto (sequel)", episodes: "293 episodi" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=naruto+streaming" }]
        }
    },
    {
        title: "Neon Genesis Evangelion",
        rating: 9,
        top: true,
        genres: ["Mecha", "Psychological", "Drama"],
        year: 1995,
        img: "images/anime/neon-genesis-evangelion.jpg",
        studio: "Gainax",
        status: "Finito",
        episodes: 26,
        synopsis: "Nel 2015, quindici anni dopo il Second Impact che ha devastato la Terra, misteriose creature chiamate Angeli attaccano Tokyo-3. L'unica difesa sono gli Evangelion, robot giganti che possono essere pilotati solo da adolescenti selezionati. Shinji Ikari, ragazzo introverso e traumatizzato, viene convocato dal padre che lo aveva abbandonato per pilotare l'Eva-01. Più di un semplice mecha anime: è un'esplorazione della psiche umana, della depressione, e del significato dell'esistenza.",
        structure: [
            { name: "Serie TV", episodes: "26 episodi" },
            { name: "The End of Evangelion", episodes: "1 film (finale alternativo)" },
            { name: "Rebuild of Evangelion", episodes: "4 film (2007-2021)" }
        ],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=neon+genesis+evangelion+streaming" }]
        }
    },
    {
        title: "ONE PIECE",
        rating: 10,
        top: true,
        genres: ["Adventure", "Action", "Comedy"],
        year: 1999,
        img: "images/anime/one-piece.jpg",
        studio: "Toei",
        status: "In corso",
        episodes: 1122,
        synopsis: "Monkey D. Rufy ha mangiato il Frutto Gom Gom e il suo corpo è diventato di gomma. Il suo sogno? Diventare il Re dei Pirati trovando il leggendario tesoro One Piece. Con la sua ciurma di Cappello di Paglia (Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook, Jinbe), naviga per la Rotta Maggiore affrontando la Marina, i Sette Flotte, i Quattro Imperatori. La serie più lunga e venduta della storia dei manga, ancora in corso dopo 25+ anni.",
        structure: [
            { name: "East Blue Saga", episodes: "Ep. 1-61" },
            { name: "Alabasta Saga", episodes: "Ep. 62-135" },
            { name: "Sky Island Saga", episodes: "Ep. 136-206" },
            { name: "Water 7/Enies Lobby", episodes: "Ep. 207-325" },
            { name: "Thriller Bark + Marineford", episodes: "Ep. 326-516" },
            { name: "New World (Dressrosa, Whole Cake, Wano)", episodes: "Ep. 517-1122+" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=one+piece+streaming" }]
        }
    },
    {
        title: "Steins;Gate",
        rating: 9,
        top: true,
        genres: ["Sci-Fi", "Thriller", "Psychological"],
        year: 2011,
        img: "images/anime/steins-gate.jpg",
        studio: "White Fox",
        status: "Finito",
        episodes: 24,
        synopsis: "Rintaro Okabe è uno scienziato pazzo autoproclamato che scopre per caso che il suo microonde può inviare messaggi nel passato. Quello che inizia come un esperimento divertente diventa un incubo quando le sue modifiche alla timeline causano conseguenze tragiche. Per salvare chi ama, Okabe dovrà affrontare infinite ripetizioni temporali. Basato sulla visual novel, è considerato il miglior anime sui viaggi nel tempo. El Psy Kongroo.",
        structure: [
            { name: "Steins;Gate", episodes: "24 episodi + OVA" },
            { name: "Steins;Gate 0", episodes: "23 episodi (sequel/midquel)" },
            { name: "Film: Load Region of Déjà Vu", episodes: "1 film" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=steins+gate+streaming" }]
        }
    },
    {
        title: "Summer Time Rendering",
        rating: 9,
        top: true,
        genres: ["Mystery", "Thriller", "Supernatural"],
        year: 2022,
        img: "images/anime/summer-time-rendering.jpg",
        studio: "OLM",
        status: "Finito",
        episodes: 25,
        synopsis: "Shinpei Ajiro torna sull'isola di Hitogashima per il funerale di Ushio, la ragazza che amava come una sorella. Ma qualcosa non torna: Ushio non è annegata, è stata uccisa. E sull'isola ci sono 'Ombre' - copie oscure che sostituiscono le persone. Quando Shinpei muore, scopre di poter tornare indietro nel tempo. Un thriller mozzafiato con loop temporali, horror e mistero, considerato uno dei migliori anime del 2022.",
        structure: [
            { name: "Serie Completa", episodes: "25 episodi" }
        ],
        links: {
            legal: [{ name: "Disney+", url: "https://disneyplus.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=summer+time+rendering+streaming" }]
        }
    },
    {
        title: "91 Days",
        rating: 8,
        top: false,
        genres: ["Action", "Drama", "Historical"],
        year: 2016,
        img: "images/anime/91-days.jpg",
        studio: "Shuka",
        status: "Finito",
        episodes: 13,
        synopsis: "Avilio cerca vendetta contro la mafia che ha ucciso la sua famiglia.",
        structure: [{ name: "Serie", episodes: "13" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=91+days+streaming" }]
        }
    },
    {
        title: "Abenobashi Magical Shopping Street",
        rating: 8,
        top: false,
        genres: ["Comedy", "Fantasy", "Adventure"],
        year: 2002,
        img: "images/anime/abenobashi.jpg",
        studio: "Gainax",
        status: "Finito",
        episodes: 13,
        synopsis: "Due bambini viaggiano attraverso mondi alterni partendo da un centro commerciale.",
        structure: [{ name: "Serie", episodes: "13" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=abenobashi+streaming" }]
        }
    },
    {
        title: "Ajin: Demi-Human",
        rating: 7,
        top: false,
        genres: ["Action", "Horror", "Supernatural"],
        year: 2016,
        img: "images/anime/ajin.jpg",
        studio: "Polygon Pictures",
        status: "Finito",
        episodes: 26,
        synopsis: "Umani immortali chiamati Ajin vengono cacciati dal governo.",
        structure: [{ name: "Serie", episodes: "26" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=ajin+demi+human+streaming" }]
        }
    },
    {
        title: "Akame Ga Kill!",
        rating: 8,
        top: false,
        genres: ["Action", "Fantasy", "Dark Fantasy"],
        year: 2014,
        img: "images/anime/akame-ga-kill.jpg",
        studio: "White Fox",
        status: "Finito",
        episodes: 24,
        synopsis: "Tatsumi si unisce a un gruppo di assassini per combattere un governo corrotto.",
        structure: [{ name: "Serie", episodes: "24" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=akame+ga+kill+streaming" }]
        }
    },
    {
        title: "Akira",
        rating: 9,
        top: false,
        genres: ["Sci-Fi", "Cyberpunk", "Action"],
        year: 1988,
        img: "images/anime/akira.jpg",
        studio: "TMS",
        status: "Film",
        episodes: 1,
        synopsis: "Neo-Tokyo, 2019. Trent'anni dopo che una misteriosa esplosione ha distrutto Tokyo, la città è ricostruita ma corrotta. Kaneda è il leader di una gang di motociclisti. Il suo amico Tetsuo, sempre sottomesso, sviluppa improvvisamente poteri psichici incontrollabili dopo un incidente. Il governo vuole usarlo, ma Tetsuo sta perdendo il controllo. Un film che ha definito l'animazione giapponese in Occidente, con animazione rivoluzionaria ancora oggi impressionante.",
        structure: [
            { name: "Film", episodes: "1 film (124 minuti)" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=akira+film+streaming" }]
        }
    },
    {
        title: "Akudama Drive",
        rating: 8,
        top: false,
        genres: ["Action", "Sci-Fi", "Cyberpunk"],
        year: 2020,
        img: "images/anime/akudama-drive.jpg",
        studio: "Pierrot",
        status: "Finito",
        episodes: 12,
        synopsis: "Criminali leggendari vengono reclutati per una missione impossibile.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=akudama+drive+streaming" }]
        }
    },
    {
        title: "Arcane: League of Legends",
        rating: 9,
        top: false,
        genres: ["Fantasy", "Drama", "Action"],
        year: 2021,
        img: "images/anime/arcane.jpg",
        studio: "Fortiche",
        status: "Finito",
        episodes: 18,
        synopsis: "Nella città di Piltover, il progresso tecnologico crea un divario sempre più profondo con Zaun, la città sotterranea. Vi e Powder sono due sorelle orfane di Zaun che crescono in mezzo alla criminalità. Un esperimento andato storto le separa e trasforma Powder in Jinx, una criminale instabile. Anni dopo, le loro strade si incrociano di nuovo mentre una guerra sta per esplodere. Animazione rivoluzionaria, narrativa matura, personaggi indimenticabili.",
        structure: [
            { name: "Stagione 1", episodes: "9 episodi (2021)" },
            { name: "Stagione 2", episodes: "9 episodi (Novembre 2024)" }
        ],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=arcane+streaming" }]
        }
    },
    {
        title: "Black Clover",
        rating: 8,
        top: false,
        genres: ["Action", "Fantasy", "Adventure"],
        year: 2017,
        img: "images/anime/black-clover.jpg",
        studio: "Pierrot",
        status: "In corso",
        episodes: 170,
        synopsis: "Asta, un ragazzo senza magia, sogna di diventare il mago più potente del regno.",
        structure: [{ name: "S1", episodes: "170" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=black+clover+streaming" }]
        }
    },
    {
        title: "BNA: Brand New Animal",
        rating: 7,
        top: false,
        genres: ["Action", "Supernatural", "Fantasy"],
        year: 2020,
        img: "images/anime/bna.jpg",
        studio: "Studio Trigger",
        status: "Finito",
        episodes: 12,
        synopsis: "Una ragazza umana si trasforma in tanuki e scopre un mondo di antropomorfi.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=bna+brand+new+animal+streaming" }]
        }
    },
    {
        title: "Burn the Witch",
        rating: 7,
        top: false,
        genres: ["Action", "Fantasy", "Adventure"],
        year: 2020,
        img: "images/anime/burn-the-witch.jpg",
        studio: "Bones",
        status: "Finito",
        episodes: 3,
        synopsis: "Stregoni proteggono Londra dai draghi in Reverse London.",
        structure: [{ name: "OVA", episodes: "3" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=burn+the+witch+streaming" }]
        }
    },
    {
        title: "Chainsaw Man",
        rating: 8,
        top: false,
        genres: ["Action", "Horror", "Supernatural"],
        year: 2022,
        img: "images/anime/chainsaw-man.jpg",
        studio: "MAPPA",
        status: "In corso",
        episodes: 12,
        synopsis: "Denji è un ragazzo miserabile che lavora come Devil Hunter per ripagare i debiti del padre defunto. Il suo unico amico è Pochita, un piccolo diavolo motosega. Quando viene ucciso dalla mafia dei diavoli, Pochita si fonde con lui trasformandolo in Chainsaw Man. Reclutato dalla misteriosa Makima nella Divisione Speciale 4, Denji cerca solo tre cose: cibo, un tetto, e una ragazza. Ma il mondo dei diavoli ha altri piani per lui.",
        structure: [
            { name: "Stagione 1", episodes: "12 episodi" },
            { name: "Film: Reze Arc (annunciato)", episodes: "2025" },
            { name: "Stagione 2 (annunciata)", episodes: "TBA" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=chainsaw+man+streaming" }]
        }
    },
    {
        title: "Claymore",
        rating: 7,
        top: false,
        genres: ["Action", "Dark Fantasy", "Supernatural"],
        year: 2007,
        img: "images/anime/claymore.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 26,
        synopsis: "Guerriere ibride umane-yoma combattono mostri in un mondo medievale.",
        structure: [{ name: "Serie", episodes: "26" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=claymore+streaming" }]
        }
    },
    {
        title: "Code Geass",
        rating: 8,
        top: false,
        genres: ["Mecha", "Action", "Thriller"],
        year: 2006,
        img: "images/anime/code-geass.jpg",
        studio: "Sunrise",
        status: "Finito",
        episodes: 50,
        synopsis: "In un mondo alternativo, il Sacro Impero di Britannia ha conquistato il Giappone, ribattezzandolo Area 11. Lelouch vi Britannia, principe esiliato, ottiene il potere del Geass: può comandare chiunque guardi negli occhi. Sotto la maschera di Zero, guida i ribelli giapponesi contro il proprio impero. Strategie geniali, colpi di scena continui, e uno dei finali più discussi e celebrati della storia degli anime. 'All Hail Lelouch!'",
        structure: [
            { name: "Stagione 1 (Lelouch of the Rebellion)", episodes: "25 episodi" },
            { name: "Stagione 2 (R2)", episodes: "25 episodi" },
            { name: "Film: Lelouch of the Re;surrection", episodes: "1 film (2019)" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=code+geass+streaming" }]
        }
    },
    {
        title: "Cowboy Bebop",
        rating: 9,
        top: false,
        genres: ["Sci-Fi", "Action", "Space Western"],
        year: 1998,
        img: "images/anime/cowboy-bebop.jpg",
        studio: "Sunrise",
        status: "Finito",
        episodes: 26,
        synopsis: "Anno 2071. Spike Spiegel è un cacciatore di taglie con un passato oscuro nella mafia marziana. Insieme al suo partner Jet Black, ex-poliziotto, viaggia per il sistema solare sulla nave Bebop cercando criminali per guadagnarsi da vivere. A loro si uniscono Faye Valentine, giocatrice d'azzardo con amnesia, Ed, hacker prodigio, e Ein, un corgi superintelligente. Episodi autoconclusivi con un arco narrativo sottostante sulla fuga di Spike dal suo passato. Colonna sonora jazz leggendaria di Yoko Kanno.",
        structure: [
            { name: "Serie Completa", episodes: "26 episodi" },
            { name: "Film: Knockin' on Heaven's Door", episodes: "1 film (2001)" }
        ],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=cowboy+bebop+streaming" }]
        }
    },
    {
        title: "DAN DA DAN",
        rating: 9,
        top: false,
        genres: ["Action", "Comedy", "Romance"],
        year: 2024,
        img: "images/anime/dandadan.jpg",
        studio: "Science SARU",
        status: "In corso",
        episodes: 12,
        synopsis: "Momo Ayase crede nei fantasmi ma non negli alieni. Ken Takakura (Okarun) crede negli alieni ma non nei fantasmi. Per scommessa, vanno a verificare le rispettive teorie... e scoprono che ENTRAMBI esistono! Momo viene quasi rapita da alieni, Okarun viene maledetto dalla Nonna Turbo. Ora devono combattere insieme contro yokai, UFO e recuperare le 'palle' di Okarun (letteralmente). Azione folle, romanticismo dolce, animazione spettacolare di Science SARU.",
        structure: [
            { name: "Stagione 1", episodes: "12 episodi (Ottobre 2024)" },
            { name: "Stagione 2 (annunciata)", episodes: "Luglio 2025" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=dandadan+streaming" }]
        }
    },
    {
        title: "Darwin's Game",
        rating: 7,
        top: false,
        genres: ["Action", "Sci-Fi", "Game"],
        year: 2020,
        img: "images/anime/darwins-game.jpg",
        studio: "Nexus",
        status: "Finito",
        episodes: 12,
        synopsis: "Un ragazzo viene coinvolto in un gioco mortale su smartphone.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=darwins+game+streaming" }]
        }
    },
    {
        title: "Deadman Wonderland",
        rating: 7,
        top: false,
        genres: ["Action", "Horror", "Sci-Fi"],
        year: 2011,
        img: "images/anime/deadman-wonderland.jpg",
        studio: "Manglobe",
        status: "Finito",
        episodes: 12,
        synopsis: "Un ragazzo ingiustamente accusato di omicidio finisce in un prigione-parco divertimenti.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=deadman+wonderland+streaming" }]
        }
    },
    {
        title: "Death Parade",
        rating: 7,
        top: false,
        genres: ["Psychological", "Thriller", "Drama"],
        year: 2015,
        img: "images/anime/death-parade.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 12,
        synopsis: "Anime che giudicano le anime dei defunti attraverso giochi misteriosi.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=death+parade+streaming" }]
        }
    },
    {
        title: "Deca-Dence",
        rating: 7,
        top: false,
        genres: ["Action", "Sci-Fi", "Post-apocalyptic"],
        year: 2020,
        img: "images/anime/deca-dence.jpg",
        studio: "NUT",
        status: "Finito",
        episodes: 12,
        synopsis: "L'umanità combatte mostri chiamati Gadol in una fortezza mobile.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=deca+dence+streaming" }]
        }
    },
    {
        title: "Demon Slayer",
        rating: 9,
        top: false,
        genres: ["Action", "Fantasy", "Historical"],
        year: 2019,
        img: "images/anime/demon-slayer.jpg",
        studio: "Ufotable",
        status: "In corso",
        episodes: 68,
        synopsis: "Tanjiro Kamado torna a casa e trova la sua famiglia massacrata dai demoni. L'unica sopravvissuta è sua sorella Nezuko, trasformata in demone ma ancora capace di riconoscerlo. Tanjiro si unisce al Corpo degli Ammazzademoni per trovare una cura per Nezuko e vendicare la sua famiglia, imparando la Respirazione dell'Acqua e affrontando le Lune Demoniache di Muzan Kibutsuji. Animazione spettacolare di Ufotable, combattimenti mozzafiato.",
        structure: [
            { name: "Stagione 1", episodes: "26 episodi" },
            { name: "Mugen Train Arc", episodes: "7 episodi + film" },
            { name: "Stagione 2 (Entertainment District)", episodes: "11 episodi" },
            { name: "Stagione 3 (Swordsmith Village)", episodes: "11 episodi" },
            { name: "Stagione 4 (Hashira Training)", episodes: "8 episodi (2024)" },
            { name: "Infinity Castle (annunciato)", episodes: "Film trilogy 2025" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=demon+slayer+streaming" }]
        }
    },
    {
        title: "Devil May Cry",
        rating: 8,
        top: false,
        genres: ["Action", "Supernatural", "Adventure"],
        year: 2007,
        img: "images/anime/devil-may-cry.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 12,
        synopsis: "Dante, un cacciatore di demoni, affronta mostri e protegge il mondo umano.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=devil+may+cry+anime+streaming" }]
        }
    },
    {
        title: "Devilman Crybaby",
        rating: 8,
        top: false,
        genres: ["Horror", "Action", "Supernatural"],
        year: 2018,
        img: "images/anime/devilman-crybaby.jpg",
        studio: "Science SARU",
        status: "Finito",
        episodes: 10,
        synopsis: "Akira Fudo è un ragazzo sensibile che piange per gli altri. Il suo amico d'infanzia Ryo lo convince a partecipare a un rave satanico dove i demoni possiedono gli umani. Akira si fonde con il potente demone Amon ma mantiene il suo cuore umano, diventando Devilman. Deve combattere i demoni mentre l'umanità sprofonda nella paranoia e nella violenza. Remake moderno del classico di Go Nagai, con un finale devastante che non risparmia nessuno.",
        structure: [
            { name: "Serie Completa", episodes: "10 episodi" }
        ],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=devilman+crybaby+streaming" }]
        }
    },
    {
        title: "Dragon Ball",
        rating: 9,
        top: false,
        genres: ["Action", "Adventure", "Martial Arts"],
        year: 1986,
        img: "images/anime/dragon-ball.jpg",
        studio: "Toei",
        status: "Finito",
        episodes: 153,
        synopsis: "Goku, un ragazzo con la coda di scimmia, cerca le sette sfere del drago.",
        structure: [{ name: "Serie", episodes: "153" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=dragon+ball+streaming" }]
        }
    },
    {
        title: "Drifters",
        rating: 7,
        top: false,
        genres: ["Action", "Historical", "Fantasy"],
        year: 2016,
        img: "images/anime/drifters.jpg",
        studio: "Hoods Drifters Studio",
        status: "In corso",
        episodes: 12,
        synopsis: "Guerrieri storici vengono trasportati in un mondo fantasy per combattere.",
        structure: [{ name: "S1", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=drifters+anime+streaming" }]
        }
    },
    {
        title: "86 EIGHTY-SIX",
        rating: 8,
        top: false,
        genres: ["Mecha", "Action", "Drama"],
        year: 2021,
        img: "images/anime/eighty-six.jpg",
        studio: "A-1 Pictures",
        status: "Finito",
        episodes: 23,
        synopsis: "In una nazione discriminatoria, soldati disprezzati combattono con droni.",
        structure: [{ name: "S1+S2", episodes: "23" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=eighty+six+streaming" }]
        }
    },
    {
        title: "Erased",
        rating: 7,
        top: false,
        genres: ["Mystery", "Psychological", "Thriller"],
        year: 2016,
        img: "images/anime/erased.jpg",
        studio: "A-1 Pictures",
        status: "Finito",
        episodes: 12,
        synopsis: "Un uomo viaggia indietro nel tempo per salvare i suoi amici dall'assassino.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=erased+anime+streaming" }]
        }
    },
    {
        title: "Failure Frame: I Became the Strongest",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Isekai", "Dark Fantasy"],
        year: 2024,
        img: "images/anime/failure-frame.jpg",
        studio: "Seven Arcs",
        status: "Finito",
        episodes: 12,
        synopsis: "Touka Mimori viene evocato in un altro mondo insieme alla sua classe, ma la dea Vicius lo considera un 'fallimento' e lo getta nell'abisso per morire. Sopravvive grazie alle sue abilità considerate inutili - 'Paralisi', 'Veleno' e 'Putrefazione' - che in realtà sono devastanti. Giura vendetta contro la dea e i compagni che lo hanno abbandonato. Un isekai dark revenge con protagonista spietato.",
        structure: [
            { name: "Stagione 1", episodes: "12 episodi (Estate 2024)" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=failure+frame+streaming" }]
        }
    },
    {
        title: "Fate (Franchise Completo)",
        rating: 7,
        top: false,
        genres: ["Action", "Fantasy", "Supernatural"],
        year: 2006,
        img: "images/anime/fate-zero.jpg",
        studio: "ufotable / Studio DEEN",
        status: "In corso",
        episodes: 200,
        synopsis: "Il franchise Fate ruota attorno alla Guerra del Santo Graal, un torneo mortale dove 7 Maghi evocano Spiriti Eroici (Servant) della storia e della leggenda per combattere e ottenere il Graal, che esaudisce qualsiasi desiderio. Fate/Stay Night segue Shirou Emiya, Fate/Zero è il prequel con suo padre Kiritsugu. Animazione spettacolare di ufotable per le produzioni più recenti.",
        structure: [
            { name: "Fate/Stay Night (DEEN 2006)", episodes: "24 episodi" },
            { name: "Fate/Zero", episodes: "25 episodi (2011-2012)" },
            { name: "Fate/Stay Night: Unlimited Blade Works", episodes: "26 episodi (2014-2015)" },
            { name: "Fate/Stay Night: Heaven's Feel", episodes: "3 film (2017-2020)" },
            { name: "Fate/Apocrypha", episodes: "25 episodi (2017)" },
            { name: "Fate/Extra Last Encore", episodes: "13 episodi (2018)" },
            { name: "Fate/Grand Order: Babylonia", episodes: "21 episodi (2019-2020)" },
            { name: "Fate/Grand Order: Camelot", episodes: "2 film (2020-2021)" },
            { name: "Fate/strange Fake", episodes: "In corso (2023+)" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }, { name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=fate+serie+ordine+streaming" }]
        }
    },
    {
        title: "FLCL",
        rating: 8,
        top: false,
        genres: ["Comedy", "Sci-Fi", "Coming-of-age"],
        year: 2000,
        img: "images/anime/flcl.jpg",
        studio: "Gainax",
        status: "Finito",
        episodes: 6,
        synopsis: "Un ragazzo di 12 anni vive esperienze surreali con una donna misteriosa.",
        structure: [{ name: "Serie", episodes: "6" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=flcl+streaming" }]
        }
    },
    {
        title: "Frieren",
        rating: 7,
        top: false,
        genres: ["Adventure", "Fantasy", "Drama"],
        year: 2023,
        img: "images/anime/frieren.jpg",
        studio: "Madhouse",
        status: "In corso",
        episodes: 28,
        synopsis: "Frieren è una maga elfa che ha viaggiato per 10 anni con il gruppo dell'eroe Himmel per sconfiggere il Re Demone. Dopo la vittoria, si separano promettendo di rivedersi. Ma per un'elfa che vive millenni, 50 anni sono un battito di ciglia. Quando Himmel muore di vecchiaia, Frieren realizza di non averlo mai veramente conosciuto. Inizia un viaggio per comprendere gli umani e onorare i suoi compagni. Un capolavoro contemplativo sulla mortalità, la memoria e i legami.",
        structure: [
            { name: "Stagione 1", episodes: "28 episodi (2023-2024)" },
            { name: "Stagione 2 (annunciata)", episodes: "2025" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=frieren+streaming" }]
        }
    },
    {
        title: "Future Diary",
        rating: 8,
        top: false,
        genres: ["Psychological", "Thriller", "Supernatural"],
        year: 2012,
        img: "images/anime/future-diary.jpg",
        studio: "asread.",
        status: "Finito",
        episodes: 26,
        synopsis: "12 persone combattono a morte usando diari che predicono il futuro.",
        structure: [{ name: "Serie", episodes: "26" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=future+diary+streaming" }]
        }
    },
    {
        title: "Gachiakuta",
        rating: 8,
        top: false,
        genres: ["Action", "Fantasy", "Supernatural"],
        year: 2025,
        img: "images/anime/gachiakuta.jpg",
        studio: "Bones",
        status: "Annunciato",
        episodes: 12,
        synopsis: "Rudo vive nella 'Zona Slum' dove i rifiuti della città superiore piovono dall'alto. Accusato ingiustamente di omicidio, viene gettato nell'Abisso dove i rifiuti prendono vita come mostri. Con il potere di trasformare la spazzatura in armi, Rudo giura vendetta contro chi lo ha incastrato. Manga di successo paragonato a Chainsaw Man per il suo protagonista rabbioso e il design unico. Anime annunciato per 2025.",
        structure: [
            { name: "Stagione 1", episodes: "2025" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=gachiakuta+streaming" }]
        }
    },
    {
        title: "Gangsta.",
        rating: 9,
        top: false,
        genres: ["Action", "Drama", "Crime"],
        year: 2015,
        img: "images/anime/gangsta.jpg",
        studio: "Manglobe",
        status: "Finito",
        episodes: 12,
        synopsis: "Mercenari gestiscono un'agenzia a Ergastulum, una città piena di criminali.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=gangsta+anime+streaming" }]
        }
    },
    {
        title: "Gantz",
        rating: 8,
        top: false,
        genres: ["Action", "Sci-Fi", "Horror"],
        year: 2004,
        img: "images/anime/gantz.jpg",
        studio: "Gonzo",
        status: "Finito",
        episodes: 26,
        synopsis: "Morti che tornano in vita devono cacciare alieni per punti.",
        structure: [{ name: "Serie", episodes: "26" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=gantz+anime+streaming" }]
        }
    },
    {
        title: "Gate",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Military", "Adventure"],
        year: 2015,
        img: "images/anime/gate.jpg",
        studio: "A-1 Pictures",
        status: "Finito",
        episodes: 24,
        synopsis: "Un portale magico si apre a Tokyo, collegando il Giappone a un mondo fantasy.",
        structure: [{ name: "S1+S2", episodes: "24" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=gate+anime+streaming" }]
        }
    },
    {
        title: "Ghost in the Shell",
        rating: 9,
        top: false,
        genres: ["Sci-Fi", "Cyberpunk", "Action"],
        year: 1995,
        img: "images/anime/ghost-in-the-shell.jpg",
        studio: "Production I.G",
        status: "Film",
        episodes: 1,
        synopsis: "In un futuro dove umani e macchine si fondono, la Maggiore Motoko Kusanagi è un cyborg quasi completamente artificiale che guida la Sezione 9, un'unità anti-terrorismo. Mentre caccia il misterioso hacker Puppet Master, inizia a interrogarsi sulla propria identità: cos'è che rende umani quando il corpo è artificiale? Un capolavoro filosofico che ha ispirato Matrix e definito il genere cyberpunk.",
        structure: [
            { name: "Film Originale (1995)", episodes: "1 film" },
            { name: "Ghost in the Shell 2: Innocence", episodes: "1 film (2004)" },
            { name: "Stand Alone Complex (Serie TV)", episodes: "52 episodi" }
        ],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=ghost+in+the+shell+streaming" }]
        }
    },
    {
        title: "Golden Kamuy",
        rating: 8,
        top: false,
        genres: ["Adventure", "Historical", "Action"],
        year: 2018,
        img: "images/anime/golden-kamuy.jpg",
        studio: "Geno Studio/Brain's Base",
        status: "Finito",
        episodes: 53,
        synopsis: "Un veterano di guerra cerca l'oro in Hokkaido con una ragazza Ainu.",
        structure: [{ name: "Totale", episodes: "50" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=golden+kamuy+streaming" }]
        }
    },
    {
        title: "Grimgar of Fantasy and Ash",
        rating: 9,
        top: false,
        genres: ["Fantasy", "Drama", "Adventure"],
        year: 2016,
        img: "images/anime/grimgar.jpg",
        studio: "A-1 Pictures",
        status: "Finito",
        episodes: 12,
        synopsis: "Persone si risvegliano in un mondo fantasy senza ricordi.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=grimgar+of+fantasy+and+ash+streaming" }]
        }
    },
    {
        title: "Handyman Saitou in Another World",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Comedy", "Adventure"],
        year: 2023,
        img: "images/anime/handyman-saitou.jpg",
        studio: "C2C",
        status: "Finito",
        episodes: 12,
        synopsis: "Un artigiano viene trasportato in un mondo fantasy.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=handyman+saitou+streaming" }]
        }
    },
    {
        title: "Heavenly Delusion",
        rating: 9,
        top: false,
        genres: ["Sci-Fi", "Mystery", "Post-apocalyptic"],
        year: 2023,
        img: "images/anime/heavenly-delusion.jpg",
        studio: "Production I.G",
        status: "In corso",
        episodes: 13,
        synopsis: "Tengoku Daimakyo (Heavenly Delusion) alterna due storie parallele. In una struttura isolata, bambini con poteri speciali vivono ignari del mondo esterno. Nel Giappone post-apocalittico devastato, Maru e Kiruko cercano il 'Paradiso' - un luogo sicuro. Le due trame sono collegate da misteri, mostri mutanti e segreti oscuri. Prodotto da Production I.G con un'atmosfera unica tra Promised Neverland e Nausicaa. Stagione 2 annunciata.",
        structure: [
            { name: "Stagione 1", episodes: "13 episodi" },
            { name: "Stagione 2 (annunciata)", episodes: "TBA" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=heavenly+delusion+streaming" }]
        }
    },
    {
        title: "Hell's Paradise: Jigokuraku",
        rating: 8,
        top: false,
        genres: ["Action", "Historical", "Supernatural"],
        year: 2023,
        img: "images/anime/hells-paradise.jpg",
        studio: "MAPPA",
        status: "Finito",
        episodes: 13,
        synopsis: "Un ninja condannato deve trovare l'elisir di vita su un'isola misteriosa.",
        structure: [{ name: "Serie", episodes: "13" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=hells+paradise+streaming" }]
        }
    },
    {
        title: "Hellsing Ultimate",
        rating: 9,
        top: false,
        genres: ["Horror", "Action", "Vampire"],
        year: 2006,
        img: "images/anime/hellsing-ultimate.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 10,
        synopsis: "L'organizzazione Hellsing protegge l'Inghilterra dalle minacce soprannaturali, con la sua arma segreta: Alucard, il vampiro più potente mai esistito, servo della famiglia Hellsing. Quando un'organizzazione nazista di vampiri artificiali attacca Londra, Alucard può finalmente scatenarsi. Violenza estrema, animazione spettacolare, e un protagonista overpowered che si diverte a massacrare i nemici. La serie OVA fedele al manga di Kouta Hirano.",
        structure: [
            { name: "OVA Completa", episodes: "10 episodi (45-60 min ciascuno)" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=hellsing+ultimate+streaming" }]
        }
    },
    {
        title: "Jujutsu Kaisen",
        rating: 9,
        top: false,
        genres: ["Action", "Supernatural", "Horror"],
        year: 2020,
        img: "images/anime/jujutsu-kaisen.jpg",
        studio: "MAPPA",
        status: "In corso",
        episodes: 48,
        synopsis: "Yuji Itadori è un liceale con forza sovrumana che, per salvare i suoi amici, ingoia un dito maledetto di Ryomen Sukuna, il Re delle Maledizioni. Ora condivide il corpo con questa entità malvagia ed è condannato a morte dalla Scuola di Stregoneria. Per guadagnare tempo, deve trovare e consumare tutte le 20 dita di Sukuna. Insieme a Megumi e Nobara, affronta maledizioni sempre più potenti. Combattimenti brutali, personaggi carismatici, trama dark.",
        structure: [
            { name: "Stagione 1", episodes: "24 episodi" },
            { name: "Film: Jujutsu Kaisen 0", episodes: "1 film (prequel)" },
            { name: "Stagione 2 (Hidden Inventory + Shibuya)", episodes: "23 episodi" },
            { name: "Stagione 3 (annunciata)", episodes: "2025" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=jujutsu+kaisen+streaming" }]
        }
    },
    {
        title: "Kaiju No. 8",
        rating: 8,
        top: false,
        genres: ["Action", "Sci-Fi", "Monster"],
        year: 2024,
        img: "images/anime/kaiju-no-8.jpg",
        studio: "Production I.G",
        status: "In corso",
        episodes: 12,
        synopsis: "Kafka Hibino diventa un kaiju dopo essere stato infettato.",
        structure: [{ name: "S1", episodes: "12" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=kaiju+no+8+streaming" }]
        }
    },
    {
        title: "Kill la Kill",
        rating: 9,
        top: false,
        genres: ["Action", "Comedy", "School"],
        year: 2013,
        img: "images/anime/kill-la-kill.jpg",
        studio: "Studio Trigger",
        status: "Finito",
        episodes: 24,
        synopsis: "Una ragazza cerca vendetta con una divina uniforme scolastica.",
        structure: [{ name: "Serie", episodes: "24" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=kill+la+kill+streaming" }]
        }
    },
    {
        title: "Kingdom",
        rating: 9,
        top: false,
        genres: ["Historical", "Military", "Action"],
        year: 2012,
        img: "images/anime/kingdom.jpg",
        studio: "Pierrot",
        status: "In corso",
        episodes: 78,
        synopsis: "Un orfano sogna di diventare il più grande generale della Cina.",
        structure: [{ name: "Totale", episodes: "78" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=kingdom+anime+streaming" }]
        }
    },
    {
        title: "La città incantata",
        rating: 9,
        top: false,
        genres: ["Fantasy", "Adventure", "Drama"],
        year: 2001,
        img: "images/anime/spirited-away.jpg",
        studio: "Studio Ghibli",
        status: "Film",
        episodes: 1,
        synopsis: "Chihiro cerca di salvare i suoi genitori trasformati in maiali.",
        structure: [{ name: "Film", episodes: "1" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=la+città+incantata+streaming" }]
        }
    },
    {
        title: "Lazarus",
        rating: 8,
        top: false,
        genres: ["Sci-Fi", "Action", "Thriller"],
        year: 2025,
        img: "images/anime/lazarus.jpg",
        studio: "MAPPA",
        status: "Annunciato",
        episodes: 13,
        synopsis: "Dal creatore di Cowboy Bebop, Shinichiro Watanabe. Ambientato nel 2052, tre anni dopo che un farmaco miracoloso ha causato dipendenza di massa e morte. Un agente deve fermare la diffusione della droga mentre affronta i fantasmi del suo passato. Annunciato come serie originale Adult Swim/MAPPA per il 2025. Stile action/noir con influenze cyberpunk.",
        structure: [
            { name: "Stagione 1", episodes: "13 episodi (2025)" }
        ],
        links: {
            legal: [{ name: "Adult Swim", url: "https://adultswim.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=lazarus+anime+2025" }]
        }
    },
    {
        title: "Made in Abyss",
        rating: 9,
        top: false,
        genres: ["Adventure", "Fantasy", "Dark Fantasy"],
        year: 2017,
        img: "images/anime/made-in-abyss.jpg",
        studio: "Kinema Citrus",
        status: "In corso",
        episodes: 25,
        synopsis: "L'Abisso è un enorme pozzo misterioso pieno di reliquie e creature mortali. I Cave Raiders lo esplorano, ma chi scende troppo in profondità non può più tornare senza subire la 'Maledizione dell'Abisso'. Riko, figlia di una leggendaria Cave Raider scomparsa, riceve un messaggio dalla madre e decide di scendere nell'Abisso insieme a Reg, un misterioso robot. Un'avventura che nasconde orrori indicibili dietro un'estetica adorabile.",
        structure: [
            { name: "Stagione 1", episodes: "13 episodi" },
            { name: "Film 3: Dawn of the Deep Soul", episodes: "1 film (2020)" },
            { name: "Stagione 2: The Golden City", episodes: "12 episodi (2022)" }
        ],
        links: {
            legal: [{ name: "Amazon", url: "https://primevideo.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=made+in+abyss+streaming" }]
        }
    },
    {
        title: "Mob Psycho 100",
        rating: 9,
        top: false,
        genres: ["Action", "Comedy", "Supernatural"],
        year: 2016,
        img: "images/anime/mob-psycho-100.jpg",
        studio: "Bones",
        status: "Finito",
        episodes: 37,
        synopsis: "Shigeo 'Mob' Kageyama è un ragazzo delle medie con poteri psichici devastanti, ma tutto ciò che vuole è essere normale e conquistare la ragazza che gli piace. Lavora part-time per Reigen Arataka, un 'esorcista' truffatore che in realtà non ha poteri. Quando le emozioni di Mob raggiungono il 100%, esplode in modi imprevedibili. Dello stesso autore di One Punch Man, combina azione spettacolare, umorismo e crescita personale.",
        structure: [
            { name: "Stagione 1", episodes: "12 episodi" },
            { name: "Stagione 2", episodes: "13 episodi" },
            { name: "Stagione 3", episodes: "12 episodi" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=mob+psycho+streaming" }]
        }
    },
    {
        title: "Monster",
        rating: 8,
        top: false,
        genres: ["Thriller", "Mystery", "Psychological"],
        year: 2004,
        img: "images/anime/monster.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 74,
        synopsis: "Il dottor Tenma caccia Johan, il killer psicotico che ha salvato.",
        structure: [{ name: "Serie", episodes: "74" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=monster+anime+streaming" }]
        }
    },
    {
        title: "My Hero Academia",
        rating: 9,
        top: false,
        genres: ["Action", "Superhero", "School"],
        year: 2016,
        img: "images/anime/my-hero-academia.jpg",
        studio: "Bones",
        status: "Finito",
        episodes: 163,
        synopsis: "In un mondo dove l'80% della popolazione ha superpoteri (Quirk), Izuku Midoriya è nato senza. Nonostante ciò, sogna di diventare un eroe come il suo idolo All Might. Quando incontra All Might in persona, questi gli passa il suo Quirk 'One For All', permettendogli di entrare alla U.A., la più prestigiosa accademia per eroi. Ma dovrà affrontare villain sempre più pericolosi e scoprire i segreti oscuri dietro il suo nuovo potere. Serie conclusa nel 2024.",
        structure: [
            { name: "Stagione 1", episodes: "13 episodi" },
            { name: "Stagione 2", episodes: "25 episodi" },
            { name: "Stagione 3", episodes: "25 episodi" },
            { name: "Stagione 4", episodes: "25 episodi" },
            { name: "Stagione 5", episodes: "25 episodi" },
            { name: "Stagione 6", episodes: "25 episodi" },
            { name: "Stagione 7 (Finale)", episodes: "25 episodi (2024)" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=my+hero+academia+streaming" }]
        }
    },
    {
        title: "My Hero Academia: Vigilantes",
        rating: 7,
        top: false,
        genres: ["Action", "Superhero", "Crime"],
        year: 2025,
        img: "images/anime/my-hero-academia.jpg",
        studio: "Bones",
        status: "Annunciato",
        episodes: 12,
        synopsis: "Spin-off di My Hero Academia ambientato anni prima della serie principale. Koichi Haimawari è un ragazzo con un Quirk debole che ammira gli eroi ma non può diventarlo. Come 'The Crawler', agisce come vigilante illegale insieme a Pop Step e Knuckleduster, affrontando criminali nelle strade. Approfondisce il passato di Eraserhead e introduce villain importanti. Anime annunciato per Aprile 2025.",
        structure: [
            { name: "Stagione 1", episodes: "Aprile 2025" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=my+hero+academia+vigilantes+anime+2025" }]
        }
    },
    {
        title: "One-Punch Man",
        rating: 9,
        top: false,
        genres: ["Action", "Comedy", "Superhero"],
        year: 2015,
        img: "images/anime/one-punch-man.jpg",
        studio: "Madhouse",
        status: "In corso",
        episodes: 24,
        synopsis: "Saitama sconfigge tutti con un solo pugno e cerca un avversario degno.",
        structure: [{ name: "Totale", episodes: "24" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=one+punch+man+streaming" }]
        }
    },
    {
        title: "Overlord",
        rating: 9,
        top: false,
        genres: ["Fantasy", "Isekai", "Action"],
        year: 2015,
        img: "images/anime/overlord.jpg",
        studio: "Madhouse",
        status: "In corso",
        episodes: 52,
        synopsis: "Un giocatore rimane intrappolato nel suo gioco di ruolo come sovrano non morto.",
        structure: [{ name: "S1-S4", episodes: "52" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=overlord+streaming" }]
        }
    },
    {
        title: "Parasyte -the maxim-",
        rating: 8,
        top: false,
        genres: ["Horror", "Sci-Fi", "Action"],
        year: 2014,
        img: "images/anime/parasyte.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 24,
        synopsis: "Shinichi si fonde con un parassita alieno nella mano destra.",
        structure: [{ name: "Serie", episodes: "24" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=parasyte+streaming" }]
        }
    },
    {
        title: "PLUTO",
        rating: 8,
        top: false,
        genres: ["Mystery", "Sci-Fi", "Psychological"],
        year: 2023,
        img: "images/anime/pluto.jpg",
        studio: "Studio M2/Genco",
        status: "Finito",
        episodes: 8,
        synopsis: "Adattamento del manga di Naoki Urasawa (Monster, 20th Century Boys) ispirato ad Astro Boy di Osamu Tezuka. Il detective robot Gesicht indaga su una serie di omicidi che colpiscono i robot più avanzati del mondo e gli umani che li hanno creati. Qualcuno sta uccidendo sistematicamente i 7 robot più potenti della Terra, incluso Atom (Astro Boy). Un thriller filosofico sulla natura dell'umanità e dell'odio.",
        structure: [
            { name: "Serie Completa", episodes: "8 episodi (65 min ciascuno)" }
        ],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=pluto+anime+netflix" }]
        }
    },
    {
        title: "Principessa Mononoke",
        rating: 9,
        top: false,
        genres: ["Fantasy", "Adventure", "Drama"],
        year: 1997,
        img: "images/anime/mononoke.jpg",
        studio: "Studio Ghibli",
        status: "Film",
        episodes: 1,
        synopsis: "Un principe cerca di fermare la guerra tra umani e dei della foresta.",
        structure: [{ name: "Film", episodes: "1" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=principessa+mononoke+streaming" }]
        }
    },
    {
        title: "Promare",
        rating: 8,
        top: false,
        genres: ["Action", "Sci-Fi", "Mecha"],
        year: 2019,
        img: "images/anime/promare.jpg",
        studio: "Studio Trigger",
        status: "Film",
        episodes: 1,
        synopsis: "Pompieri combattono terroristi con poteri infuocati.",
        structure: [{ name: "Film", episodes: "1" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=promare+streaming" }]
        }
    },
    {
        title: "Ranking of Kings",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Adventure", "Drama"],
        year: 2021,
        img: "images/anime/ranking-of-kings.jpg",
        studio: "Wit Studio",
        status: "In corso",
        episodes: 23,
        synopsis: "Un principe sordo cerca di diventare il miglior re.",
        structure: [{ name: "S1+S2", episodes: "23" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=ranking+of+kings+streaming" }]
        }
    },
    {
        title: "Re:ZERO -Starting Life in Another World-",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Thriller", "Isekai"],
        year: 2016,
        img: "images/anime/rezero.jpg",
        studio: "White Fox",
        status: "In corso",
        episodes: 50,
        synopsis: "Subaru torna indietro nel tempo dopo ogni morte.",
        structure: [{ name: "S1+S2+S3", episodes: "50+" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=rezero+streaming" }]
        }
    },
    {
        title: "Reincarnated as a Sword",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Isekai", "Adventure"],
        year: 2022,
        img: "images/anime/reincarnated-sword.jpg",
        studio: "C2C",
        status: "In corso",
        episodes: 12,
        synopsis: "Un uomo si reincarna come spada magica e incontra una ragazza gatto.",
        structure: [{ name: "S1", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=reincarnated+as+a+sword+streaming" }]
        }
    },
    {
        title: "Saint Seiya",
        rating: 8,
        top: false,
        genres: ["Action", "Fantasy", "Adventure"],
        year: 1986,
        img: "images/anime/saint-seiya.jpg",
        studio: "Toei",
        status: "Finito",
        episodes: 114,
        synopsis: "Guerrieri sacri proteggono Atena e combattono per la giustizia.",
        structure: [{ name: "Serie", episodes: "114" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=saint+seiya+streaming" }]
        }
    },
    {
        title: "Samurai Champloo",
        rating: 9,
        top: false,
        genres: ["Action", "Historical", "Hip Hop"],
        year: 2004,
        img: "images/anime/samurai-champloo.jpg",
        studio: "Manglobe",
        status: "Finito",
        episodes: 26,
        synopsis: "Due samurai e una ragazza viaggiano per il Giappone in cerca di un samurai che sapeva di girasoli.",
        structure: [{ name: "Serie", episodes: "26" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=samurai+champloo+streaming" }]
        }
    },
    {
        title: "Sentence to be hero",
        rating: 8,
        top: false,
        genres: ["Comedy", "Parody", "Superhero"],
        year: 2026,
        img: "images/anime/to-be-hero.jpg",
        studio: "Haoliners",
        status: "Annunciato",
        episodes: 12,
        synopsis: "Sequel di To Be Hero X. Serie comica sui supereroi con umorismo assurdo e azione esagerata. Annunciato per il 2026.",
        structure: [{ name: "Serie", episodes: "TBA 2026" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=sentence+to+be+hero+streaming" }]
        }
    },
    {
        title: "Shangri-La Frontier",
        rating: 9,
        top: false,
        genres: ["Game", "Adventure", "Comedy"],
        year: 2023,
        img: "images/anime/shangri-la-frontier.jpg",
        studio: "C2C",
        status: "In corso",
        episodes: 25,
        synopsis: "Un giocatore esperto affronta un gioco considerato 'spazzatura'.",
        structure: [{ name: "S1", episodes: "25" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=shangri+la+frontier+streaming" }]
        }
    },
    {
        title: "Solo Leveling",
        rating: 9,
        top: false,
        genres: ["Action", "Fantasy", "Adventure"],
        year: 2024,
        img: "images/anime/solo-leveling.jpg",
        studio: "A-1 Pictures",
        status: "In corso",
        episodes: 25,
        synopsis: "In un mondo dove portali dimensionali hanno portato mostri sulla Terra, esistono i Cacciatori con poteri speciali. Sung Jinwoo è il 'Cacciatore più debole dell'umanità', rank E, che rischia la vita per pochi soldi. Dopo essere quasi morto in un dungeon segreto, riceve il Sistema, un potere unico che gli permette di 'livellare' come in un videogioco. Da zero a eroe, Jinwoo diventerà il più forte. Basato sul manhwa coreano fenomeno mondiale.",
        structure: [
            { name: "Stagione 1", episodes: "12 episodi (Inverno 2024)" },
            { name: "Stagione 2: Arise from the Shadow", episodes: "13 episodi (Gennaio 2025)" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=solo+leveling+streaming" }]
        }
    },
    {
        title: "SPY x FAMILY",
        rating: 7,
        top: false,
        genres: ["Comedy", "Action", "Family"],
        year: 2022,
        img: "images/anime/spy-x-family.jpg",
        studio: "Wit/Cloverworks",
        status: "In corso",
        episodes: 37,
        synopsis: "Una spia, un'assassina e una telepate formano una famiglia finta.",
        structure: [{ name: "Totale", episodes: "37" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=spy+x+family+streaming" }]
        }
    },
    {
        title: "Sword Art Online",
        rating: 8,
        top: false,
        genres: ["Sci-Fi", "Game", "Adventure"],
        year: 2012,
        img: "images/anime/sword-art-online.jpg",
        studio: "A-1 Pictures",
        status: "In corso",
        episodes: 96,
        synopsis: "Giocatori intrappolati in un MMO mortale devono completare il gioco.",
        structure: [{ name: "Alicization+", episodes: "96+" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=sao+streaming" }]
        }
    },
    {
        title: "Terra Formars",
        rating: 7,
        top: false,
        genres: ["Sci-Fi", "Horror", "Action"],
        year: 2014,
        img: "images/anime/terra-formars.jpg",
        studio: "Lerche",
        status: "Finito",
        episodes: 26,
        synopsis: "Umani combattono scarafaggi umanoidi su Marte.",
        structure: [{ name: "S1+S2", episodes: "26" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=terra+formars+streaming" }]
        }
    },
    {
        title: "The Eminence in Shadow",
        rating: 7,
        top: false,
        genres: ["Fantasy", "Comedy", "Isekai"],
        year: 2022,
        img: "images/anime/eminence-in-shadow.jpg",
        studio: "Nexus",
        status: "In corso",
        episodes: 20,
        synopsis: "Un ragazzo si reincarna e finge di essere un maestro dell'ombra.",
        structure: [{ name: "S1+S2", episodes: "20" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=the+eminence+in+shadow+streaming" }]
        }
    },
    {
        title: "The Promised Neverland",
        rating: 8,
        top: false,
        genres: ["Thriller", "Mystery", "Horror"],
        year: 2019,
        img: "images/anime/promised-neverland.jpg",
        studio: "CloverWorks",
        status: "Finito",
        episodes: 23,
        synopsis: "Orfani scoprono il terribile segreto del loro orfanotrofio.",
        structure: [{ name: "S1", episodes: "12" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=promised+neverland+streaming" }]
        }
    },
    {
        title: "The Rising of the Shield Hero",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Isekai", "Adventure"],
        year: 2019,
        img: "images/anime/shield-hero.jpg",
        studio: "Kinema Citrus",
        status: "In corso",
        episodes: 38,
        synopsis: "Un ragazzo viene convocato come Shield Hero in un altro mondo.",
        structure: [{ name: "S1+S2+S3", episodes: "38" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=shield+hero+streaming" }]
        }
    },
    {
        title: "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
        rating: 7,
        top: false,
        genres: ["Fantasy", "Isekai", "Action"],
        year: 2021,
        img: "images/anime/assassin-aristocrat.jpg",
        studio: "Studio Silver",
        status: "Finito",
        episodes: 12,
        synopsis: "Il miglior assassino si reincarna in un mondo fantasy.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=worlds+finest+assassin+streaming" }]
        }
    },
    {
        title: "To Be Hero X",
        rating: 7,
        top: false,
        genres: ["Comedy", "Superhero", "Sci-Fi"],
        year: 2023,
        img: "images/anime/to-be-hero.jpg",
        studio: "Haoliners",
        status: "Finito",
        episodes: 10,
        synopsis: "Un uomo diventa un eroe ridicolo per salvare il mondo. Serie comica sui supereroi con umorismo assurdo.",
        structure: [{ name: "Serie", episodes: "10" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=to+be+hero+x+streaming" }]
        }
    },
    {
        title: "Tokyo Revengers",
        rating: 7,
        top: false,
        genres: ["Action", "Drama", "Time Travel"],
        year: 2021,
        img: "images/anime/tokyo-revengers.jpg",
        studio: "Liden Films",
        status: "In corso",
        episodes: 50,
        synopsis: "Un uomo viaggia nel tempo per salvare la sua ragazza.",
        structure: [{ name: "Totale", episodes: "50" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=tokyo+revengers+streaming" }]
        }
    },
    {
        title: "Tower of God",
        rating: 7,
        top: false,
        genres: ["Adventure", "Fantasy", "Action"],
        year: 2020,
        img: "images/anime/tower-of-god.jpg",
        studio: "Telecom Animation Film",
        status: "Finito",
        episodes: 13,
        synopsis: "Un ragazzo entra in una torre misteriosa per trovare un'amica.",
        structure: [{ name: "S1", episodes: "13" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=tower+of+god+streaming" }]
        }
    },
    {
        title: "Trigun",
        rating: 8,
        top: false,
        genres: ["Action", "Sci-Fi", "Western"],
        year: 1998,
        img: "images/anime/trigun.jpg",
        studio: "Madhouse",
        status: "Finito",
        episodes: 26,
        synopsis: "Vash the Stampede, un fuorilegge con una taglia di 60 miliardi, cerca la pace.",
        structure: [{ name: "Serie", episodes: "26" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=trigun+streaming" }]
        }
    },
    {
        title: "Vinland Saga",
        rating: 9,
        top: false,
        genres: ["Action", "Historical", "Drama"],
        year: 2019,
        img: "images/anime/vinland-saga.jpg",
        studio: "Wit/MAPPA",
        status: "Finito",
        episodes: 48,
        synopsis: "Thorfinn è figlio di un grande guerriero vichingo che ha abbandonato la vita di violenza. Quando suo padre viene ucciso dal mercenario Askeladd, Thorfinn giura vendetta e paradossalmente si unisce alla banda del suo nemico per avere l'opportunità di sfidarlo a duello. Un'epopea vichinga brutale e filosofica che esplora temi di vendetta, redenzione e il vero significato di essere un guerriero. Basato sul manga premiato di Makoto Yukimura.",
        structure: [
            { name: "Stagione 1 (War Arc)", episodes: "24 episodi - Wit Studio" },
            { name: "Stagione 2 (Slave Arc)", episodes: "24 episodi - MAPPA" }
        ],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=vinland+saga+streaming" }]
        }
    },
    {
        title: "Wistoria: Wand and Sword",
        rating: 7,
        top: false,
        genres: ["Fantasy", "Adventure", "Magic"],
        year: 2024,
        img: "images/anime/wistoria.jpg",
        studio: "Bandai Namco/Actas",
        status: "Finito",
        episodes: 12,
        synopsis: "Will Serfort è uno studente dell'Accademia di Magia Regarden, ma ha un problema: non può usare la magia. In un mondo dove i maghi dominano, lui compensa con abilità di combattimento straordinarie. Per mantenere una promessa fatta da bambino, deve raggiungere la cima della Magia Tower. Dal creatore di DanMachi (Fujino Omori) con disegni di Ookuma. Stagione 2 annunciata per 2025.",
        structure: [
            { name: "Stagione 1", episodes: "12 episodi (Estate 2024)" },
            { name: "Stagione 2 (annunciata)", episodes: "2025" }
        ],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=wistoria+wand+and+sword+streaming" }]
        }
    },
    {
        title: "Wolf's Rain",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Adventure", "Drama"],
        year: 2003,
        img: "images/anime/wolfs-rain.jpg",
        studio: "Bones",
        status: "Finito",
        episodes: 26,
        synopsis: "Lupi che sembrano umani cercano il paradiso.",
        structure: [{ name: "Serie", episodes: "26" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=wolfs+rain+streaming" }]
        }
    }
];











