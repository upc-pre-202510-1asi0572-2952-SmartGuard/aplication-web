<template>
    <WrapperScreen>
          <div class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl">
                <h1 class="text-3xl font-semibold">Configuración</h1>
                <section class="shadow-md p-4 bg-white rounded-xl flex flex-col gap-6">
                    <h2 class="text-2xl font-semibold">Alertas</h2>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-row justify-between">
                            <label class="mr-3">Notificaciones del Acceso</label>
                            <ToggleSwitch label="Notificaciones del Acceso" />
                        </div>

                        <div class="flex flex-row justify-between">
                            <label class="mr-3">Alerta de dispositivos</label>
                            <ToggleSwitch label="Alerta de dispositivos" />
                        </div>

                        <div class="flex flex-row justify-between">
                            <label class="mr-3">Advertencias del sistema</label>
                            <ToggleSwitch label="Alerta de dispositivos" />
                        </div>


                        <div class="flex flex-row justify-between">
                            <label class="mr-3">Activar led cuando un usuario ingresa</label>
                            <ToggleSwitch label="Activar led cuando un usuario ingresa" />
                        </div>

                    </div>
                </section>

                <section class="shadow-md p-4 bg-white rounded-xl flex flex-col gap-6">
                    <h2 class="text-2xl font-semibold">General</h2>
                    <div class="flex flex-col gap-4">

                        <div class="flex flex-row justify-between">
                            <label class="mr-3">Actualizaciones automáticas</label>
                            <ToggleSwitch label="Actualizaciones automáticas" />
                        </div>

                        <div class="flex flex-row justify-between">
                            <label class="mr-3">Sonido en notificaciones</label>
                            <ToggleSwitch label="Sonido en notificaciones" />
                        </div>

                        <div class="flex flex-row justify-between">
                            <label class="mr-3" name="modo_ahorro_de_energia" id="modo_ahorro_de_energia">Modo ahorro de
                                energía</label>
                            <ToggleSwitch for="modo_ahorro_de_energia" />
                        </div>

                        <div class="flex flex-row justify-between">
                            <label class="mr-3">Modo oscuro</label>
                            <ToggleSwitch for="modo_ahorro_de_energia" />

                        </div>

                    </div>
                </section>

                <section class="flex flex-col gap-4 justify-between bg-white p-4 rounded-xl shadow-md">
                    <span class="text-2xl font-semibold">Ayuda</span>
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <span class="font-semibold">Acerca de Nosotros</span>
                        <Button _texto="Guardar Cambios" _color="bg-blue-600" />
                    </div>
                </section>
            </div>

    </WrapperScreen>

</template>




<script>
import SidebarComponent from '../components/home/SidebarComponent.vue';
import Button from '../components/shared/Button.vue';
import WrapperScreen from '../components/WrapperScreen.vue';

export default {
    components: {
        SidebarComponent,
        Button,
        WrapperScreen
    },
    methods: {
        prueba() {
            console.log("holiwi");
        }
    }
}
</script>


<style lang="">

</style>