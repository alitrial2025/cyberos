# Google Play Console Submission Checklist (2025)

This document serves as a guide for the questions and materials you will need to provide when publishing **CyberOS** to the Google Play Store.

## 1. App Setup (Initial Tasks)
Google requires these tasks to be completed before the "Review" button is enabled.

| Task | Requirement | Details |
| :--- | :--- | :--- |
| **App Access** | Provide Login Info | If CyberOS has a login screen (e.g., Firebase Auth), you must provide a working username and password for the reviewer. |
| **Ads** | Declaration | Does the app contain ads? (Likely **No** for CyberOS). |
| **Content Rating** | Questionnaire | Answers about violence, horror, or gambling. For a launcher/OS theme, this usually results in a **PEGI 3** or **Everyone** rating. |
| **Target Audience** | Age Selection | Recommended: **13+** or **18+** to avoid complex "Designed for Families" policies. |
| **News Apps** | Declaration | Select **No**. |
| **COVID-19** | Declaration | Select **My app is not a publicly available COVID-19 contact tracing or status app**. |
| **Data Safety** | Data Disclosure | Disclose what data you collect (Emails, Device IDs). See Section 2 for details. |
| **Government Apps** | Declaration | Select **No**. |
| **Financial Features**| Declaration | Select **None**. |
| **AI Declaration** | New for 2024 | If the app generates content via AI (LLMs), you must declare it. |

---

## 2. Data Safety Questionnaire
You must be honest here to avoid app suspension.

*   **Data Types Collected:**
    *   **Personal Info:** Email address (if using Firebase Auth).
    *   **App Activity:** App interactions (if using analytics).
    *   **Device IDs:** Device or other IDs (Standard for most apps).
*   **Data Handling:**
    *   Is the data encrypted in transit? **Yes** (Firebase/HTTPS).
    *   Do you provide a way for users to request data deletion? **Yes** (Required by law).

---

## 3. Store Presence (Marketing)
These are the public-facing elements of your listing.

*   **App Name:** CyberOS - Deep UI Launcher
*   **Short Description:** A high-fidelity, cyber-security inspired launcher with glitch effects and hex overlays.
*   **Full Description:** 
    > Experience the ultimate "Deep UI" transformation. CyberOS is not just a theme; it's a complete redesign of your mobile interface.
    > Features:
    > - Animated Hex Overlays & Binary Backgrounds
    > - Glitch-effect Typography
    > - Neural Mesh UI Components
    > - High-performance Native Modules for smooth 60fps animations.
*   **Graphics Assets:**
    *   **App Icon:** 512 x 512 (32-bit PNG)
    *   **Feature Graphic:** 1024 x 500 (JPG or 24-bit PNG)
    *   **Phone Screenshots:** At least 2 (1080 x 1920 or similar 16:9).
    *   **Tablet Screenshots:** Required if you want to show up on Tablet store searches.

---

## 4. Sensitive Permissions (Critical for CyberOS)
Because CyberOS functions as a launcher, Google will flag certain permissions:

*   **QUERY_ALL_PACKAGES:** 
    *   *Reason:* Needed to list and launch installed apps.
    *   *Play Console Answer:* "The app's core functionality requires the user to see and launch all installed applications on their device."
*   **Accessibility Service (if used):**
    *   *Warning:* If you use this for gestures (like double-tap to lock), you must provide a video link showing the feature in use and explain why it's essential for users with disabilities.
*   **System Alert Window (Draw over apps):**
    *   *Reason:* Used for the "Deep UI" overlays.

---

## 5. Technical Pre-flight
*   **Package Name:** `com.cyberos.launcher` (Ensure this is set in `app.json`).
*   **Version Code:** Incremented with every build.
*   **Privacy Policy URL:** You must have a link (e.g., `https://your-site.com/privacy`).
*   **App Bundle:** Build the `.aab` file using:
    ```bash
    npx expo run:android --variant release
    ```
