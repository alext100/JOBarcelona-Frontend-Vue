# JOBarcelona '22 | Front-end

[![Netlify Status](https://api.netlify.com/api/v1/badges/eb8965d1-a72f-49c6-baa1-9c6ee02fb6b6/deploy-status)](https://app.netlify.com/sites/jobarcelona-frontend-alext100/deploys)

Este es uno de los retos clasificatorios que forman parte del hackathon online de JOBarcelona ’22. El resultado de este reto va a permitir a los ganadores asistir al hackathon presencial que se realizará el día 31 de mayo de 2022 en el Camp Nou.

## Reto de Front-end

El equipo de front está trabajando en una librería de componentes para su nuevo proyecto, el cual consiste en permitir a sus users crear listas de regalos y customizarlas.

Les falta una parte importante: la visualización de los distintos grupos de regalos en modo de scroll horizontal (para pc) y una lista para la versión de móvil y tablet.

### Tareas

Lo que se espera es que se desarrolle lo siguiente:

<details>

<summary>Click to expand!</summary>

- Componente con un título y una grupo de regalos que contenga la siguiente información:

  - Título

  - Descripción

  - Tags del grupo

El componente es responsive:

- Adopta un modo de scroll horizontal para PC

- Adopta modo lista para Móvil y Tablet

- Al clicar en cada grupo de regalos permite ejecutar una acción (por ahora indefinida).

- Utilizar un sistema lo más atómico posible

- Comentar el desarrollo de este componente

- Se tiene que utilizar la librería Storybook para documentar el componente

</details>

### Árbol de archivos

```
jobarcelona22-frontend-vue
├── babel.config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── public
|  ├── favicon.ico
|  ├── groups.json
|  ├── index.html
|  ├── party-popper-icon.png
|  ├── robots.txt
|  └── _redirects
├── README.md
├── sonar-project.properties
├── src
|  ├── App.vue
|  ├── components
|  ├── composables
|  ├── main.ts
|  ├── router
|  ├── shims-vue.d.ts
|  ├── store
|  ├── utils
|  └── views
├── tests
|  └── unit
└── tsconfig.json
```

### Stack

| Package         | Version |
| --------------- | ------- |
| bootstrap       | 5.1.3   |
| gsap            | 3.10.4  |
| vue             | 3.2.33  |
| vue-horizontal  | 1.0.2   |
| vue-router      | 4.0.15  |
| vuex            | 4.0.2   |
| @storybook/vue3 | 6.4.22  |
| eslint          | 7.32.0  |
| typescript      | 4.6.4   |
| babel-loader    | 8.2.5   |

### Cómo funciona

https://user-images.githubusercontent.com/83639312/169144678-24e531ef-28e9-46db-ae95-d77ebb6f384e.mov

### SonarCloud

https://sonarcloud.io/summary/overall?id=alext100_JOBarcelona-Frontend-Vue
![2022-05-18_222751](https://user-images.githubusercontent.com/83639312/169150105-12859b33-493f-4998-b88b-0a1bc9db2bf7.png)
5 bugs - false positive! (Unexpected unknown pseudo-class selector ":deep") ":deep" es selector de Vue


### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

#### Run your unit tests

```
npm run test:unit
```

#### Lints and fixes files

```
npm run lint
```

#### Run StoryBook

```
npm run storybook
```
