<template>
  <WrapperScreen>
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6">Editar Miembro por ID</h1>

      <!-- Paso 1: introducir ID -->
      <div v-if="step === 1" class="space-y-4">
        <InputTexto
            _placeholder="ID del Miembro"
            v-model="inputId"
        />
        <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>
        <div class="flex justify-center gap-4">
          <button
              @click="loadMember"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Cargar
          </button>
          <button
              @click="cancel"
              class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>

      <!-- Paso 2: formulario -->
      <div v-else class="space-y-4">
        <h2 class="text-xl font-medium mb-4">Editando Miembro ID: {{ member.id }}</h2>
        <form @submit.prevent="editMember" class="grid grid-cols-1 gap-4">
          <!-- Nombre -->
          <InputTexto
              label="Nombre"
              v-model="member.nombre"
              required
          />

          <!-- Edad -->
          <InputTexto
              label="Edad"
              type="number"
              v-model.number="member.edad"
              min="0"
              required
          />

          <!-- Parentesco -->
          <InputTexto
              label="Parentesco"
              v-model="member.parentesco"
          />

          <!-- Descripción -->
          <div class="form-group">
            <label class="mb-1 font-medium">Descripción</label>
            <textarea
                v-model="member.descripcion"
                rows="3"
                required
                class="input-box textarea-box"
            ></textarea>
          </div>

          <!-- FotoPerfil -->
          <InputTexto
              label="URL FotoPerfil"
              v-model="member.fotoPerfil"
              required
          />

          <!-- Botones -->
          <div class="flex justify-center mt-4 space-x-4">
            <button
                type="submit"
                class="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700"
            >
              Guardar Cambios
            </button>
            <button
                type="button"
                @click="cancel"
                class="bg-gray-500 text-white px-8 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import WrapperScreen from "../components/WrapperScreen.vue";
import InputTexto from "../components/shared/InputTexto.vue";
import type { Member } from "../interfaces/Member.ts";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

export default defineComponent({
  name: 'EditMemberView',
  components: { WrapperScreen, InputTexto },
  setup() {
    const router = useRouter();
    const step = ref(1);
    const inputId = ref<string>('');
    const errorMsg = ref<string>('');

    const member = reactive<Member>({
      id: '',
      nombre: '',
      edad: 0,
      parentesco: '',
      descripcion: '',
      fotoPerfil: '',
      userNickname: ''  // almacenamos pero no editamos
    });

    const loadMember = async () => {
      errorMsg.value = '';
      if (!inputId.value.trim()) {
        errorMsg.value = 'Ingresa un ID válido.';
        return;
      }
      try {
        const res = await fetch(
            `${backendUrl}/api/v1/miembroMysql/${inputId.value.trim()}`
        );
        if (res.status === 404) {
          errorMsg.value = `No existe un miembro con ID ${inputId.value}.`;
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();
        member.id            = d.Id;
        member.userNickname  = d.UserId;
        member.nombre        = d.Nombre;
        member.edad          = d.Edad;
        member.parentesco    = d.Parentesco;
        member.descripcion   = d.Descripcion;
        member.fotoPerfil    = d.FotoPerfil;
        step.value = 2;
      } catch (e) {
        errorMsg.value = 'Error al cargar el miembro.';
        console.error(e);
      }
    };

    const editMember = async () => {
      if (
          !member.nombre.trim() ||
          member.edad === null ||
          !member.descripcion.trim() ||
          !member.fotoPerfil.trim()
      ) {
        alert('Completa todos los campos antes de guardar.');
        return;
      }
      if (!confirm(`¿Guardar cambios para ID ${member.id}?`)) return;

      try {
        const payload = {
          id:          member.id,
          nombre:      member.nombre,
          edad:        member.edad,
          parentesco:  member.parentesco,
          descripcion: member.descripcion,
          fotoPerfil:  member.fotoPerfil
        };
        const res = await fetch(
            `${backendUrl}/api/v1/miembroMysql`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        alert('Miembro actualizado correctamente.');
        router.push({ name: 'Members' });
      } catch (e) {
        errorMsg.value = 'Error al guardar cambios.';
        console.error(e);
      }
    };

    const cancel = () => {
      router.push({ name: 'Members' });
    };

    return {
      step,
      inputId,
      errorMsg,
      member,
      loadMember,
      editMember,
      cancel
    };
  }
});
</script>

<style scoped>
.input-box {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s;
}

.textarea-box {
  /* Mismo estilo que inputs, altura ajustable */
  resize: vertical;
  min-height: 4rem;
}

.input-box:focus {
  outline: none;
  border-color: #3182ce;
}
</style>
