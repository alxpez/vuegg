# vuegg-client

> vuegg UI

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

---

---

## Development notes

**Basic Elements**
* Props: **egglement**, [**containegg**]

* *Renders directly on the page.*

> Any HTML5 elements (div, button, input...)


**Vuegg components**
* Wrapper props: **egglement**, **componegg**, **containegg**

* Children props: **egglement**, [**componegg**], [**containegg**]

* *Renders component tag on the page and generates component file with full definition.*

> Any component build with the set of *Basic Elements*. Usually a 'div' element containing other basic elements or components (vuegg-powered or external).

> They are not editable from the main edition view (only position).

>TODO, a vuegg-componegg edition view to modify the global component reference, and apply changes to all instances of that component.

**External components**
* Wrapper props: **external**, **componegg**

* Children props: (none)

* *Renders directly on the page. Adds global dependencies to package.json, main.js and/or index.html*

> Components from external libraries/packages (ie. vue-mdc-adapter)
