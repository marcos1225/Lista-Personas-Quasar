<!-- components/DeletePersonDialog.vue -->
<template>
    <q-dialog v-model="dialogVisible" @hide="handleDialogClose">
      <q-card>
        <q-card-section>
          <div class="text-h6">¿Estás seguro de que deseas eliminar a <span class="text-red-700">{{ personData.nombre }}</span>?</div>
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="handleDialogClose" /> <!-- Cerrar el diálogo manualmente -->
          <q-btn flat label="Eliminar" color="negative" @click="confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  import { ref, watch } from 'vue'
  
  export default {
    props: {
      visible: Boolean,  // Prop para controlar la visibilidad
      personData: Object  // Datos de la persona a eliminar
    },
    emits: ['confirmed', 'update:visible'],  // Emitimos eventos para la eliminación y visibilidad
    setup (props, { emit }) {
      const dialogVisible = ref(props.visible)  // Controla la visibilidad del diálogo
  
      // Función para confirmar la eliminación
      const confirmDelete = () => {
        emit('confirmed')  // Emitimos el evento de eliminación confirmada
        handleDialogClose()  // Cerramos el diálogo después de eliminar
      }
  
      // Sincroniza la prop visible con el local dialogVisible
      watch(() => props.visible, (newVal) => {
        dialogVisible.value = newVal
      })
  
      // Función para manejar el cierre del diálogo
      const handleDialogClose = () => {
        dialogVisible.value = false
        emit('update:visible', false)  // Emitimos el evento para cerrar el diálogo en el componente padre
      }
  
      return {
        dialogVisible,
        confirmDelete,
        handleDialogClose
      }
    }
  }
  </script>
  