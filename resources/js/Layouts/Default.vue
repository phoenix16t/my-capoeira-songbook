<template>
    <div class="flex justify-center bg-gray-500">
        <div class="flex flex-col h-screen max-w-[1000px] w-full">
            <header class="flex items-center h-16 bg-red-500 px-4 text-xl">
                My Capoeira Songbook
            </header>
            <div class="bg-white flex-grow p-4">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup></script>
