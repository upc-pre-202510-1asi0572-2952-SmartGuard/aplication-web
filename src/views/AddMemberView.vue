<template>
  <WrapperScreen>
    <div class="form-wrapper">
      <h1 class="form-title">Agregar Miembro</h1>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="member.nombre" required />
        </div>

        <div class="form-group">
          <label for="edad">Edad</label>
               <input
                   id="edad"
                   type="number"
                   v-model.number="member.edad"
                   min="0"
                   max="100"
                   required
               />
        </div>

        <div class="form-group">
          <label for="rol">Rol</label>
          <select id="rol" v-model="member.rol" required class="box">
            <option :value="MemberRole.Familiar">Familiar</option>
            <option :value="MemberRole.Invitado">Invitado</option>
          </select>
        </div>

        <div class="form-group" v-if="member.rol === MemberRole.Familiar">
          <label for="parentesco">Parentesco</label>
          <input id="parentesco" v-model="member.parentesco" required />
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" v-model="member.descripcion" required></textarea>
        </div>

        <div class="form-group">
          <label for="foto">URL Foto</label>
          <input id="foto" v-model="member.foto" required />
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary">Guardar</button>
          <button type="button" @click="$router.back()" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {type Member, MemberRole} from "../interfaces/Member.ts";

export default defineComponent({
  name: 'AddMemberView',
  setup() {
    const router = useRouter()
    const member = reactive<Member>({
      id: 0,
      nombre: '',
      edad: 0,
      rol: MemberRole.Familiar,
      parentesco: '',
      descripcion: '',
      foto: ''
    })

    const submitForm = async () => {
      // si es invitado, removemos parentesco
      if (member.rol === MemberRole.Invitado) {
        delete member.parentesco
      }

      const listRes = await fetch('https://fake-api-smartguard.vercel.app/members')
      if (!listRes.ok) {
        alert('No se pudo obtener la lista de miembros')
        return
      }
      const members: Array<{ id: number }> = await listRes.json()
      const nextId = members.length > 0
          ? Math.max(...members.map(m => m.id)) + 1
          : 1

      member.id = nextId

      const res = await fetch('https://fake-api-smartguard.vercel.app/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      })

      if (!res.ok) {
        alert('Error al agregar el miembro')
        return
      }

      alert('Miembro agregado correctamente')
      await router.push({ name: 'Members' })
    }

    return { member, submitForm, MemberRole }
  }
})
</script>

<style scoped>
.form-wrapper {
  max-width: 800px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
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

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4a90e2;
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
  background-color: #4a90e2;
  color: #fff;
}

.btn-primary:hover {
  background-color: #357abd;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #c6c6c6;
}

.box {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  appearance: none;
}
</style>
