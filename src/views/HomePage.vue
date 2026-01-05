<template>
    <div class="home">
      <div class="welcome-container">
        <h1 class="welcome-title">Welcome to the Student Management System</h1>
        <p class="welcome-subtitle">Manage and organize student information efficiently</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  }
  </script>
  
  <style scoped>
  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .welcome-container {
    text-align: center;
    max-width: 900px;
    width: 100%;
    animation: fadeIn 0.6s ease-in;
  }
  
  .welcome-title {
    font-size: 3rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .welcome-subtitle {
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 3rem;
    font-weight: 400;
  }
  </style>