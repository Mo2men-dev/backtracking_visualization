/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
            "fade-in": {
                "0%": {
                    opacity: "0",
                },
                "100%": {
                    opacity: "1",
                },
            },
            "fade-in-right": {
                "0%": {
                    opacity: "0",
                    transform: "translateX(-50px)",
                },
                "100%": {
                    opacity: "1",
                    transform: "translateX(0)",
                },
            },
            "fade-in-top": {
                "0%": {
                    opacity: "0",
                    transform: "translateY(-50px)",
                },
                "100%": {
                    opacity: "1",
                    transform: "translateY(0)",
                }
            },
            "border-fade-to-green": {
                "0%": {
                    backgroundColor: "#50C878",
                    borderColor: "#F3F4F6",
                },
                "100%": {
                    borderColor: "#50C878",
                    backgroundColor: "none",
                },
            },
        },

        animation: {
            "fade-in": "fade-in 1s ease-out 2s forwards",
            "fade-in-right": "fade-in-right .5s ease-out forwards",
            "fade-in-right-delay": "fade-in-right .5s ease-out .5s forwards",
            "fade-in-top": "fade-in-top 1s ease-out 1s forwards",
            "border-fade-to-green": "border-fade-to-green .5s linear forwards",
        },

        fontFamily: {
            'ubuntu': ['Ubuntu Mono', 'monospace'],
            'ptserif': ['PT Serif', 'serif'],
        },
      },
    },
    plugins: [],
}