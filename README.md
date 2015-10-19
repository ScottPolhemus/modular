# modular

A starter theme for creating flexible modular WordPress sites using Advanced Custom Fields.

Requires ACF v5 (or v4 with the flexible content and repeater field add-ons)

## Features

- Flexible page layouts using ACF's flexible content field
- Gulp workflow and opinionated file structure for developing highly modular themes

## How to Use

The starter theme includes a single page template, `index.php`. This template checks for a flexible content field active on the current page with the field name "`modules`". If the page has a modules field, it will loop through the selected field layouts for that page. For each layout, we include the template partial from the appropriate `modules` subfolder.

Each module has a PHP template plus an optional SCSS stylesheet partial and/or JavaScript module. An ACF flexible content layout (with the same name as the module folder) is also used to create an interface for populating content into a module and placing it on a page.

If you're using ACF 5.0 or newer you can use the sync feature to get started quickly with the included Page Modules flexible content field, which has layouts for the starter modules. Make sure you set the permissions on the `acf-json` folder to allow ACF to save changes to the theme file.

Gulp is used to compile CSS from SCSS (as well as add vendor prefixes with Autoprefixer) and to package modular JavaScript code using Browserify. If you have Node and Gulp installed, you can run `npm install` to pull the project dependencies, then `gulp build` or `gulp dev` to run the compile tasks for production or development respectively. The `dev` task includes a `watch` setup for updating assets as you save changes and triggering livereload in the browser.

## How it Works

The theme structure is designed to allow flexible creation of new modules that can be added to a page in any order using the ACF user interface. By using a flexible content field, and organizing and naming our module code to match the field layouts, we can create highly modular themes.

A module can contain three parts: A __PHP template__, a __stylesheet partial (SCSS)__, and a __JavaScript module (CJS/Node-style)__.

### PHP

The name of the module folder and template file should precisely match the name of the ACF field layout. For example, the "Text Columns" layout has the field name `text_columns` in ACF and the template is located at `modules/text-columns/text-columns.php`. The module's template is included within ACF's flexible content loop, so you can use `get_sub_field` and other ACF functions to populate variables with content added to that module. 

### SCSS

The main SCSS stylesheets are located in `styles/src/`. There is a `main.scss` file which includes global partials as well as any module styles. For module-specific styles, you can create a stylesheet in the module folder and `@import` it using just the module name. The Gulp SASS task config (`tasks/sass.js`) includes a function to add all of the module directories to SASS's import paths automatically. It's also configured to add source maps when running from the `gulp dev` task.

### JS

The main script is located at `scripts/src/main.js`. The starter script includes a single function called on load, which checks the page for modules with a `data-module` attribute. This attribute is used in the template to indicate if a module includes an accompanying JS file, and should be set to the same name as the module folder and script file.

For each JS-enabled module, the script is included using Browserify (which is configured to expose the module scripts using Gulp in `tasks/browserify.js`). Module scripts are expected to export a function (using CommonJS syntax) which takes the module's DOM element as its first parameter. An example of this can be seen in the `carousel` starter module, which includes a script to initialize the "Flickity" slider plugin on the calling element.