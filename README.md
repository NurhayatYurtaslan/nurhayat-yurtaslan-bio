# Nurhayat Yurtaslan - Bio Website

A futuristic, responsive bio website built with Next.js, featuring smooth animations and a cyberpunk-inspired design for a mobile developer portfolio.

## 🚀 Features

- **Futuristic Design**: Cyberpunk-inspired UI with neon colors and glowing effects
- **Responsive Layout**: Optimized for all device sizes
- **Smooth Animations**: Framer Motion powered animations
- **JSON Data**: All content stored in a single JSON file for easy updates
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Interactive Elements**: Hover effects, loading screens, and smooth transitions
- **Organized Structure**: Clean and maintainable code organization
- **Design System**: Centralized colors, typography, and design tokens

## 📋 Sections

- **Header**: Personal info with social media links
- **Objective**: Professional goals and aspirations as a mobile developer
- **Education**: Academic background with timeline
- **Skills**: Technical skills and personal qualities with progress bars
- **Experience**: Professional work history in mobile development
- **Projects**: Portfolio projects with GitHub links
- **Certifications**: Professional certifications
- **References**: Contact information for references

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Orbitron, Rajdhani

## 📁 Project Structure

```
src/
├── app/          # Next.js app directory
│   ├── layout.tsx
│   └── page.tsx
├── components/   # React components
│   ├── Header.tsx
│   ├── LoadingScreen.tsx
│   ├── Objective.tsx
│   ├── Education.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Certifications.tsx
│   └── References.tsx
├── data/         # JSON data files
│   └── bio.json
├── styles/       # CSS files and design system
│   ├── globals.css
│   └── design-system.ts
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## 🎨 Design System

The project uses a centralized design system located in `src/styles/design-system.ts`:

- **Colors**: Primary, background, text, and status colors
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Shadows**: Glow effects and hover states
- **Gradients**: Predefined gradient combinations
- **Animations**: Duration and easing functions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nurhayat-yurtaslan-bio.git
   cd nurhayat-yurtaslan-bio
   ```

2. **Run the setup script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Or install manually**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3002](http://localhost:3002)

## 🔧 Configuration

### Updating Content

All content is stored in `src/data/bio.json`. You can easily update:

- Personal information
- Social media links
- Education history
- Work experience
- Projects (with GitHub URLs)
- Skills
- Certifications
- References

### Customizing Design

The design system can be customized in `src/styles/design-system.ts`:

```typescript
export const colors = {
  primary: {
    blue: '#00d4ff',
    purple: '#8b5cf6',
    pink: '#ec4899',
    accent: '#00ff88',
  },
  // ... more colors
}
```

### Adding New Sections

1. Add the section data to `src/data/bio.json`
2. Create a new component in the `src/components/` directory
3. Import and add the component to `src/app/page.tsx`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design Features

- **Cyber Grid Background**: Subtle grid pattern for futuristic feel
- **Neon Glow Effects**: Glowing borders and text effects
- **Gradient Text**: Animated gradient text for headings
- **Floating Animations**: Smooth floating animations for cards
- **Custom Scrollbar**: Styled scrollbar with gradient colors
- **Loading Screen**: Animated loading screen with dots

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Name**: Nurhayat Yurtaslan
- **Title**: Mobile Developer
- **Email**: nurhayat@example.com
- **Location**: Turkey

---

Built with ❤️ using Next.js and modern web technologies.