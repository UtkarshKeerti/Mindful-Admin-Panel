import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import firebaseApp, { storage } from '../firebase';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// To upload image in Bucket
// All arguments are required for image upload to work.
export const uploadImageToBucket = (
  imageFile,
  subFolder,
  apiCallFunc,
  setProgress,
  setProgressShow,
  formData,
  setLoading
) => {
  // console.log("uploading File")
  setProgressShow(true)

  // Format fileName
  const ext = imageFile.name.split('.')[1]
  const name = imageFile.name.split('.')[0]
  const fileName = `${name}_${Date.now()}.${ext}`;

  // Create Storage reference
  const storageRef = ref(
    storage,
    `/images/${subFolder}/${fileName}`
  );

  // Upload file in the storage ref
  const uploadTask = uploadBytesResumable(storageRef, imageFile);

  // After/During file upload
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const uploaded = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(uploaded)
    },
    (error) => {
      console.log("ERROR while uploading image", error);
      alert("Access denied, please re-login and try again")
      setProgressShow(false)
      setLoading(false)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        if (formData.image)
          deleteImageFromBucket(formData.image)

        const obj = {
          ...formData,
          image: url
        }
        apiCallFunc(obj);
        setProgressShow(false)
        setLoading(false)
      });
    }
  )
}

// To delete image from bucket
export const deleteImageFromBucket = async (fileUrl) => {
  // console.log('Deleting Image from bucket');

  // Create a reference to the file to delete
  const imageRef = ref(
    storage,
    fileUrl
  )

  // Delete File
  deleteObject(imageRef)
    .then(res => {
      // console.log("Image Deleted from bucket")
    })
    .catch(err => console.log('ERROR while deleteing the file', err))

}

// SignIn to firebase app
export const signInFirebase = async (data) => {
  let response;

  const auth = getAuth(firebaseApp);
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then(res => {
      if (!res) return console.log('undefined response firebase signin')
      response = {
        accessToken: res.user.accessToken,
        uid: res.user.uid,
        email: res.user.email
      }
      // console.log('Firebase:', user)
    })

  return response;
}

// Sign out of firebase app
export const signOutFirebase = async () => {
  const auth = getAuth(firebaseApp);

  signOut(auth).then(res =>
    console.log("LOGGED OUT of FirebaseApp")
  )
}