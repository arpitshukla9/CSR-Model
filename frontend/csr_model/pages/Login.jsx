// // import React, { useState } from 'react';
// // import './LoginSignup.css';

// // const CSRVendorPortal = () => {
// //   const [activeTab, setActiveTab] = useState('login');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loginForm, setLoginForm] = useState({
// //     email: '',
// //     password: ''
// //   });
// //   const [signupForm, setSignupForm] = useState({
// //     name: '',
// //     company: '',
// //     email: '',
// //     password: ''
// //   });
// //   const [errors, setErrors] = useState({
// //     loginEmail: false,
// //     loginPassword: false,
// //     signupName: false,
// //     signupCompany: false,
// //     signupEmail: false,
// //     signupPassword: false
// //   });

// //   // Handle tab switching
// //   const handleTabSwitch = (tab) => {
// //     setActiveTab(tab);
// //     // Reset form errors when switching tabs
// //     setErrors({
// //       loginEmail: false,
// //       loginPassword: false,
// //       signupName: false,
// //       signupCompany: false,
// //       signupEmail: false,
// //       signupPassword: false
// //     });
// //   };

// //   // Handle form input changes
// //   const handleLoginChange = (e) => {
// //     const { id, value } = e.target;
// //     setLoginForm({
// //       ...loginForm,
// //       [id === 'login-email' ? 'email' : 'password']: value
// //     });
// //   };

// //   const handleSignupChange = (e) => {
// //     const { id, value } = e.target;
// //     const field = id.replace('signup-', '');
// //     setSignupForm({
// //       ...signupForm,
// //       [field]: value
// //     });
// //   };

// //   // Form validation
// //   const validateEmail = (email) => {
// //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// //     return re.test(String(email).toLowerCase());
// //   };

// //   const validatePassword = (password) => {
// //     return password.length >= 8;
// //   };

// //   // Toggle password visibility
// //   const togglePasswordVisibility = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   // Handle form submissions
// //   const handleLoginSubmit = (e) => {
// //     e.preventDefault();
// //     const newErrors = {
// //       ...errors,
// //       loginEmail: !validateEmail(loginForm.email),
// //       loginPassword: !validatePassword(loginForm.password)
// //     };
    
// //     setErrors(newErrors);
    
// //     if (!newErrors.loginEmail && !newErrors.loginPassword) {
// //       // Submit form (this would connect to your authentication service)
// //       alert('Login successful!');
// //     }
// //   };

// //   const handleSignupSubmit = (e) => {
// //     e.preventDefault();
// //     const newErrors = {
// //       ...errors,
// //       signupName: signupForm.name.trim() === '',
// //       signupCompany: signupForm.company.trim() === '',
// //       signupEmail: !validateEmail(signupForm.email),
// //       signupPassword: !validatePassword(signupForm.password)
// //     };
    
// //     setErrors(newErrors);
    
// //     if (!newErrors.signupName && !newErrors.signupCompany && 
// //         !newErrors.signupEmail && !newErrors.signupPassword) {
// //       // Submit form (this would connect to your user registration service)
// //       alert('Account created successfully!');
// //     }
// //   };

// //   return (
// //     <div className="portal-container">
// //       <div className="portal-card">
// //         <div className="portal-header">
// //           <div className="logo-container">
// //             <svg className="portal-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //               <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-7.5"/>
// //               <path d="M18 14h-8"/>
// //               <path d="M15 17.5V20"/>
// //               <path d="M15 14v3.5"/>
// //               <path d="M10.5 17.5l-1-.5 1-.5"/>
// //               <path d="M12.5 17v.5l1 .5-1.5.5"/>
// //             </svg>
// //           </div>
// //           <h1 className="portal-title">CSR Vendor Portal</h1>
// //           <p className="portal-subtitle">Empowering sustainable partnerships for a better future</p>
// //         </div>
        
// //         <div className="tab-navigation">
// //           <button 
// //             className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
// //             onClick={() => handleTabSwitch('login')}
// //           >
// //             <svg className="tab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //               <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
// //               <polyline points="10 17 15 12 10 7"/>
// //               <line x1="15" y1="12" x2="3" y2="12"/>
// //             </svg>
// //             Login
// //           </button>
// //           <button 
// //             className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
// //             onClick={() => handleTabSwitch('signup')}
// //           >
// //             <svg className="tab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //               <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
// //               <circle cx="8.5" cy="7" r="4"/>
// //               <line x1="20" y1="8" x2="20" y2="14"/>
// //               <line x1="23" y1="11" x2="17" y2="11"/>
// //             </svg>
// //             Sign Up
// //           </button>
// //         </div>
        
// //         <div className="form-wrapper">
// //           {/* Login Form */}
// //           {activeTab === 'login' && (
// //             <form onSubmit={handleLoginSubmit} className="auth-form">
// //               <div className={`form-field ${errors.loginEmail ? 'has-error' : ''}`}>
// //                 <label htmlFor="login-email" className="field-label">
// //                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
// //                     <polyline points="22,6 12,13 2,6"/>
// //                   </svg>
// //                   Email Address
// //                 </label>
// //                 <input 
// //                   type="email" 
// //                   id="login-email" 
// //                   className="field-input" 
// //                   placeholder="Enter your work email"
// //                   value={loginForm.email}
// //                   onChange={handleLoginChange}
// //                 />
// //                 {errors.loginEmail && (
// //                   <div className="error-text">Please enter a valid email address</div>
// //                 )}
// //               </div>
              
// //               <div className={`form-field ${errors.loginPassword ? 'has-error' : ''}`}>
// //                 <label htmlFor="login-password" className="field-label">
// //                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
// //                     <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
// //                   </svg>
// //                   Password
// //                 </label>
// //                 <div className="password-input-group">
// //                   <input 
// //                     type={showPassword ? "text" : "password"} 
// //                     id="login-password" 
// //                     className="field-input" 
// //                     placeholder="Enter your password"
// //                     value={loginForm.password}
// //                     onChange={handleLoginChange}
// //                   />
// //                   <button 
// //                     type="button" 
// //                     className="password-toggle" 
// //                     onClick={togglePasswordVisibility}
// //                   >
// //                     {showPassword ? (
// //                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
// //                         <line x1="1" y1="1" x2="23" y2="23"/>
// //                       </svg>
// //                     ) : (
// //                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
// //                         <circle cx="12" cy="12" r="3"/>
// //                       </svg>
// //                     )}
// //                   </button>
// //                 </div>
// //                 {errors.loginPassword && (
// //                   <div className="error-text">Password must be at least 8 characters</div>
// //                 )}
// //               </div>
              
// //               <div className="forgot-link">
// //                 <a href="#" className="text-link">
// //                   <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <circle cx="12" cy="12" r="10"/>
// //                     <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
// //                     <line x1="12" y1="17" x2="12.01" y2="17"/>
// //                   </svg>
// //                   Forgot Password?
// //                 </a>
// //               </div>
              
// //               <button type="submit" className="submit-btn login-btn">
// //                 <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
// //                   <polyline points="10 17 15 12 10 7"/>
// //                   <line x1="15" y1="12" x2="3" y2="12"/>
// //                 </svg>
// //                 Login to Dashboard
// //               </button>
              
// //               <div className="divider">
// //                 <span className="divider-text">OR</span>
// //               </div>
              
// //               <div className="social-login">
// //                 <button type="button" className="social-btn google-btn">
// //                   <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                     <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
// //                   </svg>
// //                   Continue with Google
// //                 </button>
// //                 <button type="button" className="social-btn microsoft-btn">
// //                   <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                     <path d="M11.4 24H0V12.6h11.4V24z"/>
// //                     <path d="M24 24H12.6V12.6H24V24z"/>
// //                     <path d="M11.4 11.4H0V0h11.4v11.4z"/>
// //                     <path d="M24 11.4H12.6V0H24v11.4z"/>
// //                   </svg>
// //                   Continue with Microsoft
// //                 </button>
// //               </div>
// //             </form>
// //           )}
          
// //           {/* Signup Form */}
// //           {activeTab === 'signup' && (
// //             <form onSubmit={handleSignupSubmit} className="auth-form">
// //               <div className={`form-field ${errors.signupName ? 'has-error' : ''}`}>
// //                 <label htmlFor="signup-name" className="field-label">
// //                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
// //                     <circle cx="12" cy="7" r="4"/>
// //                   </svg>
// //                   Full Name
// //                 </label>
// //                 <input 
// //                   type="text" 
// //                   id="signup-name" 
// //                   className="field-input" 
// //                   placeholder="Enter your full name"
// //                   value={signupForm.name}
// //                   onChange={handleSignupChange}
// //                 />
// //                 {errors.signupName && (
// //                   <div className="error-text">Please enter your name</div>
// //                 )}
// //               </div>
              
// //               <div className={`form-field ${errors.signupCompany ? 'has-error' : ''}`}>
// //                 <label htmlFor="signup-company" className="field-label">
// //                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
// //                     <polyline points="9 22 9 12 15 12 15 22"/>
// //                   </svg>
// //                   Company Name
// //                 </label>
// //                 <input 
// //                   type="text" 
// //                   id="signup-company" 
// //                   className="field-input" 
// //                   placeholder="Enter your company name"
// //                   value={signupForm.company}
// //                   onChange={handleSignupChange}
// //                 />
// //                 {errors.signupCompany && (
// //                   <div className="error-text">Please enter your company name</div>
// //                 )}
// //               </div>
              
// //               <div className={`form-field ${errors.signupEmail ? 'has-error' : ''}`}>
// //                 <label htmlFor="signup-email" className="field-label">
// //                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
// //                     <polyline points="22,6 12,13 2,6"/>
// //                   </svg>
// //                   Email Address
// //                 </label>
// //                 <input 
// //                   type="email" 
// //                   id="signup-email" 
// //                   className="field-input" 
// //                   placeholder="Enter your work email"
// //                   value={signupForm.email}
// //                   onChange={handleSignupChange}
// //                 />
// //                 {errors.signupEmail && (
// //                   <div className="error-text">Please enter a valid email address</div>
// //                 )}
// //               </div>
              
// //               <div className={`form-field ${errors.signupPassword ? 'has-error' : ''}`}>
// //                 <label htmlFor="signup-password" className="field-label">
// //                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
// //                     <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
// //                   </svg>
// //                   Create Password
// //                 </label>
// //                 <div className="password-input-group">
// //                   <input 
// //                     type={showPassword ? "text" : "password"} 
// //                     id="signup-password" 
// //                     className="field-input"
// //                     placeholder="Create a secure password"
// //                     value={signupForm.password}
// //                     onChange={handleSignupChange}
// //                   />
// //                   <button 
// //                     type="button" 
// //                     className="password-toggle" 
// //                     onClick={togglePasswordVisibility}
// //                   >
// //                     {showPassword ? (
// //                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
// //                         <line x1="1" y1="1" x2="23" y2="23"/>
// //                       </svg>
// //                     ) : (
// //                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
// //                         <circle cx="12" cy="12" r="3"/>
// //                       </svg>
// //                     )}
// //                   </button>
// //                 </div>
// //                 {errors.signupPassword && (
// //                   <div className="error-text">Password must be at least 8 characters</div>
// //                 )}
// //                 <div className="password-strength">
// //                   <div className="strength-meter">
// //                     <div className={`strength-segment ${signupForm.password.length >= 1 ? 'active' : ''}`}></div>
// //                     <div className={`strength-segment ${signupForm.password.length >= 4 ? 'active' : ''}`}></div>
// //                     <div className={`strength-segment ${signupForm.password.length >= 6 ? 'active' : ''}`}></div>
// //                     <div className={`strength-segment ${signupForm.password.length >= 8 ? 'active' : ''}`}></div>
// //                   </div>






























































// import React, { useState, useEffect } from 'react';
// import './LoginSignup.css';
// import { initializeApp } from 'firebase/app';
// import { 
//   getAuth, 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword,
//   GoogleAuthProvider, 
//   OAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   onAuthStateChanged,
//   signOut
// } from 'firebase/auth';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';

// const CSRVendorPortal = () => {
  
//   const firebaseConfig = {
//     apiKey: "AIzaSyAZW94oGiV8TvDlx6JR60VBSrStfhKIAsQ",
//     authDomain: "theta-csrmodel.firebaseapp.com",
//     projectId: "theta-csrmodel",
//     storageBucket: "theta-csrmodel.firebasestorage.app",
//     messagingSenderId: "247215849223",
//     appId: "1:247215849223:web:c90925a8903f737cc44fa2",
//     measurementId: "G-PKTW89K34C"
//   };

 
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);
//   const db = getFirestore(app);
//   const googleProvider = new GoogleAuthProvider();
//   const microsoftProvider = new OAuthProvider('microsoft.com');

//   const [activeTab, setActiveTab] = useState('login');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [authError, setAuthError] = useState('');
//   const [user, setUser] = useState(null);
//   const [loginForm, setLoginForm] = useState({
//     email: '',
//     password: ''
//   });
//   const [signupForm, setSignupForm] = useState({
//     name: '',
//     company: '',
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({
//     loginEmail: false,
//     loginPassword: false,
//     signupName: false,
//     signupCompany: false,
//     signupEmail: false,
//     signupPassword: false
//   });

//   // Handle user authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         // Redirect to dashboard or desired page after successful login
//         console.log("User is signed in:", currentUser.uid);
//         // You could redirect here using React Router if needed
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, [auth]);

//   // Handle tab switching
//   const handleTabSwitch = (tab) => {
//     setActiveTab(tab);
//     setAuthError('');
//     // Reset form errors when switching tabs
//     setErrors({
//       loginEmail: false,
//       loginPassword: false,
//       signupName: false,
//       signupCompany: false,
//       signupEmail: false,
//       signupPassword: false
//     });
//   };

//   // Handle form input changes
//   const handleLoginChange = (e) => {
//     const { id, value } = e.target;
//     setLoginForm({
//       ...loginForm,
//       [id === 'login-email' ? 'email' : 'password']: value
//     });
//   };

//   const handleSignupChange = (e) => {
//     const { id, value } = e.target;
//     const field = id.replace('signup-', '');
//     setSignupForm({
//       ...signupForm,
//       [field]: value
//     });
//   };

//   // Form validation
//   const validateEmail = (email) => {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const validatePassword = (password) => {
//     return password.length >= 8;
//   };

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Firebase authentication functions
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {
//       ...errors,
//       loginEmail: !validateEmail(loginForm.email),
//       loginPassword: !validatePassword(loginForm.password)
//     };
    
//     setErrors(newErrors);
    
//     if (!newErrors.loginEmail && !newErrors.loginPassword) {
//       try {
//         setLoading(true);
//         setAuthError('');
//         await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
//         // Successfully logged in, auth state listener will handle redirection
//       } catch (error) {
//         console.error("Login error:", error);
//         setAuthError(getAuthErrorMessage(error.code));
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {
//       ...errors,
//       signupName: signupForm.name.trim() === '',
//       signupCompany: signupForm.company.trim() === '',
//       signupEmail: !validateEmail(signupForm.email),
//       signupPassword: !validatePassword(signupForm.password)
//     };
    
//     setErrors(newErrors);
    
//     if (!newErrors.signupName && !newErrors.signupCompany && 
//         !newErrors.signupEmail && !newErrors.signupPassword) {
//       try {
//         setLoading(true);
//         setAuthError('');
//         // Create user in Firebase Auth
//         const userCredential = await createUserWithEmailAndPassword(
//           auth, 
//           signupForm.email, 
//           signupForm.password
//         );
        
//         // Store additional user data in Firestore
//         await setDoc(doc(db, "users", userCredential.user.uid), {
//           name: signupForm.name,
//           company: signupForm.company,
//           email: signupForm.email,
//           createdAt: new Date().toISOString(),
//           role: 'vendor' // Default role
//         });
        
//         // User is now created and logged in
//       } catch (error) {
//         console.error("Signup error:", error);
//         setAuthError(getAuthErrorMessage(error.code));
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       setAuthError('');
//       const result = await signInWithPopup(auth, googleProvider);
      
//       // Check if the user exists in Firestore, if not create a profile
//       const isNewUser = result._tokenResponse.isNewUser;
//       if (isNewUser) {
//         await setDoc(doc(db, "users", result.user.uid), {
//           name: result.user.displayName || '',
//           email: result.user.email,
//           createdAt: new Date().toISOString(),
//           role: 'vendor', // Default role
//           authProvider: 'google'
//         });
//       }
//     } catch (error) {
//       console.error("Google sign-in error:", error);
//       setAuthError(getAuthErrorMessage(error.code));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMicrosoftSignIn = async () => {
//     try {
//       setLoading(true);
//       setAuthError('');
//       const result = await signInWithPopup(auth, microsoftProvider);
      
//       // Check if user needs a profile in Firestore
//       const isNewUser = result._tokenResponse.isNewUser;
//       if (isNewUser) {
//         await setDoc(doc(db, "users", result.user.uid), {
//           name: result.user.displayName || '',
//           email: result.user.email,
//           createdAt: new Date().toISOString(),
//           role: 'vendor', // Default role
//           authProvider: 'microsoft'
//         });
//       }
//     } catch (error) {
//       console.error("Microsoft sign-in error:", error);
//       setAuthError(getAuthErrorMessage(error.code));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!validateEmail(loginForm.email)) {
//       setErrors({
//         ...errors,
//         loginEmail: true
//       });
//       return;
//     }
    
//     try {
//       setLoading(true);
//       await sendPasswordResetEmail(auth, loginForm.email);
//       alert(`Password reset email sent to ${loginForm.email}`);
//     } catch (error) {
//       console.error("Password reset error:", error);
//       setAuthError(getAuthErrorMessage(error.code));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   // Helper function to get user-friendly error messages
//   const getAuthErrorMessage = (errorCode) => {
//     switch(errorCode) {
//       case 'auth/invalid-email':
//         return 'Invalid email address format.';
//       case 'auth/user-disabled':
//         return 'This account has been disabled.';
//       case 'auth/user-not-found':
//         return 'No account found with this email.';
//       case 'auth/wrong-password':
//         return 'Incorrect password.';
//       case 'auth/email-already-in-use':
//         return 'Email is already in use.';
//       case 'auth/weak-password':
//         return 'Password is too weak.';
//       case 'auth/operation-not-allowed':
//         return 'Operation not allowed.';
//       case 'auth/account-exists-with-different-credential':
//         return 'An account already exists with the same email but different sign-in credentials.';
//       case 'auth/popup-blocked':
//         return 'Sign-in popup was blocked by your browser.';
//       case 'auth/popup-closed-by-user':
//         return 'Sign-in popup was closed before completing the sign-in.';
//       case 'auth/network-request-failed':
//         return 'Network connection failed. Please check your internet connection.';
//       case 'auth/timeout':
//         return 'The operation has timed out.';
//       default:
//         return 'An error occurred. Please try again.';
//     }
//   };

//   // If user is logged in, show basic logged-in UI (you would replace this with a redirect or proper dashboard)
//   if (user) {
//     return (
//       <div className="portal-container">
//         <div className="portal-card">
//           <div className="portal-header">
//             <h1 className="portal-title">Welcome to CSR Vendor Portal</h1>
//             <p className="portal-subtitle">You are logged in as {user.email}</p>
//           </div>
//           <button onClick={handleLogout} className="submit-btn login-btn">
//             <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//               <polyline points="16 17 21 12 16 7"/>
//               <line x1="21" y1="12" x2="9" y2="12"/>
//             </svg>
//             Logout
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="portal-container">
//       <div className="portal-card">
//         <div className="portal-header">
//           <div className="logo-container">
//             <svg className="portal-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-7.5"/>
//               <path d="M18 14h-8"/>
//               <path d="M15 17.5V20"/>
//               <path d="M15 14v3.5"/>
//               <path d="M10.5 17.5l-1-.5 1-.5"/>
//               <path d="M12.5 17v.5l1 .5-1.5.5"/>
//             </svg>
//           </div>
//           <h1 className="portal-title">CSR Vendor Portal</h1>
//           <p className="portal-subtitle">Empowering sustainable partnerships for a better future</p>
//         </div>
        
//         <div className="tab-navigation">
//           <button 
//             className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
//             onClick={() => handleTabSwitch('login')}
//           >
//             <svg className="tab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
//               <polyline points="10 17 15 12 10 7"/>
//               <line x1="15" y1="12" x2="3" y2="12"/>
//             </svg>
//             Login
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
//             onClick={() => handleTabSwitch('signup')}
//           >
//             <svg className="tab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
//               <circle cx="8.5" cy="7" r="4"/>
//               <line x1="20" y1="8" x2="20" y2="14"/>
//               <line x1="23" y1="11" x2="17" y2="11"/>
//             </svg>
//             Sign Up
//           </button>
//         </div>
        
//         {/* Display authentication errors */}
//         {authError && (
//           <div className="auth-error-container">
//             <p className="auth-error">{authError}</p>
//           </div>
//         )}
        
//         <div className="form-wrapper">
//           {/* Login Form */}
//           {activeTab === 'login' && (
//             <form onSubmit={handleLoginSubmit} className="auth-form">
//               <div className={`form-field ${errors.loginEmail ? 'has-error' : ''}`}>
//                 <label htmlFor="login-email" className="field-label">
//                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                     <polyline points="22,6 12,13 2,6"/>
//                   </svg>
//                   Email Address
//                 </label>
//                 <input 
//                   type="email" 
//                   id="login-email" 
//                   className="field-input" 
//                   placeholder="Enter your work email"
//                   value={loginForm.email}
//                   onChange={handleLoginChange}
//                   disabled={loading}
//                 />
//                 {errors.loginEmail && (
//                   <div className="error-text">Please enter a valid email address</div>
//                 )}
//               </div>
              
//               <div className={`form-field ${errors.loginPassword ? 'has-error' : ''}`}>
//                 <label htmlFor="login-password" className="field-label">
//                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                     <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                   </svg>
//                   Password
//                 </label>
//                 <div className="password-input-group">
//                   <input 
//                     type={showPassword ? "text" : "password"} 
//                     id="login-password" 
//                     className="field-input" 
//                     placeholder="Enter your password"
//                     value={loginForm.password}
//                     onChange={handleLoginChange}
//                     disabled={loading}
//                   />
//                   <button 
//                     type="button" 
//                     className="password-toggle" 
//                     onClick={togglePasswordVisibility}
//                     disabled={loading}
//                   >
//                     {showPassword ? (
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
//                         <line x1="1" y1="1" x2="23" y2="23"/>
//                       </svg>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                         <circle cx="12" cy="12" r="3"/>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 {errors.loginPassword && (
//                   <div className="error-text">Password must be at least 8 characters</div>
//                 )}
//               </div>
              
//               <div className="forgot-link">
//                 <a href="#" className="text-link" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }}>
//                   <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <circle cx="12" cy="12" r="10"/>
//                     <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
//                     <line x1="12" y1="17" x2="12.01" y2="17"/>
//                   </svg>
//                   Forgot Password?
//                 </a>
//               </div>
              
//               <button type="submit" className="submit-btn login-btn" disabled={loading}>
//                 {loading ? 'Logging in...' : (
//                   <>
//                     <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
//                       <polyline points="10 17 15 12 10 7"/>
//                       <line x1="15" y1="12" x2="3" y2="12"/>
//                     </svg>
//                     Login to Dashboard
//                   </>
//                 )}
//               </button>
              
//               <div className="divider">
//                 <span className="divider-text">OR</span>
//               </div>
              
//               <div className="social-login">
//                 <button 
//                   type="button" 
//                   className="social-btn google-btn"
//                   onClick={handleGoogleSignIn}
//                   disabled={loading}
//                 >
//                   <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
//                   </svg>
//                   Continue with Google
//                 </button>
//                 <button 
//                   type="button" 
//                   className="social-btn microsoft-btn"
//                   onClick={handleMicrosoftSignIn}
//                   disabled={loading}
//                 >
//                   <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M11.4 24H0V12.6h11.4V24z"/>
//                     <path d="M24 24H12.6V12.6H24V24z"/>
//                     <path d="M11.4 11.4H0V0h11.4v11.4z"/>
//                     <path d="M24 11.4H12.6V0H24v11.4z"/>
//                   </svg>
//                   Continue with Microsoft
//                 </button>
//               </div>
//             </form>
//           )}
          
//           {/* Signup Form */}
//           {activeTab === 'signup' && (
//             <form onSubmit={handleSignupSubmit} className="auth-form">
//               <div className={`form-field ${errors.signupName ? 'has-error' : ''}`}>
//                 <label htmlFor="signup-name" className="field-label">
//                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//                     <circle cx="12" cy="7" r="4"/>
//                   </svg>
//                   Full Name
//                 </label>
//                 <input 
//                   type="text" 
//                   id="signup-name" 
//                   className="field-input" 
//                   placeholder="Enter your full name"
//                   value={signupForm.name}
//                   onChange={handleSignupChange}
//                   disabled={loading}
//                 />
//                 {errors.signupName && (
//                   <div className="error-text">Please enter your name</div>
//                 )}
//               </div>
              
//               <div className={`form-field ${errors.signupCompany ? 'has-error' : ''}`}>
//                 <label htmlFor="signup-company" className="field-label">
//                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
//                     <polyline points="9 22 9 12 15 12 15 22"/>
//                   </svg>
//                   Company Name
//                 </label>
//                 <input 
//                   type="text" 
//                   id="signup-company" 
//                   className="field-input" 
//                   placeholder="Enter your company name"
//                   value={signupForm.company}
//                   onChange={handleSignupChange}
//                   disabled={loading}
//                 />
//                 {errors.signupCompany && (
//                   <div className="error-text">Please enter your company name</div>
//                 )}
//               </div>
              
//               <div className={`form-field ${errors.signupEmail ? 'has-error' : ''}`}>
//                 <label htmlFor="signup-email" className="field-label">
//                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                     <polyline points="22,6 12,13 2,6"/>
//                   </svg>
//                   Email Address
//                 </label>
//                 <input 
//                   type="email" 
//                   id="signup-email" 
//                   className="field-input" 
//                   placeholder="Enter your work email"
//                   value={signupForm.email}
//                   onChange={handleSignupChange}
//                   disabled={loading}
//                 />
//                 {errors.signupEmail && (
//                   <div className="error-text">Please enter a valid email address</div>
//                 )}
//               </div>
              
//               <div className={`form-field ${errors.signupPassword ? 'has-error' : ''}`}>
//                 <label htmlFor="signup-password" className="field-label">
//                   <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                     <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                   </svg>
//                   Create Password
//                 </label>
//                 <div className="password-input-group">
//                   <input 
//                     type={showPassword ? "text" : "password"} 
//                     id="signup-password" 
//                     className="field-input"
//                     placeholder="Create a secure password"
//                     value={signupForm.password}
//                     onChange={handleSignupChange}
//                     disabled={loading}
//                   />
//                   <button 
//                     type="button" 
//                     className="password-toggle" 
//                     onClick={togglePasswordVisibility}
//                     disabled={loading}
//                   >
//                     {showPassword ? (
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
//                         <line x1="1" y1="1" x2="23" y2="23"/>
//                       </svg>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                         <circle cx="12" cy="12" r="3"/>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 {errors.signupPassword && (
//                   <div className="error-text">Password must be at least 8 characters</div>
//                 )}
//                 <div className="password-strength">
//                   <div className="strength-meter">
//                     <div className={`strength-segment ${signupForm.password.length >= 1 ? 'active' : ''}`}></div>
//                     <div className={`strength-segment ${signupForm.password.length >= 4 ? 'active' : ''}`}></div>
//                     <div className={`strength-segment ${signupForm.password.length >= 6 ? 'active' : ''}`}></div>
//                     <div className={`strength-segment ${signupForm.password.length >= 8 ? 'active' : ''}`}></div>
//                   </div>
//                   <span className="strength-text">
//                     {signupForm.password.length === 0 ? 'Password strength' :
//                      signupForm.password.length < 4 ? 'Weak' :
//                      signupForm.password.length < 6 ? 'Fair' :
//                      signupForm.password.length < 8 ? 'Good' : 'Strong'}
//                   </span>
//                 </div>
//               </div>
              
//               <button type="submit" className="submit-btn signup-btn">
//                 <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
//                   <circle cx="8.5" cy="7" r="4"/>
//                   <line x1="20" y1="8" x2="20" y2="14"/>
//                   <line x1="23" y1="11" x2="17" y2="11"/>
//                 </svg>
//                 Create Account
//               </button>
              
//               <div className="divider">
//                 <span className="divider-text">OR</span>
//               </div>
              
//               <div className="social-login">
//                 <button type="button" className="social-btn google-btn">
//                   <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
//                   </svg>
//                   Continue with Google
//                 </button>
//                 <button type="button" className="social-btn microsoft-btn">
//                   <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M11.4 24H0V12.6h11.4V24z"/>
//                     <path d="M24 24H12.6V12.6H24V24z"/>
//                     <path d="M11.4 11.4H0V0h11.4v11.4z"/>
//                     <path d="M24 11.4H12.6V0H24v11.4z"/>
//                   </svg>
//                   Continue with Microsoft
//                 </button>
//               </div>
              
//               <div className="terms-policy">
//                 By creating an account, you agree to our <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
//               </div>
//             </form>
//           )}
//         </div>
        
//         <div className="portal-footer">
//           <div className="portal-benefits">
//             <div className="benefit-item">
//               <svg className="benefit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//                 <polyline points="22 4 12 14.01 9 11.01"/>
//               </svg>
//               <span>Verified Partners</span>
//             </div>
//             <div className="benefit-item">
//               <svg className="benefit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
//                 <line x1="16" y1="2" x2="16" y2="6"/>
//                 <line x1="8" y1="2" x2="8" y2="6"/>
//                 <line x1="3" y1="10" x2="21" y2="10"/>
//               </svg>
//               <span>Real-time Updates</span>
//             </div>
//             <div className="benefit-item">
//               <svg className="benefit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//               </svg>
//               <span>Secure Platform</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CSRVendorPortal;















































import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your internet connection.");
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      
    } catch (error) {
      let errorMessage = "Login failed. ";
      
      switch (error.code) {
        case "auth/network-request-failed":
          errorMessage += "Network connection issue. Please check your internet connection and try again.";
          break;
        case "auth/user-not-found":
          errorMessage += "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage += "Incorrect password.";
          break;
        case "auth/invalid-email":
          errorMessage += "Invalid email format.";
          break;
        case "auth/user-disabled":
          errorMessage += "This account has been disabled.";
          break;
        default:
          errorMessage += error.message || "Unknown error occurred.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Log in to your account to continue</p>
        </div>
        
        {error && (
          <div className="error-alert">
            <svg className="error-icon" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 20 20">
                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
              </svg>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="spinner" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
          
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
        
        <div className="social-login">
          <div className="divider">or continue with</div>
          <div className="social-buttons">
            <button type="button" className="social-button google">
              <svg className="social-icon" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button type="button" className="social-button facebook">
  <svg className="social-icon" viewBox="0 0 24 24">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
  Facebook
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;