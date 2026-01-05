<template>
    <div class="help">
      <div class="welcome-container">
        <h1 class="welcome-title">This is an empty help page!</h1>
        <p class="welcome-subtitle">If you need help, don't contact user support!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelpPage',
  }
  </script>
  
  <style scoped>
  .help {
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