<template>
    <div>
      <div v-if="show" class="modal-overlay" @click="cancel">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Delete Student</h2>
            <button class="close-button" @click="cancel">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this student?</p>
            <div v-if="student" class="student-info">
              <p><strong>Name:</strong> {{ student.name }}</p>
              <p><strong>Index:</strong> {{ student.index }}</p>
              <p><strong>Municipality:</strong> {{ student.municipality }}</p>
            </div>
            <p class="warning-text">This action will move the student to the archive.</p>
          </div>
          <div class="modal-footer">
            <button @click="cancel" class="btn-cancel">Cancel</button>
            <button @click="confirm" class="btn-delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
    export default {
        name: 'DeleteDialog',

        props: {
            show: {
                type: Boolean,
                default: false
            },
            student: {
                type: Object,
                default: null
            }
        },

        methods: {
            confirm() {
                this.$emit('confirm')
            },
            cancel() {
                this.$emit('cancel')
            }
        }
    }
  </script>

<style scoped>
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
      padding: 0;
      width: 90%;
      max-width: 800px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
    }
    
    .modal-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
      font-weight: 600;
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
    
    .modal-body {
      padding: 1.5rem;
    }
    
    .modal-body > p {
      color: #333;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    .student-info {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    
    .student-info p {
      margin: 0.5rem 0;
      color: #555;
      font-size: 0.95rem;
    }
    
    .student-info strong {
      color: #333;
      font-weight: 600;
    }
    
    .warning-text {
      color: #d32f2f;
      font-weight: 500;
      margin-top: 1rem;
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1.5rem;
      border-top: 1px solid #eee;
    }
    
    .btn-cancel,
    .btn-delete {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    
    .btn-cancel {
      background: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;
    }
    
    .btn-cancel:hover {
      background: #e0e0e0;
    }
    
    .btn-delete {
      background: #d32f2f;
      color: white;
    }
    
    .btn-delete:hover {
      background: #b71c1c;
    }
    </style>