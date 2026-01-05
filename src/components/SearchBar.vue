<template>
    <div class="search-container">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input 
            type="text" 
            placeholder="search" 
            id="SearchBar" 
            v-model="searchQuery" 
            @input="onSearch"
            class="search-input"
        />   
    </div>
</template>

<script>
    export default {
        name: "SearchBar",

        data() {
            return {
                searchQuery: ''
            }
        },

        methods: {
            onSearch() {
                this.$emit('search', this.searchQuery)
            }
        }
    }
</script>

<style scoped>
    .search-container {
        position: relative;
        display: inline-block;
        width: 100%;
        max-width: 400px;
    }

    .search-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        color: #666;
        pointer-events: none;
    }

    .search-input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.75rem;
        border: 1px solid #ddd;
        border-radius: 50px;
        font-size: 0.95rem;
        background: white;
        color: #333;
        outline: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .search-input:focus {
        border-color: #bbb;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .search-input::placeholder {
        color: #999;
    }
</style>