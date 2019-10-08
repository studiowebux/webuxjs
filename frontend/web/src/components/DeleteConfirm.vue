<template>
  <div class="modal" tabindex="-1" role="dialog" id="deleteModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmation</h5>
        </div>
        <div class="modal-body">
          <p>Do you really want to delete this entry ?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click.prevent="Delete(selectedId)"
            data-dismiss="modal"
          >
            Yes
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Delete: Function,
    selectedId: String
  }
};
</script>
