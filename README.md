# Charlie's Birthday — how to edit & publish

All the text lives in **content.js**. You don't need to touch index.html, style.css or script.js.

```
charlie-birthday/
├── index.html
├── style.css
├── script.js
└── content.js          ← edit everything here
```

To preview, double-click `index.html`. It opens in your browser, no internet needed except for the fonts.

The page runs in this order: envelope → letter → A Little Museum of Us → Our Playlist → final message.

## The letter
It's in `content.js` under `letter.body`, between the two backticks. Leave **one empty line between paragraphs**. Don't type a backtick ( ` ) inside the text.

## A Little Museum of Us
Every word of the four exhibits (number, title, "medium" line and description) is in `content.js` under `museum`. The drawings themselves (candles, calendar, chess king, ticket) are fixed.
Interactions: tapping the candles lights them, and tapping the king tips it over.

## Playlist
The five songs are in `playlist.songs`. Each song's button opens a Spotify search for that song, so it already works.
To link straight to the track, open the song in Spotify, tap **⋯ → Share → Copy Song Link** and paste it between the quotes of `spotify: ""`.
A song with a link also gets the official Spotify player on the page. It plays a 30-second preview for people who aren't logged in and the full song for people who are. The first song with a link (Lejos de Ti) is ready to play as soon as the page opens. The player needs the site to be online (Netlify), and it doesn't show in the claude.ai preview.
`fullPlaylistLink` (optional) adds an "Open the whole playlist" button.
Tapping a song in the list puts it "on the turntable": the record spins and its label shows the song name.

## Publishing (getting a link to send Charlie)
**Easiest — Netlify Drop (free, about 1 minute):**
1. Go to https://app.netlify.com/drop
2. Drag the whole `charlie-birthday` folder onto the page.
3. You get a link like `https://something-random.netlify.app`. Sign up (free) to keep it and rename it, for example `happy-birthday-charlie.netlify.app`.
4. To update it later, drag the folder again on the site's "Deploys" page.

**Alternative — GitHub Pages:** make a public repository, upload all the files (keep the folders), then go to Settings → Pages → Deploy from branch → `main` / root. Your link will be `https://yourname.github.io/repo-name/`.

Tip: open the link on your own phone before sending it.
