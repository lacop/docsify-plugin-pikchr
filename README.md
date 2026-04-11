# docsify-plugin-pikchr

Renders [Pikchr](https://pikchr.org/) diagrams in Docsify.

## Example

See <https://lacop.github.io/docsify-plugin-pikchr/>

## Usage

To use download `pikchr.js` and `docsify-plugin-pikchr.js` files from [dist/](https://github.com/lacop/docsify-plugin-pikchr/tree/main/dist), and load them in your `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/docsify@4"></script>
<script src="vendored/pikchr.js"></script>
<script src="vendored/docsify-plugin-pikchr.js"></script>
```

Then wrap diagrams in code blocks with the `pikchr` language tag.

## License

Contains WASM module built from the Pikchr C source, which is licensed under 0-clause BSD.
The rest of the plugin follows the same license.
