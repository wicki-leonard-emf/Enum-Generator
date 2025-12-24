# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive JSDoc documentation for all components and functions
- Copy to clipboard functionality for generated enumerations
- Clear all button to reset terms and results
- Input validation with max term limit (10 terms)
- Max character length for input terms (50 characters)
- Case-insensitive duplicate detection
- Improved error handling in generation and download functions
- Date-stamped download filenames
- Visual feedback for copy operation
- Term counter with max limit indicator
- CONTRIBUTING.md with development guidelines
- CHANGELOG.md to track project changes
- Comprehensive README with usage examples
- Proper metadata tags for SEO
- Animated pixel background with CSS animations

### Changed
- Standardized UI language to English (was mixed French/English)
- Improved generation performance with requestAnimationFrame
- Enhanced user feedback with disabled states and tooltips
- Updated mode descriptions for clarity
- Improved accessibility with ARIA labels
- Better error handling with try-catch blocks

### Fixed
- Missing CSS styles for pixel background animation
- Unused font imports causing build errors
- Unused variable warnings in layout.tsx and use-toast.ts
- ESLint warnings throughout the codebase
- Duplicate CSS files (removed styles/globals.css)
- Missing metadata in layout.tsx

### Removed
- Unused Geist, Geist Mono, and Source Serif 4 font imports
- Duplicate styles/globals.css file
- Unused actionTypes constant in use-toast.ts

## [0.1.0] - 2025-12-24

### Initial Release
- Username and password enumeration generator
- Three generation modes: Simple, Medium, Hard
- Multiple capitalization variations
- Flexible separator support
- Number and special character variations
- Common pattern generation (admin, user prefixes)
- Leet speak transformations (hard mode)
- Download functionality
- Responsive design with Tailwind CSS
- Modern animated pixel background
- Dark/light theme support

[Unreleased]: https://github.com/wicki-leonard-emf/Enum-Generator/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/wicki-leonard-emf/Enum-Generator/releases/tag/v0.1.0
