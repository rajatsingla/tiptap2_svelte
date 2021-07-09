<script type="module">
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import MenuBubble from './extension/MenuBubble.svelte'
  import FloatingMenu from './extension/FloatingMenu.svelte'
  import Image from './extension/image/Image.js'

  let element
  let editor
  let blocks = JSON.stringify({})

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Image
      ],
      content: '<p>Hello World! 🌍️ </p>',
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      },
      onUpdate: ({ editor }) => {
        const data = editor.getJSON()
        blocks = JSON.stringify(data,undefined, 4)
      }
    })
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })
</script>

<div class="editor">
  <article>
    {#if editor}
      <MenuBubble editor={editor} />
      <FloatingMenu editor={editor} />
    {/if}

    <div bind:this={element} />
  </article>
  <textarea name="" id="myTextarea" cols="30" rows="10">
    {blocks}
  </textarea>
</div>

<style>
  button.active {
    background: black;
    color: white;
  }
  textarea {
    margin-top: 40px;
    border: 1px solid grey;
    width: 100%;
    min-height: 30rem;
    font-family: "Lucida Console", Monaco, monospace;
    font-size: 0.8rem;
    line-height: 1.2;
  }
</style>
