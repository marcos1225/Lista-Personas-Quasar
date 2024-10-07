<!-- components/EditPersonDialog.vue -->
<template>
    <q-dialog v-model="dialogVisible" @hide="handleDialogClose">
      <q-card class="w-[400px]">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? 'Editar Persona' : 'Agregar Persona' }}</div>
        </q-card-section>
  
        <q-card-section>
          <q-input v-model="person.cedula" label="Cédula" />
          <q-input v-model="person.nombre" label="Nombre" />
          <q-input v-model="person.apellido" label="Apellido" />
          <q-input v-model="person.email" label="Correo" />
          <q-input v-model="person.telefono" label="Teléfono" />
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="dialogVisible = false" /> <!-- Cerrar el diálogo manualmente -->
          <q-btn flat label="Guardar" color="primary" @click="savePerson" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  import { ref, watch } from 'vue'
  import { personService } from '../Utils/personService'
  
  export default {
    props: {
      visible: Boolean,
      personData: Object,
      isEditing: Boolean
    },
    emits: ['update:visible', 'saved', 'error'],  // Añadimos el evento 'error' para emitir el mensaje de error al componente padre
    setup (props, { emit }) {
      const dialogVisible = ref(props.visible)
      const person = ref({ ...props.personData }) // Copia la persona actual
  
      // Guarda la persona (nueva o editada)
      const savePerson = async () => {
        try {
          if (props.isEditing) {
            await personService.editPerson(person.value)
          } else {
            await personService.addPerson(person.value)
          }
          emit('saved')  // Emitir evento para indicar que se guardó correctamente
          handleDialogClose()  // Cerrar el diálogo tras guardar
        } catch (error) {
          if (error.response && error.response.status === 400) {
            emit('error', error.response.data || 'Error al guardar la persona.')  // Emitimos el error al componente padre
          } else {
            emit('error', 'Error inesperado al guardar la persona.')  // Emitimos un error genérico si no es 400
          }
        }
      }
  
      // Actualiza la visibilidad del diálogo cuando cambie la prop `visible`
      watch(() => props.visible, newVal => {
        dialogVisible.value = newVal
        if (newVal) {
          person.value = { ...props.personData }  // Actualiza los datos cuando se abre el diálogo
        }
      })
  
      // Maneja el cierre del diálogo y emite el evento de cierre
      const handleDialogClose = () => {
        dialogVisible.value = false
        emit('update:visible', false)  // Emitimos para que el componente padre cierre el diálogo
      }
  
      return {
        dialogVisible,
        person,
        savePerson,
        handleDialogClose
      }
    }
  }
  </script>
  