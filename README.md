# Modern React Stack Demo

A comprehensive demonstration of modern React development using the latest tools and best practices.

## 🚀 Technology Stack

- **⚛️ React 19** - Latest React with new features and improvements
- **⚡ Vite** - Fast build tool and development server
- **📘 TypeScript** - Type-safe JavaScript development
- **🔄 TanStack Query** - Powerful server state management with caching
- **🐻 Zustand** - Lightweight and flexible state management
- **🎨 shadcn/ui** - Beautiful and accessible UI components
- **🎭 Tailwind CSS v4** - Utility-first CSS framework (latest version)
- **🌐 Axios** - HTTP client for API requests
- **🎯 Lucide React** - Beautiful icons

## ✨ Features

### State Management
- **Zustand Store**: Global counter and todos management
- **Server State**: TanStack Query for API data fetching with caching
- **Optimistic Updates**: Instant UI feedback with background synchronization

### UI Components
- **shadcn/ui Components**: Button, Card, and other beautiful components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Ready**: CSS variables for theming support
- **Icon System**: Lucide React icons throughout the app

### Data Fetching
- **RESTful API**: Integration with JSONPlaceholder API
- **Caching Strategy**: Intelligent caching with TanStack Query
- **Loading States**: Proper loading indicators and error handling
- **Mutations**: Create, update, and delete operations

### Developer Experience
- **TypeScript**: Full type safety across the application
- **Path Mapping**: Clean imports with `@/` alias
- **Hot Module Replacement**: Instant development feedback
- **DevTools**: TanStack Query DevTools for debugging

## 🛠️ Installation & Setup

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd modern-react-app
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # shadcn/ui components
│       ├── button.tsx   # Button component
│       └── card.tsx     # Card components
├── hooks/
│   └── usePosts.ts      # TanStack Query hooks
├── lib/
│   ├── api.ts           # Axios API functions
│   └── utils.ts         # Utility functions
├── providers/
│   └── QueryProvider.tsx # TanStack Query provider
├── store/
│   └── useStore.ts      # Zustand store
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## 🎯 Key Implementation Details

### Tailwind CSS v4 Configuration
This project uses Tailwind CSS v4 with the new CSS-based configuration:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.205 0 0);
  --color-background: oklch(1 0 0);
  /* ... more theme variables */
}

@variant dark (&:is(.dark *)) {
  /* Dark mode variants */
}
```

### Zustand Store Pattern
```typescript
export const useAppStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  // ... more actions
}))
```

### TanStack Query Hooks
```typescript
export function usePosts() {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: postsAPI.getPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
```

### API Layer with Axios
```typescript
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
})

export const postsAPI = {
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts')
    return response.data
  },
  // ... more API functions
}
```

## 🌟 Features Demonstrated

1. **Global State Management** - Counter and todos using Zustand
2. **Server State Management** - Posts fetching with TanStack Query
3. **Component Library** - shadcn/ui components with proper theming
4. **HTTP Client** - Axios with interceptors and error handling
5. **Type Safety** - Full TypeScript integration
6. **Modern CSS** - Tailwind CSS v4 with CSS-based configuration
7. **Developer Tools** - React Query DevTools integration

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vite.dev/guide/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using modern React development tools and best practices.
