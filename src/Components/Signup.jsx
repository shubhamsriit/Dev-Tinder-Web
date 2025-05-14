// FormikTailwindForm.tsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SIGNUP } from '../Utils/ApiEndPoints';
import { BASE_URL, SKILLS } from '../Utils/Constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useSnackbar } from '../Context/SnackBarProvider';

const skillOptions = SKILLS;

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(1, 'Age must be at least 1'),
  gender: Yup.string().required('Gender is required'),
  skills: Yup.array().min(1, 'Select at least one skill'),
  about: Yup.string().min(10, 'About must be at least 10 characters').required('About is required'),
  photo: Yup.mixed()
    .required('Profile picture is required')
    .test('fileSize', 'File size must be less than 2MB', value => {
      return value && value.size <= 2 * 1024 * 1024; // 2MB in bytes
    })
    .test('fileType', 'Unsupported file format', value => {
      return value && ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(value.type);
    }),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  skills: [],
  about: '',
  photo: null,
};

const Signup = () => {
  const [preview, setPreview] = useState("");
   const navigate = useNavigate();
   const { showSnackbar } = useSnackbar();
  const handleSubmit =(values, { resetForm }) => {
    resetForm();
    setPreview(null);
    const data={
      firstName:values.firstName,
      lastName:values.lastName,
      email:values.email,
      password:values.password,
      age:values.age,
      gender:values.gender,
      skills:values.skills,
      about:values.about,
      photoUrl:preview
    }
    console.log(data);
    
    submitData(values,data);
  };

  const submitData=async(values,data)=>{
    try{
        const res= await axios.post(BASE_URL+SIGNUP,data,{withCredentials:true});
        showSnackbar("Signup Successfully Done...","success");
         navigate("/login");
    }
    catch(err){
        console.log(err)
    }      
  }

  return (
    <div className="bg-base-300">
      <div className="max-w-xl mx-auto bg-white p-6 ">
        <h2 className="text-2xl font-bold mb-6">
          {" "}
          <KeyboardArrowLeftIcon
            className="cursor-pointer"
            style={{ width: "40px", height: "40px" }}
            onClick={() => navigate(-1)}
          />
          Signup
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-3 ml-4">
              <div>
                {preview && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover border mt-2"
                    />
                  </div>
                )}
                <label className="block mb-1 font-medium">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setFieldValue("photo", file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        console.log(reader.result);
                        setPreview(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">First Name</label>
                <Field name="firstName" className="w-full border rounded p-2" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Last Name</label>
                <Field name="lastName" className="w-full border rounded p-2" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Password</label>
                <Field name="password" className="w-full border rounded p-2" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Age</label>
                <Field
                  name="age"
                  type="number"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full border rounded p-2"
                >
                  <option disabled>-- Select --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Skills</label>

                <label className="flex items-center space-x-2">
                  <Field
                    as="select"
                    multiple
                    name="skills"
                    className=" w-full border rounded p-2"
                  >
                    <option disabled>-- Select --</option>
                    {skillOptions.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </Field>
                </label>
                <ErrorMessage
                  name="skills"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">About</label>
                <Field
                  as="textarea"
                  name="about"
                  className="w-full border rounded p-2 h-24"
                />
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full font-bold text-lg bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
