<template>
  <q-dialog v-model="dialogVisible">
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
    modelValue: Boolean, 
    message: String 
  },
  emits: ['update:modelValue'], 
  computed: {
    // Propiedad calculada para manejar el enlace bidireccional (v-model)
    dialogVisible: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);  // Emite automáticamente el valor actualizado
      }
    }
  },
  methods: {
    // Método para cerrar el diálogo
    closeDialog() {
      this.dialogVisible = false;  // Cierra el diálogo actualizando la propiedad computada
    }
  }
}
</script>
