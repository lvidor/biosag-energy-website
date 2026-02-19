const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'beba1xg7',
    dataset: 'production',
    apiVersion: '2024-02-09',
    token: 'skMrsm1t7gUswn0dqbFXHBGIvfZZFlKQ3scF4GLutWnySWeXmyXUDy19AlZaHlmD7hXShpW3hVIjw01rkhko8oFVe4ZivkLNAFwCTazSOZ1nJD7HTlKfFFDZ85EO9Df3VqTbXpF5Gph1J4fozRwqA0nQ4rFUYybAlpVJsY2xfIfJyGEXjE6W',
    useCdn: false
});

const featuresTranslations = [
    {
        titleSr: 'Loxone Smart Home Sistemi',
        titleHu: 'Loxone Smart Home Rendszer',
        descriptionSr: 'Kompletna automatizacija vašeg doma - rasveta, grejanje, roletne, multiroom audio, i još mnogo toga. Loxone Silver Partner sa sertifikovanim stručnjacima.',
        descriptionHu: 'Komplett automatizálás az otthonában - világítás, fűtés, redőnyök, multiroom audio és még sok más. Loxone Silver Partner tanúsított szakemberekkel.'
    },
    {
        titleSr: 'Konsultacije i Projektovanje',
        titleHu: 'Konzultáció és Tervezés',
        descriptionSr: 'Besplatne konsultacije, izrada projekata i 3D vizualizacije. Pomoć u odabiru optimalnog rešenja za vaše potrebe.',
        descriptionHu: 'Ingyenes konzultáció, projekttervezés és 3D vizualizáció. Segítség az optimális megoldás kiválasztásában az Ön igényei szerint.'
    },
    {
        titleSr: 'Električne Instalacije',
        titleHu: 'Elektromos Telepítések',
        descriptionSr: 'Profesionalne električne instalacije za nove objekte i renoviranje postojećih. Licencirani električari sa dugogodišnjim iskustvom.',
        descriptionHu: 'Professzionális elektromos telepítések új épületekhez és meglévő ingatlanok felújításához. Engedéllyel rendelkező villanyszerelők hosszú évek tapasztalatával.'
    }
];

async function updateFeatures() {
    try {
        // Fetch all features
        const features = await client.fetch('*[_type == "feature"] | order(order asc)');

        console.log(`Found ${features.length} features`);

        for (let i = 0; i < features.length && i < featuresTranslations.length; i++) {
            const feature = features[i];
            const translation = featuresTranslations[i];

            console.log(`\nUpdating feature: ${feature.title}`);
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

        console.log('\n✅ All features updated successfully!');
    } catch (error) {
        console.error('Error updating features:', error);
    }
}

updateFeatures();
