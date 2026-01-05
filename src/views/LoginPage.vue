<template>
    <div class="login">
        <div class="login-card">
            <h1 class="login-title">Welcome to Student Management System</h1>
            <p class="login-subtitle">Sign in to continue</p>
            
            <div class="form-group">
                <label for="username">Username</label>
                <input 
                    id="username"
                    v-model="username" 
                    placeholder="Enter your username" 
                    class="form-input"
                />
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input 
                    id="password"
                    v-model="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    class="form-input"
                />
            </div>

            <span id="alert" v-if="isWrong">Wrong credentials mate!</span>
  
            <button @click="login" class="login-btn">Login</button>
        </div>
    </div>
  </template>

  <script>
    export default {
        name: 'LoginPage',
        
        data() {
            return {
            username: '',
            password: '',
            isWrong: false,
            }
        },
        
        methods: {
            login() {
              const adminUser = 'etrit'
              const adminPass = 'admin'

              if (!this.username || !this.password) {
                  alert('All fields are required')
                  return
              }

              if (adminUser !== this.username || adminPass != this.password) {
                this.isWrong = true
                return
              }

              localStorage.setItem('user', this.username)
              localStorage.setItem('userPass', this.password)
              this.$router.push('/home')
            }
        }
    }
  </script>

  <style scoped>
    .login {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }

    .login-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      width: 100%;
      max-width: 400px;
      border: 1px solid #ddd;
    }

    .login-title {
      color: #333;
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .login-subtitle {
      color: #666;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 0.95rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
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
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.95rem;
    }

    .form-input:focus {
      outline: none;
      border-color: #999;
    }

    .login-btn {
      width: 100%;
      padding: 0.75rem;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      margin-top: 0.5rem;
    }

    .login-btn:hover {
      background: #0052a3;
    }

    #alert {
      display: block;
      color: red;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      text-align: center;
    }
  </style>