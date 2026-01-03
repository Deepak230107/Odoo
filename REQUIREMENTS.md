# GlobeTrotter | Comprehensive Requirements Document

This document outlines the features, design principles, and technical requirements implemented in the GlobeTrotter Application.

## 1. Project Overview
GlobeTrotter is a premium travel planning and booking platform designed with a modern, glassmorphic UI. It allows users to explore global destinations, calculate booking costs across different transport modes, and maintain a persistent journey history.

## 2. Functional Requirements

### 2.1 User Authentication (Landing Page)
- **Modern Interface**: Implements a glassmorphic design with dynamic background gradients.
- **Login/Signup Tabs**: Seamless switching between login and registration forms.
- **Social Integration**: Placeholder buttons for Google, Apple, and Facebook authentication.
- **Feature Showcases**: Highlighted sections for "AI Itinerary", "Global Collaboration", and "Budget Tracking".

### 2.2 Interactive Dashboard
- **Dynamic Welcome**: Personal greeting for the user (e.g., "Where next, John?").
- **Live Stats**: Real-time animated counters for "Total Saved", "Active Itineraries", and "Miles Traveled".
- **Global Search**: Search bar to filter through a catalog of 15+ world-class destinations.
- **Journey History**: A persistent section displaying past and upcoming journeys, including travel dates, costs, and transport modes.

### 2.3 Booking Engine (`booking.html`)
- **Traveler Details**: Form fields for Name, Email, and Phone Number validation.
- **Destination Selection**: Dropdown menu allowing selection from 15 global hotspots (Paris, Tokyo, Swiss Alps, etc.).
- **Transport Modes & Charges**:
    - **Bus**: +$150 charge.
    - **Train**: +$300 charge.
    - **Airplane**: +$800 charge.
- **Partner Aggregator**: Integration structure mimicking apps like MakeMyTrip, RedBus, and BookMyTrain.
- **Dynamic Calculations**: Automatic total calculation: `Base Fare + Transport Charge + Partner Fees ($45)`.

### 2.4 Transaction System
- **Pop-up Confirmation**: A premium modal that appears upon successful booking.
- **Booking ID Generation**: Automatic generation of unique IDs (e.g., GT-123456).
- **History Injection**: Successful bookings are automatically saved to the user's dashboard history.

## 3. Design Requirements (UI/UX)
- **Aesthetics**: Glassmorphism (blur: 20px-30px, white opacity: 0.08).
- **Typography**: Primary font `Outfit`, Secondary/Heading font `Playfair Display`.
- **Animations**: 
    - `fadeInUp` on page load.
    - Smooth scaling and image zoom on card hover.
    - Slide-up animations for modals.
- **Responsiveness**: Fully optimized for Desktop, Tablet, and Mobile screens.

## 4. Technical Requirements
- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System).
- **Interactivity**: Vanilla JavaScript (ES6+).
- **Icons**: FontAwesome 6.4.0 integration.
- **Fonts**: Google Fonts API (Outfit & Playfair Display).
- **Data Persistence**: `localStorage` used for storing journey history and user preferences without a backend.
- **File Structure**: 
    - `/login`: Landing and Auth.
    - `/dashboard`: Main hub, booking canvas, and scripts.

## 5. Destination Catalog
1.  Swiss Alps
2.  Paris, France
3.  Tokyo, Japan
4.  Bali, Indonesia
5.  Santorini, Greece
6.  New York, USA
7.  London, UK
8.  Rome, Italy
9.  Sydney, Australia
10. Dubai, UAE
11. Cairo, Egypt
12. Cape Town, SA
13. Machu Picchu, Peru
14. Banff, Canada
15. Bora Bora
