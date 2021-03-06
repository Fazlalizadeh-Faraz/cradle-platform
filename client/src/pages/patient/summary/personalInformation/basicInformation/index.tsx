import { Patient } from 'src/types';
import React from 'react';
import { getAgeToDisplay } from 'src/shared/utils';

interface IProps {
  patient: Patient;
}

export const BasicInformation: React.FC<IProps> = ({ patient }) => {
  return (
    <>
      <p>
        <b>ID: </b> {patient.patientId} &nbsp;&nbsp;&nbsp;&nbsp;<b>Village: </b>
        {patient.villageNumber ? patient.villageNumber : `N/A`}
      </p>
      <p>
        <b>Age: </b>
        {patient.dob === undefined || patient.dob === null
          ? `N/A`
          : getAgeToDisplay(patient.dob, patient.isExactDob)}
      </p>
      <p>
        <b>Sex: </b> {patient.patientSex} &nbsp;&nbsp;&nbsp;&nbsp;<b> Zone: </b>
        {patient.zone ? patient.zone : `N/A`}
      </p>
      <p>
        <b>Household number: </b>
        {patient.householdNumber ? patient.householdNumber : `N/A`}
      </p>
    </>
  );
};
