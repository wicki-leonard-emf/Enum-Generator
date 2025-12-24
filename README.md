# Enum Generator

A powerful web-based tool for generating extensive username and password enumerations from input terms. Perfect for penetration testing, security research, and password list generation.

## Features

- **Multiple Generation Modes**: Choose between Simple, Medium, and Hard modes for different levels of enumeration complexity
- **Smart Capitalization**: Automatically generates variations with different capitalization patterns (lowercase, uppercase, title case)
- **Flexible Separators**: Supports multiple separators (none, underscore, hyphen, dot) between terms
- **Number Variations**: Adds common numbers and years with configurable separators
- **Special Characters**: Includes special character variations (!, @, #, $, *)
- **Common Patterns**: Generates common patterns like "admin", "user" prefixes/suffixes
- **Leet Speak**: Hard mode includes leet speak transformations (a→4, e→3, i→1, etc.)
- **Animated Background**: Modern pixel-based background animation
- **Export Functionality**: Download generated enumerations as a text file
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Installation

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/wicki-leonard-emf/Enum-Generator.git
cd Enum-Generator
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Basic Usage

1. **Enter Terms**: Type a term (e.g., "john", "admin", "2023") and press Enter or click the + button
2. **Add Multiple Terms**: Continue adding terms to create more complex combinations
3. **Select Mode**: Choose your generation mode:
   - **Simple**: Essential variations with light combinations (~100-500 results)
   - **Medium**: Balanced combinations with common additions (~500-2000 results)
   - **Hard**: Exhaustive exploration with all variations (~2000+ results)
4. **Generate**: Click "GENERATE ENUMERATIONS" to create the list
5. **Download**: Click "DOWNLOAD" to save the results as a text file

### Generation Modes Explained

#### Simple Mode
- Basic capitalization variants (lowercase, uppercase, title case)
- Limited number combinations (1, 123)
- Basic special character (!)
- Perfect for quick, targeted lists

#### Medium Mode
- All simple mode features
- Two-term combinations with all separators
- Extended number set (1-3, 12, 123, 2024, 2025)
- More special characters (!, @, #)
- Common patterns (admin/user prefixes/suffixes)

#### Hard Mode
- All medium mode features
- Three-term combinations
- Extended number set with padding (01, 00, 99)
- All special characters (!, @, #, $, *)
- Leet speak transformations
- Maximum variation generation

### Example

**Input Terms**: `john`, `doe`, `2024`

**Simple Mode Sample Output**:
```
john
John
JOHN
doe
Doe
DOE
2024
john1
john123
john!
...
```

**Hard Mode Sample Output** (includes all of Simple + Medium + extensive combinations):
```
john
John
JOHN
johndoe
john_doe
john-doe
john.doe
johndoe2024
john_doe_2024
admin_john
john_admin
j0hn
J0HN
4dmin
...
```

## Project Structure

```
Enum-Generator/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/              # React components
│   ├── enumeration-generator.tsx  # Main generator logic
│   ├── pixel-background.tsx       # Animated background
│   └── ui/                  # UI component library
├── lib/                     # Utility functions
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Key Components

### EnumerationGenerator
The main component handling term input, mode selection, and enumeration generation. Located in `components/enumeration-generator.tsx`.

**Key Functions**:
- `buildEnumerations(terms, mode)`: Generates all enumerations based on input terms and mode
- `addTerm()`: Adds a new term to the list
- `removeTerm(term)`: Removes a term from the list
- `generateEnumerations()`: Triggers the generation process
- `downloadList()`: Exports results to a text file

### PixelBackground
Creates an animated background with floating pixels. Located in `components/pixel-background.tsx`.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
npm run start
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Vercel Analytics**: Web analytics

## Security Note

This tool is designed for legitimate security testing and research purposes only. Always ensure you have proper authorization before using generated enumerations for penetration testing or security assessments.

## License

This project is licensed under the terms specified in the LICENSE file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Disclaimer**: This tool should only be used for authorized security testing and educational purposes. Unauthorized access to systems is illegal.
