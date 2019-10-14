import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers({...users, status});
        }
    }, [status]);

    return (
        <div>
            <Form className="user-form">
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field type="email" name="email" placeholder="Email Address" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field type="text" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label className="checkbox-container">
                    I agree to the Terms of Service
                    <Field type="checkbox" name="termsOfService" checked={values.termsOfService} />
                    {touched.termsOfService && errors.termsOfService && (
                        <p className="error">{errors.termsOfService}</p>
                    )}
                </label>
                <button type="submit">Submit!</button>
            </Form>

            {users.map(user => (
                <p key={user.name}>{user.name}</p>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfService }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || ""
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        termsOfService: Yup.bool()
            .test(
                "consent",
                "You have to agree with our Terms and Conditions!",
                value => value === true
            )
            .required("You have to agree with our Terms and Conditions!")
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post('https://reqres.in/api/users', values)
            .then(results => {
                setStatus(results.data);
            })
            .catch(err=> console.log(err.reults));
    }
})(UserForm);

export default FormikUserForm;