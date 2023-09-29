import { useForm } from "react-hook-form";
import UploadInput from "./upload-input";

export default function ImageUpload({ hideForm, setMessages }) {
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
          <UploadInput
            register={register}
            name="images"
          />
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
