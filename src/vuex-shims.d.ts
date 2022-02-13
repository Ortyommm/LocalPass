import { Store } from './renderer/store' // path to store file

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
  }
}
