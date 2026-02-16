const { createClient } = require('@sanity/client');

const token = process.env.SANITY_TOKEN;

if (!token) {
    console.error('❌ GREŠKA: SANITY_TOKEN nije postavljen!');
    process.exit(1);
}

const client = createClient({
    projectId: 'beba1xg7',
    dataset: 'production',
    apiVersion: '2024-02-09',
    token: token.trim().replace(/\s/g, ''),
    useCdn: false,
});

async function importAllContent() {
    console.log('🚀 Importujem SVE podatke u Sanity...\n');

    try {
        // 1. About sekcija
        console.log('📝 1/2: Kreiram About sekciju...');
        await client.createIfNotExists({
            _id: 'about',
            _type: 'about',
            title: 'O nama',
            subtitle: 'Vaš partner za pametnu automatizaciju',
            description: [
                {
                    _type: 'block',
                    _key: 'block1',
                    children: [{
                        _type: 'span',
                        _key: 'span1',
                        text: 'Biosag Energy DOO je vodeća kompanija u oblasti automatizacije kuća i zgrada u Srbiji. Osnovani 2016. godine, specijalizovali smo se za profesionalnu instalaciju i održavanje Loxone sistema - najnaprednijeg rešenja za pametne domove na tržištu.',
                        marks: []
                    }],
                    markDefs: [],
                    style: 'normal'
                },
                {
                    _type: 'block',
                    _key: 'block2',
                    children: [{
                        _type: 'span',
                        _key: 'span2',
                        text: 'Naš tim stručnjaka pruža kompletna rešenja - od planiranja i projektovanja, preko instalacije, do konfiguracije i dugotrajne podrške. Bilo da želite da poboljšate energetsku efikasnost, povećate udobnost ili sigurnost vašeg doma ili poslovnog prostora, mi smo tu da vam pomognemo.',
                        marks: []
                    }],
                    markDefs: [],
                    style: 'normal'
                },
                {
                    _type: 'block',
                    _key: 'block3',
                    children: [{
                        _type: 'span',
                        _key: 'span3',
                        text: 'Kao Loxone Silver Partner, garantujemo najviši nivo stručnosti i kvaliteta usluge. Vaš dom može raditi za vas - dozvolite nam da vam pokažemo kako.',
                        marks: []
                    }],
                    markDefs: [],
                    style: 'normal'
                }
            ],
            yearFounded: 2016,
            stats: [
                { _key: 'stat1', number: '2016', label: 'Godina osnivanja' },
                { _key: 'stat2', number: '100+', label: 'Realizovanih projekata' },
                { _key: 'stat3', number: 'Loxone', label: 'Silver Partner' }
            ]
        });
        console.log('   ✅ About sekcija kreirana\n');

        // 2. Site Settings
        console.log('⚙️  2/2: Kreiram Site Settings...');
        await client.createIfNotExists({
            _id: 'siteSettings',
            _type: 'siteSettings',
            siteName: 'Biosag Energy',
            siteDescription: 'Loxone pametne kuće, automatizacija, solarne elektrane - Vaš partner za pametnu automatizaciju u Srbiji',
            contactEmail: 'vidor.lakatos@biosag-energy.rs',
            contactPhone: '+381 63 543 3310',
            address: 'Glavna 15, 21220 Bečej, Srbija'
        });
        console.log('   ✅ Site Settings kreirani\n');

        console.log('🎉 SVE USPEŠNO KREIRANO!\n');
        console.log('📊 Provera:');

        const faqCount = await client.fetch(`count(*[_type == "faq"])`);
        const featureCount = await client.fetch(`count(*[_type == "feature"])`);
        const aboutExists = await client.fetch(`*[_id == "about"][0]`);
        const settingsExists = await client.fetch(`*[_id == "siteSettings"][0]`);

        console.log(`   - FAQ pitanja: ${faqCount}`);
        console.log(`   - Features (Usluge): ${featureCount}`);
        console.log(`   - About sekcija: ${aboutExists ? '✓' : '✗'}`);
        console.log(`   - Site Settings: ${settingsExists ? '✓' : '✗'}`);

        console.log('\n✅ Sajt je potpuno popunjen! Osvežite http://localhost:3000');
        console.log('✅ Proverite Studio: http://localhost:3000/studio');

    } catch (err) {
        console.error('❌ Greška:', err.message);
    }
}

importAllContent();
