// Import firebase
import fb from 'firebase/app'
import auth from 'firebase/auth'
import db from 'firebase/database'
fb.auth = auth
fb.db = db

// Export firebase object
export default fb