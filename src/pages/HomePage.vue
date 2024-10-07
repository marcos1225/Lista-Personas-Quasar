<template>
  <q-page>
    <article class="w-full flex flex-col items-center justify-center mt-4 p-4 md:p-8 md:w-[600px] mx-auto bg-[] shadow-xl rounded-lg">
      <h1 class="text-3xl font-bold text-gray-700 mb-2">¡Bienvenido!</h1>

      <p class="w-full p-4 text-wrap text-base  md:text-[1rem] text-gray-600 mb-4">
        Administra tus contactos de manera rápida y sencilla. ¡Mantén tu lista siempre actualizada con solo unos clicks!
      </p>

      <img class="w-[500px] h-56 rounded-xl object-cover mb-6" src="https://prometteursolutions.com/images/blogs/flt4r.png" alt="Registro de Personas">

      <div class="flex space-x-4 mt-4">
        <q-btn to="/personas" label="Ver Lista" color="primary" icon="list" class="q-mt-md animate-bounce" />
      </div>

      <div class="mt-8 text-gray-600">
        <p class="w-full p-4 text-wrap text-base md:text-[1rem] text-gray-600 -mt-4 md:-mt-8">
          ¡Gestiona toda tu base de datos de forma eficiente y sin complicaciones!
        </p>
      </div>
    </article>
  </q-page>
</template>
