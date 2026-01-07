<template>
    <div class="edit-student">
        <h1>Edit Student</h1>
        <div class="edit-form">
            <div class="form-group">
                <label for="edit-index">Index</label>
                <input id="edit-index" :value="index" placeholder="Auto-generated" class="form-input" disabled />
            </div>
            <div class="form-group">
                <label for="edit-name">Name</label>
                <input id="edit-name" v-model="name" placeholder="Name" class="form-input" />
            </div>
            <div class="form-group">
                <label for="edit-date">Date of Birth</label>
                <input id="edit-date" type="date" v-model="dateOfBirth" class="form-input" />
            </div>
            <div class="form-group">
                <label for="edit-municipality">Municipality</label>
                <select name="edit-municipality" id="edit-municipality" v-model="municipality" class="form-input">
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
            </div>
            <div class="button-group">
                <button @click="saveStudent" class="btn-save">Save Changes</button>
                <button @click="goBack" class="btn-cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditStudent',

        data() {
            return {
                studentIndex: null,
                index: '',
                name: '',
                dateOfBirth: '',
                municipality: '',
                cities: [
                    'Prishtine',
                    'Fushe Kosove',
                    'Lipjan',
                    'Obiliq'
                ]
            }
        },

        mounted() {
            this.studentIndex = this.$route.params.index

            const student = this.$store.state.students.find(s => s.index == this.studentIndex)

            if (student) {
                this.index = student.index
                this.name = student.name
                this.dateOfBirth = student.dateOfBirth
                this.municipality= student.municipality

                // If student's municipality is not in cities list, add it
                if (student.municipality && !this.cities.includes(student.municipality)) {
                    this.cities.push(student.municipality)
                }
            }
        },

        methods: {
            saveStudent() {
                const updatedStudent = {
                    index: this.studentIndex,
                    name: this.name,
                    dateOfBirth: this.dateOfBirth,
                    municipality: this.municipality
                }
                this.$store.dispatch('updateStudent', updatedStudent)
                this.$router.push('/student')
            },
            goBack() {
                this.$router.push('/student')
            }
        }
    }
</script>

<style scoped>
.edit-student {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
}

.edit-student h1 {
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.edit-form {
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
    font-size: 0.9rem;
}

.form-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
}

.form-input:focus {
    outline: none;
    border-color: #999;
}

.button-group {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.btn-save,
.btn-cancel {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
}

.btn-save {
    background: #0066cc;
    color: white;
}

.btn-save:hover {
    background: #0052a3;
}

.btn-cancel {
    background: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
}

.btn-cancel:hover {
    background: #e0e0e0;
}
</style>