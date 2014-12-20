# Resilient.js

A script loader that tries to fetch the same module from differents CDNs.


## Usage

Resilient.js should be the first script to be loaded in your page.
Instantiate it like so

```js
var resilient = new Resilient();
resilient.init();
```

In your `<script>` tag, use the data attributes `data-alt-src` and `data-module`

```html
<script
  src="https://code.jquery.com/jquery-2.1.3.min.js"
  data-module="jquery"
  data-alt-src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
></script>
```

```js
resilient.on('load', ['jquery'], function() {
  console.log('jQuery loaded');
  // From now on it is safe to use your code that depends on jQuery
});
```

If something goes wrong while loading a module, an `error` event will be fired.

```js
resilient.on('error', ['jquery'], function() {
  console.log('Error while loading jQuery')
});
```

It always possible to listen to all `load` and `error` events using the `*`
wildcard.

```js
resilient
  .on('error', ['*'], function(moduleName) {
    console.log('Error while loading ' + moduleName);
  })
  .on('load', ['*'], function(moduleName) {
    console.log(moduleName + ' loaded');
  });
```


## API

### `on`

```js
instance.on('eventName', ['moduleName1', 'moduleName2'], callback);
```

### `off`

```js
instance.off('eventName', ['moduleName1', 'moduleName2']);
```

### `trigger`

```js
instance.trigger('eventName', ['moduleName1', 'moduleName2']);
```
