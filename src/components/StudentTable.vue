<template>
    <div>
        <table class="students-table">
            <thead>
                <tr>
                    <th>Index</th>
                    <th 
                        @click="handleSort('name')" 
                        class="sortable-header"
                    >
                        Name
                        <span class="sort-icon-wrapper">
                            <FontAwesomeIcon 
                                v-if="sortColumn !== 'name'" 
                                :icon="faSort" 
                                class="sort-icon-default" 
                            />
                            <FontAwesomeIcon 
                                v-else-if="sortDirection === 'asc'" 
                                :icon="faSortUp" 
                                class="sort-icon-active" 
                            />
                            <FontAwesomeIcon 
                                v-else 
                                :icon="faSortDown" 
                                class="sort-icon-active" 
                            />
                        </span>
                    </th>
                    <th 
                        @click="handleSort('dateOfBirth')" 
                        class="sortable-header"
                    >
                        Date of Birth
                        <span class="sort-icon-wrapper">
                            <FontAwesomeIcon 
                                v-if="sortColumn !== 'dateOfBirth'" 
                                :icon="faSort" 
                                class="sort-icon-default" 
                            />
                            <FontAwesomeIcon 
                                v-else-if="sortDirection === 'asc'" 
                                :icon="faSortUp" 
                                class="sort-icon-active" 
                            />
                            <FontAwesomeIcon 
                                v-else 
                                :icon="faSortDown" 
                                class="sort-icon-active" 
                            />
                        </span>
                    </th>
                    <th 
                        @click="handleSort('municipality')" 
                        class="sortable-header"
                    >
                        Municipality
                        <span class="sort-icon-wrapper">
                            <FontAwesomeIcon 
                                v-if="sortColumn !== 'municipality'" 
                                :icon="faSort" 
                                class="sort-icon-default" 
                            />
                            <FontAwesomeIcon 
                                v-else-if="sortDirection === 'asc'" 
                                :icon="faSortUp" 
                                class="sort-icon-active" 
                            />
                            <FontAwesomeIcon 
                                v-else 
                                :icon="faSortDown" 
                                class="sort-icon-active" 
                            />
                        </span>
                    </th>
                    <th v-if="$route.path === '/archive'"
                        @click="handleSort('archiveDate')"
                        class="sortable-header"
                    >
                        Archive Date
                        <span class="sort-icon-wrapper">
                            <FontAwesomeIcon 
                                v-if="sortColumn !== 'archiveDate'" 
                                :icon="faSort" 
                                class="sort-icon-default" 
                            />
                            <FontAwesomeIcon 
                                v-else-if="sortDirection === 'asc'" 
                                :icon="faSortUp" 
                                class="sort-icon-active" 
                            />
                            <FontAwesomeIcon 
                                v-else 
                                :icon="faSortDown" 
                                class="sort-icon-active" 
                            />
                        </span>
                    </th>
                    <th>Action</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-if="paginatedStudents.length === 0">
                    <td colspan="5" class="empty-state">No students found</td>
                </tr>
                <tr v-for="(student, index) in paginatedStudents" :key="index">
                    <td>{{ student.index }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ formatDate(student.dateOfBirth) }}</td>
                    <td>{{ student.municipality }}</td>
                    <td v-if="$route.path === '/archive'">{{ formatDate(student.archiveDate) }}</td>
                    <td class="action-cell">
                        <!-- For archive: show View and Restore -->
                        <template v-if="mode === 'archive'">
                            <button 
                                @click="$emit('view', student, index)" 
                                class="action-icon-btn" 
                                title="View"
                            >
                                <FontAwesomeIcon :icon="faEye" class="icon-view" />
                            </button>
                            <button 
                                @click="$emit('restore', student, index)" 
                                class="action-icon-btn" 
                                title="Restore"
                            >
                                <FontAwesomeIcon :icon="faRotateLeft" class="icon-restore" />
                            </button>
                        </template>
                        
                        <!-- For students: show Edit and Delete -->
                        <template v-else>
                            <button 
                                @click="$emit('edit', student, index)" 
                                class="action-icon-btn" 
                                title="Edit"
                            >
                                <FontAwesomeIcon :icon="faPenToSquare" class="icon-edit" />
                            </button>
                            <button 
                                @click="$emit('delete', student, index)" 
                                class="action-icon-btn" 
                                title="Delete"
                            >
                                <FontAwesomeIcon :icon="faTrash" class="icon-delete" />
                            </button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="pagination">
            <button 
                @click="goToPage(1)" 
                :disabled="currentPage === 1"
                class="page-btn"
                title="First page"
            >
                &laquo;
            </button>
            
            <button 
                @click="goToPage(currentPage - 1)" 
                :disabled="currentPage === 1"
                class="page-btn"
                title="Previous page"
            >
                &lsaquo;
            </button>
            
            <template v-for="page in visiblePages">
                <button
                    v-if="page !== '...'"
                    :key="page"
                    @click="goToPage(page)"
                    :class="['page-btn', 'page-number', { 'active': currentPage === page }]"
                >
                    {{ page }}
                </button>
                <span v-else :key="'ellipsis-' + page" class="page-ellipsis">...</span>
            </template>
            
            <button 
                @click="goToPage(currentPage + 1)" 
                :disabled="currentPage === totalPages"
                class="page-btn"
                title="Next page"
            >
                &rsaquo;
            </button>
            
            <button 
                @click="goToPage(totalPages)" 
                :disabled="currentPage === totalPages"
                class="page-btn"
                title="Last page"
            >
                &raquo;
            </button>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
    import { faTrash } from '@fortawesome/free-solid-svg-icons'
    import { faEye, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
    import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
    
    export default {
        name: 'StudentTable',
    
        components: {
            FontAwesomeIcon,
        },
    
        props: {
            students: {
                type: Array,
                required: true
            },
            mode: {
                type: String,
                default: 'students',
                validator: (value) => ['students', 'archive'].includes(value)
            }
        },
    
        data() {
            return {
                faPenToSquare,
                faTrash,
                faEye,
                faSort,
                faSortUp,
                faSortDown,
                faRotateLeft,
                sortColumn: null,
                sortDirection: 'desc',
                currentPage: 1,
                itemsPerPage: 10
            }
        },
    
        computed: {
            sortedStudents() {
                if (!this.students || !Array.isArray(this.students)) {
                    return []
                }
                
                if (!this.sortColumn) {
                    return this.students
                }

                const sorted = [...this.students].sort((a, b) => {
                    let aVal = a[this.sortColumn]
                    let bVal = b[this.sortColumn]

                    if (this.sortColumn === 'dateOfBirth' || this.sortColumn === 'archiveDate') {
                        aVal = new Date(aVal)
                        bVal = new Date(bVal)
                    } else {
                        aVal = String(aVal || '').toLowerCase()
                        bVal = String(bVal || '').toLowerCase()
                    }

                    if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1
                    if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1
                    return 0
                })

                return sorted
            },

            totalPages() {
                if (!this.sortedStudents || !Array.isArray(this.sortedStudents)) {
                    return 1
                }
                return Math.ceil(this.sortedStudents.length / this.itemsPerPage)
            },
            
            paginatedStudents() {
                if (!this.sortedStudents || !Array.isArray(this.sortedStudents)) {
                    return []
                }
                const start = (this.currentPage - 1) * this.itemsPerPage
                const end = start + this.itemsPerPage
                return this.sortedStudents.slice(start, end)
            },

            visiblePages() {
                const pages = []
                const total = this.totalPages
                const current = this.currentPage
                
                if (total <= 7) {
                    // Show all pages if 7 or fewer
                    for (let i = 1; i <= total; i++) {
                        pages.push(i)
                    }
                } else {
                    // Always show first page
                    pages.push(1)
                    
                    if (current <= 4) {
                        // Near the start
                        for (let i = 2; i <= 5; i++) {
                            pages.push(i)
                        }
                        pages.push('...')
                        pages.push(total)
                    } else if (current >= total - 3) {
                        // Near the end
                        pages.push('...')
                        for (let i = total - 4; i <= total; i++) {
                            pages.push(i)
                        }
                    } else {
                        // In the middle
                        pages.push('...')
                        for (let i = current - 1; i <= current + 1; i++) {
                            pages.push(i)
                        }
                        pages.push('...')
                        pages.push(total)
                    }
                }
                
                return pages
            }
        },

        watch: {
            students() {
                // Reset to page 1 when students list changes
                this.currentPage = 1
            }
        },
    
        methods: {
            handleSort(column) {
                if (this.sortColumn === column) {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
                } else {
                    this.sortColumn = column
                    this.sortDirection = 'desc'
                }
            },

            goToPage(page) {
                if (page >= 1 && page <= this.totalPages) {
                    this.currentPage = page
                }
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
.students-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    margin-top: 1rem;
}

.students-table thead {
    background: #f5f5f5;
}

.students-table th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
    color: #333;
    border-bottom: 2px solid #ddd;
}

.students-table tbody tr {
    border-bottom: 1px solid #eee;
}

.students-table tbody tr.row-even {
    background: #f9f9f9;
}

.students-table td {
    padding: 0.75rem 1rem;
    color: #333;
    font-size: 0.95rem;
}

.action-cell {
    display: flex;
    gap: 0.5rem;
    /* align-items: flex-start; */
}

.action-icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.action-icon-btn .icon-edit {
    font-size: 16px;
    color: #0066cc;
}

.action-icon-btn:hover .icon-edit {
    color: #003a74;
}

.action-icon-btn .icon-view,
.action-icon-btn .icon-restore {
    font-size: 15px;
    color: black;
}

.action-icon-btn:hover .icon-view,
.action-icon-btn:hover .icon-restore {
    font-size: 15px;
    color: grey;
}

.action-icon-btn .icon-delete {
    font-size: 16px;
    color: #d32f2f;
}

.action-icon-btn:hover .icon-delete {
    color: #910f0f;
}

.action-link {
    color: #0066cc;
    text-decoration: none;
    cursor: pointer;
}

.action-link:hover {
    text-decoration: underline;
}

.action-separator {
    margin: 0 0.5rem;
    color: #ccc;
}

.empty-state {
    text-align: center;
    padding: 2rem;
    color: #999;
    font-style: italic;
}

.sort-icon-wrapper {
    display: inline-block;
    margin-left: 0.5rem;
    width: 12px;
    height: 14px;
    position: relative;
    align-self: center;
}

.sort-icon-double {
    display: block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #999;
    position: absolute;
    top: 0;
}

.sort-icon-double::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #999;
    position: absolute;
    top: 6px;
}

.sort-icon-up {
    display: block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid #0066cc;
}

.sort-icon-down {
    display: block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid #0066cc;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    /* margin-top: 1.5rem; */
    padding: 1.5rem;
}

.page-btn {
    padding: 0.5rem 0.75rem;
    background: white;
    color: #0066cc;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: none;
    min-width: 36px;
}

.page-btn:hover:not(:disabled):not(.active) {
    background: #f0f0f0;
    border-color: #0066cc;
}

.page-btn:disabled {
    color: #ccc;
    cursor: not-allowed;
    text-decoration: none;
    border-color: #eee;
}

.page-btn.active {
    background: #0066cc;
    color: white;
    text-decoration: none;
    border-color: #0066cc;
    font-weight: 600;
}

.page-number {
    min-width: 36px;
}

.page-ellipsis {
    padding: 0.5rem 0.25rem;
    color: #666;
}
</style>