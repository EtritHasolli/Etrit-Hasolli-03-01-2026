<template>
    <div class="archive">
        <div id="searchStudent">
            <SearchBar @search="handleSearch" />
        </div>

        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h2>Student Details</h2>
                    <button class="close-button" @click="closeModal">&times;</button>
                </div>
                <div class="student-details" v-if="selectedStudent">
                    <div class="detail-row">
                        <label>Index:</label>
                        <span>{{ selectedStudent.index}}</span>
                    </div>
                    <div class="detail-row">
                        <label>Name:</label>
                        <span>{{ selectedStudent.name }}</span>
                    </div>
                    <div class="detail-row">
                        <label>Date of Birth:</label>
                        <span>{{ formatDate(selectedStudent.dateOfBirth) }}</span>
                    </div>
                    <div class="detail-row">
                        <label>Municipality:</label>
                        <span>{{ selectedStudent.municipality }}</span>
                    </div>
                    <div class="detail-row">
                        <label>Archived Date:</label>
                        <span>{{ formatDate(selectedStudent.archiveDate) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Student Archive Table -->
        <StudentTable 
        :students="filteredStudents"
        mode="archive"
        @view="viewStudent"
        @restore="restoreStudent"
        />
    </div>

</template>

<script>
    import StudentTable from '../components/StudentTable.vue'
    import SearchBar from '../components/SearchBar.vue'

    export default {
        name: 'ArchivePage',

        components: {
            StudentTable,
            SearchBar
        },
    
        data() {
            return {
                searchQuery: '',
                showModal: false,
                selectedStudent: null
            }
        },

        computed: {
            filteredStudents() {
                if (!this.searchQuery) {
                    return this.$store.state.archive
                }

                const filters = ["index", "name", "municipality"]
                const query = this.searchQuery.toLowerCase()
                return this.$store.state.archive.filter(student => 
                    filters.some(target => {
                        const value = student[target]
                        if (value == null) return false
                        return String(value).toLowerCase().includes(query)
                    })
                )
            }
        },

        methods: {
            displayStudentForm() {
                this.showModal = true
            },

            closeModal() {
                this.showModal = false
            },

            restoreStudent(student) {
                this.$store.commit('ADD_STUDENT', student)

                const archive = this.$store.state.archive.filter(s => s.index != student.index)
                this.$store.commit('SET_ARCHIVE', archive)
            },

            viewStudent(student) {
                this.selectedStudent = student
                this.showModal = true
            },

            handleSearch(query) {
                this.$store.commit('SET_SEARCH_QUERY', query)
            },

            formatDate(timestamp) {
                if (!timestamp) return ''
                const date = new Date(timestamp)

                return date.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
            }
        }
    }
 </script>

<style scoped>
    .archive {
        padding: 2rem;
        /* max-width: 1200px; */
        margin: 0 auto;
    
    }

    #searchStudent {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 2rem;
        max-width: 550px;
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

    .student-details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: #f9f9f9;
        border-radius: 8px;
    }

    .detail-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .detail-row label {
        min-width: 120px;
        font-weight: 500;
        color: #333;
    }

    /* .student-details input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.95rem;
    } */

</style>
