const { createClient } = require('@sanity/client');
const fs = require('fs');

// NAPOMENA: Ovaj script koristi token sa WRITE permisijama
// Token možete kreirati na: https://www.sanity.io/manage/personal/tokens

const client = createClient({
    projectId: 'beba1xg7',
    dataset: 'production',
    apiVersion: '2024-02-09',
    useCdn: false,
    token: (process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN || '').trim().replace(/\s/g, ''), // Koristi bilo koji dostupan token
});

async function importAllFaqs() {
    try {
        console.log('📖 Učitavam FAQ pitanja iz faqs.ndjson...');
        const ndjson = fs.readFileSync('faqs.ndjson', 'utf8');
        const lines = ndjson.split('\n').filter(line => line.trim());

        console.log(`✅ Pronađeno ${lines.length} FAQ pitanja za import.\n`);

        // Prvo proveravamo koliko već postoji
        const existing = await client.fetch(`count(*[_type == "faq"])`);
        console.log(`📊 Trenutno u bazi: ${existing} FAQ pitanja\n`);

        if (existing >= 26) {
            console.log('⚠️  Već imate 26+ pitanja. Preskačem import.');
            return;
        }

        console.log('🚀 Počinjem import...\n');

        let imported = 0;
        let failed = 0;

        // Importujemo jedno po jedno da vidimo progres
        for (let i = 0; i < lines.length; i++) {
            const doc = JSON.parse(lines[i]);
            delete doc._id; // Sanity će generisati novi ID

            try {
                await client.create(doc);
                imported++;
                console.log(`✓ [${i + 1}/${lines.length}] ${doc.question.substring(0, 50)}...`);
            } catch (err) {
                failed++;
                console.error(`✗ [${i + 1}/${lines.length}] Greška: ${err.message}`);
            }
        }

        console.log(`\n🎉 Import završen!`);
        console.log(`   ✅ Uspešno: ${imported}`);
        console.log(`   ❌ Neuspešno: ${failed}`);

        // Finalna provera
        const final = await client.fetch(`count(*[_type == "faq"])`);
        console.log(`\n📊 Ukupno u bazi: ${final} FAQ pitanja`);

    } catch (err) {
        console.error('❌ Kritična greška:', err.message);

        if (err.message.includes('Insufficient permissions')) {
            console.log('\n💡 REŠENJE:');
            console.log('1. Idite na: https://www.sanity.io/manage/personal/tokens');
            console.log('2. Kliknite "Add API token"');
            console.log('3. Ime: "FAQ Import Token"');
            console.log('4. Permissions: "Editor" ili "Administrator"');
            console.log('5. Kopirajte token');
            console.log('6. Pokrenite: SANITY_WRITE_TOKEN=vaš_token npx sanity exec import-faqs-with-token.js');
        }
    }
}

importAllFaqs();
