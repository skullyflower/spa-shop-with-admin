import { useState } from "react";

function ContactForm() {
  const [form_values, setForm_values] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [valid_inputs, setValid_inputs] = useState({
    name: null,
    email: null,
    subject: null,
    message: null,
  });
  const [resultMessage, setResultMessage] = useState(null);

  const validateInput = (e) => {
    let validInputs = { ...valid_inputs };
    let emailform = { ...form_values };
    let namePatt = /^(([^<>()[\]\\.,;\s@"]+[.]?[\s]?)+){2,100}$/;
    let emailPatt =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let subjectPatt = /^(([^<>()[\]\\.,;\s@"]+[.?!,]?[\s]?)+){2,100}$/;
    let messagePatt = /^(([^<>()[\]\\.,;\s"]+[.?!,]?[\s]?([\n]?[\r]?){0,2})+){2,500}$/;
    switch (e.target.name) {
      case "name":
        validInputs.name = namePatt.test(e.target.value);
        break;
      case "email":
        validInputs.email = emailPatt.test(e.target.value);
        break;
      case "subject":
        validInputs.subject = subjectPatt.test(e.target.value);
        break;
      case "message":
        validInputs.message = messagePatt.test(e.target.value);
        break;
      default:
        break;
    }
    emailform[e.target.name] = e.target.value;
    setForm_values(emailform);
    setValid_inputs(validInputs);
  };

  const captchaValidate = (value) => {
    let emailform = { ...form_values, grecaptcharesponse: value };
    let validInputs = { ...valid_inputs, grecaptcharesponse: value ? true : false };
    setForm_values(emailform);
    setValid_inputs(validInputs);
  };

  const validateForm = () => {
    var validuntilproveninvalid = true;
    var inputnames = Object.keys(valid_inputs);
    inputnames.forEach((inputname) => {
      if (valid_inputs[inputname] !== true) {
        validuntilproveninvalid = false;
      }
    });
    return validuntilproveninvalid;
  };

  const postMessage = async (postData) => {
    const response = await fetch("/API/contactSend.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    return response;
  };

  const sendMessage = () => {
    const isValid = validateForm();
    if (isValid) {
      setShowloader(true);
      let postData = form_values;
      postMessage(postData)
        .then((data) => data.json())
        .then((result) => {
          setResultMessage(result.response);
        })
        .catch((error) => {
          setResultMessage("There was a problem connecting");
        })
        .finally(() => {
          setShowloader(false);
        });
    }
  };

  return (
    <>
      <div className={resultMessage ? "content" : "hide"}>
        <h2 className="centered">{resultMessage}</h2>
      </div>
      <div className={resultMessage ? "hide" : "content"}>
        <h2>Let's chat</h2>
        <div id="emailform">
          <label
            htmlFor="name"
            className="formhead">
            Name:
          </label>
          <input
            className={valid_inputs.name === false ? "is-invalid" : ""}
            maxLength="50"
            type="text"
            minLength="3"
            id="name"
            name="name"
            autoFocus
            required
            value={form_values.name}
            autoComplete="on"
            onChange={validateInput}
          />
          <label
            htmlFor="email"
            className="formhead">
            e-Mail:
          </label>
          <input
            className={valid_inputs.email === false ? "is-invalid" : ""}
            type="email"
            id="email"
            maxLength="50"
            minLength="6"
            name="email"
            placeholder="optional"
            value={form_values.email}
            onChange={validateInput}
            autoComplete="true"
          />
          <div id="subjectd">
            <label
              htmlFor="subject"
              className="formhead">
              Subject:
            </label>
            <input
              className={valid_inputs.subject === false ? "is-invalid" : ""}
              maxLength="100"
              type="text"
              minLength="2"
              id="subject"
              name="subject"
              required
              value={form_values.subject}
              onChange={validateInput}
            />
          </div>
          <div id="messaged">
            <label
              htmlFor="message"
              className="formhead">
              Message:
            </label>
            <textarea
              rows="15"
              cols="45"
              id="message"
              name="message"
              required
              className={valid_inputs.message === false ? "is-invalid" : ""}
              value={form_values.message}
              onChange={validateInput}
            />
          </div>
          <div className="centered">
            <button
              type="submit"
              className="shopButt"
              onClick={sendMessage}>
              Send Your Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
