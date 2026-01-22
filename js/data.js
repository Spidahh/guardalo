// GUARDALO DATABASE - Con voti e bollini TOP
const animeData = [
    {
        title: "91 Days",
        rating: 8,
        top: false,
        genres: ["Drama", "Crime", "Thriller"],
        year: 2016,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/13/80515.jpg&w=300&h=450&fit=cover",
        studio: "Shuka",
        status: "Finito",
        episodes: 13,
        synopsis: "Angelo si infiltra nella mafia per vendetta dopo aver visto la sua famiglia sterminata.",
        structure: [{ name: "Serie", episodes: "13" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=91+days+streaming" }]
        }
    },
    {
        title: "Attack on Titan",
        rating: 10,
        top: true,
        genres: ["Action", "Drama", "Fantasy"],
        year: 2013,
        img: "https://images.weserv.nl/?url=https://cdn.myanimelist.net/images/anime/10/47347.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1384/119289.jpg&w=300&h=450&fit=cover",
        studio: "OLM",
        status: "Finito",
        episodes: 25,
        synopsis: "Guts, il guerriero nero, cerca vendetta contro il suo ex-amico Griffith che lo ha tradito durante l'Eclissi.",
        structure: [{ name: "1997", episodes: "25" }],
        links: {
            legal: [],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=berserk+1997+streaming" }]
        }
    },
    {
        title: "BLEACH",
        rating: 9,
        top: true,
        genres: ["Action", "Supernatural", "Adventure"],
        year: 2004,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/3/40451.jpg&w=300&h=450&fit=cover",
        studio: "Pierrot",
        status: "In corso",
        episodes: 392,
        synopsis: "Ichigo Kurosaki diventa Shinigami per proteggere gli esseri umani dagli Hollow.",
        structure: [{ name: "Totale", episodes: "392" }],
        links: {
            legal: [{ name: "Disney+", url: "https://disneyplus.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=bleach+streaming" }]
        }
    },
    {
        title: "Cyberpunk: Edgerunners",
        rating: 9,
        top: true,
        genres: ["Sci-Fi", "Action", "Cyberpunk"],
        year: 2022,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1818/126435.jpg&w=300&h=450&fit=cover",
        studio: "Trigger",
        status: "Finito",
        episodes: 10,
        synopsis: "David diventa un mercenario edgerunner a Night City cercando di sopravvivere in un mondo crudele.",
        structure: [{ name: "Serie", episodes: "10" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=edgerunners+streaming" }]
        }
    },
    {
        title: "Death Note",
        rating: 9,
        top: true,
        genres: ["Thriller", "Psychological", "Mystery"],
        year: 2006,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/9/9453.jpg&w=300&h=450&fit=cover",
        studio: "Madhouse",
        status: "Finito",
        episodes: 37,
        synopsis: "Light Yagami trova un quaderno che uccide chiunque il cui nome venga scritto sopra.",
        structure: [{ name: "Serie", episodes: "37" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=death+note+streaming" }]
        }
    },
    {
        title: "Fullmetal Alchemist: Brotherhood",
        rating: 10,
        top: true,
        genres: ["Adventure", "Fantasy", "Action"],
        year: 2009,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1223/96541.jpg&w=300&h=450&fit=cover",
        studio: "Bones",
        status: "Finito",
        episodes: 64,
        synopsis: "Due fratelli cercano la Pietra Filosofale per recuperare i loro corpi persi in un tentativo di resurrezione.",
        structure: [{ name: "Serie", episodes: "64" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=fmab+streaming" }]
        }
    },
    {
        title: "Gurren Lagann",
        rating: 9,
        top: true,
        genres: ["Mecha", "Action", "Adventure"],
        year: 2007,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/4/5123.jpg&w=300&h=450&fit=cover",
        studio: "Gainax",
        status: "Finito",
        episodes: 27,
        synopsis: "Simon e Kamina pilotano robot giganti per combattere l'Impero Spiral e raggiungere la superficie.",
        structure: [{ name: "Serie", episodes: "27" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=gurren+lagann+streaming" }]
        }
    },
    {
        title: "HUNTER x HUNTER",
        rating: 9,
        top: true,
        genres: ["Adventure", "Action", "Fantasy"],
        year: 2011,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1337/99013.jpg&w=300&h=450&fit=cover",
        studio: "Madhouse",
        status: "Finito",
        episodes: 148,
        synopsis: "Gon Freecss vuole diventare Hunter come suo padre e trovare il mistero dietro sua madre.",
        structure: [{ name: "2011", episodes: "148" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=hunter+x+hunter+streaming" }]
        }
    },
    {
        title: "JoJo's Bizarre Adventure",
        rating: 10,
        top: true,
        genres: ["Action", "Adventure", "Supernatural"],
        year: 2012,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/10451/93275.jpg&w=300&h=450&fit=cover",
        studio: "David Production",
        status: "In corso",
        episodes: 190,
        synopsis: "Le avventure della famiglia Joestar attraverso le generazioni e i loro poteri Stand.",
        structure: [{ name: "Parti 1-6", episodes: "190+" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=jojo+streaming" }]
        }
    },
    {
        title: "NARUTO",
        rating: 10,
        top: true,
        genres: ["Action", "Adventure", "Martial Arts"],
        year: 2002,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/9/9453.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1314/108941.jpg&w=300&h=450&fit=cover",
        studio: "Gainax",
        status: "Finito",
        episodes: 26,
        synopsis: "Shinji Ikari pilota un robot biomeccanico chiamato Eva per combattere gli Angeli.",
        structure: [{ name: "Serie+Film", episodes: "27" }],
        links: {
            legal: [{ name: "Netflix", url: "https://netflix.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=evangelion+streaming" }]
        }
    },
    {
        title: "ONE PIECE",
        rating: 10,
        top: true,
        genres: ["Adventure", "Action", "Comedy"],
        year: 1999,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/6/73245.jpg&w=300&h=450&fit=cover",
        studio: "Toei",
        status: "In corso",
        episodes: 1100,
        synopsis: "Monkey D. Luffy e la sua ciurma di pirati cercano il tesoro One Piece.",
        structure: [{ name: "In corso", episodes: "1100+" }],
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/5/73199.jpg&w=300&h=450&fit=cover",
        studio: "White Fox",
        status: "Finito",
        episodes: 24,
        synopsis: "Uno scienziato scopre accidentalmente i viaggi nel tempo e le loro conseguenze catastrofiche.",
        structure: [{ name: "Serie", episodes: "24" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=steins+gate+streaming" }]
        }
    },
    {
        title: "Summer Time Rendering",
        rating: 9,
        top: true,
        genres: ["Mystery", "Thriller", "Supernatural"],
        year: 2022,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1542/125303.jpg&w=300&h=450&fit=cover",
        studio: "OLM",
        status: "Finito",
        episodes: 25,
        synopsis: "Shinpei torna al suo villaggio natale per il funerale della sua amica d'infanzia e scopre un mistero.",
        structure: [{ name: "Serie", episodes: "25" }],
        links: {
            legal: [{ name: "Disney+", url: "https://disneyplus.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=summer+time+rendering+streaming" }]
        }
    },
    {
        title: "Akira",
        rating: 9,
        top: false,
        genres: ["Sci-Fi", "Cyberpunk", "Action"],
        year: 1988,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1188/93604.jpg&w=300&h=450&fit=cover",
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
        title: "Arcane: League of Legends",
        rating: 9,
        top: false,
        genres: ["Fantasy", "Drama", "Action"],
        year: 2021,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1307/119761.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/30/75746.jpg&w=300&h=450&fit=cover",
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
        title: "Chainsaw Man",
        rating: 8,
        top: false,
        genres: ["Action", "Horror", "Supernatural"],
        year: 2022,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1806/126216.jpg&w=300&h=450&fit=cover",
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
        title: "Cowboy Bebop",
        rating: 9,
        top: false,
        genres: ["Sci-Fi", "Action", "Space Western"],
        year: 1998,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/4/19644.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1259/143225.jpg&w=300&h=450&fit=cover",
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
        title: "Demon Slayer",
        rating: 9,
        top: false,
        genres: ["Action", "Fantasy", "Historical"],
        year: 2019,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1286/99889.jpg&w=300&h=450&fit=cover",
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
        title: "Devilman Crybaby",
        rating: 8,
        top: false,
        genres: ["Horror", "Action", "Supernatural"],
        year: 2018,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1389/93828.jpg&w=300&h=450&fit=cover",
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
        title: "Dragon Ball",
        rating: 9,
        top: false,
        genres: ["Action", "Adventure", "Martial Arts"],
        year: 1986,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1055/120643.jpg&w=300&h=450&fit=cover",
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
        title: "Frieren",
        rating: 7,
        top: false,
        genres: ["Adventure", "Fantasy", "Drama"],
        year: 2023,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1015/138006.jpg&w=300&h=450&fit=cover",
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
        title: "Ghost in the Shell",
        rating: 9,
        top: false,
        genres: ["Sci-Fi", "Cyberpunk", "Action"],
        year: 1995,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/4/1992.jpg&w=300&h=450&fit=cover",
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
        title: "Hellsing Ultimate",
        rating: 9,
        top: false,
        genres: ["Horror", "Action", "Vampire"],
        year: 2006,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/6/7331.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1171/109222.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1865/141473.jpg&w=300&h=450&fit=cover",
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
        title: "Made in Abyss",
        rating: 9,
        top: false,
        genres: ["Adventure", "Fantasy", "Dark Fantasy"],
        year: 2017,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/6/86733.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/8/80356.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/10/18793.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/10/78745.jpg&w=300&h=450&fit=cover",
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
        title: "One-Punch Man",
        rating: 9,
        top: false,
        genres: ["Action", "Comedy", "Superhero"],
        year: 2015,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/12/76049.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/7/67503.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/3/73178.jpg&w=300&h=450&fit=cover",
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
        title: "Re:ZERO -Starting Life in Another World-",
        rating: 8,
        top: false,
        genres: ["Fantasy", "Thriller", "Isekai"],
        year: 2016,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/6/80756.jpg&w=300&h=450&fit=cover",
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
        title: "Samurai Champloo",
        rating: 9,
        top: false,
        genres: ["Action", "Historical", "Hip Hop"],
        year: 2004,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1375/121599.jpg&w=300&h=450&fit=cover",
        studio: "Manglobe",
        status: "Finito",
        episodes: 26,
        synopsis: "Due samurai e una ragazza viaggiano per il Giappone in cerca di un samurai che sape di girasoli.",
        structure: [{ name: "Serie", episodes: "26" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=samurai+champloo+streaming" }]
        }
    },
    {
        title: "Solo Leveling",
        rating: 9,
        top: false,
        genres: ["Action", "Fantasy", "Adventure"],
        year: 2024,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1426/138825.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1441/122795.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/11/39517.jpg&w=300&h=450&fit=cover",
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
        title: "The Promised Neverland",
        rating: 8,
        top: false,
        genres: ["Thriller", "Horror", "Mystery"],
        year: 2019,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1830/118780.jpg&w=300&h=450&fit=cover",
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
        title: "Trigun",
        rating: 8,
        top: false,
        genres: ["Action", "Sci-Fi", "Western"],
        year: 1998,
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/7/20310.jpg&w=300&h=450&fit=cover",
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
        img: "https://wsrv.nl/?url=https://cdn.myanimelist.net/images/anime/1500/103005.jpg&w=300&h=450&fit=cover",
        studio: "Wit Studio",
        status: "Finito",
        episodes: 48,
        synopsis: "Thorfinn cerca vendetta per la morte del padre in un'epopea vichinga.",
        structure: [{ name: "Totale", episodes: "48" }],
        links: {
            legal: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
            illegal: [{ name: "Cerca", url: "https://google.com/search?q=vinland+saga+streaming" }]
        }
    }
];
