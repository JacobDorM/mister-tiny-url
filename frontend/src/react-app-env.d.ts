// These type declarations add support for importing resource files such as bmp, gif, jpeg, jpg, png, webp, and svg.
// It also adds support for importing CSS Modules. This relates to import of files with .module.css,.module.scss, and .module.sass extensions.
/// <reference types="react-scripts" />

// We used the export {} line in our index.d.ts file to mark it as an external module. A module is a file that contains at least 1 import or export statement, so we are required to do that to be able to augment the global scope.
export {}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    gStore
  }
  //  how to extend Error without any
  interface Error {
    code?: string
    config?: object
    request?: object
    response: any
  }
}
