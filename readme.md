# Resilient.js
<img src="https://raw.githubusercontent.com/caiogondim/resilient.js/master/icon/icon.png" alt="Resilient.js logo" align="right" width="200" />

resilience
> the capacity to recover quickly from difficulties; toughness.

Resilient.js is a script loader proof-of-concept made to load a given JS file
from different URLs. There is no perfect CDNs, and there are better CDNs for
each country or continent. With that lib, we try to load a JS file from
different CDNs, until we succesfully download the file.


## Usage

Resilient.js should be the first script to be loaded in your page.
Instantiate it like so

```js
if (Resilient.isSupported()) {
  var resilient = new Resilient();
  resilient.init();
}
```

In your `<script>` tag, use the data attributes `data-alt-src` and `data-module`

```html
<script
  src="https://code.jquery.com/jquery-2.1.3.min.js"
  data-module="jquery"
  data-alt-src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"
></script>
```

```js
resilient.on('load', ['jquery'], function() {
  console.log('jQuery loaded');
  // From now on it is safe to use your code that depends on jQuery
});
```

If something goes wrong while loading a module, an `error` event will be fired.
And another try to load the script will be made using the `data-alt-src`.

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


## Events

### `load`

Triggered when a script tag was loaded.

### `error`

Triggered when there was an error loading a script.


## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 11+ ✔ | Latest ✔ | 6.0+ ✔ |

## Credits

- Icon by [Stephen Borengasser](http://thenounproject.com/term/resilient/38883/)
