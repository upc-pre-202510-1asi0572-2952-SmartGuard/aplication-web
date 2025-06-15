<template>
  <WrapperScreen>
    <div class="form-wrapper">
      <h1 class="form-title">Editar Miembro</h1>

      <!-- Paso 1: Digitar ID y cargar datos -->
      <div class="form-group id-group">
        <label for="memberId">ID del Miembro</label>
        <div class="id-input-box">
          <input
              id="memberId"
              type="text"
              v-model="memberId"
              placeholder="Escribe el ID y presiona Cargar"
              class="input-box"
          />
          <button type="button" @click="loadMember" class="btn btn-secondary">
            Cargar
          </button>
        </div>
      </div>

      <p v-if="!loaded" class="info-text">
        Ingresa un ID y haz clic en “Cargar” para traer los datos.
      </p>

      <!-- Paso 2: Formulario de edición -->
      <form v-if="loaded" @submit.prevent="editMember" class="form">
        <!-- ID readonly -->
        <div class="form-group">
          <label for="memberIdRead">ID del Miembro</label>
          <input
              id="memberIdRead"
              type="text"
              :value="member.id"
              readonly
              class="input-box"
          />
        </div>

        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input
              id="nombre"
              type="text"
              v-model="member.nombre"
              required
              class="input-box"
          />
        </div>

        <div class="form-group">
          <label for="edad">Edad</label>
          <input
              id="edad"
              type="number"
              v-model.number="member.edad"
              min="0"
              required
              class="input-box"
          />
        </div>

        <div class="form-group">
          <label for="parentesco">Parentesco</label>
          <input
              id="parentesco"
              type="text"
              v-model="member.parentesco"
              class="input-box"
          />
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea
              id="descripcion"
              v-model="member.descripcion"
              rows="3"
              required
              class="input-box"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="fotoPerfil">URL FotoPerfil</label>
          <input
              id="fotoPerfil"
              type="text"
              v-model="member.fotoPerfil"
              required
              class="input-box"
          />
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary">
            Guardar cambios
          </button>
          <button type="button" @click="cancel" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import WrapperScreen from "../components/WrapperScreen.vue";
import type {Member} from "../interfaces/Member.ts";


const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

export default defineComponent({
  name: 'EditMemberView',
  components: { WrapperScreen },
  setup() {
    const router = useRouter()
    const memberId = ref<string>('')
    const loaded = ref(false)

    const member = reactive<Member>({
      // id?: string; so this starts undefined, but reactive must define it:
      id: '',
      nombre: '',
      edad: 0,
      parentesco: '',
      descripcion: '',
      fotoPerfil: '',
      userNickname: ''
    })

    const loadMember = async () => {
      if (!memberId.value.trim()) {
        alert('Debes ingresar un ID válido.')
        return
      }
      try {
        const res = await fetch(
            `${backendUrl}/api/v1/miembroMysql/${memberId.value.trim()}`
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        member.id = data.Id
        member.nombre = data.Nombre
        member.edad = data.Edad
        member.parentesco = data.Parentesco
        member.descripcion = data.Descripcion
        member.fotoPerfil = data.FotoPerfil
        member.userNickname = data.UserId
        loaded.value = true
      } catch (err) {
        console.error('Error cargando miembro:', err)
        alert('No se pudo cargar el miembro. Verifica el ID.')
      }
    }

    const editMember = async () => {
      if (
          !member.id?.trim() ||
          !member.nombre.trim() ||
          member.edad === null ||
          !member.descripcion.trim() ||
          !member.fotoPerfil.trim()
      ) {
        alert('Completa todos los campos antes de guardar.')
        return
      }
      if (!confirm(`¿Guardar cambios para ID ${member.id}?`)) return

      try {
        const res = await fetch(`${backendUrl}/api/v1/miembroMysql`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: member.id,
            nombre: member.nombre,
            edad: member.edad,
            parentesco: member.parentesco,
            descripcion: member.descripcion,
            fotoPerfil: member.fotoPerfil
          })
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        alert('Miembro actualizado correctamente.')
        router.push({ name: 'Members' })
      } catch (err: any) {
        console.error('Error actualizando miembro:', err)
        alert(`Error al guardar: ${err.message}`)
      }
    }

    const cancel = () => router.back()

    return { memberId, loaded, member, loadMember, editMember, cancel }
  }
})
</script>

<style scoped>

.id-group .id-input-box {
  display: flex;
  gap: 0.5rem;
}
.info-text {
  font-style: italic;
  color: #666;
  text-align: center;
}

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
