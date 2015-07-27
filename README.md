# [WIP] Canvas Spaces Manager Client App

A client_app front-end for managing Canvas Spaces within SFU Canvas. Uses the [canvas_spaces](https://github.com/sfu/canvas_spaces) API.

## Dependencies

This app depends on the [canvas_spaces](https://github.com/sfu/canvas_spaces) gem being installed in the host Canvas installation.

## Local Development Setup

* clone the repository somewhere
* `cd` to the repository
* `npm install`
* create a `dev-canvas` symlink to your canvas repository in `./vendor`: `ln -s /path/to/your/canvas/repo vendor/dev-canvas`
  * note that this **must** be called `dev-canvas` for local development to work
* `npm start`
* open `http://localhost:8080`

### Development configuration

Webpack loads some configuration settings from files located in the `config` folder. It uses the [config](https://www.npmjs.com/package/config) module to do this. Development settings are contained in `config/development.json`. **DO NOT CHANGE THIS FILE**. If you need to override any of the settings (e.g. use a real hostname instead of localhost), override the settings in `config/local-development.json`.

### API Requests

#### Proxy

By default, the development server proxies requests to `/api/v1/*` to `http://canvas.dev/api/v1/*` (e.g. a Vagrant installation of Canvas). You can override this in `config/local-develpoment.json`. For example, proxying through the `canvas.dev` hostname can often be extremely slow. You may want to change your proxy to use the IP address of your vagrant box:

```
{
  "api_proxy": "http://192.168.50.50"
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

The dev server provides [React Hot Loader](https://github.com/gaearon/react-hot-loader) for ultimate awesomness. Simply change a React component file and watch it update in the browser **WITHOUT RELOADING**. Magic.

## Embedded-Canvas Development Setup

Developing locally outside of Canvas is great (not having to run compile_assets after every change? sold!). However, at some point you will need to test the app inside a Canvas installation. The following assumes that you're using the SFU Vagrant configuration for development. If you're not (e.g. you're running bare-metal on OS X), well, you should be able to figure it out.

* check out the [canvas_spaces backend repo](https://github.com/sfu/canvas_spaces) somewhere

* modify your Canvas repo's `Vagrantfile` to mount both the backend repo at /canvas_spaces, and this app at /canvas_spaces_client_app. **Don't commit the changes to your `Vagrantfile`**. To temporarily ignore the change to your Vagrantfile: `git update-index --assume-unchanged Vagrantfile`. To start tracking changes again, remove the lines you added, and `git update-index --no-assume-unchanged Vagrantfile`.

````
config.vm.synced_folder ".", "/vagrant", type: :nfs
# mount the two canvas spaces repos in the right places
config.vm.synced_folder "../canvas_spaces", "/vagrant/gems/plugins/canvas_spaces", type: :nfs
config.vm.synced_folder "../canvas_spaces_client_app", "/vagrant/client_apps/canvas_spaces", type: :nfs
```

* If your vagrant box is already running, run `vagrant provision` to re-run the provisioning steps. Otherwise, `vagrant up`.

* Follow the installation steps in the [canvas_spaces readme](https://github.com/sfu/canvas_spaces#installation). Restart apache (`sudo service apache2 restart`).

* Verify that you can hit `http://canvas.dev/canvas_spaces` without any errors in the browser console or in the Canvas logs.

* Create some SFU users in your Canvas installation to test with. You'll need to use real SFU IDs for the `sis_id`. Pick some LCP people and use them; don't use actual students.

## Production Installation

Production installation will be handled by Bamboo during a normal deploy. It will:

* clone the repository into $CANVAS_ROOT/client_apps/canvas_spaces
* `npm run setup` -- creates the vendor/canvas symlink and copies files ./canvas into place within the Canvas tree
* run `bundle exec rake canvas:compile_assets`
