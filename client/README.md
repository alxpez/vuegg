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
* Props: **egglement**, [**wrappegg**, **containegg**]

* *Renders directly on the page.*

> Any HTML5 elements (div, button, input...)

**Vuegg components**
* Wrapper props: **egglement**, **componegg**, **containegg**

* Children props: **egglement**, [**wrappegg**, **componegg**, **containegg**]

* *For render information see in-line and global components*

> Any component build with the set of *Basic Elements*. Usually a 'div' element containing other basic elements or components (vuegg-powered or external).

**External components**
* Wrapper props: **external**, **componegg**

* Children props: (none)

* *For render information see in-line and global components*

> Components from external libraries/packages (ie. vue-mdc-adapter)


### Components render types

**In-line components**
> Full definition generated *in-line* in the page.

> Can edit position and dimensions from main editor.
(Styles, classes, children edition from component editor) *TODO.

> DOES NOT SAVE A COMPONENT DEFINITION IN PROJECT LEVEL.


**Global components**
> Full definition generated in its own component file; instance generated in the page.

> Can edit only position in main editor. (Styles, classes, children edition in component editor) *TODO.

> SAVES A COMPONENT DEFINITION GLOBALLY (project level). This also applies for external components (due to dependencies)



*TODO, a vuegg-componegg edition view to modify the global component reference, and apply changes to all instances of that component.
