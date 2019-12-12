# Nimisampo

A ReactJS project for browsing all the first names registered in Finland. Intended to help give inspiration to anyone wanting to change their name.

By default the following names have been filtered out:
 * All compound names, like Ville-Pekka or Veli-Matti
 * All patronyms and matronyms, like Matintyttö, ibn Idris, or Einarsdottir
 * All names appearing as lower case in the records

## Getting started

This is a project bootstrapped with [create-react-app](https://create-react-app.dev), so you should be able to just clone this repo and run `npm install` to be all charged up and ready to go! Then simply run `npm start` to start the development server from react-scripts.

### Using different data than the Finnish name lists provided

If you have your own source of data you want to use with this app, replace the three files in [`src/data/json`](./src/data/json) called `f.json`, `m.json`, and `u.json`.

Each file should contain a list of names as a JSON list. Masculine names should go into the `m.json`-file, Feminine names into the `f.json`-file, and Androgynous names into `u.json`.