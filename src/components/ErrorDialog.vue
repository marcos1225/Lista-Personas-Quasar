<!-- components/ErrorDialog.vue -->
<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <q-card>
      <q-card-section>
        <div class="text-h6">Error ❌</div>
        <div>{{ message }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,  // Controla si el diálogo está abierto o cerrado
    message: String  // El mensaje de error a mostrar
  },
  emits: ['update:modelValue'],  // Emitimos el evento para actualizar modelValue
  methods: {
    closeDialog() {
      this.$emit('update:modelValue', false)  // Cerramos el diálogo
    }
  }
}
</script>
