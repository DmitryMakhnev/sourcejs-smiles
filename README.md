Smiles support for SourceJS
===============

[SourceJS](http://sourcejs.com) middleware to replace `:)` to emoticon smiles ![image](https://raw.githubusercontent.com/sourcejs/sourcejs-smiles/master/assets/i/smiles/1f600.png).

## Install

To install, run npm in `sourcejs/user` folder:

```
npm install sourcejs-smiles --save
```

Then restart your SourceJS application, middleware will be loaded automatically.


## Settings

### ignoreURLs

To not processing page by plugin, add page url in `sourcejs/user/options.js` to `assets.pluginsOptions` as:

```
smiles: {
    ignoreURLs: [
        '/url/to/your/page1',
        '/url/to/your/page2'
    ]
}
```