/**
 * Admin User Creation Script
 *
 * This script helps create an admin user in Firebase Authentication.
 *
 * IMPORTANT: This requires Firebase Admin SDK for security.
 * For initial setup, use Firebase Console instead:
 *
 * 1. Go to Firebase Console: https://console.firebase.google.com
 * 2. Select your project
 * 3. Go to Authentication > Users
 * 4. Click "Add user"
 * 5. Enter email: justin.sligar@gmail.com
 * 6. Set a strong password
 * 7. Click "Add user"
 *
 * After creating the user, you can log in at:
 * https://your-domain.com/admin/login
 */

const adminEmail = 'justin.sligar@gmail.com'

console.log('\n=== Firebase Admin User Setup ===\n')
console.log('To create an admin user, follow these steps:\n')
console.log('1. Go to: https://console.firebase.google.com')
console.log('2. Select your Firebase project')
console.log('3. Navigate to: Authentication > Users')
console.log('4. Click "Add user" button')
console.log(`5. Email: ${adminEmail}`)
console.log('6. Set a secure password (min 6 characters)')
console.log('7. Click "Add user"\n')
console.log('Once created, you can log in at: /admin/login\n')
console.log('=================================\n')
