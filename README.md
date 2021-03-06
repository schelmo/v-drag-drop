# v-drag-drop

**Minimalistic drag & drop directives for [Vue.js](https://vuejs.org/)**

**Note: Versions 2.x and above of v-drag-drop are compatible with Vue 3 only. Install version 1.x if you use Vue 2.**

Designed to encapsulate some of the peculiarities of the native Drag & Drop API and make it easier to use with Vue.js. Also adds some handy features like namespaces.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)


## Installation

Install `v-drag-drop`:

```bash
npm install --save v-drag-drop
```

Then import it in your project:

```javascript
import { createApp } from 'vue';
import vDragDrop from 'v-drag-drop';

const app = Vue.createApp(App);
app.use(vDragDrop);
app.mount('#app');
```

Or include the files via `<script>` tag:
```html
<script src="https://unpkg.com/vue@3.0.0/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/v-drag-drop/dist/vDragDrop.min.js"></script>
<script>
    const app = Vue.createApp(App);
    app.use(vDragDrop);
    app.mount('#app');
</script>
```

You can also register the directives locally in your Vue component:

```javascript
import { draggable, droppable } from 'v-drag-drop';
export default {
    name: 'MyComponent',
    directives: {
        draggable, droppable
    }
};
```


## Usage

The following template example is the minimum setup required to get a draggable element and a drop zone with `v-drag-drop`:

```html
<div v-draggable="myData"></div>
<div v-droppable @v-drag-drop="handleDrop"></div>
```

This template example shows all the features supported by `v-drag-drop`. Check the [API section](#api) for details.

```html
<div
    v-draggable:namespace.move="myData"
    @v-drag-start="onDragStart"
    @v-drag-move="onDragMove"
    @v-drag-end="onDragEnd"
>
</div>

<div
    v-droppable:namespace
    @v-drag-enter="onDragEnter"
    @v-drag-over="onDragOver"
    @v-drag-leave="onDragLeave"
    @v-drag-drop="onDragDrop"
>
</div>
```

Also check the demos in the `demo` directory. You can run the demos with `npm run demo`. Open your browser at `http://127.0.0.1:1337/demo`.


## Migration from version 3

In version 4 and above, custom events have been renamed to avoid clashes with the native events. Therefore, when migrating to the new version, you will have to give all event names a `v-` prefix. For example, `@drag-start` will become `@v-drag-start`.


## API

`v-drag-drop` provides two directives: `v-draggable` for draggable elements and `v-droppable` for drop zones.

### `v-draggable`

#### Value

This is the data you want to transfer to the drop zone. The data can be arbitrary objects or primitives.

Example:

```javascript
export default {
    template: '<div v-draggable="myData"></div>',
    data() {
        return {
            myData: { foobar: 42 }
        };
    }
};
```

#### Argument

You can pass an argument to `v-draggable`. This argument is a namespace that defines in which drop zones the draggable item can be dropped (requires the drop zone to have the same namespace). Namespaces allow you to place multiple drop zones on the same page that accept different items.

If no namespace is defined (default), the items can be dropped on any drop zone.

Example:

```html
<div v-draggable:foo="myData"></div>
<div v-droppable:foo @v-drag-drop="handleDrop"></div> <!-- supports drop -->
<div v-droppable:bar @v-drag-drop="handleDrop"></div> <!-- drop prevented -->
```

Namespaces can also be assigned dynamically using [dynamic arguments](https://v3.vuejs.org/guide/custom-directive.html#dynamic-directive-arguments):

Example:

```html
<div v-draggable:[namespaceName]="myData"></div>
<div v-droppable:[namespaceName] @v-drag-drop="handleDrop"></div> <!-- supports drop -->
<div v-droppable:foobar @v-drag-drop="handleDrop"></div> <!-- drop prevented -->
```

#### Modifiers

* `move`: Optional. Add this modifier to get a crosshair cursor on the element: `v-draggable.move`

* `image`: Optional. Use a [drag image](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setDragImage) that is shown while dragging is in progress. If this modifier is set, the data to be transferred must be an object containing `data` and `image`.

    Example:

    ```html
    <div v-draggable.image="{ data: myData, image: myImage }"></div>
    ```

#### Events

* `drag-start`: Fired when the user starts dragging.

* `drag-move`: Fired repeatedly while dragging is in progress.

* `drag-end`: Fired when dragging is finished.

All event listeners are called with two arguments:
1. The dragged data
2. The native JavaScript event


### `v-droppable`

#### Value

Unused.

#### Argument

The namespace of the drop zone, see `v-draggable`. If no namespace is given, all items can be dropped on this drop zone.

#### Events

* `drag-enter`: Fired when a dragged item enters the drop zone.

* `drag-over`: Fired repeatedly while a dragged item is over the drop zone.

* `drag-leave`: Fired when a dragged item leaves the drop zone.

* `drag-drop`: Fired when an item has been dropped on the drop zone. Called with the dragged data and the original drop event. This enables you for example to retrieve the precise mouse coordinates of the drop.

All event listeners are called with three parameters:
1. The dragged data
2. Whether or not dropping will be possible (i.e. the namespaces of the dragged item and the drop zone match)
3. The native JavaScript event
