<template>
    <div class="flex h-screen">
        <!-- SidebarComponent: 15% del ancho -->
        <SidebarComponent />

        <!-- Contenido principal: 85% restante -->
        <main class="w-[85%] p-6 bg-gray-100">
            <div class=" max-w-6xl mx-auto px-4 py-8">
                <h2 class="text-4xl font-black mb-8 text-black">Perfil de usuario</h2>
                <section class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div class="flex justify-center">
                        <img class="" src="../assets/profile.png" />
                    </div>
                    <div class="flex flex-col justify-center gap-4">
                        <Button _texto="Editar Usuario" _color="bg-blue-500"  />
                        <Button _texto="Cambiar Contraseña" _color="bg-blue-500"  />
                    </div>

                </section>
                <section class="grid grid-cols-2 gap-4  text-black">
                    <InputTexto label="Nombre" _placeholder="Julia Perez" :_onClick="handleClick" />
                    <InputTexto label="Rol de Usuario" _placeholder="Administrador del Hogar" :_onClick="handleClick" />
                    <InputTexto label="Email" _placeholder="joe.doe@gmail.com" :_onClick="handleClick" />
                    <InputTexto label="Ubicación" _placeholder="Perú, Lima" :_onClick="handleClick" />
                    <InputTexto label="Teléfono Celular" _placeholder="954302758" :_onClick="handleClick" />
                    <InputTexto label="Dirección" _placeholder="Jr. La Paz 884, Cercado de Lima"
                        :_onClick="handleClick" />
                </section>
            </div>
        </main>

    </div>
</template>











<script lang="ts">
import Button from '../components/shared/Button.vue'
import InputTexto from '../components/shared/InputTexto.vue';
import SidebarComponent from '../components/home/SidebarComponent.vue';

export default {
    components: {
        Button,
        InputTexto,
        SidebarComponent
    },
    methods: {
        handleClick() {
            console.log("Botón clickeado desde la vista")
        }
    }
}
</script>



<style scopeed></style>