import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: 'TestPostman@mail.ru',
      password: 'TestPostman',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('Авторизация не удалась')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
  } else{
    alert('Авторизация не удалась')
  }
};

  if(isAuth) {
    return <Navigate to="/"/>
  }
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: 'Укажите почту'})}
          fullWidth
        />
        <TextField className={styles.field} label="Пароль" fullWidth
        helperText={errors.password?.message}
        error={Boolean(errors.password?.message)}
        {...register('password', {required: 'Укажите пароль'})}/>
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
