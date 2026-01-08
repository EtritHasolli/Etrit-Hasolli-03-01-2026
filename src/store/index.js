import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        students: [],
        archive: [],
        searchQuery: '',
        showModal: false,
        showDeleteDialog: false,
        studentToDelete: null,
    },

    plugins: [
        createPersistedState({
            key: 'vuex-data',
        })
    ],

    getters: {
        filteredStudents(state) {
            if(!state.searchQuery) {
                return state.students
            }
        
            const filters = ["index", "name", "municipality"]
            const query = state.searchQuery.toLowerCase()
            return state.students.filter(student => 
                filters.some(target => {
                    const value = student[target]

                    if (value == null) return false
                    return String(value).toLowerCase().includes(query)
                })
            )
        },
    },

    mutations: {
        SET_STUDENTS(state, students) {
            state.students = students
        },

        SET_ARCHIVE(state, archive) {
            state.archive = archive
        },

        ADD_STUDENT(state, student) {
            state.students.push(student)
        },

        UPDATE_STUDENT(state, updateStudent) {
            const index = state.students.findIndex(s => s.index == updateStudent.index)
            if (index != -1) {
                state.students[index] = updateStudent
            }
        },

        DELETE_STUDENT(state, studentIndex) {
            state.students = state.students.filter(s => s.index !== studentIndex)
        },

        ARCHIVE_STUDENT(state, student) {
            const newStudent = {
                ...student,
                archiveDate: Date.now()
            }
            state.archive.push(newStudent)
        },

        SET_SEARCH_QUERY(state, query) {
            state.searchQuery = query
        },

        SET_SHOW_MODAL(state, show) {
            state.showModal = show
        },

        SET_SHOW_DELETE_DIALOG(state, show) {
            state.showDeleteDialog = show
        },

        SET_STUDENT_TO_DELETE(state, student) {
            state.studentToDelete = student
        },
    },

    actions: {
        addStudent({commit, state}, student) {
            const indexExists = state.students.some(s => s.index == student.index)

            if (indexExists) {
                throw new Error('A student with this index already exists!')
            }

            commit('ADD_STUDENT', student)
        },

        deleteStudent({ commit }, student) {
            commit('ARCHIVE_STUDENT', student)
            commit('DELETE_STUDENT', student.index)
        },

        updateStudent({ commit }, student) {
            commit('UPDATE_STUDENT', student)
        },
    },
});