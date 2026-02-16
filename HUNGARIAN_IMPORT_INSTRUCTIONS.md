# Adding Hungarian Translations to Sanity

## Quick Setup

To add the Hungarian translations to your Sanity CMS, you need a Sanity API token with write permissions.

### Option 1: Get Token from Sanity Studio (Recommended)

1. Go to https://www.sanity.io/manage
2. Select your project: **beba1xg7**
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Name it: `Hungarian Translation Import`
6. Permissions: **Editor** (or **Admin**)
7. Copy the token

### Option 2: Use Sanity CLI

```bash
cd "/Users/vidor/Documents/Antigravity/Biosag Energy www rs"
npx -y sanity@latest debug --secrets
```

This will show your project details and help you create a token.

## Add Token to .env.local

Once you have the token, add it to your `.env.local` file:

```bash
echo 'SANITY_API_TOKEN=your_token_here' >> .env.local
```

Replace `your_token_here` with the actual token.

## Run the Import Script

```bash
node add-hungarian-translations.js
```

This will:
- ✅ Add Hungarian Hero translations (titleHu, subtitleHu, ctaHu)
- ✅ Add Hungarian Features translations (titleHu, descriptionHu for each feature)
- ✅ Add Hungarian FAQ translations (questionHu, answerHu, categoryHu for each FAQ)

## Verify

After running the script, visit:
- http://localhost:3000/hu - Should show all Hungarian content!
- http://localhost:3000/sr - Should show all Serbian content!

---

## Alternative: Manual Entry in Sanity Studio

If you prefer, you can add the translations manually:

1. Open Sanity Studio: http://localhost:3333 (or your studio URL)
2. For each document type (Hero, Features, FAQs), add the Hungarian fields as shown in the script

The script contains all the translations you need!
