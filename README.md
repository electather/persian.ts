<h1 align="center">Task repeater</h1>
<p>
  <a href="https://www.npmjs.com/package/persian-ts" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/persian-ts.svg">
  </a>
  <a href="https://github.com/electather/persian.ts#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/electather/persian.ts/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/electather/persian.ts/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/electather/persian.ts" />
  </a>
  <a href="https://bundlephobia.com/package/persian-ts" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/bundlephobia/minzip/persian-ts" />
  </a>
</p>

Variety of Persian tools, all gathered in one place

## Install

```sh
yarn install persian-ts
```

## Usage

```typescript
import TaskRepeater from "task-repeater";

const job1 = TaskRepeater()
  .do(() => {})
  .every(1000)
  .start();

const job2 = TaskRepeater()
  .do((itteration) => console.log(`itteration No.${itteration} ...`))
  .do(() => {})
  .finally((itterationsDone) =>
    console.log(`tasks done. ${itterationsDone} itterations were completed.`)
  )
  .for(5)
  .every(2_000)
  .delay(1_000)
  .start();

job1.stop();
job1.reset();
```

## Author

👤 **Omid Astaraki <omid.ocean@gmail.com>**

- Github: [@electather](https://github.com/electather)
- LinkedIn: [@omid-astaraki](https://linkedin.com/in/omid-astaraki)

## Credits

this package is based on [Repeatr](https://github.com/theshem/Repeatr) library developed by [@theshem](https://github.com/theshem).

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/electather/persian.ts/issues). You can also take a look at the [contributing guide](https://github.com/electather/persian.ts/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Omid Astaraki <omid.ocean@gmail.com>](https://github.com/electather).<br />
This project is [MIT](https://github.com/electather/persian.ts/blob/master/LICENSE) licensed.
