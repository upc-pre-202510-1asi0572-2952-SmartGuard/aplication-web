<template>
    <WrapperScreen>
        <div class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl">
            <h1 class="text-3xl font-semibold">Membresía</h1>
            <p class="text-xl font-light"><span class="font-black mr-4">¿Por qué optar por
                    Premium?</span> Con
                SmartGuard Premium obtienes mayor seguridad con alertas en tiempo real, control remoto desde
                cualquier
                lugar, estadísticas detalladas, gestión avanzada de usuarios, respaldo automático en la nube y
                soporte
                prioritario, todo para proteger tu hogar con comodidad y eficiencia</p>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8">
                <div
                    class="text-xl  text-black border-2 border-black hover:bg-[#74B4FF] duration-200 ease-in-out cursor-pointer  bg-[#D1E6FF] rounded-4xl p-16">
                    <h4 class="text-4xl font-medium mb-1">Free </h4>
                    <span class="text-4xl font-black">$0</span>
                    <div class="border-b-black border-b-2 my-8"></div>
                    <div class="flex flex-col gap-8 mt-4 ">
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" />
                            <span>Monitoreo </span>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" /><span>2
                                Miembros </span>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" /><span>
                                Sin consultas de historial de acceso</span>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" /><span>
                                Sin sonido de alerta</span>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" /><span>
                                Sonido de bloqueos limitados</span>
                        </div>
                        <Button class="font-semibold" _texto="Plan actual" />
                    </div>
                </div>
                <div
                    class="relative text-xl  text-black border-2 border-black hover:bg-[#74B4FF] duration-200 ease-in-out cursor-pointer  bg-[#D1E6FF] rounded-4xl p-16">
                    <img class="absolute top-[-2rem] right-0  h-32 w-32" src="../assets/bestIcon.png"
                        alt="icon" />
                    <h4 class="text-4xl font-medium mb-1">Premium </h4>
                    <span class="text-4xl font-black">$10</span>
                    <div class="border-b-black border-b-2 my-8"></div>
                    <div class="flex flex-col gap-8 mt-4 ">
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" />
                            <span>Monitoreo en tiempo real </span>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" /><span>
                                Miembros ilimitados </span>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" /><span>Sonido
                                Historial de acceso
                                ilimitado</span>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" /><span>Sonido
                                Sonido de alerta</span>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <img class="h-6 w-6" src="../assets/check.png" alt="icon" /><span>Sonido
                                Bloqueos ilimitados</span>
                        </div>
                        <Button class="font-semibold" _texto="Conseguir plan" />
                    </div>

                </div>
            </div>

        </div>
    </WrapperScreen>
</template>










<script lang="ts">
import Button from '../components/shared/Button.vue'
import SidebarComponent from '../components/home/SidebarComponent.vue';
import WrapperScreen from '../components/WrapperScreen.vue';

export default {
    components: {
        Button,
        SidebarComponent,
        WrapperScreen
    },
    methods: {
        handleClick() {
            console.log("Botón clickeado desde la vista")
        }
    }
}
</script>



<style scopeed></style>