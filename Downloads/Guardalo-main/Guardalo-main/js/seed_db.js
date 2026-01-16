
import { initialAnimeData } from './initial_data.js';

export async function seedDatabase(db) {
    if (!db) {
        console.error("Database connection invalid!");
        return;
    }

    console.log("Checking database...");


    try {
        console.log("Updating database with latest data...");
        // REMOVED CHECK: const snapshot = await db.collection("animes").limit(1).get();
        // We want to overwrite/update the data now.

        const batch = db.batch();
        let count = 0;

        for (const anime of initialAnimeData) {
            // Use title as ID. Using merge: true updates fields without destroying other custom fields (if any)
            const docRef = db.collection("animes").doc(anime.title);
            batch.set(docRef, anime, { merge: true });
            count++;

            // Batches are limited to 500 ops
            if (count >= 400) {
                await batch.commit();
                console.log(`Committed batch of ${count} animes.`);
                count = 0;
            }
        }

        if (count > 0) {
            await batch.commit();
            console.log(`Committed final batch of ${count} animes.`);
        }

        console.log("Database update completed successfully!");
        alert("Database aggiornato con successo! Ricarica la pagina.");

    } catch (error) {
        console.error("Error updating database:", error);
    }
}
