document.addEventListener("DOMContentLoaded", event => {

	const app = firebase.app()
	// told to add via firestore to get timestamps working
	firebase.firestore().settings({ timestampsInSnapshots: true });

	// connect to db
	const db = firebase.firestore()

	// get posts data
	const myPost = db.collection('posts').doc('firstpost')

	// get products data
	const productsRef = db.collection('products')
	const query = productsRef.where('price', '>', 5).orderBy('price', 'desc').limit(5)
	query.get()
		.then(products => {
			products.forEach(doc => {
				data = doc.data()

				// generate items to insert in ul
				const li = document.createElement('li')
				li.innerHTML = `${data.name} at ${data.price}`
				prodList.appendChild(li)
			})
		})

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

// file handling
function uploadFile(files) {
	const storageRef = firebase.storage().ref()
	const imageRef = storageRef.child('image.jpg')
	const file = files.item(0)
	const task = imageRef.put(file)
	task.then(snapshot => {
		snapshot.ref.getDownloadURL().then(function (url) {
			imgUpload.setAttribute('src', url)
		})
	})
}