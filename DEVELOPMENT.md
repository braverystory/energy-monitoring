# Hospital Energy Monitoring - Development Guide

## Getting Started for Developers

### Prerequisites Setup

1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` (should be 18.17+)

2. **Install a Package Manager**
   - npm (comes with Node.js)
   - Or install yarn: `npm install -g yarn`
   - Or install pnpm: `npm install -g pnpm`

3. **Install Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Configure: 
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your.email@example.com"
     ```

### Initial Setup

```bash
# Navigate to project
cd d:\Development\OnConnext\ON0052_Energy_Monitoring

# Install dependencies
npm install

# Copy environment variables
copy .env.example .env.local

# Run development server
npm run dev
```

### Development Workflow

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:3000`
   - Hot reload enabled - changes reflect immediately

2. **Project Structure Overview**:
   ```
   src/
   ├── app/          # Pages and API routes
   ├── components/   # Reusable UI components
   └── lib/          # Utilities and types
   ```

3. **Making Changes**:
   - Edit components in `src/components/`
   - Modify pages in `src/app/`
   - Update styles with Tailwind classes
   - Changes auto-reload in browser

### Common Tasks

#### Adding a New Page

1. Create file in `src/app/newpage/page.tsx`:
   ```typescript
   export default function NewPage() {
     return <div>New Page Content</div>
   }
   ```

2. Add to navigation in `src/components/Sidebar.tsx`

#### Creating a New Component

1. Create file in `src/components/MyComponent.tsx`:
   ```typescript
   export default function MyComponent() {
     return <div>My Component</div>
   }
   ```

2. Import and use: `import MyComponent from '@/components/MyComponent'`

#### Adding an API Route

1. Create file in `src/app/api/myroute/route.ts`:
   ```typescript
   import { NextResponse } from 'next/server'
   
   export async function GET() {
     return NextResponse.json({ data: 'Hello' })
   }
   ```

2. Access at: `http://localhost:3000/api/myroute`

### Styling with Tailwind CSS

Use Tailwind utility classes directly in JSX:

```typescript
<div className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
  Click me
</div>
```

Common patterns:
- Layout: `flex`, `grid`, `space-y-4`
- Spacing: `p-4` (padding), `m-4` (margin)
- Colors: `bg-blue-500`, `text-gray-900`
- Responsive: `md:flex`, `lg:grid-cols-3`

### TypeScript Tips

- Define types in `src/lib/types.ts`
- Use interfaces for objects
- Enable strict mode for type safety
- IDE will show type errors

### Debugging

1. **Browser Console**: F12 in browser
2. **VS Code Debugger**: 
   - Set breakpoints
   - Press F5 to start debugging
3. **Console.log**: `console.log('Debug:', variable)`

### Testing Your Changes

1. **Visual Testing**: Check in browser at localhost:3000
2. **Responsive Testing**: Use browser dev tools (F12 → Device toolbar)
3. **Check Console**: Look for errors in browser console

### Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

### Troubleshooting

#### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

#### Build Errors
```bash
# Check for type errors
npm run build

# Check for linting issues
npm run lint
```

### Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run linter

# Package Management
npm install <package>    # Add dependency
npm install -D <package> # Add dev dependency
npm update              # Update dependencies
```

### Best Practices

1. **Component Design**:
   - Keep components small and focused
   - Use TypeScript interfaces
   - Add comments for complex logic

2. **State Management**:
   - Use React hooks (useState, useEffect)
   - Keep state close to where it's used
   - Use Context for shared state

3. **Performance**:
   - Use `'use client'` only when needed
   - Optimize images with Next.js Image component
   - Minimize API calls

4. **Code Quality**:
   - Run linter before committing
   - Write descriptive component names
   - Keep files under 300 lines

### Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Getting Help

1. Check browser console for errors
2. Review error messages carefully
3. Search the error on Google/Stack Overflow
4. Check Next.js documentation
5. Ask team members

### Next Steps

1. Explore the existing code
2. Try modifying a component
3. Add a new feature
4. Test your changes
5. Commit your work

Happy coding! 🚀
