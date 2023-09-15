import { useState } from "react";
import { useForm } from "react-hook-form";

function Preview({ data }) {
  return (
    <div>
      {data.map((image) => (
        <img
          className="image"
          src={image}
          alt=""
          key={image}
          width={150}
          style={{ padding: "10px" }}
        />
      ))}
    </div>
  );
}

export default function ImageUpload({ hideForm, setMessages }) {
  const [previewImages, setPreviewImages] = useState([]);

  const changeMultipleFiles = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setPreviewImages((prevImages) => prevImages.concat(imageArray));
    }
  };

  const onSubmit = (data) => {
    const imagesArr = Array.from(data.images);
    var formData = new FormData();
    formData.append("date", Date.now().toString());
    for (var file of imagesArr) {
      formData.append("images", file);
    }
    fetch("http://localhost:4242/api/imageupload", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        setMessages(data.json());
        setPreviewImages([]);
      })
      .catch((err) => {
        setMessages("Failed to upload files.");
      });
  };

  const { register, handleSubmit } = useForm();
  return (
    <div className="show">
      <div id="overlay"></div>
      <div className="floater">
        <div
          id="adminForm"
          method="POST">
          <button
            className="shopButt right"
            onClick={hideForm}>
            Never mind
          </button>
          <h3>Upload Images</h3>
          <div>
            <label htmlFor="newImage">Upload Images</label>
            <input
              {...register("images")}
              type="file"
              accept="image/*"
              multiple
              id="images"
              name="images"
              onChange={changeMultipleFiles}
            />
          </div>
          {previewImages.length > 0 && <Preview data={previewImages} />}
          <button
            className="shopButt"
            onClick={handleSubmit(onSubmit)}>
            Upload and Resize
          </button>
        </div>
      </div>
    </div>
  );
}
