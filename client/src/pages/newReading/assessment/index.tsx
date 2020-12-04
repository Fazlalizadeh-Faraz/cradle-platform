import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import React from 'react';
import { ReadingField } from '../state';

export const Assessment = () => {
  return (
    <Paper>
      <Box p={2}>
        <h2>Assessment</h2>
        <Box pt={1} pl={3} pr={3}>
          <Grid container spacing={3}>
            <Grid item sm={12} md={6}>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                name={ReadingField.investigation}
                label="Investigation Results (if available)"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                name={ReadingField.finalDiagnosis}
                label="Final Diagnosis"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                name={ReadingField.treatment}
                label="Treatment / Operation"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                name={ReadingField.medication}
                label="Medication Prescribed (include dose and frequency)"
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name={ReadingField.followUp}
                Label={{ label: "Follow-up Needed" }}
              />
            </Grid>
            <Grid item sm={12} md={8}>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                name={ReadingField.followUpInstruc}
                label="Instructions for Follow-up"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  )
};
