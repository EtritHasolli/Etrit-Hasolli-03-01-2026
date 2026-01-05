<template>
    <div class="student">
        <!-- <HeaderPart /> -->

        <div id="searchAddStudent">
            <SearchBar @search="handleSearch" />
            <button id="addStudentButton" @click="displayStudentForm">Add Student</button>
        </div>

        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h2>Add New Student</h2>
                    <button class="close-button" @click="closeModal">&times;</button>
                </div>
                <StudentForm @add="addStudent" />
            </div>
        </div>

        <DeleteDialog 
        :show="showDeleteDialog"
        :student="studentToDelete"
        @confirm="confirmDelete"
        @cancel="cancelDelete" />
        
        <StudentTable 
        :students="filteredStudents"
        @edit="editStudent"
        @delete="handleDeleteClick"
        />

        
    </div>
 </template>

 <script>
    import StudentForm from '../components/StudentForm.vue'
    import StudentTable from '../components/StudentTable.vue'
    import SearchBar from '../components/SearchBar.vue';
    import DeleteDialog from '../components/DeleteDialog.vue';

    export default {
        name: 'StudentPage',

        components: {
            StudentForm,
            StudentTable,
            SearchBar,
            DeleteDialog
        },
    
        data() {
            return {
                students: JSON.parse(localStorage.getItem('students') || '[]'),
                archive: JSON.parse(localStorage.getItem('archive') || '[]'),
                searchQuery: '',
                showModal: false,
                showDeleteDialog: false,
                studentToDelete: null,
            }
        },

        computed: {
            filteredStudents() {
                if(!this.searchQuery) {
                    return this.students
                }
            
                const filters = ["index", "name", "municipality"]
                const query = this.searchQuery.toLowerCase()
                return this.students.filter(student => 
                    filters.some(target => {
                        const value = student[target]

                        if (value == null) return false
                        return String(value).toLowerCase().includes(query)
                    })
                )
            },
        },

        methods: {
            displayStudentForm() {
                this.showModal = true
            },

            closeModal() {
                this.showModal = false
            },

            addStudent(student) {
                this.students = JSON.parse(localStorage.getItem('students') || '[]')

                const indexExists = this.students.some(s => s.index == student.index) 

                if (indexExists) {
                    alert('A student with this index number already exists!')
                    return
                }

                const newStudent = {
                    ...student,
                    id: Date.now()
                }
                this.students.push(newStudent)
                localStorage.setItem('students', JSON.stringify(this.students))
                this.closeModal()
            },

            editStudent(student) {
                this.$router.push(`/edit/${student.id}`)
            },

            handleSearch(query) {
                this.searchQuery = query
            },

            handleDeleteClick(student) {
                this.studentToDelete = student
                this.showDeleteDialog = true
            },

            confirmDelete() {
                if (this.studentToDelete) {
                    const newStudent = {
                        ...this.studentToDelete,
                        archivedDate: Date.now()
                    }
                    this.archive.push(newStudent)
                    localStorage.setItem('archive', JSON.stringify(this.archive))

                    this.students = this.students.filter(s => s.id != this.studentToDelete.id)
                    localStorage.setItem('students', JSON.stringify(this.students))
                }
                this.cancelDelete()
            },

            cancelDelete() {
                this.showDeleteDialog = false
                this.studentToDelete = null
            }
        }
    }
 </script>

<style scoped>
    .student {
        padding: 2rem;
        /* max-width: 1200px; */
        margin: 0 auto;
    
    }

    #searchAddStudent {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 2rem;
        /* max-width: 550px; */
    }

    #studentForm {
        display: none;
    }

    #studentForm.enabled {
        display: flex;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        border-radius: 8px;
        padding: 2rem;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }

    .modal-header h2 {
        margin: 0;
        color: #333;
        font-size: 1.5rem;
    }

    .close-button {
        background: none;
        border: none;
        font-size: 2rem;
        color: #999;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-button:hover {
        color: #333;
    }

    #addStudentButton {
        background: #0066cc;
        color: white;
        border-radius: 50px;
        padding: 0.75rem;
        font-size: 0.95rem;
        border: none;
        height: fit-content;
    }

    #addStudentButton:hover {
        background: #0052a3;
        cursor: pointer;
    }
</style>
