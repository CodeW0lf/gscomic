<template>
  <div>
    <p class="font-semibold">
      Comic updates (almost) weekly, Currently posting on Fridays.
    </p>
    <p>
      Like the comic? Support me on
      <a
          href="https://www.patreon.com/elitetrick"
          target="_blank"
          class="text-patreon hover:text-white"
      >
        <svg
            class="fill-current inline-block w-4 h-4 align-text-top"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <title>Patreon icon</title>
          <path
              d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"
          />
        </svg>
        Patreon
      </a>
      or buy me a
      <a href="https://ko-fi.com/trickfoxx" target="_blank" class="text-kofi hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"
             class="fill-current inline-block w-4 h-4 align-text-top"
             viewBox="0 0 24 24">
          <path
              d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734c4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09c-.443-.441-3.368-3.049-4.034-3.954c-.709-.965-1.041-2.7-.091-3.71c.951-1.01 3.005-1.086 4.363.407c0 0 1.565-1.782 3.468-.963c1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"
              fill="currentColor"/>
        </svg>
        Ko-fi
      </a>
    </p>
    <p class="mt-8 mb-4">
      Copyright &copy; {{ new Date().getFullYear() }} Steven Lloyd. All rights
      reserved
    </p>
  </div>
</template>
<script>
export default {
  name: 'site-footer',
}
</script>
