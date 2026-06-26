# Digital Elites

The official digital yearbook of the **Department of Computer Engineering, Abubakar Tafawa Balewa University (ATBU)**. Celebrating Excellence. Preserving Legacy.

This project is a modern, responsive web application designed to archive and showcase the student profiles, memories, and milestones of the graduating Class of 2026.

---

## Features

- **Dynamic Finalist Marquee**: An infinite-loop circular scrolling marquee displaying finalists, powered dynamically by Sanity CMS profile data.
- **Finalist of the Day**: A spotlight card featuring a daily selected graduate complete with their personal quote, nickname, and profile photo.
- **Searchable Finalists Directory**: Client-side filtering mechanism to search graduates by name/nickname and filter by gender.
- **Interactive Class Gallery**: A responsive image and media grid displaying graduation memories, with support for popup video modal players.
- **Graduation Countdown Timer**: Real-time interactive ticker counting down days, hours, minutes, and seconds, with target dates managed dynamically via the CMS.
- **Department & Developer About Section**: Rich presentation layer detailing department history, academic leadership starring HOD, Exam Officer, Patron ACCES, Chief Technogist, achievements, and developer portfolios.
- **Personalized Shareable Profiles**: Share buttons on student profiles that automatically copy the profile link to the clipboard with visual success feedback.
- **Dynamic SEO Optimization**: Next.js Metadata API integration rendering custom page titles, OpenGraph images, and dynamic preview cards (using the student's actual photo) when links are pasted on social platforms.
- **Fully Responsive Design**: Mobile and tablet optimization ensuring correct scaling on foldables, handsets, and desktop monitors.

---

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router & React Server Components)
- **CMS (Backend)**: [Sanity.io](https://www.sanity.io/) (Headless CMS for structure and asset delivery)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Styling**: Vanilla CSS (TailwindCSS configuration enabled for additional styling needs)

---

## Recent Upgrades & Custom Integrations

1. **Dynamic Sanity Integration**: 
   - Replaced static mocked arrays with live fetching mechanisms utilizing Sanity query clients.
   - Incorporated `urlFor` CDN image builders for optimal page load speed and asset resolution.
2. **Brace-Syntax & Responsive Restructures**:
   - Fixed syntax errors on custom CSS layout declarations.
   - Refactored CTA buttons to support proper visual action hierarchy (primary vs. secondary outline) and responsive layout stacking.
   - Upgraded developer branding cards with interactive hover effects and scaling transitions.
3. **Next.js Metadata Splitting**:
   - Resolved client-side/server-side metadata boundaries by separating interactive features into designated wrapper files (`AboutClient.jsx`) while maintaining server-side search engine friendliness.

---

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd digital-elites
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env.local` file at the root:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

### Running the Application

- **Development Server**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  npm run start
  ```
