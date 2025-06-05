<template>
  <WrapperScreen>
    <div class="form-wrapper">
      <h1 class="form-title">Editar Miembro</h1>
      <form @submit.prevent="editMember" class="form">
        <!-- ID del miembro -->
        <div class="form-group">
          <label for="memberId">ID del Miembro</label>
          <input
              id="memberId"
              type="number"
              v-model.number="memberId"
              min="1"
              required
              class="input-box"
          />
        </div>

        <!-- Nombre -->
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input
              id="nombre"
              type="text"
              v-model="nombre"
              required
              class="input-box"
          />
        </div>

        <!-- Edad -->
        <div class="form-group">
          <label for="edad">Edad</label>
          <input
              id="edad"
              type="number"
              v-model.number="edad"
              min="0"
              required
              class="input-box"
          />
        </div>

        <!-- Rol -->
        <div class="form-group">
          <label for="rol">Rol</label>
          <select id="rol" v-model="rol" required class="input-box">
            <option disabled value="">Seleccione...</option>
            <option value="Familiar">Familiar</option>
            <option value="Invitado">Invitado</option>
          </select>
        </div>

        <!-- Parentesco (opcional) -->
        <div class="form-group">
          <label for="parentesco">Parentesco (opcional)</label>
          <input
              id="parentesco"
              type="text"
              v-model="parentesco"
              class="input-box"
          />
        </div>

        <!-- Descripción -->
        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea
              id="descripcion"
              v-model="descripcion"
              rows="3"
              required
              class="input-box"
          ></textarea>
        </div>

        <!-- Foto (URL o nombre de archivo) -->
        <div class="form-group">
          <label for="foto">Foto (URL)</label>
          <input
              id="foto"
              type="text"
              v-model="foto"
              required
              class="input-box"
          />
        </div>

        <!-- Botones -->
        <div class="button-group">
          <button type="submit" class="btn btn-primary">Guardar</button>
          <button type="button" @click="cancel" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import WrapperScreen from "../components/WrapperScreen.vue"

export default defineComponent({
  name: 'EditMemberView',
  components: { WrapperScreen },
  setup() {
    const router = useRouter()

    // Campos del formulario
    const memberId = ref<number | null>(null)
    const nombre = ref<string>('')
    const edad = ref<number | null>(null)
    const rol = ref<string>('')
    const parentesco = ref<string>('')
    const descripcion = ref<string>('')
    const foto = ref<string>('')

    const editMember = async () => {
      if (
          !memberId.value ||
          !nombre.value.trim() ||
          edad.value === null ||
          !rol.value ||
          !descripcion.value.trim() ||
          !foto.value.trim()
      ) {
        alert('Complete todos los campos requeridos y asegúrese de ingresar un ID válido.')
        return
      }

      const confirmed = confirm(
          `¿Está seguro de guardar los cambios para el miembro con ID ${memberId.value}?`
      )
      if (!confirmed) return

      try {
        const payload = {
          nombre: nombre.value.trim(),
          edad: edad.value,
          rol: rol.value,
          parentesco: parentesco.value.trim() || undefined,
          descripcion: descripcion.value.trim(),
          foto: foto.value.trim(),
        }

        const res = await fetch(
            `https://fake-api-smartguard.vercel.app/members/${memberId.value}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            }
        )

        if (res.ok) {
          alert(`Miembro con ID ${memberId.value} actualizado correctamente.`)
          router.push({ name: 'Members' })
        } else {
          alert(`Error al actualizar el miembro. Status: ${res.status}`)
        }
      } catch (error: any) {
        console.error('Error al editar miembro:', error)
        alert(`Error al guardar cambios: ${error.message}`)
      }
    }

    const cancel = () => {
      router.back()
    }

    return {
      memberId,
      nombre,
      edad,
      rol,
      parentesco,
      descripcion,
      foto,
      editMember,
      cancel,
    }
  },
})
</script>

<style scoped>
.form-wrapper {
  max-width: 600px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #555;
}

.input-box {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-box:focus {
  outline: none;
  border-color: #3182ce;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3182ce;
  color: #fff;
}

.btn-primary:hover {
  background-color: #2b6cb0;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #c6c6c6;
}
</style>
