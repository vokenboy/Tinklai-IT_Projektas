// auth.js

// Save token to localStorage
export function setToken(token) {
    localStorage.setItem('token', token);
  }
  
  // Get token from localStorage
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  // Remove token from localStorage (for logging out)
  export function removeToken() {
    localStorage.removeItem('token');
  }
  
  // Check if the user is authenticated
  export function isAuthenticated() {
    return !!getToken();
  }
  
  // Save role_id to localStorage
  export function setRoleId(roleId) {
      localStorage.setItem('role_id', roleId);
  }
  
  // Get role_id from localStorage
  export function getRoleId() {
    return localStorage.getItem('role_id');
  }

  // Get user_id from localStorage
  export function getUserId() {
    return localStorage.getItem('user_id');
  }

  export function signOut() {
    localStorage.removeItem('token');
    localStorage.setItem('role_id', '1');
    window.location.href = '/';
  }