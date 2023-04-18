<script>
export default {
  props: {
    render: {
      type: Function,
      default: null
    }
  },
  render: function (h) {
    if (this.render) {
      return this.render(h, this.$attrs)
    }
    return null
  }
}
</script>
