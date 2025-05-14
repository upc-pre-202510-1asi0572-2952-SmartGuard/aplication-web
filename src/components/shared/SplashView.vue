<template>
    <section class="h-screen flex justify-end bg-gray-300 text-black">


        <div class="absolute bottom-0 left-0 w-screen h-[75vh] bg-white"
            style="clip-path: polygon(0 0, 0 100%, 100% 100%);"></div>

        <section class=" bg-gray-300 flex justify-end overflow-hidden">
            <img class="block h-fit mt-[50px]" src="../../assets/House.png" />
        </section>
        <section class="absolute bottom-0 w-full flex justify-center sm:justify-start">
            <div class="text-center max-w-sm sm:text-start sm:max-w-lg  p-12">
                <h1 class="uppercase  font-bold text-4xl mb-4">Más que seguridad, tranquilidad inteligente en tu hogar
                </h1>
                <p class="text-xl text-gray-600">Consigue tu cerradura inteligente y dale mayor seguridad a tu hogar</p >

                <router-link to="/login">
                    <Button _texto="Continuar" _color="w-[100px] lg:w-md bg-blue-500 mt-4" />
                </router-link>
            </div>
        </section>

    </section>
</template>


<script>
export default {

}
</script>


<style></style>