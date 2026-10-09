export const content = `QR codes are everywhere now — restaurant menus, payment links, event tickets, Wi-Fi credentials. I use them constantly. But most QR scanner apps on Android are either bloated with ads, slow to open, or buried under dark patterns trying to push subscriptions. I built QR Scanner·Barcode Scanner because I wanted a fast, clean, no-nonsense scanning app — and because building it would teach me a lot about the Google ML Kit ecosystem.

## Why Flutter for a Scanner App?

Flutter was the natural choice for this project for a few reasons. I was already using it professionally at JBMinds, the Dart ecosystem has solid bindings for Google ML Kit, and Flutter's single codebase would let me target multiple platforms in the future without a full rewrite.

## The Scanning Engine

The core of the app is the barcode scanning pipeline. I used \`google_mlkit_barcode_scanning\` as the scanning engine. ML Kit's barcode scanner is impressively fast — on a mid-range Android device it processes camera frames in real time with no noticeable lag.

The integration looks deceptively simple in Flutter, but there are real performance considerations:

- **Frame rate throttling**: Processing every single camera frame is unnecessary and drains battery quickly. I implemented a frame processing queue that analyzes every third frame, which gives essentially instant scan response while keeping CPU usage reasonable.
- **Multiple format support**: The app supports all major formats — QR Code, Data Matrix, Aztec, PDF417, Code 39, Code 93, Code 128, Codabar, EAN-8, EAN-13, ITF, UPC-A, and UPC-E.
- **Low-light scanning**: I added flashlight support triggered by a tap on a torch icon. The torch needs to release properly when the camera is disposed, and on some devices the torch and camera permissions interact in unexpected ways.

## Scan from Image

Beyond live camera scanning, the app supports scanning from existing images in the gallery. This was an important feature for users who receive QR codes as images in WhatsApp messages or screenshots.

The implementation uses the same ML Kit barcode scanner but in static image mode. The tricky part is handling images that contain multiple barcodes — I render all detected codes and let the user select which one to open.

## Custom QR Code Generation

The QR generation feature supports a wide range of content types:

- URLs and plain text
- Wi-Fi credentials (SSID, password, encryption type)
- Contact cards (vCard format)
- Phone numbers and SMS
- Email addresses
- Geographic locations
- Calendar events
- YouTube links and app links

Each type has its own input form that validates the content before generating. I added a contrast check that warns users when their colour combination might not scan reliably.

## Smart History Management

The history feature stores both scanned codes and generated codes in separate lists, persisted to SharedPreferences. Each entry stores the content, the type, a timestamp, and a human-readable label.

One UX detail I spent time on: when a scanned URL is opened in the browser, the history entry is marked as "opened" with a subtle indicator. Users can see at a glance which links they've already followed.

## The Play Store Submission

Getting the app approved was smoother than my first Play Store submission. A few things I did differently:

**Permission justification**: I wrote clear, specific justifications for camera and storage permissions — "camera is required to scan barcodes in real time" rather than a generic statement.

**Screenshots**: I prepared high-quality screenshots at the required resolutions before starting the submission. Store listing quality affects discoverability.

The app was approved within 24 hours and is now live on the [Google Play Store](https://play.google.com/store/apps/details?id=com.jb_qr.app).

## Lessons Learned

Test on low-end devices early. Flutter performs well on flagship devices, but QR scanning with live camera processing can struggle on very low-end Android phones. I caught a performance issue on a 1GB RAM device only because I borrowed one from a colleague — the fix was simple once I knew the problem existed.

Building this app gave me a solid foundation in Flutter's camera ecosystem and Google ML Kit. It's the kind of project that seems simple on the surface but has enough depth to teach you a lot.`;
