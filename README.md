# angular-check-all
[![Version](https://img.shields.io/bower/v/angular-check-all.svg)](https://github.com/rochdev/angular-check-all)
[![Build Status](https://travis-ci.org/rochdev/angular-check-all.svg?branch=master)](https://travis-ci.org/rochdev/angular-check-all)
[![Test Coverage](https://codeclimate.com/github/rochdev/angular-check-all/badges/coverage.svg)](https://codeclimate.com/github/rochdev/angular-check-all)
[![Code Climate](https://codeclimate.com/github/rochdev/angular-check-all/badges/gpa.svg)](https://codeclimate.com/github/rochdev/angular-check-all)
[![Dependency Status](https://gemnasium.com/rochdev/angular-check-all.svg)](https://gemnasium.com/rochdev/angular-check-all)
[![License](http://img.shields.io/badge/license-MIT-red.svg)][license-url]

[AngularJS](https://angularjs.org) directive to control a group of checkboxes. Fully compatible with [checklist-model](http://vitalets.github.io/checklist-model/).

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

[license-url]: http://en.wikipedia.org/wiki/MIT_License
