<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="cedula"
    >
      <template v-slot:top>
        <div class="q-pa-md">
          <div class="text-2xl font-semibold">Lista De Personas</div>
          <q-btn class="q-mt-md text-xs" color="primary" label="Agregar" icon="add" @click="openAddDialog" />
        </div>
      </template>

      <template v-slot:header-cell="props">
        <q-th align="center">
          <div class="text-lg">{{ props.col.label }}</div>
        </q-th>
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props">
          <div class="text-[1rem] text-center">
            {{ typeof props.col.field === 'function' ? props.col.field(props.row) : props.row[props.col.field] }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn class="q-mr-sm bg-gray-600 text-white text-xs" label="Ver" icon="visibility" @click="viewRow(props.row)" />
          <q-btn class="q-mr-sm text-xs" color="primary" label="Editar" icon="edit" @click="editRow(props.row)" />
          <q-btn class="text-xs" color="negative" label="Eliminar" icon="delete" @click="confirmDelete(props.row)" />
        </q-td>
      </template>
    </q-table>

    <ViewPersonDialog 
      :visible="viewDialog" 
      :personData="currentRow"
      @update:visible="viewDialog = $event" 
    />

    <EditPersonDialog 
      :visible="editDialog" 
      :personData="currentRow" 
      :isEditing="isEditing"
      @update:visible="editDialog = $event"  
      @saved="fetchPersons"  
      @error="showErrorDialog"  
    />

    <DeletePersonDialog 
      :visible="deleteDialog" 
      :personData="deleteRowData" 
      @update:visible="deleteDialog = $event"
      @deleted="fetchPersons"  
    />
    <ErrorDialog
      :model-value="errorDialogVisible"
      :message="errorMessage"
      @update:model-value="errorDialogVisible = $event"
    />
  </div>
</template>


<script>
import { ref, onMounted } from 'vue'
import { personService } from '../Utils/personService'
import EditPersonDialog from './EditPersonDialog.vue'
import ViewPersonDialog from './ViewPersonDialog.vue'
import DeletePersonDialog from './DeletePersonDialog.vue'
import ErrorDialog from './ErrorDialog.vue'

export default {
  components: {
    EditPersonDialog,
    ViewPersonDialog,
    DeletePersonDialog,
    ErrorDialog
  },
  setup () {
    const rows = ref([])
    const columns = [
      { name: 'cedula', label: 'Cédula', align: 'left', field: row => row.cedula, sortable: true },
      { name: 'nombre', label: 'Nombre', align: 'left', field: row => row.nombre, sortable: true },
      { name: 'apellido', label: 'Apellido', align: 'left', field: row => row.apellido, sortable: true },
      { name: 'email', label: 'Correo', align: 'left', field: 'email', sortable: true },
      { name: 'telefono', label: 'Teléfono', align: 'center', field: 'telefono' },
      { name: 'actions', label: 'Acciones', align: 'center' }
    ]
    const editDialog = ref(false) //Estado para abrir/cerrar el dialogo de editar
    const viewDialog = ref(false)  //Estado para poder abrir/cerrar el dialogo de ver
    const deleteDialog = ref(false)  //Estado para poder abrir/cerrar el dialogo de eliminar
    const currentRow = ref({})  //Estado para poder guardar la informacion de la fila seleccionada
    const deleteRowData = ref({}) //Estado para poder guardar la informacion de la fila seleccionada a eliminar
    const isEditing = ref(false)  //Estado para saber si el dialogo es de editar o agregar
    const errorDialogVisible = ref(false)  // Estado para controlar la visibilidad del diálogo de error
    const errorMessage = ref('')  // Estado para almacenar el mensaje de error

    const fetchPersons = async () => {
      try {
        const response = await personService.fetchPersons()
        rows.value = response.data
      } catch (error) {
        console.error('Error al obtener la lista de personas:', error)
      }
    }

    const openAddDialog = () => {
      currentRow.value = { cedula: '', nombre: '', apellido: '', email: '', telefono: '' }
      isEditing.value = false
      editDialog.value = true
    }

    const editRow = (row) => {
      currentRow.value = { ...row }
      isEditing.value = true
      editDialog.value = true
    }

    const viewRow = (row) => {
      currentRow.value = { ...row }
      viewDialog.value = true
    }

    const confirmDelete = (row) => {
      deleteRowData.value = row
      deleteDialog.value = true
    }


    const showErrorDialog = (message) => {
      errorMessage.value = message
      errorDialogVisible.value = true
    }

    onMounted(() => {
      fetchPersons()
    })

    return {
      rows,
      columns,
      editDialog,
      viewDialog,
      deleteDialog,
      currentRow,
      deleteRowData,
      isEditing,
      fetchPersons,
      openAddDialog,
      editRow,
      viewRow,
      confirmDelete,
      errorDialogVisible,
      errorMessage,
      showErrorDialog
    }
  }
}
</script>