export const content = `PDF ToolKits started with a simple frustration: every good PDF app on Android either required an account, uploaded your files to the cloud, or locked the useful features behind a paywall. I wanted to build something that was genuinely free, worked fully offline, and gave users real tools — not a stripped-down trial. This is the story of how I built it.

## The Core Problem

When I started this project at JBMinds, the brief was clear: a PDF utility app that handles the full document lifecycle on-device. Scan a paper document, convert images to PDF, merge files, edit existing PDFs, and view them — all without an internet connection and without asking for an account. Simple to describe, surprisingly complex to build.

## Document Scanning with ML Edge Detection

The most technically interesting part of the project was the document scanner. I didn't want a basic camera crop — I wanted CamScanner-style automatic corner detection, where the app figures out the edges of the document itself.

I used Google ML Kit's document scanner API combined with custom perspective crop logic. The ML model detects the four corners of the document in the camera frame, and the app draws a live overlay showing the detected quadrilateral. When the user taps the shutter, the image is perspective-corrected to produce a flat, straight scan regardless of the angle it was captured at.

The tricky part was handling edge cases: documents on busy backgrounds, partial occlusion, and low-contrast paper. I spent a significant amount of time tuning the confidence threshold — if it's too aggressive, it rejects valid scans; too loose, and it produces terrible results. The final implementation uses a two-pass approach: ML detection first, with a manual adjustment screen as fallback.

I also built auto-filter processing — the scanned image runs through a series of image filters (black-and-white, enhanced, original) with real-time previews so the user can pick the one that looks cleanest for their document.

## The PDF Editor

Building the PDF editor was the most time-consuming part of the project. I implemented it as a layer system on top of the rendered PDF pages:

- **Text tool**: Places editable text boxes anywhere on the page, with font size and color controls
- **Drawing tool**: Freehand drawing with configurable stroke width and color
- **Highlighter**: Semi-transparent colored overlays for highlighting passages
- **Shapes**: Rectangle, circle, and line tools
- **Eraser**: Removes any drawn content in the erased area

The rendering pipeline converts each PDF page to a high-resolution bitmap, composites all the annotation layers on top, and then re-encodes the result back to PDF. Getting the coordinate mapping right between the screen and the PDF page coordinate system took several iterations to get pixel-accurate.

## Multi-Language and RTL Support

One of the requirements I'm most proud of is the full RTL (right-to-left) layout for Arabic and Urdu. Flutter has good RTL support out of the box when you set the locale correctly, but the edge cases are significant.

The app supports six languages: English, Arabic, Urdu, Spanish, Portuguese, and Turkish. For the RTL languages, every layout — every row, every icon position, every swipe gesture direction — needs to be mirrored. I used Flutter's \`Directionality\` widget at the root level and made sure every custom widget respected the text direction rather than hardcoding left/right positioning.

Testing RTL was its own challenge since I don't read Arabic or Urdu. I worked with translated strings from a native speaker and tested every screen manually in RTL mode.

## State Management with Riverpod

I chose Riverpod for state management over GetX or BLoC. For an app with this many independent features — the scanner, editor, file manager, and viewer all operating on potentially the same files — Riverpod's provider scoping made it easy to keep state isolated without prop-drilling or global singletons.

The file history feature (which tracks recently opened PDFs) is a good example: it's a simple \`StateNotifierProvider\` that persists to SharedPreferences and automatically updates every list in the UI that depends on it.

## Play Store Launch

Publishing PDF ToolKits was my first major Play Store launch as the primary developer. The review process took about three days, with one rejection for a policy clarification around the file access permissions — I had to add a more specific justification for why the app needed broad storage access. After addressing that in the store listing and the permission rationale dialog, the second submission was approved.

The app has been live since late 2025. Looking at the store listing metrics, the most-used feature by far is the Scan to PDF function, followed by the PDF reader. The editor features have lower engagement — which makes sense, most people need a scanner far more often than they need to annotate PDFs.

## What I Would Do Differently

If I were starting over, I would invest more time upfront in the file management architecture. The current implementation treats each feature (scanner, converter, merger) as largely independent, which led to some duplicated logic for file I/O. A unified file repository layer from the start would have made the codebase cleaner.

I would also add automated UI tests earlier. Testing PDF rendering across different Android API levels and screen densities manually is tedious, and a few layout issues slipped through that could have been caught automatically.

## Key Takeaways

Building PDF ToolKits taught me more about Flutter's rendering pipeline than any tutorial could. The combination of ML Kit, custom image processing, and cross-language UI was genuinely hard, and shipping it to the Play Store and seeing real users download it was one of the most satisfying moments of my development career so far.

If you want to try the app, you can find it on the [Google Play Store](https://play.google.com/store/apps/details?id=com.pdfwithriverpod.app).`;
