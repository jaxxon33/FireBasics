document.addEventListener("DOMContentLoaded", event => {
	const app = firebase.app()
	console.log(app)

	// told to add via firestore to get timestamps working
	firebase.firestore().settings({ timestampsInSnapshots: true });

	// connect to db
	const db = firebase.firestore()
	const myPost = db.collection('posts').doc('firstpost')

	// retrieve item
	myPost.get()
		.then(doc => {
			const data = doc.data()
			first.innerHTML = `Title: ${data.title} Views: ${data.views} Created: ${data.createdAt.toDate()}`
		})

	// get changes as they happen
	myPost.onSnapshot(doc => {
		const data = doc.data()
		second.innerHTML = `Title: ${data.title} Views: ${data.views} Created: ${data.createdAt.toDate()}`
	})
})

// auth
function googleLogin() {
	const provider = new firebase.auth.GoogleAuthProvider()
	firebase.auth().signInWithPopup(provider)
		.then(result => {
			const user = result.user
			heading.innerHTML = `Hello ${user.displayName}`
		})
}

// get input to modify db
function updatePost(e) {
	const db = firebase.firestore()
	const myPost = db.collection('posts').doc('firstpost')
	myPost.update({ title: e.target.value })
}