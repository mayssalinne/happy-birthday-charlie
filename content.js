/* ==========================================================================
   CONTENT.JS  —  ✎ EVERYTHING YOU NEED TO EDIT LIVES IN THIS FILE ✎
   --------------------------------------------------------------------------
   You never need to touch index.html, style.css or script.js to personalize
   the site. Change the text between the quotes / backticks below, save the
   file, and refresh the page.

   Quick rules:
   • Text inside `backticks` can contain apostrophes ( ' ) and "quotes" freely.
     Just never type a backtick ( ` ) inside it.
   • Leave the commas at the end of each line exactly where they are.
   • To leave something empty, use "" (two quotes with nothing inside).
   ========================================================================== */

window.SITE_CONTENT = {

  /* ---------------------------------------------------------------------
     NAMES & DATES (used across the whole site)
     --------------------------------------------------------------------- */
  to: "Charlie",
  from: "Alinne",
  birthdayLabel: "December 24, 2026",
  fromPlace: "São Luís",
  toPlace: "Corvallis",

  /* ---------------------------------------------------------------------
     1 · OPENING SCREEN (the envelope)
     --------------------------------------------------------------------- */
  opening: {
    greeting: "Happy Birthday",
    intro: `I made something special for you.`,
    button: "Open your letter",
  },

  /* ---------------------------------------------------------------------
     2 · THE LETTER
     • Leave ONE EMPTY LINE between paragraphs — each block becomes a paragraph.
     --------------------------------------------------------------------- */
  letter: {
    salutation: "To my Charlie,",
    body: `
Happy birthday, my love.

I have so many things I want to tell you, and sometimes I don't even know where to begin.

I've been hurt quite a lot in the past. And even though I never completely lost my belief in love, there were times when I felt a little lost. I started to lose faith that one day I would find someone who would truly love me, care for me, and treat me with the respect I always hoped for. Deep down, though, I think a part of me was still waiting for that kind of love to find its way into my life.

And then I met you.

As we started talking and getting closer, I began to realize what kind of person you are and how you treat me. Honestly, you're someone I never would have expected to find in this world.

I always joke about how the world is full of bad people and how suspicious I can be myself. I even say that I play chess with everyone because, sometimes, protecting yourself from other people's intentions feels like a game you always have to be one step ahead in.

But with you, I don't feel like I have to play chess.

I feel warm. I feel safe. I feel something so genuine that I sometimes struggle to put it into words.

Whenever I talk to you, hear your voice, or even dream about you, I feel this warmth inside me. You cross my mind at the most random moments throughout the day. When I wake up, when I'm doing something completely unrelated, when I least expect it. Sometimes I catch myself smiling without even realizing it, simply because I'm thinking about you.

And I'm not telling you this just because it sounds romantic. These are things that genuinely happen to me. You have become such a special part of my everyday life.

You're so sweet, Charlie. You're someone I feel I can talk to about absolutely anything. I don't see you only as someone I could build a life with. I also see you as my best friend, someone I can share my thoughts, experiences, fears, and silly little moments with, knowing that I'll be heard.

And I want to be that person for you, too. I want to give you as much love, care, and support as I possibly can. I want to be there for your happiest moments, celebrate your achievements, listen to you when things get difficult, and support you in whatever you decide to pursue.

I love our moments together, even though I wish I could be there physically. Sometimes I think about how much I would love to hug you, kiss you, and just hold you for hours and hours, without worrying about time passing because we know we'll wake up the next day and still have each other.

I would give anything to discover how to teleport, just so I could suddenly appear next to you and never have to let go.

And there's something else that makes this birthday even more special to me: we share the same birthday.

What a ridiculous coincidence, isn't it?

I've always had complicated feelings about my birthday. Most of my friends are far away, my family situation can be difficult, and because my birthday falls on Christmas Eve, it often feels like the day gets overshadowed by everything else happening around Christmas. It hasn't always been a day I've looked forward to.

But after meeting you, something changed.

Now I actually find myself looking forward to Christmas Eve. I get excited thinking about our birthday, about wishing you a happy birthday and knowing that we're celebrating the same day. Somehow, something that used to feel a little lonely has become something I genuinely look forward to.

And I love that.

I like you so much, Charlie. So much that I've genuinely started imagining what a life with you could look like.

I catch myself imagining the little things. The way we might try to surprise each other, secretly planning something special while both knowing that the other person is probably doing the exact same thing. The ordinary moments, the laughter, the conversations, and all the little experiences that make a life together meaningful.

I want to make this work. I want us to take our time, do things properly, and build something real.

You're such a special person to me. You're genuinely the sweetest man I've ever met, and I want to give you all the love I have inside me.

I love loving someone. I love being alive, breathing, experiencing things, and knowing that there's a possibility of building something beautiful with someone by my side. Having someone whose happiness matters to you, whose achievements make you proud, and whose dreams you want to support is such a wonderful thing.

Life can be difficult and ordinary sometimes, and having someone you can count on makes it feel so much more meaningful. I don't take that for granted. I know it's not something everyone gets to experience.

Sometimes I think about how two people who have been hurt in the past can eventually find each other and discover something gentle and good. I don't believe that everything bad happens for a reason, but I do believe that beautiful things can still come after difficult chapters in our lives.

And I'm really happy that our paths crossed.

I feel incredibly lucky to share this special day with you, and even luckier to have you in my life.

I value you so much, Charlie. As a man, as my boyfriend, and as my best friend. I value your life, your experiences, your story, and the person you are.

I admire the way you care about people, the way you observe the world around you, the way you interact with others, and how naturally you can have a conversation about almost anything. I love discovering all these little things about you.

You are special to me, more than I think I can properly explain in one letter.

And I'm so happy I get to celebrate another year of your life with you.

Happy birthday, my Charlie.
`,
    closing: "With all my love,",
    signature: "Your girl.",
  },

  /* ---------------------------------------------------------------------
     3 · A LITTLE MUSEUM OF US
     Each exhibit has a number, a title, a "medium" line (like a museum
     label) and a short description. The drawings are fixed, but every
     word here can be changed.
     --------------------------------------------------------------------- */
  museum: {
    title: "A Little Museum of Us",
    intro: `A small collection of objects, some real and some symbolic, from a story that's only just begun. Touching the exhibits is encouraged.`,

    candles: {
      number: "No. 01",
      title: "Two Candles, One Date",
      medium: "Wax, two small flames, December 24",
      text: `One for Charlie, one for Alinne. Every year, on the same night, about 5,800 miles apart, each of these candles was lit without knowing about the other. This year, they're lit together, on purpose.`,
      leftName: "Charlie",
      rightName: "Alinne",
      prompt: "Tap to light the candles",
      litMessage: "Now make a wish. We each get one.",
    },

    calendar: {
      number: "No. 02",
      title: "A Page from October",
      medium: "Paper, one circle in red ink",
      text: `October 2, 2026. The day we met. At the time, it was just a Friday.`,
    },

    chess: {
      number: "No. 03",
      title: "The Tipped King",
      medium: "A chess piece, laid down",
      text: `Alinne says she plays chess with everyone, always one step ahead, always guarding against other people's intentions. With Charlie, she stopped playing. In chess, laying down your king means the game is over.`,
      prompt: "Tap the king",
    },

    ticket: {
      number: "No. 04",
      title: "One Ticket, Date Unknown",
      medium: "Paper, not yet punched",
      text: `We haven't met in person yet, so this ticket is still waiting for its date. Until then, the backup plan is teleportation. Research is ongoing.`,
    },
  },

  /* ---------------------------------------------------------------------
     4 · OUR PLAYLIST
     • spotify: paste the song's own link (Spotify: ⋯ → Share → Copy Song
       Link). With a link, the song gets the Spotify player on the page
       (a 30-second preview for people not logged in, the full song for
       people logged in). If you leave it "", the button opens a Spotify
       search for that song instead.
     • The first song that has a link is the one ready to play when the
       page opens — so paste the "Lejos de Ti" link first.
     • Don't change the order unless you want the record to change too.
     --------------------------------------------------------------------- */
  playlist: {
    title: "Our Playlist",
    intro: `Five songs by The Marías, chosen for you.`,
    side: "Side A",
    fullPlaylistLink: "",   // optional: link to the whole Spotify playlist
    songs: [
      { title: "Lejos de Ti",       artist: "The Marías", spotify: "" },
      { title: "Cariño",            artist: "The Marías", spotify: "" },
      { title: "Only in My Dreams", artist: "The Marías", spotify: "" },
      { title: "No One Noticed",    artist: "The Marías", spotify: "" },
      { title: "Over the Moon",     artist: "The Marías", spotify: "" },
    ],
  },

  /* ---------------------------------------------------------------------
     5 · FINAL MESSAGE
     --------------------------------------------------------------------- */
  final: {
    kicker: "Happy Birthday",
    headline: "To you, on our day.",
    message: `Thank you for turning Christmas Eve into a day I look forward to. I hope this new year of your life is full of good things, and I'm so happy I get to spend it loving you.`,
    signoff: "With all my love,",
    signature: "Alinne",
  },
};
