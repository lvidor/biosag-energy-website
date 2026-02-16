const { createClient } = require('@sanity/client');

const token = process.env.SANITY_TOKEN;

if (!token) {
    console.error('❌ GREŠKA: SANITY_TOKEN nije postavljen!');
    console.log('Pokrenite: SANITY_TOKEN=vaš_token node import-features.js');
    process.exit(1);
}

const client = createClient({
    projectId: 'beba1xg7',
    dataset: 'production',
    apiVersion: '2024-02-09',
    token: token.trim().replace(/\s/g, ''),
    useCdn: false,
});

const features = [
    {
        _type: 'feature',
        title: 'Loxone Smart Home Sistemi',
        description: 'Kompletna automatizacija vašeg doma - rasveta, grejanje, roletne, multiroom audio, i još mnogo toga. Loxone Silver Partner sa sertifikovanim stručnjacima.',
        icon: 'Home',
    },
    {
        _type: 'feature',
        title: 'Električne Instalacije',
        description: 'Profesionalne električne instalacije za nove objekte i renoviranje postojećih. Licencirani električari sa dugogodišnjim iskustvom.',
        icon: 'Zap',
    },
    {
        _type: 'feature',
        title: 'Sigurnost i Kontrola Pristupa',
        description: 'Napredna rešenja za video nadzor, alarmne sisteme, kontrolu pristupa i integraciju sa Loxone sistemom.',
        icon: 'Shield',
    },
    {
        _type: 'feature',
        title: 'Solarne Elektrane',
        description: 'Projektovanje i instalacija solarnih elektrana za domaćinstva. Integracija sa Loxone sistemom za optimalno upravljanje energijom.',
        icon: 'Sun',
    },
    {
        _type: 'feature',
        title: 'Servis i Podrška',
        description: 'Dugotrajni servis, održavanje i tehnička podrška za sve instalirane sisteme. Brza reakcija i stručna pomoć.',
        icon: 'Wrench',
    },
    {
        _type: 'feature',
        title: 'Konsultacije i Projektovanje',
        description: 'Besplatne konsultacije, izrada projekata i 3D vizualizacije. Pomoć u odabiru optimalnog rešenja za vaše potrebe.',
        icon: 'Lightbulb',
    },
];

async function importFeatures() {
    try {
        console.log('🚀 Importujem Features (Usluge)...\n');

        let imported = 0;
        let failed = 0;

        for (let i = 0; i < features.length; i++) {
            const feature = features[i];

            try {
                await client.create(feature);
                imported++;
                console.log(`✓ [${i + 1}/${features.length}] ${feature.title}`);
            } catch (err) {
                failed++;
                console.error(`✗ [${i + 1}/${features.length}] Greška: ${err.message}`);
            }

            await new Promise(resolve => setTimeout(resolve, 200));
        }

        console.log(`\n🎉 Import završen!`);
        console.log(`   ✅ Uspešno: ${imported}`);
        console.log(`   ❌ Neuspešno: ${failed}`);

        if (imported > 0) {
            console.log(`\n✅ Osvežite http://localhost:3000 da vidite sve usluge!`);
            console.log(`✅ Proverite Studio: http://localhost:3000/studio`);
        }

    } catch (err) {
        console.error('❌ Kritična greška:', err.message);
    }
}

importFeatures();
