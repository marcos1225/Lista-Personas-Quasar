<template>
  <q-dialog v-model="dialogVisible" @hide="handleDialogClose">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          ¿Estás seguro de que deseas eliminar a 
          <span class="text-red-700">{{ personData.nombre }}</span> de la lista?
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="handleDialogClose" />
        <q-btn flat label="Eliminar" color="negative" @click="confirmDelete" />
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
    personData: Object 
  },
  emits: ['update:visible', 'deleted'],  
  setup (props, { emit }) {
    const dialogVisible = ref(props.visible) 

    const confirmDelete = async () => {
      try {
        await personService.deletePerson(props.personData.cedula)
        emit('deleted')  
        handleDialogClose()  
      } catch (error) {
        console.error('Error al eliminar la persona:', error)
      }
    }

    watch(() => props.visible, (newVal) => {
      dialogVisible.value = newVal
    })

    const handleDialogClose = () => {
      dialogVisible.value = false
      emit('update:visible', false)  
    }

    return {
      dialogVisible,
      confirmDelete,
      handleDialogClose
    }
  }
}
</script>
