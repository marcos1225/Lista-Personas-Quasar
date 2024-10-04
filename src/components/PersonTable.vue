<script>
import { ref } from 'vue'

export default {
  setup () {
    // Datos de la tabla (personas)
    const rows = ref([
      { nombre: 'Juan', apellido: 'Pérez', correo: 'juan.perez@example.com', telefono: '8765-3674' },
      { nombre: 'Ana', apellido: 'García', correo: 'ana.garcia@example.com', telefono: '6548-2345' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
      { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@example.com', telefono: '6087-6534' },
    ])

    // Definición de las columnas
    const columns = [
      { name: 'nombre', label: 'Nombre', align: 'left', field: row => row.nombre, sortable: true },
      { name: 'apellido', label: 'Apellido', align: 'left', field: row => row.apellido, sortable: true },
      { name: 'correo', label: 'Correo', align: 'left', field: 'correo', sortable: true, style: 'width: 100px' },
      { name: 'telefono', label: 'Teléfono', align: 'center', field: 'telefono' },
      { name: 'actions', label: 'Acciones', align: 'center' }
    ]

    // Estado para el diálogo de edición/agregar
    const editDialog = ref(false)
    const viewDialog = ref(false) // Diálogo para ver información
    const currentRow = ref({})
    const isEditing = ref(false)

    // Estado para el diálogo de eliminación
    const deleteDialog = ref(false)
    const deleteRowData = ref({})

    // Abrir diálogo para agregar nueva persona
    const openAddDialog = () => {
      currentRow.value = { nombre: '', apellido: '', correo: '', telefono: '' }
      isEditing.value = false
      editDialog.value = true
    }

    // Abrir diálogo para editar una persona existente
    const editRow = (row) => {
      currentRow.value = { ...row } // Clona los datos de la persona
      isEditing.value = true
      editDialog.value = true
    }

    // Abrir diálogo para ver una persona existente
    const viewrow = (row) => {
      currentRow.value = { ...row } // Clona los datos de la persona
      viewDialog.value = true
    }

    // Guardar cambios (para agregar o editar)
    const saveRow = () => {
      if (isEditing.value) {
        const index = rows.value.findIndex(r => r.nombre === currentRow.value.nombre)
        if (index !== -1) {
          rows.value[index] = { ...currentRow.value }
        }
      } else {
        rows.value.push({ ...currentRow.value })
      }
      editDialog.value = false
    }

    // Confirmar eliminación de persona
    const confirmDelete = (row) => {
      deleteRowData.value = row
      deleteDialog.value = true
    }

    // Eliminar la persona confirmada
    const deleteRow = () => {
      rows.value = rows.value.filter(r => r.nombre !== deleteRowData.value.nombre)
      deleteDialog.value = false
    }

    return {
      rows,
      columns,
      editDialog,
      viewDialog,
      currentRow,
      isEditing,
      deleteDialog,
      deleteRowData,
      openAddDialog,
      editRow,
      viewrow,
      saveRow,
      confirmDelete,
      deleteRow
    }
  }
}
</script>

<template>
    <div class="q-pa-md">
      <!-- Tabla principal -->
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="nombre"
        >
   <!-- Slot para el título y el botón de agregar -->
   <template v-slot:top>
        <div class="q-pa-md">
          <div class="text-2xl font-semibold">Lista De Personas</div>
          <q-btn class="q-mt-md" color="positive" label="Agregar Nueva Persona" icon="add" @click="openAddDialog" />
        </div>
      </template>

      <!-- Personalizar el tamaño del label en el header de la columna -->
      <template v-slot:header-cell="props">
        <q-th align="center">
          <div class="text-lg">{{ props.col.label }}</div>
        </q-th>
      </template>

      <!-- Personalizar el tamaño del texto en la información de las filas -->
      <template v-slot:body-cell="props">
        <q-td :props="props">
            <div class="text-[1rem] text-center">
            <!-- Check if field is a function, and call it, else access directly -->
            {{ typeof props.col.field === 'function' ? props.col.field(props.row) : props.row[props.col.field] }}
            </div>
        </q-td>
        </template>

  <!-- Columnas de acciones (Ver, Editar, Eliminar) -->
     <template v-slot:body-cell-actions="props" >
    <q-td align="center">
      <q-btn class="q-mr-sm" color="warning" icon="visibility" @click="viewrow(props.row)" />
      <q-btn class="q-mr-sm" color="primary" icon="edit" @click="editRow(props.row)" />
      <q-btn color="negative" icon="delete" @click="confirmDelete(props.row)" />
    </q-td>
     </template>
    </q-table>
      <!-- Diálogo para Agregar / Editar Fila -->
      <q-dialog v-model="editDialog">
        <q-card class="w-[400px]">
          <q-card-section>
            <div class="text-h6">{{ isEditing ? 'Editar Persona' : 'Agregar Persona' }}</div>
          </q-card-section>
  
          <q-card-section>
            <q-input v-model="currentRow.nombre" label="Nombre" />
            <q-input v-model="currentRow.apellido" label="Apellido" />
            <q-input v-model="currentRow.correo" label="Correo" />
            <q-input v-model="currentRow.telefono" label="Teléfono" />
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cancelar"  v-close-popup />
            <q-btn flat label="Guardar" color="primary" @click="saveRow" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
      <!-- Diálogo para Ver Información --> 
      <q-dialog v-model="viewDialog">
        <q-card class="w-[400px]">
          <q-card-section>
            <div class="text-h6">Información de la Persona</div>
          </q-card-section>
  
          <q-card-section>
            <q-input v-model="currentRow.nombre" label="Nombre" readonly />
            <q-input v-model="currentRow.apellido" label="Apellido" readonly />
            <q-input v-model="currentRow.correo" label="Correo" readonly />
            <q-input v-model="currentRow.telefono" label="Teléfono" readonly />
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
      <!-- Confirmación de Eliminación -->
      <q-dialog v-model="deleteDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">¿Estás seguro de que deseas eliminar a <span class="text-red-700">{{ deleteRowData.nombre }}</span> de la lista?</div>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cancelar"  v-close-popup />
            <q-btn flat label="Eliminar" color="negative" @click="deleteRow" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
