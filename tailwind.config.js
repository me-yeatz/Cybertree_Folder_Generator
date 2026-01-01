/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    gold: '#ffdb89',
                    black: '#050505',
                    gray: '#1f1f22',
                    dark: '#0f0f10'
                }
            },
            fontFamily: {
                'tech': ['"Rajdhani"', 'sans-serif'],
                'mono': ['"Fira Code"', 'monospace'],
            },
            boxShadow: {
                'neon': '0 0 5px #ffdb89, 0 0 10px #ffdb89',
                'neon-subtle': '0 0 5px rgba(255, 219, 137, 0.3)',
            },
            animation: {
                'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
