# Ayush Vishnoi Portfolio + Chatbot

## Files
- `index.html` — portfolio content and chatbot markup
- `style.css` — portfolio styles plus responsive chatbot styles
- `chatbot.js` — chatbot interactions and built-in portfolio FAQ knowledge

## Run locally
Open `index.html` in a browser. For local development, you can also use the Live Server extension in VS Code.

## Included chatbot features
- Floating launcher at the bottom-right
- Responsive chat panel for desktop and mobile
- Built-in answers about the portfolio, education, skills, HMates, PackCheck AI, interests, and goals
- Suggested-question buttons
- Typing indicator and message timestamps
- Clear-conversation and close controls
- Enter-to-send form, Escape-to-close, keyboard labels, and reduced-motion support
- Visitor input rendered as plain text to avoid interpreting user messages as HTML

## Important limitation
This version is a client-side, rule-based FAQ assistant. It does not call an external AI model, and it does not need an API key. It answers using the information configured in `chatbot.js`; questions outside that information receive a fallback response. For a real generative AI chatbot, add a server-side backend (for example Node.js/Express) and keep the model API key on the server—never put a secret API key in browser JavaScript.

## Personalize before publishing
- Verify the portfolio text and skill levels.
- Update project links so they point to the correct repositories or live demos.
- Add a public contact email or professional profile link if you want visitors to contact you.
