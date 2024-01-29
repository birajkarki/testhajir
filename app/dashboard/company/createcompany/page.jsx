'use client';
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from '@mui/material';
import { addCompany } from '@/redux/companySlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CustomRadioGroup from '@/components/company/createcompany/RadioButton';
import Hamburger from '@/components/common/hamburger';
import InputField from '@/components/common/Fields/InputField';
import RadioField from '@/components/common/Fields/RadioField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CreateCompany = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Full name is required')
      .matches(/^[A-Za-z][A-Za-z0-9 ]*$/, 'Alphanumeric value only')
      .test(
        'first-letter-alphabet',
        'First letter should be alphabetical for name',
        (value) => {
          return /^[A-Za-z]/.test(value);
        }
      ),
    staffCode: yup.string().required('Please select a staff code'),
    dateSelect: yup.string().required('Please select a date'),
    holidays: yup.string().required('Please enter holidays'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      staffCode: '',
      dateSelect: '',
      holidays: '',
      employee: '0',
      approver: '0',
      qrcode: '  qr code ',
      status: 'active',
      holiday_type: 'Custom',
      date_type: 'English',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values, 'from values in line 75');
      const formdata = new FormData();
      formdata.append('name', values.name);
      formdata.append('code', 1);
      formdata.append('date_type', values.date_type);
      formdata.append('holiday_type', values.holiday_type);
      formdata.append('custom_holiday_file', values.custom_holiday_file);
      dispatch(addCompany(formdata));
      // alert('Company added successfully!');
      // resetForm();
      // router.push('/dashboard/company');
    },
  });

  console.log(formik, 'from fromik values');

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100vh',
        padding: '10px',
        backgroundColor: '#fff',
      }}
    >
      <Typography
        sx={{
          color: '#434345',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '24px',
          letterSpacing: '0.25px',
        }}
      >
        Create New Company
      </Typography>

      <Hamburger />

      <form
        onSubmit={formik.handleSubmit}
        style={{ marginTop: '20px' }}
        enctype="multipart/form-data"
      >
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                mt: 2,
              }}
            >
              {/* Name of the Company */}
              <Typography variant="body1">
                Name of the Company <span sx={{ color: 'red' }}> *</span>
              </Typography>
              <InputField
                label="Enter Company Name"
                variant="outlined"
                fullWidth
                name="name"
                margin="normal"
                {...formik.getFieldProps('name')}
                error={
                  (formik.touched.name && Boolean(formik.errors.name)) ||
                  'Add Company Name'
                }
                helperText={formik.touched.name && formik.errors.name}
              />
              <Typography
                variant="body1"
                sx={{ marginTop: 1.6, marginBottom: 2 }}
              >
                Saff Code
              </Typography>
              <CustomRadioGroup
                name="staffCode"
                value={formik.values.staffCode}
                // onChange={(value) => formik.setFieldValue("staffCode", value)}
                options={[
                  {
                    value: 'auto',
                    label: 'Auto',
                    description: 'E.g.: R001, R002, ROO3 ',
                  },
                  {
                    value: 'custom',
                    label: 'Custom',
                    description: 'E.g.: 021, 022 or 0100, 0101 ',
                  },
                  // Add more options as needed
                ]}
                setFieldValue={formik.setFieldValue}
              />
              {formik.touched.staffCode && Boolean(formik.errors.staffCode) && (
                <Typography sx={{ color: 'red', marginTop: '4px' }}>
                  {formik.errors.staffCode}
                </Typography>
              )}

              {/* New Date Selection  */}

              <Typography
                variant="body1"
                sx={{ marginTop: 1.6, marginBottom: 2 }}
              >
                Date Selection
              </Typography>
              <CustomRadioGroup
                name="dateSelect"
                value={formik.values.dateSelect}
                // setFieldValue={formik.setFieldValue}
                // onChange={(value) => formik.setFieldValue("dateSelect", value)}
                options={[
                  {
                    value: 'English',
                    label: 'English',
                    description: 'e.g.: Something',
                  },
                  {
                    value: 'Nepali',
                    label: 'Nepali',
                    description: 'e.g.: Something',
                  },
                  // Add more options as needed
                ]}
                setFieldValue={formik.setFieldValue}
              />
              {formik.touched.dateSelect &&
                Boolean(formik.errors.dateSelect) && (
                  <Typography sx={{ color: 'red', marginTop: '4px' }}>
                    {formik.errors.dateSelect}
                  </Typography>
                )}
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                mt: 2,
              }}
            >
              {/* New Holidays Selection */}
              <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                Holidays
              </Typography>

              {/* Default Government Holidays Box */}

              {/* Custom Holidays Box */}
              <RadioField
                formik={formik}
                name="holidays"
                label="Default Government Holidays"
                value={formik.values.holidays}
              />
              <Link href="/dashboard">
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: '8px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  View Holidays (.pdf)
                </Typography>
              </Link>
              <Box sx={{ paddingTop: 4 }}>
                <RadioField
                  formik={formik}
                  name="custom_holidays"
                  label="Custom Holidays"
                  value={formik.values.custom_holidays}
                />
              </Box>

              {/* <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '16px',
                  width: '100%',
                  display: 'flex',
                  transition: 'background 0.3s, border 0.3s',
                  '&:hover': {
                    background: '#f5f5f5',
                  },
                  ...(formik.values.holidays === 'Custom Holidays'
                    ? { background: '#f5f5f5', border: '1px solid #2196F3' }
                    : {}),
                  marginTop: '16px', // Adjusted margin for separation
                }}
              >
                <RadioGroup
                  row
                  name="holidays"
                  value={formik.values.holidays}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Custom Holidays"
                    control={<Radio />}
                    label="Custom Holidays"
                  />
                </RadioGroup>
                {formik.touched.holidays &&
                  formik.errors.holidays === 'Custom Holidays' && (
                    <Typography sx={{ color: 'red', marginTop: '4px' }}>
                      {formik.errors.holidays}
                    </Typography>
                  )}
              </Box> */}
              <Link href="/dashboard">
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: '8px',

                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Click to download sample file (.xlsx)
                </Typography>
              </Link>
              {/* Upload Button with Icon */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  marginTop: '16px', // Adjusted margin for separation
                }}
              >
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    name="custom_holiday_file"
                    onChange={formik.handleChange}
                  />
                </Button>
              </Box>

              {/* old code  */}
              {/* Holidays */}
              {/* <Typography variant="body1">Holidays</Typography>
              <RadioGroup
                row
                name="holidays"
                value={formik.values.holidays}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="Default Government Holidays"
                  control={<Radio sx={{ width: "50%" }} />}
                  label="Default Government Holidays"
                />
                <FormControlLabel
                  value="Custom Holidays"
                  control={<Radio sx={{ width: "50%" }} />}
                  label="Custom Holidays"
                />
              </RadioGroup>
              {formik.touched.holidays && Boolean(formik.errors.holidays) && (
                <Typography sx={{ color: "red" }}>
                  {formik.errors.holidays}
                </Typography>
              )} */}
            </Box>
          </Grid>
        </Grid>

        {/* Submit Button (centered) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: '250px',
              height: '50px',
            }}
          >
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCompany;
