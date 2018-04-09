<p align="center">
  <a href="https://vuegg.now.sh" target="_blank">
    <img width="180" src="https://vuegg.now.sh/static/vuegg-fam.svg">
  </a>
</p>
<h1 align="center">vuegg</h1>
<p align="center"><strong>vue</strong>.js <strong>G</strong>UI <strong>g</strong>enerator</p>
<p align="center">Mockups and code in one go!</p>

</br>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-%5E2.5-41b883.svg" alt="vue">
  </a>
  <a href="https://github.com/vuegg/vuegg/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="mit">
  </a>
  <a href="https://travis-ci.org/vuegg/vuegg/branches">
    <img src="https://travis-ci.org/vuegg/vuegg.svg?branch=master" alt="travis-ci">
  </a>
</p>

</br>

## Concept

Scaffold vuejs projects by dragging-dropping components directly into the visual editor and moving-resizing them to your choice. Vuegg leverages the creation of the pages and routes of your app/website, eases the styling work and helps to achieve a rapid-prototyping workflow (... at least in theory).

The aim of this project is to merge designing and prototyping into one single process. Whenever you're happy with what you see on the screen, just get your code.

</br>

## Main Features

* Mockup / prototype by drag'n'drop components and move/resize them
* Standard [Mouse and Keyboard combinations](https://github.com/vuegg/vuegg#mouse--keyboard-combinations), supported
* Responsive preview (phone, tablet, web)
* Basic set of HTML5 elements
* Material design components ([vue-mdc-adapter](https://github.com/stasson/vue-mdc-adapter))
* [Vuejs](https://github.com/vuejs/vue) sources generation (download .zip)
* Connect with GitHub (save/load vuegg projects)
* Local persistence to save the work in progress
* ... more to come with time

</br>

## Mouse / Keyboard combinations

#### Selection
* **Mouse down + Drag + Mouse up**: Draw a selection area
* **Ctrl [or Meta] + Click**: Select outer-most item, or parent container
* **Ctrl [or Meta] + Shift + Click**: Add [outer-most] item to selection
* **Esc**: Clear selection

#### Undo / Redo
* **Ctrl [or Meta] + Z**: Undo
* **Ctrl [or Meta] + Shift + Z**: Redo

#### Copy / Cut / paste
* **Ctrl [or Meta] + C**: Copy
* **Ctrl [or Meta] + X**: Cut
* **Ctrl [or Meta] + V**: paste

#### Delete
* **Delete [or Backspace]**

</br>

## Run vuegg locally

### Auto-run
``` bash
# install, build and serve
npm run vuegg
```
Navigate to `localhost:5000` to serve (a production-ready) vuegg.

</br>

### Step-by-step setup

##### 1. installation
``` bash
# install client & server dependencies
npm run install:all

# OR install only client / server
npm run install:client
npm run install:server
```

##### 2. development
``` bash
# serve vuegg-client with hot reload
npm run client

# start vuegg-server (auto-restarts on changes)
npm run server
```
Navigate to `localhost:8080` to serve *vuegg-client* with hot-reload (development server).

> For detailed explanation on how things work on the client side, checkout the **[vuejs-templates/webpack](http://vuejs-templates.github.io/webpack/)** guide and docs for **[vue-loader](http://vuejs.github.io/vue-loader)**.

> For development *vuegg-server* will only generate vuejs projects (it won't be serving *vuegg-client* resources). Auto-restart capabilities possible thanks to **[nodemon](https://github.com/remy/nodemon)**.

> The above commands should be run in separate terminal instances.

##### 3. production
``` bash
# build vuegg-client for production with minification
npm run build

# start vuegg-server at localhost:5000
npm run start
```
Navigate to `localhost:5000` to serve (a production-ready) vuegg.

</br>

## About

Vuegg is a work-in-progress concept project, feel free to fork it or contribute however possible.

The project was born as a sandbox for me to get started on the [vue](https://github.com/vuejs/vue) world, in fact its ~~un~~original name was vuexample (*very unique*, I thought at the time).

Not long after it became a personal challenge, I went on adding new features (mainly things I feel like learning) and gave it a proper name (and even a *face*). Eventually I considered it to be ready for the open-source community... and here is *vuegg*, my pet project.
