<template>
    <WrapperScreen>
        <div class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl">
            <h1 class="text-3xl font-semibold">Perfil de usuario</h1>
            <section class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div class="flex justify-center">
                    <img class="" src="../assets/profile.png" />
                </div>
                <div class="flex flex-col justify-center gap-4">
                    <Button _texto="Editar Usuario" _color="bg-blue-500" />
                    <Button _texto="Cambiar Contraseña" _color="bg-blue-500" />
                    <Button _texto="Eliminar cuenta" _color="bg-red-500" @click="onDeleteAccount" />
                </div>

            </section>
            <section class="grid grid-cols-2 gap-4  text-black">
                <InputTexto label="Nombre" _placeholder="Julia Perez" :_onClick="handleClick" />
                <InputTexto label="Rol de Usuario" _placeholder="Administrador del Hogar" :_onClick="handleClick" />
                <InputTexto label="Email" _placeholder="joe.doe@gmail.com" :_onClick="handleClick" />
                <InputTexto label="Ubicación" _placeholder="Perú, Lima" :_onClick="handleClick" />
                <InputTexto label="Teléfono Celular" _placeholder="954302758" :_onClick="handleClick" />
                <InputTexto label="Dirección" _placeholder="Jr. La Paz 884, Cercado de Lima" :_onClick="handleClick" />
            </section>
        </div>
    </WrapperScreen>
</template>











<script lang="ts">
import Button from '../components/shared/Button.vue'
import InputTexto from '../components/shared/InputTexto.vue';
import SidebarComponent from '../components/home/SidebarComponent.vue';
import WrapperScreen from '../components/WrapperScreen.vue';
export default {
    components: {
        Button,
        InputTexto,
        SidebarComponent,
        WrapperScreen
    },
    methods: {
        handleClick() {
            console.log("Botón clickeado desde la vista")
        },
        onEditUser() {
            this.$router.push('/profile/edit')
        },
        onChangePassword() {
            this.$router.push('/profile/change-password')
        },
        async onDeleteAccount() {
            const confirmed = confirm(
                '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.'
            )
            if (!confirmed) return

            try {
                await fetch('/api/user', { method: 'DELETE' })
                this.$router.push('/login')
            } catch (e) {
                alert('Error al eliminar la cuenta. Intenta de nuevo.')
            }
        }
    }
}
</script>



<style scopeed></style>