import React, { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCategorie = (e) => {
    setCategories(e.target.value.split(","));
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + files.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, files);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const product = {
            ...inputs,
            img: downloadURL,
            categories: categories,
          };
          addProduct(product, dispatch);
        });
      }
    );
  };
  // Upload the file and metadata

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Product</h1>
      <form className='addProductForm'>
        <div className='addProductItem'>
          <label>Image</label>
          <input
            type='file'
            id='file'
            onChange={(e) => setFiles(e.target.files[0])}
          />
        </div>
        <div className='addProductItem'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            placeholder='Apple Airpods'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Price</label>
          <input
            type='number'
            name='price'
            placeholder='100'
            min='0'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>categories</label>
          <input
            type='text'
            placeholder='jeans,skirts...'
            onChange={handleCategorie}
          />
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <input
            type='text'
            name='description'
            placeholder='Description...'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Stock</label>
          <select
            name='inStock'
            id='stock'
            onChange={handleChange}
          >
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
        <button
          onClick={handleCreate}
          className='addProductButton'
        >
          Create
        </button>
      </form>
    </div>
  );
}
