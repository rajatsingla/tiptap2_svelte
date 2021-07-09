import App from './App.svelte'
import './assets/scss/global.scss'
import "../design_assets/scss/base.scss";
import "../design_assets/scss/editor.scss";
import "../design_assets/scss/article.scss";

const app = new App({
  target: document.getElementById('app'),
})

export default app
