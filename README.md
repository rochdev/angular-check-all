# angular-check-all [![Build][build-image]][build-url] [![License][license-image]][license-url]

[AngularJS][angular-url] directive to control a group of checkboxes. Fully compatible with [checklist-model][checklist-url].

## How to install

From your project root, run:

```sh
$ bower install --save angular-check-all
```

## Usage

```html
<input type="checkbox" check-all="" to-list="" by-value="" by-key nested-by="">
```

Available options:

| Attribute | Type | Description
| --------- | ---- | -----------
| check-all | `expression` | Array or object containing checkbox values.
| to-list *(optional)* | `expression` | List containing the checked keys/values instead of using boolean values directly on the source.
| by-value *(optional)* | `expression` | Path expression to find the values to copy to the list when looping through the source.
| by-key *(optional)* | `void` | If present, tells the directive to copy keys to the list instead of values.
| nested-by *(optional)* | `expression` | Path expression to find children for recursion. Works with the `by-value` option.

## Example

See the [example](example) folder for a complete example.

## License

[MIT License][license-url]

[angular-url]: https://angularjs.org
[build-image]: http://img.shields.io/travis/rochdev/angular-check-all/master.svg?style=flat-square
[build-url]: https://travis-ci.org/rochdev/angular-check-all
[checklist-url]: http://vitalets.github.io/checklist-model/
[license-image]: http://img.shields.io/badge/license-MIT-red.svg?style=flat-square
[license-url]: http://en.wikipedia.org/wiki/MIT_License
[version-image]: http://img.shields.io/badge/release-0.0.0-orange.svg?style=flat-square
[version-url]: https://github.com/rochdev/angular-check-all
