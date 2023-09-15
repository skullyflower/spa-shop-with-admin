import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../bits/image-upload";

const getImages = (setFilesToMove, setMessages) => {
  setFilesToMove([]);
  fetch("http://localhost:4242/api/images")
    .then((data) => data.json())
    .then((json) => {
      if (Array.isArray(json)) {
        setFilesToMove(json);
      } else {
        setFilesToMove([]);
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get images.");
    });
};
const getSubdirectories = (toplevel, setSecondLevel, setMessages) => {
  fetch(`http://localhost:4242/api/folders/${toplevel}`)
    .then((data) => data.json())
    .then((json) => setSecondLevel(json))
    .catch((err) => {
      setMessages(err.message || "Couldn't get subdiractories.");
    });
};
const defaultValues = { toplevel: "", filesToMove: [], secondLevels: "" };

const Images = () => {
  const { register, handleSubmit } = useForm(defaultValues);

  const onSubmit = (values) => {
    fetch("http://localhost:4242/api/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getImages(setFilesToMove, () => {});
      })
      .catch((err) => {
        setMessages(err.message || "Failed to move files.");
      });
  };
  const [showForm, setShowForm] = useState(false);
  const [filesToMove, setFilesToMove] = useState(null);
  const [messages, setMessages] = useState(null);
  const toplevels = ["artwork", "sfcomics", "images", "shop", "sketchbook"];
  const [secondLevel, setSecondLevel] = useState([]);
  const checkForImages = useCallback(
    (e) => {
      e.preventDefault();
      setMessages(null);
      getImages(setFilesToMove, setMessages);
    },
    [setFilesToMove, setMessages],
  );
  useEffect(() => {
    if (!filesToMove && !messages) {
      getImages(setFilesToMove, setMessages);
    }
  }, [filesToMove, setFilesToMove, messages, setMessages]);

  const onSelectDir = useCallback(
    (e) => {
      const dir = e.target.value;
      getSubdirectories(dir, setSecondLevel, setMessages);
    },
    [setSecondLevel, setMessages],
  );

  return (
    <div className="content">
      <h3>Add Images</h3>
      <button
        className="shopButt"
        value="newcat"
        onClick={() => setShowForm(!showForm)}>
        {showForm ? "Never mind" : "Add new ones"}
      </button>
      {showForm && (
        <div>
          <ImageUpload
            hideForm={() => {
              setShowForm(false);
            }}
            setMessages={setMessages}
          />
        </div>
      )}
      {messages && <p>{messages}</p>}
      <div id="adminList">
        <div style={{ display: "flex", justifyContent: "space-evenly", margin: "30px auto" }}>
          <div style={{ marginRight: "50px" }}>
            <h3>Files to Move</h3>
            {filesToMove &&
              filesToMove.length > 0 &&
              filesToMove.map((file, i) => (
                <div
                  key={i}
                  style={{ padding: "5px" }}>
                  <img
                    src={`/files/big/${file}`}
                    alt={file}
                    width={75}
                    style={{ verticalAlign: "middle", padding: "0 10px" }}
                  />
                  <input
                    {...register("filesToMove")}
                    type="checkbox"
                    value={file}
                  />{" "}
                  {file}
                </div>
              ))}
            <button
              className="shopButt"
              onClick={checkForImages}>
              Check For Images
            </button>
          </div>
          <div>
            <h3>Destination</h3>
            <select
              {...register("toplevel")}
              onChange={onSelectDir}>
              <option value="">Pick a Destination</option>
              {toplevels.map((dir, i) => (
                <option
                  value={dir}
                  key={i}>
                  {dir}
                </option>
              ))}
            </select>
            {secondLevel.length > 0 && (
              <span>
                {" "}
                /{" "}
                <select {...register("secondLevels")}>
                  <option value="">Pick a subdirectory</option>
                  {secondLevel.map((dir, i) => (
                    <option
                      value={dir}
                      key={i}>
                      {dir}
                    </option>
                  ))}
                </select>
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className="centered"
        style={{ paddingBottom: "50px" }}>
        <button
          className="shopButt"
          onClick={handleSubmit(onSubmit)}>
          Move The images.
        </button>
      </div>
    </div>
  );
};
export default Images;
