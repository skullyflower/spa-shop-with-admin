import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.bubble.css";

const getSubjects = (setSubjects, setMessages) => {
  setSubjects({});
  fetch("http://localhost:4242/api/subjects")
    .then((data) => data.json())
    .then((json) => {
      const catids = Object.keys(json);
      if (Array.isArray(catids)) {
        setSubjects(json);
      } else {
        setSubjects({});
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get subjects.");
    });
};
const newcat = { id: "newcat", name: "", img: "", description: "" };

const EditCategory = ({ catid, subjects, toggleCatForm, onSubmit }) => {
  const subject = subjects[catid] || newcat;
  const [wysiwygText, setWysiwygText] = useState(subject.description);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: subject, mode: "onChange" });

  const handleTextChange = (formfield) => (newText) => {
    setValue(formfield, newText);
    setWysiwygText(newText);
  };

  return (
    <div className="show">
      <div id="overlay"></div>
      <div className="floater">
        <form
          id="adminForm"
          method="POST">
          <button
            className="shopButt right"
            onClick={toggleCatForm}>
            Never mind
          </button>
          <div>
            <label>Id:</label>{" "}
            <input
              className={errors.id ? "is-invalid" : ""}
              type="text"
              data-lpignore="true"
              {...register("id", { required: true, validate: (value) => value !== "newcat" })}
              defaultValue={subject.id || catid}
            />
          </div>
          <div>
            <label>Name:</label>{" "}
            <input
              className={errors.name ? "is-invalid" : ""}
              type="text"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label>Image:</label>{" "}
            <input
              className={errors.img ? "is-invalid" : ""}
              type="text"
              {...register("img", { required: true })}
            />
          </div>
          <div>
            <label>Description:</label>{" "}
            <div className="content">
              <ReactQuill
                id="wysi_one"
                className={errors.description ? "is-invalid" : ""}
                theme="bubble"
                value={wysiwygText}
                onChange={handleTextChange("description")}
              />
            </div>
            <textarea
              className={errors.description ? "is-invalid" : ""}
              {...register("description", { required: true })}></textarea>
          </div>
          <div>
            <button
              className="shopButt"
              onClick={handleSubmit(onSubmit)}>
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Subjects = () => {
  const [subjects, setSubjects] = useState(null);
  const [catIds, setCatIds] = useState([]);
  const [messages, setMessages] = useState(null);
  const [showDesignForm, setShowDesignForm] = useState(false);
  const [activeCat, setActiveCat] = useState(null);

  const onSubmit = (values) => {
    let newSubjects = { ...subjects };
    newSubjects[values.id] = values; //adds or updates.
    fetch("http://localhost:4242/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ designs: newSubjects }),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getSubjects(setSubjects, setMessages);
        toggleCatForm();
      })
      .catch((err) => {
        setMessages(err.message || "there was a problem.");
      });
  };
  const doDelete = useCallback((e) => {
    if (window.confirm("Are you sure you want to do this?")) {
      const category = e.target.value;
      fetch(`http://localhost:4242/api/subjects/${category}`, {
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((json) => {
          setMessages(json.message);
          getSubjects(setSubjects, setMessages);
        });
    }
  }, []);

  const toggleCatForm = useCallback(
    (e) => {
      const category = e && e.target.value ? e.target.value : null;
      setActiveCat(category);
      setShowDesignForm(!!category);
    },
    [setActiveCat, setShowDesignForm],
  );
  useEffect(() => {
    if (!subjects && !messages) {
      getSubjects(setSubjects, setMessages);
    }
  }, [subjects, messages, setSubjects, setMessages]);
  useEffect(() => {
    if (subjects) {
      setCatIds(Object.keys(subjects));
    }
  }, [subjects, setCatIds]);
  return (
    <div className="content">
      {messages && <p>{messages}</p>}
      <h3>Add, Update, Delete Subjects</h3>
      <button
        className="shopButt"
        value="newcat"
        onClick={toggleCatForm}>
        {showDesignForm ? "Never mind" : "Add a new one"}
      </button>
      {showDesignForm && (
        <div>
          <EditCategory
            catid={activeCat}
            subjects={subjects}
            toggleCatForm={toggleCatForm}
            onSubmit={onSubmit}
          />
        </div>
      )}{" "}
      <div id="adminList">
        {subjects &&
          catIds.map((catid) =>
            !!subjects[catid] ? (
              <div
                key={catid}
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <img
                  src={`http://localhost:3000/shop/GROUPS/${subjects[catid].img}`}
                  style={{ width: "75px" }}
                  alt={subjects[catid].name}
                />{" "}
                {subjects[catid].name}{" "}
                <div
                  style={{
                    textAlign: "left",
                    display: "inline-block",
                    width: "60%",
                    verticalAlign: "top",
                  }}>
                  {subjects[catid].description}
                </div>
                <button
                  className="shopButt"
                  value={catid}
                  onClick={doDelete}>
                  X
                </button>
                <button
                  className="shopButt"
                  value={catid}
                  onClick={toggleCatForm}>
                  Edit
                </button>
              </div>
            ) : null,
          )}
      </div>
    </div>
  );
};
export default Subjects;
