/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor: "text-gray-700",
        textColorDark: "text-gray-300",
        borderColor: "border-gray-300",
        borderColorDark: "border-gray-600",
        bgColor: "bg-white",
        bgColorDark: "bg-gray-800",
        bgColor2: "bg-gray-200",
        bgColor2Dark: "bg-gray-700",
        inputTextColor: "text-gray-900",
        inputTextColorDark: "text-gray-100",
        iconColor: "text-gray-400",
        iconColorDark: "text-gray-500",
        itemsColor: "text-gray-800",
        itemsColorDark: "text-gray-200",
        itemsDescColor: "text-gray-500",
        itemsDescColorDark: "text-gray-400",
      },
      fontFamily: {
        hand: ["Handlee", "cursive"], // Özel bir isim verdik ('hand')
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "spin-reverse": "spin-reverse 25s linear infinite",
      },
      keyframes: {
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
