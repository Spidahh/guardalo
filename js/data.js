// Database anime GUARDALO - Lista completa con 94 anime
const animeData = [
    {
        title: "Attack on Titan",
        rating: 10,
        top: true,
        genres: ["Action", "Drama", "Fantasy"],
        year: 2013,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Wit/MAPPA",
        status: "Finito",
        episodes: 94,
        synopsis: "L'umanità combatte per sopravvivere contro i Titani che mangiano gli esseri umani.",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "OLM",
        status: "Finito",
        episodes: 25,
        synopsis: "Gatsu, il Guerriero Nero, cerca vendetta contro Griffith e i God Hand.",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Pierrot",
        status: "Finito",
        episodes: 366,
        synopsis: "Ichigo Kurosaki diventa uno Shinigami per proteggere gli umani.",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Studio Trigger",
        status: "Finito",
        episodes: 10,
        synopsis: "Un ragazzo di strada diventa un edgerunner per sopravvivere a Night City.",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Madhouse",
        status: "Finito",
        episodes: 37,
        synopsis: "Light Yagami trova un quaderno che uccide chiunque il cui nome venga scritto.",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Bones",
        status: "Finito",
        episodes: 64,
        synopsis: "I fratelli Elric cercano la Pietra Filosofale per riparare i loro corpi.",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Gainax",
        status: "Finito",
        episodes: 27,
        synopsis: "Simon e Kamina combattono contro i Beastmen con il loro robot meccanico.",
        structure: [{ name: "Serie", episodes: "27" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Madhouse",
        status: "In pausa",
        episodes: 148,
        synopsis: "Gon cerca di diventare Hunter per trovare suo padre.",
        structure: [{ name: "Serie", episodes: "148" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "David Production",
        status: "In corso",
        episodes: 190,
        synopsis: "Le avventure della famiglia Joestar attraverso le generazioni.",
        structure: [{ name: "Totale", episodes: "190" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Pierrot",
        status: "Finito",
        episodes: 720,
        synopsis: "Naruto Uzumaki sogna di diventare Hokage, il leader del suo villaggio.",
        structure: [{ name: "Naruto + Shippuden", episodes: "720" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Gainax",
        status: "Finito",
        episodes: 26,
        synopsis: "Shinji Ikari pilota un Eva per combattere contro gli Angeli.",
        structure: [{ name: "Serie", episodes: "26" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Toei",
        status: "In corso",
        episodes: 1000,
        synopsis: "Monkey D. Rufy e i suoi pirati cercano il tesoro One Piece.",
        structure: [{ name: "Saga", episodes: "1000+" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "White Fox",
        status: "Finito",
        episodes: 24,
        synopsis: "Okabe scopre di poter inviare messaggi nel passato e cambia la storia.",
        structure: [{ name: "Serie", episodes: "24" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "OLM",
        status: "Finito",
        episodes: 25,
        synopsis: "Shinpei torna al suo villaggio natale per il funerale della sua amica d'infanzia.",
        structure: [{ name: "Serie", episodes: "25" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "TMS",
        status: "Film",
        episodes: 1,
        synopsis: "Kaneda cerca di salvare il suo amico Tetsuo che ha sviluppato poteri psichici a Neo-Tokyo.",
        structure: [{ name: "Film", episodes: "1" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Fortiche",
        status: "Finito",
        episodes: 18,
        synopsis: "Due sorelle, Vi e Jinx, si trovano su fronti opposti in una guerra tra Piltover e Zaun.",
        structure: [{ name: "Totale", episodes: "18" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Studio Colorido",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "MAPPA",
        status: "In corso",
        episodes: 12,
        synopsis: "Denji si fonde con il diavolo motosega Pochita per diventare Chainsaw Man.",
        structure: [{ name: "S1", episodes: "12" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        title: "code geass",
        rating: 8,
        top: false,
        genres: ["Mecha", "Action", "Thriller"],
        year: 2006,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Sunrise",
        status: "Finito",
        episodes: 50,
        synopsis: "Lelouch ottiene il potere del Geass e guida una ribellione contro l'impero Britannia.",
        structure: [{ name: "R1+R2", episodes: "50" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=code+geass+streaming" }]
        }
    },
    {
        title: "cowboy bebop",
        rating: 9,
        top: false,
        genres: ["Sci-Fi", "Action", "Space Western"],
        year: 1998,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Sunrise",
        status: "Finito",
        episodes: 26,
        synopsis: "Spike Spiegel e la sua ciurma di cacciatori di taglie viaggiano nello spazio.",
        structure: [{ name: "Serie", episodes: "26" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Science SARU",
        status: "In corso",
        episodes: 12,
        synopsis: "Momo e Okarun combattono fantasmi e alieni in un'avventura esilarante.",
        structure: [{ name: "S1", episodes: "12" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        title: "death parade",
        rating: 7,
        top: false,
        genres: ["Psychological", "Thriller", "Drama"],
        year: 2015,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Ufotable",
        status: "In corso",
        episodes: 63,
        synopsis: "Tanjiro combatte i demoni per salvare sua sorella Nezuko e trovare una cura.",
        structure: [{ name: "Totale", episodes: "63" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Science SARU",
        status: "Finito",
        episodes: 10,
        synopsis: "Akira Fudo si fonde con il demone Amon per combattere altri demoni.",
        structure: [{ name: "Serie", episodes: "10" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=devilman+crybaby+streaming" }]
        }
    },
    {
        title: "dragon ball",
        rating: 9,
        top: false,
        genres: ["Action", "Adventure", "Martial Arts"],
        year: 1986,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        title: "eighty six",
        rating: 8,
        top: false,
        genres: ["Mecha", "Action", "Drama"],
        year: 2021,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        title: "Failure Frame",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Isekai", "Action"],
        year: 2024,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Seven Arcs",
        status: "In corso",
        episodes: 12,
        synopsis: "Un ragazzo tradito diventa overpowered in un altro mondo.",
        structure: [{ name: "S1", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=failure+frame+streaming" }]
        }
    },
    {
        title: "Fate/Zero",
        rating: 7,
        top: false,
        genres: ["Action", "Fantasy", "Supernatural"],
        year: 2011,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "ufotable",
        status: "Finito",
        episodes: 25,
        synopsis: "Maghi e servi storici combattono per il Santo Graal.",
        structure: [{ name: "S1+S2", episodes: "25" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=fate+zero+streaming" }]
        }
    },
    {
        title: "FLCL",
        rating: 8,
        top: false,
        genres: ["Comedy", "Sci-Fi", "Coming-of-age"],
        year: 2000,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Madhouse",
        status: "In corso",
        episodes: 28,
        synopsis: "Un'elfa immortale riflette sulla vita dopo la sconfitta del Re Demone.",
        structure: [{ name: "S1", episodes: "28" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        year: 2024,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Satelight",
        status: "In corso",
        episodes: 12,
        synopsis: "In un mondo dove i rifiuti diventano mostri, un ragazzo cerca vendetta.",
        structure: [{ name: "S1", episodes: "12" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Production I.G",
        status: "Film",
        episodes: 1,
        synopsis: "La Maggiore Kusanagi caccia un hacker misterioso nel cyberspazio.",
        structure: [{ name: "Film", episodes: "1" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=ghost+in+the+shell+streaming" }]
        }
    },
    {
        title: "golden kamuy",
        rating: 8,
        top: false,
        genres: ["Adventure", "Historical", "Action"],
        year: 2018,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Geno Studio",
        status: "In corso",
        episodes: 50,
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "C2C",
        status: "Finito",
        episodes: 12,
        synopsis: "Un giovane artigiano viene risvegliato come golem in un mondo fantasy dopo essere stato tradito. Dovrà imparare a sopravvivere e capire il significato della sua nuova esistenza mentre combatte mostri e incontra alleati in questo mondo misterioso.",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Production I.G",
        status: "Finito",
        episodes: 13,
        synopsis: "In un Giappone post-apocalittico, persone cercano il paradiso.",
        structure: [{ name: "Serie", episodes: "13" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Madhouse",
        status: "Finito",
        episodes: 10,
        synopsis: "Alucard, il vampiro originale, combatte per l'organizzazione Hellsing.",
        structure: [{ name: "OVA", episodes: "10" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "MAPPA",
        status: "In corso",
        episodes: 47,
        synopsis: "Yuji Itadori diventa il contenitore del Re delle Maledizioni Sukuna.",
        structure: [{ name: "Totale", episodes: "47" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        year: 2024,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "MAPPA",
        status: "In corso",
        episodes: 12,
        synopsis: "Un team di scienziati combatte un virus creato da un Nobel.",
        structure: [{ name: "S1", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=lazarus+anime+streaming" }]
        }
    },
    {
        title: "Made in Abyss",
        rating: 9,
        top: false,
        genres: ["Adventure", "Fantasy", "Dark Fantasy"],
        year: 2017,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Kinema Citrus",
        status: "In corso",
        episodes: 25,
        synopsis: "Riko e Reg scendono nell'Abisso, un misterioso e pericoloso pozzo.",
        structure: [{ name: "Totale", episodes: "25" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Bones",
        status: "Finito",
        episodes: 37,
        synopsis: "Shigeo Kageyama, detto Mob, ha poteri psichici incredibili.",
        structure: [{ name: "Totale", episodes: "37" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Bones",
        status: "In corso",
        episodes: 150,
        synopsis: "Izuku Midoriya eredita il superpotere più forte e si iscrive all'accademia per eroi.",
        structure: [{ name: "Totale", episodes: "150" }],
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
        year: 2023,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Bones",
        status: "Finito",
        episodes: 12,
        synopsis: "Vigilantes combattono il crimine al di fuori del sistema hero.",
        structure: [{ name: "Serie", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=my+hero+academia+vigilantes+streaming" }]
        }
    },
    {
        title: "One-Punch Man",
        rating: 9,
        top: false,
        genres: ["Action", "Comedy", "Superhero"],
        year: 2015,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        title: "pluto",
        rating: 8,
        top: false,
        genres: ["Mystery", "Sci-Fi", "Psychological"],
        year: 2023,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Studio Ghibli",
        status: "Finito",
        episodes: 8,
        synopsis: "In un futuro dove i robot hanno ottenuto coscienza, un detective umano specializzato in crimini informatici deve indagare su una serie di omicidi di androidi avanzati. Scoprirà una cospirazione che minaccia l'equilibrio precario tra umani e macchine.",
        structure: [{ name: "Serie", episodes: "8" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=pluto+anime+streaming" }]
        }
    },
    {
        title: "Principessa Mononoke",
        rating: 9,
        top: false,
        genres: ["Fantasy", "Adventure", "Drama"],
        year: 1997,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        title: "saint seya",
        rating: 8,
        top: false,
        genres: ["Action", "Fantasy", "Adventure"],
        year: 1986,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Toei",
        status: "Finito",
        episodes: 114,
        synopsis: "Guerrieri sacri prottggono Atena e combattono per la giustizia.",
        structure: [{ name: "Serie", episodes: "114" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=saint+seiya+streaming" }]
        }
    },
    {
        title: "samurai champloo",
        rating: 9,
        top: false,
        genres: ["Action", "Historical", "Hip Hop"],
        year: 2004,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        year: 2022,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Studio Ghibli",
        status: "Finito",
        episodes: 12,
        synopsis: "Parodia dei supereroi con umorismo assurdo.",
        structure: [{ name: "Serie", episodes: "12" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "A-1 Pictures",
        status: "In corso",
        episodes: 12,
        synopsis: "Il cacciatore più debole diventa il più forte dopo aver ottenuto poteri unici.",
        structure: [{ name: "S1", episodes: "12" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        genres: ["Thriller", "Horror", "Mystery"],
        year: 2019,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "CloverWorks",
        status: "Finito",
        episodes: 12,
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Studio Ghibli",
        status: "Finito",
        episodes: 10,
        synopsis: "Un uomo diventa un eroe ridicolo per salvare il mondo.",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Wit Studio",
        status: "Finito",
        episodes: 48,
        synopsis: "Thorfinn cerca vendetta per la morte del padre in un'epopea vichinga.",
        structure: [{ name: "Totale", episodes: "48" }],
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
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
        studio: "Actas",
        status: "In corso",
        episodes: 12,
        synopsis: "Un ragazzo senza magia cerca di diventare mago in un'accademia.",
        structure: [{ name: "S1", episodes: "12" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=wistoria+wand+and+sword+streaming" }]
        }
    },
    {
        title: "wolf's rain",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Adventure", "Drama"],
        year: 2003,
        img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2luZTwvdGV4dD48L3N2Zz4=",
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
