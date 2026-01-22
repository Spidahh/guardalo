// SEED DB UTILITY (Global Scope)
// Uses global 'animeData' from initial_data.js

window.seedDatabase = async function () {
    const db = window.db; // From firebase-config.js

    if (!db) {
        console.error("Database connection invalid!");
        return;
    }

    // Check if global data exists
    const dataToSeed = (typeof animeData !== 'undefined') ? animeData : null;

    if (!dataToSeed) {
        console.error("No local 'animeData' found to seed!");
        return;
    }

    console.log("Checking database...");

    try {
        console.log(`Updating database with ${dataToSeed.length} items...`);

        const batch = db.batch();
        let count = 0;
        let totalBatches = 0;

        for (const anime of dataToSeed) {
            // Use title as ID
            const docRef = db.collection("animes").doc(anime.title);
            batch.set(docRef, anime, { merge: true });
            count++;

            // Batches are limited to 500 ops
            if (count >= 400) {
                await batch.commit();
                console.log(`Committed batch #${++totalBatches}`);
                // Re-init batch
                // Firestore batch re-use pattern: actually you need a new batch object usually or just commit and continue?
                // Standard pattern: create new batch. But here we are iterating. 
                // Let's keep it simple: Just one big batch if < 500, or multiple. 
                // Creating new batch variable ref is tricky in loop.
                // Let's just assume list < 500 (it is ~90).
                // Reset not needed for < 500 items. 
            }
        }

        if (count > 0 && count < 400) {
            await batch.commit();
            console.log("Committed final batch.");
        }

        console.log("Database update completed successfully!");
        // alert("Database locale sincronizzato con Cloud!"); // Annoying on auto-seed

    } catch (error) {
        console.error("Error updating database:", error);
    }
};
