# Space Repetition Algorithm

This project was created because i needed some sort of space repetition algorithm that i can use in my apps.

## How to install

1. Clone the repo
   (`git clone https://github.com/kudziajaroslaw98/space-repetition-algorithm`)

2. Install packages
   (`npm install`)

## How to test

1. Compile typescript
   (`tsc`)

2. Run javascript (`node index.js`)

## Additional Info

Code is copy-paste ready. You can enable console logs by setting debug to true.

`spaceRepetitionAlgorithm({
  items,
  dateAttributeKey: "reviseAt",
  debug: true,
});`

### Possible upgrades:

1. Splitting mapping of items to different web workers to not block the main thread.

# License

Distributed under the MIT License. See `LICENSE` for more information.
