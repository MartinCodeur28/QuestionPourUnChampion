# Copilot Instructions for qvgdm_french

## Project Overview
**qvgdm_french** is a French interactive quiz game based on "Qui veut gagner des millions" (Who Wants to Be a Millionaire). It's a vanilla JavaScript web application that loads quiz questions from XML files and provides an engaging UI with lifeline features (jokers).

**Live Demo:** https://hermlon.github.io/qvgdm_french/index.html

## Recent Improvements (Latest Version)

### Issues Fixed
1. **Removed broken reference** - Deleted non-existent `scripts/isLogin.js` reference that caused 404 errors
2. **Fixed logic bug** - Changed bitwise OR `|` to logical OR `||` in the 50/50 joker function
3. **Fixed variable scope issues** - Properly declared all loop variables with `var` to prevent global pollution
4. **Improved function scoping** - All internal functions now properly scoped within the Game object

### New Features
1. **Question Selection UI** - Users can now jump to any question using a dropdown selector
2. **Quiz File Upload** - Users can load custom XML quiz files directly in the game
3. **Reset Game Button** - Easily restart the current quiz
4. **Quiz Generator** - New standalone HTML tool (`quiz-generator.html`) to create and manage quizzes

## Repository Structure
```
qvgdm_french/
├── index.html              # Main quiz game entry point
├── quiz-generator.html     # Quiz creation and management tool (NEW)
├── quiz1.xml               # Quiz questions data in XML format
├── LICENSE                 # Project license
├── README.md               # Basic project information
├── copilot_instructions.md # This file - AI assistant guidelines
├── scripts/
│   └── quizMain.js         # Main quiz logic and game controller
├── styles/
│   └── index.css           # Styling and layout
└── images/                 # Game assets (logo, joker icons, etc.)
```

## Key Components

### HTML (index.html)
- Single-page application with game UI
- Layout includes:
  - Logo section (`#logo`)
  - Question and answers display (`#qanda`)
  - Answer options arranged in 2x2 grid
  - Joker icons for lifelines (`#joker`)
  - Ranking/progress display (`#ranking`)

### XML Question Format (quiz1.xml)
Questions follow this structure:
```xml
<quiz name="QuizName">
  <questions>
    <question rank="1">
      <name>Question text here</name>
      <answerWrong>Wrong answer 1</answerWrong>
      <answerWrong>Wrong answer 2</answerWrong>
      <answerWrong>Wrong answer 3</answerWrong>
      <answerRight>Correct answer</answerRight>
    </question>
  </questions>
</quiz>
```

### JavaScript Components
- **LeaderBoard()**: Manages joker/lifeline functionality (50/50, telephone, audience)
- **Medallion()**: Handles visual progression and rank display
- Joker mechanics:
  - `use5050()`: Removes two wrong answers
  - `useTel()`: Simulates phone call to expert
  - `usePub()`: Shows audience poll results

### Styling (index.css)
- Golden letter styling for answer labels
- Responsive grid layout for answer options
- Interactive visual feedback for selections
- Joker icon styling and disabled states

## Development Guidelines

### Adding New Questions
1. Edit `quiz1.xml`
2. Add a new `<question>` block with:
   - Unique `rank` attribute (sequential numbering)
   - Question text in `<name>` tag
   - Three `<answerWrong>` elements
   - One `<answerRight>` element (order will be randomized in UI)
3. Ensure XML is well-formed

### Modifying Styling
- Core styles are in `styles/index.css`
- Use class names:
  - `.element`: Question and answer containers
  - `.goldenLetter`: Answer letter prefix styling
  - `.joker`: Joker icon styling
  - `.marked`: Active/selected state

### Adding Features
- Keep game logic in the main JavaScript file
- Maintain separation between UI manipulation and game state
- Use event listeners for user interactions
- Update ranking display after each question answered correctly

## Code Style Conventions
- Vanilla JavaScript (no frameworks)
- DOM manipulation via `getElementById()` and `classList`
- Event-driven architecture
- XML parsing for dynamic question loading
- Image assets for visual elements (SVG for jokers)

## Deployment
- Project uses GitHub Pages
- Accessible at: `https://hermlon.github.io/qvgdm_french/`
- Static files (HTML, CSS, JS, XML, images)
- No backend or build process required

## Common Tasks

### To modify a joker behavior:
- Edit the corresponding function in the `LeaderBoard` object in `quizMain.js`
- Update both the function logic and the visual feedback (image source)

### To change UI colors/fonts:
- Modify CSS variables or class definitions in `styles/index.css`
- Google Fonts used: Raleway, Aldrich

### To add a new quiz:
- Create a new XML file with questions
- Update `index.html` to load the new XML file
- Adjust game parameters if needed

### To use the Quiz Generator:
1. Open `quiz-generator.html` in your browser
2. Enter quiz name and add questions one by one
3. For each question, provide:
   - Question text
   - 1 correct answer
   - 3 wrong answers
4. Download as XML file to use with the main game
5. Generate as HTML to create a standalone quiz file

### To select a specific question:
1. Use the "Jump to question" dropdown in the controls panel
2. Select any question to start from that position
3. The game will continue from there sequentially

## Testing
- Test locally by opening `index.html` in a web browser
- Verify XML loading works correctly
- Test all joker functionalities
- Check responsive design on different screen sizes

## Notes
- Logo rights are not owned by this project
- Application includes login redirect (isLogin.js)
- Questions are randomly shuffled in the UI
- Each joker can only be used once per game
