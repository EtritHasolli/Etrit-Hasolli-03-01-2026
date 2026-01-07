<template>
    <form @submit.prevent="addStudent" id="addStudentForm">
        
        <div id="index">
            <label for="index">Index:</label>
            <input :value="index" placeholder="Auto-generated" disabled />
        </div>

        <div id="name">
            <label for="name">Name: </label>
            <input v-model="name" placeholder="Name" required />
        </div>

        <!-- Date of Birth part -->
        <div id="DoB">
            <label for="dateOfBirth">Date of Birth:</label>
            <input type="date" v-model="dateOfBirth" required />
        </div>

        <!-- Municipality options part -->
        <div id="municipalityOptions">
            <label for="municipality">Municipality:</label>
            <select name="municipality" id="municipality" v-model="municipality" required >
                <option value="" disabled>Select Municipality</option>
                <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
            </select>
        </div>

        <button type="submit">Add Student</button>
    </form>
</template>

<script>

    export default {
        name: 'StudentForm',

        data() {
            return {
                index: Date.now(),
                name: '',
                dateOfBirth: '',
                municipality: '',
                cities: [
                    'Prishtine',
                    'Fushe Kosove',
                    'Lipjan',
                    'Obiliq'
                ],
            }
        },

        methods: {
            addStudent() {
                if(!this.name || !this.dateOfBirth || !this.municipality) return;

                this.$emit('add', { 
                    index: this.index,
                    name: this.name,
                    dateOfBirth: this.dateOfBirth,
                    municipality: this.municipality
                })

                this.index = Date.now()
                this.name = ''
                this.dateOfBirth = ''
                this.municipality = ''
            },

            viewStudent() {
                this.$emit('view', { 
                    index: this.index,
                    name: this.name,
                    dateOfBirth: this.dateOfBirth,
                    municipality: this.municipality
                })
            }
        }
    }
</script>

<style scoped>
#addStudentForm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
    align-items: flex-start;
}

#name, #index, #DoB, #municipalityOptions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}

#name label, #index label, #DoB label, #municipalityOptions label {
    min-width: 120px;
    font-weight: 500;
    color: #333;
}

#addStudentForm input,
#addStudentForm select {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
}

#addStudentForm input:focus,
#addStudentForm select:focus {
    outline: none;
    border-color: #999;
}

#addStudentForm button {
    padding: 0.75rem 1.5rem;
    background: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    align-self: center;
    margin-top: 0.5rem;
}

/* Remove spinner arrows from number inputs */
#addStudentForm input[type="number"]::-webkit-inner-spin-button,
#addStudentForm input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

#addStudentForm input[type="number"] {
    -moz-appearance: textfield;
}

#addStudentForm button:hover {
    background: #0052a3;
}
</style>