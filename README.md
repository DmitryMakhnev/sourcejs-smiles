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

Add list of ignored urls to skip processing in `sourcejs/user/options.js` to `assets.pluginsOptions`:

```
smiles: {
    ignoreURLs: [
        '/url/to/your/page1',
        '/url/to/your/page2'
    ]
}
```