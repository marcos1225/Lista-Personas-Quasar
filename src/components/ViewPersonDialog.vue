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
import { personService } from '../Utils/personService' 

export default {
  props: {
    visible: Boolean,  // Prop que controla la visibilidad del diálogo
    personData: Object  // Datos  de la persona
  },
  emits: ['update:visible'],  // Emite evento para actualizar la visibilidad de este dialogo en PersonTable
  setup (props, { emit }) {
    const dialogVisible = ref(props.visible)  // Controla la visibilidad local del diálogo
    const person = ref({ ...props.personData })  // Estado local para los datos de la persona

    // Llamada al servicio para obtener los datos completos de la persona
    const fetchPersonDetails = async (cedula) => {
      try {
        const response = await personService.viewPerson(cedula)
        person.value = response.data  // Actualiza los datos de la persona con los recibidos desde el API
      } catch (error) {
        console.error('Error al obtener los detalles de la persona:', error)
      } 
    }

    // Observa el cambio en la visibilidad del diálogo
    watch(() => props.visible, (newVal) => {
      dialogVisible.value = newVal
      if (newVal) {
        fetchPersonDetails(props.personData.cedula)  // Llama a la función para obtener los detalles cuando se abre el diálogo
        console.log(props.personData.cedula);
      }
    })

    // Función para manejar el cierre del diálogo
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
