<template>
    <div id="header">
        <h1>Student Management System</h1>

        <nav id="navigation">
            <a href="/home">Home</a>
            <a href="/student">Students</a>
            <a href="/archive">Archive</a>
            <a href="/help">Help</a>
            <a href="/login" @click="handleLogout">Logout</a>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "HeaderPart",

        methods: {
            handleLogout() {
                localStorage.removeItem('user')
                localStorage.removeItem('userPass')
            }
        },
    }
</script>

<style scoped>

    #header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 1.5rem;
    }

    #navigation {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    #navigation a {
        color: black;
        font-weight: 500;
        font-size: 1.2rem;
        text-decoration: none;
    }

    #navigation a:hover {
        color: grey;
        font-weight: 500;
        font-size: 1.2rem;
    }

</style>