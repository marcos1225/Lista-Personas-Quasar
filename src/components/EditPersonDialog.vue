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
          <q-btn flat label="Cancelar" @click="dialogVisible = false" /> 
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
    emits: ['update:visible', 'saved', 'error'], 
    setup (props, { emit }) {
      const dialogVisible = ref(props.visible)
      const person = ref({ ...props.personData }) 
  
      // Guarda la persona (nueva o editada)
      const savePerson = async () => {
        try {
          if (props.isEditing) {
            await personService.editPerson(person.value)
          } else {
            await personService.addPerson(person.value)
          }
          emit('saved') 
          handleDialogClose()  
        } catch (error) {
          if (error.response && error.response.status === 400) {
            emit('error', error.response.data || 'Error al guardar la persona.')  
          } else {
            emit('error', 'Error inesperado al guardar la persona.') 
          }
        }
      }
  
      // Actualiza la visibilidad del diálogo cuando cambia la prop `visible`
      watch(() => props.visible, newVal => {
        dialogVisible.value = newVal
        if (newVal) {
          person.value = { ...props.personData }  // Actualiza los datos de la persona cuando se abre el diálogo
        }
      })
  
      // Maneja el cierre del diálogo 
      const handleDialogClose = () => {
        dialogVisible.value = false
        emit('update:visible', false)  
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
  