<template>
    <div class="flex h-screen">
        <!-- SidebarComponent: 15% del ancho -->
        <SidebarComponent />

        <!-- Contenido principal: 85% restante -->
        <main class="w-[85%] p-6 bg-gray-200 overflow-y-scroll">

            <div class="max-w-6xl bg-gray-100 shadow-2xl mx-auto px-8 py-8 text-black rounded-3xl">
                <h2 class="text-4xl font-black mb-8">Miembros</h2>
                <div class="flex flex-col sm:flex-row justify-between gap-4 ">
                    <p class="lg:w-md text-xl font-light ">Gestiona y controlar el acceso de todos los miembros que tienen
                        permiso
                        para acceder a tu hogar</p>
                    <div class="flex flex-col lg:w-md gap-4">
                        <Button class="font-semibold" _texto = "+ Agregar miembros" />
                        <Button class="font-semibold" _texto = "- Eliminar miembros" />
                    </div>
                </div>
                <div class="flex flex-col gap-4 mt-8">
                    <div v-for="(miembro, index) in miembros" :key="index"
                        class="border-2 border-black hover:bg-[#74B4FF] duration-200 ease-in-out cursor-pointer text-2xl font-light text-black grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 bg-[#D1E6FF] rounded-4xl p-8 lg:h-[240px]">

                        <div class="flex justify-center items-center lg:justify-start">
                            <img alt="photo profile" class="max-h-[180px]" :src="miembro.foto" />
                        </div>

                        <div class="flex flex-col items-center lg:items-start gap-2">
                            <h4 class="font-black border-b-black border-b-2 mb-2">{{ miembro.nombre }}</h4>
                            <span>{{ miembro.edad }}</span>
                            <span>{{ miembro.rol }}</span>
                            <span>{{ miembro.parentesco }}</span>
                        </div>
                        <div class="flex items-center">
                            <p class="text-center h-32 overflow-y-hidden">{{ miembro.descripcion }}</p>
                        </div>

                        <div class="flex justify-center items-center">
                            <img class="h-24 w-24" :src="miembro.foto" alt="icon" />
                        </div>
                    </div>
                </div>

            </div>
        </main>

    </div>
</template>











<script lang="ts">
import SidebarComponent from '../components/home/SidebarComponent.vue';
import Button from '../components/shared/Button.vue'
import profile1 from '../assets/profile.png';
import profile2 from '../assets/profile2.png';
import profile3 from '../assets/profile3.png'

export default {
    components: {
        Button,
        SidebarComponent
    },
    data() {
        return {
            miembros: [
                {
                    nombre: "Sofia Perez",
                    edad: 45,
                    rol: "Administradora",
                    parentesco: "Madre",
                    descripcion: "Soy Sofia, soy la encargada de cuidar este hogar por medio de mi consentimiendo de acceso",
                    foto: profile1
                },
                {
                    nombre: "Carlos Ramirez",
                    edad: 17,
                    rol: "Miembro",
                    parentesco: "Hijo",
                    descripcion: "Soy Carlos, uso la app para entrar a casa después de la escuela",
                    foto: profile2
                },
                {
                    nombre: "Alejandro Salas",
                    edad: 18,
                    rol: "Miembro",
                    parentesco: "Hijo",
                    descripcion: "Soy Alejandro y soy hijo de la familia, trabajo y llego tarde a casa, por ende necesito acceso a altas horas de la noche",
                    foto: profile3
                },
                {
                    nombre: "Pedro Casas",
                    edad: 19,
                    rol: "Miembro",
                    parentesco: "Hijo",
                    descripcion: "Soy Pedro y soy hijo de la familia, estudio diariamente y tengo turnos tempranos, necesito acceso generalmente por las tardes",
                    foto: profile3
                }
            ]
        }
    },
    methods: {
        handleClick() {
            console.log("Botón clickeado desde la vista")
        }
    }
}
</script>



<style scopeed></style>