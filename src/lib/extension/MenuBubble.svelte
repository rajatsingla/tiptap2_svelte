<script type="module">
import { onMount, onDestroy } from 'svelte'
import { BubbleMenuPlugin, BubbleMenuPluginKey } from '@tiptap/extension-bubble-menu'

export let editor;
let element
function registerMenuPlugin(editor) {
  console.log(editor)
  if (!editor) return
  editor.registerPlugin(BubbleMenuPlugin({
    editor,
    element: element,
    tippyOptions: { duration: 100 },
  }))
}

onMount(() => {
  $: registerMenuPlugin(editor)
})

onDestroy(() => {
  if (editor) {
    editor.unregisterPlugin(BubbleMenuPluginKey)
  }
})
</script>

{#if editor}
  <div>
    <ul style="visibility:hidden;" bind:this={element} class="highlight-menu" class:is-active={!editor.isActive('image')}>
      <li on:click={() => editor.chain().focus().toggleBold().run()}>
        <button>
          <i class="bold-icon" class:is-active={editor.isActive('bold')}></i>
        </button>
      </li>

      <li on:click={() => editor.chain().focus().toggleItalic().run()}>
        <button>
          <i
            class="italic-icon"
            class:is-active={editor.isActive('italic')}
          ></i>
        </button>
      </li>
      <li>
        <button>
          <i class="link-icon" class:is-active={editor.isActive('link')}></i>
        </button>
      </li>

      <li>
        <button>
          <i class="separator-icon"></i>
        </button>
      </li>

      <li on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <button>
          <i
            class="large-heading-icon"
            class:is-active={editor.isActive('heading', { level: 3 })}
          ></i>
        </button>
      </li>

      <li on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
        <button>
          <i
            class="small-heading-icon"
            class:is-active={editor.isActive('heading', { level: 5 })}
          ></i>
        </button>
      </li>

      <li on:click={() => editor.chain().focus().toggleBlockquote().run()}>
        <button>
          <i
            class="quote-icon"
            class:is-active={editor.isActive('blockquote')}
          ></i>
        </button>
      </li>
    </ul>
  </div>
{/if}

<style>
  .highlight-menu{
    position: sticky;
  }
</style>
