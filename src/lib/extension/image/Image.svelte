<script type="module">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher()

let input
let files
let url
export let src
export let selected
export let deleteNode
let uploadingImage = false

function getData(file) {
  return Promise.resolve({
    status: 200,
    data: {
      image:
        "https://dev-bucket.nyc3.cdn.digitaloceanspaces.com/sites/74/posts/2327/juuuydyvgt1608178680.webp",
      fallback:
        "https://dev-bucket.nyc3.cdn.digitaloceanspaces.com/sites/74/posts/2327/juuuydyvgt1608178680.png",
      meta: {
        height: 400,
        width: 400
      }
    }
  });
}

function uploadImage () {
  if (files.length) {
    uploadingImage = true
    const reader = new FileReader();
    reader.onload = () => {
      url = reader.result;
      let response = getData(files[0])
      response.then((data) => {
        if (data.status === 200) {
          dispatch('updateAttributes', {
            src: data.data.image
          });
          uploadingImage = false
        }
      })
    };
    reader.readAsDataURL(files[0]);
  }
}

onMount(() => {
  if (uploadingImage || src) {return}
  input.click();
})

onDestroy(() => {

})
</script>


<input
  bind:this={input}
  bind:files
  type="file"
  id="image-input"
  ref="imageInput"
  style="display:none"
  accept="image/*"
  on:change={(() => uploadImage())}
/>

{#if src || url}
  <figure class:selected={selected}>
    <div class="close-button" on:click={deleteNode}>
      <i class="close-icon"></i>
    </div>
    <picture>
      <source srcset={src || url} type="image" />
      <img
        src={src || url}
      />
    </picture>
    <figcaption>
      <input
        v-model="caption"
        placeholder="Type caption for image (optional)"
      />
    </figcaption>
  </figure>
{/if}
