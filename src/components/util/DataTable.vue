<template>
  <div class="flex-column">
    <div class="mdc-data-table" ref="datatable">
      <div class="mdc-data-table__table-container">
        <table class="mdc-data-table__table">
          <thead>
          <slot name="thead"></slot>
          </thead>
          <tbody class="mdc-data-table__content">
          <slot name="tbody"></slot>
          </tbody>
        </table>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import {MDCDataTable} from "@material/data-table";

export default {
  name: "DataTable",
  data: function () {
    return {
      table: {}
    }
  },
  methods: {
    reload: function (){
      this.$log.debug("reload table")
      this.table.layout()
    }
  },
  mounted() {
    let el = this.$refs["datatable"]
    this.table = new MDCDataTable(el)

    el.addEventListener("MDCDataTable:rowSelectionChanged", (evt => {
      this.$log.debug(evt)
      this.$log.debug("rowids", this.table.getSelectedRowIds())
    }))
  }
}
</script>

<style scoped>

</style>