import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const getSale = (setSale, setMessages) => {
  fetch("http://localhost:4242/api/sale")
    .then((data) => data.json())
    .then((json) => {
      if (!isNaN(Number(json.sale))) {
        setSale(json.sale);
      } else {
        setSale(0);
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get sale.");
    });
};

const Sale = () => {
  const [sale, setSale] = useState(null);
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    if (sale === null) {
      getSale(setSale, setMessages);
    }
  }, [sale, setSale, setMessages]);
  const onSubmit = (values) => {
    fetch("http://localhost:4242/api/sale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getSale(setSale, () => {});
      })
      .catch((err) => {
        setMessages(err.message || "Failed to save sale.");
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { sale: 0 }, mode: "onChange" });

  return (
    <div className="content">
      {messages && <p>{messages}</p>}
      <h3>Set Sale</h3>
      <div id="adminList">
        <div>Current Sale: {sale || 0}</div>
        <div>
          Update Sale: (decimal value){" "}
          <input
            className={errors.sale ? "is-invalid" : ""}
            {...register("sale", { required: true })}
            type="number"
            min={0}
            max={0.99}
            step={0.1}
          />{" "}
          <button className="shopButt" onClick={handleSubmit(onSubmit)}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sale;
