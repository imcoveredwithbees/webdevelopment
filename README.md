# Book Haven Bookstore Website

A complete 4-page responsive website for Book Haven Bookstore, featuring e-commerce functionality, contact forms, and a discount calculator.

---

## Introduction

**Client Name:** Book Haven Bookstore

Book Haven is an independent bookstore that has been serving book lovers since 2010. This website serves as their digital storefront, allowing customers to browse their collection, add items to a shopping cart, contact the store, and learn about membership discounts.

### Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Deep Navy | `#2C3E50` | Primary color, headers, navigation |
| Saddle Brown | `#8B4513` | Secondary color, accents, links |
| Antique Gold | `#D4AF37` | Accent color, CTAs, highlights |
| Warm White | `#FAF8F5` | Background (paper-like texture) |
| Near Black | `#1A1A1A` | Body text |
| Gray | `#6B7280` | Muted text, secondary info |
| Purple | `#7C3AED` | Discount/special offers highlight |

### Typography

- **Headings:** Playfair Display (serif) - Elegant and literary feel
- **Body Text:** Source Sans 3 (sans-serif) - Clean and readable
- **Font Colors:** Near Black (#1A1A1A) for body, Deep Navy (#2C3E50) for headings

---

## Website Structure and Content

### 1) Home Page (index.html)

**Features:**
- Hero section with welcoming message and call-to-action
- Featured Books grid showcasing 4 curated titles
- "Why Choose Us" section with 4 value propositions (Curated Selection, Gift Wrapping, Book Clubs, Fast Delivery)
- Newsletter subscription form with email validation
- Responsive navigation with mobile hamburger menu
- Shopping cart modal with add/remove functionality

### 2) Gallery Page (gallery.html)

**Features:**
- Full book collection display with 12 titles
- Category filter buttons (All, Fiction, Non-Fiction, Mystery, Romance, Sci-Fi)
- Each book card shows: cover image, title, author, category, price
- "Add to Cart" functionality for each book
- Shopping cart modal accessible from navigation
- Responsive grid layout that adapts to screen size

### 3) About Us Page (about.html)

**Features:**
- About hero section with store overview
- "Our Story" section with store history
- "Our Values" section with 4 core values (Passion for Reading, Community First, Sustainability, Inclusive Curation)
- "Meet Our Team" section featuring 3 team members
- Contact information section with address, email, phone, hours
- Contact form with fields: Name, Email, Subject (dropdown), Message
- Form validation with error/success messages
- Data stored in localStorage

### 4) Custom Page - Discounts (discounts.html)

**Features:**
- Animated hero section with discount badge
- Interactive discount calculator with:
  - Book price input
  - Quantity input (bulk discounts: 5+ = 5%, 10+ = 10%)
  - Membership level selector (None, Reader 5%, Bookworm 10%, Elite 15%)
  - Real-time calculation display
- Membership tiers comparison (3 tiers with benefits list)
- Special offers section with 4 promotional codes
- Bulk order discount information

---

## Website Design and Styling

### Overall Design

The website follows a warm, literary aesthetic that evokes the feeling of a cozy independent bookstore:

- **Header:** White background with gold accent border, sticky navigation
- **Hero Sections:** Deep navy gradient with subtle pattern overlay
- **Body:** Warm white background resembling paper
- **Cards:** White with subtle shadows, rounded corners
- **Footer:** Deep navy background with gold accents

### Accessibility (3+ Rationales)

1. **Skip Link Navigation**
   - Each page includes a "Skip to main content" link that becomes visible on focus
   - Allows keyboard users to bypass repetitive navigation
   - Positioned at top of page, styled to appear on focus

2. **ARIA Labels and Roles**
   - All interactive elements have appropriate ARIA labels
   - Modals include `role="dialog"` and `aria-modal="true"`
   - Form groups include `aria-describedby` for hints
   - Buttons have descriptive `aria-label` attributes
   - Navigation uses `aria-label="Main navigation"`

3. **Color Contrast Compliance**
   - All text meets WCAG AA contrast requirements
   - Primary text (#1A1A1A) on background (#FAF8F5) = 16:1 ratio
   - White text on navy (#2C3E50) = 12:1 ratio
   - Tested with Adobe Color Accessibility Tool

4. **Semantic HTML Structure**
   - Proper heading hierarchy (h1 → h2 → h3)
   - `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>` elements
   - Form inputs have associated `<label>` elements

5. **Reduced Motion Support**
   - `prefers-reduced-motion` media query disables animations
   - Ensures accessibility for users with vestibular disorders

### Responsive Web Design (3+ Elements)

1. **Fluid Grid System**
   - CSS Grid with `auto-fit` and `minmax()` for book cards
   - Cards automatically reflow based on available space
   - `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`

2. **Mobile Navigation**
   - Hamburger menu toggle for screens < 768px
   - Slide-in navigation panel from right
   - Smooth transitions with CSS transforms
   - Touch-friendly tap targets (min 44px)

3. **Responsive Typography**
   - CSS `clamp()` function for fluid font sizes
   - `font-size: clamp(2rem, 5vw, 3.5rem)` for h1
   - Maintains readability across all screen sizes

4. **Flexible Images**
   - `max-width: 100%` prevents horizontal overflow
   - `object-fit: cover` maintains aspect ratios
   - `loading="lazy"` for performance optimization

5. **Container Queries**
   - Max-width container (1200px) with auto margins
   - Responsive padding that adjusts on smaller screens
   - Breakpoints: 992px (tablet), 768px (mobile), 480px (small mobile)

---

## Website Functionality

### Navigation Bar

- Sticky header that stays at top while scrolling
- Logo links to home page
- Active page is highlighted with underline animation
- Cart button shows current item count
- Mobile: Hamburger menu with slide-in panel
- Keyboard accessible with visible focus states

### Subscribe Feature

- Email input with placeholder text
- HTML5 email validation (`type="email"`, `required`)
- JavaScript validation for additional checks
- Success/error message display
- Auto-hide message after 5 seconds

### Add to Cart Feature

- Click "Add to Cart" button on any book
- Alert confirms item added with book title
- Cart count updates in navigation
- Quantity tracking for duplicate items
- Data persisted in sessionStorage

### View Cart Feature

- Click cart button in navigation
- Modal overlay with cart contents
- Each item shows: image, title, author, price × quantity
- Remove individual items with "✕ Remove" button
- Running total calculation
- Empty cart state with message

### Contact Us Feature

- Form fields: Name, Email, Subject (dropdown), Message
- Client-side validation with error highlighting
- Invalid inputs get red border
- Error/success messages displayed
- Form data saved to localStorage
- Console logging for verification

---

## Web Data Storage

### Shopping Cart (sessionStorage)

**Key:** `bookHavenCart`

**Structure:**
```javascript
[
  {
    "id": "gallery-1",
    "title": "The Midnight Library",
    "author": "by Matt Haig",
    "price": 16.99,
    "image": "images/book-1.jpg",
    "quantity": 1
  }
]
```

**Features:**
- Persists during browser session
- Clears when browser is closed
- `orderProcessed` flag prevents duplicate orders
- Cart count synced across all pages

### Contact Form (localStorage)

**Key:** `bookHavenContacts`

**Structure:**
```javascript
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "general",
    "message": "I love your bookstore!",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

**Features:**
- Persists indefinitely until manually cleared
- Accumulates all submissions
- Includes timestamp for each entry
- Logged to console for verification

---

## Customization (Discounts Page)

The custom page features an **Interactive Discount Calculator** that allows customers to:

1. **Enter Book Price** - Input the original price of a book
2. **Select Quantity** - Choose number of books (triggers bulk discounts)
3. **Choose Membership** - Select membership level for additional savings
4. **View Calculated Price** - See final price with all discounts applied

**Discount Logic:**
- Membership discounts: 0%, 5%, 10%, or 15%
- Bulk discounts: 5+ books = 5%, 10+ books = 10%
- Discounts stack together for maximum savings
- Real-time calculation on input change

---

## File Structure

```
bookhaven/
├── index.html          # Home page
├── gallery.html        # Book gallery page
├── about.html          # About us page
├── discounts.html      # Custom discounts page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Image assets folder
│   ├── book-1.jpg      # Book cover images
│   ├── book-2.jpg
│   ├── ...
│   ├── book-12.jpg
│   ├── team-1.jpg      # Team member photos
│   ├── team-2.jpg
│   ├── team-3.jpg
│   └── store-interior.jpg
└── README.md           # This documentation
```

---

## Image Requirements

Place the following images in the `images/` folder:

| Filename | Description | Recommended Size |
|----------|-------------|------------------|
| book-1.jpg through book-12.jpg | Book cover images | 300x450px |
| team-1.jpg, team-2.jpg, team-3.jpg | Team member headshots | 400x500px |
| store-interior.jpg | Store interior photo | 800x600px |

---

## Browser Compatibility

Tested and compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Technologies Used

- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, Custom Properties, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Playfair Display, Source Sans 3)
- Web Storage API (localStorage, sessionStorage)

---

## Credits

- Fonts: [Google Fonts](https://fonts.google.com)
- Color Accessibility Testing: [Adobe Color](https://color.adobe.com/create/color-accessibility)
- Design: Custom design following bookstore aesthetic

---

© 2024 Book Haven Bookstore. All rights reserved.
