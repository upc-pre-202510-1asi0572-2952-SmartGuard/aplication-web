<template>
  <WrapperScreen>
    <div class="form-wrapper">
      <h1 class="form-title">Eliminar Miembro</h1>
      <form @submit.prevent class="form">
        <div class="form-group">
          <label for="memberId">ID del Miembro</label>
          <input
              id="memberId"
              type="text"
              v-model="memberId"
              required
              class="input-box"
          />
        </div>
        <div class="button-group">
          <button type="button" class="btn btn-danger" @click="deleteMember">
            Eliminar
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
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import WrapperScreen from "../components/WrapperScreen.vue";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

export default defineComponent({
  name: 'DeleteMemberView',
  components: { WrapperScreen },
  setup() {
    const router = useRouter()
    const memberId = ref<string>('')

    const deleteMember = async () => {
      if (!memberId.value.trim()) {
        alert('Ingrese un ID válido (string completo).')
        return
      }
      if (
          !confirm(
              `¿Estás seguro de eliminar el miembro con ID "${memberId.value}"? Esta acción es irreversible.`
          )
      ) {
        return
      }

      try {
        const res = await fetch(
            `${backendUrl}/api/v1/miembroMysql/${memberId.value}`,
            { method: 'DELETE' }
        )
        if (res.ok) {
          alert(`Miembro con ID "${memberId.value}" eliminado correctamente.`)
          router.push({ name: 'Members' })
        } else {
          alert(`Error al eliminar el miembro. Status: ${res.status}`)
        }
      } catch (error: any) {
        console.error('Error al eliminar miembro:', error)
        alert(`Error al eliminar: ${error.message}`)
      }
    }

    const cancel = () => {
      router.back()
    }

    return { memberId, deleteMember, cancel }
  }
})
</script>

<style scoped>
.form-wrapper {
  max-width: 500px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
  border-color: #e53e3e;
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

.btn-danger {
  background-color: #e53e3e;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c53030;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #c6c6c6;
}
</style>
