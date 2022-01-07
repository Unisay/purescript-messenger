# Code-generator for Tailwind

Generates PS module with all Tailwind classes

```
npm run bundle
```

creates `dist/index.js`, then 

```
node --stack-size=65500 dist/index.js -i ../assets/styles/tailwind.css -o dist/Tailwind.purs
```

generates `dist/Tailwind.purs` 
