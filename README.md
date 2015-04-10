# [WIP] Canvas Spaces Manager Client App

A client_app front-end for managing Canvas Spaces within SFU Canvas. Uses the [canvas_spaces](https://github.com/sfu/canvas_spaces) API.

## Dependencies

This app depends on the [canvas_spaces](https://github.com/sfu/canvas_spaces) gem being installed in the host Canvas installation.

## Development Setup

* clone the repository somewhere
* `cd` to the repository
* `npm install`
* create a symlink to your canvas repository in `./vendor`: `ln -s /path/to/your/canvas/repo vendor/canvas`
* `npm start`
* open `http://localhost:8080`

### API Requests

#### Proxy

By default, the development server proxies requests to `/api/v1/*` to `http://canvas.dev/api/v1/*` (e.g. a Vagrant installation of Canvas). To override this, create a file named `config/local-development.json` and add the following:

```
{
  "api_proxy": "http://yourcanvasserver"
}
```

#### API Token

To perform API requests in the dev environment, you will need to generate a Canvas API token for the user you wish to make requests as. Once you have the token, add it to your `config/local-development.json` file.

```
{
  "api_token": "XXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

#### React Hot Loader

The dev server provides [React Hot Loader](https://github.com/gaearon/react-hot-loader) for ultimate awesomness. Simply change a React component file and watch it update in the browser WITHOUT RELOADING. Magic.

In production, React is aliases to the Canvas-provided bundle in `./vendor/canvas/public/javascripts/bower/react/react-with-addons`. This doesn't work with React Hot Loader, though, as it it missing some bits that it needs. To work around this, in development we alias React to the npm-installed version in `node_modules`. React is thus pinned at whatever version is being shipped with Canvas.

## Production Installation

Production installation will be handled by Bamboo during a normal deploy. It will:

* clone the repository into $CANVAS_ROOT/client_apps/canvas_spaces
* `npm run setup` -- creates the vendor/canvas symlink and copies files ./canvas into place within the Canvas tree
* run `bundle exec rake canvas:compile_assets`
