document.addEventListener("DOMContentLoaded", event => {
	const app = firebase.app()
	console.log(app)

	// told to add via firestore to get timestamps working
	firebase.firestore().settings({ timestampsInSnapshots: true });

	const db = firebase.firestore()
	const myPost = db.collection('posts').doc('firstpost')

	// retrieve item
	myPost.get()
	.then( doc=>{
		const data = doc.data()
		document.write(data.title+ '<br/>')  
		document.write(data.views)
		document.write(data.createdAt.toDate() + '<br />')
	})

	// get changes as they happen
	myPost.onSnapshot(doc => {
		const data = doc.data()
		document.write(data.title + '<br/>')
		document.write(data.views)
		document.write(data.createdAt.toDate() + '<br />')
	})
})

function googleLogin() {
	const provider = new firebase.auth.GoogleAuthProvider()
	firebase.auth().signInWithPopup(provider)
		.then(result => {
			const user = result.user
			document.write(`Hello ${user.displayName}`)
			console.log(user)
		})
		.catch(console.log)

}