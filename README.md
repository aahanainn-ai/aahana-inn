# 🏨 Aahana Inn — Premium Hotel Website

A luxurious, high-performance static website built for **Aahana Inn**, a premium hotel located in **Dumka, Jharkhand**.

The website is designed with a modern **Glassmorphism dark theme**, elegant gold accents, smooth animations, custom cursor interactions, responsive layouts, and interactive 3D elements.

It provides an immersive digital experience for showcasing the hotel's **rooms, restaurant, facilities, gallery, reviews, contact, and reservation features**.

---

## ✨ Features

### 🎨 Premium UI/UX

* Elegant **dark charcoal** background.
* Luxury gold color palette using `#D4AF37`.
* Modern **Glassmorphism** frosted-glass elements.
* Premium typography using:

  * Playfair Display
  * Montserrat
  * Cormorant Garamond
* Smooth transitions and hover interactions.
* Modern card-based layouts.
* Luxury-focused visual design.

### ⚡ Intelligent Preloader

* Custom JavaScript preloader.
* Waits for the primary hero background images to load before displaying the page.
* Helps prevent **Flash of Unstyled Content (FOUC)**.
* Provides a smoother initial loading experience.

### 🖱️ Custom Interactions

* Custom trailing cursor.
* Magnetic button hover effects.
* Smooth hover animations.
* Interactive UI elements.
* Parallax scrolling backgrounds.
* Smooth scrolling effects.

### 📱 Fully Responsive

The website is designed to work across:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

Responsive layouts are implemented using:

* CSS Grid
* CSS Flexbox
* Media Queries
* Mobile-first design principles

### 📩 AJAX Form Submission

The website uses **Web3Forms** for contact and reservation forms.

Features include:

* Asynchronous form submission.
* No page reload.
* No redirect after submission.
* UI state updates handled through JavaScript.
* Direct email delivery to the configured hotel management email.

### 🌌 3D Gallery Experience

The Gallery page includes a **Three.js-powered interactive background** featuring:

* Floating particles.
* Interactive 3D visuals.
* Animated background elements.
* Lightweight visual effects.

---

# 🛠️ Tech Stack

| Technology          | Purpose                                    |
| ------------------- | ------------------------------------------ |
| **HTML5**           | Website structure                          |
| **CSS3**            | Styling, responsive layouts and animations |
| **JavaScript ES6+** | Interactions and application logic         |
| **AOS**             | Scroll animations                          |
| **Swiper.js**       | Image/content sliders                      |
| **FontAwesome 6**   | Icons                                      |
| **Google Fonts**    | Typography                                 |
| **Web3Forms**       | Contact and reservation form handling      |
| **Three.js**        | Interactive 3D graphics                    |

### Core

* **HTML5**
* **CSS3**
* **Vanilla JavaScript (ES6+)**

### Animation

[AOS — Animate On Scroll](https://michalsnik.github.io/aos/)

Used for scroll-based entrance and transition animations.

### Sliders

[Swiper.js](https://swiperjs.com/)

Used for interactive sliders and carousels.

### Icons

[FontAwesome 6](https://fontawesome.com/)

Used throughout the website for interface and feature icons.

### Typography

Google Fonts:

* **Playfair Display**
* **Montserrat**
* **Cormorant Garamond**

### Form Handling

[Web3Forms API](https://web3forms.com/)

Used for AJAX-based contact and reservation form submissions.

### 3D Graphics

[Three.js](https://threejs.org/)

Used on the Gallery page for the interactive floating particle background.

---

# 📂 Project Structure

```text
aahana-inn/
│
├── assets/                  # Images, logos, and local media
│   └── logo.jpeg            # Main hotel logo
│
├── index.html               # Home / Landing Page
├── home.css                 # Homepage specific styles
├── home.js                  # Homepage specific logic
│                            # (Swiper, Web3Forms AJAX)
│
├── rooms.html               # Rooms & Suites Showcase
├── rooms.css                # Rooms page styles
├── rooms.js                 # Rooms page logic
│
├── restaurant.html          # Sandhya Sagar Restaurant & Menu
├── restaurant.css           # Restaurant page styles
├── restaurant.js            # Restaurant page logic
│
├── gallery.html             # Lightbox Gallery & 3D Hero
├── gallery.css              # Gallery page styles
├── gallery.js               # Gallery page logic
│
├── facilities.html          # Amenities & Spa Services
├── facilities.css           # Facilities page styles
├── facilities.js            # Facilities page logic
│
└── reviews.html             # Guest Testimonials & Rating Form
    ├── reviews.css          # Reviews page styles
    └── reviews.js           # Reviews page logic
```

---

# 📄 Website Pages

## 🏠 Home

**File:** `index.html`

The main landing page of Aahana Inn.

Includes:

* Hotel introduction
* Hero section
* Booking/reservation CTA
* Hotel highlights
* Contact form
* Featured content
* Interactive sliders
* Premium animations

---

## 🛏️ Rooms & Suites

**File:** `rooms.html`

Showcases the hotel's available rooms and suites.

Includes:

* Room information
* Room visuals
* Room descriptions
* Accommodation details
* Booking-related actions

---

## 🍽️ Restaurant

**File:** `restaurant.html`

Dedicated page for **Sandhya Sagar Restaurant & Menu**.

Includes:

* Restaurant information
* Food/menu presentation
* Visual content
* Restaurant-related details

---

## 🖼️ Gallery

**File:** `gallery.html`

Interactive hotel image gallery with a **3D hero background**.

Includes:

* Hotel photography
* Lightbox gallery
* Interactive visuals
* Three.js particle background

---

## 🧖 Facilities

**File:** `facilities.html`

Showcases hotel amenities and services.

Includes:

* Hotel facilities
* Amenities
* Spa services
* Service information
* Visual feature sections

---

## ⭐ Reviews

**File:** `reviews.html`

Dedicated guest review and testimonial page.

Includes:

* Guest testimonials
* Ratings
* Review presentation
* Guest rating form

---

# ⚙️ Setup & Installation

This is a **static front-end project**.

No npm installation or build process is required.

## 1. Clone the Repository

Clone the repository or download the source code.

```bash
git clone <YOUR_REPOSITORY_URL>
```

Then enter the project directory:

```bash
cd aahana-inn
```

---

## 2. Open in VS Code

Open the project folder using **Visual Studio Code** or your preferred IDE.

---

## 3. Run Using Live Server

It is recommended to use the **Live Server** extension in VS Code.

Live Server helps ensure that:

* CORS policies do not interfere with local API requests.
* JavaScript modules and external resources work correctly.
* Three.js renders correctly.
* AJAX-based form functionality can be tested properly.

---

## 4. Launch the Website

Open:

```text
index.html
```

using Live Server.

The website will then be available locally in your browser.

---

# 🔑 Configuration — Web3Forms

The contact forms on `index.html` and other pages containing forms use **Web3Forms** to send emails directly to the hotel management.

## Generate an Access Key

1. Go to [Web3Forms](https://web3forms.com/).
2. Generate a new **Access Key** for the target email address.
3. Open `index.html` or any other HTML file containing a form.
4. Locate the hidden `access_key` input field.

Example:

```html
<input
    type="hidden"
    name="access_key"
    value="YOUR_WEB3FORMS_ACCESS_KEY_HERE"
>
```

5. Replace:

```text
YOUR_WEB3FORMS_ACCESS_KEY_HERE
```

with your actual Web3Forms access key.

### Example

```html
<input
    type="hidden"
    name="access_key"
    value="YOUR_ACTUAL_ACCESS_KEY"
>
```

The AJAX logic inside the corresponding `.js` files will automatically handle:

* Asynchronous submission
* Loading state
* Success state
* Error state
* UI updates

without requiring a page reload or redirect.

> ⚠️ **Security Note:** Do not commit sensitive API credentials or private keys to a public GitHub repository. Use the appropriate environment/configuration approach if a key must remain private.

---

# 🎨 Theme Customization

The primary colors, fonts, and layout variables are stored inside the `:root` pseudo-class at the top of each CSS file.

To re-theme the website, update the CSS variables.

## Current Theme Variables

```css
:root {
    /* Brand Colors */
    --primary-gold: #D4AF37;
    --primary-gold-light: #F2D06B;
    --primary-gold-dark: #A68624;

    --gold-gradient: linear-gradient(
        135deg,
        #D4AF37 0%,
        #F4D03F 50%,
        #D4AF37 100%
    );

    /* Backgrounds */
    --black: #050505;
    --charcoal: #0a0c10;
    --dark-gray: #12141a;

    /* Typography */
    --font-display: 'Playfair Display', serif;
    --font-body: 'Montserrat', sans-serif;
}
```

---

## 🎨 Brand Colors

| Variable               | Value     | Purpose                  |
| ---------------------- | --------- | ------------------------ |
| `--primary-gold`       | `#D4AF37` | Main brand gold          |
| `--primary-gold-light` | `#F2D06B` | Light gold accents       |
| `--primary-gold-dark`  | `#A68624` | Dark gold accents        |
| `--black`              | `#050505` | Primary black background |
| `--charcoal`           | `#0a0c10` | Main charcoal background |
| `--dark-gray`          | `#12141a` | Secondary dark sections  |

---

## 🔤 Typography

The project uses the following typography:

### Display Font

```css
--font-display: 'Playfair Display', serif;
```

Used primarily for:

* Headings
* Hero text
* Luxury branding elements

### Body Font

```css
--font-body: 'Montserrat', sans-serif;
```

Used primarily for:

* Paragraphs
* Navigation
* Buttons
* General UI content

Additional typography uses **Cormorant Garamond** where required for the premium visual style.

---

# 📱 Mobile Responsiveness

The website includes dedicated responsive behavior for smaller screens.

## Grid Overrides

Desktop layouts using:

```css
grid-template-columns: repeat(X, 1fr);
```

automatically collapse to:

```css
grid-template-columns: 1fr;
```

through responsive media queries such as:

```css
@media (max-width: 768px) {
    /* Mobile layout */
}
```

---

## 🍔 Mobile Navigation

On smaller screens:

* Primary navigation links are hidden.
* The **Book Now** CTA is hidden where required to prevent UI overlap.
* A custom hamburger menu is displayed.
* The hamburger menu uses the `.menu-toggle` class.
* The toggle opens the `.fullscreen-menu`.

The navigation is optimized around breakpoints below:

```text
1024px
768px
```

This allows the desktop navigation to transition into a dedicated full-screen mobile navigation experience.

---

## ⚡ Mobile Performance

Performance is considered for mobile devices by:

* Minimizing heavy background animations.
* Reducing unnecessary DOM manipulation.
* Using responsive breakpoints.
* Simplifying effects where appropriate.
* Maintaining smooth scrolling performance.

---

# 🧩 Main Interactive Components

## 🖱️ Custom Cursor

The website includes a custom trailing cursor that follows the user's pointer.

It enhances:

* Button interactions
* Hover effects
* Visual feedback
* Overall premium feel

---

## 🧲 Magnetic Buttons

Interactive buttons use magnetic hover behavior.

When the user moves the pointer close to supported buttons, the button responds dynamically to the cursor position.

---

## 🌊 Parallax Backgrounds

Selected background elements use parallax scrolling to create depth and improve the visual experience.

---

## 🎞️ AOS Animations

AOS is used for scroll-triggered animations.

This allows sections to animate as they enter the viewport.

---

## 🎠 Swiper Sliders

Swiper.js powers interactive content and image sliders throughout the website.

---

## 🌌 Three.js Gallery Background

The Gallery page uses Three.js to create an interactive floating particle environment.

The effect provides an additional visual layer without changing the main content structure.

---

# 🏗️ Architecture

The project follows a simple page-specific front-end architecture.

Each major page has its own:

* HTML file
* CSS file
* JavaScript file

For example:

```text
rooms.html
rooms.css
rooms.js
```

This keeps page-specific styling and logic separated and makes the project easier to maintain.

---

# 🔄 Form Workflow

The general form workflow is:

```text
User fills the form
        ↓
User submits the form
        ↓
JavaScript intercepts submission
        ↓
AJAX request sent to Web3Forms
        ↓
Web3Forms processes the request
        ↓
Hotel management receives the message
        ↓
Website updates the UI
```

No traditional page reload or redirect is required.

---

# 🚀 Performance & User Experience

The website focuses on:

* Fast initial rendering
* Smooth scrolling
* Responsive layouts
* Optimized animations
* Minimal unnecessary DOM operations
* Responsive image/background handling
* Smooth mobile navigation
* Interactive visual elements

The custom preloader specifically waits for important hero imagery to reduce the chance of users seeing an incomplete hero section during initial loading.

---

# 🌐 Browser Compatibility

The website is designed for modern browsers supporting:

* HTML5
* CSS3
* ES6+ JavaScript
* Modern CSS Grid
* CSS Flexbox
* Web APIs required by Three.js and Web3Forms

Recommended browsers include:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

# 🏢 Business Details

| Detail         | Information                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| **Property**   | Aahana Inn                                                                         |
| **Proprietor** | Manish Kumar Gupta                                                                 |
| **Location**   | Dumka Bypass, Near Sandhya Sagar Restaurant, Balia Dangal, Dumka, Jharkhand 814110 |

### 📍 Location

**Aahana Inn**
Dumka Bypass, Near Sandhya Sagar Restaurant
Balia Dangal
Dumka, Jharkhand — **814110**

---

# 🏨 About Aahana Inn

**Aahana Inn** is a premium hotel located in **Dumka, Jharkhand**, designed to provide guests with a comfortable and visually elegant hospitality experience.

The website acts as the hotel's digital presence, allowing visitors to explore:

* Rooms & Suites
* Restaurant
* Facilities
* Gallery
* Guest Reviews
* Contact & Reservation options

---

# 📸 Website Highlights

The project combines several modern web technologies to create a premium hospitality experience:

```text
Luxury Dark UI
      +
Gold Branding
      +
Glassmorphism
      +
Smooth Animations
      +
Custom Cursor
      +
Parallax Effects
      +
Responsive Design
      +
AJAX Forms
      +
Three.js
      ↓
Premium Hotel Website
```

---

# 🔮 Future Improvements

Possible future enhancements include:

* Online room availability checking
* Real-time booking system
* Payment gateway integration
* Hotel management dashboard
* Admin panel
* Dynamic room management
* Dynamic restaurant menu
* Guest booking history
* Email booking confirmations
* WhatsApp booking integration
* Google Maps integration
* Advanced SEO
* Schema.org hotel structured data
* Performance optimization
* Progressive Web App (PWA) support

---

# 📜 License

This project was developed for **Aahana Inn**.

All hotel-specific branding, business information, images, logos, and other proprietary content belong to their respective owners.

---

# 👨‍💻 Developer

**Aahana Inn — Premium Hotel Website**

Built using:

```text
HTML5
CSS3
JavaScript ES6+
AOS
Swiper.js
FontAwesome
Google Fonts
Web3Forms
Three.js
```

---

## ⭐ Project Summary

> **Aahana Inn** is a premium, responsive static hotel website combining modern web technologies with a luxury-focused visual design. It features Glassmorphism UI, gold branding, smooth animations, custom interactions, AJAX-powered forms, responsive navigation, and an interactive Three.js gallery experience.

---

**Made with modern web technologies for Aahana Inn, Dumka, Jharkhand.**
