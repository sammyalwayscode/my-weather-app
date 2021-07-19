import React, { useState } from "react";
import "./SignUp.css";
import "antd/dist/antd.css";
import { Button, Input } from "antd";
import { app } from "./Base";
import { useHistory } from "react-router-dom";
import SinPic from "../Images/wedc.PNG";

const BasePush = app.firestore().collection("Authers");
function SignUp() {
  const hist = useHistory();
  const [toogle, setToogle] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  const postImage = async (e) => {
    const fileRef = e.target.files[0];
    const storageRef = app.storage().ref();
    const childRef = storageRef.child(fileRef.name);
    await childRef.put(fileRef);
    setImageURL(await childRef.getDownloadURL());
  };

  const SignUp = async () => {
    const newUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (newUser) {
      await BasePush.doc(newUser.user.uid).set({
        name,
        email,
        password,
        Avatar: await imageURL,
      });
      hist.push("/");
    }
  };

  const SignIn = async () => {
    const User = await app.auth().signInWithEmailAndPassword(email, password);

    if (User) {
      hist.push("/");
    }
  };

  return (
    <div className="GeneralSignUp">
      <div>
        <h1 style={{ textAlign: "center" }}>My Weather App</h1>{" "}
        <img src={SinPic} alt="SignPix" style={{ width: "300px" }} />{" "}
      </div>
      <div className="SignDiv">
        {toogle ? (
          <div>
            <Input
              style={{
                width: "300px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              type="file"
              onChange={postImage}
            />
            <Input
              style={{
                width: "300px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              style={{
                width: "300px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              style={{
                width: "300px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button danger style={{ fontWeight: "bold" }} onClick={SignUp}>
              Sign Up
            </Button>
            <br />
            <span>
              Already a user?{" "}
              <strong
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => {
                  setToogle(!toogle);
                }}
              >
                Sign In
              </strong>
            </span>
          </div>
        ) : (
          <div>
            {" "}
            <Input
              style={{
                width: "300px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              style={{
                width: "300px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              style={{ fontWeight: "bold" }}
              type="primary"
              onClick={SignIn}
            >
              Sign In
            </Button>
            <br />
            <span>
              Already a user?{" "}
              <strong
                style={{ color: "gold", cursor: "pointer" }}
                onClick={() => {
                  setToogle(!toogle);
                }}
              >
                Sign Up
              </strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
