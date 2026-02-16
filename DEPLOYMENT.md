# Biosag Energy Website - Deployment Checklist

## 🎯 Pre-Deployment Checklist

### Environment Variables
- [ ] Add `RESEND_API_KEY` to hosting environment
- [ ] Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- [ ] Verify `NEXT_PUBLIC_SANITY_DATASET` is set

### Content
- [ ] Add FAQ entries in Sanity Studio (26 questions ready in `faq_content.md`)
- [ ] Add project examples with images/videos
- [ ] Verify all contact information is correct
- [ ] Test contact form email delivery

### SEO
- [ ] Verify OG image exists at `/public/og-image.jpg` ✅
- [ ] Update Google verification code in `layout.tsx` (after Search Console setup)
- [ ] Update social media links in structured data
- [ ] Test meta tags with https://metatags.io

### Performance
- [ ] Run `npm run build` to check for errors
- [ ] Test on mobile devices
- [ ] Check page load speed
- [ ] Optimize images if needed

### Security
- [ ] Add `.env.local` to `.gitignore` ✅
- [ ] Never commit API keys to git
- [ ] Review CORS settings for API routes

---

## 🚀 Deployment to Loopia

### Option 1: Static Export (Recommended for Loopia)

1. **Build static site:**
   ```bash
   npm run build
   ```

2. **Export static files:**
   Add to `next.config.js`:
   ```js
   module.exports = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   ```
   Then run: `npm run build`

3. **Upload to Loopia:**
   - Upload contents of `out/` folder to public_html
   - Via FTP or Loopia File Manager

**Note:** Static export doesn't support API routes. You'll need to:
- Use Resend directly from client (not recommended for security)
- OR use a serverless function service (Vercel, Netlify)
- OR keep contact form as mailto: link

### Option 2: Vercel (Easiest, Free Tier Available)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Import GitHub repository
   - Add environment variables
   - Deploy!

3. **Custom Domain:**
   - Add biosag-energy.rs in Vercel settings
   - Update DNS at Loopia:
     - A record: 76.76.21.21
     - CNAME www: cname.vercel-dns.com

### Option 3: Docker + VPS

If Loopia supports Docker:

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and deploy:**
   ```bash
   docker build -t biosag-energy .
   docker run -p 3000:3000 biosag-energy
   ```

---

## 📊 Post-Deployment Tasks

### Google Services
1. **Google Search Console:**
   - Add property
   - Verify ownership
   - Submit sitemap: https://biosag-energy.rs/sitemap.xml

2. **Google Analytics:**
   - Create GA4 property
   - Add tracking code to layout.tsx

3. **Google My Business:**
   - Create/claim business listing
   - Add photos, hours, services
   - Link to website

### Social Media
1. **Facebook Page:**
   - Create business page
   - Add website link
   - Test Open Graph preview

2. **Instagram:**
   - Business account
   - Link in bio

### Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, free)
- [ ] Monitor email delivery in Resend dashboard
- [ ] Check Google Search Console weekly

### Backup
- [ ] Backup Sanity data regularly
- [ ] Keep git repository updated
- [ ] Document any custom configurations

---

## 🔧 Troubleshooting

### Contact Form Not Working
- Check RESEND_API_KEY is set
- Verify API route is accessible
- Check browser console for errors
- Test with Resend dashboard

### Images Not Loading
- Verify Sanity images are published
- Check CORS settings
- Ensure image URLs are correct

### SEO Issues
- Run site through https://search.google.com/test/rich-results
- Validate structured data
- Check robots.txt is accessible

---

## 📞 Support

**Loopia Support:** https://www.loopia.rs/podrska/
**Vercel Docs:** https://vercel.com/docs
**Next.js Docs:** https://nextjs.org/docs

---

## ✅ Final Checks Before Going Live

- [ ] All content is in Serbian
- [ ] Contact information is correct
- [ ] Email notifications work
- [ ] Mobile responsive
- [ ] Fast page load
- [ ] No console errors
- [ ] SEO tags verified
- [ ] Analytics installed
- [ ] Backup created

**Ready to launch!** 🚀
