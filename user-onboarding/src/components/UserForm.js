import React from 'react';
import { withFormik, Form, Field } from 'formik';


const UserForm = ({values}) => {


    return (
        <div>
            <Form className="user-form">
                <Field type="text" name="name" placeholder="Name" />
                <Field type="email" name="email" placeholder="Email Address" />
                <Field type="text" name="password" placeholder="Password" />
                <label className="checkbox-container">
                    I agree to the Terms of Service
                    <Field type="checkbox" name="termsOfService" checked={values.termsOfService} />
                </label>
                <button>Submit!</button>
            </Form>
        </div>



    );
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfService }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || ""
        };
    },

    handleSubmit(values) {
        console.log(values);
    }
})(UserForm);

export default FormikUserForm;