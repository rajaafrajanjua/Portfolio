export const content = `HealthfulAI came out of a real observation: most health apps ignore your budget, and most budgeting apps ignore your health. They exist in completely separate silos. I wanted to build something that treated meal planning, grocery budgeting, and workout tracking as a single interconnected system — and use AI to make the planning genuinely personalised rather than just a generic meal template.

## The Core Architecture

HealthfulAI is a React Native CLI app (not Expo) targeting Android. The decision to use CLI over Expo was driven by the need for native modules — specifically for background notification scheduling and some custom camera functionality for food logging that the Expo SDK didn't expose cleanly at the time.

The state management architecture uses three layers:

- **Redux Toolkit** for authentication state and user profile (persisted to AsyncStorage)
- **React Query** for all server state — meal plans, workout data, shopping lists
- **AsyncStorage** directly for offline resilience and cached AI responses

This separation was deliberate. Authentication and profile data rarely changes and needs to survive app restarts, so Redux with AsyncStorage persistence made sense. Meal plans and workouts are fetched from the backend and benefit from React Query's caching, background refetching, and optimistic updates.

## Building the AI Meal Planning System

The meal planning engine is the centrepiece of the app. The user inputs their calorie target, dietary preferences (vegetarian, vegan, keto, halal), allergies, and budget range. The app then generates a personalised 7-day meal plan with breakfast, lunch, dinner, and snacks for each day.

I used Google Gemini as the primary AI provider. The prompt engineering took significant iteration to get right — the challenge is that a 7-day meal plan is a lot of structured data, and language models tend to hallucinate nutritional values or produce inconsistent formatting when generating large amounts of structured output in one shot.

My solution was **chunked generation**: instead of asking for all 7 days at once, I request one day at a time, validate the JSON structure of each response before proceeding, and retry failed chunks individually rather than regenerating the entire plan. This keeps each request well within the model's token limits and makes errors recoverable.

### Multi-Provider Fallback

No single AI provider is 100% reliable. I built a fallback chain:

1. **Google Gemini** — primary, best quality for nutritional content
2. **OpenAI GPT** — first fallback
3. **Groq** — second fallback (much faster, lower cost, slightly less consistent)

Each provider gets three attempts before the system moves to the next one. The user sees a progress indicator while generation happens — they don't see the fallback logic at all unless all three providers fail, which triggers a friendly error message.

### Regional Pricing Awareness

One feature I'm particularly proud of is regional pricing. The grocery budget tracker needs to estimate costs, and grocery prices vary enormously between Pakistan, the UK, the US, and other markets. I built a pricing context system that adjusts the estimated costs in the shopping list based on the user's selected region and currency (USD, EUR, GBP).

## The Workout Generator

Alongside meal planning, the app generates personalised workout routines. The user selects their fitness goal (weight loss, muscle gain, maintenance), target muscle groups, and activity level.

The workout generator uses a similar AI pipeline to meal planning but with a different output structure — exercise names, sets, reps, rest periods, and a difficulty rating. I built an exercise image matching system that takes each generated exercise name and finds the closest match in a local dataset of exercise GIFs. This was a fuzzy string matching problem — the AI might generate "Dumbbell Chest Press" but the dataset has "Dumbbell Bench Press", so exact matching wouldn't work. I implemented Levenshtein distance matching with a threshold to handle these variations.

## Smart Meal Swaps

The meal swap feature lets users replace any meal in their plan with an alternative that maintains the same macro targets. This uses a targeted AI call — much smaller than the full plan generation — with the current meal's nutrition profile as a constraint. The replacement meal needs to hit within 10% of the calories and 15% of the macronutrients of the original.

I cache swap suggestions per meal so repeated swap requests don't generate new AI calls unless the user explicitly asks for more options.

## Challenges I Didn't Anticipate

**Token budget management** was harder than expected. Gemini's context window is large, but pricing scales with tokens. Early versions of the app were far too expensive to run because I was including too much context in each request. I rewrote the prompt templates several times to reduce token usage while maintaining response quality.

**Offline behaviour** was another challenge. The app is heavily AI-dependent, but users on mobile often have intermittent connectivity. I had to build a robust caching strategy: the current week's meal plan, the current workout plan, and the shopping list all need to be available offline.

## What's Next

HealthfulAI is live on the [Google Play Store](https://play.google.com/store/apps/details?id=com.healthfulai). Future plans include iOS support and a web-based meal planning interface. The AI pipeline is model-agnostic by design, so switching to newer models as they become available requires only changing the provider configuration.

Building HealthfulAI was the most architecturally complex project I've tackled. The combination of AI integration, complex state management, and offline-first design pushed my React Native skills significantly further than any previous project.`;
