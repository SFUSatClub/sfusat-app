# SFUSat Mobile App

![demo](http://i.imgur.com/vZs5zuh.gif)

## Included

* [React](https://github.com/facebook/react) & [React Native](https://github.com/facebook/react-native)
* [Redux](https://github.com/reactjs/redux) & [Remote Redux DevTools](https://github.com/zalmoxisus/remote-redux-devtools) & [On Debugger](https://github.com/jhen0409/remote-redux-devtools-on-debugger)
* [Immutable](https://github.com/facebook/immutable-js) & [Immutable DevTools](https://github.com/andrewdavey/immutable-devtools)

## Installation

See [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) to install prerequisites (npm, node etc).

```bash
$ npm install -g react-native-cli
$ npm install
```

## Development

#### Start local server

```bash
$ npm start
```

#### Android

Open Android emulator and run command: (Or connect real device via USB)

```bash
$ npm run android
```

#### iOS (untested)

Run command to open iOS simulator and run app:

```bash
$ npm run ios
```

Or open `ios/sfusat.xcodeproj` file with XCode:

```bash
$ npm run ios-open
```

#### App Dev Mode

- Shake the device and...
	- Enable dev mode
	- Enable live reload
	- Enable hot reloading
	- Setup debug server host & port (use wifi to send bundles to device so device doesn't need to be plugged in)

## Credits

* [react-native-boilerplate](https://github.com/jhen0409/react-native-boilerplate)

## LICENSE

[MIT](LICENSE)
