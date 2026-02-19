const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'beba1xg7',
    dataset: 'production',
    apiVersion: '2024-02-09',
    token: 'skMrsm1t7gUswn0dqbFXHBGIvfZZFlKQ3scF4GLutWnySWeXmyXUDy19AlZaHlmD7hXShpW3hVIjw01rkhko8oFVe4ZivkLNAFwCTazSOZ1nJD7HTlKfFFDZ85EO9Df3VqTbXpF5Gph1J4fozRwqA0nQ4rFUYybAlpVJsY2xfIfJyGEXjE6W',
    useCdn: false
});

const remainingFeaturesTranslations = [
    {
        titleSr: 'Solarne Elektrane',
        titleHu: 'Napelemes Rendszerek',
        descriptionSr: 'Projektovanje i instalacija solarnih elektrana za domaćinstva. Integracija sa Loxone sistemom za optimalno upravljanje energijom.',
        descriptionHu: 'Napelemes rendszerek tervezése és telepítése otthonokhoz. Integráció a Loxone rendszerrel az optimális energiagazdálkodás érdekében.'
    },
    {
        titleSr: 'Sigurnost i Kontrola Pristupa',
        titleHu: 'Biztonság és Beléptető Rendszerek',
        descriptionSr: 'Napredna rešenja za video nadzor, alarmne sisteme, kontrolu pristupa i integraciju sa Loxone sistemom.',
        descriptionHu: 'Fejlett megoldások videófelügyelethez, riasztórendszerekhez, beléptetéshez és integrációhoz a Loxone rendszerrel.'
    },
    {
        titleSr: 'Servis i Podrška',
        titleHu: 'Szerviz és Támogatás',
        descriptionSr: 'Dugotrajni servis, održavanje i tehnička podrška za sve instalirane sisteme. Brza reakcija i stručna pomoć.',
        descriptionHu: 'Hosszú távú szerviz, karbantartás és műszaki támogatás minden telepített rendszerhez. Gyors reagálás és szakértői segítség.'
    }
];

async function updateRemainingFeatures() {
    try {
        // Fetch all features
        const features = await client.fetch('*[_type == "feature"] | order(order asc)');

        console.log(`Found ${features.length} features total`);

        // Update features 4, 5, 6 (index 3, 4, 5)
        for (let i = 3; i < 6 && i < features.length; i++) {
            const feature = features[i];
            const translation = remainingFeaturesTranslations[i - 3];

            console.log(`\nUpdating feature ${i + 1}: ${feature.title}`);
            console.log(`Adding Hungarian title: ${translation.titleHu}`);

            await client
                .patch(feature._id)
                .set({
                    titleHu: translation.titleHu,
                    descriptionHu: translation.descriptionHu
                })
                .commit();

            console.log(`✅ Updated ${feature._id}`);
        }

        console.log('\n✅ All remaining features updated successfully!');
    } catch (error) {
        console.error('Error updating features:', error);
    }
}

updateRemainingFeatures();
