import {
  Form,
  Input,
  Radio,
  RadioChangeEvent,
} from "antd";
import React, { useEffect, useState } from "react";
import { SuccessRegister } from "../SuccessRegister";
import s from "./Form.module.scss";
import * as api from '../../api';

interface FieldData {
  email: string;
  name: string;
  phone: string;
}
export interface IPositions {
  id: number;
  name: string;
}
export const Forms = () => {
  const [token, setToken] = useState("");
  const [position, setPosition] = useState();
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [avaiblePositions, setAvaiblePositions] = useState<IPositions[]>([]);
  const [errorPosition, setErrorPosition] = useState<boolean>(false);
  const [errorFile, setErrorFile] = useState<boolean>(false);
  const [successRequest, setSuccessRequest] = useState<boolean>(false);
  const [errorByServer, setErrorByServer] = useState<string>('');

    useEffect(() => {
      api.getToken(setToken);
      api.getPositions(setAvaiblePositions);
    }, []);
  
    const postRequest = (formData: FormData) => {
      api.postUser(setSuccessRequest, formData, token, setErrorByServer)
  };

  const getInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setInputFile(e.target.files[0]);
    setErrorFile(false);
  };

  const onChangePosition = (e: RadioChangeEvent) => {
    setErrorPosition(false)
    setPosition(e.target.value);
  };

  const onFinish = (values: FieldData) => {
    const formData = new FormData();
    
    if (!position) return setErrorPosition(true);
    if (!inputFile) return setErrorFile(true);

    formData.append("position_id", position);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("photo", inputFile);

    setErrorPosition(false);
    setErrorFile(false);

    postRequest(formData);
  };

  const onFinishFailed = () => {
    if (!position) setErrorPosition(true);
    if (!inputFile) setErrorFile(true);
  };

  const renderForm = () => {
    return (
    <>
      <h1 className={s.singUpFormTitle}>Working with POST request</h1>
      <span className={s.errorByServer}>{errorByServer}</span>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={s.singUpForm}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              min: 2,
              max: 60,
              message: "User name should be minimal 2 characters",
            },
          ]}
        >
          <Input type={"text"} placeholder="Your name" />
        </Form.Item>

        <Form.Item
          name="email"
          className={s.inputPhone}
          rules={[
            {
              required: true,
              type: "email",
              message: "Wrong email format",
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phone"
          className={s.inputPhone}
          rules={[
            {
              required: true,
              message: <div className={s.customError}>Phone number is required!</div>,
            },
            {
              pattern: /^[+]{0,1}380([0-9]{9})$/,
              message: <div className={s.customError}>Wrong phone number format!</div>,
            },
          ]}
        >
          <Input placeholder="Phone" prefix={"+38 (XXX) XXX - XX - XX"} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Field is required!",
            },
          ]}
        >
          <div className={s.blockPosition}>
            <span>Select your position</span>
            <Radio.Group onChange={onChangePosition} value={position}>
              {avaiblePositions.map((item: IPositions) => {
                return (
                  <Radio
                    key={item.name}
                    className={s.radioButton}
                    value={item.id}
                  >
                    {item.name}
                  </Radio>
                );
              })}
            </Radio.Group>
            {errorPosition && <span className="ant-form-item-explain-error">Position is required!</span>}
          </div>
        </Form.Item>
        <Form.Item
          name="file"
        >
          <div className={s.wrapperInputFile}>
            <input
              id="upload"
              className={s.inputFile}
              type="file"
              accept="image/jpg, image/jpeg"
              onChange={getInputFile}
              hidden
            />
            <label className={ inputFile ? s.successUploadFile : '' } htmlFor="upload">Upload</label>
            {errorFile && <span className="ant-form-item-explain-error">Somethings is wrong with file!</span>}
          </div>
        </Form.Item>
        <Form.Item>
          <button>Sign up</button>
        </Form.Item>
      </Form>
    </>
    )
  }
  return (
    <>
      {
        successRequest ?
        <SuccessRegister /> :
        renderForm()
      }
    </>
  );
};
