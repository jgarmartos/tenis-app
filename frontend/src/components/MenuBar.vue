<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';

const items = ref([
    {
        label: 'Inicio',
        icon: 'fa-home',
    },
    {
        label: 'Jugadores',
        icon: 'fa-users',
    },
    {
        label: 'Partidos',
        icon: 'gi-tennis-ball',
        // items: [
        //     {
        //         label: 'Core',
        //         icon: 'pi pi-bolt',
        //         shortcut: '⌘+S'
        //     },
        //     {
        //         label: 'Blocks',
        //         icon: 'pi pi-server',
        //         shortcut: '⌘+B'
        //     },
        //     {
        //         label: 'UI Kit',
        //         icon: 'pi pi-pencil',
        //         shortcut: '⌘+U'
        //     },
        //     {
        //         separator: true
        //     },
        //     {
        //         label: 'Templates',
        //         icon: 'pi pi-palette',
        //         items: [
        //             {
        //                 label: 'Apollo',
        //                 icon: 'pi pi-palette',
        //                 badge: 2
        //             },
        //             {
        //                 label: 'Ultima',
        //                 icon: 'pi pi-palette',
        //                 badge: 3
        //             }
        //         ]
        //     }
        // ]
    },
    {
        label: 'Competiciones',
        icon: 'fa-trophy',
        badge: 3
    }
]);

</script>

<template>

    <Menubar :model="items">
        <template #start>
            <div>
                <img src="@/assets/tennis-court-game-field-grass-512.webp" alt="logo"
                    style="width: 3rem; height: 3rem; margin-left: 1rem" />
            </div>
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
            <div class="header-container" style="justify-content: center;">
                <a v-ripple class="header-container" v-bind="props.action">
                <!-- <span :class="item.icon" /> -->
                <v-icon :name="item.icon" style="color: #3B82F6;"/>
                <span class="ml-2">{{ item.label }}</span>
                <!-- <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" /> -->
                <!-- <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i> -->
            </a>
            </div>
            
        </template>
        <template #end>
            <div class="header-container">
                <InputText placeholder="Buscar" type="text" class="search-imput" />
                <!-- <Avatar image="/images/avatar/amyelsner.png" shape="circle" /> -->
            </div>
        </template>
    </Menubar>

</template>

<style scoped>
.p-menubar-root-list {
    display: flex;
    justify-content: center;
}

.p-menubar {
    background-color: var(--surface-100);
    color: var(--on-surface);
    height: 4rem;
    border-radius: 10px;
    justify-content: center;
}

.logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    width: 60px;
    height: 60px;
    margin-left: 1rem;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    gap: 0.5rem;
    font-size: 0.875rem;
}

.header-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.p-inputtext {
    width: 8rem;
    max-width: 100%;
}

/* Estilos para pantallas móviles */
@media (max-width: 768px) {
    .p-menubar {
        height: auto;
        padding: 0.5rem;
        justify-content: center;
        border-radius: 10px;
    }

    .p-menubar-root-list {
    display: flex;
    justify-content: center;
    }

    .logo {
        width: 50px;
        height: 50px;
    }

    .menu-item {
        padding: 0 0.5rem;
        font-size: 0.75rem;
    }

    .p-inputtext{
        width: 6rem;
        max-width: 100%;
    }
}
</style>