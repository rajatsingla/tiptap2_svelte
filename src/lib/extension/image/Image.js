import TiptapImage  from '@tiptap/extension-image'
import ImageComponent from './Image.svelte'
import {
  NodeView
} from '@tiptap/core'

export default Image = TiptapImage.extend({
  addNodeView() {
    return (props) => {
      return new ImageView(ImageComponent, props)
    }
  }
})

class ImageView extends NodeView {
  mount() {
    this.renderer = document.createElement('div')
    this.imageNode = new this.component({
      target: this.renderer,
      props: {
        src: this.node.attrs.src,
        selected: false,
        deleteNode: () => this.deleteNode()
      }
    })

    this.imageNode.$on('updateAttributes', event => {
      this.updateAttributes(event.detail)
    });
  }

  get dom() {
    return this.renderer
  }

  selectNode() {
    this.imageNode.$set({selected: true})
  }

  deselectNode() {
    this.imageNode.$set({selected: false})
  }
}
