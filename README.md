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
A song with a link also gets the official Spotify player on the page. It plays a 30-second preview for people who aren't logged in and the full song for people who are. The first song with a link (Lejos de Ti) is ready to play as soon as the page opens.
