import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // PDF libraries — heaviest, isolated so they never block other routes
          if (id.includes('@react-pdf') || id.includes('@ag-media')) {
            return 'vendor-pdf';
          }
          // Chart libraries
          if (id.includes('recharts') || id.includes('d3-') || id.includes('victory-vendor')) {
            return 'vendor-charts';
          }
          // TanStack Query (state management)
          if (id.includes('@tanstack/react-query')) {
            return 'vendor-query';
          }
          // TanStack Table
          if (id.includes('@tanstack/react-table')) {
            return 'vendor-table';
          }
          // UI primitives & styling utilities
          if (
            id.includes('@radix-ui') ||
            id.includes('node_modules/radix-ui') ||
            id.includes('lucide-react') ||
            id.includes('sonner') ||
            id.includes('next-themes') ||
            id.includes('class-variance-authority') ||
            id.includes('tailwind-merge') ||
            id.includes('clsx')
          ) {
            return 'vendor-ui';
          }
          // Core React runtime
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router')
          ) {
            return 'vendor-react';
          }
          // General utilities
          if (
            id.includes('node_modules/axios') ||
            id.includes('node_modules/date-fns') ||
            id.includes('node_modules/zod') ||
            id.includes('node_modules/js-cookie') ||
            id.includes('node_modules/react-hook-form') ||
            id.includes('node_modules/@hookform') ||
            id.includes('node_modules/react-day-picker')
          ) {
            return 'vendor-utils';
          }
        },
      },
    },
  },
});
