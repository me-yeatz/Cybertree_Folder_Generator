import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react()],
        base: './', // CRITICAL for Electron: ensures assets are loaded relatively
        define: {
            // Only expose necessary environment variables for security
            'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY || ''),
            'import.meta.env.VITE_AI_BASE_URL': JSON.stringify(env.VITE_AI_BASE_URL || ''),
            'import.meta.env.VITE_AI_MODEL': JSON.stringify(env.VITE_AI_MODEL || ''),
            'import.meta.env.VITE_AI_API_KEY': JSON.stringify(env.VITE_AI_API_KEY || ''),
        }
    }
})
