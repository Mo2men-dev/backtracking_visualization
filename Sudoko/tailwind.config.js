/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
            "fade-in-right": {
                "0%": {
                    opacity: "0",
                    transform: "translateX(-50px)",
                },
                "100%": {
                    opacity: "1",
                    transform: "translateX(0)",
                },
            }
        },

        animation: {
            "fade-in-right": "fade-in-right .5s ease-out",
        },
      },
    },
    plugins: [],
}