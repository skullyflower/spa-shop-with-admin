import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.bubble.css";

const getCategories = (setCategories, setMessages) => {
  setCategories({});
  fetch("http://localhost:4242/api/categories")
    .then((data) => data.json())
    .then((json) => {
      const catids = Object.keys(json);
      if (Array.isArray(catids)) {
        setCategories(json);
      } else {
        setCategories({});
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get categories.");
    });
};
const newcat = { id: "newcat", name: "", img: "", description: "", subcat: [] };

const EditCategory = ({ catid, categories, toggleCatForm, onSubmit }) => {
  const cat = categories[catid] || newcat;
  const [wysiwygText, setWysiwygText] = useState(cat.description);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: cat, mode: "onChange" });

  const catids = categories ? Object.keys(categories) : [];

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
            <h5>Sub Categories:</h5>
            {catids.map((c, i) => {
              return (
                <span key={i}>
                  <span>
                    <input
                      type="checkbox"
                      {...register(`subcat`)}
                      value={c}
                    />
                    <label htmlFor="subcat">{categories[c].name}</label>{" "}
                  </span>
                  {" • "}
                </span>
              );
            })}
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

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [catIds, setCatIds] = useState([]);
  const [messages, setMessages] = useState(null);
  const [showCatForm, setShowCatForm] = useState(false);
  const [activeCat, setActiveCat] = useState(null);

  const onSubmit = (values) => {
    let newCategories = { ...categories };
    newCategories[values.id] = values; //adds or updates.
    fetch("http://localhost:4242/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categories: newCategories }),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getCategories(setCategories, setMessages);
        toggleCatForm();
      })
      .catch((err) => {
        setMessages(err.message || "there was a problem.");
      });
  };
  const doDelete = useCallback((e) => {
    if (window.confirm("Are you sure you want to do this?")) {
      const category = e.target.value;
      fetch(`http://localhost:4242/api/categories/${category}`, {
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((json) => {
          setMessages(json.message);
          getCategories(setCategories, setMessages);
        });
    }
  }, []);

  const toggleCatForm = useCallback(
    (e) => {
      const category = e && e.target.value ? e.target.value : null;
      setActiveCat(category);
      setShowCatForm(!!category);
    },
    [setActiveCat, setShowCatForm],
  );
  useEffect(() => {
    if (!categories && !messages) {
      getCategories(setCategories, setMessages);
    }
  }, [categories, messages, setCategories, setMessages]);
  useEffect(() => {
    if (categories) {
      setCatIds(Object.keys(categories));
    }
  }, [categories, setCatIds]);
  return (
    <div className="content">
      {messages && <p>{messages}</p>}
      <h3>Add, Update, Delete Categories</h3>
      <button
        className="shopButt"
        value="newcat"
        onClick={toggleCatForm}>
        {showCatForm ? "Never mind" : "Add a new one"}
      </button>
      {showCatForm && (
        <div>
          <EditCategory
            catid={activeCat}
            categories={categories}
            toggleCatForm={toggleCatForm}
            onSubmit={onSubmit}
          />
        </div>
      )}{" "}
      <div id="adminList">
        {categories &&
          catIds.map((catid) =>
            !!categories[catid] ? (
              <div
                key={catid}
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <img
                  src={`http://localhost:3000/shop/GROUPS/${categories[catid].img}`}
                  style={{ width: "75px" }}
                  alt={categories[catid].name}
                />{" "}
                {categories[catid].name}{" "}
                <div
                  style={{
                    textAlign: "left",
                    display: "inline-block",
                    width: "60%",
                    verticalAlign: "top",
                  }}
                  dangerouslySetInnerHTML={{ __html: categories[catid].description }}
                />
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
export default Categories;
