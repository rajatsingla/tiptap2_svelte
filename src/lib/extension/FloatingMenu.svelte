<script type="module">
import { onMount, onDestroy } from 'svelte'
import { FloatingMenuPlugin, FloatingMenuPluginKey } from '@tiptap/extension-floating-menu'

export let editor;
let element, shouldShowMenu
function registerFloatingMenu(editor) {
  console.log(editor)
  if (!editor) return
  editor.registerPlugin(FloatingMenuPlugin({
    editor,
    element: element,
    tippyOptions: { duration: 100 },
  }))
}
function toggleMenu() {
  shouldShowMenu = !shouldShowMenu
}
onMount(() => {
  $: registerFloatingMenu(editor)
})

onDestroy(() => {
  if (editor) {
    editor.unregisterPlugin(FloatingMenuPluginKey)
  }
})
</script>

{#if editor}
  <div
    class="editor__floating-menu is-plus-active"
    style="visibility:hidden;top: -34px;left: -6px;"
    bind:this={element}
  >
    <ul class="kitchensink">
      <li on:click={toggleMenu}>
        <i class="icon add-icon" class:close-icon={shouldShowMenu}></i>
      </li>
      {#if shouldShowMenu}
        <li on:click={(() => editor.chain().focus().setImage().focus().run() && toggleMenu() )}>
          <i class="icon image-icon"></i>
        </li>
        <li on:click={(() => editor.chain().focus().toggleOrderedList().run() && toggleMenu())}
          class:is-active={editor.isActive('ordered_list')}
        >
          <i class="icon list-icon"></i>
        </li>
      {/if}
    </ul>
  </div>
{/if}
