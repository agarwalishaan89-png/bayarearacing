# Bay Area Racing — Website

React + Vite + Tailwind CSS + Lucide icons. This version has everything up to date:
real sponsors, real team members, and a fixed photo-placeholder sizing bug.

## Editing text or data

Every section's content lives directly inside its own file in `src/components/`.
Open the file for the section you want to change, edit the relevant array or text,
save. No need to touch anything else.

| To change... | Edit this file |
|---|---|
| Headline, stats | `Hero.jsx` |
| About text, build stats | `About.jsx` |
| Team members, bios | `Team.jsx` (the `TEAM` array near the top) |
| Sponsors, tiers | `Sponsors.jsx` (the `TIERS` array near the top) |
| Gallery photos | `Media.jsx` |
| Donation text, FAQ | `DonateFAQ.jsx` |
| Nav links, footer | `Nav.jsx`, `Footer.jsx` |

## Adding photos

Drop a file with the **exact name** below into `public/images/` and it appears
automatically — no code changes needed. Until a real file exists, a placeholder
shows telling you exactly what's expected there.

| File | Used for |
|---|---|
| `logo.png` | Nav bar + favicon |
| `hero-track.jpg` | Hero background |
| `about-build.jpg` | About section photo |
| `team-1.jpg` … `team-8.jpg` | Team headshots (add more `team-N.jpg` + entries in `Team.jsx` for more members) |
| `sponsor-altair.png`, `sponsor-rapid-harness.png`, `sponsor-qa-source.png`, `sponsor-gene-haas.png`, `sponsor-coastline.png`, `sponsor-formlabs.png`, `sponsor-bystronic.png`, `sponsor-bay-area-composites.png`, `sponsor-las-positas.png`, `sponsor-hakko.png`, `sponsor-wilwood.png` | Sponsor logos |
| `track-1.jpg` … `track-6.jpg` | Media gallery |

---

## Starting fresh: local setup + GitHub + Vercel

### 1. Install Node.js (skip if already installed)
Check with `node -v` in Terminal. If that fails, install the **LTS** version from
[nodejs.org](https://nodejs.org), then reopen Terminal.

### 2. Preview locally (optional but recommended)
```bash
cd bay-area-racing
npm install
npm run dev
```
Open the printed URL (usually http://localhost:5173). `Ctrl+C` to stop.

### 3. Create a fresh GitHub repo
If you have an old repo from a previous attempt, delete it first: on github.com, open
the old repo → **Settings** → scroll to the bottom → **Delete this repository**.

Then, using **GitHub Desktop** (recommended — avoids Terminal entirely):
1. **File → Add Local Repository** → choose this `bay-area-racing` folder
2. It'll say this isn't a git repository yet → click **create a repository**
3. Type a commit summary like `Initial site`, click **Commit to main**
4. Click **Publish repository** (top toolbar), give it a name, click **Publish**

### 4. Delete the old Vercel project (if any) and import fresh
On [vercel.com](https://vercel.com), open your old project → **Settings** → scroll down
→ **Delete Project**.

Then:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Find your repo under "Import Git Repository" → **Import**
3. Framework auto-detects as **Vite** — leave the defaults
4. Click **Deploy**

You'll get a fresh live URL, connected cleanly to this repo.

---

## Making edits going forward

**For small text tweaks:** GitHub's web editor is fine — open the file, click the
pencil icon, edit, commit.

**For anything bigger (swapping a whole file, adding several team members at once):**
editing locally is much safer than pasting into the browser:
1. Edit the file in Finder / a code editor (or ask Claude to generate the updated file
   for you to download)
2. Drag it into your local `bay-area-racing` folder, replacing the old one
3. Open GitHub Desktop — it'll show the change — commit and **Push origin**

This avoids the browser-paste truncation issues that caused problems before.
