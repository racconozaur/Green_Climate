// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('flowbite/plugin')],
// }

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'green-glow': '0 0 15px 5px rgba(74, 222, 128, 0.5)',
        'red-glow': '0 0 15px 5px rgba(74, 222, 128, 0.5)',
      }
    },
  },
  plugins: [],
});