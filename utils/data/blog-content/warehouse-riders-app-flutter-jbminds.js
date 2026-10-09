export const content = `When I joined JBMinds as a Flutter Developer, I stepped into an existing logistics platform — a PostEx-style parcel delivery system with a backend already in production. My job was to build and improve the Flutter frontends: a Warehouse app used by operations staff to process incoming and outgoing parcels, and a Riders app used by delivery drivers in the field. Both apps needed to work reliably under real operational pressure, with poor connectivity, tired users, and no tolerance for crashes.

## The Warehouse App

The Warehouse app is used at the parcel processing facility. Its primary job is to handle the high-volume movement of parcels through different stages — receiving, sorting, dispatch.

### Parcel Scanning

The core workflow is barcode scanning. Every parcel has a barcode that needs to be scanned at each stage of its journey through the warehouse. I implemented scanning using the device's camera via ML Kit, with a scanning mode optimised for warehouse conditions — strong overhead lighting, barcodes at varying distances and angles, often partially obscured.

One operational requirement that shaped the architecture significantly: scanners needed to work in bulk. A warehouse worker might scan 200 parcels in a single session. I built a scan queue that batches confirmations and syncs to the backend every 10 scans or every 30 seconds, whichever comes first. This meant lost connectivity during a scanning session didn't disrupt the workflow.

### Package Status Updates

Each parcel moves through a defined set of statuses: received, sorted, out for delivery, delivered, failed delivery, returned. Status updates need to be atomic. On the app side, I implemented optimistic updates: the UI shows the new status immediately, the API call happens in the background, and the UI reverts if the API rejects the transition.

### Push Notifications

The warehouse app uses Firebase Cloud Messaging for operational alerts — urgent notifications about high-priority parcels, system maintenance windows, and shift start reminders. I implemented a notification tapping flow that deep-links directly to the relevant parcel within the app.

## The Riders App

The Riders app is arguably more complex, because it needs to work in the field where conditions are unpredictable.

### Order Assignment and Workflow

When a driver starts their shift, the app fetches their assigned parcels for the day. Each order shows the delivery address, recipient name, contact number, and any special instructions. The order assignment workflow has several states: assigned, en route, at location, delivered, failed.

### Live Geo-Location Tracking

The live location feature tracks the rider's position during their shift and sends periodic updates to the backend. I settled on updates every 15 seconds while the app is in foreground, and every 45 seconds in background. Location updates are batched and sent every three updates to reduce API call frequency.

Android 12+ has strict background location restrictions that require a specific permission dialog flow and additional Play Store declaration. Getting this right took more time than the location logic itself.

### Proof of Delivery

POD is a legal and operational requirement. When a parcel is marked as delivered, the app collects:

- **Recipient signature**: Drawn on a signature pad widget built from scratch using Flutter's \`CustomPainter\`
- **Photo confirmation**: A camera capture of the parcel at the delivery location
- **GPS coordinates**: Automatically captured at the moment of delivery
- **Timestamp**: Server-verified delivery time

All four elements are uploaded together as a POD package. If connectivity drops immediately after a delivery, the POD is queued locally and uploaded when the connection restores.

### Offline Resilience

Field connectivity is unreliable. I designed the Riders app to work through connectivity gaps without the driver noticing. The complete order list is cached locally at shift start. Status updates and POD uploads queue locally when offline and sync when connectivity restores.

## What I Learned Building Production Logistics Apps

**Reliability matters more than features.** An app that crashes or loses data in a warehouse or during a delivery is a serious operational problem. I became much more conservative about error handling.

**Battery life is a first-class concern.** Both apps run all day. The continuous scanning and location tracking can drain a battery quickly. I added battery-aware behaviour: scanning frequency reduces slightly when the battery is below 20%, and location updates slow down.

**Operators and drivers are not typical app users.** They're using the app under time pressure, often with gloves on, sometimes in poor lighting. Large tap targets, high contrast, simple flows with minimal decisions — all of these matter more than aesthetic refinement.

Working on these apps at JBMinds gave me practical experience that classroom projects and tutorial apps never could. Production logistics software is unforgiving, and building it made me a significantly better developer.`;
