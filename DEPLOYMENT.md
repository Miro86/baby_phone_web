# Deploying Mini Dodo to GitHub Pages

This project publishes from the `main` branch using GitHub Actions. Until the custom domain is activated, the workflow uses `https://miro86.github.io/baby_phone_web/`. Repository variables switch the production build to `https://minidodoapps.de` when its DNS is ready.

## 1. Check the project locally

From the project directory, run:

```sh
npm install
npm run build
```

The build must finish without errors. The generated `dist/` directory is intentionally ignored because GitHub Actions builds it during deployment.

## 2. Prepare the GitHub repository

The configured remote repository is:

```text
git@github.com:Miro86/baby_phone_web.git
```

On GitHub, make sure `Miro86/baby_phone_web` exists. If it does not, click **New repository**, use `baby_phone_web` as the name, choose **Public**, and create it without adding a README, `.gitignore`, or license because those files are already present locally. With a free GitHub account, the repository must be public to use GitHub Pages.

In the repository, open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.

## 3. Commit and publish the website

Run:

```sh
git add .
git commit -m "Prepare website for GitHub Pages"
git push -u origin main
```

Open the repository's **Actions** tab and select **Deploy to GitHub Pages**. Wait for both the `build` and `deploy` jobs to finish successfully. Every later push to `main` will redeploy the website automatically.

The initial deployment should be available at:

```text
https://miro86.github.io/baby_phone_web/
```

## 4. Verify the custom domain with GitHub

Domain verification protects the domain from being claimed by another GitHub account.

1. On GitHub, click the profile picture and open **Settings**.
2. In the account sidebar, open **Pages**.
3. Click **Add a domain**, enter `minidodoapps.de`, and click **Add domain**.
4. GitHub will display a TXT record name and a unique TXT value. Keep this page open.
5. In Namecheap, open **Domain List → Manage** beside `minidodoapps.de` → **Advanced DNS**.
6. Under **Host Records**, add a **TXT Record** using the host and value GitHub supplied. In Namecheap's **Host** field, enter only the host portion, normally `_github-pages-challenge-Miro86`, rather than the complete domain.
7. Save the record, wait for DNS propagation, return to GitHub, and click **Verify**.
8. Keep this TXT record permanently.

If the repository belongs to a GitHub organization instead of the `Miro86` personal account, perform domain verification from the organization's **Settings → Pages** screen and use the TXT record GitHub supplies there.

## 5. Add the domain to the repository

Before pointing the public DNS records to GitHub:

1. Open `Miro86/baby_phone_web` on GitHub.
2. Go to **Settings → Secrets and variables → Actions → Variables**.
3. Create a repository variable named `SITE_URL` with the value `https://minidodoapps.de`.
4. Create a repository variable named `BASE_PATH` with the value `/`.
5. Go to **Settings → Pages**.
6. In **Custom domain**, enter `minidodoapps.de` without `https://` or a trailing slash.
7. Click **Save**.
8. Open **Actions → Deploy to GitHub Pages** and run the workflow again so Astro rebuilds all asset, navigation, canonical, sitemap, and social-sharing URLs for the custom-domain root.

The source repository includes `public/CNAME` for Astro's build output, but the repository's Pages setting remains the authoritative custom-domain configuration.

## 6. Configure Namecheap DNS

These instructions assume the domain uses Namecheap BasicDNS, PremiumDNS, or FreeDNS. If **Advanced DNS → Host Records** cannot be edited, the domain uses other nameservers; add the same records at the active DNS provider instead.

In Namecheap, open **Domain List → Manage → Advanced DNS → Host Records**. Remove only conflicting parking, URL Redirect, A, AAAA, ALIAS, or CNAME records for hosts `@` and `www`. Do not remove email-related MX or TXT records.

Add these records and leave TTL set to **Automatic**:

| Type | Host | Value |
| --- | --- | --- |
| A Record | `@` | `185.199.108.153` |
| A Record | `@` | `185.199.109.153` |
| A Record | `@` | `185.199.110.153` |
| A Record | `@` | `185.199.111.153` |
| CNAME Record | `www` | `miro86.github.io` |

Do not add a wildcard `*` record. The `www` CNAME must point directly to `miro86.github.io`, without `/baby_phone_web` and without `https://`.

Save all changes. DNS commonly updates within 30 minutes but can take up to 24 hours.

## 7. Confirm DNS and enable HTTPS

On macOS or Linux, check the records with:

```sh
dig minidodoapps.de +noall +answer -t A
dig www.minidodoapps.de +noall +answer
```

The first command should show the four GitHub Pages IP addresses. The second should show `www.minidodoapps.de` pointing to `miro86.github.io`.

Return to **Repository Settings → Pages**. Wait until GitHub reports that the DNS check is successful and finishes issuing the TLS certificate. Then select **Enforce HTTPS**. Certificate provisioning can take additional time after DNS is correct.

Finally, test both addresses:

- `https://minidodoapps.de`
- `https://www.minidodoapps.de`

Because the apex domain is configured as the primary custom domain, GitHub Pages should redirect `www` to `https://minidodoapps.de`.

## Updating the live website

After changing the website, run the local build and push the commit:

```sh
npm run build
git add .
git commit -m "Update website"
git push
```

The GitHub Actions workflow will rebuild and deploy the new version automatically.
