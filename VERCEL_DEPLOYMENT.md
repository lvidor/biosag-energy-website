# Biosag Energy - Deployment Guide

## Environment Variables for Vercel

When deploying to Vercel, you need to add these environment variables in the Vercel dashboard:

### Required Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=beba1xg7
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-09
```

### Optional (for preview/draft mode)
```
SANITY_API_TOKEN=your_token_here
```

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add the variables listed above

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get your deployment URL

5. **Configure Custom Domain**
   - In Vercel dashboard, go to Settings → Domains
   - Add `biosag-energy.rs`
   - Vercel will provide DNS records

6. **Update DNS on Loopia**
   - Add A record: `@` → Vercel IP (provided by Vercel)
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Remove Canva DNS records

## Post-Deployment

- Test site at Vercel preview URL
- Verify both locales work (/ and /hu)
- Test contact form
- After DNS propagation, test at biosag-energy.rs
