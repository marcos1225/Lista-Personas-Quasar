<!-- ViewPersonDialog.vue -->
<template>
    <q-dialog 
      v-model="dialogVisible" 
      @hide="handleDialogClose"  
    >
      <q-card class="w-[400px]">
        <q-card-section>
          <div class="text-h6">Información de la Persona</div>
        </q-card-section>
  
        <q-card-section>
          <q-input v-model="person.cedula" label="Cédula" readonly />
          <q-input v-model="person.nombre" label="Nombre" readonly />
          <q-input v-model="person.apellido" label="Apellido" readonly />
          <q-input v-model="person.email" label="Correo" readonly />
          <q-input v-model="person.telefono" label="Teléfono" readonly />
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" @click="dialogVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  import { ref, watch } from 'vue'
  
  export default {
    props: {
      visible: Boolean,  // Prop que controla la visibilidad del diálogo
      personData: Object  // Datos de la persona
    },
    emits: ['update:visible'],  // Emite evento para actualizar visibilidad en el componente padre
    setup (props, { emit }) {
      const dialogVisible = ref(props.visible)  // Controla la visibilidad local del diálogo
      const person = ref({ ...props.personData })  // Estado local para los datos de la persona
  
      // Actualiza el estado visible cuando cambia la prop `visible`
      watch(() => props.visible, (newVal) => {
        dialogVisible.value = newVal
        if (newVal) {
          person.value = { ...props.personData }  // Actualiza los datos cuando el diálogo se abre
        }
      })
  
      // Maneja el cierre del diálogo y emite el evento de cierre
      const handleDialogClose = () => {
        dialogVisible.value = false
        emit('update:visible', false)
      }
  
      return {
        dialogVisible,
        person,
        handleDialogClose
      }
    }
  }
  </script>
  