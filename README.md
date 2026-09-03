# E-mandi

e-Mandi — Complete Concept
What it is

e-Mandi is a digital agricultural marketplace platform that replicates and improves the traditional APMC (Agricultural Produce Market Committee) mandi system in India. A physical mandi is where farmers bring their produce, traders bid on it, and transactions happen through commission agents (arthiyas). e-Mandi moves this entire process online — from arrival registration to payment settlement — while keeping the familiar auction and negotiation mechanics that participants already understand.

The core problem it solves: farmers have no price visibility before they travel to the mandi, often arriving with a truckload of onions only to discover prices have crashed that morning. Traders have no advance knowledge of what supply is arriving. The entire system runs on phone calls, middlemen, and paper registers. Money takes days to settle. Small farmers get exploited because they cannot afford to wait or transport to a better market.

Who uses it

Farmers — register their produce before arrival, see live prices across multiple mandis, choose where to sell, receive payment directly into their bank account within 24 hours.

Traders and commission agents (arthiyas) — bid on lots online or in the physical hall using a digital interface, manage their purchase history, generate digital purchase receipts.

Mandi officials (secretaries, supervisors) — manage arrivals, run the auction process, generate official records, submit returns to the state agriculture department.

Transport operators — get notified when a farmer's lot is ready for dispatch, coordinate pickup.

State agriculture department — real-time dashboards of arrivals, prices, volumes, and trader activity across all mandis in the state. Replaces the weekly paper return.

Banks and financial institutions — access farmer transaction history as collateral evidence for Kisan Credit Card limits and crop loans.

Core features
1. Farmer registration and produce declaration

Before arriving at the mandi, the farmer registers through a mobile app (available in regional languages — Hindi, Marathi, Punjabi, Gujarati, Telugu, Kannada) or through a Common Service Centre operator. They declare:

Crop name and variety
Estimated quantity in quintals
Expected arrival date and time
Village and district of origin
Preferred mandi (with option to compare prices at nearby mandis first)

The system issues a Gate Pass QR code that the farmer shows on arrival. This pre-registration creates the arrival record before the truck enters the mandi gate, eliminating the paper register at the entry booth.

2. Arrival and lot management

When the farmer arrives, a mandi employee scans the Gate Pass QR. The physical produce is weighed on a connected digital weighbridge — weight is automatically captured into the system, no manual entry. The lot gets a unique ID: MANDI_CODE / CROP_CODE / DATE / SEQUENCE for example PUN-AMR/ONI/20250825/0047.

The lot is photographed (minimum 3 images from different angles), graded by a trained grader who selects a quality grade (Grade A, B, C or the specific AGMARK standard), and placed in the auction hall. Everything is timestamped and geotagged.

3. Price discovery — the auction engine

The auction runs in one of three modes depending on the mandi's practice:

Open cry auction (digitised) — the auctioneer announces each lot on a central display screen and over a speaker. Traders bid by pressing a button on a handheld device or a fixed terminal at their seat. The highest bid within the time window wins. The winning bid, bidder identity, and timestamp are automatically recorded.

Reverse bidding — for commodities where the government sets a Minimum Support Price, the auction starts at MSP and traders compete by offering a premium above it.

Negotiated price — for perishables that cannot wait for auction, the farmer and trader negotiate directly through the platform. Both confirm the agreed price and the system records it as a formal transaction.

All bids are time-stamped to the millisecond. No bid can be entered retroactively. The auction log is immutable — designed as evidence in any dispute.

4. Price transparency and market intelligence

Every farmer and trader can see:

Live modal price — the price at which the highest volume of that commodity is trading today, updated every 15 minutes
Price range — lowest and highest transaction price today for that crop and grade
Historical prices — last 30 days, same date last year, seasonal trend chart
Arrival volumes — how many quintals of wheat / tomatoes / cotton have arrived today at this mandi and at nearby mandis
Price alerts — set a target price and receive an SMS or WhatsApp message when transactions cross that threshold

This replaces the current system where farmers call their arthiya the night before and get one number that may or may not reflect reality.

5. Transaction and payment settlement

Once a lot is sold:

A Kaccha Arhat (provisional receipt) is generated digitally, showing: farmer name, lot ID, commodity, grade, quantity, price per quintal, gross amount, deductions (market fee, commission, gunny bag charges), and net payable to farmer.
The farmer digitally signs (or OTP-confirms) acceptance of the transaction.
Payment is routed directly to the farmer's Aadhaar-linked bank account via IMPS or NEFT within 24 hours — not through the arthiya's account. This single change eliminates the most common form of farmer exploitation: arthiyas holding payment for weeks.
The trader gets a Pakka Arhat (final bill) with GST breakdown, which feeds directly into their accounting.
Market fee (typically 1–2% of transaction value) is automatically calculated and a payment demand is issued to the trader.
6. Mandi management back-office

For mandi secretaries and supervisors:

Daily arrival register — replacing the handwritten register
Lot status board — which lots are waiting, in auction, sold, dispatched
Trader license verification — system flags if a trader's license has expired or they have outstanding dues
Dispute management — farmer or trader can raise a dispute within 48 hours; the full auction log, photographs, and weighbridge data serve as evidence
Daily price report generation — sent automatically to the state agriculture department at end of day
Monthly returns — auto-generated from transaction data, eliminating manual compilation
7. State-level command and control dashboard

For the agriculture department:

Real-time map view of all mandis in the state with arrival volumes colour-coded
Price anomaly detection — if one mandi's modal price for cotton diverges sharply from nearby mandis, it flags automatically (possible cartelisation or data entry fraud)
Trader activity monitoring — concentration analysis showing if one trader is buying more than a healthy share of a commodity
MSP compliance monitoring — percentage of transactions happening at or above Minimum Support Price per crop per mandi
Farmer payment verification — are farmers receiving payment within the mandated timeframe?
Export to state agriculture ministry reporting formats
8. Mobile app — farmer-facing

Built for low-end Android devices, minimum Android 6, works on 2G with graceful degradation. Features:

Available in 8 Indian languages
Gate pass generation and QR display
Real-time lot tracking (your lot is number 12 in the queue for auction)
Push notification when your lot goes to auction
Transaction summary and receipt download
Payment status and bank credit confirmation
Price comparison across nearby mandis before deciding where to go
Offline mode — core functions available without connectivity, syncs when connection returns
Technical architecture
Backend

Language and framework: Java 21 with Spring Boot 3.5 — matches your existing Medicos EMR stack, same team can maintain it. Alternatively Python with FastAPI if you want faster iteration on the data-heavy analytics parts.

Multi-tenancy: Each mandi is a tenant. A mandi in Punjab has no visibility into Rajasthan mandi data except through the state dashboard which aggregates read-only. Same row-level security model as Medicos — every query is scoped by mandi_id.

Database:

PostgreSQL — transactional data (lots, bids, transactions, payments)
TimescaleDB extension — price time-series data for trend charts and historical analysis
Redis — live auction state, bid queuing, active lot countdown timers

Auction engine: The real-time bidding system is the most critical component. Use WebSockets (Spring WebFlux with reactive streams) for live bid updates — every trader terminal in the auction hall sees bids appear in under 100ms. The auction timer and bid acceptance logic runs server-side only. The client displays only — it cannot manipulate the auction state.

Payment integration: NPCI APIs for UPI and IMPS direct bank transfer. All payment routing goes through the bank's API — the platform never holds money. Payment confirmation webhook updates the transaction record and triggers farmer SMS confirmation.

Weighbridge integration: Serial port / RS-232 integration with digital weighbridges (Mettler Toledo, Avery Weigh-Tronix are common in Indian mandis). A lightweight Java agent runs on the weighbridge computer, reads the weight when stable, and POSTs to the backend API. Alternative: weighbridge prints a ticket with a QR code that the mandi employee scans.

SMS and WhatsApp: Kaleyra or Gupshup for SMS gateway. WhatsApp Business API for farmers who prefer WhatsApp notifications — price alerts, gate pass, payment confirmation.

Frontend

Web application: React 18 with TypeScript — same as Medicos EMR. Three distinct interfaces: Farmer portal (simple, large text, regional language), Trader terminal (fast, keyboard-shortcut-heavy for auction hall use), Mandi admin panel (data-dense, report-oriented).

Auction display screen: A dedicated full-screen view designed to be shown on a large TV/projector in the auction hall. Shows current lot details, countdown timer, current highest bid, and bidder count. Auto-advances to next lot. No interaction — display only.

State dashboard: React with Recharts or D3 for the analytics layer. Leaflet for the state map view showing all mandi locations with live data overlays.

Mobile app: React Native — shared business logic with the web app, native performance for the camera (lot photography) and QR scanning (gate pass) features. Published on Play Store, also distributable as APK for sideloading.

Infrastructure

Deployment: Each state's e-Mandi instance runs on NIC (National Informatics Centre) cloud or a state government data centre — data sovereignty is non-negotiable for government agriculture data. Not AWS Mumbai unless the state specifically approves it.

Offline resilience: Mandi internet connectivity is often poor. Critical operations (lot registration, weight capture, bid recording) have a local-first mode using a mandi server (a mini server installed on-premises at each mandi, a basic Dell tower or NUC). Transactions are recorded locally and sync to the central server when connectivity restores. The central server is the system of record — local server is the fallback, not a separate system.

Integration with national systems:

eNAM (National Agriculture Market) API — e-Mandi transactions can be optionally pushed to the central eNAM platform for national price discovery
Kisan Suvidha and PM-KISAN APIs — cross-reference farmer registration
GST network — trader GST filing data flows automatically
Agmarknet — price data published to the national agmarknet portal
What makes this different from eNAM

eNAM is the existing government e-mandi platform. It exists, is mandated in many states, and is largely not used in practice because:

It requires mandi officials to manually enter data after the physical auction — it is a recording tool, not an auction tool
Connectivity requirements are too strict for rural mandi internet
Interface is not in local languages adequately
Payment settlement still goes through arthiyas in most cases
Adoption is not enforced because the software is not better than the paper system

Your e-Mandi beats eNAM by being: the auction tool itself (not a post-hoc recorder), offline-first, genuinely multilingual, connected directly to weighbridges, and routing payment directly to farmers.

The positioning is: sell to state governments as an eNAM-compliant replacement with better implementation, or sell to private mandis and farmer producer organisations (FPOs) who are not APMC-regulated.

Revenue model without payment processing

Since you are not building a payment gateway:

SaaS licensing to state governments — annual contract per mandi. Typical government software contracts are ₹2–5 lakh per mandi per year. With 200 mandis in a state that is a ₹4–10 crore annual contract.
Implementation and training fee — one-time setup, data migration from paper registers, staff training at each mandi.
Support and maintenance — 18% of licensing annually, standard for government software.
FPO and private mandi subscriptions — smaller mandis not under APMC that want the system. ₹50,000–1,50,000 per year.
Data and analytics reports — sold to commodity traders, agricultural input companies, and banks who want price trend data. Aggregated and anonymised.
Phased delivery

Phase 1 — Core mandi digitisation (4 months)
Farmer registration, gate pass, weighbridge integration, lot management, manual price entry by mandi official, basic payment tracking, daily reports. Enough to replace the paper register.

Phase 2 — Live auction engine (3 months)
Real-time bidding via WebSocket, trader terminals, auction display screen, dispute management, immutable bid log.

Phase 3 — Direct farmer payment (2 months)
NPCI integration, Aadhaar-linked bank routing, payment confirmation SMS, arthiya bypass flow.

Phase 4 — Analytics and state dashboard (2 months)
Price trend charts, MSP compliance monitoring, price anomaly detection, Agmarknet and eNAM API push.

Phase 5 — Mobile app and offline resilience (3 months)
React Native farmer app, on-premises mandi server, offline sync, 2G optimisation.
